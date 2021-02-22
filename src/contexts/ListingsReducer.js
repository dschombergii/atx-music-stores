export default (state, action) => {
    switch (action.type) {
        case 'ADD_LISTING':
            return {
                ...state,
                listings: [action.payload, ...state.listings]
            }
        case 'REMOVE_LISTING':
            return {
                ...state,
                listings: state.listings.filter(listing => listing.id !== action.payload)
            }
        default: return state
    }
}