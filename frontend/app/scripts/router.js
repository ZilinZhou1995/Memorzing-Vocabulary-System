'use strict';

ChallengerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    var recordLog = function ($http, $env, title, path, url, query) {
        var data = {"title": title, "path": path, "url": $env.host +'/'+ url};
        if (query) {
            data.query = query;
        }
        $http({
            url: $env.urls.recordLog,
            method: 'POST',
            dataType: 'json',
            data: data
        });
    };

    var clearBackUrl = function() {
        var back_url = localStorage.getItem('login_back_url');
        if(back_url) {
            localStorage.removeItem('login_back_url');
        }
    };

    $urlRouterProvider.otherwise(function($injector, $location) {
        var back_url = localStorage.getItem('login_back_url');
        if(back_url) {
            $location.url(back_url);
        }else {
            //处理附件下载逻辑
            //window.history.back(); //页面已经跳转, 回到上一次
            //window.open($location.$$absUrl,'_blank'); //
            $location.url('/');
        }
    });

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'view/feed.html',
            title: 'Memorize'
        })
        .state('create', {
            url: '/create',
            templateUrl: 'view/create_study_set.html',
            title: 'Create your study set'
        })
        .state('singleStudySet', {
            url: '/singleStudySet',
            templateUrl: 'view/study_set.html',
            title: 'Your study set'
        })
        .state('teamInfo', {
            url: '/teamInfo',
            templateUrl: 'view/teamInfo.html',
            title: 'Your team'
        })
        .state('userInfo', {
        url: '/userInfo',
        templateUrl: 'view/userInfo.html',
        title: 'My'
    });




});

ChallengerApp.run(function ($rootScope, $stateParams, pageTitleService) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        var title = toState.title;
        if(_.isFunction(title)) {
            pageTitleService.setTitle(title($stateParams));
        } else {
            pageTitleService.setTitle(title);
        }
    });
});


ChallengerApp
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        // console.info(elem.val() === $(firstPassword).val());
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                    });
                });
            }
        }
    }]);