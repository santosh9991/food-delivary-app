import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [showCheckout,setShowCheckout] = useState(false)
    const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;
    const onRemoveHandler = (id)=>{
        cartCtx.removeItem(id)
    }
    const onAddHandler=(item)=>{
        cartCtx.addItem(item)
    }
    const orderHandler=()=>{
        setShowCheckout(true)
    }
    const submitOrderHandler=(userData)=>{
        setIsSubmitting(true)
        fetch(process.env.backend,{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart()
    }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
          <CartItem id={item.id} name={item.name} amount={item.amount} price={item.price}
              onAdd={onAddHandler.bind(null,item)} onRemove={onRemoveHandler.bind(null,item.id)}></CartItem> 
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>order</button>}
      </div>
  )
  const cartModalContent= <Fragment>
     {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!showCheckout && modalActions}
  </Fragment>
  const isSubmittingModalContant =<p>Sending order data</p>
  const didSubmitModalContant = <Fragment>
    <p>Order submitted successfully </p>
    <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>close</button>
      </div>
  </Fragment>

  return (
    <Modal onClose={props.onClose}>
       {!isSubmitting && !didSubmit && cartModalContent}
       {isSubmitting && isSubmittingModalContant}
       {!isSubmitting && didSubmit && didSubmitModalContant}
    </Modal>
  );
};
export default Cart;
