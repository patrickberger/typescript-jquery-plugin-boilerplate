/*!
 * Project: typescript-jquery-plugin-boilerplate
 * Author: Patrick Berger
 * Version: 0.1.0
 * Date: March 14th, 2015
 * Copyright (C) 2015
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {

    'use strict';

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.
    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    var pluginNamespace;
    (function (pluginNamespace) {
        var Plugin = (function () {
            function Plugin(element, options) {
                this._el = element;
                this._$el = $(element);
                this.init();
            }
            Plugin.prototype.init = function () {
                this._$el.on('click', function () {
                    alert('Clicked');
                });
            };
            Plugin.NAME = 'pluginName';
            return Plugin;
        })();
        pluginNamespace.Plugin = Plugin;
    })(pluginNamespace || (pluginNamespace = {}));
    $.fn[pluginNamespace.Plugin.NAME] = function (options) {
        return this.each(function () {
            new pluginNamespace.Plugin(this, options);
        });
    };

})(jQuery, window, document);
