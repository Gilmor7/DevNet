import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import capitalize from '../../utils/capitalize';

function ExperienceList({ credsArr }) {

    return (
        <div className="col-md-6">
            <h3 className="text-center text-info">Experience</h3>
            <ul className="list-group">

                {credsArr.map(crd => (
                    <li
                        key={credsArr._id}
                        className="list-group-item">
                        <h4>{capitalize(crd.company)}</h4>
                        <p>
                            <Moment format='MMM YYYY' >{crd.from}</Moment> -
                        {" "}{crd.to ? <Moment format='MMM YYYY'>{crd.to}</Moment> : ' Current'}
                        </p>
                        <p>
                            <strong>Position:</strong> {capitalize(crd.title)}
                        </p>

                        {crd.location &&
                            (<p>
                                <strong>Location: </strong>
                                {capitalize(crd.location)}
                            </p>)
                        }

                        {crd.description &&
                            (<p>
                                <strong>Description: </strong>
                                {crd.description}
                            </p>)
                        }
                    </li>
                ))
                }

            </ul>
        </div>
    )
}

ExperienceList.propTypes = {
    credsArr: PropTypes.array.isRequired
}

export default ExperienceList;

