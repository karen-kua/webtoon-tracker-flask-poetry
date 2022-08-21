import * as Webtoons from "../api/webtoons"

export const setWebtoons = webtoons => ({
    type: 'SET_WEBTOONS',
    webtoons
})

export const setError = error => ({
    type: 'SET_WEBTOONS_ERROR',
    error
})

export const fetchWebtoons = () => {
    console.log('Karen is here')
    return async dispatch => {
        try {
            const webtoons = await Webtoons.fetchAllWebtoons();
            console.log('Karen fetched: ', webtoons)
            dispatch(setWebtoons(webtoons.data))
        } catch(error) {
            dispatch(setError(error.message))
        }
    }
}