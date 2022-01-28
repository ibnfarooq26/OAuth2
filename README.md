# OAuth2.0
# Step1: Get Client Id and CLient Secret from google 'https://console.developers.google.com/'. One must register with emailId, Domain name, and redirecting Uri.
# Step2: Get code from the google with Consent from the user by redirecting the User to 'https://accounts.google.com/o/oauth2/token' with passing queryParams of with query Params of 
    redirect_uri:
    client_id:,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
      // CAN ADD OTHER SCOPES ALSO
      // you will recieve  code from the redirect_uri u ve mentioned from your server.
      
  
#Step 3: Get Token from the google by API request to google "https://accounts.google.com/o/oauth2/token" with query params of
       code: (you get from step 2)
      client_id: 
      client_secret: 
      redirect_uri: (you have mentioned),
      grant_type: "authorization_code"
      
      // TOKEN RECIEVED WILL HAVE {access_token, refresh_token, Authorization Bearer and id_token}
      
#Step 4: Get the user profile from the API Request to google 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}'
        // place the accestoken recieved in query params
        // place the id-token in authorizatiioon header with 'bearer'
