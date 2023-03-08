import React from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CarrtItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You Currently Have No Items Added To Your Cart.
      <Link to="/" className={classes.link}>
        Start Adding Items!
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <div>
              {/* <Typography variant="h6">{item.name}</Typography> */}
              <CartItem
                item={item}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal: {cart.subtotal.formatted_with_code}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            color="secondary"
            variant="contained"
            type="button"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            color="primary"
            variant="contained"
            type="button"
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items)
    return (
      <Typography className={classes.title} variant="h5" gutterBottom>
        Loading...
      </Typography>
    );
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>

      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
