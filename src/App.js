import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentPage from './pages/PaymentPage';
import OrderPage from './pages/OrderPage';
import MyAccountPage from './pages/MyAccountPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/user/login' element={<LoginPage />} />
          <Route path='/user/register' element={<RegisterPage />} />
          <Route path='/user/profile' element={<MyAccountPage />} />
          <Route path='/cart/:id/:qty' element={<CartPage />} />
          <Route path='/cart/shipping_address' element={<ShippingAddressPage />} />
          <Route path='/cart/payment' element={<PaymentPage />} />
          <Route path='/order/add' element={<OrderPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
