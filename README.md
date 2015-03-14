# Typescript jQuery Plugin Boilerplate

A kickstart template to develop jQuery plugins in Typescript using Grunt and Brackets editor. Based on [jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate).

## Simple version

This flavour of the boilerplate uses a single file to store all the Typescript code inside. In contrast to jQuery's approach to wrap the whole implementation into a single scope only the `$.fn. ... = ` extension of jQuery's function namespace is wrapped. This exposes the implementation and allows re-using, subclassing and so on.

See folder `src/plugin/simple` and according declarations named `simple` in `Gruntfile.js`.

## Multi-file version

This flavour is a somehow more object oriented approach and allows to have one file per class, etc. The whole implementation is scoped as of jQuery's standard plugin development approach. This is done after compilation by a concatenation task using grunt. See folder `src/plugin/multifile/template` for header and footer declaration.

See folder `src/plugin/multifile` and according declarations named `multifile` in `Gruntfile.js`.