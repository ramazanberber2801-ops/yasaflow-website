import { useLayoutEffect } from 'react';
import type { Locale } from '../../i18n';

const audienceDescriptions: Record<Locale, string[]> = {
  en: [
    'Choose from the modules that are available today and expand the setup when your organization needs more.',
    'Build a clear digital foundation with the available Yasaflow modules that fit your association.',
    'Start with the available core modules and add new capabilities only when they become relevant.',
    'Use the available modules to create a setup that reflects how your community works.',
    'Combine the available Yasaflow modules into a flexible structure that can grow with the organization.',
    'Select the available modules that are relevant to your community and keep the setup focused.',
    'Begin with a simple set of available modules and extend the platform as the organization develops.',
    'Create a focused setup using the Yasaflow modules that are available and relevant to your community.',
  ],
  nb: [
    'Velg blant modulene som er tilgjengelige i dag, og utvid oppsettet når organisasjonen får nye behov.',
    'Bygg en tydelig digital grunnmur med de tilgjengelige Yasaflow-modulene som passer foreningen.',
    'Start med de tilgjengelige kjernemodulene, og legg kun til nye funksjoner når de blir relevante.',
    'Bruk de tilgjengelige modulene til å lage et oppsett som gjenspeiler hvordan fellesskapet arbeider.',
    'Kombiner tilgjengelige Yasaflow-moduler i en fleksibel struktur som kan vokse med organisasjonen.',
    'Velg de tilgjengelige modulene som er relevante for fellesskapet, og hold oppsettet fokusert.',
    'Begynn med et enkelt utvalg av tilgjengelige moduler, og utvid plattformen når organisasjonen utvikler seg.',
    'Lag et fokusert oppsett med Yasaflow-modulene som er tilgjengelige og relevante for fellesskapet.',
  ],
  tr: [
    'Bugün mevcut olan modüller arasından seçim yapın ve kuruluşunuzun ihtiyaçları büyüdükçe yapıyı genişletin.',
    'Derneğinize uygun mevcut Yasaflow modülleriyle net bir dijital temel oluşturun.',
    'Mevcut temel modüllerle başlayın ve yalnızca ihtiyaç oluştuğunda yeni özellikler ekleyin.',
    'Topluluğunuzun çalışma biçimini yansıtan bir yapı için mevcut modülleri kullanın.',
    'Mevcut Yasaflow modüllerini kuruluşla birlikte büyüyebilen esnek bir yapıda birleştirin.',
    'Topluluğunuz için ilgili olan mevcut modülleri seçin ve yapıyı odaklı tutun.',
    'Mevcut modüllerden oluşan sade bir başlangıç yapın ve kuruluş geliştikçe platformu genişletin.',
    'Topluluğunuz için mevcut ve ilgili Yasaflow modülleriyle odaklı bir yapı oluşturun.',
  ],
};

export function AudienceCopyEnhancer({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const paragraphs = document.querySelectorAll<HTMLElement>('#solutions article p');
    paragraphs.forEach((paragraph, index) => {
      const nextText = audienceDescriptions[locale][index];
      if (nextText) paragraph.textContent = nextText;
    });
  }, [locale]);

  return null;
}
