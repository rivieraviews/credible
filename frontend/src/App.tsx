import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}
 
export default App