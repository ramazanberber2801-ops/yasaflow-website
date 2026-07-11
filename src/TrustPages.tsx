import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed, ExternalLink, LockKeyhole, Plug, Route, ShieldCheck } from 'lucide-react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, type Locale } from './i18n';

type TrustPath = '/faq' | '/security' | '/roadmap' | '/integrations';
type FAQItem = { question: string; answer: string };
type InfoItem = { title: string; body: string; status?: string };
type PageData = { eyebrow: string; title: string; intro: string; items: FAQItem[] | InfoItem[]; noteTitle: string; noteBody: string };

const copy: Record<Locale, Record<TrustPath, PageData>> = {
  en: {
    '/faq': {
      eyebrow: 'Frequently asked questions', title: 'Clear answers before you get started.',
      intro: 'A practical overview of Yasaflow, its modular structure and what organizations can expect while the platform develops.',
      items: [
        { question: 'What is Yasaflow?', answer: 'Yasaflow is a modular digital platform being built for organizations, associations, communities and faith communities that want communication, activities, members and administration in one place.' },
        { question: 'Who is Yasaflow for?', answer: 'The platform is designed for membership-based organizations of different sizes and purposes, including volunteer groups, sports clubs, cultural organizations and faith communities.' },
        { question: 'How do modules work?', answer: 'Organizations can use a shared core and add relevant capabilities as their needs grow. Final commercial packaging will be published only after the pricing model is approved.' },
        { question: 'Can we choose which modules we use?', answer: 'That is the intended product direction. The public module library distinguishes between included capabilities and optional extensions.' },
        { question: 'Will there be a mobile app?', answer: 'A mobile member experience is part of the product direction. The website currently shows an illustrative interface concept, not a claim that every feature is already released.' },
        { question: 'Can several administrators work together?', answer: 'Yasaflow is being designed around clear roles and shared administration. Exact permissions will be documented as the operational platform is finalized.' },
        { question: 'How is privacy handled?', answer: 'Privacy and responsible data handling are product requirements. Final customer documentation, data-processing terms and legal notices must be completed before production onboarding.' },
        { question: 'Does Yasaflow support several languages?', answer: 'The public website supports English, Norwegian and Turkish. Product language coverage will be documented separately as the application develops.' },
      ], noteTitle: 'Still evaluating Yasaflow?', noteBody: 'Send a short description of your organization and the workflows you want to simplify.'
    },
    '/security': {
      eyebrow: 'Security', title: 'Trust must be designed into the platform.',
      intro: 'Yasaflow is being developed with clear access, responsible data handling and operational transparency as product requirements.',
      items: [
        { title: 'Role-based access', body: 'The product direction separates owner, administrator and member responsibilities. Final permission matrices will be documented before customer onboarding.', status: 'Product requirement' },
        { title: 'Data protection', body: 'Personal data should be limited to what is necessary, handled according to applicable agreements and supported by clear retention routines.', status: 'Policy in preparation' },
        { title: 'Encryption', body: 'Production architecture is expected to use encrypted transport and suitable protection for stored data. Exact implementation details will be published after technical verification.', status: 'To be verified' },
        { title: 'Backups and recovery', body: 'Backup, recovery objectives and restoration testing must be defined as part of production readiness.', status: 'Before launch' },
        { title: 'Logging and accountability', body: 'Administrative actions should be traceable where appropriate without creating unnecessary surveillance or excessive data collection.', status: 'Product requirement' },
        { title: 'Incident handling', body: 'A documented process for assessment, containment, communication and follow-up must be established before operational launch.', status: 'Before launch' },
      ], noteTitle: 'No unsupported certifications', noteBody: 'Yasaflow does not claim security certifications or completed controls that have not yet been independently verified.'
    },
    '/roadmap': {
      eyebrow: 'Roadmap', title: 'A transparent direction, without false promises.',
      intro: 'The roadmap communicates product direction. Timing may change as research, testing, compliance and customer feedback shape priorities.',
      items: [
        { title: 'Public website and module library', body: 'Multilingual product presentation, reusable module catalog and public information architecture.', status: 'Available' },
        { title: 'Organization administration', body: 'Owner and administrator workflows, organization setup, roles and modular configuration.', status: 'In development' },
        { title: 'Member mobile experience', body: 'News, activities, notifications and relevant member services in a focused mobile interface.', status: 'In development' },
        { title: 'Payments and donations', body: 'Responsible payment and donation workflows subject to provider, legal and accounting requirements.', status: 'Planned' },
        { title: 'Integrations', body: 'Connections to selected services based on verified customer needs and secure technical access.', status: 'Planned' },
        { title: 'Advanced automation', body: 'Workflow assistance that reduces repetitive administration without removing human control.', status: 'Research' },
      ], noteTitle: 'Roadmap status is not a delivery guarantee', noteBody: 'Features move forward only after product, security and operational requirements are sufficiently understood.'
    },
    '/integrations': {
      eyebrow: 'Integrations', title: 'Connect what matters. Avoid unnecessary complexity.',
      intro: 'Yasaflow will prioritize integrations that solve verified organizational needs. The list below describes direction, not currently active connections.',
      items: [
        { title: 'Email delivery', body: 'Transactional messages such as invitations and account recovery through a suitable email provider.', status: 'Planned' },
        { title: 'Push notifications', body: 'Timely member communication through supported mobile notification services.', status: 'In development' },
        { title: 'Payment providers', body: 'Potential payment and donation connections selected according to market, compliance and accounting needs.', status: 'Research' },
        { title: 'Calendar export', body: 'Simple ways to add relevant activities to common calendar applications.', status: 'Planned' },
        { title: 'Accounting workflows', body: 'Possible exports or integrations based on verified customer requirements and regional systems.', status: 'Research' },
        { title: 'Public API', body: 'A controlled integration surface may be considered after core permissions, security and versioning are stable.', status: 'Future consideration' },
      ], noteTitle: 'No integration is presented as live before verification', noteBody: 'Each integration will receive clear documentation and status when it is ready for customer use.'
    },
  },
  nb: {
    '/faq': {
      eyebrow: 'Ofte stilte spørsmål', title: 'Tydelige svar før dere kommer i gang.',
      intro: 'En praktisk oversikt over Yasaflow, den modulære strukturen og hva organisasjoner kan forvente mens plattformen utvikles.',
      items: [
        { question: 'Hva er Yasaflow?', answer: 'Yasaflow er en modulær digital plattform som utvikles for organisasjoner, foreninger, fellesskap og trossamfunn som ønsker kommunikasjon, aktiviteter, medlemmer og administrasjon samlet på ett sted.' },
        { question: 'Hvem passer Yasaflow for?', answer: 'Plattformen er laget for medlemsbaserte organisasjoner med ulike størrelser og formål, blant annet frivillige grupper, idrettslag, kulturorganisasjoner og trossamfunn.' },
        { question: 'Hvordan fungerer modulene?', answer: 'Organisasjonen kan bruke en felles grunnmur og legge til relevante funksjoner når behovene vokser. Endelig kommersiell pakking publiseres først når prismodellen er godkjent.' },
        { question: 'Kan vi velge hvilke moduler vi bruker?', answer: 'Det er den planlagte produktretningen. Det offentlige modulbiblioteket skiller mellom inkluderte funksjoner og valgfrie tillegg.' },
        { question: 'Kommer det en mobilapp?', answer: 'En mobil medlemsopplevelse er en del av produktretningen. Nettsiden viser foreløpig et illustrativt grensesnitt, ikke en påstand om at alle funksjoner allerede er lansert.' },
        { question: 'Kan flere administratorer samarbeide?', answer: 'Yasaflow utvikles med tydelige roller og delt administrasjon. Nøyaktige rettigheter dokumenteres når den operative plattformen er ferdigstilt.' },
        { question: 'Hvordan håndteres personvern?', answer: 'Personvern og ansvarlig databehandling er produktkrav. Endelig kundedokumentasjon, databehandleravtaler og juridiske tekster må være klare før produksjonsoppstart.' },
        { question: 'Støtter Yasaflow flere språk?', answer: 'Den offentlige nettsiden støtter engelsk, norsk og tyrkisk. Språkdekningen i selve produktet dokumenteres separat etter hvert som appen utvikles.' },
      ], noteTitle: 'Vurderer dere fortsatt Yasaflow?', noteBody: 'Send en kort beskrivelse av organisasjonen og arbeidsprosessene dere ønsker å forenkle.'
    },
    '/security': {
      eyebrow: 'Sikkerhet', title: 'Tillit må bygges inn i plattformen.',
      intro: 'Yasaflow utvikles med tydelig tilgang, ansvarlig databehandling og operasjonell åpenhet som produktkrav.',
      items: [
        { title: 'Rollebasert tilgang', body: 'Produktretningen skiller mellom ansvar for eier, administrator og medlem. Endelige rettighetsmatriser dokumenteres før kundeoppstart.', status: 'Produktkrav' },
        { title: 'Databeskyttelse', body: 'Personopplysninger skal begrenses til det nødvendige, behandles etter gjeldende avtaler og støttes av tydelige sletterutiner.', status: 'Retningslinjer utarbeides' },
        { title: 'Kryptering', body: 'Produksjonsarkitekturen forventes å bruke kryptert transport og egnet beskyttelse av lagrede data. Detaljer publiseres etter teknisk verifisering.', status: 'Skal verifiseres' },
        { title: 'Sikkerhetskopi og gjenoppretting', body: 'Mål for sikkerhetskopi, gjenoppretting og testing må defineres som del av produksjonsklarhet.', status: 'Før lansering' },
        { title: 'Logging og ansvarlighet', body: 'Administrative handlinger bør kunne spores der det er relevant, uten unødvendig overvåking eller overdreven datainnsamling.', status: 'Produktkrav' },
        { title: 'Hendelseshåndtering', body: 'En dokumentert prosess for vurdering, begrensning, kommunikasjon og oppfølging må etableres før operativ lansering.', status: 'Før lansering' },
      ], noteTitle: 'Ingen udokumenterte sertifiseringer', noteBody: 'Yasaflow påstår ikke å ha sikkerhetssertifiseringer eller ferdige kontroller som ikke er uavhengig verifisert.'
    },
    '/roadmap': {
      eyebrow: 'Veikart', title: 'En tydelig retning, uten falske løfter.',
      intro: 'Veikartet viser produktretning. Tidspunkt kan endres når forskning, testing, regelverk og kundebehov påvirker prioriteringene.',
      items: [
        { title: 'Offentlig nettside og modulbibliotek', body: 'Flerspråklig produktpresentasjon, gjenbrukbar modulkatalog og offentlig informasjonsstruktur.', status: 'Tilgjengelig' },
        { title: 'Organisasjonsadministrasjon', body: 'Arbeidsflyt for eier og administrator, oppsett, roller og modulkonfigurasjon.', status: 'Under utvikling' },
        { title: 'Mobil medlemsopplevelse', body: 'Nyheter, aktiviteter, varsler og relevante medlemstjenester i et fokusert mobilgrensesnitt.', status: 'Under utvikling' },
        { title: 'Betaling og donasjoner', body: 'Ansvarlige løsninger underlagt leverandørkrav, regelverk og regnskapsbehov.', status: 'Planlagt' },
        { title: 'Integrasjoner', body: 'Koblinger til utvalgte tjenester basert på verifiserte kundebehov og sikker teknisk tilgang.', status: 'Planlagt' },
        { title: 'Avansert automatisering', body: 'Arbeidsflytstøtte som reduserer gjentakende administrasjon uten å fjerne menneskelig kontroll.', status: 'Utforskes' },
      ], noteTitle: 'Veikartstatus er ingen leveringsgaranti', noteBody: 'Funksjoner går videre først når produkt-, sikkerhets- og driftskrav er godt nok forstått.'
    },
    '/integrations': {
      eyebrow: 'Integrasjoner', title: 'Koble sammen det viktige. Unngå unødvendig kompleksitet.',
      intro: 'Yasaflow vil prioritere integrasjoner som løser verifiserte behov. Listen beskriver retning, ikke aktive koblinger.',
      items: [
        { title: 'E-postlevering', body: 'Transaksjonsmeldinger som invitasjoner og kontogjenoppretting gjennom en egnet e-postleverandør.', status: 'Planlagt' },
        { title: 'Pushvarsler', body: 'Tidsriktig medlemskommunikasjon gjennom støttede mobile varslingstjenester.', status: 'Under utvikling' },
        { title: 'Betalingsleverandører', body: 'Mulige koblinger for betaling og donasjoner velges etter marked, regelverk og regnskapsbehov.', status: 'Utforskes' },
        { title: 'Kalendereksport', body: 'Enkle måter å legge relevante aktiviteter til vanlige kalenderprogrammer.', status: 'Planlagt' },
        { title: 'Regnskapsflyt', body: 'Mulige eksporter eller integrasjoner basert på dokumenterte kundebehov og regionale systemer.', status: 'Utforskes' },
        { title: 'Offentlig API', body: 'En kontrollert integrasjonsflate kan vurderes når kjernetilganger, sikkerhet og versjonering er stabile.', status: 'Fremtidig vurdering' },
      ], noteTitle: 'Ingen integrasjon omtales som aktiv før den er verifisert', noteBody: 'Hver integrasjon får tydelig dokumentasjon og status når den er klar for kundebruk.'
    },
  },
  tr: {
    '/faq': {
      eyebrow: 'Sık sorulan sorular', title: 'Başlamadan önce net cevaplar.',
      intro: 'Yasaflow, modüler yapı ve platform geliştirilirken kuruluşların neler bekleyebileceği hakkında pratik bir genel bakış.',
      items: [
        { question: 'Yasaflow nedir?', answer: 'Yasaflow; iletişim, etkinlikler, üyeler ve yönetimi tek yerde toplamak isteyen kuruluşlar, dernekler, topluluklar ve inanç toplulukları için geliştirilen modüler bir dijital platformdur.' },
        { question: 'Yasaflow kimler için uygundur?', answer: 'Platform; gönüllü gruplar, spor kulüpleri, kültür kuruluşları ve inanç toplulukları dahil farklı büyüklük ve amaçlardaki üyelik temelli kuruluşlar için tasarlanır.' },
        { question: 'Modüller nasıl çalışır?', answer: 'Kuruluşlar ortak bir temel kullanabilir ve ihtiyaçları büyüdükçe ilgili özellikleri ekleyebilir. Nihai ticari paketler yalnızca fiyatlandırma modeli onaylandıktan sonra yayınlanacaktır.' },
        { question: 'Kullanacağımız modülleri seçebilir miyiz?', answer: 'Planlanan ürün yönü budur. Halka açık modül kütüphanesi dahil özelliklerle isteğe bağlı eklentileri birbirinden ayırır.' },
        { question: 'Mobil uygulama olacak mı?', answer: 'Mobil üye deneyimi ürün yönünün bir parçasıdır. Web sitesi şu anda tüm özelliklerin yayınlandığı iddiası değil, açıklayıcı bir arayüz konsepti gösterir.' },
        { question: 'Birden fazla yönetici birlikte çalışabilir mi?', answer: 'Yasaflow net roller ve paylaşılan yönetim temelinde geliştirilmektedir. Kesin yetkiler operasyonel platform tamamlandıkça belgelenecektir.' },
        { question: 'Gizlilik nasıl ele alınıyor?', answer: 'Gizlilik ve sorumlu veri işleme ürün gereksinimleridir. Nihai müşteri belgeleri, veri işleme şartları ve hukuki bildirimler üretim başlangıcından önce tamamlanmalıdır.' },
        { question: 'Yasaflow birden fazla dili destekliyor mu?', answer: 'Halka açık web sitesi İngilizce, Norveççe ve Türkçe destekler. Uygulamadaki dil kapsamı geliştirme ilerledikçe ayrı olarak belgelenecektir.' },
      ], noteTitle: 'Yasaflow’u hâlâ değerlendiriyor musunuz?', noteBody: 'Kuruluşunuzu ve basitleştirmek istediğiniz iş akışlarını kısaca anlatın.'
    },
    '/security': {
      eyebrow: 'Güvenlik', title: 'Güven platformun içine tasarlanmalıdır.',
      intro: 'Yasaflow net erişim, sorumlu veri işleme ve operasyonel şeffaflığı ürün gereksinimleri olarak ele alır.',
      items: [
        { title: 'Rol tabanlı erişim', body: 'Ürün yönü sahip, yönetici ve üye sorumluluklarını ayırır. Nihai yetki tabloları müşteri başlangıcından önce belgelenecektir.', status: 'Ürün gereksinimi' },
        { title: 'Veri koruma', body: 'Kişisel veriler gerekli olanla sınırlandırılmalı, geçerli sözleşmelere göre işlenmeli ve net saklama rutinleriyle desteklenmelidir.', status: 'Politika hazırlanıyor' },
        { title: 'Şifreleme', body: 'Üretim mimarisinin şifreli aktarım ve saklanan veriler için uygun koruma kullanması beklenir. Ayrıntılar teknik doğrulamadan sonra yayınlanacaktır.', status: 'Doğrulanacak' },
        { title: 'Yedekleme ve kurtarma', body: 'Yedekleme, kurtarma hedefleri ve geri yükleme testleri üretime hazırlığın parçası olarak tanımlanmalıdır.', status: 'Yayın öncesi' },
        { title: 'Kayıt ve hesap verebilirlik', body: 'Yönetim işlemleri gerektiğinde izlenebilir olmalı, ancak gereksiz gözetim veya aşırı veri toplama yaratmamalıdır.', status: 'Ürün gereksinimi' },
        { title: 'Olay yönetimi', body: 'Değerlendirme, sınırlama, iletişim ve takip için belgelenmiş bir süreç operasyonel yayından önce kurulmalıdır.', status: 'Yayın öncesi' },
      ], noteTitle: 'Desteklenmeyen sertifika iddiası yok', noteBody: 'Yasaflow bağımsız olarak doğrulanmamış güvenlik sertifikaları veya tamamlanmış kontroller iddia etmez.'
    },
    '/roadmap': {
      eyebrow: 'Yol haritası', title: 'Yanlış vaatler olmadan şeffaf bir yön.',
      intro: 'Yol haritası ürün yönünü anlatır. Araştırma, test, uyumluluk ve müşteri geri bildirimi öncelikleri şekillendirdikçe zamanlama değişebilir.',
      items: [
        { title: 'Halka açık site ve modül kütüphanesi', body: 'Çok dilli ürün sunumu, yeniden kullanılabilir modül kataloğu ve halka açık bilgi mimarisi.', status: 'Mevcut' },
        { title: 'Kuruluş yönetimi', body: 'Sahip ve yönetici iş akışları, kuruluş kurulumu, roller ve modüler yapılandırma.', status: 'Geliştiriliyor' },
        { title: 'Mobil üye deneyimi', body: 'Odaklı bir mobil arayüzde haberler, etkinlikler, bildirimler ve ilgili üye hizmetleri.', status: 'Geliştiriliyor' },
        { title: 'Ödemeler ve bağışlar', body: 'Sağlayıcı, hukuk ve muhasebe gereksinimlerine tabi sorumlu ödeme ve bağış akışları.', status: 'Planlandı' },
        { title: 'Entegrasyonlar', body: 'Doğrulanmış müşteri ihtiyaçları ve güvenli teknik erişime dayalı seçilmiş hizmet bağlantıları.', status: 'Planlandı' },
        { title: 'Gelişmiş otomasyon', body: 'İnsan kontrolünü kaldırmadan tekrar eden yönetimi azaltan iş akışı desteği.', status: 'Araştırma' },
      ], noteTitle: 'Yol haritası teslimat garantisi değildir', noteBody: 'Özellikler ancak ürün, güvenlik ve operasyon gereksinimleri yeterince anlaşıldığında ilerler.'
    },
    '/integrations': {
      eyebrow: 'Entegrasyonlar', title: 'Önemli olanı bağlayın. Gereksiz karmaşıklıktan kaçının.',
      intro: 'Yasaflow doğrulanmış kuruluş ihtiyaçlarını çözen entegrasyonlara öncelik verecektir. Aşağıdaki liste aktif bağlantıları değil yönü açıklar.',
      items: [
        { title: 'E-posta teslimi', body: 'Davetler ve hesap kurtarma gibi işlem mesajları için uygun bir e-posta sağlayıcısı.', status: 'Planlandı' },
        { title: 'Anlık bildirimler', body: 'Desteklenen mobil bildirim hizmetleri üzerinden zamanında üye iletişimi.', status: 'Geliştiriliyor' },
        { title: 'Ödeme sağlayıcıları', body: 'Pazar, uyumluluk ve muhasebe ihtiyaçlarına göre seçilecek olası ödeme ve bağış bağlantıları.', status: 'Araştırma' },
        { title: 'Takvim aktarımı', body: 'İlgili etkinlikleri yaygın takvim uygulamalarına eklemenin basit yolları.', status: 'Planlandı' },
        { title: 'Muhasebe iş akışları', body: 'Doğrulanmış müşteri ihtiyaçlarına ve bölgesel sistemlere dayalı olası aktarımlar veya entegrasyonlar.', status: 'Araştırma' },
        { title: 'Halka açık API', body: 'Temel yetkiler, güvenlik ve sürümleme istikrarlı hale geldikten sonra kontrollü bir entegrasyon yüzeyi değerlendirilebilir.', status: 'Gelecekte değerlendirilecek' },
      ], noteTitle: 'Doğrulanmadan hiçbir entegrasyon aktif gösterilmez', noteBody: 'Her entegrasyon müşteri kullanımına hazır olduğunda net belge ve durum bilgisi alacaktır.'
    },
  },
};

const iconByPath: Record<TrustPath, typeof ShieldCheck> = {
  '/faq': CheckCircle2,
  '/security': LockKeyhole,
  '/roadmap': Route,
  '/integrations': Plug,
};

export default function TrustPage({ path, locale }: { path: TrustPath; locale: Locale }) {
  const page = copy[locale][path];
  const Icon = iconByPath[path];
  const isFAQ = path === '/faq';
  const contact = locale === 'nb' ? 'Kontakt Yasaflow' : locale === 'tr' ? 'Yasaflow ile iletişim' : 'Contact Yasaflow';
  const back = locale === 'nb' ? 'Tilbake til forsiden' : locale === 'tr' ? 'Ana sayfaya dön' : 'Back to home';

  return <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"><a href="/" aria-label="Yasaflow"><Logo /></a><div className="flex items-center gap-3"><LanguageSelector compact /><a className="hidden items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 sm:inline-flex" href="/"><ArrowLeft size={17} />{back}</a></div></div></header>
    <main><section className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-5xl"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#2185DC]/10 text-[#2185DC]"><Icon size={24} /></div><p className="mt-7 text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">{page.eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{page.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">{page.intro}</p>
      {isFAQ ? <div className="mt-14 space-y-3">{(page.items as FAQItem[]).map((item, index) => <details key={item.question} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,.04)]" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold"><span>{item.question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-[#2185DC] transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{item.answer}</p></details>)}</div>
      : <div className="mt-14 grid gap-5 md:grid-cols-2">{(page.items as InfoItem[]).map((item) => <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,.04)]"><div className="flex items-start justify-between gap-4"><CircleDashed className="mt-1 shrink-0 text-[#14B8A6]" size={20} />{item.status && <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">{item.status}</span>}</div><h2 className="mt-5 text-lg font-semibold">{item.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p></article>)}</div>}
      <div className="mt-14 rounded-[2rem] bg-[#0F172A] p-8 text-white sm:p-10"><h2 className="text-2xl font-semibold tracking-[-.03em]">{page.noteTitle}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">{page.noteBody}</p><a className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#2185DC] px-5 text-sm font-semibold" href="mailto:hello@yasaflow.com">{contact}<ArrowRight size={17} /></a></div>
      <nav className="mt-10 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">{(['/faq','/security','/roadmap','/integrations'] as TrustPath[]).map((route) => <a key={route} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${route === path ? 'border-[#2185DC]/30 bg-[#2185DC]/5 text-[#2185DC]' : 'border-slate-200 bg-white hover:text-slate-950'}`} href={route}>{copy[locale][route].eyebrow}<ExternalLink size={13} /></a>)}</nav>
    </div></section></main>
    <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-xs text-slate-500">© 2026 Yasaflow.</footer>
  </div>;
}

export type { TrustPath };
