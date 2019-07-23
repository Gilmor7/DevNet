import React, { useContext, useEffect } from 'react';
import classnames from 'classnames'

import { RegisterProvider, RegisterStore } from '../../state/Register.store';
// import { AuthContext } from '../../state/GlobalAuthContext';

const Register = ({ history }) => {

    useEffect(() => {
        console.log('register did update');
        console.log(errors)
    })

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

    // const {
    //     user,
    //     errors,
    //     on_submit_register,
    //     on_change
    // } = useContext(AuthContext);

    // const {
    //     name = '',
    //     email,
    //     password,
    //     password2 = ''
    // } = user;


    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={e => on_submit(history, e)}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={on_change}
                                    className={classnames("form-control form-control-lg", {
                                        'is-invalid': errors.name
                                    })}
                                    placeholder="Name" name="name"
                                    required />
                                {errors.name && (<div className="invalid-feedback" >{`Name ${errors.name}`}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={on_change}
                                    className={classnames("form-control form-control-lg", {
                                        'is-invalid': errors.email
                                    })}
                                    placeholder="Email Address"
                                    name="email" />
                                {errors.email && (<div className="invalid-feedback" >{errors.isJoi ? `Email is not valid` : errors.email}</div>)}
                                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
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
                                {errors.password && (<div className="invalid-feedback" >{`Password ${errors.password}`}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                    value={password2}
                                    onChange={on_change}
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        'is-invalid': errors.password || errors.password2
                                    })}
                                    placeholder="Confirm Password"
                                    name="password2" />
                                {errors.password2 && (<div className="invalid-feedback" >{`Passwords must match`}</div>)}
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
    <RegisterProvider>
        <Register history={props.history} />
    </RegisterProvider>
)

export default connected;
