ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
    List.Contact = Marionette.ItemView.extend({
        template: '#contact-list-item',
        tagName: 'tr'
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className:'table table-hover',
        template: '#contact-list',
        itemView: List.Contact,
        itemViewContainer: 'tbody'
    });
});