import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileActions from './ProfileActions';

const ProfileDashboard = ({ name, handle, onClickDelete }) => {
    return (
        <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${handle}`}> {name} </Link></p>
            <ProfileActions />
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
    onClickDelete: PropTypes.func.isRequired
}

export default ProfileDashboard;