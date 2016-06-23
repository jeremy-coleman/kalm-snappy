/**
 * JSON+Snappy Encoder 
 * @module encoders/snappy
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

const snappy = require('snappy');

/* Local variables -----------------------------------------------------------*/

const opts = { asBuffer: false };

/* Methods -------------------------------------------------------------------*/

/**
 * Encodes + copresses a payload
 * @param {object} payload The payload to encode
 * @returns {Promise} The encoded payload
 */
function encode(payload) {
	return new Promise((resolve) => {
		snappy.compress(new Buffer(JSON.stringify(payload)), (err, res) => {
			resolve(res);
		});
	});
}

/**
 * Decodes a payload
 * @param {Buffer} payload The payload to decode
 * @returns {Promise} The decoded payload
 */
function decode(payload) {
	return new Promise((resolve) => {
		snappy.uncompress(payload, opts, (err, res) => {
			resolve(JSON.parse(res));
		})
	});
}


/* Exports -------------------------------------------------------------------*/

module.exports = {
	encode: encode,
	decode: decode
};