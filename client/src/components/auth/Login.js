import React, { useContext, useEffect } from 'react';

//stores imports
import { LoginProvider, LoginStore } from '../../state/Login.store';
import { AuthContext } from '../../state/GlobalAuthContext';

import TextFieldGroup from '../view/TextFieldGroup';
import SpinnerSmall from '../view/SpinnerSmall';


const Login = ({ history }) => {

    const {
        email,
        password,
        errors,
        loading,
        on_submit,
        on_change
    } = useContext(LoginStore);

    const { isAuthenticated } = useContext(AuthContext);

    //check if user logged in already and redirect him to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }
    }, [isAuthenticated, history])

    //configure the email error messgae(can be already exist or not valid)
    let emailError = null;
    if (errors.email) {
        if (errors.isJoi) emailError = "is not valid";
        else emailError = errors.email;
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevNet account</p>
                        <form noValidate onSubmit={e => on_submit(e, history)}>

                            <TextFieldGroup
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email address"
                                onChange={on_change}
                                error={emailError}
                                errorIsJoi={errors.isJoi}
                            />

                            <TextFieldGroup
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={on_change}
                                error={errors.password}
                                errorIsJoi={errors.isJoi}
                            />

                            {loading ? <SpinnerSmall /> : <input type="submit" className="btn btn-info btn-block mt-4" />}
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
