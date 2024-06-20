import { IEmployeeContext, initialState } from "./context";
import { handleActions } from "redux-actions";
import { ActionTypes } from "./action";

export const employeeReducer = handleActions<IEmployeeContext, any>(
  {
    [ActionTypes.GET_ALL_EMPLOYEES]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: action.payload,
        };
      }
      return state;
    },
    [ActionTypes.GET_ALL_EMPLOYEES_FAILED]: (state) => {
      return state;
    },
    [ActionTypes.GET_ALL_EMPLOYEES_LOADING]: (state) => {
      return state;
    },
    [ActionTypes.CREATE_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employee: action.payload,
          employees: [...state.employees, action.payload],
        };
      }
      return state;
    },
    [ActionTypes.UPDATE_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: state.employees.map((employee) => {
            if (employee.id === action.payload.id) {
              return action.payload;
            }
            return employee;
          }),
        };
      }
      return state;
    },
    [ActionTypes.DELETE_EMPLOYEE]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employees: state.employees.filter((employee) => employee.id !== action.payload),
        };
      }
      return state;
    },
  },
  initialState
);
