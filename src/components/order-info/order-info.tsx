import { FunctionComponent, useMemo } from 'react';
import { TFeedOrder, TIngredient } from '../../utils/types';
import styles from './order-info.module.css';
import { useAppSelector } from '../../utils/hooks';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderInfo = {
    order: TFeedOrder | undefined;
    fullPage: boolean
}

export const getStateText = (status: string) => {
    switch (status) {
        case 'done':
            return 'Выполнен';
        case 'created':
            return 'Создан';
        case 'pending':
            return 'Готовится';
        default:
            return status;
    }
}

const OrderInfo: FunctionComponent<TOrderInfo> = ({ order, fullPage = false }) => {
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients)

    const { bun, innerIngredients, sum, counter } = useMemo(() => {
        if (!ingredients || ingredients.length === 0 || !order?.ingredients || order.ingredients.length === 0) {
            return {
                bun: null,
                innerIngredients: [],
                sum: 0,
                counter: {} as { [name: string]: number }
            };
        }
        const counter: { [name: string]: number } = {}
        const currentIngredients = order?.ingredients.reduce<TIngredient[]>((prev: TIngredient[], curr: string) => {
            if (!counter[curr]) {
                counter[curr] = 1;
            } else {
                counter[curr]++;
            }
            if (counter[curr] === 1) {
                const ingredient = ingredients.find(i => i._id === curr) as TIngredient
                return [...prev, ingredient]
            } else {
                return prev
            }
        }, [])
        const bun = currentIngredients.find(i => i.type === 'bun');
        const innerIngredients = currentIngredients.filter(i => i?.type !== 'bun')
        const sum = innerIngredients.reduce((prev, curr: TIngredient) => prev + curr?.price * counter[curr?._id], (bun?.price || 0) * 2)

        return {
            bun,
            innerIngredients,
            sum,
            counter
        }
    }, [order?.ingredients, ingredients])
    console.log(counter)

    return (
        order ? <div className='ml-6 mr-6'>
            {fullPage && <div className={styles.title + ' text text_type_digits-medium mt-20'}>
                #{order.number}
            </div>}
            <div className='text text_type_main-medium mt-10'>
                {order.name}
            </div>
            <div className='text text_type_main-small mt-2'>
                <span className={order.status === 'done' ? styles.done : ''}>{getStateText(order.status)}</span>
            </div>
            <div className='text text_type_main-medium mt-10 mb-6'>
                Состав:
            </div>
            <div className={styles.ingredients_container}>
                {bun && <div className={styles.ingredient_container + ' mt-6 mr-6'}>
                    <div className={styles.flex_row}>
                        <div className={styles.ingredient_preview}>
                            <img src={bun.image_mobile} className={styles.image} alt={order.name} />
                        </div>
                        <div className='text text_type_main-default ml-4'>
                            {bun.name}
                        </div>
                    </div>
                    <div className={styles.flex_row}>
                        <div className='ext text_type_digits-default ml-4'>
                            2 x {bun.price}
                        </div>
                        <div className='ml-1'>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>}
                {innerIngredients && innerIngredients.map((ingredient, index) => <div className={styles.ingredient_container + ' mt-6 mr-6'} key={ingredient._id + '_' + index}>
                    <div className={styles.flex_row}>
                        <div className={styles.ingredient_preview}>
                            <img src={ingredient.image_mobile} className={styles.image} alt={order.name} />
                        </div>
                        <div className='text text_type_main-default ml-4'>
                            {ingredient.name}
                        </div>
                    </div>
                    <div className={styles.flex_row}>
                        <div className='ext text_type_digits-default ml-4'>
                            {counter[ingredient._id]} x {ingredient.price}
                        </div>
                        <div className='ml-1'>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>)}

            </div>
            <div className={styles.ingredient_container + ' mt-10 mb-4'}>
                <div className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(order?.createdAt)} />
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

        </div> : <div></div>
    )
}

export default OrderInfo;