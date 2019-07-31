import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experiences = ({ experiences, deleteExp }) => {

    const expRows = experiences.map(exp =>
        (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
                    {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : ' Now'}

                </td>
                <td>
                    <button
                        onClick={() => deleteExp(exp._id)}
                        className="btn btn-danger"> Delete </button>
                </td>
            </tr>
        )
    )

    let content = null;
    if (experiences.length > 0) {
        content = (
            <div className="mt-6">
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>

                        {expRows}

                    </thead>
                </table>
            </div>
        )
    }

    return content;
}

Experiences.propTypes = {
    experiences: PropTypes.arrayOf(PropTypes.object),
    deleteExp: PropTypes.func.isRequired
}

export default Experiences
