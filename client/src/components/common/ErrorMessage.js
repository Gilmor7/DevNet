import React from 'react'

const ErrorMessage = ({ match }) => {
    return (
        <div>
            <h3>
                Oops something went wrong
            </h3>
            <p>{match.params.message}</p>
        </div>
    )
}

export default ErrorMessage;
