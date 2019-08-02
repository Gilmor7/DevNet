import React from 'react';
import PropTypes from 'prop-types';

const AboutSkills = ({ skillset }) => {
    return (
        <React.Fragment>
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">

                    {
                        skillset.map(s => (
                            <div
                                key={s}
                                className="p-3">
                                <i className="fa fa-check" /> {s}
                            </div>
                        ))
                    }

                </div>
            </div>
        </React.Fragment>
    )
}

AboutSkills.propTypes = {
    skillset: PropTypes.array.isRequired
}

export default AboutSkills;
