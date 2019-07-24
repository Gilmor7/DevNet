import React, { useContext, useEffect } from 'react';
import classnames from 'classnames';

import { LoginProvider, LoginStore } from '../../state/Login.store';
import { AuthContext } from '../../state/GlobalAuthContext';


const Login = ({ history }) => {

    const {
        email,
        password,
        errors,
        on_submit,
        on_change
    } = useContext(LoginStore);

    const { isAuthenticated } = useContext(AuthContext);

    //check if user logged in already and redirect him to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }
    }, [isAuthenticated])


    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form noValidate onSubmit={e => on_submit(e, history)}>
                            <div className="form-group">
                                <input
                                    value={email}
                                    onChange={on_change}
                                    type="email"
                                    className={classnames("form-control form-control-lg", {
                                        'is-invalid': errors.email
                                    })}
                                    placeholder="Email Address"
                                    name="email" />
                                {errors.email && <div className="invalid-feedback"> {errors.isJoi ? "Email is not valid" : errors.email} </div>}
                            </div>
                            <div className="form-group">
                                <input
                                    value={password}
                                    onChange={on_change}
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        'is-invalid': errors.password
                                    })}
                                    placeholder="Password"
                                    name="password" />
                                {errors.password && <div className="invalid-feedback"> {errors.isJoi ? "Password " + errors.password : errors.password} </div>}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const connected = props => (
    <LoginProvider>
        <Login history={props.history} />
    </LoginProvider>
)




export default connected;
