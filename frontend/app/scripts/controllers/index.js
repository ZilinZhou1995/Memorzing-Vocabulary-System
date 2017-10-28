/**
 * Created by Jiahui on 4/11/17.
 */
'use strict';

angular.module('ChallengerApp')
    .controller('indexCtrl', function ($scope, $http, $env, $cookies, $route, userService) {


        var LoginUser;

        $scope.single_studySet = '';
        $scope.isshowLeftMenus = true;

        $scope.currentUser = "";
        //keep log in function
        $scope.isLogin = false;
        if ($cookies.get('username')) {
          userService.user_Get('', function (response) {
              if (response.data.successful) {
                  console.log(response);
                  LoginUser = response.data.body;
                  $scope.currentUser = LoginUser;
                  $scope.isLogin = true;
              } else if (response.data.errorCode == -3){
                  //user not exist in database
                  $scope.isLogin = false;
                  $cookies.remove('username');
              }

          })
        }

        $scope.showLoginModal = function () {
            $('#login')
                .modal('show')
        };

        $scope.hideLoginModal = function () {
            $('#login')
                .modal('hide');
        };

        $scope.showSignupModal = function () {
            $('#signup')
                .modal('show');
        };

        $scope.hideSignupModal = function () {
            $('#signup')
                .modal('hide');
        };



        $scope.logout = function () {
            $cookies.remove('username');
            $scope.isLogin = false;
            $route.reload();
        };

        $scope.usersignin = function () {
            if ( $scope.username && $scope.password && $scope.email) {
                userService.user_Signin(
                    $scope.username,
                    $scope.password,
                    $scope.email,
                    function (response) {
                        if (response.data.successful) {
                            console.log(response);
                            LoginUser = response.data.body;
                            $scope.currentUser = LoginUser;
                            $cookies.put('username', LoginUser.Username);
                            $scope.isLogin = true;

                            //reload page to show the current user
                            $route.reload();

                            //hide the sign up modal dialog
                            $scope.hideSignupModal();
                        } else if (response.data.errorCode == -3){
                            $('#signinError3').show();
                        }
                    })
            }

        };

        $scope.userlogin = function () {
            userService.user_Login($scope.loginname, $scope.loginpassword, function (response) {
                console.log(response);
                if (response.data.successful) {
                    LoginUser = response.data.body;
                    $scope.currentUser = LoginUser;
                    $cookies.put('username', LoginUser.Username);

                    $scope.isLogin = true;
                    //reload page to show the current user
                    $route.reload();
                    $('userpanel').dropdown();

                    //hide the sign up modal dialog
                    $scope.hideLoginModal();
                } else if (response.data.errorCode == -3){
                    $('#loginError4').hide();
                    $('#loginError3').show();
                } else if (response.data.errorCode == -4) {
                    $('#loginError3').hide();
                    $('#loginError4').show();

                }
            });

        }

    });
