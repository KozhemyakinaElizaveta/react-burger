import styles from './order-item.module.css';
import { FunctionComponent, useMemo } from 'react';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/hooks';
import { TIngredient } from '../../utils/types';
import { TFeedOrder } from '../../utils/types';
import { getStateText } from '../order-info/order-info';

type TOrderItem = {
    order: TFeedOrder;
    clickHandler: Function;
}
const OrderItem: FunctionComponent<TOrderItem> = ({ order, clickHandler }) => {

    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients)
    const currentIngredients = useMemo(() => {
        if (!ingredients || ingredients.length === 0 || !order?.ingredients || order.ingredients.length === 0) {
            return [];
        }
        return order.ingredients.map(id => ingredients.find(i => i._id === id) as TIngredient)
    }, [order.ingredients, ingredients])

    const { images, sum, counter } = useMemo(() => {
        let _sum = 0;
        if (currentIngredients && currentIngredients.length > 0) {
            const bun = currentIngredients.find(i => i?.type === 'bun')
            const innerIngredients = currentIngredients.filter(i => i?.type !== 'bun')
            _sum = innerIngredients.reduce((prev, curr: TIngredient) => prev + curr?.price, (bun?.price || 0) * 2)
        }
        return {
            images: currentIngredients.map(i => i?.image_mobile),
            sum: _sum,
            counter: currentIngredients.length - 6
        }
    }, [currentIngredients])

    return (
        <div className={styles.wrap + ' p-6'} onClick={() => clickHandler(order.number)}>
            <div className={styles.flex_container}>
                <div className='text text_type_digits-default'>
                    #{order.number}
                </div>
                <div className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(order?.createdAt)} />
                </div>
            </div>
            <div className='text text_type_main-default mt-6'>
                {order.name}
            </div>
            <div className='text text_type_main-small mt-2'>
                <span className={order.status === 'done' ? styles.done : ''}>{getStateText(order.status)}</span>
            </div>
            <div className={styles.image_price_container + ' mt-6'}>
                <div className={styles.images_container}>
                    {
                        images.map((image, index) => index <= 5 && <div className={styles.ingredient_preview + ' ' + styles["image-" + (index + 1)]} key={index}>
                            <img src={image} className={styles.image} alt={order.name} />
                            {index > 5 && <div className={styles.counter + ' text text_type_digits-small'}>+{counter}</div>}
                        </div>)
                    }
                </div>
                <div className={styles.total_price}>
                    <div className='text text_type_digits-default'>
                        {sum > 0 && sum}
                    </div>
                    <div className='ml-1'>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderItem;