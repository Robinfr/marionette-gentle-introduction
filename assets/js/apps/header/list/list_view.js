define(['app',
    'tpl!apps/header/list/templates/header.tpl',
    'tpl!apps/header/list/templates/link.tpl'
], function (ContactManager, headerTpl, linkTpl) {

    ContactManager.module('HeaderApp.List.View', function (View, ContactManager, Backbone, Marionette, $, _) {
        View.Header = Marionette.ItemView.extend({
            template: linkTpl,
            tagName: 'li',

            events: {
                'click a': 'navigate'
            },

            navigate: function (e) {
                e.preventDefault();
                this.trigger('navigate', this.model);
            },

            onRender: function () {
                if (this.model.selected) {
                    this.$el.addClass('active');
                }
            }
        });

        View.Headers = Marionette.CompositeView.extend({
            template: headerTpl,
            className: 'navbar navbar-inverse navbar-fixed-top',
            itemView: View.Header,
            itemViewContainer: 'ul',

            events: {
                'click a.brand': 'brandClicked'
            },

            brandClicked: function (e) {
                e.preventDefault();
                this.trigger('brand:clicked');
            }
        });
    });

    return ContactManager.HeaderApp.List.View;
});