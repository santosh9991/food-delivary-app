import {  useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/cartProvider";
function App() {
  const [cartIsShown,setCartIsShown] = useState(false);
  const showCartHandler = ()=>{
    console.log("show btn");
    setCartIsShown(true)
  }
  const hideCartHandler = ()=>{
    setCartIsShown(false)
  }
  return (
    <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
        <Header onShowCart={showCartHandler}></Header>
        <main>
          <Meals></Meals>
        </main>
    </CartProvider>


  );
}

export default App;
