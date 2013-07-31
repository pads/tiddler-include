/*
 * jquery.tiddler-include
 * https://github.com/pads/tiddler-include
 *
 * Copyright (c) 2013 Ben Paddock
 * Licensed under the MIT license.
 */
(function($) {

  var TiddlerInclude = {

    init: function(element) {

      this.$element = $(element);
      this.tiddlerTitle = this.$element.data('tiddler');
      this.bagName = this.$element.data('bag');
      this.bagURI = '/bags/' + this.bagName + '/tiddlers';

      this.$element.empty();
    },
    loadTiddler: function() {

      var instance = this;
      $.getJSON(instance.bagURI + '/' + instance.tiddlerTitle + '.json?render=1', function(tiddler) {
        instance.$element.html(tiddler.render);
      });
    },
    loadBag: function() {

      var instance = this;
      $.getJSON(instance.bagURI + '.json?render=1', function(data) {
        $(data).each(function(index, tiddler) {
          instance.$element.append('<div class="tiddler">' + tiddler.render + '</div>');
        });
      });
    },
    determineAction: function() {

      if(this.tiddlerTitle) {
        this.loadTiddler();
      } else {
        this.loadBag();
      }
    }
  };

  $.fn.tiddlerInclude = function() {

    return this.each(function () {

      var $element = $(this);
      var tiddlerInclude = Object.create(TiddlerInclude);

      tiddlerInclude.init($element);
      tiddlerInclude.determineAction();

      $.data(this, 'tiddler-include', tiddlerInclude);
    });
  };

}(jQuery));
