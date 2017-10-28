/**
 * Created by Jiahui on 4/14/17.
 */


angular.module('ChallengerApp')
    .controller('studySetCtrl', function ($scope, studysetsService) {
        studysetsService.get_index(function (index) {
            $scope.single_studySet = $scope.currentUser.StudySets[index];
        });


        $scope.initSingleStudySet = function () {
            studysetsService.get_index(function (index) {
                $scope.single_studySet = $scope.currentUser.StudySets[index];
            });
        };
        console.log($scope.single_studySet);
    });