define(['jquery', 'backbone', 'app', 'entities/contact/model', 'apps/config/storage/localstorage'],
    function ($, Backbone, ContactManager, ContactModel, configureStorage) {
        var ContactCollection = Backbone.Collection.extend({
            url: 'contacts',
            model: ContactModel,
            comparator: 'firstName'
        });

        configureStorage(ContactCollection);

        var initializeContacts = function () {
            var contacts = new ContactCollection([
                {id: 1, firstName: 'Alice', lastName: 'Arten', phoneNumber: '555-0184'},
                {id: 2, firstName: 'Bob', lastName: 'Brigham', phoneNumber: '555-0163'},
                {id: 3, firstName: 'Charlie', lastName: 'Campbell', phoneNumber: '555-0129'}
            ]);
            contacts.forEach(function (contact) {
                contact.save();
            });
            return contacts.models;
        };

        var API = {
            getContactEntities: function () {
                var contacts = new ContactCollection();
                var defer = $.Deferred();
                contacts.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });

                var promise = defer.promise();
                $.when(promise).done(function (contacts) {
                    if (contacts.length === 0) {
                        var models = initializeContacts();
                        contacts.reset(models);
                    }
                });

                return promise;
            }
        };

        ContactManager.reqres.setHandler('contact:entities', function () {
            return API.getContactEntities();
        });

        return ContactCollection;
    }
);