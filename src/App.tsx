/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Download, 
  Zap,
  ArrowRight,
  MessageCircle,
  Lock,
  Smartphone,
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

// Data focusing on the "Sex Recession" and mental health benefits
const sexRecessionData = [
  { year: '1990', frequency: 80, label: 'Aktivní generace' },
  { year: '2000', frequency: 72, label: 'Nástup technologií' },
  { year: '2010', frequency: 65, label: 'Sociální sítě' },
  { year: '2020', frequency: 54, label: 'Dnešní izolace' },
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

export default function App() {
  const { ref: statsRef } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-trtkat-pink/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-24 md:w-28">
                <img src={logoSrc} alt="Trtkat logo" className="w-full h-auto" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-400">
              <a href="#jak-to-funguje" className="hover:text-white transition-colors">Funkce</a>
              <a href="#data" className="hover:text-white transition-colors">Věda</a>
              <a href="#vibe" className="hover:text-white transition-colors">Etika</a>
              <a href={appUrl} target="_blank" rel="noreferrer" className="bg-trtkat-gradient text-white px-6 py-2.5 rounded-xl font-black hover:shadow-[0_0_20px_rgba(240,98,161,0.3)] transition-all active:scale-95">
                Otevřít aplikaci
              </a>
            </div>
            <a href={appUrl} target="_blank" rel="noreferrer" className="md:hidden bg-trtkat-gradient text-white px-3 py-2 rounded-xl font-black text-xs">
              Otevřít aplikaci
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
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[340px] h-[340px] md:w-[600px] md:h-[600px] bg-trtkat-blue/20 rounded-full blur-[100px] md:blur-[140px] animate-pulse" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[340px] h-[340px] md:w-[600px] md:h-[600px] bg-trtkat-pink/20 rounded-full blur-[100px] md:blur-[140px] animate-pulse" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="h-px w-12 bg-trtkat-pink" />
                  <span className="text-trtkat-pink text-[11px] sm:text-sm font-black uppercase tracking-[0.18em] sm:tracking-[0.3em]">
                    Je čas přestat se omlouvat
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-[0.9] md:leading-[0.85]">
                  Ušetři čas. <br />
                  <span className="text-gradient">Užij si noc.</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-3xl text-slate-300 mb-10 md:mb-12 leading-relaxed font-medium max-w-2xl">
                  Průměrný člověk stráví na seznamkách 10 hodin týdně psaním zpráv, které nikam nevedou. 
                  Trtkat chat úplně zrušil. Když je tam shoda, jdete rovnou na věc. 
                  Jednoduše, diskrétně, hned a zdarma.
                </p>
                <p className="text-sm sm:text-base text-trtkat-blue font-bold mb-6">
                  Bez paywallu. Bez skrytých poplatků. Základní používání je zdarma pro každého.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6">
                  <a href={appUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-trtkat-gradient text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl font-black text-lg md:text-2xl shadow-[0_20px_50px_rgba(240,98,161,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 md:gap-4">
                    <Download className="w-6 h-6 md:w-7 md:h-7" />
                    Otevřít aplikaci
                  </a>
                  <a href="#data" className="text-slate-400 hover:text-white font-bold text-base md:text-lg transition-colors flex items-center justify-center gap-2">
                    Ukaž mi data <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="jak-to-funguje" className="py-20 md:py-32 relative overflow-hidden bg-white/2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 md:mb-24">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6">Nejsme seznamka.</h2>
              <p className="text-sm sm:text-base md:text-xl text-slate-400 font-medium tracking-[0.18em] uppercase">Jsme nástroj pro tvoje potřeby.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-7 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute -top-3 -left-2 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-trtkat-blue rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl md:text-2xl shadow-xl">1</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 mt-6 md:mt-4">Match bez keců</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Líbíte se si? Skvělé. Zapomeň na chatování. V Trtkat neexistují zprávy. 
                  Když je tam shoda, jde se rovnou do akce.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-7 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute -top-3 -left-2 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-trtkat-pink rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl md:text-2xl shadow-xl">2</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 mt-6 md:mt-4">Místo na půl cesty</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Algoritmus okamžitě najde ideální místo k setkání přesně uprostřed mezi vámi. 
                  Žádné dohadování, žádné komplikace.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-7 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute -top-3 -left-2 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl md:text-2xl shadow-xl">3</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 mt-6 md:mt-4">Čistá hlava</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Potkáte se, užijete si to a jdete domů. Žádné falešné sliby, 
                  žádné emocionální břemeno. Jen čistá biologie.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Data Section - The Sex Recession */}
        <section id="data" className="py-20 md:py-32 bg-slate-900/30 border-y border-white/5" ref={statsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
                  Mladí lidé mají <br />
                  <span className="text-trtkat-blue">nejméně sexu v historii.</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed font-medium">
                  Studie ukazují, že frekvence sexu u mladých dospělých klesá už tři dekády. 
                  Výsledek? Rekordní míra úzkostí, depresí a pocitu izolace. 
                  Technologie nás spojily digitálně, ale odpojily fyzicky. 
                  My to chceme změnit.
                </p>
                
                <div className="space-y-5 md:space-y-8">
                  <div className="p-6 md:p-8 bg-white/5 rounded-3xl border border-white/10">
                    <div className="text-4xl font-black text-trtkat-pink mb-2">-30%</div>
                    <div className="text-slate-300 font-bold text-lg">Pokles sexuální aktivity od roku 1990</div>
                    <p className="text-slate-500 mt-2">Důsledek: Vyšší hladina stresu a pocit prázdnoty.</p>
                  </div>
                  <div className="p-6 md:p-8 bg-white/5 rounded-3xl border border-white/10">
                    <div className="text-4xl font-black text-trtkat-blue mb-2">8 z 10</div>
                    <div className="text-slate-300 font-bold text-lg">lidí potvrzuje, že sex jim okamžitě zlepší náladu</div>
                    <p className="text-slate-500 mt-2">Fyzický kontakt je biologická nutnost, ne luxus.</p>
                  </div>
                  <div className="p-6 md:p-8 bg-trtkat-blue/10 rounded-3xl border border-trtkat-blue/30">
                    <div className="text-2xl font-black text-trtkat-blue mb-2">Vše zdarma</div>
                    <p className="text-slate-300 font-medium">Žádné předplatné pro základní používání. Otevřeš a používáš zdarma.</p>
                  </div>
                </div>
              </motion.div>

              <div className="relative">
                <div className="absolute inset-0 bg-trtkat-blue/10 blur-[100px] -z-10" />
                <div className="bg-slate-950 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl h-[360px] sm:h-[440px] md:h-[500px]">
                  <h3 className="text-base sm:text-xl font-black text-white mb-6 md:mb-12 flex items-center gap-3">
                    <BarChart className="w-6 h-6 text-trtkat-blue" />
                    Frekvence sexu u mladých (index)
                  </h3>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={sexRecessionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold' }} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#020617', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                      />
                      <Bar dataKey="frequency" radius={[10, 10, 0, 0]} barSize={42}>
                        {sexRecessionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 3 ? '#f062a1' : '#4fb3f0'} opacity={0.6 + (index * 0.1)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-center text-slate-500 text-sm font-bold mt-4 italic">
                    "Máme víc followerů, ale míň doteků. Je čas to otočit."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefity" className="py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-24">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8">Sex je terapie. <br /><span className="text-gradient">Doslova.</span></h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                Nezávazný sex není "špatný". Je to způsob, jak se postarat o své duševní zdraví, 
                když zrovna nemáš čas nebo energii na budování vztahu. 
                Tvoje tělo ti poděkuje.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {mentalHealthBenefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-7 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${benefit.color}`}>
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4">{benefit.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vibe Section */}
        <section id="vibe" className="py-20 md:py-32 bg-trtkat-gradient/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
              <div className="relative">
                <div className="aspect-square rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={vibeImageSrc}
                    alt="Intimacy" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="mt-6 md:mt-0 md:absolute md:-bottom-10 md:-right-10 p-6 md:p-10 bg-slate-950 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl max-w-xs">
                  <p className="text-lg font-black text-white italic">
                    "Kvůli práci nemám čas na vztahy, ale chci být zdravý. Trtkat mi dává přesně to, co potřebuju, bez zbytečných her."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-trtkat-pink" />
                    <span className="font-bold text-slate-400">Marek, Praha</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
                  Žádné hry. <br />
                  <span className="text-trtkat-pink">Jen biologie.</span>
                </h2>
                <div className="space-y-8 md:space-y-10">
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-trtkat-blue/20 rounded-xl flex items-center justify-center text-trtkat-blue">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-2">Naprostá diskrétnost</h4>
                      <p className="text-slate-400 font-medium">Žádné propojování s FB, žádné sledování. Jen ty a tvé touhy. Co se stane v aplikaci, zůstane tam.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-trtkat-pink/20 rounded-xl flex items-center justify-center text-trtkat-pink">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-2">Upřímná komunikace</h4>
                      <p className="text-slate-400 font-medium">U nás se nehraje na schovávanou. Všichni vědí, proč tu jsou. Šetříme tvůj čas i nervy.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center text-yellow-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-2">Respekt na prvním místě</h4>
                      <p className="text-slate-400 font-medium">Nezávazně neznamená bez respektu. Naše komunita stojí na souhlasu a lidskosti.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-trtkat-gradient opacity-10 blur-[100px] -z-10" />
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 md:mb-10 leading-tight tracking-tighter">
                Žádné sliby. <br />
                <span className="text-gradient">Jen výsledek.</span>
              </h2>
              <p className="text-lg md:text-3xl text-slate-400 mb-10 md:mb-12 font-medium max-w-3xl mx-auto">
                Tvoje tělo nečeká na schválení od společnosti. 
                Přestaň hledat vztah tam, kde chceš jen uvolnění. 
                Trtkat je zkratka, kterou jsi hledal/a. A začít můžeš zdarma.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href={appUrl} target="_blank" rel="noreferrer" className="bg-white text-slate-950 px-8 md:px-14 py-4 md:py-7 rounded-2xl md:rounded-3xl font-black text-xl md:text-3xl hover:scale-[1.02] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.15)] flex items-center gap-3 md:gap-4">
                  <Download className="w-7 h-7 md:w-9 md:h-9" />
                  Otevřít aplikaci
                </a>
              </div>
              <p className="mt-10 md:mt-12 text-slate-500 font-bold uppercase tracking-[0.12em] md:tracking-[0.3em] text-xs md:text-sm">
                Žádné závazky. Žádné lži. Jen ty. A všechno zdarma.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            <div className="w-32">
              <img src={logoSrc} alt="Trtkat logo" className="w-full h-auto" />
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:gap-10 text-slate-400 font-bold uppercase tracking-wide md:tracking-widest text-xs md:text-sm">
              <a href="#" className="hover:text-white transition-colors">Podmínky</a>
              <a href="#" className="hover:text-white transition-colors">Soukromí</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-xs md:text-sm font-medium">
            © 2026 Trtkat. Žijeme jen jednou, tak ať to stojí za to.
          </div>
        </div>
      </footer>
    </div>
  );
}
