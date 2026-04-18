import { useContext } from "react";
import { Context } from "../store/appContext.jsx";

export default function useGlobalReducer() {
    const { store, actions } = useContext(Context);

    return { store, dispatch: actions };
}
