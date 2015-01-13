'use strict';

describe('floating-label directive', function () {

    var $injector, $compile, $rootScope, $scope;

    beforeEach(module('components'));

    beforeEach(inject(function (_$injector_, _$compile_, _$rootScope_) {
        $injector = _$injector_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    it('should require a placeholder', function () {
        var element = angular.element('<div floating-label></div>');

        expect(function () {
            $compile(element)($scope);
            $scope.$digest();
        }).toThrow('Floating label needs a placeholder');

    });

    it('should return a new element with a label and input field', function () {
        var element = angular.element('<div><div floating-label ng-model="test" placeholder="test"></div></div>');

        $compile(element)($scope);
        $scope.$digest();

        expect(element[0].querySelectorAll('.floating-label').length).toEqual(1);
        expect(element[0].querySelectorAll('label').length).toEqual(1);
        expect(element[0].querySelectorAll('input').length).toEqual(1);
    });

    it('should require an id or a name if no ng-model was defined', function () {
        var element = angular.element('<div><div floating-label placeholder="test"></div></div>');

        expect(function () {
            $compile(element)($scope);
            $scope.$digest();
        }).toThrow('If no ng-model is defined, the input should have an id or a name');


        element = angular.element('<div><div id="test" floating-label placeholder="test"></div></div>');

        expect(function () {
            $compile(element)($scope);
            $scope.$digest();
        }).not.toThrow();


        element = angular.element('<div><div name="test" floating-label placeholder="test"></div></div>');

        expect(function () {
            $compile(element)($scope);
            $scope.$digest();
        }).not.toThrow();
    });

    it('should require a name if no ng-model or id was defined', function () {
        var element = angular.element('<div><div floating-label placeholder="test"></div></div>');

        expect(function () {
            $compile(element)($scope);
            $scope.$digest();
        });
    });

    it('should generate an ng-model if none was provided', function () {
        var element = angular.element('<div><div id="test" floating-label placeholder="test"></div></div>');

        $compile(element)($scope);
        $scope.$digest();

        expect(element[0].querySelector('input').getAttribute('ng-model')).not.toEqual(null);
    });

    it('should copy over attributes from the original element', function () {
        var element = angular.element('<div><div ng-model="test" some-attr="true" more="nope" floating-label placeholder="test"></div></div>');
        var input;

        $compile(element)($scope);
        $scope.$digest();

        input = element[0].querySelector('input');

        expect(input.getAttribute('some-attr')).toEqual('true');
        expect(input.getAttribute('more')).toEqual('nope');
    });

    it('should create a new scope', function () {
        var element = angular.element('<div><div ng-model="test" floating-label placeholder="test"></div></div>');
        var directiveScope;

        $compile(element)($scope);
        $scope.$digest();

        directiveScope = angular.element(element[0].querySelector('.floating-label')).scope();

        expect(directiveScope.$id).not.toEqual($scope.$id);
    });

    it('should set the value of showLabel to true when the model is filled in', function () {

        var element = angular.element('<div><div ng-model="test" floating-label placeholder="test"></div></div>');
        var input;
        var directiveScope;

        $compile(element)($scope);
        $scope.$digest();

        input = element[0].querySelector('input');
        directiveScope = angular.element(input).scope();
        directiveScope.test = 'test';
        $scope.$digest();

        expect(directiveScope.showLabel).toBeTruthy();
    });

    it('should set the value of showLabel to false when the model is filled in', function () {
        var element = angular.element('<div><div ng-model="test" floating-label placeholder="test"></div></div>');
        var input;
        var directiveScope;

        $compile(element)($scope);
        $scope.$digest();

        input = element[0].querySelector('input');
        directiveScope = angular.element(input).scope();
        directiveScope.test = '';
        $scope.$digest();

        expect(directiveScope.showLabel).toBeFalsy();
    });

    it('should add a class on the label when showLabel is true', function () {
        var element = angular.element('<div><div ng-model="test" floating-label placeholder="test"></div></div>');
        var input;
        var label;
        var directiveScope;

        $compile(element)($scope);
        $scope.$digest();

        input = element[0].querySelector('input');
        directiveScope = angular.element(input).scope();
        directiveScope.showLabel = true;
        directiveScope.$digest();

        label = element[0].querySelector('label');

        expect(label.className.indexOf('active')).toBeGreaterThan(-1);
    });

    it('should remove the class on the label when showLabel is true', function () {
        var element = angular.element('<div><div ng-model="test" floating-label placeholder="test"></div></div>');
        var input;
        var label;
        var directiveScope;

        $compile(element)($scope);
        $scope.$digest();

        input = element[0].querySelector('input');
        directiveScope = angular.element(input).scope();
        directiveScope.showLabel = false;
        directiveScope.$digest();

        label = element[0].querySelector('label');

        expect(label.className.indexOf('active')).toEqual(-1);
    });

});