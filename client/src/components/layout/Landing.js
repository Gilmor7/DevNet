import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/GlobalAuthContext';

const Landing = ({ history }) => {

    const { isAuthenticated } = useContext(AuthContext);

    //check if user logged in already and redirect him to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }
    }, [isAuthenticated, history])

    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Developer Connector </h1>
                            <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                            <hr />
                            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                            <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Landing;
