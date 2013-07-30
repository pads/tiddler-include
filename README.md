[![Build Status](https://travis-ci.org/pads/tiddler-include.png)](https://travis-ci.org/pads/tiddler-include)
[![Coverage Status](https://coveralls.io/repos/pads/tiddler-include/badge.png)](https://coveralls.io/r/pads/tiddler-include)

# Tiddler Include

Easily include Tiddlers in your TiddlyWeb or TiddlySpace webpages via AJAX

# Usage

To do - the API is being designed as development goes along.

# Development

## Requirements

* [node](http://nodejs.org/)
* [grunt](http://gruntjs.com/)
* bower: `npm install -g bower`
* [tsapp](http://tsapp.tiddlyspace.com/) - optional, for testing out the plugin in a TiddlySpace environment.

## First Time Setup

Install the project dependencies then run the grunt default task.

```
npm install
grunt
```

This task:

* Downloads source and test JS dependencies via bower.
* Cleans the `dist` directory.
* Lints the JS files.
* Runs the unit tests via PhantomJS.
* Concatonates and minifies the plugin file for distribution.
* Copies the contents of the `dist` folder into the `tsapp/assets` folder to run in a TiddlySpace app.

## Testing

### Unit Testing

`grunt test` to run in the terminal.

`grunt jasmine:default:build` to generate a HTML file to run tests in a browser.

### Manual Testing

`grunt`
`cd tsapp`
`tsapp serve`

Open `http://localhost:8080/index.html` in your browser.

# Credit

* Design inspiration: https://github.com/shichuan/javascript-patterns
* AJAX include pattern: https://github.com/filamentgroup/Ajax-Include-Pattern