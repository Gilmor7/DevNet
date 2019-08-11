import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { profileStore } from '../../state/Profile.store';

const Developers = () => {

    const {
        profiles,
        getProfiles
    } = useContext(profileStore);

    useEffect(() => {
        getProfiles()
    }, [])


    let content;
    if (profiles.length > 0) {
        content = profiles.map(profile => (
            <div
                key={profile._id}
                className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img className="rounded-circle" src={profile.user.avatar} alt="" />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name}</h3>
                        {profile.status && <p>{profile.status} {" "} {profile.company ? "at " + profile.company : ""}</p>}
                        {profile.location && <p>{profile.location}</p>}
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
                    </div>
                    <div className="col-md-4 d-none d-lg-block">
                        <h4>Skill Set</h4>
                        <ul className="list-group">
                            {profile.skills.map(skill => (
                                <li
                                    key={skill}
                                    className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {skill}
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div >
        ))
    }
    else content = (<div>NO Profiles found</div>)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">Browse and connect with developers</p>

                    {content}

                </div>
            </div>
        </div>

    );
}

export default Developers;
