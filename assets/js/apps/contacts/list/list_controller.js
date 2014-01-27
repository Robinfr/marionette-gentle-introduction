define(['app', 'apps/contacts/list/list_view'], function (ContactManager, View) {
    ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listContacts: function (criterion) {
                /*var loadingView = new ContactManager.Common.Views.Loading();
                 ContactManager.mainRegion.show(loadingView);*/

                require(['entities/contact'], function () {

                    var fetchingContacts = ContactManager.request('contact:entities');

                    var contactsListLayout = new View.Layout();
                    var contactsListPanel = new View.Panel();

                    $.when(fetchingContacts).done(function (contacts) {
                        /*var filteredContacts = ContactManager.Entities.FilteredCollection({
                         collection: contacts,
                         filterFunction: function (filterCriterion) {
                         var criterion = filterCriterion.toLowerCase();
                         return function (contact) {
                         if (contact.get('firstName').toLowerCase().indexOf(criterion) !== -1
                         || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1
                         || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1) {
                         return contact;
                         }
                         }
                         }
                         });*/
                        var filteredContacts = contacts;

                        if (criterion) {
                            filteredContacts.filter(criterion);
                            contactsListPanel.once('show', function () {
                                contactsListPanel.triggerMethod('set:filter:criterion', criterion);
                            });
                        }


                        var contactsListView = new View.Contacts({
                            collection: filteredContacts
                        });

                        contactsListLayout.on('show', function () {
                            contactsListLayout.panelRegion.show(contactsListPanel);
                            contactsListLayout.contactsRegion.show(contactsListView);

                            contactsListPanel.on('contact:new', function () {
                                require(['apps/contacts/new/new_view'], function (NewView) {
                                    var newContact = ContactManager.request('contact:entity:new');

                                    var view = new NewView.Contact({
                                        model: newContact
                                    });

                                    view.on('form:submit', function (data) {
                                        var highestId = contacts.max(function (c) {
                                            return c.id;
                                        });
                                        highestId = highestId.get('id');
                                        data.id = highestId + 1;
                                        if (newContact.save(data)) {
                                            contacts.add(newContact);
                                            view.trigger('dialog:close');
                                            var newContactView = contactsListView.children.findByModel(newContact);

                                            if (newContactView) { //Check if not hidden by filter
                                                newContactView.flash('success');
                                            }
                                        } else {
                                            view.triggerMethod('form:data:invalid', newContact.validationError);
                                        }
                                    });

                                    ContactManager.dialogRegion.show(view);
                                });
                            });
                        });

                        contactsListPanel.on('contacts:filter', function (filterCriterion) {
                            filteredContacts.filter(filterCriterion);
                            ContactManager.trigger('contacts:filter', filterCriterion);
                        });

                        contactsListView.on('itemview:contact:delete', function (childView, model) {
                            model.destroy();
                        });

                        contactsListView.on('itemview:contact:show', function (childView, model) {
                            ContactManager.trigger('contact:show', model.get('id'));
                        });

                        contactsListView.on('itemview:contact:edit', function (childView, model) {
                            require(['apps/contacts/edit/edit_view'], function (EditView) {
                                var view = new EditView.Contact({
                                    model: model
                                });

                                view.on('form:submit', function (data) {
                                    if (model.save(data)) {
                                        childView.render();
                                        view.trigger('dialog:close');
                                        childView.flash('success');
                                    } else {
                                        view.triggerMethod('form:data:invalid', model.validationError);
                                    }
                                });

                                ContactManager.dialogRegion.show(view);
                            });
                        });

                        ContactManager.mainRegion.show(contactsListLayout);
                    });
                });
            }
        }
    });

    return ContactManager.ContactsApp.List.Controller;
});