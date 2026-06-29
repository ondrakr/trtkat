import { useI18n } from '../i18n/I18nProvider';
import { RevealSection } from './RevealSection';
import { sectionWrap, sectionY } from '../lib/navigation';

export function SeoFaqSection() {
  const { t } = useI18n();

  return (
    <RevealSection id="caste-dotazy" className={`${sectionY} relative`}>
      <div className={sectionWrap}>
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 leading-tight">
            {t.seoFaq.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">{t.seoFaq.subtitle}</p>
        </div>
        <dl className="mx-auto max-w-3xl space-y-4">
          {t.seoFaq.items.map((item) => (
            <div
              key={item.question}
              className="glass-card rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8"
            >
              <dt className="text-base sm:text-lg font-black text-white mb-2 sm:mb-3">{item.question}</dt>
              <dd className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </RevealSection>
  );
}
