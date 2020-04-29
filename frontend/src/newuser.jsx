import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class NewUser extends React.Component {
  //should start with values of what is currently in the table
  state = {
    username: '',
    first: '',
    last: '',
    password: '',
    email: '',
    accessCode: '',
    failed: ''
  };

  createUser = (e) => {
    if (this.state.accessCode === 'ACCESSCODE') {
      axios.post('http://localhost:8000/users', {
        username: this.state.username,
        passwd: this.state.password,
        email: this.state.email,
        firstName: this.state.first,
        lastName: this.state.last,
      }).then(
        res => {
          console.log(res);
          this.setState({ failed: 'no' });
        });
    }
    else {
      this.setState({ failed: 'yes' });
    }
  }

  render() {
    return (
      <form className="container">
        <h3 className="container list-group-item bg-secondary text-white">New User</h3>

        {(() => {
          if (this.state.failed === "yes") {
            return (
              <p className="test-danger">Failed to create an account, invalid access code</p>
            )
          }
          if (this.state.failed === "no") {
            return (
              <div>
                <p className="text-success col">Account Successfully Created</p>
                <Link to='/login' className="btn btn=primary col">Click Here to Login</Link>
              </div>
            )
          }
        })()}

        <div className="list-group-item">
          <div className="form-group form-row">
            <label htmlFor="name">Username</label>
            <input type="text"
              id="Username"
              name="Username"
              className="form-control"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })} />
          </div>

          <div className="form-group form-row">
            <label htmlFor="email">Email</label>
            <input type="text"
              id="email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })} />
          </div>

          <div className="form-group form-row">
            <label htmlFor="phoneNumber">First Name</label>
            <input type="text"
              id="First Name"
              name="First Name"
              className="form-control"
              value={this.state.first}
              onChange={e => this.setState({ first: e.target.value })} />
          </div>

          <div className="form-group form-row">
            <label htmlFor="address">Last Name</label>
            <input type="text"
              id="Last Name"
              name="Last Name"
              className="form-control"
              value={this.state.last}
              onChange={e => this.setState({ last: e.target.value })} />
          </div>

          <div className="form-group form-row">
            <label htmlFor="city">Password</label>
            <input type="text"
              id="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })} />

          </div>
          <div className="form-group form-row">
            <label htmlFor="city">Access Code</label>
            <input type="text"
              id="accessCode"
              name="accessCode"
              className="form-control"
              value={this.state.accessCode}
              onChange={e => this.setState({ accessCode: e.target.value })} />

          </div>

          <div className="row">
            <button type="button" className="btn btn-primary col" onClick={() => this.createUser()}>Create New User</button>
            <Link to='/login' className="btn btn-primary col">Cancel</Link>
          </div>
        </div>

      </form>
    );
  }
}
