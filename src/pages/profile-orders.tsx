import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { useEffect } from 'react';
import { wsOrderConnectionStart, wsOrderConnectionClose } from '../services/actions/socket-actions';
import OrdersList from '../components/orders-list/orders-list';
import { useNavigate, useLocation } from "react-router-dom";

export function ProfileOrdersPage() {
    const dispatch = useAppDispatch()
    const { orders } = useAppSelector(store => store.wsOrdersReducer.message)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        dispatch(wsOrderConnectionStart())
        return () => {
            dispatch(wsOrderConnectionClose())
        }
    }, [dispatch])


    const orderOnClick = (id: number) => {
        navigate(`/profile/orders/${id}`, { state: { background: location } })
    }

    return (
        <div className='ml-15 mt-10'>
            <OrdersList orders={orders} clickHandler={orderOnClick} />
        </div>
    )
}