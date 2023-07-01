import styles from './modal.module.css';
import {useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from './modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("portal-root");

export const Modal = ({ children, onClose}) => {
    const closeModal = () => {
        onClose();
    };
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27 && onClose) {
                closeModal();
                console.log("clicked escape");
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;