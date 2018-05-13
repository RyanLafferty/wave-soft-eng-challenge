import axios from 'axios';
import { PayrollActionTypes } from './PayrollActionTypes';


const initial_state = {
  fetching: false,
  uploading: false,
  payrollData: [],
  uploadResponse: {},
  responseTime: '',
};

// Switch port to 8080 for deployment or add entry to ui server
function fetchPayrollData() {
  let url = 'http://localhost:3000/payment/all/';
    
  return {
    type: PayrollActionTypes.FETCH_PAYROLL,
    payload: axios.get(url)
  }
}

function uploadPayrollData(data) {
  let url = 'http://localhost:3000/record/upload/';

  console.log(data);
    
  if (data) {
    return {
      type: PayrollActionTypes.UPLOAD_PAYROLL,
      payload: axios.post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }

    return undefined;
}

export {
  initial_state as PayrollInitialState,
  fetchPayrollData,
  uploadPayrollData,
}