import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  MessageCircle,
  Lock,
  Sparkles,
  Smile,
  Moon,
  BarChart,
} from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart as RechartsBarChart,
} from 'recharts';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '../i18n/I18nProvider';
import { StoreBadges } from '../components/StoreBadges';
import { SEO } from '../components/SEO';
import { buildLandingSchemas } from '../lib/schema';
import { sectionWrap, sectionWrapNarrow, sectionY, heroPhoneSrc } from '../lib/navigation';

const benefitIcons = [Smile, Moon, Zap, Sparkles];
const vibeImageSrc = '/images/IMG_3760.jpeg';

export function LandingPage() {
  const { t } = useI18n();
  const { ref: statsRef } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeStatCategory, setActiveStatCategory] = useState(t.data.statCategories[0].key);

  const currentStats =
    t.data.statCategories.find((item) => item.key === activeStatCategory) ?? t.data.statCategories[0];
  const currentChart = t.data.charts[activeStatCategory] ?? t.data.charts.seznamovani;

  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.description}
        path="/"
        jsonLd={buildLandingSchemas(t)}
      />

      <motion.main
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -bottom-24 sm:-bottom-32 overflow-hidden">
            <div className="absolute -top-20 right-[-10%] h-64 w-64 sm:h-80 sm:w-80 md:h-[640px] md:w-[640px] rounded-full bg-trtkat-blue/25 blur-[90px] md:blur-[150px]" />
            <div className="absolute bottom-[-15%] left-[-12%] h-64 w-64 sm:h-80 sm:w-80 md:h-[640px] md:w-[640px] rounded-full bg-trtkat-pink/25 blur-[90px] md:blur-[150px]" />
          </div>
          <div className="hero-fade-bottom" aria-hidden="true" />

          <div className={`${sectionWrap} relative z-[2] min-h-svh flex items-center pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-14 md:pb-20`}>
            <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="order-1 mx-auto w-full max-w-4xl text-center md:mx-0 md:text-left"
              >
                <div className="mb-5 flex items-center justify-center gap-3 md:justify-start md:mb-6">
                  <span className="hidden h-px w-10 bg-trtkat-pink sm:block md:w-12" />
                  <span className="rounded-full border border-trtkat-pink/30 bg-trtkat-pink/10 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-trtkat-pink">
                    {t.hero.badge}
                  </span>
                </div>

                <h1 className="text-[3.35rem] leading-[0.92] sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-5 sm:mb-6">
                  {t.hero.titleLine1}
                  <br />
                  <span className="text-gradient">{t.hero.titleLine2}</span>
                </h1>

                <p className="font-book mx-auto max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg md:mx-0 md:max-w-2xl md:text-2xl">
                  {t.hero.body}
                </p>

                <div id="stahnout" className="mt-8 flex flex-col items-center gap-5 sm:mt-10 md:mt-12 md:items-start">
                  <StoreBadges size="lg" layout="stack" className="justify-center md:justify-start" />
                  <a
                    href="#data"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:text-base md:text-lg"
                  >
                    {t.hero.statsLink}
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="order-2 mx-auto w-full max-w-[204px] sm:max-w-[255px] md:max-w-[289px] lg:mx-0 lg:max-w-[85%] lg:justify-self-end"
              >
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src={heroPhoneSrc}
                    alt={t.hero.imageAlt}
                    width={788}
                    height={1400}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="jak-to-funguje" className="relative pt-8 sm:pt-10 md:pt-12 pb-14 sm:pb-16 md:pb-24">
          <div className={sectionWrap}>
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-3 sm:mb-4 leading-[1.12] sm:leading-[1.1]">{t.how.title}</h2>
              <p className="text-xs sm:text-sm md:text-xl text-slate-400 font-medium tracking-[0.08em] uppercase">{t.how.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">
              {t.how.steps.map((step, idx) => (
                <motion.div key={step.title} whileHover={{ scale: 1.02 }} className="p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-slate-900/50 border border-white/5 relative mt-4 sm:mt-0">
                  <div className={`absolute -top-3 left-3 sm:-top-6 sm:-left-6 w-11 h-11 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-slate-950 font-black text-lg md:text-2xl shadow-xl ${idx === 0 ? 'bg-trtkat-blue' : idx === 1 ? 'bg-trtkat-pink' : 'bg-white'}`}>{idx + 1}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4 mt-5 md:mt-4">{step.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
                    <span className="md:hidden">{step.bodyMobile}</span>
                    <span className="hidden md:inline">{step.bodyDesktop}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`} ref={statsRef}>
          <div className={sectionWrap}>
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight">{t.data.title}</h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-4xl">
                <span className="md:hidden">{t.data.introMobile}</span>
                <span className="hidden md:inline">{t.data.introDesktop}</span>
              </p>
            </div>

            <div className="hidden md:flex flex-wrap gap-3 mb-8">
              {t.data.statCategories.map((category) => (
                <button key={category.key} type="button" onClick={() => setActiveStatCategory(category.key)} className={`px-4 py-2 rounded-xl text-sm md:text-base font-bold transition-all border ${activeStatCategory === category.key ? 'bg-trtkat-gradient text-white border-transparent' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                  {category.label}
                </button>
              ))}
            </div>

            <div className="md:hidden space-y-3 mb-8">
              {t.data.statCategories.map((category) => (
                <details key={category.key} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <summary className="cursor-pointer font-bold text-white">{category.label}</summary>
                  <div className="mt-3 space-y-2">
                    {category.stats.map((stat) => (
                      <div key={`${category.key}-${stat.title}`} className="text-sm text-slate-300">
                        <span className="text-trtkat-pink font-black mr-2">{stat.value}</span>
                        {stat.title}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="hidden md:grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-3">{currentStats.title}</h3>
                <p className="text-slate-400 mb-6">{t.data.compareHint}</p>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                  {currentStats.stats.map((stat) => (
                    <div key={stat.title} className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-3xl md:text-4xl font-black text-trtkat-pink mb-1">{stat.value}</div>
                      <div className="text-slate-200 font-bold">{stat.title}</div>
                      <p className="text-slate-500 mt-2 text-sm md:text-base">{stat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl mb-6">
                  <h3 className="text-base sm:text-xl font-black text-white mb-6 flex items-center gap-3">
                    <BarChart className="w-6 h-6 text-trtkat-blue" />
                    {currentChart.title}
                  </h3>
                  <div className="h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={currentChart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold' }} />
                        <YAxis hide />
                        <Tooltip formatter={(value: number) => [`${value} ${currentChart.suffix}`, t.data.tooltipValue]} cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#020617', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={56}>
                          {currentChart.data.map((entry, index) => (
                            <Cell key={`${entry.label}-${index}`} fill={index % 2 === 0 ? '#f062a1' : '#4fb3f0'} />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefity" className={`${sectionY} relative overflow-hidden`}>
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
                  <div key={benefit.title} className="p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform ${colors[idx]}`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="vibe" className={`${sectionY} bg-trtkat-gradient/5`}>
          <div className={sectionWrap}>
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/5] sm:aspect-square rounded-3xl md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img src={vibeImageSrc} alt={t.trust.imageAlt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-8 lg:-right-8 p-5 sm:p-6 md:p-8 bg-slate-950 rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl max-w-xs mx-auto lg:mx-0">
                  <p className="text-base sm:text-lg font-black text-white italic">&ldquo;{t.trust.quote}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-trtkat-pink" />
                    <span className="font-bold text-slate-400">{t.trust.author}</span>
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
        </section>

        <section id="stahnout-cta" className={`${sectionY} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-trtkat-gradient opacity-10 blur-[100px] -z-10" />
          <div className={`${sectionWrapNarrow} text-center`}>
            <h2 className="text-3xl sm:text-4xl md:text-8xl font-black text-white mb-5 sm:mb-6 md:mb-8 leading-tight tracking-tighter">{t.cta.title}</h2>
            <p className="text-base sm:text-lg md:text-3xl text-slate-400 mb-8 md:mb-10 font-medium max-w-3xl mx-auto">
              <span className="md:hidden">{t.cta.bodyMobile}</span>
              <span className="hidden md:inline">{t.cta.bodyDesktop}</span>
            </p>
            <div className="flex justify-center">
              <StoreBadges size="lg" layout="stack" className="justify-center" />
            </div>
            <p className="mt-8 sm:mt-10 md:mt-12 text-slate-500 font-bold uppercase tracking-[0.12em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm">{t.cta.footnote}</p>
          </div>
        </section>
      </motion.main>
    </>
  );
}
