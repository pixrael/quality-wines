import useLoginSession from '../../hooks/useLoginSession';

export default function AuthRequired({ componentToRender }: {
    componentToRender: JSX.Element
}) {

    const [, , , , , isLogged] = useLoginSession();

    return (<>
        {!isLogged && <>Unauthorized, pls login</>}
        {isLogged && componentToRender}
    </>)
}