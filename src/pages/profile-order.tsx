import OrderInfo from '../components/order-info/order-info';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { useEffect, useMemo } from 'react';
import { wsOrderConnectionStart, wsOrderConnectionClose } from '../services/actions/socket-actions';

export function ProfileOrderPage() {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const orders = useAppSelector(store => store.wsOrdersReducer.message.orders)
    useEffect(() => {

        dispatch(wsOrderConnectionStart())
        return () => {
            dispatch(wsOrderConnectionClose())
        }
    }, [dispatch])

    const order = useMemo(() => {
        return orders.find(o => o.number === Number(id))
    }, [orders, id])

    return (
        <OrderInfo order={order} fullPage={true} />
    )
}