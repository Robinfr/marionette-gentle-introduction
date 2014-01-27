requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        backbone: 'vendor/backbone',
        jquery: 'vendor/jquery',
        'jquery-ui': 'vendor/jquery-ui',
        json2: 'vendor/json2',
        underscore: 'vendor/underscore',
        marionette: 'vendor/backbone.marionette',
        localStorage: 'vendor/backbone.localstorage',
        picky: 'vendor/backbone.picky',
        syphon: 'vendor/backbone.syphon',
        tpl: 'vendor/tpl',
        spin: 'vendor/spin',
        'jquery.spin': 'vendor/jquery.spin'
    },

    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },

        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'jquery-ui': ['jquery'],
        'localStorage': ['backbone'],
        'jquery.spin': ['spin']
    }
});

require(['app', 'apps/header/header_app'], function(ContactManager){
    ContactManager.start();
});