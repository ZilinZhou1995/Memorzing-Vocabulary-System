/**
 * Created by Jiahui on 4/15/17.
 */
angular.module('ChallengerApp')
    .controller('userInfoCtrl', function ($scope, $cookies, studysetsService) {
        $scope.userInfo_studySets = $scope.currentUser.StudySets;
        console.log($scope.userInfo_studySets);

        if ($cookies.get('index')) {
            $scope.single_studySet = $scope.currentUser.StudySets[$cookies.get('index')];
        }
        $scope.navToSingle = function (index) {
            $cookies.put('index', index);
            studysetsService.save_index(index, function (index) {
                console.log( $cookies.get('index'));
            });
        }

        $scope.studySet_Review = function (index) {
            studysetsService.studySets_review(index, $scope.currentUser,function (response) {
                console.log(response);
            })
        }
    });