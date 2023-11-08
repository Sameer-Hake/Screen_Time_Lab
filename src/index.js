import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import AppLayout from './AppLayout/AppLayout';
import Children from './Children/Children';
import TaskCreation from './Task Creation/TaskCreation';
import TaskReview from './TaskReview/TaskReview';
import Parent from './Parent/Parent';
import InviteFriend from './InviteFriend/InviteFriend';
import Account from './Account/Account';
import Help from './Help/Help';
import NewTask from './Task Creation/components/AddTask';
import EditTask from './Task Creation/components/EditTask';
import SignIn from './Authentication/component/SignIn/SignIn';
import SignUP from './Authentication/component/SignUP/SignUP';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/sign-up',
        element: <SignUP />
    },
    {
        path: '/app',
        element: <AppLayout />,
        children: [
            {
                path: '',
                element: <Children />
            },
            {
                path: 'task-creation',
                element: <TaskCreation />
            },
            {
                path: 'task-review',
                element: <TaskReview />
            },
            {
                path: 'parent',
                element: <Parent />
            },
            {
                path: 'invite-friend',
                element: <InviteFriend />
            },
            {
                path: 'account',
                element: <Account />
            },
            {
                path: 'help',
                element: <Help />
            },
            {
                path: 'task',
                element: <NewTask />
            },
            {
                path: 'task/:id',
                element: <EditTask />
            }
        ]
    }
]);


root.render(
    <Auth0Provider
        domain="dev-5lqe2i1qoehhicvr.us.auth0.com"
        clientId="eqiyup0jusXmV8ZOSZXhO3ruaJeyqhAp"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
