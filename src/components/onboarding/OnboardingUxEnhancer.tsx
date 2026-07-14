import { useEffect } from 'react';

const successMessages = [
  'Sjekk e-posten',
  'Check your email',
  'E-postanızı kontrol',
];

const eyeOpen = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const eyeClosed = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 3 18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a18.2 18.2 0 0 1-2.1 3.2"/><path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.5 8 10 8a10.8 10.8 0 0 0 5.4-1.4"/></svg>';

function enhancePasswordField(root: ParentNode) {
  const input = root.querySelector<HTMLInputElement>('input[type="password"], input[data-password-field="true"]');
  if (!input || input.dataset.passwordEnhanced === 'true') return;

  input.dataset.passwordEnhanced = 'true';
  input.dataset.passwordField = 'true';
  input.classList.add('pr-14');

  const wrapper = document.createElement('div');
  wrapper.className = 'relative';
  input.parentNode?.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'absolute right-3 top-1/2 mt-1 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[#2185DC]/20';
  button.setAttribute('aria-label', 'Vis passord');
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = eyeOpen;
  button.addEventListener('click', () => {
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    button.setAttribute('aria-label', showing ? 'Vis passord' : 'Skjul passord');
    button.setAttribute('aria-pressed', String(!showing));
    button.innerHTML = showing ? eyeOpen : eyeClosed;
  });
  wrapper.appendChild(button);
}

function enhanceConfirmationMessage(root: ParentNode) {
  root.querySelectorAll<HTMLParagraphElement>('p').forEach((message) => {
    const text = message.textContent?.trim() || '';
    if (!successMessages.some((prefix) => text.startsWith(prefix))) return;
    message.className = 'rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-800';
    message.setAttribute('role', 'status');
    message.setAttribute('aria-live', 'polite');
  });
}

export function OnboardingUxEnhancer() {
  useEffect(() => {
    const enhance = () => {
      enhancePasswordField(document);
      enhanceConfirmationMessage(document);
    };

    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
