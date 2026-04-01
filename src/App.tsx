/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Play, 
  Zap,
  ArrowRight,
  MessageCircle,
  Lock,
  Sparkles,
  Smile,
  Moon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useInView } from 'react-intersection-observer';

const categoryChartData: Record<
  string,
  {
    title: string;
    subtitle: string;
    suffix: string;
    data: { label: string; value: number }[];
  }
> = {
  seznamovani: {
    title: 'Podíl online seznámení podle věku',
    subtitle: 'U mladých dospělých je online seznamování výrazně běžnější.',
    suffix: '%',
    data: [
      { label: '18-25', value: 20.7 },
      { label: '66-75', value: 4.9 },
    ],
  },
  vztahy: {
    title: 'Struktura dlouhodobých vztahů',
    subtitle: 'Většina dospělých žije ve vztahu, ale část zadaných má i sexuální vztah navíc.',
    suffix: '%',
    data: [
      { label: 'Vztah', value: 73.7 },
      { label: 'Bez vztahu', value: 25.6 },
      { label: 'I sex. vztah', value: 26.7 },
    ],
  },
  online: {
    title: 'Online sexualita v číslech',
    subtitle: 'Digitální intimita je běžná součást života napříč věkem.',
    suffix: '%',
    data: [
      { label: 'Sled. porno', value: 78.5 },
      { label: 'Riziko', value: 3.1 },
      { label: 'Nude poslalo', value: 16.0 },
    ],
  },
  bezpeci: {
    title: 'Bezpečí a nátlak',
    subtitle: 'Data potvrzují, že bezpečnostní pravidla musí být core feature.',
    suffix: '%',
    data: [
      { label: 'Donucení ženy', value: 16.8 },
      { label: 'Nevyž. kontakt', value: 29.9 },
      { label: 'Nahlášení', value: 6.1 },
    ],
  },
};

const timelineData = [
  { period: '1993 -> 2008', label: 'Pokles počtu partnerů za 12 měsíců', value: 'Muži 1,73 -> 1,28 | Ženy 1,51 -> 0,99' },
  { period: '1993 -> 2008', label: 'Pokles spokojenosti se sexuálním životem', value: 'Ženy 82 % -> 72 % | Muži 76 % -> 68 %' },
  { period: '1993 -> 2008', label: 'Růst zodpovědnější antikoncepce', value: 'U náhodné partnerky kondom u mužů 41 % -> 88 %' },
];

const statCategories = [
  {
    key: 'seznamovani',
    label: 'Seznamování',
    title: 'Jak se lidé v Česku seznamují',
    stats: [
      { value: '13,4 %', title: 'párů se seznámí online', desc: 'Online je běžná cesta, ale ne jediná.' },
      { value: '29,6 %', title: 'přes přátele a známé', desc: 'Nejčastější forma seznámení.' },
      { value: '20,0 %', title: 'práce nebo škola', desc: 'Druhá nejsilnější cesta.' },
      { value: '17,5 %', title: 'společenské aktivity', desc: 'Třetí nejčastější cesta.' },
      { value: '20,7 %', title: 'online ve věku 18-25', desc: 'U mladých je online seznámení výrazně častější.' },
      { value: '4,9 %', title: 'online ve věku 66-75', desc: 'S věkem podíl online seznámení klesá.' },
    ],
  },
  {
    key: 'vztahy',
    label: 'Vztahy',
    title: 'Reálné vztahové uspořádání dospělých',
    stats: [
      { value: '73,7 %', title: 'v dlouhodobém vztahu', desc: 'Většina dospělých žije ve vztahu.' },
      { value: '25,6 %', title: 'bez dlouhodobého vztahu', desc: 'Významná část vztah nemá.' },
      { value: '26,7 %', title: 'zadaných má i sexuální vztah', desc: 'Může jít i o otevřené vztahy, nejen nevěru.' },
      { value: '17,46', title: 'první sex u žen (průměrný věk)', desc: 'U mužů je to 18,33.' },
      { value: '16,63', title: 'první sex ženy 18-25', desc: 'U mužů 18-25 je to 17,21.' },
      { value: '5', title: 'medián partnerů za život', desc: 'Medián je pro veřejné srovnání poctivější než průměr.' },
    ],
  },
  {
    key: 'online',
    label: 'Online sexualita',
    title: 'Digitální intimita je mainstream',
    stats: [
      { value: '78,5 %', title: 'někdy sledovalo pornografii', desc: 'Muži 89,5 % | Ženy 67,6 %.' },
      { value: '3,1 %', title: 'ohrožení problémovým sledováním', desc: 'Ve věku 18-34 jde o 5,4 %.' },
      { value: '12 %', title: 'mužů má zkušenost s live sexem', desc: 'U žen 4 %.' },
      { value: '16 %', title: 'poslalo nahou fotku/video', desc: 'Stejný podíl u mužů i žen.' },
      { value: '8,6 / 11,6', title: 'průměr partnerů za život', desc: 'Ženy 8,6 | Muži 11,6, medián je ale 5.' },
      { value: '6 % / 8 %', title: 'nikdy nemělo sex', desc: 'Ženy cca 6 % | Muži cca 8 %.' },
    ],
  },
  {
    key: 'bezpeci',
    label: 'Bezpečí',
    title: 'Bezpečnost není bonus, ale základ',
    stats: [
      { value: '61,19 %', title: 'žen mělo sexuální problém', desc: 'U mužů 55,01 %.' },
      { value: '21,41 %', title: 'klinicky významné potíže u žen', desc: 'U mužů 16,06 %.' },
      { value: '5,0 %', title: 'žen hledalo odbornou pomoc', desc: 'U mužů 4,6 %.' },
      { value: '16,8 %', title: 'žen zažilo donucení hrozbou/násilím', desc: 'U mužů 4,9 %.' },
      { value: '29,9 %', title: 'žen zažilo nevyžádaný kontakt', desc: 'U mužů 16,9 %.' },
      { value: '6,1 %', title: 'žen nahlásilo znásilnění/nátlak', desc: 'U mužů 2,0 %.' },
    ],
  },
];

const mentalHealthBenefits = [
  { 
    title: 'Méně stresu', 
    desc: 'Sex snižuje hladinu kortizolu. Je to nejstarší a nejpřirozenější lék na úzkost.',
    icon: Smile,
    color: 'text-trtkat-blue'
  },
  { 
    title: 'Lepší spánek', 
    desc: 'Oxytocin a prolaktin tě po orgasmu vypnou lépe než jakýkoliv prášek na spaní.',
    icon: Moon,
    color: 'text-trtkat-pink'
  },
  { 
    title: 'Sebevědomí', 
    desc: 'Cítit se chtěný/á je základní lidská potřeba. Sex ti připomene, že jsi naživu.',
    icon: Zap,
    color: 'text-yellow-400'
  },
  { 
    title: 'Kreativita', 
    desc: 'Uvolněné tělo znamená uvolněnou mysl. Po dobrém sexu se lépe přemýšlí.',
    icon: Sparkles,
    color: 'text-purple-400'
  }
];

const logoSrc = '/logo/logo%20trtkat.svg';
const vibeImageSrc = '/images/IMG_3760.jpeg';
const appUrl = 'https://trtkat.marhla.workers.dev/';
const sectionWrap = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
const sectionY = 'py-16 md:py-24';

export default function App() {
  const { ref: statsRef } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeStatCategory, setActiveStatCategory] = useState(statCategories[0].key);
  const currentStats = statCategories.find((item) => item.key === activeStatCategory) ?? statCategories[0];
  const currentChart = categoryChartData[activeStatCategory] ?? categoryChartData.seznamovani;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-trtkat-pink/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className={sectionWrap}>
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-24 md:w-28">
                <img src={logoSrc} alt="Trtkat logo" className="w-full h-auto" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-300 uppercase tracking-wider text-slate-400">
              <a href="#jak-to-funguje" className="hover:text-white transition-colors">O nás</a>
              <a href="#data" className="hover:text-white transition-colors">Statistiky</a>
              <a href="#vibe" className="hover:text-white transition-colors">Etika</a>
              <a href={appUrl} target="_blank" rel="noreferrer" className="bg-trtkat-gradient text-white px-6 py-2.5 rounded-xl font-black hover:shadow-[0_0_20px_rgba(240,98,161,0.3)] transition-all active:scale-95">
                Vyzkoušet zdarma
              </a>
            </div>
            <a href={appUrl} target="_blank" rel="noreferrer" className="md:hidden bg-trtkat-gradient text-white px-3 py-2 rounded-xl font-black text-xs">
              Vyzkoušet zdarma
            </a>
          </div>
          <div className="md:hidden pb-3 flex items-center gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider text-slate-300">
            <a href="#jak-to-funguje" className="whitespace-nowrap">Funkce</a>
            <a href="#data" className="whitespace-nowrap">Věda</a>
            <a href="#benefity" className="whitespace-nowrap">Benefity</a>
            <a href="#vibe" className="whitespace-nowrap">Etika</a>
          </div>
        </div>
      </nav>
      <motion.main className="flex-grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
        {/* Hero Section */}
        <section className={`relative min-h-[80vh] md:min-h-[90vh] flex items-center ${sectionY} overflow-hidden`}>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[340px] h-[340px] md:w-[600px] md:h-[600px] bg-trtkat-blue/20 rounded-full blur-[100px] md:blur-[140px] animate-pulse" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[340px] h-[340px] md:w-[600px] md:h-[600px] bg-trtkat-pink/20 rounded-full blur-[100px] md:blur-[140px] animate-pulse" />
          
          <div className={`${sectionWrap} relative`}>
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-12 bg-trtkat-pink" />
                  <span className="text-trtkat-pink text-[11px] sm:text-sm font-black uppercase tracking-[0.18em] sm:tracking-[0.3em]">
                    Pro studenty
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9] md:leading-[0.85]">
                  Ušetři čas. <br />
                  <span className="text-gradient">Užij si noc.</span>
                </h1>
                <p className="font-book text-base sm:text-lg md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                  Ne každý chce vztah. Trtkat pomáhá najít někoho na příjemný večer a poznání, jednoduše a bez zdlouhavého psaní.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-12 mt-12">
                  <a href={appUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-trtkat-gradient text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl font-black text-lg md:text-2xl shadow-[0_20px_50px_rgba(240,98,161,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 md:gap-4">
                    <Play className="w-6 h-6 md:w-7 md:h-7" />
                    Vyzkoušet zdarma
                  </a>
                  <a href="#data" className="text-slate-400 hover:text-white font-bold text-base md:text-lg transition-colors flex items-center justify-center gap-2">
                    Zajímají mě statistiky <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="jak-to-funguje" className={`${sectionY} relative overflow-hidden bg-white/2`}>
          <div className={sectionWrap}>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-4">Nejsme klasická seznamka.</h2>
              <p className="text-sm sm:text-base md:text-xl text-slate-400 font-medium tracking-[0.08em] uppercase">Jsme zkratka k jasné domluvě.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute -top-3 -left-2 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-trtkat-blue rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl md:text-2xl shadow-xl">1</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 mt-6 md:mt-4">Match bez keců</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  <span className="md:hidden">Padli jste si do oka? Jdete rovnou na další krok.</span>
                  <span className="hidden md:inline">
                  Padli jste si do oka? Super. Trtkat přeskočí zdlouhavé vypisování a posune vás rovnou k dalšímu kroku.
                  Bez trapných otevíráků a bez zbytečného čekání.
                  </span>
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute -top-3 -left-2 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-trtkat-pink rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl md:text-2xl shadow-xl">2</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 mt-6 md:mt-4">Místo na půl cesty</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  <span className="md:hidden">Aplikace navrhne neutrální místo na půl cesty.</span>
                  <span className="hidden md:inline">
                  Aplikace nabídne neutrální místo na půl cesty mezi vámi.
                  Rychlé, jednoduché a bez zbytečného domlouvání.
                  </span>
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute -top-3 -left-2 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl md:text-2xl shadow-xl">3</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 mt-6 md:mt-4">Jasná očekávání</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  <span className="md:hidden">Jasná pravidla a respekt k hranicím od začátku.</span>
                  <span className="hidden md:inline">
                  Každý ví, proč tu je. Bez falešných slibů, bez matení signálů a bez hraní rolí.
                  Respekt k hranicím je základ.
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`} ref={statsRef}>
          <div className={sectionWrap}>
            <div className="mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 leading-tight">Sexualita v Česku v číslech</h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-4xl">
                <span className="md:hidden">
                  Interaktivní přehled českých dat o seznamování, vztazích, online sexualitě a bezpečí.
                </span>
                <span className="hidden md:inline">
                Bez mýtů a bez moralizování. Interaktivní přehled vychází z českých reprezentativních dat a ukazuje,
                jak se dnes lidé seznamují, co hledají online a kde jsou jejich hranice.
                </span>
              </p>
            </div>

            <div className="hidden md:flex flex-wrap gap-3 mb-8">
              {statCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveStatCategory(category.key)}
                  className={`px-4 py-2 rounded-xl text-sm md:text-base font-bold transition-all border ${
                    activeStatCategory === category.key
                      ? 'bg-trtkat-gradient text-white border-transparent'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="md:hidden space-y-3 mb-8">
              {statCategories.map((category) => (
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
              <details className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <summary className="cursor-pointer font-bold text-white">Timeline / historický kontext</summary>
                <div className="mt-3 space-y-3">
                  {timelineData.map((item) => (
                    <div key={`mobile-${item.label}`} className="text-sm text-slate-300">
                      <div className="text-trtkat-blue font-bold">{item.period}</div>
                      <div>{item.label}</div>
                      <div className="text-slate-400">{item.value}</div>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="hidden md:grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-3">{currentStats.title}</h3>
                <p className="text-slate-400 mb-6">
                  Klikáním mezi kategoriemi porovnáš čísla v kontextu současné české reality.
                </p>

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
                <div className="absolute inset-0 bg-trtkat-blue/10 blur-[100px] -z-10" />
                <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl mb-6">
                  <h3 className="text-base sm:text-xl font-black text-white mb-6 flex items-center gap-3">
                    <BarChart className="w-6 h-6 text-trtkat-blue" />
                    {currentChart.title}
                  </h3>
                  <div className="h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentChart.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold' }} />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value: number) => [`${value} ${currentChart.suffix}`, 'Hodnota']}
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                          contentStyle={{ backgroundColor: '#020617', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={56}>
                          {currentChart.data.map((entry, index) => (
                            <Cell key={`${entry.label}-${index}`} fill={index % 2 === 0 ? '#f062a1' : '#4fb3f0'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-slate-500 text-sm font-bold mt-4 italic">
                    {currentChart.subtitle}
                  </p>
                </div>

                <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                  <h3 className="text-base sm:text-xl font-black text-white mb-5">Jak se sexualita v Česku proměňuje</h3>
                  <div className="space-y-4">
                    {timelineData.map((item) => (
                      <div key={item.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-trtkat-blue font-bold text-sm uppercase tracking-wider">{item.period}</div>
                        <div className="text-slate-200 font-bold mt-1">{item.label}</div>
                        <div className="text-slate-400 text-sm mt-1">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefity" className={`${sectionY} relative overflow-hidden`}>
          <div className={sectionWrap}>
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6">Ne každý teď chce vztah. <br /><span className="text-gradient">A to je v pořádku.</span></h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                <span className="md:hidden">
                  Ne každý chce vztah. Někdy stačí jasná shoda, respekt a minimum zbytečností.
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mentalHealthBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${benefit.color}`}>
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">
                    {idx === 0 ? 'Bez her' : idx === 1 ? 'Bez tlaku' : idx === 2 ? 'Opravdově' : 'Bez očekávání'}
                  </h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {idx === 0
                      ? '	Bez obcházení a falešných náznaků.'
                      : idx === 1
                      ? 'Všechno stojí vzájemném souhlasu a respektu.'
                      : idx === 2
                      ? 'Každý profil patří reálnému člověku.'
                      : 'Bez bolestných zklamání a trápení.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vibe Section */}
        <section id="vibe" className={`${sectionY} bg-trtkat-gradient/5`}>
          <div className={sectionWrap}>
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative">
                <div className="aspect-square rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={vibeImageSrc}
                    alt="Intimacy" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="mt-6 md:mt-0 md:absolute md:-bottom-8 md:-right-8 p-6 md:p-8 bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl max-w-xs">
                  <p className="text-lg font-black text-white italic">
                    "Kvůli škole a práci nemám kapacitu na vztah. Tady aspoň nikdo nic nepředstírá a všichni vědí, na čem jsou."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-trtkat-pink" />
                    <span className="font-bold text-slate-400">Marek, Praha</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Důvěra a bezpečí</h2>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-trtkat-blue/20 rounded-xl flex items-center justify-center text-trtkat-blue">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-2">Soukromí bez zbytečného sdílení</h4>
                      <p className="text-slate-400 font-medium">
                        <span className="md:hidden">Co řešíš v appce, zůstává soukromé.</span>
                        <span className="hidden md:inline">To, co řešíš v aplikaci, má zůstat soukromé. Minimum zbytečností, maximum kontroly nad tím, co sdílíš a s kým.</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-trtkat-pink/20 rounded-xl flex items-center justify-center text-trtkat-pink">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-2">Jasná pravidla od začátku</h4>
                      <p className="text-slate-400 font-medium">
                        <span className="md:hidden">Každý ví, proč tu je. Bez her a nejasných signálů.</span>
                        <span className="hidden md:inline">Každý ví, proč tu je. Bez trapných her, bez vodění za nos a bez nejasných signálů.</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center text-yellow-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-2">Respekt na prvním místě</h4>
                      <p className="text-slate-400 font-medium">
                        <span className="md:hidden">Souhlas, slušnost a lidskost jsou základ.</span>
                        <span className="hidden md:inline">Nezávazně neznamená bez respektu. Naše komunita stojí na souhlasu a lidskosti.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={`${sectionY} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-trtkat-gradient opacity-10 blur-[100px] -z-10" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tighter">Méně řečí. Víc jasno.</h2>
              <p className="text-lg md:text-3xl text-slate-400 mb-8 md:mb-10 font-medium max-w-3xl mx-auto">
                <span className="md:hidden">
                  Když nehledáš vztah, nemusíš trávit večery chatem. Trtkat = jasná domluva a respekt. Zdarma.
                </span>
                <span className="hidden md:inline">
                Když teď nehledáš vztah, nemusíš trávit večery nekonečným chatem.
                Trtkat je pro dospělé 18+, kteří chtějí jasnou domluvu, respekt a minimum zbytečností.
                Začít můžeš zdarma.
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href={appUrl} target="_blank" rel="noreferrer" className="bg-white text-slate-950 px-8 md:px-14 py-4 md:py-7 rounded-2xl md:rounded-3xl font-black text-xl md:text-3xl hover:scale-[1.02] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.15)] flex items-center gap-3 md:gap-4">
                  <Play className="w-7 h-7 md:w-9 md:h-9" />
                  Vyzkoušet zdarma
                </a>
              </div>
              <p className="mt-10 md:mt-12 text-slate-500 font-bold uppercase tracking-[0.12em] md:tracking-[0.3em] text-xs md:text-sm">
                Bez paywallu. Bez přetvářky. Jen jasno.
              </p>
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 md:py-20">
        <div className={sectionWrap}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            <div className="w-32">
              <img src={logoSrc} alt="Trtkat logo" className="w-full h-auto" />
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-white font-black uppercase tracking-[0.18em] text-xs mb-3">Nabídka</h4>
              <div className="flex flex-wrap justify-center md:justify-end gap-5 md:gap-8 text-slate-400 font-bold uppercase tracking-wide text-xs md:text-sm">
                <a href="#jak-to-funguje" className="hover:text-white transition-colors">Jak to funguje</a>
                <a href="#data" className="hover:text-white transition-colors">Statistiky</a>
                <a href="#vibe" className="hover:text-white transition-colors">Bezpečí</a>
                <a href={appUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Aplikace</a>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-xs md:text-sm font-medium">
            © 2026 Trtkat. Pro dospělé 18+.
          </div>
        </div>
      </footer>
    </div>
  );
}
