import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal.jsx';
import { useState, useMemo} from "react";
import {OrderDetails} from '../order-details/order-details.jsx';
import ConstructorBun from './burger-constructor-bun';
import ConstructorIngredient from './burger-constructor-ingredient';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

function BurgerConstructor(props) {
    const [showModal, setShowModal] = useState(false);

    const { bun, ingredient } = useMemo(() => {
        return {
            bun: props.ingredients.find(item => item.type === 'bun'),
            ingredient: props.ingredients.filter(item => item.type !== 'bun'),
        };
    }, [props.ingredients]);

    return (
        <div className={styles.final}>
            <div className={styles.construct}>
                <ConstructorBun bun={bun} type='top'/>
                <div className={styles.ingredients}>
                {ingredient.map((element) => (
                    <ConstructorIngredient element={element} key={element._id}/>
                ))}
                </div>
                <ConstructorBun bun={bun} type='bottom'/>
            </div>
            <section className={`${styles.result} mt-10`}>
                <div className={`${styles.cost} mr-10`}>
                    <div className={`${styles.numbers} text text_type_digits-default mr-1`}>
                    666</div>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={() => setShowModal(true)} >
                Оформить заказ
                </Button>
                {showModal && <Modal onClose = {() => setShowModal(false)}>
                    <OrderDetails  onClose={() => setShowModal(false)} number='034536'/>
                </Modal>}
            </section>
        </div>
    );
}

export default BurgerConstructor;