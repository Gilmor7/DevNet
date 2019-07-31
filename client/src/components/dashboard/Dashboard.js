import React, { useContext } from 'react';

import { profileStore } from '../../state/Profile.store';
import { AuthContext } from '../../state/GlobalAuthContext';

import Spinner from '../view/Spinner';
import NoProfile from './NoProfile';
import ProfileDashboard from './ProfileDashboard';


const Dashboard = () => {

    const {
        profile,
        profile_loading,
        error_message,
        delete_experience,
        delete_education
    } = useContext(profileStore);

    const { user, delete_account } = useContext(AuthContext);

    let dashboardContent;
    if (profile === null || profile_loading) {
        dashboardContent = <Spinner />;
    }
    else {
        //check if the current user have a profile 
        if (Object.keys(profile).length > 0) {
            dashboardContent = (
                <React.Fragment>
                    <ProfileDashboard
                        err={error_message}
                        deleteExp={delete_experience}
                        deleteEdu={delete_education}
                        profile={profile}
                        name={user.name}
                        handle={profile.handle}
                        onClickDelete={delete_account}
                    />
                </React.Fragment>
            );

        } else {
            //the user does not have profile yet 
            dashboardContent = <NoProfile name={user.name} />;
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
