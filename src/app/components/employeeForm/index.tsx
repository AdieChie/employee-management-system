import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Employee, Skill } from '../../provider/employee/interface';
import styles from './styles.module.css';

const { Option } = Select;

interface EmployeeFormProps {
    employee: Employee;
    onSave: (employee: Employee) => void;
    onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
    const initialEmployeeState: Employee = {
        ...employee,
        address: employee.address || {
            streetAddress: '',
            city: '',
            postalCode: '',
            country: '',
        },
        skills: employee.skills || [],
    };

    const [formState, setFormState] = useState<Employee>(initialEmployeeState);

    useEffect(() => {
        setFormState({
            ...employee,
            address: employee.address || {
                streetAddress: '',
                city: '',
                postalCode: '',
                country: '',
            },
            skills: employee.skills || [],
        });
    }, [employee]);

    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormState(allValues);
    };

    const handleAddSkill = () => {
        setFormState(prevState => ({
            ...prevState,
            skills: [...prevState.skills, { id:'', name: '', yearsOfExperience: 0, Rating: 0 }],
        }));
    };

    const handleRemoveSkill = (index: number) => {
        const updatedSkills = formState.skills.filter((_, i) => i !== index);
        setFormState(prevState => ({
            ...prevState,
            skills: updatedSkills,
        }));
    };

    const handleSubmit = () => {
        onSave(formState);
    };

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h2>{formState.id ? 'Edit Employee' : 'New Employee'}</h2>
                <Form
                    layout="vertical"
                    initialValues={formState}
                    onValuesChange={handleFormChange}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="id"
                        initialValue={formState.id}
                        style={{ display: 'none' }}
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    <h3>Basic Info</h3>
                    <div className={styles.formRow}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter the first name' }]}
                            className={styles.formGroup}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter the last name' }]}
                            className={styles.formGroup}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Contact Number"
                        name="contactNumber"
                        rules={[{ required: true, message: 'Please enter the contact number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email Address"
                        name="emailAddress"
                        rules={[{ required: true, message: 'Please enter the email address' }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Date of Birth"
                        name="dateOfBirth"
                        rules={[{ required: true, message: 'Please select the date of birth' }]}
                    >
                        <Input type="date"/>
                    </Form.Item>
                    <h3>Address Info</h3>
                    <Form.Item
                        label="Street Address"
                        name={['address', 'streetAddress']}
                        rules={[{ required: true, message: 'Please enter the street address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className={styles.formRow}>
                        <Form.Item
                            label="City"
                            name={['address', 'city']}
                            rules={[{ required: true, message: 'Please enter the city' }]}
                            className={styles.formGroup}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Postal Code"
                            name={['address', 'postalCode']}
                            rules={[{ required: true, message: 'Please enter the postal code' }]}
                            className={styles.formGroup}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Country"
                            name={['address', 'country']}
                            rules={[{ required: true, message: 'Please enter the country' }]}
                            className={styles.formGroup}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <h3>Skills</h3>
                    {formState.skills.map((skill, index) => (
                        <div key={index} className={styles.skillGroup}>
                            <Form.Item
                                name={['skills', index, 'id']}
                                initialValue={skill.id}
                                style={{ display: 'none' }}
                            >
                                <Input type="hidden" />
                            </Form.Item>
                            <Form.Item
                                name={['skills', index, 'name']}
                                rules={[{ required: true, message: 'Please enter the skill name' }]}
                            >
                                <Input placeholder="Skill" />
                            </Form.Item>
                            <Form.Item
                                name={['skills', index, 'yearsOfExperience']}
                                rules={[{ required: true, message: 'Please enter years of experience' }]}
                            >
                                <Input placeholder="Yrs Exp" />
                            </Form.Item>
                            <Form.Item
                                name={['skills', index, 'Rating']}
                                rules={[{ required: true, message: 'Please select the seniority rating' }]}
                                className={styles.rating}
                            >
                                <Select placeholder="Seniority Rating" style={{ width: 100 }}>
                                    <Option value="1">Junior</Option>
                                    <Option value="2">Mid</Option>
                                    <Option value="3">Senior</Option>
                                </Select>
                            </Form.Item>
                            <Button onClick={() => handleRemoveSkill(index)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={handleAddSkill} className={styles.addSkillButton}>
                        + Add New Skill
                    </Button>
                    <div className={styles.formActions}>
                        <Button type="primary" htmlType="submit" className={styles.saveButton}>
                            Save changes to Employee
                        </Button>
                        <Button onClick={onCancel} className={styles.cancelButton}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EmployeeForm;
