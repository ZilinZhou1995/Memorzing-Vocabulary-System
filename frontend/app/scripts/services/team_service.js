/**
 * Created by Jiahui on 4/22/17.
 */
ChallengerApp.factory('teamService', function ($http, $env, $cookies, userService) {

    return {
        team_create: function (user, team, callback, error) {
            if (user) {
                $http({
                    url:$env.urls.team_create,
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        team: team,
                        user: user
                    }
                }).then(function successCallback(response) {
                    callback(response);
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(response);
                });
            } else {
                throw new Error.ReferenceError;
            }
        }


    }
});