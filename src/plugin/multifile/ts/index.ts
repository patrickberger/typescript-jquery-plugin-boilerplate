/// <reference path="../declaration/jquery.d.ts" />
/// <reference path="plugin.ts" />

$.fn[pluginNamespace.Plugin.NAME] = function(options: any) {

    return this.each(function() {
        new pluginNamespace.Plugin(this, options);
    });

};