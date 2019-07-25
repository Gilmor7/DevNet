import React, { useContext, useEffect } from 'react';
import { profileStore } from '../../state/Profile.store';

const Dashboard = () => {

    const { profile } = useContext(profileStore);

    useEffect(() => {
        console.log(profile);
    }, [profile])
    return (
        <div>
            <h1>Dashboard page</h1>
        </div>
    )
}


export default Dashboard;
