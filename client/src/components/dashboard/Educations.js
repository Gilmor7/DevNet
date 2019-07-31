import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Educations = ({ educations, deleteEdu }) => {

    const eduRows = educations.map(edu =>
        (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
                    {edu.to ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment> : ' Now'}

                </td>
                <td>
                    <button
                        onClick={() => deleteEdu(edu._id)}
                        className="btn btn-danger"> Delete </button>
                </td>
            </tr>
        )
    )

    let content = null;
    if (educations.length > 0) {
        content = (
            <div className="mt-6">
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree / Certificate</th>
                            <th>Years</th>
                            <th></th>
                        </tr>

                        {eduRows}

                    </thead>
                </table>
            </div>
        )
    }

    return content;
}

Educations.propTypes = {
    educations: PropTypes.arrayOf(PropTypes.object),
    deleteEdu: PropTypes.func.isRequired
}

export default Educations;
