import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Developer Network </h1>
                            <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                            <hr className="bg-white" />
                            <Link to="/register" className="btn btn-lg btn-secondary mr-2">Sign Up</Link>
                            <Link to="/login" className="btn btn-lg btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Landing;
