import { useEffect } from 'react';

export function PublicUiPolish() {
  useEffect(() => {
    const style = document.createElement('style');
    style.dataset.yasaflowUiPolish = 'true';
    style.textContent = `
      html { scroll-behavior: smooth; }
      body { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
      a, button, input, select, textarea { -webkit-tap-highlight-color: transparent; }
      a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
        outline: 3px solid rgba(33, 133, 220, .28);
        outline-offset: 3px;
      }
      main section { scroll-margin-top: 6rem; }
      header nav a { border-radius: .75rem; transition: color .18s ease, background-color .18s ease, transform .18s ease; }
      header nav a:hover { background: rgba(15, 23, 42, .045); }
      header button { transition: background-color .18s ease, border-color .18s ease, transform .18s ease; }
      header button:active, main a:active, main button:active { transform: translateY(1px); }
      #why-yasaflow article,
      #solutions article,
      #products article,
      main ol li {
        transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
      }
      #why-yasaflow article:hover,
      #solutions article:hover,
      main ol li:hover {
        transform: translateY(-3px);
        border-color: rgba(33, 133, 220, .28);
        box-shadow: 0 18px 45px rgba(15, 23, 42, .08);
      }
      #products article:hover { background: #111c31; }
      @media (max-width: 639px) {
        main section { padding-top: 4.75rem !important; padding-bottom: 4.75rem !important; }
        main h1 { font-size: clamp(2.65rem, 13vw, 4rem) !important; }
        main h2 { font-size: clamp(2rem, 9vw, 3rem) !important; }
        main p { overflow-wrap: anywhere; }
        header nav a { min-height: 3rem; display: flex !important; align-items: center; padding-inline: .75rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
      }
    `;
    document.head.appendChild(style);

    const mobileMenuButton = document.querySelector<HTMLButtonElement>('header button[aria-expanded]');
    mobileMenuButton?.setAttribute('aria-controls', 'yasaflow-mobile-navigation');
    const mobileNav = document.querySelector<HTMLElement>('header nav.border-t');
    if (mobileNav) mobileNav.id = 'yasaflow-mobile-navigation';

    return () => style.remove();
  }, []);

  return null;
}
