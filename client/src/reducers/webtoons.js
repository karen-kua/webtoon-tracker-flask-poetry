const initialState = {
    webtoons: [],
    isAddingWebtoon: false,
    error: ''
}

export const webtoonsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_WEBTOONS':
            return {...state, webtoons: action.webtoons}
        case 'SET_WEBTOONS_ERROR':
            return {...state, error: action.error}
        case 'SET_IS_ADDING_WEBTOON':
            return {...state, isAddingWebtoon: action.status}
        default:
            return state;
    }
}