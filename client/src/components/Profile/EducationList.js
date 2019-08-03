import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import capitalize from '../../utils/capitalize';

const EducationList = ({ credsArr }) => {
    return (
        <div className="col-md-6">
            <h3 className="text-center text-info">Education</h3>
            <ul className="list-group">

                {credsArr.map(crd => (
                    <li className="list-group-item">
                        <h4>{capitalize(crd.school)}</h4>
                        <p>
                            <Moment format='MMM YYYY' >{crd.from}</Moment> -
                        {" "}{crd.to ? <Moment format='MMM YYYY'>{crd.to}</Moment> : ' Current'}
                        </p>
                        <p>
                            <strong>Degree: </strong>{capitalize(crd.degree)}</p>
                        <p>
                            <strong>Field Of Study: </strong>{capitalize(crd.fieldofstudy)}</p>
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

EducationList.propTypes = {
    credsArr: PropTypes.array.isRequired
}

export default EducationList;
