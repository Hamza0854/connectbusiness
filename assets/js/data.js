/* =========================================================
   DUMMY DATA — all businesses & figures are fictional
   ========================================================= */
const CURRENCY = "GH₵";
const OWNER_BUSINESS_ID = 1; // Business shown on owner dashboard

const businesses = [
  {
    id: 1,
    name: "ABC Enterprise",
    initials: "AE",
    color: "#0E9F6E",
    industry: "Manufacturing",
    location: "Accra, Ghana",
    founded: 2018,
    employees: 42,
    owner: "Kwame Asante",
    tagline: "Locally made household plastics and packaging supplied to retailers across Ghana.",
    description:
      "ABC Enterprise manufactures durable household plastics and food-grade packaging for supermarkets, wholesalers and small retailers. With steady year-on-year growth and a loyal distributor network, the company is now seeking capital to expand production capacity.",
    financials: { revenue: 500000, expenses: 320000, netProfit: 180000, assets: 250000, liabilities: 60000 },
    history: { years: [2023, 2024, 2025], revenue: [380000, 440000, 500000], expenses: [270000, 295000, 320000] },
    expenseBreakdown: {
      labels: ["Salaries", "Raw Materials", "Rent & Utilities", "Marketing", "Other"],
      values: [120000, 100000, 45000, 30000, 25000]
    },
    investment: {
      amount: 100000, equity: 20, purpose: "Business expansion and equipment.",
      useOfFunds: [{ label: "New production equipment", pct: 60 }, { label: "Warehouse expansion", pct: 25 }, { label: "Working capital", pct: 15 }]
    },
    listing: { views: 248, interested: 6, updated: "Oct 2026" }
  },
  {
    id: 2,
    name: "GreenHarvest Agro",
    initials: "GH",
    color: "#16A34A",
    industry: "Agriculture",
    location: "Kumasi, Ghana",
    founded: 2016,
    employees: 58,
    owner: "Akosua Boateng",
    tagline: "Commercial vegetable farming supplying fresh produce to hotels and markets.",
    description:
      "GreenHarvest Agro cultivates tomatoes, peppers and leafy greens on 40 acres, supplying hotels, restaurants and urban markets. Investment will reduce post-harvest losses through cold storage and improve yields with modern irrigation.",
    financials: { revenue: 420000, expenses: 290000, netProfit: 130000, assets: 310000, liabilities: 90000 },
    history: { years: [2023, 2024, 2025], revenue: [300000, 360000, 420000], expenses: [230000, 260000, 290000] },
    expenseBreakdown: {
      labels: ["Salaries", "Seeds & Fertilizer", "Logistics", "Equipment Maintenance", "Other"],
      values: [95000, 85000, 55000, 35000, 20000]
    },
    investment: {
      amount: 150000, equity: 25, purpose: "Cold-storage facility and drip irrigation equipment.",
      useOfFunds: [{ label: "Cold-storage facility", pct: 55 }, { label: "Irrigation system", pct: 35 }, { label: "Training", pct: 10 }]
    }
  },
  {
    id: 3,
    name: "PayNest Technologies",
    initials: "PN",
    color: "#3B82F6",
    industry: "Fintech",
    location: "Accra, Ghana",
    founded: 2021,
    employees: 24,
    owner: "Daniel Owusu",
    tagline: "Mobile payment and bookkeeping app for small shops and market traders.",
    description:
      "PayNest builds a simple mobile app that helps small traders accept mobile-money payments and track daily sales. The platform has grown quickly and is seeking funding for product development and expansion into new regions.",
    financials: { revenue: 360000, expenses: 250000, netProfit: 110000, assets: 180000, liabilities: 40000 },
    history: { years: [2023, 2024, 2025], revenue: [150000, 250000, 360000], expenses: [140000, 200000, 250000] },
    expenseBreakdown: {
      labels: ["Salaries", "Cloud & Software", "Marketing", "Office", "Other"],
      values: [130000, 50000, 40000, 20000, 10000]
    },
    investment: {
      amount: 200000, equity: 15, purpose: "Product development and regional expansion.",
      useOfFunds: [{ label: "Product development", pct: 50 }, { label: "Regional marketing", pct: 35 }, { label: "Operations", pct: 15 }]
    }
  },
  {
    id: 4,
    name: "CoastLine Logistics",
    initials: "CL",
    color: "#0B1E3B",
    industry: "Logistics",
    location: "Takoradi, Ghana",
    founded: 2014,
    employees: 76,
    owner: "Esi Mensah",
    tagline: "Haulage and last-mile delivery services connecting ports to inland businesses.",
    description:
      "CoastLine Logistics provides haulage and last-mile delivery between Takoradi port and businesses across the Western and Central regions. Demand currently exceeds fleet capacity, and funding will be used to add new delivery trucks.",
    financials: { revenue: 640000, expenses: 480000, netProfit: 160000, assets: 520000, liabilities: 210000 },
    history: { years: [2023, 2024, 2025], revenue: [520000, 580000, 640000], expenses: [400000, 445000, 480000] },
    expenseBreakdown: {
      labels: ["Fuel", "Salaries", "Vehicle Maintenance", "Insurance", "Other"],
      values: [170000, 140000, 90000, 45000, 35000]
    },
    investment: {
      amount: 250000, equity: 18, purpose: "Fleet expansion — four new delivery trucks.",
      useOfFunds: [{ label: "Delivery trucks", pct: 75 }, { label: "Fleet tracking system", pct: 15 }, { label: "Driver recruitment", pct: 10 }]
    }
  },
  {
    id: 5,
    name: "Sankofa Fashion House",
    initials: "SF",
    color: "#F59E0B",
    industry: "Retail & Fashion",
    location: "Accra, Ghana",
    founded: 2019,
    employees: 18,
    owner: "Abena Darko",
    tagline: "Contemporary African-print clothing and accessories for modern customers.",
    description:
      "Sankofa Fashion House designs and sells contemporary African-print clothing through its flagship store and social media. The brand plans to open a second outlet and launch a full e-commerce store.",
    financials: { revenue: 280000, expenses: 195000, netProfit: 85000, assets: 120000, liabilities: 35000 },
    history: { years: [2023, 2024, 2025], revenue: [190000, 235000, 280000], expenses: [140000, 170000, 195000] },
    expenseBreakdown: {
      labels: ["Fabrics & Materials", "Salaries", "Rent", "Marketing", "Other"],
      values: [70000, 60000, 30000, 25000, 10000]
    },
    investment: {
      amount: 80000, equity: 15, purpose: "Second retail outlet and e-commerce store.",
      useOfFunds: [{ label: "Second retail outlet", pct: 60 }, { label: "E-commerce website", pct: 25 }, { label: "Inventory", pct: 15 }]
    }
  },
  {
    id: 6,
    name: "MediCare Plus Pharmacy",
    initials: "MP",
    color: "#F97362",
    industry: "Healthcare",
    location: "Tamale, Ghana",
    founded: 2017,
    employees: 31,
    owner: "Ibrahim Alhassan",
    tagline: "Community pharmacy chain providing affordable medicines in Northern Ghana.",
    description:
      "MediCare Plus operates two community pharmacies offering affordable medicines, health screenings and advice. The business is seeking funding to open two new branches in underserved communities.",
    financials: { revenue: 450000, expenses: 330000, netProfit: 120000, assets: 275000, liabilities: 70000 },
    history: { years: [2023, 2024, 2025], revenue: [340000, 395000, 450000], expenses: [255000, 295000, 330000] },
    expenseBreakdown: {
      labels: ["Inventory", "Salaries", "Rent", "Licensing", "Other"],
      values: [180000, 85000, 35000, 15000, 15000]
    },
    investment: {
      amount: 120000, equity: 20, purpose: "Opening two new pharmacy branches.",
      useOfFunds: [{ label: "Branch setup", pct: 55 }, { label: "Initial stock", pct: 35 }, { label: "Staff training", pct: 10 }]
    }
  }
];

function getBusinessById(id) {
  return businesses.find((b) => b.id === Number(id));
}