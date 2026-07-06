export type BlogPostLocale = {
  title: string;
  excerpt: string;
  metaDescription: string;
  sections: Array<{ heading?: string; paragraphs: string[] }>;
};

export type BlogPost = {
  slug: string;
  datePublished: string;
  dateModified?: string;
  cs: BlogPostLocale;
  en: BlogPostLocale;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'nezavazne-seznamovani-pro-studenty',
    datePublished: '2026-06-01',
    cs: {
      title: 'Z online ven: rande, party a život ve městě',
      excerpt: 'Jak přejít z obrazovky do reálného života — rande, akce a setkání bez nekonečného chatu.',
      metaDescription:
        'Průvodce offline životem pro mladé dospělé. Rande, party, akce, respekt a bezpečné setkání mimo feed.',
      sections: [
        {
          paragraphs: [
            'Mladí lidé tráví hodiny online, ale život se děje venku — na rande, party, akcích a v podnicích ve městě.',
            'Trtkat pomáhá přejít z matchu k reálnému setkání: mapy akcí, romantická místa, hry na večer a doprava na jedno klepnutí.',
          ],
        },
        {
          heading: 'Jak na to bezpečně',
          paragraphs: [
            'Základem je jasná domluva, respekt k hranicím a otevřená komunikace. Trtkat na to staví celou aplikaci — méně scrollování, víc života venku.',
            'Pokud si nejsi jistý/á, ptej se. Souhlas a slušnost nejsou volitelné.',
          ],
        },
      ],
    },
    en: {
      title: 'From online to real life: dates, parties, and city living',
      excerpt: 'How to move from the screen into real life — dates, events, and meetups without endless chat.',
      metaDescription:
        'A guide to offline life for young adults. Dates, parties, events, respect, and safe meetups beyond the feed.',
      sections: [
        {
          paragraphs: [
            'Young people spend hours online, but life happens outside — on dates, at parties, events, and venues in the city.',
            'Trtkat helps you go from a match to a real meetup: event maps, romantic spots, evening games, and transport in one tap.',
          ],
        },
        {
          heading: 'How to do it safely',
          paragraphs: [
            'Clear plans, respect for boundaries, and open communication are the foundation. Trtkat is built around that — less scrolling, more life outside.',
            'If you are unsure, ask. Consent and decency are not optional.',
          ],
        },
      ],
    },
  },
  {
    slug: 'sexualni-vychova-co-studenti-potrebuji-vedet',
    datePublished: '2026-06-10',
    cs: {
      title: 'Sexuální výchova: co studenti potřebují vědět navíc',
      excerpt: 'Základy sexualní výchovy, které v běžném životě často chybí — stručně a srozumitelně.',
      metaDescription:
        'Sexuální výchova pro studenty: souhlas, hranice, komunikace a osvěta o bezpečném seznamování. Edukativní článek od Trtkat.',
      sections: [
        {
          paragraphs: [
            'Sexuální výchova není jen biologie ve škole. Je to schopnost komunikovat, respektovat hranice a chápat, co je pro tebe v pořádku.',
            'Trtkat doplňuje tuto osvětu praktickým přístupem k randění a offline životu — bez zbytečného stigmatu a bez zbytečných slov navíc.',
          ],
        },
        {
          heading: 'Tři principy, které stojí za zapamatování',
          paragraphs: [
            'Souhlas musí být jasný a dobrovolný. Hranice si můžeš kdykoli změnit. A respekt není „nice to have“, ale minimum.',
            'Čím dřív se naučíš mluvit o očekáváních, tím méně zklamání a nejistoty.',
          ],
        },
      ],
    },
    en: {
      title: 'Sexual education: what students need to know beyond school',
      excerpt: 'Basics of sexual education that are often missing in everyday life — briefly and clearly.',
      metaDescription:
        'Sexual education for students: consent, boundaries, communication, and awareness about safe dating. An educational article from Trtkat.',
      sections: [
        {
          paragraphs: [
            'Sexual education is not just school biology. It is the ability to communicate, respect boundaries, and understand what is okay for you.',
            'Trtkat complements this awareness with a practical approach to dating — without unnecessary stigma.',
          ],
        },
        {
          heading: 'Three principles worth remembering',
          paragraphs: [
            'Consent must be clear and voluntary. Boundaries can change at any time. And respect is not optional — it is the minimum.',
            'The earlier you learn to talk about expectations, the less disappointment and uncertainty you get.',
          ],
        },
      ],
    },
  },
  {
    slug: 'souhlas-a-hranice-zaklad-bezpecneho-seznamovani',
    datePublished: '2026-06-20',
    cs: {
      title: 'Souhlas a hranice: základ bezpečného seznamování',
      excerpt: 'Proč je souhlas klíčový — online i na rande, party a akcích ve městě.',
      metaDescription:
        'Souhlas a hranice při randění a offline setkáních. Praktický edukační článek od aplikace Trtkat.',
      sections: [
        {
          paragraphs: [
            'Bezpečné randění stojí na jednoduchém principu: obě strany vědí, co od setkání chtějí, a respektují limity druhého — ať už jste v chatu nebo venku na akci.',
            'Čím jasnější domluva, tím příjemnější zkušenost. Trtkat tě k tomu vede od matchu až na místo setkání.',
          ],
        },
        {
          heading: 'Praktické tipy',
          paragraphs: [
            'Mluv očekávání nahlas, ne v insinuacích. Nech si čas, pokud něco nesedí. A nikdy nepokračuj tam, kde nemáš jistotu.',
            'Trtkat pomáhá mladým lidem randit a užívat život venku s respektem — zdarma a bez nekonečného chatu.',
          ],
        },
      ],
    },
    en: {
      title: 'Consent and boundaries: the foundation of safe dating',
      excerpt: 'Why consent matters — online and on dates, parties, and events in the city.',
      metaDescription:
        'Consent and boundaries when dating and meeting offline. A practical educational article from Trtkat.',
      sections: [
        {
          paragraphs: [
            'Safe dating is built on a simple principle: both sides know what they want from a meetup and respect each other’s limits — in chat and out at an event.',
            'The clearer the plan, the better the experience. Trtkat guides you from match to the meetup spot.',
          ],
        },
        {
          heading: 'Practical tips',
          paragraphs: [
            'Say expectations out loud, not in hints. Take your time if something feels off. And never continue when you are unsure.',
            'Trtkat helps young people date and enjoy life outside with respect — for free and without endless chat.',
          ],
        },
      ],
    },
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const BLOG_SLUGS = BLOG_POSTS.map((post) => post.slug);
