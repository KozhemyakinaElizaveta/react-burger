import { FunctionComponent } from 'react';
import OrderItem from '../order-item/order-item';
import styles from './orders-list.module.css';
import { TFeedOrder } from '../../utils/types';

type TOrdersList = {
    orders: TFeedOrder[];
    clickHandler: Function;
}

const OrdersList: FunctionComponent<TOrdersList> = ({ orders, clickHandler }) => {
    return (
        <div className={styles.list}>
            {orders && orders.map(order =>
                <div className='mt-4 mr-2' key={order._id}>
                    <OrderItem order={order} clickHandler={clickHandler} />
                </div>
            )}
        </div>
    )
}

export default OrdersList;