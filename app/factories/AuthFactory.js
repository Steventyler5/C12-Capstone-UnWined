"use strict";

//Need to get the isAuth section of the route provider up and running, as well as a logout function. Also, look at Dylan's movie history code and figure out an easy way to store user information both locally and in the database

Unwined.factory("authFactory", function ()  {
  let ref = new Firebase("https://unwined.firebaseio.com");

  return {
    /*
      Determine if the client is authenticated
     */
    isAuthenticated () {
      let authData = ref.getAuth();

      if (authData) {
        return true;
      } else {
        return false;
      }
    },
    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            console.log("authWithPassword method completed successfully");
            resolve(authData);
          }
        });
      });
    }
  };
});
