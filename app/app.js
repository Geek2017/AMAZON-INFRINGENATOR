'use strict';

angular.module("app", [])
    .directive("releaseFocus", function () {
        return {
            link: function (scope, element, attrs) {
                element.on("mouseup", function () {
                    element.blur();
                });
            }
        };
    })
