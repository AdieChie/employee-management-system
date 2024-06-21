'use client'
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useEmployeeState, useEmployeeAction } from '../provider/employee';  
import EmployeeForm from '../components/employeeForm'; 
import { Employee } from '../provider/employee/interface';
import { DatePicker } from 'antd';

const Employees: React.FC = () => {
    const { employees, loading, error } = useEmployeeState();
    const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } = useEmployeeAction();
    const [showPopup, setShowPopup] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [searchQuery, setSearchQuery] = useState('');  
    const [filterDateOfBirth, setFilterDateOfBirth] = useState(''); 

    useEffect(() => {
        getAllEmployees();
    }, []);

    const handleNewEmployeeClick = () => {
        setCurrentEmployee({
            id: '',
            firstName: '',
            lastName: '',
            contactNumber: '',
            emailAddress: '',
            dateOfBirth: '',
            address: { streetAddress: '', city: '', postalCode: '', country: '' },
            skills: [{name: '', yearsOfExperience: 0, Rating: 0 }]
        });
        setShowPopup(true);
    };

    const handleEditEmployeeClick = (employee: Employee) => {
        setCurrentEmployee(employee);
        setShowPopup(true);
    };

    const handleSaveEmployee = async (employee: Employee) => {
        if (employee.id) {
            await updateEmployee(employee);
            getAllEmployees();
        } else {
            createEmployee(employee);
        }
        setShowPopup(false);
    };

    const handleDeleteEmployee = async (id: string) => {
        await deleteEmployee(id);
        getAllEmployees();  
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

   
    const filteredEmployees = employees.filter(employee => {
        const matchesSearchQuery = employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.contactNumber.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDateOfBirth = !filterDateOfBirth || employee.dateOfBirth === filterDateOfBirth;

        return matchesSearchQuery && matchesDateOfBirth;
    });

    return (
        <div className={styles.container}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Failed to load employees</p>
            ) : employees.length === 0 ? (
                <>
                    <div className={styles.container}>
                        <div className={styles.headerSection}>
                            <div className={styles.headerText}>
                                <h1 className={styles.header}>Employees</h1>
                                <p className={styles.noEmployees}>No employees</p>
                            </div>
                            <button onClick={handleNewEmployeeClick} className={styles.newEmployeeButton}>
                                New Employee
                            </button>
                        </div>
                        <div className={styles.illustration}>
                            <img src="./Icon.jpg" alt="Illustration" />
                            <p>There is nothing here</p>
                        </div>
                        <p className={styles.createEmployee}>
                            Create a new employee by clicking the New Employee button to get started
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.headerContainer}>
                        <div>
                        <h1 className={styles.header}>Employees</h1>
                        <p>There are {employees.length} employees</p>
                        </div>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className={styles.searchInput} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                            <input  
                                className={styles.filterInput} 
                                placeholder="Date of Birth"
                                value={filterDateOfBirth}
                                onChange={(e) => setFilterDateOfBirth(e.target.value)} 
                            />
                            <button className={styles.newEmployeeButton} onClick={handleNewEmployeeClick}>
                                New Employee
                            </button>
                    </div>
                    <div className={styles.employeeList}>
                        {filteredEmployees.map((employee, index) => (
                            <div key={index} className={styles.employeeCard}>
                                <span className={styles.employeeIndex}>{index + 1}</span>
                                <span className={styles.employeeDetail}>{employee.firstName}</span>
                                <span className={styles.employeeDetail}>{employee.lastName}</span>
                                <span className={styles.employeeDetail}>{employee.contactNumber}</span>
                                <button className={styles.editButton} onClick={() => handleEditEmployeeClick(employee)}>
                                    Edit
                                </button>
                                <button className={styles.deleteButton} onClick={() => handleDeleteEmployee(employee.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showPopup && currentEmployee && (
                <EmployeeForm
                    employee={currentEmployee}
                    onSave={handleSaveEmployee}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Employees;
