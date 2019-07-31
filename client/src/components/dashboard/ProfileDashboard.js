import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileActions from './ProfileActions';
import CredentialsTable from './CredentialsTable';

const ProfileDashboard = ({ name, handle, onClickDelete, profile, deleteExp, deleteEdu }) => {
    return (
        <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${handle}`}> {name} </Link></p>
            <ProfileActions />

            <CredentialsTable
                credentials={profile.experience}
                topic="Experience Credentials"
                title1="company"
                title2="title"
                deleteCredential={deleteExp}
            />

            <CredentialsTable
                credentials={profile.education}
                topic="Education Credentials"
                title1="school"
                title2="degree"
                deleteCredential={deleteEdu}
            />

            <button className="btn btn-danger d-block"
                style={{ marginTop: "40px" }}
                onClick={onClickDelete}
            >
                Delete My Account</button>
        </div>
    )
}


ProfileDashboard.propTypes = {
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deleteExp: PropTypes.func.isRequired,
    deleteEdu: PropTypes.func.isRequired
}

export default ProfileDashboard;