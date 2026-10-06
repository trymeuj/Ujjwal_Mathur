export type Person = {
  name: string;
  image: string;
  text: string;
  links: { label: string; href: string }[];
};

export const peopleSections: { title: string; people: Person[] }[] = [
  {
    title: "About me",
    people: [{
      name: "Ujjwal Mathur", image: "/my pic.jpg",
      text: "I have a fear of being inactive, and that pushes me to try things out and learn. I really like this and want to retain it in some form.",
      links: [{ label: "Twitter", href: "https://x.com/ujjwalmathur03" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/ujjwalmathuruj/" }],
    }],
  },
  {
    title: "People I learn from (alive)",
    people: [
      { name: "Paul Graham", image: "/Paul_Graham.jpeg", text: "His Essays are what led me to the rest of the people on this list.", links: [{ label: "Twitter", href: "https://twitter.com/paulg" }, { label: "Essays", href: "http://paulgraham.com/" }] },
      { name: "Elon Musk", image: "/elon_musk.jpg", text: "Electric cars, space exploration, boring commpany, AI. Elon could be the one of the greatest humans to ever live. I personally don't like his move of getting into free speech and politics, but maybe that's a way to get power and resources beyond a private organisation's scope.", links: [{ label: "Twitter", href: "https://twitter.com/elonmusk" }] },
      { name: "Sam Altman", image: "/sam-altman.jpeg", text: "Maybe the most influential person of the decade.", links: [{ label: "Twitter", href: "https://twitter.com/sama" }, { label: "Blog", href: "https://blog.samaltman.com/" }] },
      { name: "Pavel Durov", image: "/pavel_durov.jpeg", text: "He has a very contrarian way of running a company. Telegram is a 30 person company, perhaps the biggest and the most efficient lean startup in the world.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Pavel_Durov" }] },
      { name: "Naval Ravikant", image: "/naval-ravikant.jpg", text: "The true measure of intelligence is if a person gets what they want in life", links: [{ label: "Twitter", href: "https://twitter.com/naval" }, { label: "Website", href: "https://nav.al/" }] },
      { name: "Peter Thiel", image: "/peter_thiel.jpeg", text: "I can't process even reading about his optimism. The guy who built the first and The most successful startup mafia.", links: [{ label: "Twitter", href: "https://twitter.com/finkd" }] },
      { name: "Michael Jordan", image: "/michael_jordan.jpeg", text: "The definition of Obsession (My source of info is only the internet). He retired from basketball when he could become the first player ever to win 4 in a row. Who does that? Then returned after 2 years to become the first player to win 3 peats twice. What ?", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Michael_Jordan" }] },
    ],
  },
  {
    title: "People I learn from (not alive)",
    people: [
      { name: "Lee Kuan Yew", image: "/lee_kuan_yew.jpg", text: "Literally \"built\" Singapore. Their \"Gandhi\", just did not die a year after independence, but led for the next 50 years and took them to where Singapore is today. Controversial way of leading a country, arguably established autocracy, but the results speak for themselves. In fact, I favor autocracy (to an extent) if needed for unprecendented growth. Unfortunately, not possible in India.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Lee_Kuan_Yew" }] },
      { name: "Steve Jobs", image: "/steve jobs.jpeg", text: "The ultimate independent thinker.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Steve_Jobs" }] },
      { name: "Genghis Khan", image: "/genghis_khan.jpeg", text: "I was surprised to learn that he lost most of his battles until he turned 40, and then went onto become The Genghis Khan.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Genghis_Khan" }] },
      { name: "Kobe Bryant", image: "/kobe_bryant.jpeg", text: "I believe he was arguably next to only MJ when it comes to obsession.", links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Kobe_Bryant" }] },
    ],
  },
  {
    title: "Writers",
    people: [
      { name: "Chris Voss", image: "/chris_voss.jpg", text: "Who would you choose to negotiate if you life depended on it?", links: [{ label: "Twitter", href: "https://twitter.com/FBInegotiator" }, { label: "Website", href: "https://www.blackswanltd.com/" }] },
      { name: "Morgan Housel", image: "/Morgan_Housel.jpeg", text: "I just fell in love with his writing.", links: [{ label: "Twitter", href: "https://twitter.com/morganhousel" }, { label: "Website", href: "https://www.collaborativefund.com/" }] },
    ],
  },
];
