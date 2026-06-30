export const replib = {
  name: "Resurrection Power and Living Bread Ministries",
  shortName: "REPLIB",
  location: "Birmingham, UK",
  founded: 1989,
  founder: "Late Rev. Francis Akwasi Amoako",
  motto: "In Him We Preach",
  mottoRef: "Colossians 1:28",
  generalOverseer: "Archbishop Akwasi Asare Bediako",
} as const;

export const covenantRenewers = {
  name: "Covenant Renewers",
  motto: "Alive for Christ!",
  parentChurch: replib.name,
  tagline:
    "The youth department of Resurrection Power and Living Bread Ministries Birmingham.",
  meaning: `Jesus Christ came to fulfil the Law of Moses (Matthew 5:17) and to establish the New Covenant between God and his people. The Old Covenant was written in stone, but the New Covenant is written on our hearts (Jeremiah 31:33). Entering the New Covenant is made possible only by faith in Christ Jesus.`,
  mission: `We Covenant Renewers are alive for Christ. We stand for truth — the saving knowledge of Jesus — and are forever ready, through music, spoken word, and creative arts, to proclaim the good news.`,
  scripture: {
    text: "So in Christ we, though many, form one body, and each member belongs to all the others.",
    ref: "Romans 12:5",
  },
} as const;

export const beliefs = [
  { topic: "Salvation", ref: "John 3:16" },
  { topic: "Spiritual Gifts", ref: "1 Corinthians 12:1" },
  { topic: "Healing", ref: "Exodus 15:26" },
  { topic: "Tithing", ref: "Malachi 3:10" },
  { topic: "Holy Spirit Baptism", ref: "Acts 2:1-3" },
  { topic: "Trinity", ref: "John 10:29-30" },
  { topic: "Marriage", ref: "Genesis 2:28" },
  { topic: "Discipline", ref: "Hebrews 12" },
] as const;

export interface ChurchDepartment {
  n: string;
  eyebrow: string;
  name: string;
  desc: string;
  link: string;
  featured?: boolean;
}

export const churchDepartments: ChurchDepartment[] = [
  {
    n: "01",
    eyebrow: "Women",
    name: "Women in Christ Ministry",
    desc: "A sisterhood of faith, prayer, and purpose — equipping women to walk boldly in Christ.",
    link: "Get involved",
    featured: true,
  },
  {
    n: "02",
    eyebrow: "Men",
    name: "Men's Fellowship",
    desc: "Brotherhood, accountability, and spiritual growth for men building lives on the Word.",
    link: "Join fellowship",
  },
  {
    n: "03",
    eyebrow: "Youth",
    name: "Covenant Renewers",
    desc: "The youth department — alive for Christ through worship, creative arts, and bold faith.",
    link: "Explore CR Youth",
  },
  {
    n: "04",
    eyebrow: "Next Gen",
    name: "Children's Ministry",
    desc: "Raising the next generation in faith with joy, safety, and solid biblical foundations.",
    link: "Learn more",
  },
];

export const crTeams = [
  "Prayer & Intercession Team",
  "Ushering Team",
  "CR Music",
  "Media Team",
  "Social Media Team",
  "Admin Team",
  "Retention Team",
  "Events Team",
  "MC & Announcements",
  "CR Enterprise",
] as const;

export interface Leader {
  initials: string;
  name: string;
  role: string;
  bio: string;
  dept: string;
  accent: string;
  quote?: string;
  photo?: string;
}

export const leaders: Leader[] = [
  {
    initials: "SK",
    name: "Rev. Stephen K Obeng",
    role: "Head Pastor (Papa)",
    bio: "Leading REPLIB Birmingham with pastoral care, vision, and a heart for the family of God alongside Mama Sarah Obeng.",
    dept: "Senior Leadership",
    accent: "var(--gold)",
    quote: "In Him we preach — Colossians 1:28",
  },
  {
    initials: "AB",
    name: "Archbishop Akwasi Asare Bediako",
    role: "General Overseer",
    bio: "Current General Overseer of Resurrection Power and Living Bread Ministries, carrying forward a legacy founded in 1989.",
    dept: "REPLIB Leadership",
    accent: "var(--gold-light)",
  },
  {
    initials: "SO",
    name: "Mrs. Sarah Obeng",
    role: "First Lady (Mama)",
    bio: "Serving alongside Papa with grace, warmth, and a deep commitment to the church family.",
    dept: "Senior Leadership",
    accent: "var(--gold)",
  },
  {
    initials: "OA",
    name: "Pastor Owusu Ansah",
    role: "Pastor",
    bio: "Ministering the Word and shepherding members with dedication and faith.",
    dept: "Pastoral Team",
    accent: "var(--cobalt)",
  },
  {
    initials: "ES",
    name: "Pastor Edward Sarpong",
    role: "Pastor",
    bio: "Serving the congregation through teaching, pastoral care, and spiritual leadership.",
    dept: "Pastoral Team",
    accent: "var(--cobalt)",
  },
];

export const youthLeader: Leader = {
  initials: "DT",
  name: "David Tenkoramah",
  role: "CR Youth Leader",
  bio: "Leading Covenant Renewers — raising a generation alive for Christ and ready to proclaim the gospel.",
  dept: "CR Youth",
  accent: "var(--ember)",
  quote: "Alive for Christ!",
};

export const crLeadership = [
  { name: "Lois Obeng", role: "Deputy" },
  { name: "Emmanuel Prempeh", role: "Deputy" },
  { name: "Mr. Eastwood Agyemang & Esther Adu", role: "CR Music" },
  { name: "Daniela Osei Bonsu", role: "Youth Retention Leader" },
  { name: "Mrs. Nana Ama Barkers", role: "Prayer & Intercession" },
  { name: "Mrs. Bridget", role: "Youth Organiser / Events" },
  { name: "Priscilla Nketiah", role: "CR Secretary / CR Enterprise" },
] as const;

export const ministers = [
  "Minister Godson Boakye",
  "Minister Samuel Afoakwah",
  "Minister Emmanuel Bebu",
] as const;

export const deacons = [
  "Deacon Benjamin Agyei",
  "Deacon Aryee",
  "Deacon Solomon Peprah",
  "Deacon Asafo Adjei",
  "Deaconess Vida Quarshie",
  "Deaconess Comfort Tenkoramah",
] as const;
