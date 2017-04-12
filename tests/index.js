/** Kalm Snappy test */

'use strict';

/* Requires ------------------------------------------------------------------*/

const assert = require('chai').assert;
const Kalm = require('kalm');
const snappy = require('../index');

/* Suite ---------------------------------------------------------------------*/

describe('Snappy', () => {

	describe('Smoke test', () => {

		let server;

		beforeEach(() => {
			server = Kalm.listen({
				serial: snappy,
				port:8000
			});
		});

		afterEach(done => {
			server.stop(done);
		});

		it('run snappy + json', done => { 

			server.on('connection', c => {
				c.subscribe('test', function(data) {
					assert.deepEqual(data.body, {foo:'bar'});
					server.stop(done);
				});
			});

			const client = Kalm.connect({
				serial: snappy, 
				port:8000, 
				hostname:'0.0.0.0'
			});
			client.write('test', {foo:'bar'});
		});

		it('run snappy + binary', done => {

			server.on('connection', c => {
				c.subscribe('test', function(data) {
					assert.deepEqual(Array.prototype.slice.apply(data.body), [1,2,4,8,16]);
					server.stop(done);
				});
			});

			const client = Kalm.connect({
				serial: snappy, 
				port:8000, 
				hostname:'0.0.0.0'
			});
			client.write('test', Buffer.from([1,2,4,8,16]));
		});
	});
});