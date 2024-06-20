import { createContext } from 'react';
import { Employee, EmployeeAction, ViewEmployee } from './interface';

export interface IEmployeeContext {
    employees: Employee[];
    loading: boolean;
    error: boolean;
    employee: Employee | null;
    viewEmployee: ViewEmployee[];
} 

export const initialState: IEmployeeContext = {
    employees: [],
    loading: false,
    error: false,
    employee: null,
    viewEmployee:[],
}

export const EmployeeStateContext = createContext<IEmployeeContext>(initialState);
export const EmployeeActionContext = createContext<EmployeeAction>({
    getAllEmployees: () => {},
    createEmployee: (employee: Employee) => {},
    deleteEmployee: (id: string) => {},
    updateEmployee: (employee: Employee) => {},
});
