import styles from './modal.module.css';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById("portal-root");

export const Modal = ({ children, onClose}) => {
    const closeModal = () => {
        onClose();
    };
    
    const handleKeyDown = (event) => {
        if (event.keyCode === 27 && onClose) {
            closeModal();
            console.log("clicked escape");
        }
    };
    
    useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
        document.removeEventListener("keydown", handleKeyDown);
    };
    }, [handleKeyDown]);

    return ReactDOM.createPortal(
    <>
        <ModalOverlay onClick ={closeModal}/>
        <div className={styles.modal_container}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    </>,
    modalRoot
    );
};

export default Modal;