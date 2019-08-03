import React from 'react';
import PropTypes from 'prop-types';

import ExperienceList from './ExperienceList';
import EducationList from './EducationList';



const ProfileCreds = ({ education, experience }) => {
    return (
        <div className="row">
            {experience.length > 0 && <ExperienceList credsArr={experience} />}
            {education.length > 0 && <EducationList credsArr={education} />}
        </div>
    )
}

ProfileCreds.propTypes = {
    education: PropTypes.array.isRequired,
    experience: PropTypes.array.isRequired
}

export default ProfileCreds;
