import React from "react"
import PropTypes from "prop-types"
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleChange.bind(this);
    // this.createUser = this.createUser.bind(this);
    // this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.createUser(this.state);
    this.setState({ first_name: "", last_name: "", email: "", password: ""});
  };

  createUser = (userInfo) => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({ user: userInfo })
    })
    .then((resp) => { return resp.json })
    .then((data) => {
      if (data.error) {
        const key = Object.keys(data.error);
        const errorMsg = data.error[key][0];
        alert(errorMsg);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.jwt);
        //window.history.pushStatus(data.user, "", "/dashboard");
      }
    })
  };

  fetchCurrentUser = () => {
    return fetch("http://localhost:3000/authorised", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      }
    })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      if (data.error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        //window.history.pushState(data.user, "", "/dashboard");
      }
    })
  };

  logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  componentDidMount() {
		let token = localStorage.getItem("token");
		let user = localStorage.getItem("user");
		if (token && user) {
      alert("getting current user"); 
			this.fetchCurrentUser();
		}
	}

  render () {
    return (
      <React.Fragment>
        <div className="login-signup">
					<div className="login-signup-container">
						<div className="title">Sign Up</div>
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="First Name"
								name="first_name"
								onChange={this.handleChange}
								value={this.state.first_name}
							/>
							<input
								type="text"
								placeholder="Last Name"
								name="last_name"
								onChange={this.handleChange}
								value={this.state.last_name}
							/>
							<input
								type="text"
								placeholder="Email Address"
								name="email"
								onChange={this.handleChange}
								value={this.state.email}
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={this.handleChange}
								value={this.state.password}
							/>
							<button type="submit">Sign Up</button>
              <div>
                <button onClick={this.logoutUser}>Logout</button>
              </div>
						</form>
					</div>
				</div>
      </React.Fragment>
    );
  }
}

export default Signup
