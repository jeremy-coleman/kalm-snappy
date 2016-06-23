/**
 * Kalm test suite
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var assert = require('chai').assert;
var Kalm = require('kalm');
var snappy = require('../index');

/* Models --------------------------------------------------------------------*/

var encoderFormat = {
	encode: function() {},
	decode: function() {}
};

/* Suite ---------------------------------------------------------------------*/

describe('Adapters', () => {

	describe('methods', () => {
		it('register', () => {
			Kalm.encoders.register('snappy', snappy);
		});

		it('resolve', () => {
			var e = Kalm.encoders.resolve('snappy');
			assert.isObject(e, 'snappy is not a valid encoder object');
			allMembersTypeMatch(e, encoderFormat);
		});

		it('data integrity', () => {
			var e = Kalm.encoders.resolve('snappy');

			var tests = [
				{
					foo: 33.2, 
					bar: 'some string %$*-_=+(#!?&|\"/\\',
					test: null
				},
				[1,2,'3',null],
				'test',
				0
			];

			tests.forEach((p) => {
				e.encode(p).then((compact) => {
					e.decode(compact).then((inflated) => {
						assert.deepEqual(inflated, p);
					});
				});
			});
		});
	});

	describe('Smoke test', () => {
		it('run snappy + json', (done) => {
			var server = new Kalm.Server({
				encoder: 'snappy',
				port:8000
			});

			server.subscribe('test', function(data) {
				assert.deepEqual(data, {foo:'bar'});
				server.stop(done);
			});

			server.on('ready', () => {
				var client = new Kalm.Client({
					encoder: 'snappy', 
					port:8000, 
					hostname:'0.0.0.0'
				});
				client.send('test', {foo:'bar'});
			});
		});
	});
});

/* Tooling -------------------------------------------------------------------*/

/**
 * Checks that all properties are present and of the proper type
 */
function allMembersTypeMatch(set1, model) {
	for (var i in model) {
		var type = typeof model[i];
		assert.property(set1, i, 'property ' + i + ' is missing');
		assert.typeOf(set1[i], type, 'property ' + i + ' should be ' + type);
	}
	return true;
}