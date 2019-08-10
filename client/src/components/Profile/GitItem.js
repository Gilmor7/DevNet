import React from 'react';
import PropTypes from 'prop-types';

const GitItem = ({ repo }) => {
    return (
        <div className="card card-body mb-2">
            <div className="row">
                <div className="col-md-6">
                    <h4>
                        <a href={repo.html_url} className="text-info" target="_blank">
                            {repo.name}
                        </a>
                    </h4>
                    {repo.description && <p>{repo.description}</p>}
                </div>
                <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                        Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge badge-secondary mr-1">
                        Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge badge-success">
                        Forks: {repo.forks_count}
                    </span>
                </div>
            </div>
        </div>
    )
}

GitItem.propTypes = {
    repo: PropTypes.object.isRequired
}

export default GitItem;
