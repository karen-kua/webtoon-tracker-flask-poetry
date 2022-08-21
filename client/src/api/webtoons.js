import Axios from 'axios';

export const fetchAllWebtoons = async () => {
    const res = await Axios.get('/api/webtoons')
    return res;
}

export const addOneWebtoon = async (reqBody) => {
    const res = await Axios.post('/api/webtoons', reqBody)
    return res;
}