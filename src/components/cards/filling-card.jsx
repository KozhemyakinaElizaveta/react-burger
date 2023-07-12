import styles from "./card.module.css";

export const FillingCard = () => {
    return (
        <div className={styles.card_fill}>
            <p className="text text_type_main-medium text_color_inactive">
                Собери начинку
            </p>
        </div>
    );
};