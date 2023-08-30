import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import { patchUserThunk } from '../services/auth-thunk/auth-thunk'
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getAuth } from '../services/store';


export function ProfileAccountPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isButtonsVisible, setIsButtonsVisible] = useState(false)
    const {user} = useAppSelector(getAuth)
    const dispatch = useAppDispatch()

    const handleSaveClick = () => {
        const dataObj: { name?: string, email?: string, password?: string } = {}
        if (name !== user?.name) {
            dataObj.name = name
        }
        if (email !== user?.email) {
            dataObj.email = email
        }
        if (password) {
            dataObj.password = password
        }
        dispatch(patchUserThunk(dataObj))
    }

    useEffect(() => {
        setIsButtonsVisible(name !== user?.name || email !== user?.email || password !== '')
    }, [user, name, email, password])

    const handleCancelClick = () => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setPassword('')
        }
    }

    useEffect(() => {
        if (user?.name)
            setName(user.name)
        if (user?.email)
            setEmail(user.email)
    }, [user])

    return (<div className='ml-30'>
        <div>
            <div>
                <Input
                    placeholder={'Имя'}
                    type={'text'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    size={'default'}
                    icon={'EditIcon'}
                />
            </div>
            <div className='mt-6'>
                <Input
                    placeholder={'Логин'}
                    type={'email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    size={'default'}
                    icon={'EditIcon'}
                />
            </div>
            <div className='mt-6'>
                <Input
                    placeholder={'Пароль'}
                    value={password}
                    type={'password'}
                    onChange={e => setPassword(e.target.value)}
                    icon={'EditIcon'}
                />
            </div>
            {isButtonsVisible && <div className={styles.buttons + ' mt-6'}>
                <div>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        onClick={handleSaveClick}>
                        Сохранить
                    </Button>
                </div>
                <div>
                    <Button
                        htmlType="reset"
                        type="secondary"
                        size="large"
                        onClick={handleCancelClick}>
                        Отменить
                    </Button>
                </div>
            </div>}
        </div>
    </div>)
}