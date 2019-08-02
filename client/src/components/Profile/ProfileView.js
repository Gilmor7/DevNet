import React, { useEffect, useState } from 'react';

import { getProfileByHandle } from '../../services/profileServices';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import Spinner from '../view/Spinner';


const ProfileView = props => {

    const [profile, set_profile] = useState(null);
    const [loading, set_loading] = useState(true);

    useEffect(() => {
        getProfileByHandle(props.match.params.handle)
            .then(res => {
                set_profile(res.data)
                set_loading(false)
            })
            .catch(err => {
                console.log(err)
                //redirect to not found page
            })
    }, [])


    return (
        <div className="container">
            {!loading ? (
                <React.Fragment>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout
                        bio={profile.bio}
                        skills={profile.skills}
                        name={profile.user.name}
                    />
                </React.Fragment>
            ) : <Spinner />}

        </div>
    )
}

export default ProfileView;
