define(['app', 'apps/contacts/show/show_view', 'common/views'], function (ContactManager, View, CommonViews) {

    ContactManager.module('ContactsApp.Show', function (Show, ContactManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showContact: function (id) {
                var loadingView = new CommonViews.Loading({
                    title: 'Artificial Loading Delay',
                    message: 'Data loading is delayed to demonstrate using a loading view.'
                });
                ContactManager.mainRegion.show(loadingView);

                require(['entities/contact'], function () {
                    var fetchingContact = ContactManager.request('contact:entity', id);
                    $.when(fetchingContact).done(function (contact) {
                        var contactView;
                        if (typeof contact !== 'undefined') {
                            contactView = new View.Contact({
                                model: contact
                            });

                            contactView.on('contact:edit', function (contact) {
                                ContactManager.trigger('contact:edit', contact.get('id'));
                            });
                        } else {
                            contactView = new View.MissingContact();
                        }

                        ContactManager.mainRegion.show(contactView);
                    });
                });
            }
        };
    });

    return ContactManager.ContactsApp.Show.Controller;

});