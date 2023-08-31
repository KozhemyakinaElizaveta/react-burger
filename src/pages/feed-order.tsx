import OrderInfo from '../components/order-info/order-info'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { useEffect, useMemo } from 'react'
import { wsFeedConnectionStart, wsFeedConnectionClose } from '../services/actions/socket-actions'

export function FeedOrderPage() {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const orders = useAppSelector(store => store.wsFeedReducer.message.orders)
    useEffect(() => {
        dispatch(wsFeedConnectionStart())
        return () => {
            dispatch(wsFeedConnectionClose())
        }
    }, [dispatch])

    const order = useMemo(() => {
        return orders.find(o => o.number === Number(id))
    }, [orders, id])

    return (
        <OrderInfo order={order} fullPage={true} />
    )
}