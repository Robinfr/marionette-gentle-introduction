define(['app', 'tpl!apps/about/show/templates/about.tpl'], function (ContactManager, aboutTpl) {
    ContactManager.module('AboutApp.Show.View', function (View, ContactManager, Backbone, Marionette, $, _) {
        View.Message = Marionette.ItemView.extend({
            template: aboutTpl
        });
    });

    return ContactManager.AboutApp.Show.View;
});