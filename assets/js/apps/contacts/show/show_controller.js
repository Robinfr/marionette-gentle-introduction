ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
        showContact: function(id){
            var contacts = ContactManager.request('contact:entities', id);

            var contactView;
            if(typeof contact !== 'undefined'){
                contactView = new Show.Contact({
                    model: contact
                });
            }else{
                contactView = new Show.MissingContact();
            }

            ContactManager.mainRegion.show(contactView);
        }
    };
});