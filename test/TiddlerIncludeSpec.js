describe('Tiddler Include', function() {

	describe('TidderInclude Object', function() {

		it('should be obtainable from the jQuery selector object as data', function() {

			var tiddlerInclude = $('body').tiddlerInclude().data('tiddler-include');

			expect(tiddlerInclude).not.toBe(null);
		});
	});

	describe('TiddlerInclude Plugin', function() {

		afterEach(function() {

			if($.ajax.restore) {
				$.ajax.restore();
			}
			if($.fn.data.restore) {
				$.fn.data.restore();
			}
			if($.fn.html.restore) {
				$.fn.html.restore();
			}
		});

		it('should be defined', function() {

			expect($.fn.tiddlerInclude).toBeDefined();
		});

		it('should be return a jQuery object for chaining', function() {

			var $body = $('body');

			expect($('body').tiddlerInclude()).toBe($body);
		});

		it('should read the tiddler name from the element data-tiddler attribute', function() {

			sinon.stub($.fn, 'data');

			$('body').tiddlerInclude();

			expect($.fn.data.calledWith('tiddler')).toBeTruthy();
		});

		it('should read the bag name from the element data-space attribute', function() {

			sinon.stub($.fn, 'data');

			$('body').tiddlerInclude();

			expect($.fn.data.calledWith('bag')).toBeTruthy();
		});

		it('should get the tiddler from the server', function() {

			var expectedUrl = '/bags/mybag/tiddlers/MyTiddler.json?render=1';
			var dataStub = sinon.stub($.fn, 'data');
			dataStub.withArgs('tiddler').returns('MyTiddler');
			dataStub.withArgs('bag').returns('mybag');
			sinon.stub($, 'ajax');

			$('body').tiddlerInclude();

			expect($.ajax.calledWithMatch({  url: expectedUrl })).toBeTruthy();
		});

		it('should render the tiddler within the target element', function() {

			var expectedContent = '<h1 id=\"fragment-one\">Fragment One</h1>\n<ul>\n<li>One</li>\n<li>1</li>\n</ul>';
			sinon.stub($.fn, 'data').returns('MyTiddler');
			sinon.stub($, 'ajax').yieldsTo('success', { render: expectedContent });
			sinon.stub($.fn, 'html');

			$('body').tiddlerInclude();

			expect($.fn.html.calledWith(expectedContent)).toBeTruthy();
		});
	});
});