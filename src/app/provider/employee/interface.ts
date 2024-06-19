import moment, { Moment } from "moment";

export interface Skill {
    name: string;
    yearsOfExperience: number;
    Rating: number;
}
export interface Address{
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
}
export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    dateOfBirth: string | null;
    address: Address;
    skills: Skill[];

}

export interface EmployeeAction {
    getAllEmployees: () => void;
    createEmployee: (employee: Employee) => void;
    updateEmployee: (employee: Employee) => void;
    deleteEmployee: (id: string) => void;
}

export interface EmployeeProviderProps {
    children: React.ReactNode;
}