'use client'
import React from 'react';
import { Flex, Layout } from 'antd';
import styles from './page.module.css';
import Employees from './employee';
import { EmployeeProvider } from './provider/employee';


const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => (
  <EmployeeProvider>
        <Employees/>
  </EmployeeProvider>
);

export default App;