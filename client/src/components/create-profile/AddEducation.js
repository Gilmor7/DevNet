import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { addEducation } from '../../services/profileServices';
import { EDU_STRUCTURE } from '../../services/global.variables';

import { AddDetailProvider, AddDetailStore } from '../../state/AddProfileDetails.store'

import TextFieldGroup from '../view/TextFieldGroup';
import TextAreaField from '../view/TextAreaField';
import CheckboxFieldGroup from '../view/CheckboxFieldGroup';

const AddEducation = ({ history }) => {

    const {
        fields,
        errors,
        on_change,
        on_submit,
        set_to_current
    } = useContext(AddDetailStore);


    return (
        <div className="add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Your Education</h1>
                        <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                        <small className="d-block pb-3">* = required field</small>
                        <form noValidate onSubmit={e => on_submit(history, e)}>

                            <TextFieldGroup
                                type="text"
                                onChange={on_change}
                                placeholder="* School Or Bootcamp"
                                name="school"
                                value={fields.school}
                                error={errors.school}
                                errorIsJoi={errors.isJoi}
                            />

                            <TextFieldGroup
                                type="text"
                                onChange={on_change}
                                placeholder="* Degree or Certificate"
                                name="degree"
                                value={fields.degree}
                                error={errors.degree}
                                errorIsJoi={errors.isJoi}
                            />

                            <TextFieldGroup
                                type="text"
                                onChange={on_change}
                                placeholder="Field Of Study"
                                name="fieldofstudy"
                                value={fields.fieldofstudy}
                                error={errors.fieldofstudy}
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
                                info="Current Studies"
                            />


                            <TextAreaField
                                placeholder="Program Description"
                                name="description"
                                onChange={on_change}
                                value={fields.description}
                                error={errors.descrition}
                                errorIsJoi={errors.isJoi}
                                info="Tell us about your experience and what you learned"
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
    <AddDetailProvider initialState={EDU_STRUCTURE} fetchFunc={addEducation} >
        <AddEducation history={props.history} />
    </AddDetailProvider>
)

export default connected;
