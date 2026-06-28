import { useI18n } from '../i18n/I18nProvider';
import { sectionWrap, sectionY } from '../lib/navigation';

export function FAQSection() {
  const { t } = useI18n();

  return (
    <section id="faq" className={`${sectionY} bg-slate-900/20 border-y border-white/5`}>
      <div className={`${sectionWrap} max-w-3xl`}>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 leading-tight">
            {t.faq.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/5 open:bg-white/[0.07]"
            >
              <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 font-bold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <div className="px-5 pb-4 sm:px-6 sm:pb-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
