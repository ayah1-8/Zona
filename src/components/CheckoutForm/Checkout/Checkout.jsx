import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import useStyles from './styles.js';
import AddressForm from '../AddressForm.jsx';
import PaymentForm from '../PaymentForm.jsx';
import { commerce } from '../../../lib/commerce.js';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Shipping Adress', 'Payment Details'];
//////////////////////////////////////////////////////////////////
const Checkout = ({ cart, order, onCaptureCheckout, error, refreshCart }) => {
  const [activeState, setActiveState] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        navigate('/');
      }
    };
    generateToken();
  }, [cart, navigate]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Form = () =>
    activeState === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} test={test} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
        refreshCart={refreshCart}
      /> // pass shpping data recieved from addressform onto payment form
    );

  const nextStep = () => {
    setActiveState((prevActiveStep) => prevActiveStep + 1);
  };
  const backStep = () => {
    setActiveState((prevActiveStep) => prevActiveStep - 1);
  };
  const next = (data) => {
    setIsFinished(true);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {}, 2000);
  };

  const Confirmation = order.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname}
          {order.customer.lastname}!
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase,</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
  return (
    <>
      <CssBaseline />

      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeState} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeState === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
