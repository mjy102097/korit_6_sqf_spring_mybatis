import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import UserJoinPage from './pages/UserJoinPage/UserJoinPage';
import UserLoginPage from './pages/UserLoginPage/UserLoginPage';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { instance } from './apis/util/instance';

function App() {
  const [ refresh, setRefresh ] = useState(false);
  const accessTokenValid = useQuery(
    ["accessTokenValidQuery"],
    async () => {
      setRefresh(false);
      return await instance.get("/auth/access", {
        params: {
          accessToken: localStorage.getItem("accessToken")
        }
      });
    }, {
      enabled: refresh,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: response => {
        console.log(response);
      }
    }
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(!!accessToken) {
        setRefresh(true)
    }
  }, [])

  

  return (
    <>
        {
          accessTokenValid.isLoading 
          ? <h1>로딩중...</h1> 
          :
          accessTokenValid.isSuccess
          ? 
            <Routes>
              <Route path='/' element={<IndexPage />} />
              <Route path='/user/join' element={<UserJoinPage />} />
              <Route path='/user/login' element={<UserLoginPage />} />
              <Route path='/admin/*' element={<></>} />

              <Route path='/admin/*' element={<h1>Not Found</h1>} />
              <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
          :
            <h1>페이지를 불러오는 중 오류가 발생하였습니다.</h1>
        }
        
    </>
  );
}

export default App;
