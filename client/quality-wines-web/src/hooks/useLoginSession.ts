import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { COOKIE_SESSION_TOKEN } from "../constants";

const useLoginSession = (): [Function, Function, { ['WINES-QUALITY-AUTH']?: any }, Function, Function, boolean, string] => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_SESSION_TOKEN]);
    const location = useLocation();

    useEffect(() => {
        location.pathname !== '/' && !cookies[COOKIE_SESSION_TOKEN] && navigate('/login')
    }, [cookies])

    const removeSession = () => {
        removeCookie(COOKIE_SESSION_TOKEN);
    }

    const setSession = (token: string) => {
        setCookie(COOKIE_SESSION_TOKEN, token, { path: '/', domain: process.env.REACT_APP_SITE_DOMAIN });

    }



    return [setSession, removeSession, cookies, setCookie, removeCookie, !!cookies[COOKIE_SESSION_TOKEN], cookies[COOKIE_SESSION_TOKEN]]
};

export default useLoginSession;