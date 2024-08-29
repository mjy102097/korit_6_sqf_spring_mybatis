import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link } from 'react-router-dom';
import { signinApi } from '../../apis/signinApi';

function UserLoginPage(props) {
    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username: <></>,
        password: <></>,
    });

    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: "",
    })

    const handleInputUserOnChange = (e) => {
        setInputUser(user => ({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    const handleLoginSubmitOnClick = async () => {
        const signinData = await signinApi(inputUser);
        if(!signinData.isSuccess) {
            if(signinData.errorStatus === 'fieldError') {
                showFieldErrorMessage(signinData.error);
            }
            if(signinData.errorStatus === 'loginError') {
                let EmptyFieldErrors = {
                    username: <></>,
                    password: <></>
                }
                setFieldErrorMessages(EmptyFieldErrors);
                alert(signinData.error);
            }
            return;
        }
        localStorage.setItem("accessToken", "Bearer " + signinData.token.accessToken);
        // 
        window.location.replace("/");
    }

    const showFieldErrorMessage = (fieldErrors) => {
        let EmptyFieldErrors = {
            username: <></>,
            password: <></>,
        };
        
        for(let fieldError of fieldErrors) {
            EmptyFieldErrors = {
                ...EmptyFieldErrors,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }

        setFieldErrorMessages(EmptyFieldErrors);
    }

    return (
        <div>
            <div css={s.layout}>
            <Link to={"/user/login"}><h1 css={s.logo}>LOGO</h1></Link>
            <div css={s.loginInfoBox}>
                <div>
                    <input type="text" name='username' onChange={handleInputUserOnChange} value={inputUser.username} placeholder='ID' />
                    {
                        fieldErrorMessages.username
                    }
                </div>
                <div>
                    <input type="password" name='password' onChange={handleInputUserOnChange} value={inputUser.password} placeholder='Password'/>
                    {
                        fieldErrorMessages.password
                    }
                </div>
            </div>
            <button css={s.loginButton} onClick={handleLoginSubmitOnClick}>Login</button>
        </div>
        </div>
    );
}

export default UserLoginPage;