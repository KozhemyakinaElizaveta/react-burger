import styles from "./modal.module.css";

export const ModalOverlay = ({ onClick }) => {
    return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;