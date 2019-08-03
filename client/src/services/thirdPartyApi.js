import axios from 'axios';

const getUserGithubRepos = (userName, reposCount) => {
    return axios.get(`https://api.github.com/users/${userName}/repos?per_page=${reposCount}`);
}

export { getUserGithubRepos };