import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function IndexPage(props) {
    const queryClient = useQueryClient();
    const data = queryClient.getQueriesData("accessTokenValidQuery");
    console.log(data);
    return (
        <div css={s.layout}>
            <header css={s.header}>
                <input type="search" placeholder='검색어를 입력하세요.'/>
            </header>
            <main css={s.main}>
                <div css={s.leftBox}>

                </div>
                <div css={s.rightBox}>
                    <p>더 안전하고 편리하게 이용하세요</p>
                    <button>로그인</button>
                    <div>
                        <Link to={"/user/help/id"}>아이디 찾기</Link>
                        <Link to={"/user/help/password"}>비밀번호 찾기</Link>
                        <Link to={"/user/join"}>회원가입 찾기</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default IndexPage;