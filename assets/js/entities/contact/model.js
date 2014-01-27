define(['jquery', 'backbone', 'app', 'apps/config/storage/localstorage'],
    function ($, Backbone, ContactManager, configureStorage) {

        var Contact = Backbone.Model.extend({
            urlRoot: 'contacts',

            defaults: {
                firstName: '',
                lastName: '',
                phoneNumber: ''
            },

            validate: function (attrs, options) {
                var errors = {};
                if (!attrs.firstName) {
                    errors.firstName = "can't be blank";
                }
                if (!attrs.lastName) {
                    errors.lastName = "can't be blank";
                } else if (attrs.lastName.length < 2) {
                    errors.lastName = "is too short";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        configureStorage(Contact);

        var API = {
            getContactEntity: function (contactId) {
                var contact = new Contact({id: contactId});
                var defer = $.Deferred();
                setTimeout(function () {    //Artificial data latency
                    contact.fetch({
                        success: function (data) {
                            defer.resolve(data);
                        },
                        error: function () {
                            defer.resolve(undefined);
                        }
                    });
                }, 2000);
                return defer.promise();
            }
        };

        ContactManager.reqres.setHandler('contact:entity', function (id) {
            return API.getContactEntity(id);
        });

        ContactManager.reqres.setHandler('contact:entity:new', function(){
            return new Contact();
        });

        return Contact;
    }
);