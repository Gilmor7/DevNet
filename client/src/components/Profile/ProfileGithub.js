import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../view/Spinner';
import GitItem from './GitItem';

import { USER_REPO_COUNT } from '../../services/global.variables';
import { getUserGithubRepos } from '../../services/thirdPartyApi';


const ProfileGithub = ({ user }) => {

    const [repos, set_repos] = useState(null);
    const [loading, set_loading] = useState(true);
    const [err, setErr_message] = useState(null);

    // Get the user last repos from github and set it to
    useEffect(() => {
        getUserGithubRepos(user, USER_REPO_COUNT)
            .then(res => {
                set_repos(res.data)
                set_loading(false)
            })
            .catch(err => {
                setErr_message(err.response.data.message)
                set_loading(false)
            })

    }, []);

    let content = null;

    if (repos && repos.length > 0) {
        content = repos.map(repo => (
            <GitItem
                key={repo.id}
                repo={repo}
            />
        ));
    }

    else if (err) content = (<h4 className="info text-center">Something went wrong...</h4>);
    else content = (<h4 className="info text-center">No repos were found</h4>);

    return (
        <div>

            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {loading ? <Spinner /> : content}
        </div>
    )
}

ProfileGithub.propTypes = {
    user: PropTypes.string.isRequired
}

export default ProfileGithub;
