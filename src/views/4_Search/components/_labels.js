let tempState = {
  "showBudget": false,
  "showCategories": false,
  "showType": false,
  "showSort": false,
  "showStatus": false,
  "showIndustry": false,
  "showCompanySize": false
}

let optionsCategory = [
  { option: "All Communities", description: "All communities on Stratagan." },
  { option: "Strategy", description: "Design roadmaps for success in competitive markets." },
  { option: "Analytics", description: "Discover insight from market research & data." },
  { option: "Marketing & Sales", description: "Drive growth & strengthen brand recognition." },
  { option: "Digital", description: "Utilize online channels, tools, & solutions." },
  { option: "Technology", description: "Implement technologies for business value." },
  { option: "Design", description: "Create & design new solutions for particular problems." },
  { option: "Finance", description: "Identify profitable growth & asset management." },
  { option: "Operations", description: "Align systems, organize people, & optimize processes." },
  { option: "Human Resources", description: "Attract, manage, & retain top talent." },
  { option: "Legal & Compliance", description: "Ensure compliance with regulations." },
  { option: "Social & Nonprofit", description: "Provide expertise for social betterment." },
  { option: "Other", description: "Categories not listed by Stratagan." }
]

let optionsTypeChallenges = [
  { option: "All", description: "All consulting, project, & recruitment challenges." },
  { option: "Consulting", description: "Long-term business transformation & advisory." },
  { option: "Project", description: "Time-bound goals with set objectives & deliverables." },
  { option: "Recruitment", description: "Challenges with the intent of recruitment by companies." }
]
let optionsSort = [
  { option: "Trending", description: "Items sorted by most active." },
  { option: "Recent", description: "Items sorted by earliest post date." },
  { option: "Top", description: "Top of all time." }
]
let optionsStatusChallenges = [
  { option: "All", description: "Search all challenges of all status." },
  { option: "Open", description: "Challenge is open for proposal submissions." },
  { option: "Closed", description: "Challenge is closed, and proposals are being reviewed." },
  { option: "Completed", description: "Challenge is completed, with all objectives reached & deliverables submitted." }
]
let optionsIndustry = [
  { option: "All", description: "All industries on Stratagan." },
  { option: "Consumer Goods", description: "Apparel, consumer products, durables, food & beverages, & others." },
  { option: "Engineering", description: "Aerospace, automotive, chemical, robotics, & others." },
  { option: "Entertainment & Media", description: "Broadcasting, film, music, publishing, sports, video games, & others." },
  { option: "Financial", description: "Accounting, banking, fintech, insurance, real estate, stock brokerages, & others." },
  { option: "Healthcare", description: "Biotech, hospitals, medical, pharmaceutical, & others." },
  { option: "Hospitality & Leisure", description: "Accomodations, dining & restaurants, leisure activities, tourism, & others." },
  { option: "Industrial", description: "Agricultural, construction, energy, manufacturing, transportation, & others." },
  { option: "Professional", description: "Consulting, intellectual property, law, marketing & advertising, & others." },
  { option: "Retail", description: "Department stores, groceries, merchants, retailers, & others." },
  { option: "Software", description: "Applications, internet, online services & platforms, & others." },
  { option: "Technology", description: "Blockchain, electronics, Internet-of-Things, IT, & others." },
  { option: "Other", description: "Industries not listed by Stratagan." },
]
let optionsCompanySize = [
  { option: "All", description: "All company sizes." },
  { option: "Micro", description: "Less than 10 employees." },
  { option: "Small", description: "Less than 50 employees." },
  { option: "Medium", description: "Less than 250 employees." },
  { option: "Large", description: "Greater than 250 employees." }
]

export {
  optionsCategory,
  optionsCompanySize,
  optionsIndustry,
  optionsSort,
  optionsStatusChallenges,
  optionsTypeChallenges,
  tempState
}