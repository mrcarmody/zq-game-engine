'use strict';

angular.module('mean').directive('ngZombieMap', [ '$compile', function ($compile) {
    return {
        scope: {
            model: '='
        },
        restrict: 'A',
        link: function (scope, element, attrs) {
            var el = '<div class="map-container">';

            // each row (map.sizex)
            for (var y=0;y<scope.model.sizey;y++) {
                for (var x=0;x<scope.model.sizex;x++) {
                    el += '<div class="map-tile"></div>';
                }
                el += '<div class="line-break"></div>';
            }

            el += '</div>';

            $compile(el)(scope);
            element.append(el);


        }
    };
}]);
