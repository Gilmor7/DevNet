import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AddDetailStore, AddDetailProvider } from '../../state/AddProfileDetails.store';

import { addExperience } from '../../services/profileServices';
import { EXP_STRUCTURE } from '../../services/global.variables';

import TextFieldGroup from '../view/TextFieldGroup';
import TextAreaField from '../view/TextAreaField';
import CheckboxFieldGroup from '../view/CheckboxFieldGroup';

const AddExperience = ({ history }) => {

    const {
        fields,
        errors,
        on_change,
        on_submit,
        set_to_current
    } = useContext(AddDetailStore);

    return (
        <div className="section add-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Your Experience</h1>
                        <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
                        <small className="d-block pb-3">* = required field</small>
                        <form noValidate onSubmit={e => on_submit(history, e)}>

                            <TextFieldGroup
                                type="text"
                                onChange={on_change}
                                placeholder="* Job Title"
                                name="title"
                                value={fields.title}
                                error={errors.title}
                                errorIsJoi={errors.isJoi}
                            />

                            <TextFieldGroup
                                type="text"
                                onChange={on_change}
                                placeholder="* Company"
                                name="company"
                                value={fields.company}
                                error={errors.company}
                                errorIsJoi={errors.isJoi}
                            />

                            <TextFieldGroup
                                type="text"
                                onChange={on_change}
                                placeholder="Location"
                                name="location"
                                value={fields.location}
                                error={errors.location}
                                errorIsJoi={errors.isJoi}
                            />

                            <h6>From Date</h6>
                            <TextFieldGroup
                                type="date"
                                onChange={on_change}
                                name="from"
                                value={fields.from}
                                error={errors.from}
                                errorIsJoi={errors.isJoi}
                            />

                            <h6>To Date</h6>
                            <TextFieldGroup
                                type="date"
                                onChange={on_change}
                                name="to"
                                value={fields.to}
                                error={errors.to}
                                errorIsJoi={errors.isJoi}
                                disabled={fields.current}
                            />


                            <CheckboxFieldGroup
                                id="current"
                                name="currrent"
                                value={fields.current}
                                onChange={set_to_current}
                                info="Current Job"
                            />


                            <TextAreaField
                                placeholder="Job Description"
                                name="description"
                                onChange={on_change}
                                value={fields.description}
                                error={errors.descrition}
                                errorIsJoi={errors.isJoi}
                                info="Some of your responsabilities, etc"
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
    <AddDetailProvider initialState={EXP_STRUCTURE} fetchFunc={addExperience}>
        <AddExperience history={props.history} />
    </AddDetailProvider>
)

export default connected;
