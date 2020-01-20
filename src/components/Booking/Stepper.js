import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { PayPalButton } from 'react-paypal-button-v2';
import StripeCheckout from 'react-stripe-checkout';
import {
  showErrorMessage,
  showSuccessMessage,
  closeMessage,
} from '../../state/actions/notificationActions';
import {
  handleStripePayment,
  saveDate,
  bookAppointment,
} from '../../state/actions/bookingActions';
import Notification from '../Notifications/Notification';

import Select from '../Inputs/SelectInfo';
import DatePicker from './DatePicker';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select Topic', 'Select Time and Date', 'Select  Payment'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select Topic...';
    case 1:
      return 'Select Time and Date';
    case 2:
      return 'Select  Payment';
    default:
      return 'Unknown stepIndex';
  }
}

const AppointmentStepper = props => {
  const {
    date,
    coach,
    closeMessage,
    success,
    error,
    showErrorMessage,
    showSuccessMessage,
    handleStripePayment,
    saveDate,
    select,
    bookAppointment,
    user,
  } = props;
  console.log(props);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === 0 ? (
          <div>
            <Select />
          </div>
        ) : activeStep === 1 ? (
          <div>
            <DatePicker date={date} saveDate={saveDate} />
          </div>
        ) : (
          <div>
            <StripeCheckout
              stripeKey='pk_test_Grqfk8uqKNCJYpAQS2t89UB700wHJklrMa' // this key is only for testing we
              // will add later our real key to the env file
              token={token =>
                handleStripePayment(
                  token,
                  `${coach.first_name} ${coach.last_name}`,
                  coach.hourly_rate,
                  showSuccessMessage,
                  showErrorMessage,
                  bookAppointment,
                  coach,
                  user,
                  date,
                  select.topic_id,
                  select.length_id,
                  props,
                )
              }
              amount={
                select.length_id === 2
                  ? coach.hourly_rate * 100
                  : coach.hourly_rate * 100 * 0.5
              }
              name={'name'}
              billingAddress
              shippingAddress
            />
            <PayPalButton
              amount={
                select.length_id === 2
                  ? coach.hourly_rate
                  : coach.hourly_rate * 0.5
              }
              onSuccess={(details, data) => {
                showSuccessMessage();
                bookAppointment(
                  coach,
                  user,
                  date,
                  select.topic_id,
                  select.length_id,
                  props,
                );
              }}
              catchError={err => showErrorMessage()}
              options={{
                clientId:
                  'ARVkifyBTBn77NG4ftQSS7eFFxTjcG0ghgVPQCZGyUQufKrNBaTOXSWEKpvDPa3XQi96rSIKEHioCFdP',
              }}
            />
          </div>
        )}
      </div>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    coach: state.bookingReducer.coach,
    select: state.bookingReducer.select,
    date: state.bookingReducer.date,
    success: state.notificationsReducer.success,
    error: state.notificationsReducer.error,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, {
  handleStripePayment,
  showErrorMessage,
  showSuccessMessage,
  closeMessage,
  saveDate,
  bookAppointment,
})(AppointmentStepper);
