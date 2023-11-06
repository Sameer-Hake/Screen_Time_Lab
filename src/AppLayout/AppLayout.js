import './css/AppLayout.css';
import React, { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';

export const TaskCretionContext = createContext();

const AppLayout = () => {
    let [taskCreationData, setTaskCreationData] = useState([]);
    let [tableTaskCreationData, setTableTaskCreationData] = useState([]);

    return (
        <div className='app-layout'>
            <Sidebar />

            <TaskCretionContext.Provider value={{
                taskCreationData, setTaskCreationData, tableTaskCreationData,
                setTableTaskCreationData
            }} >
                <Outlet />
            </TaskCretionContext.Provider>
        </div>
    )
}

export default AppLayout;