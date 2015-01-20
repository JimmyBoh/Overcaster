/*
 *  Backbone Views
 */

var buildViews = function(oc, app) {
    "use strict";

    app.log('Building views...');

    app.Views = {};

    app.Views.Body = (function() {
        var _view = Backbone.View.extend({
            el: 'body',
            events: {
                "click a": "interceptHyperlinks",
                "keydown [contenteditable]": "interceptEditables"
            },
            interceptHyperlinks: function(e) {
                var hyperlink = $(e.currentTarget);
                if (hyperlink.is(":internal")) {
                    e.preventDefault();
                    app.navigate(hyperlink.attr("href").replace(window.location
                        .protocol + "//" + window.location.host, ""));
                }
            },
            interceptEditables: function(e) {
                switch (e.which) {
                    case 13:
                        //debugger;
                        $(e.currentTarget).blur();
                        break;
                    case 27:
                        $(e.currentTarget).text('');
                        break;
                }
            }
        });

        return new _view();
    })();

    app.Views.MainNav = (function() {
        var _view = Backbone.View.extend({
            el: 'ul.nav.navbar-nav',
            events: {

            }
        });

        return new _view();
    })();

    app.Views.StreamStatus = (function() {
        var _view = Backbone.View.extend({
            el: '#liveStatus',
            setStatus: function(status) {
                this.$el.attr('class', status);
            }
        });

        return new _view();
    })();

    app.Views.AppStatus = (function() {
        var _view = Backbone.View.extend({
            el: '#appStatus',
            setStatus: function(status) {
                this.$el.html(status);
            }
        });

        return new _view();
    })();

    app.Views.TooltipHint = (function() {
        var _view = Backbone.View.extend({
            el: '#tooltipHint',
            setTooltip: function(status) {
                this.$el.html(status);
            }
        });

        return new _view();
    })();

    app.CopyrightYear = (function() {
        var _view = Backbone.View.extend({
            el: ".current-year",
            initialize: function() {
                var n = this;
                setInterval(function() {
                        n.$el.text((new Date).getFullYear())
                    }, 6e4) // 60 seconds...
            }
        });
        return new _view();
    })();


    //#region Main Pages

    app.Views.MainPageView = (function() {
        return Backbone.View.extend({
            el: '#main-content',
            pageUrl: '',
            templateSelector: '',
            template: function(model) {
                if (!this._template)
                    this._template = Handlebars.compile($(this.templateSelector)
                        .remove().html());

                return this._template(model);
            },
            render: function(model) {
                model = model || {};

                var mainNav = $('#main-nav');
                mainNav.find('.active').removeClass('active');
                mainNav.find('.main-page-link > a[href^="' + this.pageUrl +
                    '"]').closest('li').addClass('active');

                this.$el.html(this.template(model));
            }
        });
    })();

    app.Views.Start = (function() {
        var _view = app.Views.MainPageView.extend({
            templateSelector: '#start-page-template',
            pageUrl: '/start'
        });

        return new _view();
    })();

    app.Views.Scenes = (function() {
        var _view = app.Views.MainPageView.extend({
            templateSelector: '#scenes-page-template',
            pageUrl: '/scenes'
        });

        return new _view();
    })();

    app.Views.SceneEditor = (function() {
        var _view = app.Views.MainPageView.extend({
            templateSelector: '#scene-editor-template',
            pageUrl: '/scene-editor',
            events: {

            },
            saveScene: function() {

            }
        });

        return new _view();
    })();

    app.Views.Resources = (function() {
        var _view = app.Views.MainPageView.extend({
            templateSelector: '#resources-page-template',
            pageUrl: '/resources'
        });

        return new _view();
    })();

    app.Views.Elements = (function() {
        var _view = app.Views.MainPageView.extend({
            templateSelector: '#elements-page-template',
            pageUrl: '/elements'
        });

        return new _view();
    })();

    app.Views.Settings = (function() {
        var _view = app.Views.MainPageView.extend({
            templateSelector: '#settings-page-template',
            pageUrl: '/settings'
        });

        return new _view();
    })();

    //#endregion

    $(function() {

        //$('.navbar a[href="' + window.location.pathname + '"]').closest('li').addClass('active');
    });
};