import { createContext } from 'react';
import { Employee, EmployeeAction } from './interface';

export interface IEmployeeContext {
    employees: Employee[];
    loading: boolean;
    error: boolean;
    employee: Employee | null;
} 

export const initialState: IEmployeeContext = {
    employees: [],
    loading: false,
    error: false,
    employee: null,
}

export const EmployeeStateContext = createContext<IEmployeeContext>(initialState);
export const EmployeeActionContext = createContext<EmployeeAction>({
    getAllEmployees: () => {},
    createEmployee: (employee: Employee) => {},
    deleteEmployee: (id: string) => {},
    updateEmployee: (employee: Employee) => {},
});
