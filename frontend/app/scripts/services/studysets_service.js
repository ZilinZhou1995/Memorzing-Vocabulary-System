/**
 * Created by Jiahui on 4/22/17.
 */
ChallengerApp.factory('studysetsService', function ($http, $env, $cookies, userService) {

    var user = '';
    userService.user_Get('', function (response) {
        user = response.data.body;
    });

    var index;

    return {
        studySets_initialize: function (title, study_sets, callback, error) {
            if (user) {
                var StudySets = {
                    title: title,
                    study_sets: study_sets
                };
                $http({
                    url:$env.urls.studysets_create,
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        study_sets: StudySets,
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
        },

        studySets_delete: function (index, user, callback, error) {
            if (user) {
                $http({
                    url:$env.urls.studysets_delete,
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        index: index,
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
                throw new Error.ReferenceError
            }
        },
        studySets_review: function (index, user, callback, error) {
            if (user) {
                $http({
                    url:$env.urls.studysets_review,
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        index: index,
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
                throw new Error.ReferenceError
            }
        },
        save_index: function (index, callback) {
            index = index;
            callback(index);
        },

        get_index: function (callback) {
            if (index) {
                callback(index);
            } else if ($cookies.get('index')) {
                index = $cookies.get('index');
                callback(index);
            } else {
                console.log('no index of single study set');
            }
        }
    }
});