'use strict';
/* Copyright - Infringinator - Rick Blyth - 2019/01/05 */
angular.module('app', ['tableSort']).config(['$compileProvider', function($compileProvider) {
    // ...
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
}]).controller('InfringinatorController', ['$scope', '$timeout', '$window', '$sce', function($scope, $timeout, $window, $sce) {

    function init() {
        chrome.storage.local.get(STORAGE_KEY_SELECTED_PRODUCTS, function(result) {

            console.log('init beginning');
            $scope.$apply(function() {
                $scope.selectedProducts = result.SELECTED_PRODUCTS;
            });
        });


    }




    init();

    $scope.downloadCSV = function() {

    };

}]);