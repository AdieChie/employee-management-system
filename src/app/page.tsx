'use client'
import React from 'react';
import { EmployeeProvider } from './provider/employee';
import Employees from './employee';


const App: React.FC = () => (
  <EmployeeProvider>
        <Employees/>
  </EmployeeProvider>
);

export default App;