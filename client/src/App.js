import React from 'react';
import { TextField, Button, Typography } from '@mui/material'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';  
import { useFormik } from 'formik';
import * as Yup from 'yup';  
import axios from 'axios';
import Alert from '@mui/material/Alert';
import './App.css';

function App() {
  const [expiryDate, setExpiryDate] = React.useState();
  const [showToast, setShowToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  
  React.useEffect(() => { 
    !!showToast && setTimeout(() => setShowToast(false), 3000);
    !!showErrorToast && setTimeout(() => setShowErrorToast(false), 3000);
 }, [showToast, showErrorToast])

  const initialValues = { 
    creditCardNumber: Yup.number, 
    ccv: Yup.number, 
    cardHolderName: Yup.string, 
    expiryDate: expiryDate 
  };

  const validationSchema = Yup.object({
      creditCardNumber: Yup.number()
        .typeError('CCN must be a number')
        .required("Please provide CCN") 
        .test('len', 'Must be exactly 16 digits', val => val?.toString().length === 16 ),
      ccv: Yup.number()
        .typeError('CCV must be a number')
        .required("Please provide CCV") 
        .test('len', 'Must be exactly 3 digits', val => val?.toString().length === 3),
      cardHolderName: Yup.string('Enter your name')
        .max(30, 'Must be 30 characters or less')
        .min(3, 'Must be 3 characters or greater')
        .required('Required'),
      expiryDate: Yup.date(), 
   });
   
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {  
      const payment = {
        ccn: values.creditCardNumber.toString(), 
        ccv: values.ccv.toString(),
        name: values.cardHolderName,
        expiry: expiryDate,
      }

      makePayment(payment); 
    },
  });
  
  const makePayment = (payment) => { 
    axios.post(`http://localhost:5000/payments`, { payment })
      .then(res => {
        console.log(res);
        console.log(res.data);
         
        setShowToast(true); 
      }).catch(error => {
        setShowErrorToast(true);
      }); 
  }

  return ( 
    <div className="App"> 
          <form onSubmit={formik.handleSubmit}>
            <div style={{display: 'grid', gridGap: '10px'}}>
              <Typography variant='h4' align='center' style={{color: 'white'}}>Payment Gateway</Typography>
                <div className="Payment_Gateway">
                  <TextField
                    id = "creditCardNumber"
                    name = 'creditCardNumber'
                    label = "Credit Card Number"
                    type = "number"
                    required
                    {...formik.getFieldProps('creditCardNumber')}
                    value={formik.values.creditCardNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.creditCardNumber && Boolean(formik.errors.creditCardNumber)} 
                    helperText={formik.touched.creditCardNumber && formik.errors.creditCardNumber}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> 

                  <TextField
                    id="ccv"
                    name = 'ccv'
                    label="CCV"
                    type="number"
                    {...formik.getFieldProps('ccv')}
                    value={formik.values.ccv}
                    onChange={formik.handleChange}
                    error={formik.touched.ccv && Boolean(formik.errors.ccv)} 
                    helperText={formik.touched.ccv && formik.errors.ccv}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> 

                  <TextField
                    id="cardHolderName"
                    name = 'cardHolderName'
                    label="Card Holder Name" 
                    {...formik.getFieldProps('cardHolderName')}
                    value={formik.values.cardHolderName}
                    onChange={formik.handleChange}
                    error={formik.touched.cardHolderName && Boolean(formik.errors.cardHolderName)} 
                    helperText={formik.touched.cardHolderName && formik.errors.cardHolderName}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> 

                  <LocalizationProvider dateAdapter={AdapterDateFns}> 
                    <DatePicker
                      views={['year', 'month']}
                      label="Expiry Date" 
                      value={expiryDate}
                      onChange={(newValue) => {
                        setExpiryDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    /> 
                  </LocalizationProvider> 
                  
                  <Button variant="outlined" color="primary" type="submit">Save</Button>
                </div> 
            </div>   
        </form>  

        { showToast &&
          <Alert variant="filled" severity="success">
            Payment Done! Successfully
          </Alert>
        }
        
        { showErrorToast &&
          <Alert variant="filled" severity="error">
            Something went wrong!
          </Alert>
        }
    </div>
  );
}

export default App;
