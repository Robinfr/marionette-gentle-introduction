ContactManager.module('Common.Views', function (Views, ContactManager, Backbone, Marionette, $, _) {
    Views.Loading = Marionette.ItemView.extend({
        template: '#loading-view',

        initialize: function (options) {
            var options = options || {};
            this.title = options.title || "Loading Data";
            this.message = options.message || "Please wait, data is loading.";
        },

        serializeData: function () {
            return {
                title: this.title,
                message: this.message
            }
        },

        onShow: function () {
            var opts = {
                lines: 13,
                length: 20,
                width: 10,
                radius: 30,
                corners: 1,
                rotate: 0,
                direction: 1,
                color: '#000',
                speed: 1,
                trail: 60,
                shadow: false,
                hwaccel: false,
                className: 'spinner',
                zIndex: 2e9,
                top: '30px',
                left: 'auto'
            };

            $('#spinner').spin(opts);
        }
    });

    Views.Form = Marionette.ItemView.extend({
        template: '#contact-form',

        events: {
            'click button.js-submit': 'submitClicked'
        },

        submitClicked: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        },

        onRender: function () {
            if (!this.options.asModal) {
                var $title = $('<h1>', {text: this.title});
                this.$el.prepend($title);
            }
        },

        onShow: function () {
            if (this.options.asModal) {
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: 'auto'
                });
            }
        },

        submitClicked: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        },

        onFormDataInvalid: function (errors) {
            var $view = this.$el;

            var clearFormErrors = function () {
                var $form = $view.find('form');
                $form.find('.help-inline.error').each(function () {
                    $(this).remove();
                });
                $form.find('.control-group.error').each(function () {
                    $(this).removeClass('error');
                });
            }

            var markErrors = function (value, key) {
                var $controlGroup = $view.find('#contact-' + key).parent();
                var $errorEl = $('<span>', {class: 'help-inline error', text: value});
                $controlGroup.append($errorEl).addClass('error');
            }

            clearFormErrors();
            _.each(errors, markErrors);
        }
    });
});