import React from 'react';
import PropTypes from 'prop-types';

const AboutBio = ({ name, bio }) => {

    const fullName = name.split(' ');

    return (
        <React.Fragment>
            <h3 className="text-center text-info">{fullName[0]}'s Bio</h3>
            <p className="lead text-center">{bio}</p>

        </React.Fragment>
    )
}

AboutBio.propTypes = {
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired
}

export default AboutBio;
