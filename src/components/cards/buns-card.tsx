import { FunctionComponent } from "react";
import styles from "./card.module.css";

type TBun = {
    style: string | boolean | object
} 

export const BunCard: FunctionComponent<TBun> = ({ style }) => {
    return (
        
        <div
        className={`${styles.card} ${
            style === "top" ? styles.card_top : styles.card_bottom
        } ml-8`}
        >
        <p className="text text_type_main-medium">Выбери булку</p>
        </div>
    );
};