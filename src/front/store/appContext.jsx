import React, { useState } from "react";
import { initialStore } from "../store.js";
import storeReducer from "../store.js";

export const Context = React.createContext(null);

export const ContextProvider = ({ children }) => {

    const [store, setStore] = useState(initialStore());

    const dispatch = (action) => {
        const updatedStore = storeReducer(store, action);
        setStore(updatedStore);
    };

    const value = {
        store,
        dispatch
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

