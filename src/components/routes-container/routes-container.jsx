import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HomePage, SigninPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, ProfileOrdersPage, ProfileAccountPage, IngredientModal, NotFound404, OrdersFeedPage } from '../../pages'
import { useSelector, useDispatch } from 'react-redux'
import { addReturnUrl } from '../../services/actions/auth-action.jsx'
import { useEffect, useState } from 'react'

function ProtectedRouteElement({ element }) {
    const { user, getUser } = useSelector(store => store.authReducer);
    const [userNotLoaded, setUserNotLoaded] = useState(true)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addReturnUrl(location.pathname))
        setUserNotLoaded(false)
    }, [])

    if (userNotLoaded || getUser) {
        return null;
    } else {
        return user ? element : <Navigate to="/sign-in" replace />;
    }
}

export default function RoutesContainer() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path='/orders-feed' element={<OrdersFeedPage />} />
                <Route path="/sign-in" element={<SigninPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
                    <Route path="" element={<ProfileAccountPage />} />
                    <Route path="orders" element={<ProfileOrdersPage />} />
                </Route>
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
            {background && <Routes>
                <Route path="ingredients/:id" element={<IngredientModal />} />
            </Routes>}

        </>
    )
}