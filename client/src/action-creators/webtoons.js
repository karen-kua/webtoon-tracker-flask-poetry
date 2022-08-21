import * as Webtoons from "../api/webtoons"

export const setWebtoons = webtoons => ({
    type: 'SET_WEBTOONS',
    webtoons
})

export const setError = error => ({
    type: 'SET_WEBTOONS_ERROR',
    error
})

export const setIsAddingOneWebtoon = status => ({
    type: 'SET_IS_ADDING_WEBTOON',
    status
})

export const fetchWebtoons = () => {
    return async dispatch => {
        try {
            dispatch(setError(''));
            const webtoons = await Webtoons.fetchAllWebtoons();
            dispatch(setWebtoons(webtoons.data))
        } catch(error) {
            dispatch(setError(error.message))
        }
    }
}

export const addOneWebtoon = (reqBody) => {
    console.log('Karen is here')
    return async dispatch => {
        try {
            dispatch(setIsAddingOneWebtoon(true));
            dispatch(setError(''));
            const res = await Webtoons.addOneWebtoon(reqBody);
            console.log('Karen res: ', res);
            dispatch(fetchWebtoons())
            dispatch(setIsAddingOneWebtoon(false));
        } catch(error) {
            console.log('Karen error: ', error)
            const { response: { data: { Error: errMsg }}} = error;
            dispatch(setError(errMsg))
            dispatch(setIsAddingOneWebtoon(false));
        }
    }
}