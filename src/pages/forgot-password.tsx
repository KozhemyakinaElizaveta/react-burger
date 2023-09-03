import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sendResetEmailThunk } from '../services/auth-thunk/auth-thunk';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getAuth } from '../services/store';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const dispatch = useAppDispatch()
    const { user, getUser } = useAppSelector(getAuth);
    const navigate = useNavigate()

    if (getUser) {
        return null;
    }
    if (user) {
        return <Navigate to="/" replace />
    }

    const redirectToResetPassword = () => {
        navigate('/reset-password')
    }

    const handleForgotPasswordSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!email) {
            return
        }
        dispatch(sendResetEmailThunk({ email, callback: redirectToResetPassword }))
    }


    return (
        <div className={styles.container + ' mt-20'}>
            <div className='text text_type_main-large'>Восстановление пароля</div>
            <form onSubmit={handleForgotPasswordSubmit}>
                <div className={styles.wrapper}>
                    <div className='mt-6'>
                        <Input
                            placeholder={'Укажите e-mail'}
                            type={'email'}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            size={'default'}
                        />
                    </div>
                    <div className='mt-6'>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                        >
                            Восстановить
                        </Button>
                    </div>
                </div>
            </form>
            <div className={styles.text_block + ' mt-20'}>
                <div className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</div>
                <div className={styles.link + ' ml-1 text text_type_main-small'}><Link className="no_style" to='/login'>Войти</Link></div>
            </div>
        </div>
    )
}