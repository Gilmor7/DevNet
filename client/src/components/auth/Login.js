import React, { useContext } from 'react';
import { LoginProvider, LoginStore } from '../../state/Login.store';

function Login() {

    // Get the data from Login store
    const {
        email,
        password,
        on_submit,
        on_change
    } = useContext(LoginStore);

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={on_submit}>
                            <div className="form-group">
                                <input
                                    value={email}
                                    onChange={on_change}
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="email" />
                            </div>
                            <div className="form-group">
                                <input
                                    value={password}
                                    onChange={on_change}
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    name="password" />
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const connected = () => (
    <LoginProvider>
        <Login />
    </LoginProvider>
)

export default connected;
