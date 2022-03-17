import React from "react"
import PropTypes from "prop-types"
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleChange.bind(this);
    // this.loginUser = this.loginUser.bind(this);
    // this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.loginUser(this.state);
    this.setState({ email: "", password: ""});
  };

  loginUser = (userInfo) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({ session: userInfo })
    })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("got data in response");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.jwt);
        //window.history.pushState(data.user, "", "/dashboard");
      }
    });
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
						<div className="title">Log In</div>
						<form onSubmit={this.handleSubmit}>
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
							<button type="submit">Log In</button>
						</form>
            <div>
                <button onClick={this.logoutUser}>Logout</button>
              </div>
					</div>
				</div>
      </React.Fragment>
    );
  }
}

export default Login
