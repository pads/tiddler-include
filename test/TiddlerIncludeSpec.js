describe('Tiddler Include Plugin', function() {

	jasmine.getFixtures().fixturesPath = 'test/fixtures';

	beforeEach(function() {

		loadFixtures('fixture.html');
	});

	afterEach(function() {

	});

	it('should have an obtainable object', function() {

		var TiddlerInclude = $.tiddlerInclude();

		expect(TiddlerInclude).toBeDefined();
	});
});