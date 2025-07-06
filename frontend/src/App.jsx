import Home from './Home'
import Login from './Login'
import SalesOrder from './SalesOrder'
import StockEntry from './StockEntry'
import SupplierManagement from './SupplierManagement'
import ProductManagement from './ProductManagement'
import Signup from './Signup'
import About from './About'
import Contact from './Contact'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ProductManagement' element={<ProductManagement />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SalesOrder' element={<SalesOrder />} />
          <Route path='/StockEntry' element={<StockEntry />} />
          <Route path='/SupplierManagement' element={<SupplierManagement />} />
          <Route path= '/Signup' element={<Signup />} />
          <Route path= '/About' element={<About />} />
           <Route path= '/Contact' element={<Contact />} />
      
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App

