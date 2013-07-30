describe('Tiddler Include', function() {

	describe('TidderInclude Object', function() {

		it('should be obtainable from the jQuery object', function() {

			var tiddlerInclude = $.tiddlerInclude();

			expect(tiddlerInclude).toBeDefined();
		});

		it('should store the space name', function() {

			var tiddlerInclude = $.tiddlerInclude('outerspace');

			expect(tiddlerInclude.getSpaceName()).toBe('outerspace');
		});

		it('should set the appropriate bag URI given the space name', function() {

			var tiddlerInclude = $.tiddlerInclude('outerspace');

			expect(tiddlerInclude.getBagURI()).toBe('/bags/outerspace_public/tiddlers/');
		});
	});

	describe('TiddlerInclude Plugin', function() {

		//jasmine.getFixtures().fixturesPath = 'test/fixtures';

		beforeEach(function() {

			$.tiddlerInclude('myspace');
			//loadFixtures('fixture.html');
		});

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

		it('should read the tiddler name from the element data attribute', function() {

			sinon.stub($.fn, 'data');

			$('#tiddler1').tiddlerInclude();

			expect($.fn.data.calledWith('tiddler')).toBeTruthy();
		});

		it('should get the tiddler from the server', function() {

			var expectedUrl = '/bags/myspace_public/tiddlers/MyTiddler.json?render=1';
			sinon.stub($.fn, 'data').returns('MyTiddler');
			sinon.stub($, 'ajax');

			$('#tiddler1').tiddlerInclude();

			expect($.ajax.calledWithMatch({  url: expectedUrl })).toBeTruthy();
		});

		it('should render the tiddler within the target element', function() {

			var expectedContent = '<h1 id=\"fragment-one\">Fragment One</h1>\n<ul>\n<li>One</li>\n<li>1</li>\n</ul>';
			sinon.stub($.fn, 'data').returns('MyTiddler');
			sinon.stub($, 'ajax').yieldsTo('success', { render: expectedContent });
			sinon.stub($.fn, 'html');

			$('#tiddler1').tiddlerInclude();

			expect($.fn.html.calledWith(expectedContent)).toBeTruthy();
		});
	});
});