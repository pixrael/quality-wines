import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { COOKIE_SESSION_TOKEN } from "../constants";

const useLoginSession = (): [Function, Function, { SessionToken?: any }, Function, Function, boolean] => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_SESSION_TOKEN]);

    useEffect(() => {
        !cookies[COOKIE_SESSION_TOKEN] && navigate('/login')
    }, [cookies])

    const removeSession = () => {
        removeCookie(COOKIE_SESSION_TOKEN);
    }

    const setSession = (token: string) => {
        setCookie(COOKIE_SESSION_TOKEN, token, { path: '/' });

    }



    return [setSession, removeSession, cookies, setCookie, removeCookie, !!cookies[COOKIE_SESSION_TOKEN]]
};

export default useLoginSession;