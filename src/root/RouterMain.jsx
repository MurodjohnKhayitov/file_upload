import { Navigate, Route, Routes } from 'react-router-dom'
 import SignIn from '../components/athen/SignIn/SignIn'
 import SignUp from '../components/athen/SignUp/SignUp'
 import ForgetPassword from '../components/athen/forgotPwd/ForgetPassword'
import Cabinet from '../components/profile/Cabinet'
  

function RouterMain() {
    return (
        <>
            <Routes  >
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cabinet" element={<Cabinet />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />


            </Routes>

        </>
    )
}

export default RouterMain
