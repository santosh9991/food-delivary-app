import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props)=>{
          return <Fragment>
                    <header className={classes.header}>
                              <h2>Delight Meals</h2>
                              <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
                    </header>
                    <div className={classes["main-image"]}>
                              <img src={mealsImage} alt="Delicious meals"/>
                    </div>
          </Fragment>
}
export default Header;