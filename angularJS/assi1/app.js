(function () {
'use strict';

angular.module('FoodCalculator', [])
.controller('FoodCalculatorController', FoodCalculatorController);

//line to avoid minifiying error
FoodCalculatorController.$inject = ['$scope'];

function FoodCalculatorController ($scope) {
  $scope.foodList = "";
  $scope.totalValue = "";

  $scope.displayMsg = function () {
    var myArr = checkFood($scope.foodList);
    $scope.totalValue = myArr[0];
    $scope.myColor = myArr[1];
  };

function checkFood(string) {
const foods = string.split(',').filter(x => x);;
//filter allow ignore of empty stuff
const foodcount = foods.length;

  if (foods=="") return ["Please enter data first","red"];
  else if (foodcount<4) return ["Enjoy!","green"];
  else return ["Too much!","green"];
}
}


})();
