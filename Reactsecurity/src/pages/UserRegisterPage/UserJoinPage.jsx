/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./style";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signupApi } from "../../apis/signupApi";

const layout = css`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    width: 460px;
`;

const logo = css`
    font-size: 24px;
    margin-bottom: 40px;
`;

const joinInfoBox = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
    
    & input {
        box-sizing: border-box;
        border: none;
        outline: none;
        width: 100%;
        height: 50px;
        font-size: 16px;
    }

    & p {
        margin: 0px 0px 10px 10px;
        color: #ff2f2f;
        font-size: 12px;
    }

    & > div {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #dbdbdb;
        border-bottom: none;
        padding: 0px 20px;
    }

    & > div:nth-of-type(1) {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    & > div:nth-last-of-type(1) {
        border-bottom: 1px solid #dbdbdb;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

const joinbutton = css`
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 50px;
    background-color: #999;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
`;

function UserJoinPage(props) {

    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: "",
        checkPassword: "",
        name: "",
        email: ""
    });

    const handleInputUserOnChange = (e) => {
        setInputUser(inputUser => ({
            ...inputUser,
            [e.target.name]: e.target.value
        }))
    }

    const handleJoinSubmitOnClick = async () => {
        const response = await signupApi(inputUser);
        console.log(response);
    }

    return (
        <div css={layout}>
            <Link to={"/"}><h1 css={logo}>사이트 로고</h1></Link>
            <div css={joinInfoBox}>
                <div>
                    <input type="text" name='username' onchange={handleInputUserOnChange} value={inputUser.username} placeholder="아이디"/>
                </div>
                <div>
                    <input type="password" name='password' onchange={handleInputUserOnChange} value={inputUser.password} placeholder="비밀번호"/>
                </div>
                <div>
                    <input type="password" name='checkPassword' onchange={handleInputUserOnChange} value={inputUser.checkPassword} placeholder="비밀번호 확인"/>
                </div>
                <div>
                    <input type="text" name='name' onchange={handleInputUserOnChange} value={inputUser.name} placeholder="성명"/>
                </div>
                <div>
                    <input type="email" name='email' onchange={handleInputUserOnChange} value={inputUser.email} placeholder="이메일주소"/>
                </div>
            </div>
            <button css={joinbutton} onClick={handleJoinSubmitOnClick}>가입하기</button>
        </div>
    );
}

export default UserJoinPage;