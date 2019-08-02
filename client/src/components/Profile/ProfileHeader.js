import React from 'react';
import PropTypes from 'prop-types'

import HeaderSocial from './HeaderSocial';

const ProfileHeader = ({ profile }) => {

    let socials = null;

    if (profile.social) {
        socials = Object.entries(profile.social)
            .map(s => (
                <HeaderSocial
                    key={s[0]}
                    s={s[0]}
                    link={s[1]} />
            ));
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img className="rounded-circle" src={profile.user.avatar} alt="" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{profile.user.name}</h1>
                        <p className="lead text-center">{profile.status} {" "} {profile.company ? "at " + profile.company : ""}</p>
                        {!profile.location ? null : <p>{profile.location}</p>}
                        <p>
                            {  // Website URL
                                !profile.website ? null : (
                                    <a className="text-white p-2" href={profile.website} target="_blank">
                                        <i className="fas fa-globe fa-2x"></i>
                                    </a>
                                )
                            }
                            {socials}

                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileHeader.protoType = {
    profile: PropTypes.object.isRequired
}

export default ProfileHeader
