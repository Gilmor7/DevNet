import React, { useContext } from 'react';
import { RegisterProvider, RegisterStore } from '../../state/register.store'

function Register() {

    // Get the data from register store
    const {
        name,
        email,
        password,
        password2,
        on_submit,
        on_change
    } = useContext(RegisterStore);

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={on_submit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={on_change}
                                    className="form-control form-control-lg"
                                    placeholder="Name" name="name"
                                    required />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={on_change}
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="email" />
                                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
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
                            <div className="form-group">
                                <input
                                    value={password2}
                                    onChange={on_change}
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm Password"
                                    name="password2" />
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
    <RegisterProvider>
        <Register />
    </RegisterProvider>
)

export default connected;
