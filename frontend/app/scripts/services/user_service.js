ChallengerApp.factory('userService', function ($http, $env, $cookies) {
   var loginUser;

   var admin_list = []; //admin id list;

    return {
        user_Signin: function (username, password, email, callback, error) {
            $http({
                url:$env.urls.user_signin,
                method: 'POST',
                dataType: 'json',
                data: {
                    username: username,
                    password: password,
                    email: email
                }
            }).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
            });
        },

        user_Login: function (username, password, callback, error) {
            $http({
                url:$env.urls.user_login,
                method: 'POST',
                dataType: 'json',
                data: {
                    username: username,
                    password: password
                }
            }).then(function successCallback(response) {
               callback(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
            });
        },

        user_Get: function (username, callback, error) {
            var userName;
            if ( username != '' ){
                userName = username;
            } else if ($cookies.get('username')) {
                userName = $cookies.get('username');
            } else {
                console.log("Cannot get user");
                throw new Error.ReferenceError;
            }


            $http({
                url:$env.urls.user_get,
                method: 'POST',
                dataType: 'json',
                data: {
                    username: userName
                }
            }).then(function successCallback(response) {
               callback(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
            });
        }
    }
});