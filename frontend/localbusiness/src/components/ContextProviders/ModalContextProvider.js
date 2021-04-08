import React, {useState, createContext} from "react";

export const ModalContext = createContext([]);

export const ModalContextProvider = props => {

    const [modalState, setModalState] = useState(null);

    return (
        <ModalContext.Provider value={[modalState, setModalState]}>
            {props.children}
        </ModalContext.Provider>
    );
};