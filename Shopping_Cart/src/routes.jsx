import { Navigate, Route, Routes } from 'react-router-dom';
import Items from '../pages/Items';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import { Tabs } from './App';

const TabRoutes = () => (
   <>
      <Routes>
         <Route path="/" element={<Tabs />}>
            <Route index element={<Navigate to={'items'} replace />} />
            <Route path="items" element={<Items />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
         </Route>
      </Routes>
   </>
);

export default TabRoutes;
