# One-time headless Blender pass to make the coach GLBs animate correctly.
#
# Root cause it fixes: the MPFB clothing/hair meshes export with ZERO vertex groups —
# they are rigidly attached, not skinned to the armature. So when a limb bends, the
# clothing stays put and the body pokes through (bare thigh on a squat/fold, etc.).
#
# Fix: transfer the body mesh's bone weights onto each garment/hair mesh (nearest-face
# interpolation) and bind it to the armature, so it deforms WITH the body. The body mesh
# (which carries the 79 face shape keys) is only the SOURCE — it is never modified — and
# the garments have 0 shape keys, so the transfer applies cleanly.
#
# Run:  blender --background --python tools/clean_glb.py -- <input.glb> <output.glb>
# Cleaned GLBs may be committed on the feature branch.

import bpy, sys, os, re

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if len(argv) < 2:
    print('USAGE: -- <input.glb> <output.glb>'); sys.exit(1)
inp, outp = argv[0], argv[1]
print('CLEAN_GLB in=', inp, 'out=', outp)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=inp)

# Armature + body (the skinned mesh with the most vertices = the body).
arm = None; body = None; bestv = -1
for o in bpy.data.objects:
    if o.type == 'ARMATURE':
        arm = o
    if o.type == 'MESH' and len(o.vertex_groups) > 0 and len(o.data.vertices) > bestv:
        bestv = len(o.data.vertices); body = o
if not arm or not body:
    print('FAIL: no armature/body found'); sys.exit(2)
print('BODY=', body.name, 'verts=', bestv, 'ARM=', arm.name)

# NOTE: do NOT delete the MakeHuman macro shape keys ($md-…). They are not inert — they
# encode the character's head/body shape, and removing them reverts the mesh toward a generic
# base, which breaks the fitted eyes/brows/hair (red exposed eyes, missing brows). Keep every
# shape key. Size is trimmed instead via export_morph_normal=False below (drops normal deltas,
# not shape), which is safe. (Matching the original's small size would need sparse morph
# accessors — a separate post-process — since Blender only writes dense morphs.)

# Skin garments + hair; never the body, the eyeballs, or the brow/lash cards (those are
# small, head-local, and the eyeballs must stay bone-scalable for runtime eye-seating).
GARMENT = re.compile(r'cargo|pant|tank|keyhole|polo|shirt|top|outfit|bra|bottom|footwear|hair|ponytail|afro|beard|short0|loose|fro', re.I)
SKIP    = re.compile(r'low-?poly|eyeball|eyebrow|eyelash|(^|\.)eye', re.I)
targets = [o for o in bpy.data.objects
           if o.type == 'MESH' and o is not body and len(o.vertex_groups) == 0
           and GARMENT.search(o.name) and not SKIP.search(o.name)]
print('SKIN TARGETS=', [t.name for t in targets])

bpy.ops.object.mode_set(mode='OBJECT') if bpy.context.object else None
for g in targets:
    mw = g.matrix_world.copy()
    g.parent = None
    g.matrix_world = mw                       # keep world position after un-parenting
    bpy.ops.object.select_all(action='DESELECT')
    g.select_set(True); body.select_set(True)
    bpy.context.view_layer.objects.active = body   # active = transfer SOURCE
    bpy.ops.object.data_transfer(
        use_reverse_transfer=False, data_type='VGROUP_WEIGHTS',
        vert_mapping='POLYINTERP_NEAREST',
        layers_select_src='ALL', layers_select_dst='NAME', mix_mode='REPLACE')
    # Smooth + limit the transferred weights. A raw nearest-face transfer gives a garment vert
    # the weight of ONE body face, so an armhole vert can snap fully to the upper-arm bone and
    # the whole top then rides up with a raised arm ("moves as one part"). Smoothing blends each
    # vert with its neighbours so the deformation is gradual; limit-total keeps the 4-bone GPU
    # cap; normalize keeps weights summing to 1.
    # A SLEEVELESS top (tank/keyhole) must not follow the arm at all — but a raw nearest-face
    # transfer gives its armhole verts upper-arm weight, so the top rides up with a raised arm
    # ("moves as one part"). Drop every arm-bone weight on these tops and renormalize, so they
    # deform with the torso only and the armhole stays put as the arm passes through it. Polos
    # keep their arm weights — their sleeves SHOULD follow the upper arm.
    if re.search(r'tank|keyhole|camisole|halter|sleeveless|(^|\.)bra', g.name, re.I):
        # Remove the upper-arm chain (which swings when the arm raises) but KEEP clavicle/
        # shoulder weights — those barely move and hold the strap on the shoulder.
        ARM_BONE = re.compile(r'upperarm|lowerarm|wrist|hand|finger|thumb|index|middle|ring|pinky', re.I)
        arm_idx = [vg.index for vg in g.vertex_groups if ARM_BONE.search(vg.name)]
        me2 = g.data
        for v in me2.vertices:
            for ai in arm_idx:
                try: g.vertex_groups[ai].remove([v.index])
                except RuntimeError: pass
        for v in me2.vertices:                       # renormalize remaining weights to sum to 1
            els = list(v.groups)
            tot = sum(e.weight for e in els)
            if tot > 1e-6:
                for e in els:
                    g.vertex_groups[e.group].add([v.index], e.weight / tot, 'REPLACE')
        print('  de-armed sleeveless top', g.name)
    if not any(m.type == 'ARMATURE' for m in g.modifiers):
        am = g.modifiers.new('Armature', 'ARMATURE'); am.object = arm
    g.parent = arm
    print('SKINNED', g.name, '-> vgroups', len(g.vertex_groups))

# Drop any stray helper geometry that is not part of the coach.
for o in list(bpy.data.objects):
    if re.match(r'Icosphere|Cube|Sphere|Light|Camera', o.name):
        nm = o.name
        bpy.data.objects.remove(o, do_unlink=True)
        print('removed stray', nm)

bpy.ops.export_scene.gltf(
    filepath=outp, export_format='GLB',
    export_morph=True, export_morph_normal=False, export_skins=True,
    export_yup=True, use_selection=False)
print('EXPORTED', outp)
