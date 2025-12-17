import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Wishlist from "./Wishlist";
import { WishlistProvider } from "./WishlistContext";


function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist/:id" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}


export default App;

