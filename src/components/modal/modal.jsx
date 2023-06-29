import styles from './modal.module.css';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ children, showModal}) => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);
    
    const modalContent = showModal ? (
        <div className={styles.modal_container}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    ) : null;
    
    if (mounted) {
        return ReactDOM.createPortal(
        modalContent,
        document.getElementById("portal-root")
        );
    } else {
        return null;
    }
};

export default Modal;