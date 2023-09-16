import styles from './modal.module.css';
import {PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from './modal-overlay';
import {ESC_KEYCODE} from '../../utils/const';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("portal-root") as Element;

interface ModalProps {
    title: string;
    onClose: () => void;
}

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

type T1 = MakeOptional<ModalProps, 'title'>;

export const Modal: React.FC<PropsWithChildren<T1>> = ({ children, onClose, title}) => {
    const closeModal = () => {
        onClose();
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.keyCode === ESC_KEYCODE && onClose()
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
                <div className={`${styles.button} mr-10 mt-10 ml-10` } >
                    {title &&<h2 className={`${styles.text} text text_type_main-large`}>{title}</h2>}
                    <div className={styles.icon}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    </>,
    modalRoot
    );
};

export default Modal;