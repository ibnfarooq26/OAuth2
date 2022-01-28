const axios = require("axios");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("./config");
const SERVER_ROOT_URI = "http://localhost:5000";
const redirectURI = "auth/google";

// google Address to receive code after consent by the User
const getGoogleAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const query = new URLSearchParams(options);

  return `${rootUrl}?${query.toString()}`;
};


// Gets {access_token, refresh_token, Authorization Bearer and id_token}
const getToken = async (code) => {
    const tokenUrl = "https://accounts.google.com/o/oauth2/token";
    const queryValues = {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
      grant_type: "authorization_code",
    };
    const query = new URLSearchParams(queryValues);
    const token = await axios
      .post(tokenUrl, query.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`, error.message);
      });
    console.log(token);
    return token;
  };
  
// Gets User Profile such as name, mail, profile pic and others
const getGoogleUser = async (access_token, id_token) => {
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
  return googleUser;
};

module.exports = { getGoogleAuthURL, getToken, getGoogleUser };
