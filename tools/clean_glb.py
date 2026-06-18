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
