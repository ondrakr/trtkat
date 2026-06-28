import type { SiteCopy } from './types';

export const en: SiteCopy = {
  meta: {
    title: 'Trtkat — casual dating for students | Free',
    description:
      'Modern dating app for students. Casual meetups, awareness about safe dating and sexual education. Completely free.',
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
    title: 'Sexuality in the Czech Republic in numbers',
    introMobile:
      'An interactive overview of Czech data on dating, relationships, online sexuality, and safety.',
    introDesktop:
      'No myths, no moralizing. This interactive overview is based on representative Czech data and shows how people meet today, what they look for online, and where their boundaries are.',
    compareHint: 'Switch categories to compare numbers in the context of today’s Czech reality.',
    timelineTitle: 'How sexuality in the Czech Republic is changing',
    timelineAccordion: 'Timeline / historical context',
    tooltipValue: 'Value',
    statCategories: [
      {
        key: 'seznamovani',
        label: 'Dating',
        title: 'How people in the Czech Republic meet',
        stats: [
          { value: '13.4%', title: 'of couples meet online', desc: 'Online is common, but not the only path.' },
          { value: '29.6%', title: 'through friends and acquaintances', desc: 'The most common way to meet.' },
          { value: '20.0%', title: 'work or school', desc: 'The second most common path.' },
          { value: '17.5%', title: 'social activities', desc: 'The third most common path.' },
          { value: '20.7%', title: 'online at age 18–25', desc: 'Online dating is much more common among young adults.' },
          { value: '4.9%', title: 'online at age 66–75', desc: 'The share of online dating drops with age.' },
        ],
      },
      {
        key: 'vztahy',
        label: 'Relationships',
        title: 'Real relationship patterns among adults',
        stats: [
          { value: '73.7%', title: 'in a long-term relationship', desc: 'Most adults are in a relationship.' },
          { value: '25.6%', title: 'without a long-term relationship', desc: 'A significant share are single.' },
          { value: '26.7%', title: 'of partnered people also have a sexual relationship', desc: 'This can include open relationships, not just infidelity.' },
          { value: '17.46', title: 'average age of first sex (women)', desc: 'For men it is 18.33.' },
          { value: '16.63', title: 'first sex for women aged 18–25', desc: 'For men aged 18–25 it is 17.21.' },
          { value: '5', title: 'median lifetime partners', desc: 'The median is a fairer public benchmark than the average.' },
        ],
      },
      {
        key: 'online',
        label: 'Online sexuality',
        title: 'Digital intimacy is mainstream',
        stats: [
          { value: '78.5%', title: 'have watched porn at some point', desc: 'Men 89.5% | Women 67.6%.' },
          { value: '3.1%', title: 'at risk of problematic porn use', desc: 'Among people aged 18–34 it is 5.4%.' },
          { value: '12%', title: 'of men have live-sex experience', desc: 'Among women 4%.' },
          { value: '16%', title: 'have sent a nude photo/video', desc: 'The same share among men and women.' },
          { value: '8.6 / 11.6', title: 'average lifetime partners', desc: 'Women 8.6 | Men 11.6, but the median is 5.' },
          { value: '6% / 8%', title: 'have never had sex', desc: 'Roughly 6% of women | 8% of men.' },
        ],
      },
      {
        key: 'bezpeci',
        label: 'Safety',
        title: 'Safety is not a bonus — it is the foundation',
        stats: [
          { value: '61.19%', title: 'of women reported a sexual problem', desc: 'Among men 55.01%.' },
          { value: '21.41%', title: 'of women have clinically significant issues', desc: 'Among men 16.06%.' },
          { value: '5.0%', title: 'of women sought professional help', desc: 'Among men 4.6%.' },
          { value: '16.8%', title: 'of women experienced coercion or violence', desc: 'Among men 4.9%.' },
          { value: '29.9%', title: 'of women experienced unwanted contact', desc: 'Among men 16.9%.' },
          { value: '6.1%', title: 'of women reported rape or pressure', desc: 'Among men 2.0%.' },
        ],
      },
    ],
    charts: {
      seznamovani: {
        title: 'Share of online dating by age',
        subtitle: 'Online dating is much more common among young adults.',
        suffix: '%',
        data: [
          { label: '18-25', value: 20.7 },
          { label: '66-75', value: 4.9 },
        ],
      },
      vztahy: {
        title: 'Structure of long-term relationships',
        subtitle: 'Most adults are in a relationship, but some partnered people also have a sexual relationship on the side.',
        suffix: '%',
        data: [
          { label: 'Relationship', value: 73.7 },
          { label: 'No relationship', value: 25.6 },
          { label: 'Also sexual', value: 26.7 },
        ],
      },
      online: {
        title: 'Online sexuality in numbers',
        subtitle: 'Digital intimacy is a normal part of life across age groups.',
        suffix: '%',
        data: [
          { label: 'Porn watched', value: 78.5 },
          { label: 'At risk', value: 3.1 },
          { label: 'Sent nudes', value: 16.0 },
        ],
      },
      bezpeci: {
        title: 'Safety and pressure',
        subtitle: 'The data confirm that safety rules must be a core feature.',
        suffix: '%',
        data: [
          { label: 'Coercion (women)', value: 16.8 },
          { label: 'Unwanted contact', value: 29.9 },
          { label: 'Reported', value: 6.1 },
        ],
      },
    },
    timeline: [
      {
        period: '1993 -> 2008',
        label: 'Drop in number of partners in the last 12 months',
        value: 'Men 1.73 -> 1.28 | Women 1.51 -> 0.99',
      },
      {
        period: '1993 -> 2008',
        label: 'Drop in satisfaction with sex life',
        value: 'Women 82% -> 72% | Men 76% -> 68%',
      },
      {
        period: '1993 -> 2008',
        label: 'More responsible contraception',
        value: 'With a casual partner, men used a condom in 41% of cases, later 88%',
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
  cta: {
    title: 'Less talk. More clarity.',
    bodyMobile:
      'If you are not looking for a relationship, you do not have to spend your evenings chatting. Download the Trtkat mobile app — clear plans and respect. Free.',
    bodyDesktop:
      'If you are not looking for a relationship right now, you do not have to spend your evenings in endless chat. Trtkat is a mobile app for adults 18+ who want clear plans, respect, and minimal fuss. Download it for free.',
    footnote: 'iOS and Android · Free · For adults 18+',
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
      'Articles about casual dating, sexual education, and safe meetups for students. Education from Trtkat.',
    subtitle: 'Education about dating, sexual education, and safe casual meetups.',
    readMore: 'Read article',
    backToBlog: 'Back to blog',
    backHome: 'Back to home',
  },
};
