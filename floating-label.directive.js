//
//
// A "Floating Label" directive using the placeholder attribute
// Based on https://github.com/jverdi/JVFloatLabeledTextField and https://github.com/maman/JVFloat.js
//
// By @klaascuvelier (http://www.klaascuvelier.be)
//
//
(function (angular) {
    'use strict';

    angular
        .module('components')
        .directive('floatingLabel', [
            '$rootScope',
            function floatingLabel($rootScope) {

                /**
                 * generate an NgModel key for the input box using it's attributes (id/name)
                 * @param {angualr.element} inputBox
                 * @return {string}
                 */
                function generateNgModelKey(inputBox) {
                    var inputId = inputBox.attr('id') || '',
                        inputName = inputBox.attr('name') || '';

                    return 'input_' + (inputId ? inputId : inputName);
                }

                return {
                    restrict: 'A',
                    scope: true,
                    compile: function ($element, $attrs) {

                        var templateAttributes = [],
                            template, attr;

                        // if there is no placeholder, there is no use for this directive
                        if (!$attrs.placeholder) {
                            return;
                        }

                        // copy existing attributes from
                        for (attr in $attrs) {
                            if ($attrs.hasOwnProperty(attr) && attr.substr(0, 1) !== '$') {
                                templateAttributes.push(attr + '="' + $attrs[attr] + '"');
                            }
                        }

                        // if there wasn't a ngModel binded to input, generate a key for the ngModel and add it
                        if (!$attrs.ngModel) {
                            templateAttributes.push('ng-model="' + generateNgModelKey($element) + '"')
                        }

                        // html template for the directive
                        template = '<div class="floating-label">' +
                                '<label ng-class="{ \'active\': showLabel }">' + $attrs.placeholder + '</label>'+
                                '<input ' + templateAttributes.join(' ') + ' />' +
                            '</div>';

                        $element.replaceWith(angular.element(template));

                        return {
                            // add a link function to observe the ngModel and show/hide the label
                            post: function ($scope, $element, $attrs) {

                                var inputBox = $element.find('input'),
                                    ngModelKey = inputBox.attr('ng-model');

                                $scope.$watch(ngModelKey, function (newValue) {
                                    // if the field is not empty, show the label, otherwise hide it
                                    $scope.showLabel = newValue && newValue.length > 0;
                                });
                            }
                        }
                    }
                };
            }
        ]);
})(angular);