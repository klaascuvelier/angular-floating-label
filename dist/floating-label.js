(function initModule (angular) {
    'use strict';
    angular.module('components', []);
})(window.angular);

//
//
// A "Floating Label" directive using the placeholder attribute
// Based on https://github.com/jverdi/JVFloatLabeledTextField and https://github.com/maman/JVFloat.js
//
// By @klaascuvelier (http://www.klaascuvelier.be)
//
//
(function initDirective (angular) {
    'use strict';

    /**
     * generate an NgModel key for the input box using it's attributes (id/name)
     * @param {angular.element} inputBox
     * @returns {string}
     */
    function generateNgModelKey (inputBox) {
        var inputId = inputBox.attr('id') || '';
        var inputName = inputBox.attr('name') || '';

        if (inputId.length === 0 && inputName.length === 0) {
            throw new Error('If no ng-model is defined, the input should have an id or a name');
        }

        return 'input_' + inputId || inputName;
    }

    /**
     * Angular compile method
     * @param {angular.element} $element
     * @param {angular.attrs} $attrs
     * @returns {object}
     */
    function floatingLabelCompileFunction ($element, $attrs)
    {
        var templateAttributes = [];
        var template = null;
        var attr = null;

        // if there is no placeholder, there is no use for this directive
        if (!$attrs.placeholder) {
            throw new Error('Floating label needs a placeholder');
        }

        // copy existing attributes from
        for (attr in $attrs) {
            if ($attrs.hasOwnProperty(attr) && attr.substr(0, 1) !== '$' && attr !== 'floatingLabel') {
                templateAttributes.push($attrs.$attr[attr] + '="' + $attrs[attr] + '"');
            }
        }

        // if there wasn't a ngModel binded to input, generate a key for the ngModel and add it
        if (!$attrs.ngModel) {
            templateAttributes.push('ng-model="' + generateNgModelKey($element) + '"');
        }

        // html template for the directive
        template = '<div class="floating-label">' +
                '<label ng-class="{ \'active\': showLabel }">' + $attrs.placeholder + '</label>' +
                '<input ' + templateAttributes.join(' ') + ' />' +
            '</div>';

        $element.replaceWith(angular.element(template));

        return {
            post: floatingLabelPostCompileFunction
        };
    }

    // Add DI
    floatingLabelCompileFunction.$inject = [ '$element', '$attrs' ];

    /**
     * Post compile method
     * @param {angular.scope} $scope
     * @param {angular.element} $element
     */
    function floatingLabelPostCompileFunction ($scope, $element)
    {
        var inputBox = $element.find('input');
        var ngModelKey = inputBox.attr('ng-model');

        $scope.showLabel = false;

        $scope.$watch(ngModelKey, function modelKeyWatcher (newValue) {
            // if the field is not empty, show the label, otherwise hide it
            $scope.showLabel = newValue !== undefined && newValue.toString().length > 0;
        });
    }

    // Add DI
    floatingLabelPostCompileFunction.$inject = [ '$scope', '$element' ];

    /**
     * Return the definition for this directive
     * @returns {Object}
     */
    function floatingLabelDefinition () {

        return {
            restrict: 'A',
            scope: true,
            compile: floatingLabelCompileFunction
        };

    }

    // Create
    angular
        .module('components')
        .directive('floatingLabel', floatingLabelDefinition);
})(window.angular);
