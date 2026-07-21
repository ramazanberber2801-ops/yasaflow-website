import { useEffect } from 'react';
import type { Locale } from './i18n';

type LegalType = 'privacy' | 'terms' | 'refund' | 'cookies';
type Page = { title: string; intro: string; sections: readonly (readonly [string, string])[] };

const content: Record<Locale, Record<LegalType, Page>> = {
  nb: {
    privacy: { title: 'Personvernerklæring', intro: 'Denne erklæringen forklarer hvordan Yasaflow behandler personopplysninger når du besøker nettsiden, oppretter konto eller bruker plattformen.', sections: [
      ['Behandlingsansvarlig', 'Yasaflow er behandlingsansvarlig for nettside- og kundeadministrasjonsdata. Organisasjoner er normalt behandlingsansvarlige for opplysninger de registrerer om egne medlemmer og kontakter.'],
      ['Opplysninger og formål', 'Vi kan behandle navn, e-post, organisasjonsopplysninger, innloggings- og sikkerhetsdata, supporthenvendelser og tekniske logger for å levere og sikre tjenesten, gi support og oppfylle lovkrav.'],
      ['Abonnementsbetaling', 'Betaling for Yasaflow-abonnementer behandles av Paddle som betalingsleverandør og Merchant of Record. Yasaflow lagrer ikke fullstendige betalingskortopplysninger.'],
      ['Leverandører', 'Vi bruker leverandører for hosting, database, e-post og teknisk drift under nødvendige avtaler og sikkerhetstiltak.'],
      ['Lagring og rettigheter', 'Opplysninger lagres så lenge det er nødvendig. Du kan be om innsyn, retting, sletting, begrensning eller dataportabilitet, protestere mot behandling og klage til Datatilsynet.'],
      ['Kontakt', 'Spørsmål om personvern kan sendes til hello@yasaflow.com.']
    ] },
    terms: { title: 'Vilkår for bruk', intro: 'Disse vilkårene gjelder Yasaflows nettside, 7 dagers prøveperiode og betalte SaaS-abonnementstjenester.', sections: [
      ['Tjenesten', 'Yasaflow er en skybasert SaaS-plattform for organisasjoner. Plattformen tilbyr verktøy for blant annet medlemmer, aktiviteter, kommunikasjon og administrasjon.'],
      ['Konto og tilgang', 'Du må oppgi korrekte opplysninger og beskytte innloggingsinformasjonen. Tilgang kan begrenses ved misbruk, sikkerhetsbrudd eller vesentlig mislighold.'],
      ['Prøveperiode og pris', 'Yasaflow tilbyr 7 dager gratis. Deretter koster grunnplattformen fra 349 kr per måned. Valgfrie tilleggsmoduler kan øke månedsprisen. Den totale abonnementsprisen vises tydelig før kjøpet bekreftes.'],
      ['Automatisk fornyelse', 'Abonnementet fornyes automatisk for hver betalingsperiode til det sies opp. Avslutt før prøveperioden utløper for å unngå belastning.'],
      ['Oppsigelse', 'Abonnementet kan sies opp gjennom abonnementsportalen eller betalingsbekreftelsen fra Paddle. Etter oppsigelse beholdes normalt tilgang ut inneværende, allerede betalte periode.'],
      ['Tillatt bruk og kundedata', 'Tjenesten skal brukes lovlig. Kunden beholder rettighetene til egne data og er ansvarlig for at data kan behandles lovlig.'],
      ['Tilgjengelighet og ansvar', 'Vi arbeider for stabil drift, men kan gjennomføre vedlikehold og sikkerhetsendringer. Ansvar begrenses så langt gjeldende lov tillater.'],
      ['Refusjon og lovvalg', 'Kunder kan be om full refusjon innen 14 dager etter første kjøp i samsvar med refusjonspolicyen og Paddles kjøpervilkår. Ufravikelige lovbestemte rettigheter gjelder alltid. Norsk rett gjelder med mindre ufravikelige regler bestemmer noe annet.'],
      ['Kontakt', 'Spørsmål kan sendes til hello@yasaflow.com.']
    ] },
    refund: { title: 'Refusjons- og kanselleringspolicy', intro: 'Denne policyen forklarer gratis prøveperiode, automatisk fornyelse, oppsigelse og refusjon for Yasaflow SaaS-abonnementer.', sections: [
      ['7 dagers gratis prøveperiode', 'Du belastes ikke i prøveperioden. Dersom abonnementet ikke avsluttes før prøveperioden utløper, starter det valgte betalte abonnementet automatisk.'],
      ['14 dagers refusjonsrett', 'Du kan be om full refusjon innen 14 dager etter ditt første kjøp av et Yasaflow-abonnement. Forespørselen må sendes innen 14 kalenderdager fra betalingsdatoen. Denne rettigheten gjelder i tillegg til ufravikelige rettigheter etter gjeldende lov.'],
      ['Fornyelser', 'Abonnementet fornyes automatisk til det sies opp. Refusjon av senere fornyelser vurderes etter Paddles kjøpervilkår, gjeldende lov og omstendighetene i saken.'],
      ['Oppsigelse', 'Du kan si opp når som helst gjennom abonnementsportalen eller lenken i e-posten fra Paddle. Oppsigelsen stopper fremtidige fornyelser, men avslutter ikke nødvendigvis tilgang i en allerede betalt periode.'],
      ['Slik ber du om refusjon', 'Bruk lenken i betalingsbekreftelsen fra Paddle, Paddles kjøperportal eller kontakt hello@yasaflow.com. Oppgi e-postadresse, organisasjonsnavn, betalingsdato og ordrenummer dersom det er tilgjengelig.'],
      ['Behandling av refusjon', 'Godkjente refusjoner behandles gjennom Paddle og tilbakeføres normalt til den opprinnelige betalingsmetoden. Behandlingstid kan variere mellom banker og betalingsleverandører.']
    ] },
    cookies: { title: 'Informasjon om informasjonskapsler', intro: 'Yasaflow bruker nødvendige informasjonskapsler og lokal lagring for sikkerhet, språk, innlogging og funksjonalitet.', sections: [
      ['Nødvendig lagring', 'Sesjon, autentisering, språkvalg og registreringsstatus kan lagres for at tjenesten skal fungere.'],
      ['Valgfrie verktøy', 'Analyse eller markedsføring aktiveres ikke uten samtykke der dette kreves.'],
      ['Kontroll', 'Du kan slette nettstedsdata i nettleseren, men dette kan logge deg ut eller avbryte registreringen.']
    ] }
  },
  en: {
    privacy: { title: 'Privacy policy', intro: 'This policy explains how Yasaflow processes personal data when you visit the website, create an account or use the platform.', sections: [
      ['Controller and data', 'Yasaflow controls website and customer-administration data. Customer organizations normally control member and contact data they upload.'],
      ['Purposes', 'We process account, organization, security, support and technical data to provide and protect the service.'],
      ['Subscription billing', 'Paddle processes Yasaflow subscription payments as Merchant of Record. Yasaflow does not store complete payment-card details.'],
      ['Suppliers', 'We use providers for hosting, database, email and technical operations under appropriate agreements and safeguards.'],
      ['Retention and rights', 'Data is kept only as necessary. You may request access, correction, deletion, restriction or portability and object to processing.'],
      ['Contact', 'Contact hello@yasaflow.com.']
    ] },
    terms: { title: 'Terms and conditions', intro: 'These terms apply to the Yasaflow website, 7-day free trial and paid SaaS subscriptions.', sections: [
      ['The service', 'Yasaflow is a cloud-based SaaS platform for organizations, providing tools for members, activities, communication and administration.'],
      ['Trial and pricing', 'The trial is free for 7 days. After that, the core platform starts from NOK 349 per month. Optional add-on modules can increase the monthly price. The total subscription price is shown before purchase.'],
      ['Automatic renewal', 'The subscription renews automatically until cancelled. Cancel before the trial ends to avoid being charged.'],
      ['Cancellation', 'You may cancel through the subscription portal or the link in Paddle emails. Cancellation stops future renewals and access normally continues through the paid period.'],
      ['Use, data and availability', 'Use the service lawfully and protect your account. Customers retain rights to their data. Maintenance and security changes may occur.'],
      ['Refunds and law', 'Customers may request a full refund within 14 days of their initial purchase in accordance with the refund policy and Paddle Buyer Terms. Mandatory statutory rights always apply. Norwegian law applies unless mandatory law states otherwise.'],
      ['Contact', 'Contact hello@yasaflow.com.']
    ] },
    refund: { title: 'Refund and cancellation policy', intro: 'This policy explains the free trial, automatic renewal, cancellation and refunds for Yasaflow SaaS subscriptions.', sections: [
      ['7-day free trial', 'You are not charged during the trial. Unless cancelled before it ends, the selected paid subscription starts automatically.'],
      ['14-day refund period', 'You may request a full refund within 14 calendar days of your initial Yasaflow subscription purchase. The request must be submitted within 14 days of the payment date. This right is provided in addition to any mandatory rights under applicable law.'],
      ['Renewals', 'Subscriptions renew automatically until cancelled. Refunds for later renewal charges are considered under Paddle Buyer Terms, applicable law and the circumstances of the request.'],
      ['Cancellation', 'You may cancel at any time through the subscription portal or the link in Paddle emails. Cancellation stops future renewals but does not necessarily end access during an already-paid period.'],
      ['Requesting a refund', 'Use the link in your Paddle receipt, the Paddle buyer portal, or email hello@yasaflow.com. Include your account email, organization name, payment date and order number where available.'],
      ['Refund processing', 'Approved refunds are processed through Paddle and normally returned to the original payment method. Processing times may vary by bank and payment provider.']
    ] },
    cookies: { title: 'Cookie information', intro: 'Yasaflow uses necessary cookies and local storage for security, language, authentication and core functionality.', sections: [
      ['Necessary storage', 'Session, authentication, language and onboarding state may be stored.'],
      ['Optional tools', 'Analytics or marketing tools require consent where applicable.'],
      ['Controls', 'Clearing site data may sign you out or interrupt onboarding.']
    ] }
  },
  tr: {
    privacy: { title: 'Gizlilik politikası', intro: 'Bu politika Yasaflow’un web sitesi, hesap ve platform kullanımındaki kişisel verileri nasıl işlediğini açıklar.', sections: [
      ['Veriler ve roller', 'Yasaflow web sitesi ve müşteri yönetimi verilerini işler. Kuruluşlar yükledikleri üye verilerinden genellikle kendileri sorumludur.'],
      ['Amaç', 'Hizmeti sunmak ve korumak için hesap, güvenlik, destek ve teknik veriler işlenebilir.'],
      ['Abonelik ödemeleri', 'Yasaflow abonelik ödemeleri Merchant of Record olarak Paddle tarafından işlenir. Yasaflow tam kart bilgilerini saklamaz.'],
      ['Haklar ve iletişim', 'Erişim, düzeltme, silme ve diğer haklarınız için hello@yasaflow.com adresine yazabilirsiniz.']
    ] },
    terms: { title: 'Kullanım koşulları', intro: 'Bu koşullar Yasaflow web sitesi, 7 günlük ücretsiz deneme ve ücretli SaaS abonelikleri için geçerlidir.', sections: [
      ['Hizmet', 'Yasaflow; üyeler, etkinlikler, iletişim ve yönetim için araçlar sunan bulut tabanlı bir SaaS platformudur.'],
      ['Deneme ve fiyat', 'İlk 7 gün ücretsizdir. Sonrasında temel platform aylık 349 NOK’dan başlar. Seçilen ek modüller aylık fiyatı artırabilir ve toplam fiyat satın almadan önce gösterilir.'],
      ['Otomatik yenileme', 'Abonelik iptal edilene kadar otomatik yenilenir. Ücret alınmaması için deneme bitmeden iptal edin.'],
      ['İptal', 'İptal Paddle bağlantısı veya abonelik portalından yapılabilir ve gelecekteki yenilemeleri durdurur.'],
      ['İade ve hukuk', 'Müşteriler ilk satın alma tarihinden itibaren 14 gün içinde tam iade talep edebilir. Bu hak Paddle Buyer Terms ve geçerli zorunlu yasal haklarla birlikte uygulanır.'],
      ['İletişim', 'hello@yasaflow.com adresine yazabilirsiniz.']
    ] },
    refund: { title: 'İade ve iptal politikası', intro: 'Bu politika Yasaflow SaaS aboneliklerinin ücretsiz deneme, yenileme, iptal ve iade şartlarını açıklar.', sections: [
      ['7 günlük deneme', 'Deneme süresinde ücret alınmaz. Süre bitmeden iptal edilmezse seçilen ücretli abonelik otomatik başlar.'],
      ['14 günlük iade süresi', 'İlk Yasaflow abonelik satın alımınızdan itibaren 14 takvim günü içinde tam iade talep edebilirsiniz. Talep, ödeme tarihinden itibaren 14 gün içinde gönderilmelidir.'],
      ['Yenilemeler', 'Abonelik iptal edilene kadar otomatik yenilenir. Sonraki yenileme ödemelerine ilişkin iade talepleri Paddle Buyer Terms, geçerli hukuk ve talebin koşullarına göre değerlendirilir.'],
      ['İptal', 'Abonelik portalı veya Paddle e-postasındaki bağlantı üzerinden iptal ederek gelecekteki yenilemeleri durdurabilirsiniz.'],
      ['İade talebi', 'Paddle makbuzundaki bağlantıyı, Paddle alıcı portalını veya hello@yasaflow.com adresini kullanın. Hesap e-postanızı, kuruluş adını, ödeme tarihini ve varsa sipariş numarasını ekleyin.'],
      ['İade işlemi', 'Onaylanan iadeler Paddle üzerinden işlenir ve genellikle orijinal ödeme yöntemine gönderilir. İşlem süresi bankaya ve ödeme sağlayıcısına göre değişebilir.']
    ] },
    cookies: { title: 'Çerez bilgisi', intro: 'Yasaflow güvenlik, dil, giriş ve temel işlevler için gerekli çerezleri kullanır.', sections: [
      ['Gerekli depolama', 'Oturum, kimlik doğrulama, dil ve kayıt bilgileri saklanabilir.'],
      ['İsteğe bağlı araçlar', 'Analiz veya pazarlama için gerektiğinde onay alınır.'],
      ['Kontrol', 'Site verilerini silmek oturumu kapatabilir.']
    ] }
  }
};

export default function LegalPage({ type, locale }: { type: LegalType; locale: Locale }) {
  const page = content[locale][type];
  useEffect(() => { document.title = `${page.title} — Yasaflow`; }, [page.title]);
  return <main className="min-h-screen bg-slate-50 px-5 py-14 text-slate-900"><article className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-12"><a href="/" className="font-semibold text-[#2185DC]">← Yasaflow</a><p className="mt-8 text-sm font-semibold uppercase tracking-wider text-[#2185DC]">Sist oppdatert 21. juli 2026</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">{page.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{page.intro}</p><div className="mt-10 space-y-9">{page.sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-semibold">{heading}</h2><p className="mt-3 leading-7 text-slate-600">{body}</p></section>)}</div><div className="mt-12 flex flex-wrap gap-5 border-t border-slate-200 pt-6 text-sm text-slate-500"><a className="hover:text-[#2185DC]" href="/privacy">Privacy</a><a className="hover:text-[#2185DC]" href="/terms">Terms</a><a className="hover:text-[#2185DC]" href="/refund">Refunds</a><a className="hover:text-[#2185DC]" href="/cookies">Cookies</a></div></article></main>;
}
