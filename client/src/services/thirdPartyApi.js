import axios from 'axios';

const instance = axios.create();

const getUserGithubRepos = (userName, reposCount) => {
    return instance.get(`https://api.github.com/users/${userName}/repos?per_page=${reposCount}`);
}

export { getUserGithubRepos };