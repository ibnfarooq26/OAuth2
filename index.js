const express = require("express");
const { getGoogleAuthURL, getToken, getGoogleUser } = require("./oAuth/oAuth");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home"); // Google OAuth SignUp
});

app.get("/auth", (req, res) => {
  const uri = getGoogleAuthURL(); // Address to connect google to get code
  res.redirect(uri); // Redirecting the home page and Google consent Page will appear
});
// '/auth/google' is the re-direct URI configured in google OAuth
//  Redirect recieves code once the User gives consent to share info
app.get("/auth/google", async (req, res) => {
  const code = req.query.code;
  const token = await getToken(code); // Api connect to google to get Tokens
  console.log(token);
  const { access_token, id_token } = token;
  try {
    // Fetch the user's profile with the access token and bearer Authrorization of id_token from Google
    const googleUser = await getGoogleUser(access_token, id_token);
    console.log("google user", googleUser);

    res.send(googleUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(5000, () => {
  console.log("server is running at 5000");
});
