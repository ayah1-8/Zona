import React, { useState } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import useStyles from './styles.js';
import AddressForm from '../AddressForm.jsx';
import PaymentForm from '../PaymentForm.jsx';
const steps = ['Shipping Adress', 'Payment Details'];

//////////////////////////////////////////////////////////////////
const Checkout = () => {
  const [activeState, setActiveState] = useState(0);
  const classes = useStyles();

  const Form = () => (activeState === 0 ? <AddressForm /> : <PaymentForm />);

  const Confirmation = () => <div>Confirm</div>;
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeState} className={classes.stepper}>
            {steps.map((step, idx) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeState === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
