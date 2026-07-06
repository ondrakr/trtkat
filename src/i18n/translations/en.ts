import type { SiteCopy } from './types';

export const en: SiteCopy = {
  meta: {
    title: 'Trtkat — dates, parties and events in the city | App 18+',
    description:
      'Trtkat helps you plan dates, find parties, and discover great places in the city — then gets you there. Event maps, evening games, and safe education. Free for adults 18+.',
  },
  nav: {
    about: 'Concept',
    stats: 'Statistics',
    ethics: 'Ethics',
    features: 'App',
    science: 'Data',
    benefits: 'Why Trtkat',
    download: 'Download',
    references: 'Safety',
  },
  stores: {
    appStoreLabel: 'Download on the App Store',
    googlePlayLabel: 'Get it on Google Play',
  },
  hero: {
    badge: 'Free',
    titleLine1: 'Live fully.',
    titleLine2: 'Not just online.',
    body: 'Trtkat helps you plan dates, find parties, and discover great places in the city — then gets you there. Less messaging, more experiences.',
    imageAlt: 'Trtkat app — events map, dates, and navigation on a phone',
  },
  how: {
    title: 'We are not a dating app.',
    subtitle: 'We are a plan for tonight.',
    steps: [
      {
        title: 'Connect and make a plan',
        bodyMobile: 'You meet through a match, chat, or game — but you will not stay at it for weeks.',
        bodyDesktop:
          'You meet through a match, chat, or game — but you will not stay at it for weeks. Quickly agree on a date, event, or party.',
      },
      {
        title: 'Pick a place or event',
        bodyMobile: 'The map shows parties, venues, and romantic spots nearby.',
        bodyDesktop:
          'An interactive map shows what is happening around you: parties, open venues, and quiet romantic corners. No googling — pick and you have a plan.',
      },
      {
        title: 'Head out',
        bodyMobile: 'Navigation, a ride, or a hotel — from one place to the date.',
        bodyDesktop:
          'Launch navigation, arrange a ride, or book a hotel. From one place you go from a message to the date.',
      },
    ],
  },
  features: {
    title: 'Everything for one evening, in one app.',
    subtitle: 'Maps · games · rides · hotels',
    introMobile:
      'Party maps, romantic spots, evening games, rides, and hotels — without switching between apps.',
    introDesktop:
      'Party and event maps, curated romantic spots, games to spark the evening, rides, and hotel booking. Plan the whole evening without switching between five apps.',
    items: [
      {
        title: 'Events and parties map',
        bodyMobile: 'Parties, concerts, and events nearby on one map.',
        bodyDesktop:
          'Parties, concerts, and events nearby on one live map. Pick where to go tonight — solo or with someone from the app.',
      },
      {
        title: 'Venues and romantic spots',
        bodyMobile: 'Cafés, bars, viewpoints, and parks open right now.',
        bodyDesktop:
          'Curated cafés, bars, viewpoints, and parks open right now. Pick by mood and plan where to meet right away.',
      },
      {
        title: 'Icebreaker games',
        bodyMobile: 'Truth or Dare and icebreakers right in chat.',
        bodyDesktop:
          'Truth or Dare, bold prompts, and icebreakers right in chat. Spark the evening before you even meet — no more awkward openers.',
      },
      {
        title: 'Transport and navigation',
        bodyMobile: 'Navigation or a ride in one tap.',
        bodyDesktop:
          'Pick a meetup spot and launch navigation or order a ride in one tap. No copying addresses — the app guides you there.',
      },
      {
        title: 'Hotel booking',
        bodyMobile: 'A hotel halfway or to continue the evening.',
        bodyDesktop:
          'In different cities or want to keep the evening going? Find a hotel halfway and book right in the app.',
      },
      {
        title: 'Meeting in the real world',
        bodyMobile: 'Every feature points to one thing: meeting in person.',
        bodyDesktop:
          'Every feature points to one thing: meeting in person. Date, enjoy parties, and explore the city — not endless messaging.',
      },
    ],
  },
  data: {
    title: 'Statistics',
    compareHint: '',
    timelineTitle: 'How sexuality in the Czech Republic is changing',
    timelineAccordion: 'Historical context (1993 → 2013 → 2024)',
    tooltipValue: 'Value',
    sourceLabel: 'Data source',
    sourceText: 'CZECHSEX 2024 (NIMH, GAČR) · 6,669 respondents',
    womenLabel: 'Women',
    menLabel: 'Men',
    quiz: {
      progress: 'Question {current} of {total}',
      pickHint: 'Pick the answer that feels most right',
      correct: 'Nailed it!',
      wrong: 'Close — but reality is different',
      reality: 'Reality',
      prev: 'Previous',
      next: 'Next',
      finish: 'See your score',
      finishShort: 'Score',
      closeResult: 'Close result',
      scoreTitle: 'Your score',
      scorePerfect: 'Excellent! You know Czech sexuality data well.',
      scoreGood: 'Solid guessing — a few numbers still surprise.',
      scoreLow: 'No wonder — data often breaks myths. Now you know more.',
      tryAgain: 'Try again',
      sourceNote: 'All figures come from the representative CZECHSEX 2024 survey.',
      exploreTitle: 'Full data explorer',
      exploreIntro: 'Browse all statistics, charts, and historical context — now you know what to expect.',
      exploreHint: 'Switch categories and compare numbers by gender and age.',
      categoryLabels: {
        prvniseks: 'First sex',
        seznamovani: 'Dating',
        vztahy: 'Relationships',
        online: 'Online',
        bezpeci: 'Safety',
      },
      questions: [
        {
          id: 'meet-online',
          category: 'seznamovani',
          question: 'What percentage of Czech couples met on the internet?',
          options: ['5%', '13%', '28%', '45%'],
          correctIndex: 1,
          answer: '13.4%',
          explanation: 'The internet is growing but still not the main path. Among people aged 18–25 it is already 20.7%.',
        },
        {
          id: 'meet-where',
          category: 'seznamovani',
          question: 'Where do Czechs most often meet their current partner?',
          options: ['At a bar or party', 'Through friends', 'At work or school', 'On the internet'],
          correctIndex: 1,
          answer: '29.6% through friends',
          explanation: 'Friends and acquaintances are still the most common path. Among 18–25-year-olds, bars are least common — only 11.2%.',
        },
        {
          id: 'first-sex-age',
          category: 'prvniseks',
          question: 'At what age did women who are now 18–25 first have sex?',
          options: ['15.2 years', '16.6 years', '18.0 years', '19.5 years'],
          correctIndex: 1,
          answer: '16.63 years',
          explanation: 'The average age of first sex among women aged 18–25 is 16.63. For men in the same group it is 17.21.',
        },
        {
          id: 'virgin-men',
          category: 'prvniseks',
          question: 'What percentage of men aged 18–25 have not had sex yet?',
          options: ['8%', '18%', '35%', '52%'],
          correctIndex: 2,
          answer: '35.5%',
          explanation: 'Surprisingly high — among women in the same age group it is 23.5%. It does not mean sex is “gone”.',
        },
        {
          id: 'no-ltr',
          category: 'vztahy',
          question: 'What percentage of people aged 18–25 have no experience with a long-term relationship?',
          options: ['15%', '28%', '46%', '62%'],
          correctIndex: 2,
          answer: '46%',
          explanation: 'Almost half of young adults have not had a long-term relationship yet — possibly a generational shift, not necessarily a problem.',
        },
        {
          id: 'sex-in-relationship',
          category: 'vztahy',
          question: 'How many times per month do people in a relationship have sex on average?',
          options: ['1–2×', '3–4×', '5–6×', '10× or more'],
          correctIndex: 2,
          answer: '5.63× (women) · 5.72× (men)',
          explanation: 'Partners in a relationship have sex about 5–6 times per month on average. In the whole population the average is under once a month.',
        },
        {
          id: 'porn',
          category: 'online',
          question: 'What percentage of Czechs have watched pornography at some point in their life?',
          options: ['35%', '55%', '78%', '92%'],
          correctIndex: 2,
          answer: '78.5%',
          explanation: 'Digital intimacy is common. Men 89.5%, women 67.6%. Among 18–25-year-olds, first exposure is around age 14.',
        },
        {
          id: 'coercion',
          category: 'bezpeci',
          question: 'What percentage of women have experienced sexual coercion or violence in their lifetime?',
          options: ['4%', '9%', '17%', '31%'],
          correctIndex: 2,
          answer: '16.8%',
          explanation: 'Among men it is 4.9%. Safety and consent are the foundation — whether you meet online or in person.',
        },
      ],
    },
    statCategories: [
      {
        key: 'prvniseks',
        label: 'First sex',
        title: 'When do Czechs start? By age and gender',
        insight:
          'This is not “how old they are now” — it is “how old they were at first sex”. The 18–25 cohort averages ~16.6 (women) and ~17.2 (men); the national male average is higher because older men started later.',
        stats: [
          {
            value: '16.63 · 17.21',
            title: 'Age at first sex (people now aged 18–25)',
            desc: 'Average age of first sex reported by respondents currently aged 18–25 — women · men.',
          },
          {
            value: '17.46 · 18.33',
            title: 'National average age of first sex',
            desc: 'Average across all age groups — women · men. Older generations pull the male average up.',
          },
          {
            value: '23.5% · 35.5%',
            title: '18–25 respondents without first sex yet',
            desc: 'Share of women · men in this age group who have not had intercourse yet.',
          },
          { value: '~70%', title: 'of men held back by insecurity', desc: 'At first sex they report shyness or uncertainty about intimacy.' },
          {
            value: '13.38 · 13.5',
            title: 'First masturbation (18–25 respondents)',
            desc: 'Average age for women · men — usually years before first sex.',
          },
          { value: '2013 → 2024', title: 'age of first sex is stable', desc: 'Women 17.73 → 17.46 | Men 17.79 → 18.33 — no dramatic shift, generational mix.' },
        ],
      },
      {
        key: 'seznamovani',
        label: 'Dating',
        title: 'Where people meet today — offline and online',
        insight:
          'Online is not the only path (13.4% of couples overall), but among respondents aged 18–25, 20.7% met online. In that group, bars are the least common — 11.2%.',
        stats: [
          { value: '29.6%', title: 'through friends and acquaintances', desc: 'Still the most common path in the whole population.' },
          { value: '20.0%', title: 'work or school', desc: 'The second strongest offline path (whole population).' },
          {
            value: '20.7%',
            title: 'online (respondents aged 18–25)',
            desc: 'Share of people aged 18–25 who met their partner on the internet.',
          },
          { value: '13.4%', title: 'online — whole population', desc: 'Share of couples who met online (all age groups).' },
          {
            value: '11.2%',
            title: 'bar/party (respondents 18–25)',
            desc: 'Lowest in the youngest cohort — the “meeting in a pub” myth does not hold.',
          },
          {
            value: '4.9%',
            title: 'online (respondents 66–75)',
            desc: 'Digital dating drops sharply among seniors.',
          },
        ],
      },
      {
        key: 'vztahy',
        label: 'Relationships',
        title: 'Relationships, freedom, and sex frequency',
        insight:
          'Almost half of respondents aged 18–25 have never had a long-term relationship — but people in relationships have sex ~5.7× per month, while the whole population averages under 1×.',
        stats: [
          {
            value: '46%',
            title: '18–25 respondents without LTR',
            desc: 'Share of young adults who have never had a long-term relationship.',
          },
          { value: '73.7%', title: 'of adults in a relationship', desc: 'Most of the population lives in long-term partnerships (whole population).' },
          { value: '26.7%', title: 'of partnered people also have a sexual relationship', desc: 'Open relationships and parallel contacts — not just infidelity.' },
          { value: '5.63 · 5.72', title: 'sex per month in a relationship', desc: 'Average for women · men with a long-term partner.' },
          { value: '1.7 · 1.3', title: 'sex per month (respondents 18–25)', desc: 'Average for women · men in the youngest cohort — not singles only.' },
          { value: '0.71 · 0.99', title: 'sex per month (whole population)', desc: 'Average for women · men across all ages and statuses.' },
        ],
      },
      {
        key: 'online',
        label: 'Online sexuality',
        title: 'Digital intimacy is mainstream',
        insight:
          '78.5% of the population has watched porn. Respondents aged 18–25 recall first porn at ~14.5 (women) and ~14.2 (men) — much earlier than older generations.',
        stats: [
          { value: '78.5%', title: 'have watched porn at some point', desc: 'Men 89.5% · Women 67.6% (whole population).' },
          {
            value: '14.52 · 14.18',
            title: 'age of first porn (respondents 18–25)',
            desc: 'How old they were at first viewing — average for women · men.',
          },
          { value: '16%', title: 'have sent a nude photo/video', desc: 'Same share among men and women — sexting is common and a risk.' },
          { value: '12% · 4%', title: 'live sex (cam)', desc: 'Experience among men · women with interactive online sexuality.' },
          { value: '3.1%', title: 'at risk of problematic porn use', desc: 'In the 18–34 cohort it is 5.4% — smaller but important group.' },
          { value: '6% · 8%', title: 'have never had sex', desc: 'Share of women · men in the whole population (not just young people).' },
        ],
      },
      {
        key: 'bezpeci',
        label: 'Safety',
        title: 'Consent, pressure, and help',
        insight:
          'Almost 17% of women experienced coercion — among men 5%. Most problems go unresolved: only ~5% seek professional help.',
        stats: [
          { value: '16.8%', title: 'of women — coercion/violence', desc: 'Sexual pressure or violence in lifetime — among men 4.9%.' },
          { value: '29.9%', title: 'of women — unwanted contact', desc: 'Unwanted touch or sexual advances — among men 16.9%.' },
          { value: '20%', title: 'of women — orgasm difficulties', desc: 'One in five — more common than people talk about.' },
          { value: '61% · 55%', title: 'sexual problem in lifetime', desc: 'Share of women · men reporting an issue — most without help.' },
          { value: '5.0% · 4.6%', title: 'sought professional help', desc: 'Share of women · men — huge gap between need and the system.' },
          { value: '6.1%', title: 'of women reported rape', desc: 'True scope is likely higher — stigma holds people back.' },
        ],
      },
    ],
    charts: {
      prvniseks: {
        title: 'Average age of first sex',
        subtitle: 'How old respondents were at first intercourse — 18–25 cohort vs. whole population.',
        suffix: ' yrs',
        type: 'grouped',
        seriesLabels: { women: 'Women', men: 'Men' },
        data: [
          { label: 'Respondents 18–25', women: 16.63, men: 17.21 },
          { label: 'All adults', women: 17.46, men: 18.33 },
        ],
      },
      seznamovani: {
        title: 'How people meet their partner',
        subtitle: 'Share of couples by meeting place (whole population) + bar among respondents 18–25.',
        suffix: '%',
        type: 'simple',
        data: [
          { label: 'Friends', value: 29.6 },
          { label: 'Work/school', value: 20.0 },
          { label: 'Activities', value: 17.5 },
          { label: 'Online', value: 13.4 },
          { label: 'Bar (resp. 18–25)', value: 11.2 },
        ],
      },
      vztahy: {
        title: 'Sex frequency per month',
        subtitle: 'Average among respondents 18–25 vs. people in a relationship — by gender.',
        suffix: '×',
        type: 'grouped',
        seriesLabels: { women: 'Women', men: 'Men' },
        data: [
          { label: 'Respondents 18–25', women: 1.7, men: 1.3 },
          { label: 'In relationship', women: 5.63, men: 5.72 },
        ],
      },
      online: {
        title: 'Online dating by age',
        subtitle: 'Share of respondents in each age group who met online. Whole population: 13.4%.',
        suffix: '%',
        type: 'simple',
        data: [
          { label: 'Resp. 18–25', value: 20.7 },
          { label: 'All', value: 13.4 },
          { label: 'Resp. 66–75', value: 4.9 },
        ],
      },
      bezpeci: {
        title: 'Coercion and unwanted contact',
        subtitle: 'Share of people who experienced pressure — a clear gender gap.',
        suffix: '%',
        type: 'grouped',
        seriesLabels: { women: 'Women', men: 'Men' },
        data: [
          { label: 'Coercion', women: 16.8, men: 4.9 },
          { label: 'Unwanted', women: 29.9, men: 16.9 },
          { label: 'Reported', women: 6.1, men: 2.0 },
        ],
      },
    },
    timeline: [
      {
        period: '1993 → 2008',
        label: 'Fewer partners per year',
        value: 'Men 1.73 → 1.28 | Women 1.51 → 0.99',
      },
      {
        period: '1993 → 2008',
        label: 'Declining satisfaction with sex',
        value: 'Women 82% → 72% | Men 76% → 68%',
      },
      {
        period: '2008 → 2024',
        label: 'Online dating grows',
        value: '13.4% of couples online · up to 20.7% among respondents 18–25',
      },
      {
        period: '2013 → 2024',
        label: 'Age of first sex',
        value: 'Women 17.73 → 17.46 | Men 17.79 → 18.33',
      },
      {
        period: '2013 → 2024',
        label: 'Women more open about partners',
        value: 'Average lifetime partners +2 for women — less taboo, not more promiscuity',
      },
      {
        period: '2024',
        label: 'Young adults without a relationship',
        value: '46% of 18–25 respondents without LTR · 35.5% of men without sex',
      },
    ],
  },
  benefits: {
    title: 'Your phone is for',
    titleAccent: 'getting you out the door.',
    introMobile: 'The best stuff happens outside — dates, events, and new places.',
    introDesktop:
      'Young people spend hours on screens, but the best stuff happens outside. Trtkat helps you plan dates, go to events, and discover new places — safely and with respect.',
    items: [
      { title: 'Off the screen', desc: 'The app does not keep you inside. Only until you head out.' },
      { title: 'Parties and events', desc: 'See what is happening around you right now.' },
      { title: 'Simple planning', desc: 'Venue, ride, and hotel without switching apps.' },
      { title: 'Safely', desc: 'Consent, respect, and clear rules — online and out.' },
    ],
  },
  trust: {
    title: 'Trust and safety',
    quotes: [
      {
        quote: 'Finally an app that keeps me on my phone only until I head out. Not another endless chat that goes nowhere.',
        author: 'Marek, Prague',
      },
    ],
    imageAlt: 'City life — dates and meetups',
    items: [
      {
        title: 'Privacy without oversharing',
        bodyMobile: 'What you handle in the app stays between you.',
        bodyDesktop:
          'What you handle in the app stays between you. You share only what you want — and you stay in control.',
      },
      {
        title: 'Clear rules from the start',
        bodyMobile: 'Everyone here knows why they came. No mixed signals.',
        bodyDesktop:
          'Everyone here knows why they came. No leading people on, no unclear signals.',
      },
      {
        title: 'Respect first',
        bodyMobile: 'Casual does not mean careless.',
        bodyDesktop:
          'Casual does not mean careless. Our community is built on consent and decency.',
      },
    ],
  },
  about: {
    title: 'Why Trtkat was built',
    bodyMobile:
      'An independent Czech project with one goal: get young people from screens to real experiences.',
    bodyDesktop:
      'Trtkat is an independent Czech project with one goal: get young people from screens to real experiences. Dates, parties, new places, and education about safe dating — built by people who want to live more in person.',
  },
  cta: {
    title: 'Life happens outside.',
    bodyMobile:
      'Download Trtkat and plan tonight — parties, dates, games, and the trip to the spot. Free for adults 18+.',
    bodyDesktop:
      'Download Trtkat and plan tonight — parties, dates, games, and the trip to the spot. Free for adults 18+, on iOS and Android.',
    footnote: 'iOS and Android · Free · For adults 18+',
  },
  comingSoon: {
    title: 'Coming soon',
    badge: 'In development',
    heading: 'You will be heading out soon',
    body:
      'Trtkat for iOS and Android is in the final stage. Leave your email and we will let you know when you can discover events, dates, and offline life in the app.',
    emailLabel: 'Email for early access',
    emailPlaceholder: 'you@email.com',
    submitButton: 'Get early access',
    successTitle: 'You are on the list',
    successBody: 'We will email you as soon as Trtkat is ready to download.',
    privacyNote: 'We use your email only to notify you about the launch. No spam.',
    errors: {
      invalid_email: 'Please enter a valid email address.',
      submit_failed: 'Could not submit. Please try again.',
      network: 'Connection error. Check your internet and try again.',
    },
    platforms: 'iOS · Android',
  },
  footer: {
    offer: 'App',
    howItWorks: 'Concept',
    stats: 'Statistics',
    safety: 'Safety',
    download: 'Download the app',
    blog: 'Blog',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    community: 'Community guidelines',
    accountDeletion: 'Account deletion',
    childSafety: 'Child safety',
    contact: 'Support',
    followUs: 'Follow us',
    copyright: '© 2026 Trtkat. For adults 18+.',
    cookieSettings: 'Cookie settings',
  },
  legal: {
    privacy: {
      title: 'Privacy policy',
      metaDescription: 'Trtkat privacy policy. Data processing information will be added.',
      sections: [
        {
          paragraphs: [
            'This page is prepared for the Trtkat privacy policy.',
            'The final text will be added by the operator. Until then, use the contact page for questions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of use',
      metaDescription: 'Trtkat terms of use. Final wording will be added.',
      sections: [
        {
          paragraphs: [
            'This page is prepared for the Trtkat terms of use.',
            'Trtkat is for adults 18+. Final terms will be added by the operator.',
          ],
        },
      ],
    },
    contact: {
      title: 'Contact',
      metaDescription: 'Contact the Trtkat team. Email and details will be added.',
      emailPlaceholder: 'info@trtkat.cz',
      sections: [
        {
          paragraphs: [
            'Have a question about the app, partnership, or privacy? Get in touch.',
            'We will add the contact email and other details soon.',
          ],
        },
      ],
    },
  },
  blog: {
    title: 'Blog about offline life and safe dating',
    metaDescription:
      'Articles on dating, parties, offline life, consent, and sexual education for young adults. Education from Trtkat.',
    subtitle: 'Dates, city life, safety, and education — not just swiping and chat.',
    readMore: 'Read article',
    backToBlog: 'Back to blog',
    backHome: 'Back to home',
    loading: 'Loading articles…',
  },
  seoFaq: {
    title: 'Frequently asked questions about Trtkat',
    subtitle: 'Dates, parties, events, and safety',
    items: [
      {
        question: 'What is Trtkat and who is it for?',
        answer:
          'A mobile app for adults 18+ that connects dating with real meetups — dates, parties, events, and romantic spots in the city.',
      },
      {
        question: 'Is Trtkat free?',
        answer:
          'Yes, core use is free. We want event maps, dates, and education to be accessible without barriers.',
      },
      {
        question: 'How are you different from Tinder and classic dating apps?',
        answer:
          'Most dating apps stop at chat. We go further — party and place maps, evening games, rides, and hotel booking. Everything points to one thing: actually meeting up.',
      },
      {
        question: 'How do event and place maps work?',
        answer:
          'You see parties, events, open venues, and romantic spots around you. Pick where and with whom to go — and plan the trip right away.',
      },
      {
        question: 'Is Trtkat safe?',
        answer:
          'Safety is central: verified profiles, clear rules, and education on consent and boundaries online and offline.',
      },
    ],
  },
  cookies: {
    title: 'Cookies and your privacy',
    description:
      'We use essential cookies for the site to work. Analytics cookies (Google Analytics) help us improve the site — only with your consent. More in our',
    privacyLink: 'privacy policy',
    acceptAll: 'Accept all',
    rejectOptional: 'Essential only',
    customize: 'Customize',
    settingsTitle: 'Cookie settings',
    necessaryTitle: 'Essential',
    necessaryDesc: 'Required for basic site functionality and storing your cookie choice.',
    alwaysOn: 'Always on',
    analyticsTitle: 'Analytics',
    analyticsDesc: 'Google Analytics — anonymized traffic statistics (visits, pages).',
    marketingTitle: 'Marketing',
    marketingDesc: 'For future ad measurement. Not used yet — you can leave this off.',
    saveMinimal: 'Save essential only',
    saveChoices: 'Save choices',
    settingsLink: 'Cookie settings',
  },
};
