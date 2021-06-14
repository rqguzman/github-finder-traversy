import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';


const User = ({ match }) => {

    const githubContext = useContext(GithubContext);

    const { getUser, loading, user, repos, getUserRepos } = githubContext;
    
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        company,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;


    if (loading) {
        return <Spinner />;
    };

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back To Search
            </Link>

            Hireable: {''}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url}
                        alt='User avatar'
                        className='round-img'
                        style={{ width: '150px' }}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <p><strong>Username: </strong> {login}</p>
                                </Fragment>
                            )}

                            {company && (
                                <Fragment>
                                    <p><strong>Company: </strong> {company}</p>
                                </Fragment>
                            )}

                            {blog && (
                                <Fragment>
                                    <p><strong>Website: </strong> {blog}</p>
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-danger'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />

        </Fragment>
    );
};

export default User;