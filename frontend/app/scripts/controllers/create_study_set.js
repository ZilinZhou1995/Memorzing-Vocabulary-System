/**
 * Created by Jiahui on 4/14/17.
 */
angular.module('ChallengerApp')
    .controller('createStudySetCtrl', function ($scope,studysetsService) {
        $scope.study_sets = [
            {id: 'term1', termName: '', meaning: ''},
            {id: 'term2', termName: '', meaning: ''}
            ];

        $scope.studySets_title = '';



        $scope.addNewTerm = function() {
            var newItemNo = $scope.study_sets.length+1;
            $scope.study_sets.push({'id':'term'+newItemNo,'termName': '', 'meaning': ''});
        };

        $scope.removeTerm = function(index) {
            // var lastItem = $scope.study_sets.length-1;
            $scope.study_sets.splice(index);
        };


        $scope.create_studySets = function () {
            studysetsService.studySets_initialize($scope.studySets_title , $scope.study_sets, function (response) {
                console.log(response);
            })
        }


    });
