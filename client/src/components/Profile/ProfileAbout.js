import React from 'react';
import PropTypes from 'prop-types';

import AboutBio from './AboutBio';
import AboutSkills from './AboutSkills';

const ProfileAbout = ({ skills, bio, name }) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    {bio ? <AboutBio name={name} bio={bio} /> : null}
                    <hr />
                    <AboutSkills skillset={skills} />
                </div>
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    skills: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
}

export default ProfileAbout;
