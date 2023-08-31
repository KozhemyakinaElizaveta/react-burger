import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { useEffect, useMemo } from 'react';
import { wsFeedConnectionStart, wsFeedConnectionClose } from '../services/actions/socket-actions';
import OrdersList from '../components/orders-list/orders-list';
import styles from './feed.module.css';
import { useNavigate, useLocation } from "react-router-dom";

export function FeedPage() {
    const dispatch = useAppDispatch()
    const { orders, total, totalToday } = useAppSelector(store => store.wsFeedReducer.message)
    const navigate = useNavigate();
    const location = useLocation()

    const sliceArray = (orderIds: number[]) => {
        const size = 10;
        let arrayOfArrays = [];
        for (let i = 0; i < orderIds.length; i += size) {
            arrayOfArrays.push(orderIds.slice(i, i + size));
        }
        return arrayOfArrays;
    }

    const { doneIds, pendingIds } = useMemo(() => {
        const doneOrderIds = orders.filter(o => o.status === 'done').map(o => o.number);
        const pendingOrderIds = orders.filter(o => o.status === 'pending').map(o => o.number);
        return {
            doneIds: sliceArray(doneOrderIds),
            pendingIds: sliceArray(pendingOrderIds),
        };
    }, [orders])

    const orderOnClick = (id: number) => {
        navigate(`/feed/${id}`, { state: { background: location } })
    }

    useEffect(() => {
        dispatch(wsFeedConnectionStart())
        return () => {
            dispatch(wsFeedConnectionClose())
        }
    }, [dispatch])
    return (
        <div className={styles.all}>
            <div className={styles.wrapper + ' mt-15'}>
                <div>
                    <div className='text text_type_main-large mb-4'>Лента заказов</div>
                    <OrdersList orders={orders} clickHandler={orderOnClick} />
                </div>
                <div>
                    <div className={styles.stat_container}>
                        <div className='mr-9'>
                            <div className='text text_type_main-medium mb-6'>Готовы:</div>
                            <div className={styles.ids_container}>
                                {doneIds && doneIds.map((a, index) =>
                                    <div key={'done_' + index}>
                                        {a.map(id =>
                                            <div className={styles.done_id + ' mt-2 mr-3 text text_type_digits-default'} key={id}>{id}</div>)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className='text text_type_main-medium  mb-6'>В работе:</div>
                            <div className={styles.ids_container}>
                                {pendingIds && pendingIds.map((a, index) =>
                                    <div key={'work_' + index}>
                                        {a.map(id =>
                                            <div className=' mt-2 mr-3 text text_type_digits-default' key={id}>{id}</div>)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {total && totalToday ? <div>
                        <div className='text text_type_main-medium  mt-15'>Выполнено за всё время:</div>
                        <div className='text text_type_digits-large'>{total}</div>
                        <div className='text text_type_main-medium  mt-15'>Выполнено за сегодня:</div>
                        <div className='text text_type_digits-large'>{totalToday}</div>
                    </div> : <div></div>}
                </div>
            </div>
        </div>
    )
}