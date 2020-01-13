/* eslint no-restricted-globals: 0*/

//restricted glocal js
import auth0 from "auth0-js";

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-fg6hnfvk.eu.auth0.com",
    clientID: "9pa50080aQy6OjwVotCIfjDBOYPQsh1q",
    redirectUri: "http://localhost:3000/callback",

    responseType: "token id_token",
    scope: "openid"
  });

  /*
  constructor() {
    this.login = this.login.bind(this);
  }
  */

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authresults) => {
      if (authresults && authresults.accessToken && authresults.idToken) {
        let expirsesAt = JSON.stringify(
          authresults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authresults.accessToken);
        localStorage.setItem("id_token", authresults.idToken);
        localStorage.setItem("expires_at", expirsesAt);
        //location.hash = "";
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err);
      }
    });
  };

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGIN_FAILURE_PAGE;
  };

  getProfile = () => {};
}
