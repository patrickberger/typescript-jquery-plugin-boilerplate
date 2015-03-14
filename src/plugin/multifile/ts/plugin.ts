/// <reference path="../declaration/jquery.d.ts" />

module pluginNamespace {

    /**
     * A sample jQuery plugin written in Typescript.
     */
    export class Plugin
    {

        public static NAME: string = 'pluginName';

        private _el: Element;
        private _$el: JQuery;
        private _settings: any;

        /**
         * Initializes a new instance of the `PluginName` plugin.
         *
         * @param element   The DOM element.
         * @param options   Plugin options.
         */
        constructor(element: Element, options: any)
        {
            this._el = element;
            this._$el = $(element);

            this.init();
        }

        /**
         * Initialization.
         */
        public init() : void
        {
            this._$el.on('click', () => {
                alert('Clicked');
            });
        }
    }

}