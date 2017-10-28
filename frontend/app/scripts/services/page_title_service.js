/**
 * Created by Jiahui on 4/14/17.
 */
ChallengerApp.factory('pageTitleService', function () {

    var pageTitle;

    return {

        getTitle: function () {
            return pageTitle;
        },

        setTitle: function (title) {
            pageTitle = title;
        }
    };
});

ChallengerApp.run(function ($rootScope, pageTitleService) {
    $rootScope.pageTitleService = pageTitleService;
});