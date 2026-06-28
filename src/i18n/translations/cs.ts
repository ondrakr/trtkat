import type { SiteCopy } from './types';

export const cs: SiteCopy = {
  meta: {
    title: 'Trtkat — nezávazné seznamování pro studenty | Zdarma',
    description:
      'Moderní seznamovací aplikace pro studenty. Nezávazné seznámení, osvěta o bezpečném seznamování a sexualní výchova. Úplně zdarma.',
  },
  nav: {
    about: 'O nás',
    stats: 'Statistiky',
    ethics: 'Etika',
    features: 'Funkce',
    science: 'Věda',
    benefits: 'Benefity',
    download: 'Stáhnout',
    blog: 'Blog',
  },
  stores: {
    appStoreLabel: 'Stáhnout v App Store',
    googlePlayLabel: 'Stáhnout na Google Play',
  },
  hero: {
    badge: 'Zdarma',
    titleLine1: 'Ušetři čas.',
    titleLine2: 'Užij si noc.',
    body: 'Trtkat je moderní seznamovací aplikace pro navazování nových kontaktů, přátelství i nezávazného seznámení. Osvěta o bezpečném seznamování a sexualní výchova — zdarma.',
    imageAlt: 'Trtkat aplikace na iPhonu — profil, shoda a chat',
  },
  how: {
    title: 'Nejsme klasická seznamka.',
    subtitle: 'Jsme zkratka k jasné domluvě.',
    steps: [
      {
        title: 'Match bez keců',
        bodyMobile: 'Padli jste si do oka? Jdete rovnou na další krok.',
        bodyDesktop:
          'Padli jste si do oka? Super. Trtkat přeskočí zdlouhavé vypisování a posune vás rovnou k dalšímu kroku. Bez trapných otevíráků a bez zbytečného čekání.',
      },
      {
        title: 'Místo na půl cesty',
        bodyMobile: 'Aplikace navrhne neutrální místo na půl cesty.',
        bodyDesktop:
          'Aplikace nabídne neutrální místo na půl cesty mezi vámi. Rychlé, jednoduché a bez zbytečného domlouvání.',
      },
      {
        title: 'Jasná očekávání',
        bodyMobile: 'Jasná pravidla a respekt k hranicím od začátku.',
        bodyDesktop:
          'Každý ví, proč tu je. Bez falešných slibů, bez matení signálů a bez hraní rolí. Respekt k hranicím je základ.',
      },
    ],
  },
  features: {
    title: 'Co v aplikaci najdeš',
    subtitle: 'Víc než swipe a chat',
    introMobile:
      'Rezervace hotelu, plán rande s navigací, flirty hry a mapa ověřených míst — vše přímo v aplikaci.',
    introDesktop:
      'Trtkat není jen seznamka. Rezervuj hotel na půl cesty, naplánuj rande s navigací nebo Boltem/Uberem, zahraj si seznamovací hry a objev hezká místa v okolí.',
    items: [
      {
        title: 'Rezervace na půl cesty',
        bodyMobile: 'Hotel přesně mezi vámi — rezervace přímo v aplikaci.',
        bodyDesktop:
          'Jste z různých měst? Aplikace navrhne hotel na půl cesty a rezervaci vyřešíš v Trtkatu, bez přepínání mezi appkami.',
      },
      {
        title: 'Plán rande na jedno kliknutí',
        bodyMobile: 'Místo, navigace i Bolt nebo Uber — rovnou z aplikace.',
        bodyDesktop:
          'Naplánuj rande s konkrétním místem. Otevři navigaci na adresu, nebo spusť Bolt či Uber — aplikace tě přepne tam, kam potřebuješ.',
      },
      {
        title: 'Flirtovací hry',
        bodyMobile: 'Truth or Dare a další hry, co rozproudí konverzaci.',
        bodyDesktop:
          'Seznamovací a flirty hry přímo v chatu — Truth or Dare, kostka na pravdu, odvážné otázky. Rozlouskni ledy bez trapných otevíráků.',
      },
      {
        title: 'Mapa rande míst',
        bodyMobile: 'Ověřená místa v okolí — kavárny, bary, výhledy.',
        bodyDesktop:
          'Interaktivní mapa hezkých míst na rande. Vyber podle nálady, otevři navigaci a máš jasno, kam jít.',
      },
    ],
  },
  data: {
    title: 'Sexualita v Česku v číslech',
    introMobile:
      'Interaktivní přehled českých dat o seznamování, vztazích, online sexualitě a bezpečí.',
    introDesktop:
      'Bez mýtů a bez moralizování. Interaktivní přehled vychází z českých reprezentativních dat a ukazuje, jak se dnes lidé seznamují, co hledají online a kde jsou jejich hranice.',
    compareHint: 'Klikáním mezi kategoriemi porovnáš čísla v kontextu současné české reality.',
    timelineTitle: 'Jak se sexualita v Česku proměňuje',
    timelineAccordion: 'Timeline / historický kontext',
    tooltipValue: 'Hodnota',
    statCategories: [
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
    ],
    charts: {
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
    },
    timeline: [
      {
        period: '1993 -> 2008',
        label: 'Pokles počtu partnerů za 12 měsíců',
        value: 'Muži 1,73 -> 1,28 | Ženy 1,51 -> 0,99',
      },
      {
        period: '1993 -> 2008',
        label: 'Pokles spokojenosti se sexuálním životem',
        value: 'Ženy 82 % -> 72 % | Muži 76 % -> 68 %',
      },
      {
        period: '1993 -> 2008',
        label: 'Růst zodpovědnější antikoncepce',
        value: 'U náhodné partnerky kondom u mužů 41 % -> 88 %',
      },
    ],
  },
  benefits: {
    title: 'Ne každý teď chce\u00A0vztah.',
    titleAccent: 'A to je v pořádku.',
    introMobile: 'Ne každý chce vztah. Někdy stačí jasná shoda, respekt a minimum zbytečností.',
    introDesktop:
      'Někdy nehledáš lásku na celý život. Někdy chceš jen jasnou shodu, chemii a večer bez zbytečných her. Bez přetvářky, bez tlaku a s respektem k hranicím.',
    items: [
      { title: 'Bez her', desc: 'Bez obcházení a falešných náznaků.' },
      { title: 'Bez tlaku', desc: 'Všechno stojí na vzájemném souhlasu a respektu.' },
      { title: 'Opravdově', desc: 'Každý profil patří reálnému člověku.' },
      { title: 'Bez očekávání', desc: 'Bez bolestných zklamání a trápení.' },
    ],
  },
  trust: {
    title: 'Důvěra a bezpečí',
    quote:
      'Kvůli škole a práci nemám kapacitu na vztah. Tady aspoň nikdo nic nepředstírá a všichni vědí, na čem jsou.',
    author: 'Marek, Praha',
    imageAlt: 'Intimita',
    items: [
      {
        title: 'Soukromí bez zbytečného sdílení',
        bodyMobile: 'Co řešíš v appce, zůstává soukromé.',
        bodyDesktop:
          'To, co řešíš v aplikaci, má zůstat soukromé. Minimum zbytečností, maximum kontroly nad tím, co sdílíš a s kým.',
      },
      {
        title: 'Jasná pravidla od začátku',
        bodyMobile: 'Každý ví, proč tu je. Bez her a nejasných signálů.',
        bodyDesktop:
          'Každý ví, proč tu je. Bez trapných her, bez vodění za nos a bez nejasných signálů.',
      },
      {
        title: 'Respekt na prvním místě',
        bodyMobile: 'Souhlas, slušnost a lidskost jsou základ.',
        bodyDesktop:
          'Nezávazně neznamená bez respektu. Naše komunita stojí na souhlasu a lidskosti.',
      },
    ],
  },
  cta: {
    title: 'Méně řečí. Víc jasno.',
    bodyMobile:
      'Když nehledáš vztah, nemusíš trávit večery chatem. Stáhni si mobilní aplikaci Trtkat — jasná domluva a respekt. Zdarma.',
    bodyDesktop:
      'Když teď nehledáš vztah, nemusíš trávit večery nekonečným chatem. Trtkat je mobilní aplikace pro dospělé 18+, kteří chtějí jasnou domluvu, respekt a minimum zbytečností. Stáhni si ji zdarma.',
    footnote: 'iOS a Android · Zdarma · Pro dospělé 18+',
  },
  footer: {
    offer: 'Nabídka',
    howItWorks: 'Jak to funguje',
    stats: 'Statistiky',
    safety: 'Bezpečí',
    download: 'Stáhnout aplikaci',
    blog: 'Blog',
    legal: 'Právní informace',
    privacy: 'Ochrana soukromí',
    terms: 'Podmínky',
    contact: 'Kontakt',
    followUs: 'Sleduj nás',
    copyright: '© 2026 Trtkat. Pro dospělé 18+.',
  },
  legal: {
    privacy: {
      title: 'Ochrana soukromí',
      metaDescription: 'Zásady ochrany osobních údajů aplikace Trtkat. Informace o zpracování dat budou doplněny.',
      sections: [
        {
          paragraphs: [
            'Tato stránka je připravena pro zveřejnění zásad ochrany osobních údajů aplikace Trtkat.',
            'Finální text doplní provozovatel. Do té doby pro dotazy využij kontaktní stránku.',
          ],
        },
      ],
    },
    terms: {
      title: 'Podmínky používání',
      metaDescription: 'Podmínky používání aplikace a webu Trtkat. Finální znění bude doplněno.',
      sections: [
        {
          paragraphs: [
            'Tato stránka je připravena pro zveřejnění podmínek používání služby Trtkat.',
            'Trtkat je určen pro dospělé uživatele 18+. Finální podmínky doplní provozovatel.',
          ],
        },
      ],
    },
    contact: {
      title: 'Kontakt',
      metaDescription: 'Kontaktujte tým Trtkat. E-mail a kontaktní údaje budou doplněny.',
      emailPlaceholder: 'info@trtkat.cz',
      sections: [
        {
          paragraphs: [
            'Máš dotaz k aplikaci, spolupráci nebo ochraně soukromí? Napiš nám.',
            'Kontaktní e-mail a další údaje doplníme co nejdříve.',
          ],
        },
      ],
    },
  },
  blog: {
    title: 'Blog a osvěta',
    metaDescription:
      'Články o nezávazném seznamování, sexualní výchově a bezpečném seznámení pro studenty. Edukace od Trtkat.',
    subtitle: 'Edukace o seznamování, sexualní výchově a bezpečném nezávazném seznámení.',
    readMore: 'Číst článek',
    backToBlog: 'Zpět na blog',
    backHome: 'Zpět na úvod',
  },
};
