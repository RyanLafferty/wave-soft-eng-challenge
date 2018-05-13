import { createStore } from 'redux';
import { Middleware } from './Middleware';
import { PayrollReducer } from './Payroll/PayrollReducer';


/*const reducers = combineReducers({
    payroll: PayrollReducer, 
    ...
});*/

const store = createStore(PayrollReducer, Middleware);

export {
    store as PayrollStore
}