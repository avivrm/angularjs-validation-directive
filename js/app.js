angular.module('myApp', [])
    .controller('MainCtrl', function ($scope) {
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.userEmailValidations = [
            {validation:'required', message:'Please enter an email.'},
            {validation:'email', message:'This is not a valid email.'}
        ];

        $scope.userPasswordValidations = [
            {validation:'required', message:'Please enter a password.'},
            {validation:'minlength', message:'Passwords must be at least 6 characters in length.'},
            {validation:'maxlength', message:'Passwords must be no more than 10 characters in length.'}
        ];
    })
    .directive('inputValidate', function ($compile) {
        var linker = function (scope, element, attrs) {
            var validationHTML = '<div class="alert alert-danger" ng-show="formElement.$dirty && formElement.$invalid">';
            angular.forEach(scope.validations, function(v){
                validationHTML += '<span ng-show="formElement.$error.' + v.validation + '">' + v.message + '</span>';
            })
            validationHTML += '</div>';

            validationHTML = angular.element(validationHTML);
            $compile(validationHTML)(scope);
            element.html(validationHTML);
        };

        return {
            scope: {
                validations: '=',
                formElement: '='
            },
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            link: linker
        }
    });