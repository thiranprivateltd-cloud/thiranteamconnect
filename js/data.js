/**
 * Data store for Thiran Team Connect 2026
 * Thoughtful editorial styling with ink tones and single terracotta accent (#C25E3E)
 */

const THIRAN_DATA = {
  event: {
    name: "Thiran Team Connect 2026",
    theme: "Bright Momentum",
    tagline: "Recognize · Connect · Grow",
    dateISO: "2026-10-03T10:00:00+05:30",
    dateEndISO: "2026-10-03T16:00:00+05:30",
    venue: "Vel Tech Garden",
    totalCapacity: 30,
    initialConfirmed: 0
  },

  // The Official Thiran Team Members from https://thiranprivateltd.vercel.app/team
  team: [
    {
      id: "member-1",
      name: "G S Varshith",
      role: "Founder & CEO",
      dept: "Leadership",
      initials: "GV",
      bgGradient: "#1B4D4F",
      proudOf: "Building the future of education with AI guidance engines and enterprise platforms.",
      funFact: "2nd Year College Student"
    },
    {
      id: "member-2",
      name: "Dharshan S",
      role: "Co-Founder & COO",
      dept: "Leadership",
      initials: "DS",
      bgGradient: "#C25E3E",
      proudOf: "Execution is the game — driving operational rhythm and partner ecosystems.",
      funFact: "D Spark Web Solutions Partner"
    },
    {
      id: "member-3",
      name: "Brundavanam P",
      role: "Project Manager",
      dept: "Operations",
      initials: "BP",
      bgGradient: "#2C6E49",
      proudOf: "Ecosystem Operations & Delivery — orchestrating project milestones seamlessly.",
      funFact: "Master organizer."
    },
    {
      id: "member-4",
      name: "Sasi",
      role: "Legal Mentor",
      dept: "Leadership",
      initials: "SA",
      bgGradient: "#333333",
      proudOf: "Keeping us compliant and setting legal governance structures.",
      funFact: "Reads contracts for fun."
    },
    {
      id: "member-5",
      name: "Mukunthan S",
      role: "Tech Lead, Event Coordinator",
      dept: "Engineering",
      initials: "MS",
      bgGradient: "#1B4D4F",
      proudOf: "Design is how it works — architecting scalable systems and coordinating team energy.",
      funFact: "Loves clean UI."
    },
    {
      id: "member-6",
      name: "Samuel Ignitius",
      role: "Full Stack Developer",
      dept: "Engineering",
      initials: "SI",
      bgGradient: "#C25E3E",
      proudOf: "Code is poetry — delivering responsive and performant full stack modules.",
      funFact: "React enthusiast."
    },
    {
      id: "member-7",
      name: "Shaik Nabeela Rayees",
      role: "Backend Developer",
      dept: "Engineering",
      initials: "SR",
      bgGradient: "#2C6E49",
      proudOf: "Data is beautiful — building robust REST & streaming API infrastructure.",
      funFact: "Loves APIs."
    },
    {
      id: "member-8",
      name: "Keerthana P S",
      role: "AI/ML Developer",
      dept: "Engineering",
      initials: "KP",
      bgGradient: "#7A431D",
      proudOf: "Machines can learn too — training and fine-tuning intelligent guidance models.",
      funFact: "Python expert."
    },
    {
      id: "member-9",
      name: "Hari Haran V",
      role: "Career Research Analyst",
      dept: "Operations",
      initials: "HH",
      bgGradient: "#1B4D4F",
      proudOf: "Finding patterns in chaos — analyzing industry pathways for student career clarity.",
      funFact: "Avid reader."
    },
    {
      id: "member-10",
      name: "Mogesh J",
      role: "Data Analyst",
      dept: "Engineering",
      initials: "MJ",
      bgGradient: "#333333",
      proudOf: "Numbers don't lie — transforming raw telemetry into actionable product decisions.",
      funFact: "SQL wizard."
    },
    {
      id: "member-11",
      name: "Prakathesh C",
      role: "Tech Support Lead & Frontend Developer",
      dept: "Engineering",
      initials: "PC",
      bgGradient: "#C25E3E",
      proudOf: "Helping one at a time — crafting user interfaces and delivering fast resolutions.",
      funFact: "Always smiling."
    },
    {
      id: "member-12",
      name: "Hariprasad H",
      role: "Integrated Testing Coordinator",
      dept: "Engineering",
      initials: "HH",
      bgGradient: "#2C6E49",
      proudOf: "Ensuring quality always — keeping our release cycles smooth and bug-free.",
      funFact: "Bug hunter."
    },
    {
      id: "member-13",
      name: "Navasri N",
      role: "Content & Communication Manager",
      dept: "Operations",
      initials: "NN",
      bgGradient: "#7A431D",
      proudOf: "Words matter — articulating our mission and connecting with the community.",
      funFact: "Social media guru."
    },
    {
      id: "member-14",
      name: "Rahav V K",
      role: "Product Manager",
      dept: "Design",
      initials: "RV",
      bgGradient: "#1B4D4F",
      proudOf: "Users first, always — transforming student and customer needs into roadmap priorities.",
      funFact: "Travels every weekend."
    },
    {
      id: "member-15",
      name: "Arpit Kumar P",
      role: "Business Developer",
      dept: "Operations",
      initials: "AK",
      bgGradient: "#C25E3E",
      proudOf: "Connecting with people — forging institutional and enterprise relationships.",
      funFact: "Talks to strangers."
    },
    {
      id: "member-16",
      name: "Akash M",
      role: "Growth Manager, Digital Media",
      dept: "Operations",
      initials: "AM",
      bgGradient: "#333333",
      proudOf: "Telling our story — expanding Thiran's reach and digital footprint.",
      funFact: "Growth hacker."
    },
    {
      id: "member-17",
      name: "Kanmani G",
      role: "Growth Support, Data Coordinator",
      dept: "Operations",
      initials: "KG",
      bgGradient: "#2C6E49",
      proudOf: "Data drives growth — organizing intelligence and supporting outreach funnels.",
      funFact: "Master organizer."
    },
    {
      id: "member-18",
      name: "Lohidharani G S",
      role: "HR Admin, Community Manager",
      dept: "Operations",
      initials: "LG",
      bgGradient: "#C25E3E",
      proudOf: "People are our strength — nurturing culture, empathy, and team well-being.",
      funFact: "Community builder."
    },
    {
      id: "member-19",
      name: "Vaishali S",
      role: "Operations Monitoring",
      dept: "Operations",
      initials: "VS",
      bgGradient: "#1B4D4F",
      proudOf: "Keeping the lights on — proactive system observability and operational tracking.",
      funFact: "System optimizer."
    },
    {
      id: "member-20",
      name: "Praveena R",
      role: "HR Coordinator, Sales Executive",
      dept: "Operations",
      initials: "PR",
      bgGradient: "#7A431D",
      proudOf: "Keep People Engaged — bringing energy to client conversations and talent onboarding.",
      funFact: "Master of Sales."
    }
  ],

  // Initial Cheers: Starts Empty
  initialCheers: [],

  // Initial Ideas: Starts Empty
  initialIdeas: [],

  // Award Laureates: Will be Revealing Soon
  awardWinners: [
    {
      category: "Performance",
      awardName: "The Velocity & Craft Award",
      winner: "Will be Revealing Soon!",
      role: "Honoring Technical & Operational Excellence",
      citation: "Nominations under active review by the honors committee."
    },
    {
      category: "Teamwork",
      awardName: "The Catalyst & Glue Award",
      winner: "Will be Revealing Soon!",
      role: "Honoring Collaboration & Culture",
      citation: "Nominations under active review by the honors committee."
    },
    {
      category: "Growth",
      awardName: "The Leap & Innovation Award",
      winner: "Will be Revealing Soon!",
      role: "Honoring Breakthrough Learning & Agility",
      citation: "Nominations under active review by the honors committee."
    },
    {
      category: "Special",
      awardName: "The Unsung Hero Award",
      winner: "Will be Revealing Soon!",
      role: "Honoring Dependability & Quiet Mastery",
      citation: "Nominations under active review by the honors committee."
    }
  ]
};
