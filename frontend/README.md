# Redux React Client App

Consumes the ServerAPIwithAuth

## Allows the creation of users and the persistent storage of jwt

### Signup

creates and saves a new user on the server, whilst updating the state on the client and saving the response jwt in local storage.

### Signin

Signs in the user after authenticating on the server by updating the redux store, and stores the response jwt in local storage.

### Signout

Signs out the user and deletes the jwt.

### Route to API

Makes request with jwt in header, rendering successful API calls

Allow video upload and display

Validate user sign up through email.
