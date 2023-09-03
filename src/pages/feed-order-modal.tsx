import Modal from '../components/modal/modal';
import OrderInfo from '../components/order-info/order-info';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';

export function FeedOrderModal() {
    const navigate = useNavigate()
    useEffect(() => {
        window.history.replaceState({}, document.title)
    }, [])
    const { id } = useParams()
    const orders = useAppSelector(store => store.wsFeedReducer.message.orders)
    const order = orders.find(o => o.number === Number(id))


    const onModalClose = () => {
        navigate(-1)
    }

    return (
        <Modal onClose={onModalClose} title={'#' + order?.number}>
            <OrderInfo order={order} fullPage={false} />
        </Modal>
    )
}