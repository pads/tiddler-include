/*
 * jquery.tiddler-include
 * https://github.com/pads/tiddler-include
 *
 * Copyright (c) 2013 Ben Paddock
 * Licensed under the MIT license.
 */
(function($) {
  //TODO: Turn into a singleton
  var TiddlerInclude = function() {};

  TiddlerInclude.init = function(spaceName) {

    this.spaceName = spaceName;
    this.bagURI = '/bags/' + spaceName + '_public/tiddlers/';
  };

  TiddlerInclude.getSpaceName = function() {

    return this.spaceName;
  };

  TiddlerInclude.getBagURI = function() {

    return this.bagURI;
  };

  $.tiddlerInclude = function(theSpaceName) {

    TiddlerInclude.init(theSpaceName);

    return TiddlerInclude;
  };

  $.fn.tiddlerInclude = function() {
    var element = this;
    var tiddlerTitle = element.data('tiddler');
    $.getJSON(TiddlerInclude.getBagURI() + tiddlerTitle + '.json?render=1', function(data) {
      element.html(data.render);
    });
  };

}(jQuery));
