import styles from './order-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../images/done.png';
import PropTypes from 'prop-types';

export function OrderDetails({number, onClose}) {
    return(
        <>
        <div className={`${styles.button} mr-10 mt-15`}>
            <div className={styles.icon}>
                <CloseIcon type="primary" onClick={onClose}/>
            </div>
        </div>
        <div className={styles.main}>
            <span className={`${styles.number} text text_type_digits-large mt-10`}>{number}</span>
            <span className={`${styles.text} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</span>
            <img src={done} alt=''></img>
            <span className={`${styles.text} text text_type_main-default mt-15`}>Ваш заказ начали готовить</span>
            <span className={`${styles.text} text text_type_main-default text_color_inactive mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</span>
        </div>
        </>
    )
}
OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired
}

export default OrderDetails;