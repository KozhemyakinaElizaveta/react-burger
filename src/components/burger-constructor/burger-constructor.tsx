import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import {useMemo} from "react";
import { useDrop } from "react-dnd";
import { BunCard } from '../cards/buns-card';
import { IngredientsCard } from '../cards/igredients-card';
import { ProgressBar } from 'react-loader-spinner'
import {
    INGREDIENT_CARD,
    ADD_BUN_COUNTER,
    ADD_INGREDIENT_COUNTER,
} from "../../services/actions/ingredients-action";
import { ADD_BUN } from "../../services/actions/constructor-action";
import { createOrder } from "../../services/actions/order-details-action";
import { addIngredient } from "../../services/actions/constructor-action";
import Modal from '../modal/modal';
import { CLOSE_ORDER_DETAILS_MODAL } from "../../services/actions/order-details-action";
import { OrderDetails } from "../order-details/order-details";
import { useNavigate } from 'react-router-dom';
import { addReturnUrl } from '../../services/actions/auth-action';
import { TIngredient } from '../../utils/types';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { getAuth, getOrderDetails, getOpenModal, getConstructorIngredients, getConstructor } from '../../services/store'

function BurgerConstructor() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { user } = useAppSelector(getAuth);

    const orderDetailsModal = useAppSelector(getOpenModal);

    const REQUEST = useAppSelector(getOrderDetails);

    function closeOrderDetailsModal() {
        dispatch({ type: CLOSE_ORDER_DETAILS_MODAL });
    }

    const ingredients = useAppSelector(getConstructorIngredients);

    const { bunIngredient } = useAppSelector(getConstructor);

    const Top = "top";

    const orderAmount = useMemo(() => {
        return (
            ingredients.reduce((acc: number, cur: TIngredient) => {
            if (cur.price) {
                return acc + cur.price;
            }
            return acc;
          }, 0) + (bunIngredient ? bunIngredient.price * 2 : 0)
        );
    }, [ingredients, bunIngredient]);

    const [, dropTargetRef] = useDrop({
        accept: INGREDIENT_CARD,
        drop(ingredient: TIngredient) {
            handleDrop(ingredient);
        },
    });
    
    function handleDrop(ingredient: TIngredient) {
        const { _id, type } = ingredient;
        switch (type) {
        case "bun": {
            dispatch({
                type: ADD_BUN_COUNTER,
                _id: _id,
            });
            dispatch({
                type: ADD_BUN,
                bunIngredient: ingredient,
            });
            break;
        }
        default: {
            dispatch({
                type: ADD_INGREDIENT_COUNTER,
                _id: _id,
            });
            dispatch(addIngredient(ingredient));
            break;
            }
        }
    }
    
    function handlePlaceOrder() {
        if (!user) {
            dispatch(addReturnUrl('/'))
            navigate('/login')
            return;
        }
        const orderIngredientIds = [
            bunIngredient._id,
            ...ingredients.map((ingredient: TIngredient) => ingredient._id),
            bunIngredient._id,
        ];
        dispatch(createOrder(orderIngredientIds));
    }

    return (
        <div className={styles.final} ref={dropTargetRef}>
            <div className={styles.construct}>
                {bunIngredient && (
                    <div className={`${styles.element_bun} ml-8` + ' drag_target'}>
                        <ConstructorElement 
                        text={`${bunIngredient.name} (верх)`}
                        price={bunIngredient.price}
                        thumbnail={bunIngredient.image} 
                        type='top' 
                        isLocked={true}
                        />
                    </div>
                )}
                {!bunIngredient && <BunCard style={Top} />}
                <div className={styles.ingredients}>
                    <IngredientsCard ingredients={ingredients} />
                </div>
                {bunIngredient && (
                    <div className={`${styles.element_bun} ml-8`}>
                        <ConstructorElement 
                        isLocked={true}
                        text={`${bunIngredient.name} (низ)`}
                        price={bunIngredient.price}
                        thumbnail={bunIngredient.image}
                        type='bottom'
                        />
                    </div>
                )}
                {!bunIngredient && <BunCard style={!Top} />}
            </div>
            <section className={`${styles.result} mt-10`}>
                <div className={`${styles.cost} mr-4`}>
                    <p className="text text_type_digits-medium mr-1">{orderAmount}</p>
                    <CurrencyIcon type="primary" />
                </div>
                {REQUEST ? <ProgressBar /> :
                    <div className='order_button'>
                        <Button disabled={!bunIngredient} htmlType="button" type="primary" size="medium" onClick={handlePlaceOrder} >
                        Оформить заказ
                        </Button>
                    </div>
                }
            </section>
            {orderDetailsModal && <Modal onClose={closeOrderDetailsModal}>
                <OrderDetails />
            </Modal>}
        </div>
    );
}

export default BurgerConstructor;