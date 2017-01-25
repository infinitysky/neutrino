System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DatabasesClass;
    return {
        setters:[],
        execute: function() {
            DatabasesClass = (function () {
                function DatabasesClass(store_code, db_name, validate_code) {
                    this.store_code = store_code;
                    this.db_name = db_name;
                    this.validate_code = validate_code;
                }
                return DatabasesClass;
            }());
            exports_1("DatabasesClass", DatabasesClass);
        }
    }
});
