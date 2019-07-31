import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const CredentialsTable = ({ credentials, topic, title1, title2, deleteCredential }) => {

    const tableRows = credentials.map(crd =>
        (
            <tr key={crd._id}>
                <td>{crd[title1]}</td>
                <td>{crd[title2]}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{crd.from}</Moment> -
                    {" "}{crd.to ? <Moment format='YYYY/MM/DD'>{crd.to}</Moment> : ' Now'}

                </td>
                <td>
                    <button
                        onClick={() => deleteCredential(crd._id)}
                        className="btn btn-danger"> Delete </button>
                </td>
            </tr>
        )
    )

    let content = null;
    if (credentials.length > 0) {
        content = (
            <div className="mt-6">
                <h4 className="mb-4"> {topic} </h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{title1.charAt(0).toUpperCase() + title1.slice(1)}</th>
                            <th>{title2.charAt(0).toUpperCase() + title2.slice(1)}</th>
                            <th>Years</th>
                            <th></th>
                        </tr>

                        {tableRows}

                    </thead>
                </table>
            </div>
        )
    }

    return content;
}

CredentialsTable.propTypes = {

    credentials: PropTypes.array.isRequired,
    topic: PropTypes.string.isRequired,
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    deleteCredential: PropTypes.func.isRequired
}

export default CredentialsTable;
