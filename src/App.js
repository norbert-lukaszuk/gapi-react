import React from "react";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
function App() {
  const responseGoogle = (response) => {
    console.log(response);
  };
  const logout = () => {
    console.log("logout");
  };

  return (
    <div className="App">
      <h2>Hello react!</h2>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
}

export default App;
