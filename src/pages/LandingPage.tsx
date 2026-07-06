import {
  ShieldCheck,
  MessageCircle,
  Lock,
  Sparkles,
  Sun,
  CalendarDays,
  Route,
  Hotel,
  Car,
  Dices,
  Heart,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { StoreBadges } from '../components/StoreBadges';
import { RevealSection } from '../components/RevealSection';
import { StatsSection } from '../components/StatsSection';
import { SEO } from '../components/SEO';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { buildLandingSchemas } from '../lib/schema';
import { sectionWrap, sectionWrapNarrow, sectionY, heroPhoneSrc } from '../lib/navigation';
import { frostedQuoteStyle } from '../lib/frostedGlass';

const benefitIcons = [Sun, CalendarDays, Route, ShieldCheck];
const featureIcons = [CalendarDays, Heart, Dices, Car, Hotel, Sparkles];
const featureColors = [
  'text-trtkat-pink bg-trtkat-pink/15 border-trtkat-pink/20',
  'text-trtkat-blue bg-trtkat-blue/15 border-trtkat-blue/20',
  'text-yellow-400 bg-yellow-400/15 border-yellow-400/20',
  'text-purple-400 bg-purple-400/15 border-purple-400/20',
  'text-emerald-400 bg-emerald-400/15 border-emerald-400/20',
  'text-orange-400 bg-orange-400/15 border-orange-400/20',
];
const vibeImageSrc = '/images/IMG_3760.jpeg';

export function LandingPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.description}
        path="/"
        jsonLd={buildLandingSchemas(t, locale)}
      />

      <main className="flex-grow overflow-x-clip">
        <section className="relative isolate pb-28 sm:pb-36 md:pb-44">
          <div className="hero-blurs pointer-events-none absolute inset-x-0 top-0 bottom-28 sm:bottom-36 md:bottom-44">
            <div className="absolute -top-20 right-[-10%] h-64 w-64 sm:h-80 sm:w-80 md:h-[640px] md:w-[640px] rounded-full bg-trtkat-blue/25 blur-[60px] md:blur-[150px]" />
            <div className="absolute top-[35%] left-[-12%] h-64 w-64 sm:h-80 sm:w-80 md:h-[520px] md:w-[520px] rounded-full bg-trtkat-pink/20 blur-[60px] md:blur-[120px]" />
          </div>
          <div className="hero-fade-bottom" aria-hidden="true" />

          <div className={`${sectionWrap} relative z-[2] min-h-svh flex items-start sm:items-center pt-18 sm:pt-16 md:pt-20 pb-10 sm:pb-14 md:pb-20`}>
            <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div className="hero-enter order-1 mx-auto w-full max-w-4xl text-center md:mx-0 md:text-left">
                <div className="mb-5 flex items-center justify-center gap-3 md:justify-start md:mb-6">
                  <span className="hidden h-px w-10 bg-trtkat-pink sm:block md:w-12" />
                  <span className="glass-badge rounded-full px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-trtkat-pink">
                    {t.hero.badge}
                  </span>
                </div>

                <h1 className="text-[3.35rem] leading-[1.08] sm:text-6xl sm:leading-[1.06] md:text-8xl md:leading-[1.04] lg:text-9xl font-black tracking-tighter text-white mb-5 sm:mb-6">
                  <span className="block whitespace-nowrap">{t.hero.titleLine1}</span>
                  <span className="text-gradient block whitespace-nowrap">{t.hero.titleLine2}</span>
                </h1>

                <p className="font-book mx-auto max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg md:mx-0 md:max-w-2xl md:text-2xl">
                  {t.hero.body}
                </p>

                <div id="stahnout" className="mt-8 flex flex-col items-center sm:mt-10 md:mt-12 md:items-start">
                  <StoreBadges size="lg" layout="stack" priority className="justify-center md:justify-start" />
                </div>
              </div>

              <div className="hero-enter hero-enter--delay order-2 mx-auto w-full max-w-[204px] sm:max-w-[255px] md:max-w-[289px] lg:mx-0 lg:max-w-[85%] lg:justify-self-end">
                <img
                  src={heroPhoneSrc}
                  alt={t.hero.imageAlt}
                  width={788}
                  height={1400}
                  fetchPriority="high"
                  decoding="async"
                  className="hero-phone-float w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <RevealSection id="jak-to-funguje" className="relative z-[2] bg-[#020617] pt-8 sm:pt-10 md:pt-12 pb-14 sm:pb-16 md:pb-24">
          <div className={sectionWrap}>
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-3 sm:mb-4 leading-[1.12] sm:leading-[1.1]">{t.how.title}</h2>
              <p className="text-xs sm:text-sm md:text-xl text-slate-400 font-medium tracking-[0.08em] uppercase">{t.how.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">
              {t.how.steps.map((step, idx) => (
                <div key={step.title} className="glass-card glass-interactive p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] relative mt-4 sm:mt-0 transition-transform hover:scale-[1.02]">
                  <div className={`absolute -top-3 left-3 sm:-top-6 sm:-left-6 w-11 h-11 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-slate-950 font-black text-lg md:text-2xl shadow-xl ${idx === 0 ? 'bg-trtkat-blue' : idx === 1 ? 'bg-trtkat-pink' : 'bg-white'}`}>{idx + 1}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4 mt-5 md:mt-4">{step.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
                    <span className="md:hidden">{step.bodyMobile}</span>
                    <span className="hidden md:inline">{step.bodyDesktop}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection id="funkce" className={`${sectionY} relative overflow-hidden glass-section`}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-32 right-[-8%] h-72 w-72 rounded-full bg-trtkat-pink/10 blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-trtkat-blue/10 blur-[100px]" />
          </div>
          <div className={`${sectionWrap} relative`}>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-trtkat-pink mb-3 sm:mb-4">
                {t.features.subtitle}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight text-balance">
                {t.features.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                <span className="md:hidden">{t.features.introMobile}</span>
                <span className="hidden md:inline">{t.features.introDesktop}</span>
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {t.features.items.map((feature, idx) => {
                const Icon = featureIcons[idx];
                return (
                  <article
                    key={feature.title}
                    className="group glass-card glass-interactive relative overflow-hidden rounded-3xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-8"
                  >
                    <div className={`mb-5 sm:mb-6 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border ${featureColors[idx]} transition-transform group-hover:scale-110`}>
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
                      <span className="md:hidden">{feature.bodyMobile}</span>
                      <span className="hidden md:inline">{feature.bodyDesktop}</span>
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </RevealSection>

        <RevealSection id="benefity" className={`${sectionY} relative overflow-hidden`}>
          <div className={sectionWrap}>
            <div className="text-center max-w-3xl lg:max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight text-balance">
                <span className="inline-block">{t.benefits.title}</span>
                <br />
                <span className="text-gradient inline-block">{t.benefits.titleAccent}</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                <span className="md:hidden">{t.benefits.introMobile}</span>
                <span className="hidden md:inline">{t.benefits.introDesktop}</span>
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {t.benefits.items.map((benefit, idx) => {
                const Icon = benefitIcons[idx];
                const colors = ['text-trtkat-blue', 'text-trtkat-pink', 'text-yellow-400', 'text-purple-400'];
                return (
                  <div key={benefit.title} className="glass-subtle glass-interactive p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] group">
                    <div className={`glass-subtle w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform ${colors[idx]}`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        <RevealSection id="duvera" className={`${sectionY} bg-trtkat-gradient/5`}>
          <div className={sectionWrap}>
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 xl:gap-28 items-center">
              <div className="relative pb-20 sm:pb-24 lg:pb-0">
                <div className="aspect-[4/5] sm:aspect-square rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl">
                  <img
                    src={vibeImageSrc}
                    alt={t.trust.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 sm:-bottom-8 inset-x-0 flex justify-center px-4 lg:inset-auto lg:bottom-8 lg:right-8 lg:block lg:px-0">
                  <div
                    className="z-10 w-full max-w-xs rounded-3xl p-5 sm:w-auto sm:p-6 md:rounded-[2.5rem] md:p-8"
                    style={frostedQuoteStyle}
                  >
                    {t.trust.quotes.map((item) => (
                      <div key={item.author}>
                        <p className="text-base sm:text-lg font-black text-white italic">&ldquo;{item.quote}&rdquo;</p>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-trtkat-pink" />
                          <span className="font-bold text-slate-400">{item.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-5 sm:mb-6 leading-tight">{t.trust.title}</h2>
                <div className="space-y-5 sm:space-y-6 md:space-y-8">
                  {t.trust.items.map((item, idx) => {
                    const icons = [Lock, MessageCircle, ShieldCheck];
                    const Icon = icons[idx];
                    const iconColors = ['text-trtkat-blue bg-trtkat-blue/20', 'text-trtkat-pink bg-trtkat-pink/20', 'text-yellow-400 bg-yellow-400/20'];
                    return (
                      <div key={item.title} className="flex gap-4 md:gap-6">
                        <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${iconColors[idx]}`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg md:text-xl font-black text-white mb-1.5 sm:mb-2">{item.title}</h4>
                          <p className="text-sm sm:text-base text-slate-400 font-medium">
                            <span className="md:hidden">{item.bodyMobile}</span>
                            <span className="hidden md:inline">{item.bodyDesktop}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <StatsSection />

        <RevealSection id="o-nas" className={`${sectionY} relative overflow-hidden`}>
          <div className={sectionWrap}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 sm:mb-6 leading-tight">
                {t.about.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                <span className="md:hidden">{t.about.bodyMobile}</span>
                <span className="hidden md:inline">{t.about.bodyDesktop}</span>
              </p>
            </div>
          </div>
        </RevealSection>

        <SeoFaqSection />

        <RevealSection id="stahnout-cta" className={`${sectionY} relative overflow-hidden`}>
          <div className="cta-glow pointer-events-none absolute inset-0 bg-trtkat-gradient opacity-10 -z-10" aria-hidden="true" />
          <div className={`${sectionWrapNarrow} text-center`}>
            <h2 className="text-3xl sm:text-4xl md:text-8xl font-black text-white mb-5 sm:mb-6 md:mb-8 leading-tight tracking-tighter">{t.cta.title}</h2>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-400 mb-8 md:mb-10 font-medium max-w-3xl mx-auto">
              <span className="md:hidden">{t.cta.bodyMobile}</span>
              <span className="hidden md:inline">{t.cta.bodyDesktop}</span>
            </p>
            <div className="flex justify-center">
              <StoreBadges size="lg" layout="stack" className="justify-center" />
            </div>
            <p className="mt-8 sm:mt-10 md:mt-12 text-slate-500 font-bold uppercase tracking-[0.12em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm">{t.cta.footnote}</p>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
