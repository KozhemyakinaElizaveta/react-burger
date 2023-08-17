import styles from "./card.module.css";
import PropTypes from 'prop-types';

export const BunCard = ({ style }) => {
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

BunCard.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.object
    ]).isRequired,
};