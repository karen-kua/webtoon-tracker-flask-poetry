import Axios from 'axios';

export const fetchAllWebtoons = async () => {
    const res = await Axios.get('/api/webtoons')
    return res;
}