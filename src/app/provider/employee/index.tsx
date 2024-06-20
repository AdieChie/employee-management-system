'use client'

import React, { useContext, useReducer } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { EmployeeActionContext, EmployeeStateContext, initialState } from './context';
import { employeeReducer } from './reducer';
import {
    getAllEmployeesAction,
    createEmployeeAction,
    updateEmployeeAction,
    deleteEmployeeAction,
    getAllEmployeesLoadingAction,
    getAllEmployeesFailedAction
} from './action';
import { EmployeeProviderProps, Employee } from './interface';

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(employeeReducer, initialState);

    const getAllEmployees = async () => {
        try {
            dispatch(getAllEmployeesLoadingAction());
            const response = await axios.get("https://localhost:44311/api/services/app/Employee/GetEmployees");
            dispatch(getAllEmployeesAction(response.data.result));
            message.success("All the Employees");
        } catch (error) {
            dispatch(getAllEmployeesFailedAction());
            message.error("Failed to fetch employees");
        }
    };

    const createEmployee = async (employee: Employee) => {
        try {
            const response = await axios.post("https://localhost:44311/api/services/app/Employee/Create", employee);
            dispatch(createEmployeeAction(response.data.result));
            message.success("Employee successfully created!");
        } catch (error) {
            message.error("Failed to create employee");
        }
    };

    const updateEmployee = async (employee: Employee) => {
        try {
            const response = await axios.put("https://localhost:44311/api/services/app/Employee/UpdateEmployee", employee);
            dispatch(updateEmployeeAction());
            message.success("Employee successfully updated!");
        } catch (error) {
            message.error("Failed to update employee");
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            await axios.delete(`https://localhost:44311/api/services/app/Employee/DeleteEmployee?id=${id}`);
            dispatch(deleteEmployeeAction(id));
            message.success("Employee successfully deleted!");
        } catch (error) {
            message.error("Failed to delete employee");
        }
    };

    return (
        <EmployeeStateContext.Provider value={state}>
            <EmployeeActionContext.Provider value={{ getAllEmployees, createEmployee,updateEmployee, deleteEmployee}}>
                {children}
            </EmployeeActionContext.Provider>
        </EmployeeStateContext.Provider>
    );
}

const useEmployeeState = () => {
    const context = useContext(EmployeeStateContext);
    if (!context) {
        throw new Error('useEmployeeState must be used within an EmployeeProvider');
    }
    return context;
}

const useEmployeeAction = () => {
    const context = useContext(EmployeeActionContext);
    if (!context) {
        throw new Error('useEmployeeAction must be used within an EmployeeProvider');
    }
    return context;
}

export { useEmployeeAction, useEmployeeState, EmployeeProvider }
