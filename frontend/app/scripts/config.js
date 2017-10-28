"use strict";

var ChallengerApp = angular.module('ChallengerApp', ['ngAria', 'ngCookies', 'ngRoute', 'ui.router'])

.constant('$env', {name:'it',host:'http://localhost:3000',urls:{IMAGE_ROOT:'http://localhost:3000/pics',user_signin:'http://localhost:3000/user/signin',user_login:'http://localhost:3000/user/login',user_get:'http://localhost:3000/user/get',studysets_create:'http://localhost:3000/studysets/create',studysets_delete:'http://localhost:3000/studysets/delete',studysets_review:'http://localhost:3000/studysets/review',team_create:'http://localhost:3000/team/create',team_add:'http://localhost:3000/team/add',team_delete:'http://localhost:3000/ team/delete'}})

;