import type { MouseEvent, ReactNode } from 'react';
import LegalPage from './LegalPages';
import OnboardingPage from './OnboardingPage';
import ModuleLibrary from './ModuleLibrary';
import { ModuleMetadata } from './ModuleMetadata';
import PricingPage from './PricingPage';
import PublicRouter from './PublicRouter';
import PublicSupportPage from './PublicSupportPages';
import ResourcesPage from './ResourcesPage';
import { ResourcesMetadata } from './ResourcesMetadata';
import TrustPage from './TrustPages';
import ClinicPage from './ClinicPage';
import { AccessibilityEnhancer } from './components/navigation/AccessibilityEnhancer';
import { FeedbackLauncher } from './components/navigation/FeedbackLauncher';
import { GlobalFooter } from './components/navigation/GlobalFooter';
import { GlobalHeader } from './components/navigation/GlobalHeader';
import { MobileLayoutEnhancer } from './components/navigation/MobileLayoutEnhancer';
import { AudienceCopyEnhancer } from './components/product/AudienceCopyEnhancer';
import { HeaderNavigationEnhancer } from './components/product/HeaderNavigationEnhancer';
import { PricingSection } from './components/product/PricingSection';
import { ProductPreviewEnhancer } from './components/product/ProductPreviewEnhancer';
import { PublicUiPolish } from './components/product/PublicUiPolish';
import { useI18n } from './i18n';

const productLabels = new Set(['Products', 'Produkter', 'Ürünler']);
const sharedPortalUrl = 'https://portal.yasaflow.com/';

function SharedPortalRedirect() {
  window.location.replace(sharedPortalUrl);
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-center text-slate-700">Åpner Yasaflow-portalen…</main>;
}

export default function SiteRouter() {
  const { locale } = useI18n();
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  const withPublicChrome = (content: ReactNode, hideEmbeddedChrome = true) => <>
    <MobileLayoutEnhancer />
    <PublicUiPolish />
    <GlobalHeader locale={locale} path={path} />
    <AccessibilityEnhancer locale={locale} />
    <FeedbackLauncher locale={locale} />
    <div className={hideEmbeddedChrome ? '[&>div>header]:hidden [&>header]:hidden [&>div>footer]:hidden [&>footer]:hidden' : ''}>{content}</div>
    <GlobalFooter locale={locale} />
  </>;

  if (path === '/login' || path === '/dashboard' || path === '/portal') return <SharedPortalRedirect />;
  if (path === '/get-started' || path === '/register') return <OnboardingPage />;
  if (path === '/pricing') return withPublicChrome(<PricingPage />);
  if (path === '/klinikker' || path === '/clinics') return withPublicChrome(<ClinicPage locale={locale} />);
  if (path === '/privacy') return withPublicChrome(<LegalPage type="privacy" locale={locale} />);
  if (path === '/terms') return withPublicChrome(<LegalPage type="terms" locale={locale} />);
  if (path === '/refund') return withPublicChrome(<LegalPage type="refund" locale={locale} />);
  if (path === '/cookies') return withPublicChrome(<LegalPage type="cookies" locale={locale} />);
  if (path === '/about') return withPublicChrome(<PublicSupportPage type="about" locale={locale} />);
  if (path === '/contact') return withPublicChrome(<PublicSupportPage type="contact" locale={locale} />);
  if (path === '/feedback') return withPublicChrome(<PublicSupportPage type="feedback" locale={locale} />);
  if (path === '/modules') return withPublicChrome(<><ModuleMetadata locale={locale} /><ModuleLibrary /></>);
  if (path === '/resources') return withPublicChrome(<><ResourcesMetadata locale={locale} /><ResourcesPage locale={locale} /></>);
  if (path === '/faq') return withPublicChrome(<TrustPage path="/faq" locale={locale} />);
  if (path === '/security') return withPublicChrome(<TrustPage path="/security" locale={locale} />);
  if (path === '/roadmap') return withPublicChrome(<TrustPage path="/roadmap" locale={locale} />);
  if (path === '/integrations') return withPublicChrome(<TrustPage path="/integrations" locale={locale} />);

  function handleProductNavigation(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor) return;
    const label = anchor.textContent?.trim();
    if (label && ['Logg inn','Log in','Giriş yap'].includes(label)) {
      event.preventDefault();
      window.location.assign(sharedPortalUrl);
      return;
    }
    if (!label || !productLabels.has(label)) return;
    event.preventDefault();
    window.location.assign('/modules');
  }

  if (path !== '/') return withPublicChrome(<PublicRouter />);

  return <div lang={locale === 'nb' ? 'nb-NO' : locale} onClickCapture={handleProductNavigation}>
    <MobileLayoutEnhancer />
    <PublicUiPolish />
    <AccessibilityEnhancer locale={locale} showSkipLink />
    <div className="[&>div>footer]:hidden [&>footer]:hidden"><PublicRouter /></div>
    <AudienceCopyEnhancer locale={locale} />
    <HeaderNavigationEnhancer locale={locale} />
    <ProductPreviewEnhancer locale={locale} />
    <PricingSection locale={locale} />
    <FeedbackLauncher locale={locale} />
    <GlobalFooter locale={locale} />
  </div>;
}