/**
 * Created by Jiahui on 4/22/17.
 */
angular.module('ChallengerApp')
    .controller('teamInfoCtrl', function ($scope, teamService) {
        $scope.create_team = function () {
            $('#teamCreate').modal('show');
        };

        $scope.team_new = function () {
            var team = {
                teamDescription: $scope.teamDescription,
                teamName: $scope.teamName
            };
            teamService.team_create($scope.currentUser, team, function (response) {
               //Bug: here we should have handle the error
                console.log(response);
                $('#teamCreate').modal('hide');
            })
        }
    });