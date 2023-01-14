import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;
    const onRemoveHandler = (id)=>{
        cartCtx.removeItem(id)
    }
    const onAddHandler=(item)=>{
        cartCtx.addItem(item)
    }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
          <CartItem id={item.id} name={item.name} amount={item.amount} price={item.price}
              onAdd={onAddHandler.bind(null,item)} onRemove={onRemoveHandler.bind(null,item.id)}></CartItem> 
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
        {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>close</button>
        {hasItems && <button className={classes.button}>order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
