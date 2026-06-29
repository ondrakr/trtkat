import type { SiteCopy } from './types';

export const en: SiteCopy = {
  meta: {
    title: 'Trtkat — casual dating | Free',
    description:
      'Modern dating app for adults 18+. Casual meetups, awareness about safe dating and sexual education. Completely free.',
  },
  nav: {
    about: 'About',
    stats: 'Statistics',
    ethics: 'Ethics',
    features: 'Features',
    science: 'Data',
    benefits: 'Benefits',
    download: 'Download',
    blog: 'Blog',
  },
  stores: {
    appStoreLabel: 'Download on the App Store',
    googlePlayLabel: 'Get it on Google Play',
  },
  hero: {
    badge: 'Free',
    titleLine1: 'Save time.',
    titleLine2: 'Enjoy the night.',
    body: 'Not everyone wants a relationship. Trtkat helps you find someone for a pleasant evening and connection — simply, without endless messaging.',
    imageAlt: 'Trtkat app on iPhone — profile, match, and chat',
  },
  how: {
    title: 'We are not a classic dating app.',
    subtitle: 'We are a shortcut to a clear plan.',
    steps: [
      {
        title: 'Match without small talk',
        bodyMobile: 'Mutual interest? Move straight to the next step.',
        bodyDesktop:
          'Mutual interest? Great. Trtkat skips long messaging and moves you straight to the next step. No awkward openers, no pointless waiting.',
      },
      {
        title: 'A meetup spot halfway',
        bodyMobile: 'The app suggests a neutral place halfway between you.',
        bodyDesktop:
          'The app offers a neutral halfway meeting point. Fast, simple, and without unnecessary back-and-forth.',
      },
      {
        title: 'Clear expectations',
        bodyMobile: 'Clear rules and respect for boundaries from the start.',
        bodyDesktop:
          'Everyone knows why they are here. No false promises, no mixed signals, no role-playing. Respect for boundaries is the foundation.',
      },
    ],
  },
  features: {
    title: 'What you get in the app',
    subtitle: 'More than swiping and chat',
    introMobile:
      'Hotel booking, date plans with navigation, flirty games, and a map of great spots — all inside the app.',
    introDesktop:
      'Trtkat is not just a dating app. Book a hotel halfway, plan a date with navigation or Bolt/Uber, play icebreaker games, and discover great places nearby.',
    items: [
      {
        title: 'Halfway hotel booking',
        bodyMobile: 'A hotel between you — book it right in the app.',
        bodyDesktop:
          'In different cities? Trtkat finds a hotel exactly halfway and you can book it on the spot — no extra apps, no back-and-forth.',
      },
      {
        title: 'Date plan in one tap',
        bodyMobile: 'Venue, navigation, Bolt or Uber — all from the app.',
        bodyDesktop:
          'Pick a specific date spot and launch navigation, Bolt, or Uber in one tap. No searching or copying addresses — the app gets you there.',
      },
      {
        title: 'Flirty games',
        bodyMobile: 'Truth or Dare and more games to spark the conversation.',
        bodyDesktop:
          'Icebreaker and flirty games right in chat — Truth or Dare, truth dice, bold prompts. Break the ice without awkward openers.',
      },
      {
        title: 'Date spots map',
        bodyMobile: 'Curated places nearby — cafés, bars, viewpoints.',
        bodyDesktop:
          'An interactive map of great date spots. Pick by mood, open navigation, and you are set.',
      },
    ],
  },
  data: {
    title: 'Can you guess reality?',
    introMobile: '8 questions from the Czech CZECHSEX survey. Take a guess — then see how it really is.',
    introDesktop:
      'How many Czech couples meet online? How old at first sex? Guess across 8 questions from representative CZECHSEX data (6,669 respondents) — reality often surprises.',
    compareHint: '',
    timelineTitle: 'How sexuality in the Czech Republic is changing',
    timelineAccordion: 'Historical context (1993 → 2013 → 2024)',
    tooltipValue: 'Value',
    sourceLabel: 'Data source',
    sourceText: 'CZECHSEX 2024 (NIMH, GAČR) · 6,669 respondents',
    womenLabel: 'Women',
    menLabel: 'Men',
    quiz: {
      badge: 'Interactive quiz',
      title: 'What you think vs. what the data says',
      intro: 'No myths — just guess and instantly see the real answer from Czech research.',
      startCta: 'Start guessing',
      progress: 'Question {current} of {total}',
      pickHint: 'Pick the answer that feels most right',
      correct: 'Nailed it!',
      wrong: 'Close — but reality is different',
      reality: 'Reality',
      next: 'Next question',
      finish: 'See your score',
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
          question: 'What share of couples in the Czech Republic met online?',
          options: ['5%', '13%', '28%', '45%'],
          correctIndex: 1,
          answer: '13.4%',
          explanation: 'Online is growing but still not the dominant path. Among respondents aged 18–25 it is already 20.7%.',
        },
        {
          id: 'meet-where',
          category: 'seznamovani',
          question: 'Where do Czechs most often meet their partner?',
          options: ['Bar / party', 'Through friends', 'Work or school', 'Online'],
          correctIndex: 1,
          answer: '29.6% through friends',
          explanation: 'Classic advice still works. Bars are lowest among 18–25 — only 11.2%.',
        },
        {
          id: 'first-sex-age',
          category: 'prvniseks',
          question: 'Age at first sex? (respondents now aged 18–25, women)',
          options: ['15.2 years', '16.6 years', '18.0 years', '19.5 years'],
          correctIndex: 1,
          answer: '16.63 years',
          explanation: 'The youngest cohort recalls an earlier start than the national average. For men in the same group it is 17.21.',
        },
        {
          id: 'virgin-men',
          category: 'prvniseks',
          question: 'What % of men aged 18–25 have not had sex yet?',
          options: ['8%', '18%', '35%', '52%'],
          correctIndex: 2,
          answer: '35.5%',
          explanation: 'Surprisingly high — among women in the same group it is 23.5%. It does not mean sex is “gone”.',
        },
        {
          id: 'no-ltr',
          category: 'vztahy',
          question: 'What % of respondents aged 18–25 have never had a long-term relationship?',
          options: ['15%', '28%', '46%', '62%'],
          correctIndex: 2,
          answer: '46%',
          explanation: 'Almost half of young adults have no LTR yet — possibly a generational shift, not necessarily a problem.',
        },
        {
          id: 'sex-in-relationship',
          category: 'vztahy',
          question: 'How often sex per month in a relationship? (average)',
          options: ['1–2×', '3–4×', '5–6×', '10× or more'],
          correctIndex: 2,
          answer: '5.63× (women) · 5.72× (men)',
          explanation: 'In a relationship frequency is much higher than in the whole population, where the average is under once a month.',
        },
        {
          id: 'porn',
          category: 'online',
          question: 'What % of Czechs have watched porn at some point?',
          options: ['35%', '55%', '78%', '92%'],
          correctIndex: 2,
          answer: '78.5%',
          explanation: 'Digital intimacy is mainstream. Men 89.5%, women 67.6%. Among 18–25, first porn starts around age 14.',
        },
        {
          id: 'coercion',
          category: 'bezpeci',
          question: 'What % of women experienced sexual coercion or violence?',
          options: ['4%', '9%', '17%', '31%'],
          correctIndex: 2,
          answer: '16.8%',
          explanation: 'Among men 4.9%. Safety and consent are not optional — that is why Trtkat is built around them.',
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
    title: 'Not everyone wants a relationship right now.',
    titleAccent: 'And that is okay.',
    introMobile: 'Not everyone wants a relationship. Sometimes a clear match, respect, and minimal fuss is enough.',
    introDesktop:
      'Sometimes you are not looking for love for life. Sometimes you just want a clear match, chemistry, and an evening without unnecessary games. No pretending, no pressure, and with respect for boundaries.',
    items: [
      { title: 'No games', desc: 'No beating around the bush or fake signals.' },
      { title: 'No pressure', desc: 'Everything is based on mutual consent and respect.' },
      { title: 'For real', desc: 'Every profile belongs to a real person.' },
      { title: 'No expectations', desc: 'Without painful disappointment or drama.' },
    ],
  },
  trust: {
    title: 'Trust and safety',
    quote:
      'Between school and work I do not have capacity for a relationship. Here at least nobody pretends and everyone knows where they stand.',
    author: 'Marek, Prague',
    imageAlt: 'Intimacy',
    items: [
      {
        title: 'Privacy without oversharing',
        bodyMobile: 'What you do in the app stays private.',
        bodyDesktop:
          'What you handle in the app should stay private. Minimum noise, maximum control over what you share and with whom.',
      },
      {
        title: 'Clear rules from the start',
        bodyMobile: 'Everyone knows why they are here. No games or mixed signals.',
        bodyDesktop:
          'Everyone knows why they are here. No awkward games, no leading people on, no unclear signals.',
      },
      {
        title: 'Respect first',
        bodyMobile: 'Consent, decency, and humanity are the foundation.',
        bodyDesktop:
          'Casual does not mean disrespectful. Our community is built on consent and humanity.',
      },
    ],
  },
  about: {
    title: 'Who is behind Trtkat',
    bodyMobile:
      'An independent Czech project — a small team of developers and sexual health experts combining a practical app with education.',
    bodyDesktop:
      'Trtkat is an independent Czech project focused on fair casual dating. A small team of developers and sexual health experts wants to combine a practical app with education about safe dating.',
  },
  cta: {
    title: 'Less talk. More clarity.',
    bodyMobile:
      'If you are not looking for a relationship, you do not have to spend your evenings chatting. Download the Trtkat mobile app — clear plans and respect. Free.',
    bodyDesktop:
      'If you are not looking for a relationship right now, you do not have to spend your evenings in endless chat. Trtkat is a mobile app for adults 18+ who want clear plans, respect, and minimal fuss. Download it for free.',
    footnote: 'iOS and Android · Free · For adults 18+',
  },
  comingSoon: {
    title: 'Coming soon',
    badge: 'In development',
    heading: 'We are working on the app',
    body:
      'Trtkat for iOS and Android is in the final stage of development. Leave your email and we will let you know when the app is ready.',
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
    offer: 'Offer',
    howItWorks: 'How it works',
    stats: 'Statistics',
    safety: 'Safety',
    download: 'Download the app',
    blog: 'Blog',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
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
    title: 'Blog and education',
    metaDescription:
      'Articles about casual dating, sexual education, and safe meetups. Education from Trtkat.',
    subtitle: 'Education about dating, sexual education, and safe casual meetups.',
    readMore: 'Read article',
    backToBlog: 'Back to blog',
    backHome: 'Back to home',
    loading: 'Loading articles…',
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
