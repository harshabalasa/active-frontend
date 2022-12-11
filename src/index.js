import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './Login';
// import User from './Useradd';
// import Commission from './Commissionadd';
// import Commissionview from './Commissionview';
// import Officersadd from './Officersadd';
// import Officersview from './Officersview';
//import Useradd from './Useradd';//////////////////////////
// import Userview from './Userview';
// import Home from './Home';
// import Report from './report';
// import Assign from './assign';
// import Cadre from './Cadreadd';
//import History from './history';/////////////////////////
import Login from './Login';
import UserHome from './users/userhome';
import UserAssign from './users/assign';
import UserHistory from './users/history';
import Userreport from './users/report';
import AdminHome from './admin/adminhome';
import AdminOfficerAdd from './admin/adminofficeradd';
import AdminOfficerView from './admin/adminofficerview';
import AdminUserAdd from './admin/Adminadduser';
import AdminUserView from './admin/adminviewuser';
import AdminAddCadre from './admin/adminaddcadre';
import AdminCommissionAdd from './admin/admincommissionadd';
import AdminCommissionView from './admin/admincommissionview';
import AdminHistory from './admin/adminhistory';
import AdminReport from './admin/adminreport';
import AdminProtectedRoute from './admin/protectedRoute';
import UserProtectedRoute from './users/protectedrouteuser';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
         <Route path='/login' exact>
          <Login/>
        </Route>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/userhome' exact>
          <UserProtectedRoute><UserHome/></UserProtectedRoute>
        </Route>
        <Route path='/userassign' exact>
          <UserProtectedRoute><UserAssign/></UserProtectedRoute>
        </Route>
        <Route path='/userreport' exact>
          <UserProtectedRoute><Userreport/></UserProtectedRoute>
        </Route>
        <Route path='/userhistory' exact>
          <UserProtectedRoute><UserHistory/></UserProtectedRoute>
        </Route>
        <Route path='/adminhome' exact>
          <AdminProtectedRoute><AdminHome/></AdminProtectedRoute>
        </Route>
        <Route path='/adminofficeradd' exact>
        <AdminProtectedRoute><AdminOfficerAdd/></AdminProtectedRoute>
        </Route>
        <Route path='/adminofficerview' exact>
          <AdminProtectedRoute><AdminOfficerView/></AdminProtectedRoute>
        </Route>
        <Route path='/adminuseradd' exact>
          <AdminProtectedRoute><AdminUserAdd/></AdminProtectedRoute>
        </Route>
        <Route path='/adminuserview' exact>
          <AdminProtectedRoute><AdminUserView/></AdminProtectedRoute>
        </Route>
        <Route path='/admincommissionadd' exact>
          <AdminProtectedRoute><AdminCommissionAdd/></AdminProtectedRoute>
        </Route>
        <Route path='/admincommissionview' exact>
          <AdminProtectedRoute><AdminCommissionView/></AdminProtectedRoute>
        </Route>
        <Route path='/adminhistory' exact>
          <AdminProtectedRoute><AdminHistory/></AdminProtectedRoute>
        </Route>
        <Route path='/admincadre' exact>
          <AdminProtectedRoute><AdminAddCadre/></AdminProtectedRoute>
        </Route>
        <Route path='/adminreport' exact>
          <AdminProtectedRoute><AdminReport/></AdminProtectedRoute>
        </Route>
        </Switch>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
