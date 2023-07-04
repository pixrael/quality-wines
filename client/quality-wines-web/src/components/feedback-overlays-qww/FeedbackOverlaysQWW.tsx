import { useSelector } from "react-redux";
import SnackbarQWW from "./snackbar-qww/SnackbarQWW";
import { hideSnackbar, selectSnackbar } from "../../store/slices/overlay-slice";
import store from "../../store/store";

function FeedbackOverlaysQWW() {
    const { isShown, message, severity } = useSelector(selectSnackbar);
    const onClose = () => store.dispatch(hideSnackbar());

    return (<>
        {isShown && <SnackbarQWW message={message} severity={severity} openSnackbar={isShown} onClose={onClose} />}
    </>)
}

export default FeedbackOverlaysQWW;

