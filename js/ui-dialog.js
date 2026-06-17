// Styled, accessible replacements for window.confirm/alert so prompts match the app
// instead of the OS chrome (which is especially jarring on mobile / installed PWA).
// Promise-based: `await confirmDialog(msg)` resolves true/false; `alertDialog(msg)`
// resolves when dismissed. Messages are static developer strings (no user data), and
// are inserted via textContent regardless, so there is no injection surface. Reuses
// the existing .overlay / .overlay-card styles.

function buildDialog(message, { okText = 'OK', cancelText = null, danger = false } = {}) {
  return new Promise((resolve) => {
    const ov = document.createElement('div');
    ov.className = 'overlay dialog';
    ov.setAttribute('role', 'alertdialog');
    ov.setAttribute('aria-modal', 'true');
    const actions = cancelText
      ? `<button type="button" class="btn dialog-cancel">${cancelText}</button>`
        + `<button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'} dialog-ok">${okText}</button>`
      : `<button type="button" class="btn btn-primary dialog-ok">${okText}</button>`;
    ov.innerHTML = `<div class="overlay-card dialog-card" role="document">
      <p class="dialog-msg"></p>
      <div class="overlay-actions dialog-actions">${actions}</div>
    </div>`;
    ov.querySelector('.dialog-msg').textContent = message;

    const prevFocus = document.activeElement;
    const buttons = ov.querySelectorAll('button');
    const close = (val) => {
      document.removeEventListener('keydown', onKey, true);
      ov.remove();
      try { if (prevFocus && prevFocus.focus) prevFocus.focus(); } catch { /* ok */ }
      resolve(val);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(false); return; }   // Escape = cancel/dismiss
      if (e.key === 'Tab' && buttons.length) {                                 // simple focus trap
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey, true);
    // Backdrop click cancels — but only when the dialog is cancelable (alerts must be acknowledged).
    ov.addEventListener('click', (e) => { if (e.target === ov && cancelText) close(false); });

    const okBtn = ov.querySelector('.dialog-ok');
    const cancelBtn = ov.querySelector('.dialog-cancel');
    if (okBtn) okBtn.addEventListener('click', () => close(true));
    if (cancelBtn) cancelBtn.addEventListener('click', () => close(false));

    document.body.appendChild(ov);
    // Focus the safest default: Cancel for a destructive confirm, otherwise the primary action.
    ((danger && cancelBtn) ? cancelBtn : (okBtn || cancelBtn)).focus();
  });
}

// Yes/No style confirmation. Returns a Promise<boolean>.
export function confirmDialog(message, opts = {}) {
  return buildDialog(message, { okText: 'Yes', cancelText: 'Cancel', ...opts });
}

// Informational, single-button. Returns a Promise that resolves when dismissed.
export function alertDialog(message, opts = {}) {
  return buildDialog(message, { okText: 'OK', ...opts, cancelText: null });
}
