import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';

class App extends Component {

  state = {
    users: [],
    loading: false
  };

  // async componentDidMount() {

  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users`);

  //   this.setState({ users: res.data, loading: false })
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  render() {

    const { users, loading } = this.state;
    
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />

        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
