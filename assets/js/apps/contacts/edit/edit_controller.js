define(['app', 'common/views', 'apps/contacts/edit/edit_view', 'apps/contacts/show/show_view'], function (ContactManager, CommonViews, View, ShowView) {

    ContactManager.module('ContactsApp.Edit', function (Edit, ContactManager, Backbone, Marionette, $, _) {
        Edit.Controller = {
            editContact: function (id) {
                var loadingView = new CommonViews.Loading({
                    title: 'Artificial Loading Delay',
                    message: 'Data loading is delayed to demonstrate using a loading view.'
                });
                ContactManager.mainRegion.show(loadingView);

                require(['entities/contact/collection'], function () {
                    var fetchingContact = ContactManager.request('contact:entity', id);
                    $.when(fetchingContact).done(function (contact) {
                        var view;
                        if (typeof contact !== 'undefined') {
                            view = new View.Contact({
                                model: contact,
                                generateTitle: true
                            });

                            view.on('form:submit', function (data) {
                                if (contact.save(data)) {
                                    ContactManager.trigger('contact:show', contact.get('id'));
                                } else {
                                    view.triggerMethod('form:data:invalid', contact.validationError);
                                }
                            });
                        } else {
                            view = new ShowView.MissingContact();
                        }

                        ContactManager.mainRegion.show(view);
                    });
                });
            }
        };
    });

    return ContactManager.ContactsApp.Edit.Controller;
});