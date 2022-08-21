const initialState = {
    webtoons: [],
    error: ''
}

export const webtoonsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_WEBTOONS':
            return {...state, webtoons: action.webtoons}
        case 'SET_WEBTOONS_ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
}