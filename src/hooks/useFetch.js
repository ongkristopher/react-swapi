import axios from 'axios';
import config from './../config';

const useFetch = async (endpoint, isUseConfigUrl = true) => {
    const reqUrl = isUseConfigUrl ? config.url + endpoint : endpoint;
    const res = await axios.get(reqUrl).then((data) => data);
    return res;
};

export default useFetch;
