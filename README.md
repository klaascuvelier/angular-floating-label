[![GitHub version](https://badge.fury.io/gh/klaascuvelier%2Fangular-angular-floating-label.svg)](http://badge.fury.io/gh/klaascuvelier%2Fangular-floating-label)
[![Bower version](https://badge.fury.io/bo/angular-floating-label.svg)](http://badge.fury.io/bo/angular-floating-label)
[![NPM version](https://badge.fury.io/js/angular-floating-label.svg)](http://badge.fury.io/js/angular-floating-label)

[![Build Status](https://travis-ci.org/klaascuvelier/angular-floating-label.svg)](https://travis-ci.org/klaascuvelier/angular-floating-label)


angular-floating-label
======================

Angular directive creating a "floating label" for inputs with a placeholder. Based on: https://github.com/jverdi/JVFloatLabeledTextField and https://github.com/maman/JVFloat.js


# Changelog
[See changelog](CHANGELOG.md)


# Usage
Add the js file to your html file, optionally add the css file as well.

Add `components` to your angular dependencies and then just add `floating-label` as an attribute on your input fields.
 
`floating-label` requires a placeholder attribute, which will be used as label. 
Optionally you can specify an `ng-model`, if you don't specify it, you are required to add the `id` or the `name` attribute.
  
# Examples

    <html>
        <head>
            <link rel="stylesheet" type="text/css" href="../dist/floating-label.css">
        </head>
        
        <body ng-app="demo">
       
           <form>
               <div class="control-group">
                   <input type="text" placeholder="Email address" floating-label ng-model="test" />
               </div>
           </form>
   
   
            <script src="bower_components/angular/angular.js"></script>
            <script src="bower_components/angular-floating-label/dist/floating-label.js"></script>
    
            <script>
                angular.module('demo', ['components']);
                angular.module('demo').controller('DemoController', function () {});
            </script>
        </body>
    </html>

More examples in the example folder