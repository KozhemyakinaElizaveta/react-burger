import Modal from '../components/modal/modal'
import { useNavigate } from 'react-router-dom'
import IngredientDetails from '../components/ingredient-details/ingredient-details'

export function IngredientModal() {
    const navigate = useNavigate()

    const onModalClose = () => {
        navigate(-1)
    }

    return (
        <Modal onClose = {onModalClose} title = 'Детали ингредиента'>
            <IngredientDetails />
        </Modal>
    )
}