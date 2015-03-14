/*!
 * Project: typescript-jquery-plugin-boilerplate
 * Author: Patrick Berger
 * Version: 0.1.0
 * Date: March 14th, 2015
 * Copyright (C) 2015
 */
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
(function ($, window, document) {
    $.fn[pluginNamespace.Plugin.NAME] = function (options) {
        return this.each(function () {
            new pluginNamespace.Plugin(this, options);
        });
    };
})(jQuery, window, document);
