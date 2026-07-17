import type { MouseEvent, ReactNode } from 'react';
import CheckoutSuccessPage from './CheckoutSuccessPage';
import CustomerPortal from './CustomerPortal';
import LegalPage from './LegalPages';
import OnboardingPage from './OnboardingPage';
import ModuleLibrary from './ModuleLibrary';
import { ModuleMetadata } from './ModuleMetadata';
import PricingPage from './PricingPage';
import PublicRouter from './PublicRouter';
import ResourcesPage from './ResourcesPage';
import { ResourcesMetadata } from './ResourcesMetadata';
import TrustPage from './TrustPages';
import { AccessibilityEnhancer } from './components/navigation/AccessibilityEnhancer';
import { GlobalHeader } from './components/navigation/GlobalHeader';
import { MobileLayoutEnhancer } from './components/navigation/MobileLayoutEnhancer';
import { AudienceCopyEnhancer } from './components/product/AudienceCopyEnhancer';
import { HeaderNavigationEnhancer } from './components/product/HeaderNavigationEnhancer';
import { PricingSection } from './components/product/PricingSection';
import { ProductPreviewEnhancer } from './components/product/ProductPreviewEnhancer';
import { PublicUiPolish } from './components/product/PublicUiPolish';
import { SiteNavigationEnhancer } from './components/product/SiteNavigationEnhancer';
import { useI18n } from './i18n';

const productLabels = new Set(['Products', 'Produkter', 'Ürünler']);

export default function SiteRouter() {
  const { locale } = useI18n();
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  const withGlobalHeader = (content: ReactNode) => <>
    <MobileLayoutEnhancer />
    <PublicUiPolish />
    <GlobalHeader locale={locale} path={path} />
    <AccessibilityEnhancer locale={locale} />
    <div className="[&>div>header]:hidden [&>header]:hidden">{content}</div>
  </>;

  if (path === '/login' || path === '/dashboard' || path === '/portal') return <CustomerPortal />;
  if (path === '/get-started' || path === '/register') return <OnboardingPage />;
  if (path === '/checkout/success') return <CheckoutSuccessPage />;
  if (path === '/pricing') return <PricingPage />;
  if (path === '/privacy') return <LegalPage type="privacy" locale={locale} />;
  if (path === '/terms') return <LegalPage type="terms" locale={locale} />;
  if (path === '/refund') return <LegalPage type="refund" locale={locale} />;
  if (path === '/cookies') return <LegalPage type="cookies" locale={locale} />;
  if (path === '/modules') return withGlobalHeader(<><ModuleMetadata locale={locale} /><ModuleLibrary /></>);
  if (path === '/resources') return withGlobalHeader(<><ResourcesMetadata locale={locale} /><ResourcesPage locale={locale} /></>);
  if (path === '/faq') return withGlobalHeader(<TrustPage path="/faq" locale={locale} />);
  if (path === '/security') return withGlobalHeader(<TrustPage path="/security" locale={locale} />);
  if (path === '/roadmap') return withGlobalHeader(<TrustPage path="/roadmap" locale={locale} />);
  if (path === '/integrations') return withGlobalHeader(<TrustPage path="/integrations" locale={locale} />);

  function handleProductNavigation(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor) return;
    const label = anchor.textContent?.trim();
    if (label && ['Logg inn','Log in','Giriş yap'].includes(label)) {
      event.preventDefault();
      window.location.assign('/login');
      return;
    }
    if (path !== '/') return;
    if (!label || !productLabels.has(label)) return;
    event.preventDefault();
    window.location.assign('/modules');
  }

  if (path !== '/') return withGlobalHeader(<PublicRouter />);

  return <div lang={locale === 'nb' ? 'nb-NO' : locale} onClickCapture={handleProductNavigation}>
    <MobileLayoutEnhancer />
    <PublicUiPolish />
    <AccessibilityEnhancer locale={locale} showSkipLink />
    <PublicRouter />
    <AudienceCopyEnhancer locale={locale} />
    <HeaderNavigationEnhancer locale={locale} />
    <ProductPreviewEnhancer locale={locale} />
    <PricingSection locale={locale} />
    <SiteNavigationEnhancer locale={locale} />
  </div>;
}
