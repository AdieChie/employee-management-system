import { createAction } from "redux-actions";
import { Employee} from "./interface";

export enum ActionTypes {
    GET_ALL_EMPLOYEES_LOADING = "GET_ALL_EMPLOYEES_LOADING",
    GET_ALL_EMPLOYEES = "GET_ALL_EMPLOYEES",
    GET_ALL_EMPLOYEES_FAILED = "GET_ALL_EMPLOYEES_FAILED",
    CREATE_EMPLOYEE = "CREATE_EMPLOYEE",
    UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE",
    DELETE_EMPLOYEE = "DELETE_EMPLOYEE",
}

export const getAllEmployeesLoadingAction = createAction(ActionTypes.GET_ALL_EMPLOYEES_LOADING);
export const getAllEmployeesAction = createAction<Employee[]>(ActionTypes.GET_ALL_EMPLOYEES);
export const getAllEmployeesFailedAction = createAction(ActionTypes.GET_ALL_EMPLOYEES_FAILED);
export const createEmployeeAction = createAction(ActionTypes.CREATE_EMPLOYEE);
export const updateEmployeeAction = createAction(ActionTypes.UPDATE_EMPLOYEE);
export const deleteEmployeeAction = createAction(ActionTypes.DELETE_EMPLOYEE);
