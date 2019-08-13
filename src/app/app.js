import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

const model = {
  supervisors: {},
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', ['$scope', '$http', ($scope, $http) => {
    $scope.savedData = model;
    $scope.isSuggestionShow = false;
    $scope.savedDataShow = false;
  
    $scope.searchParty = () => {
      $scope.selectedSupervisors = false;
  
      $http({
        method: 'post',
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
        headers: {
          'Authorization': 'Token a97c90059fe7ba9c500e56582651f1852f269d5c',
          'Authorization': 'Token a97c90059fe7ba9c500e56582651f1852f269d5c',
          'Content-Type': 'application/json',
        },
        data: {
          query: $scope.party
        }
      }).then((response) => {
        $scope.response = response.data.suggestions;
        $scope.isSuggestionShow = true;
      })
    };
  
    $scope.onPartyChoose = (data) =>  {
      $scope.isSuggestionShow = false;
      $scope.party = data.value;
  
      if (Object.keys($scope.savedData.supervisors).length
          && $scope.savedData.supervisors[data.data.inn] !== undefined) {
  
        $scope.selectedSupervisors = setSelectedSupervisor(data.data.inn);
      } else {
  
        $scope.selectedSupervisors = {
          name: data.data.management.name,
          id: data.data.inn
        };
      }
    };
    
    $scope.setForChanges = (id) => {
      $scope.isSuggestionShow = false;
      $scope.selectedSupervisors = setSelectedSupervisor(id);
    }
  
    $scope.saveData = (data) => {
  
      if ($scope.passport.$valid) {
        $scope.savedDataShow = true;
  
        $scope.savedData.supervisors[data.id] = {
          code: data.code,
          issuedBy: data.issuedBy,
          issuedDate: data.issuedDate,
          name: data.name,
          number: data.number,
        };
      }
    };
  
    function setSelectedSupervisor (id) {
      return Object.assign({},
        $scope.savedData.supervisors[id],
        { id: id },
      );
    }
  }]);

export default MODULE_NAME;
