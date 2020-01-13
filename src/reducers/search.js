const defaultState = {
  "searchType": "Challenges",
  "typeChallenge": "All",
  "sort": "Trending",
  "statusChallenge": "Open",
  "industry": "All",
  "companySize": "All",
  "tags": [],
  "budgetC": [0, 50000],
  "searchKeywords": ""
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'searchType':
    case 'typeChallenge':
    case 'sort':
    case 'statusChallenge':
    case 'industry':
    case 'companySize':
    case 'tags':
    case 'budgetC':
    case 'searchKeywords':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}