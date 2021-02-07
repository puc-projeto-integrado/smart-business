import React, {useContext} from "react";
import {Button, Modal} from "react-bootstrap";
import {ModalContext} from "../ContextProviders/ModalContextProvider";

const CustomModal = (props)=>{

    const [modal, setModal] = useContext(ModalContext);

    const handleClose = () => {
        setModal(false);
    }

    if(typeof modal !== 'undefined'){
        return (
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }else{
        return null;
    }
}

export default CustomModal;