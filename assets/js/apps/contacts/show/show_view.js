define(['app',
'tpl!apps/contacts/show/templates/show.tpl',
'tpl!apps/contacts/show/templates/missing.tpl',
], function (ContactManager, showTpl, missingTpl) {
    ContactManager.module('ContactsApp.Show.View', function (View, ContactManager, Backbone, Marionette, $, _) {
        View.MissingContact = Marionette.ItemView.extend({
            template: missingTpl
        });

        View.Contact = Marionette.ItemView.extend({
            template: showTpl,

            events: {
                'click a.js-edit': 'editClicked'
            },

            editClicked: function (e) {
                e.preventDefault();
                this.trigger('contact:edit', this.model);
            }
        });
    });

    return ContactManager.ContactsApp.Show.View;
});