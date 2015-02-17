var request = require('supertest');
var app = require('./app');

// var redis = require('redis');
// var client = redis.createClient();
// client.select('test'.length);
// client.flushdb();

describe('requests to the root path', function() {

  it('returns a 200 status code', function(done) {
  	
    request(app)
      .get('/')
      .expect(200, done);

  });

  it('returns an html format', function(done){

  	request(app)
  	  .get('/')
  	  .expect('Content-Type', /html/, done);

  });

  it('returns an index file with teams', function(done) {
  	request(app)
  	  .get('/')
  	  .expect(/teams/i, done);

  });

});

describe('Listing Teams on /teams', function() {

	beforeEach(function(){
		client.flushdb();
	});
	
	it('Returns 200 status code', function(done) {
		request(app)
		  .get('/teams')
		  .expect(200, done);
		  
	});

	it('Returns JSON format', function(done) {
		request(app)
		  .get('/teams')
		  .expect('Content-Type', /json/, done);
		  
	});

	it('Returns initial teams', function(done) {
		request(app)
		  .get('/teams')
		  .expect(JSON.stringify([]), done);
	});
});

describe('Creating new Teams', function(){

	afterEach(function(){
		client.flushdb();
	});

	it('Returns a 201 status code', function(done){

		request(app)
		  .post('/teams')
		  .send('name=Wired+Technokrats&description=the+techie+dudes')
		  .expect(201, done);
	});

	it('Returns the Team name', function(done){

		request(app)
		  .post('/teams')
		  .send('name=Wired+Technokrats&description=the+techie+dudes')
		  .expect(/Wired Technokrats/i, done);

	});

	it('validates team name', function(done){
		request(app)
		  .post('/teams')
		  .send('name=')
		  .expect(400, done);
	});

});

describe('Deleting Teams', function(){

	before(function(){
		client.hset('teams', 'Nuweesters', 'Are you well?');
	});

	after(function(){
		client.flushdb();
	});
	

	it('Returns a 204 status code', function(done){

		request(app)
		  .delete('/teams/Nuweesters')
		  .expect(204, done)

	});

});

describe('Show Team Details', function(){

	before(function(){
		client.hset('teams', 'Nuwe', 'Nuweesters');
	});

	after(function(){
		client.flushdb();
	});

	it('returns 200 status code', function(done){
		request(app)
		  .get('/teams/Nuwe')
		  .expect(200, done);
	});

	it('returns html format', function(done){
		request(app)
		  .get('/teams/Nuwe')
		  .expect('Content-Type', /html/, done);

	});

	it('returns the team name for given Team', function(done){
		request(app)
		  .get('/teams/Nuwe')
		  .expect(/Nuwe/, done);

	});

	

});















