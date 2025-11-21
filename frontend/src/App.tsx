import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CardForm from "./pages/CardForm"

function App() {
    return (
        <div className="bg-white min-h-screen w-full">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-card" element={<CardForm />} />
            </Routes>
        </div>
    )
}

export default App