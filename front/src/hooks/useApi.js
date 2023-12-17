import { useState } from 'react';
import axios from 'axios';
import api from "../components/utils/axiosConfig"

const useApi = async (method, url, data, params) => {
    const [result, setResult] = useState([]); // api 데이터 저장하기
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태
    const [error, setError] = useState(false);
	  // const [url, setUrl] = useState(initalUrl);

    if (method === 'get') {
      try {
        const res = await api(url);
        setResult(res);
      } catch (err) {
        setError(err);
      }
    }

    if (method === 'put' || method === 'post') {
      try {
        if (params) {
          const res = await api[method](url, data, {params: params});
          setResult(res);
        } else {
          const res = await api[method](url, data);
          setResult(res);
        }
      } catch (err) {
        setError(err);
      }
    }

    if (method === 'delete') {
      try {
        const res = await api.delete(url);
        setResult(res);
      } catch (err) {
        setError(err);
      }
    }

    // 다시 요청
    const reFetch = async () => {
        setLoading(true);
        try {
          const res = await api.get(url);
          setResult(res);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };
    
    return { result, loading, error, reFetch };
}
export default useApi;