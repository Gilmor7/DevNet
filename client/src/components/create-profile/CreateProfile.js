import React, { useContext } from 'react';

import { CreateProfileProvider, CreateProfileStore } from '../../state/CreateProfile.store';
import { SOCIALS, STATUS_OPTIONS } from '../../services/global.variables';

import TextFieldGroup from '../view/TextFieldGroup';
import TextAreaField from '../view/TextAreaField';
import SelectFieldGroup from '../view/SelectFieldGroup';
import InputGroup from '../view/InputGroup';

const CreateProfile = ({ history }) => {

    const {
        display_social,
        errors,
        //fields
        handle,
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        social,
        on_change,
        on_change_social,
        on_submit,
        set_display_social
    } = useContext(CreateProfileStore);


    let socialInputs ;

    if(display_social){
        socialInputs = SOCIALS.map(s => (            
        <InputGroup
        key={s.value}
            name={s.name}
            placeholder={`${s.name.charAt(0).toUpperCase() + s.name.slice(1)} ${s.type} URL `}
            value={social[s.name]}
            icon={`fab fa-${s.name}`}
            onChange={on_change_social}
            error={errors[s.name] ? `URL is not valid`: null}
        />
        ));
    } 


    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">Let's get some information to make your profile stand out</p>
                        <small className="d-block pb-3">* = required field</small>
                        <form onSubmit={e => on_submit(history, e)}>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                type="text"
                                errorIsJoi={errors.isJoi}
                                name="handle"
                                value={handle}
                                error={errors.handle}
                                onChange={on_change}
                                info="A unique handle for your profile URL."
                            />

                            <SelectFieldGroup
                                options={STATUS_OPTIONS}
                                name="status"
                                value={status}
                                onChange={on_change}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />

                            <TextFieldGroup
                                    placeholder="Company"
                                    type="text"
                                    errorIsJoi={errors.isJoi}
                                    name="company"
                                    value={company}
                                    onChange={on_change}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                    />

                            <TextFieldGroup
                                    placeholder="Website"
                                    type="text"
                                    errorIsJoi={errors.isJoi}
                                    name="website"
                                    value={website}
                                    onChange={on_change}
                                    error={errors.website ? 'URL is not valid': null}
                                    info="Could be your own website or a company one"
                                    />

                            <TextFieldGroup
                                    placeholder="Location"
                                    type="text"
                                    errorIsJoi={errors.isJoi}
                                    name="location"
                                    value={location}
                                    onChange={on_change}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                    />

                            <TextFieldGroup
                                    placeholder="* Skills"
                                    type="text"
                                    errorIsJoi={errors.isJoi}
                                    name="skills"
                                    value={skills}
                                    onChange={on_change}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                                        HTML,CSS,JavaScript,PHP)"
                                    />

                            <TextFieldGroup
                                    placeholder="Github Username"
                                    type="text"
                                    errorIsJoi={errors.isJoi}
                                    name="githubusername"
                                    value={githubusername}
                                    onChange={on_change}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                    />

                            <TextAreaField
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={bio}
                                    onChange={on_change}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                    />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            set_display_social(!display_social);
                                        }}
                                        className="btn btn-dark"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">&nbsp; Optional</span>
                                </div>

                                    {socialInputs}
                            
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                    />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const connected = props => (
    <CreateProfileProvider>
        <CreateProfile {...props} />
    </CreateProfileProvider>
)

export default connected;
