import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Customer_page from './Pages/Customer_page'
import Admin_page from './Pages/Admin_page'
import Login_page from './Pages/Login_page'
import No_Page from './Pages/No_Page'
import useAuthStore from './lib/useAuthStore'

function App() {

  const {isAuthenticated} = useAuthStore();

 
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({children}) => {
    if(!isAuthenticated){
      return <Navigate to="/" replace/>
    }

    return children
  }

  return (
    <Routes>
      <Route  path='/' element={<Customer_page/>}/>
      <Route path='/admin' element={<ProtectedRoute>
        <Admin_page/>
      </ProtectedRoute>}/>
      <Route path='/login' element={<Login_page/>}/>
      <Route path='*' element={<No_Page/>}/>
    </Routes>
  )
}

export default App
