import { FunctionComponent } from "react";
import styles from "./modal.module.css";

type TModalOverlay = {
    onClick: () => void
}

export const ModalOverlay: FunctionComponent<TModalOverlay> = ({ onClick }) => {
    return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;