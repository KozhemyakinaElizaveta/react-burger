import styles from './modal.module.css';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById("portal-root");

export const Modal = ({ children, onClose}) => {
    // const [mounted, setMounted] = useState(false);
    const modalRef = useRef(null);

    
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
        <ModalOverlay closeModal={closeModal} modalRef={modalRef}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </ModalOverlay>
    </>,
    modalRoot
    );
};

export default Modal;