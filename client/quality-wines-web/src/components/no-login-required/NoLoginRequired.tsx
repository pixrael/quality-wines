import { useEffect } from 'react';
import useLoginSession from '../../hooks/useLoginSession';
import { useNavigate } from 'react-router-dom';

export default function NoLoginRequired({ componentToRender, redirectTo }: {
    componentToRender: JSX.Element,
    redirectTo: string
}) {

    const navigate = useNavigate();
    const [, , , , , isLogged] = useLoginSession();

    useEffect(() => {
        isLogged && navigate(redirectTo);
    }, [isLogged])


    return (<>
        {isLogged && <>Redirecting ...</>}
        {!isLogged && componentToRender}
    </>)
}