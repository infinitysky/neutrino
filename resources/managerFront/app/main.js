System.register(['angular2/platform/browser', './component/foundation.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, foundation_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (foundation_component_1_1) {
                foundation_component_1 = foundation_component_1_1;
            }],
        execute: function() {
            //import {enableProdMode} from 'angular2/core';
            //enableProdMode();
            browser_1.bootstrap(foundation_component_1.Foundation);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
