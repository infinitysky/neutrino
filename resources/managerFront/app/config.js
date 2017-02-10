System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _settings;
    return {
        setters:[],
        execute: function() {
            exports_1("_settings", _settings = {
                buildPath: 'scripts/build',
                serverURl: '127.0.0.1',
                //office
                //baseUrl:'http://'+'127.0.0.1'+'/iiYum/NanLi_Dev/reportsystembeautify/masterPage'+'/magerConfig/index.php'
                baseUrl: 'http://' + '127.0.0.1' + '/reportsystembeautify/masterPage' + '/magerConfig/index.php'
            });
        }
    }
});
