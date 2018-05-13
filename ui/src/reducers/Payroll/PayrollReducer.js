import { PayrollInitialState } from './../../actions/PayrollActions';
import { PayrollActionTypes } from './../../actions/PayrollActionTypes';


const PayrollReducer = (state=PayrollInitialState, action) => {
  switch (action.type) {
    case PayrollActionTypes.FETCH_PAYROLL_PENDING: {
      state = {...state, fetching: true};
      break;
    }
    case PayrollActionTypes.FETCH_PAYROLL_FULFILLED: {
      state = {...state, payrollData: action.payload, fetching: false};
      break;
    }
    case PayrollActionTypes.UPLOAD_PAYROLL_PENDING: {
      state = {...state, uploading: true};
      break;
    }
    case PayrollActionTypes.UPLOAD_PAYROLL_FULFILLED: {
      state = {...state, uploadResponse: action.payload, uploading: false, responseTime: action.payload.data.time};
      break;
    }
    default: {
      break;
    }
  }

  return state;
};


export {
    PayrollReducer
}