import React, { useContext, useEffect } from 'react';

import { RegisterProvider, RegisterStore } from '../../state/Register.store';
import { AuthContext } from '../../state/GlobalAuthContext';

import TextFieldGroup from '../view/TextFieldGroup';

const Register = ({ history }) => {
    // Get the data from register store
    const {
        name,
        email,
        password,
        password2,
        errors,
        on_submit,
        on_change
    } = useContext(RegisterStore);

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

    //configure the password2 error messgae(can be not match or not valid)
    let password2Error = null;
    if (errors.password) password2Error = true;
    if (errors.password2) {
        password2Error = "Passwords must match";
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={e => on_submit(history, e)}>

                            <TextFieldGroup
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Name"
                                onChange={on_change}
                                error={errors.name}
                                errorIsJoi={errors.isJoi}
                            />

                            <TextFieldGroup
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email address"
                                onChange={on_change}
                                error={emailError}
                                errorIsJoi={errors.isJoi}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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

                            <TextFieldGroup
                                type="password"
                                name="password2"
                                value={password2}
                                placeholder="Confirm Password"
                                onChange={on_change}
                                error={password2Error}
                            />

                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const connected = props => (
    <RegisterProvider>
        <Register history={props.history} />
    </RegisterProvider>
)

export default connected;
