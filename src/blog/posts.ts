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
      title: 'Nezávazné seznamování pro studenty: co to znamená v praxi',
      excerpt: 'Jak funguje nezávazné seznámení, pro koho dává smysl a jak si nastavit jasná očekávání.',
      metaDescription:
        'Průvodce nezávazným seznamováním pro studenty. Jasná očekávání, respekt a bezpečné seznámení bez zbytečného chatu.',
      sections: [
        {
          paragraphs: [
            'Nezávazné seznamování neznamená nezájem o druhého člověka. Znamená to, že obě strany hledají především nové kontakty, přátelství nebo společný večer — bez tlaku na vztah.',
            'Pro studenty je typické, že chtějí poznávat lidi v novém prostředí, ale nemají vždy čas na dlouhé psaní a nejistotu z klasických seznamek.',
          ],
        },
        {
          heading: 'Jak na to bezpečně',
          paragraphs: [
            'Základem je jasná domluva, respekt k hranicím a otevřená komunikace. Trtkat na to staví celou aplikaci — méně zbytečného chatu, víc jasna.',
            'Pokud si nejsi jistý/á, ptej se. Souhlas a slušnost nejsou volitelné.',
          ],
        },
      ],
    },
    en: {
      title: 'Casual dating for students: what it means in practice',
      excerpt: 'How casual meetups work, who they suit, and how to set clear expectations.',
      metaDescription:
        'A guide to casual dating for students. Clear expectations, respect, and safe meetups without endless chat.',
      sections: [
        {
          paragraphs: [
            'Casual dating does not mean you do not care about the other person. It means both sides are mainly looking for new contacts, friendship, or a good evening — without relationship pressure.',
            'Students often want to meet people in a new environment but do not always have time for long chats and the uncertainty of classic dating apps.',
          ],
        },
        {
          heading: 'How to do it safely',
          paragraphs: [
            'Clear plans, respect for boundaries, and open communication are the foundation. Trtkat is built around that — less pointless chat, more clarity.',
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
            'Trtkat doplňuje tuto osvětu praktickým přístupem k seznamování — bez zbytečného stigmatu a bez zbytečných slov navíc.',
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
      excerpt: 'Proč je souhlas klíčový a jak si ho udržet i v nezávazném seznamování.',
      metaDescription:
        'Souhlas a hranice v nezávazném seznamování. Praktický edukační článek pro studenty od aplikace Trtkat.',
      sections: [
        {
          paragraphs: [
            'Bezpečné seznamování stojí na jednoduchém principu: obě strany vědí, co od setkání chtějí, a respektují limity druhého.',
            'Nezávaznost neznamená nejasnost. Právě naopak — čím jasnější domluva, tím příjemnější zkušenost.',
          ],
        },
        {
          heading: 'Praktické tipy',
          paragraphs: [
            'Mluv očekávání nahlas, ne v insinuacích. Nech si čas, pokud něco nesedí. A nikdy nepokračuj tam, kde nemáš jistotu.',
            'Trtkat pomáhá studentům seznamovat se s respektem — zdarma a bez zbytečného chatu.',
          ],
        },
      ],
    },
    en: {
      title: 'Consent and boundaries: the foundation of safe dating',
      excerpt: 'Why consent matters and how to maintain it in casual dating too.',
      metaDescription:
        'Consent and boundaries in casual dating. A practical educational article for students from Trtkat.',
      sections: [
        {
          paragraphs: [
            'Safe dating is built on a simple principle: both sides know what they want from a meetup and respect each other’s limits.',
            'Casual does not mean unclear. The clearer the plan, the better the experience.',
          ],
        },
        {
          heading: 'Practical tips',
          paragraphs: [
            'Say expectations out loud, not in hints. Take your time if something feels off. And never continue when you are unsure.',
            'Trtkat helps students date with respect — for free and without pointless chat.',
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
