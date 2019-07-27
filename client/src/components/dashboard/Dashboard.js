import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { profileStore } from '../../state/Profile.store';
import { AuthContext } from '../../state/GlobalAuthContext';

import Spinner from '../view/Spinner';

const Dashboard = () => {

    const { profile, profile_loading } = useContext(profileStore);
    const { user } = useContext(AuthContext);

    let dashboardContent;
    if (profile === null || profile_loading) {
        dashboardContent = <Spinner />;
    }
    else {
        //check if the current user have a profile 
        if (Object.keys(profile).length > 0) {
            //TODO: set profile fields
        } else {
            //the user does not have profile yet 
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet created a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile </Link>
                </div>
            )
        }
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;
