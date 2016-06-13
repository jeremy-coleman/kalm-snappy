/**
 * JSON+Snappy Encoder 
 * @module encoders/snappy
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var snappy = require('snappy');

/* Methods -------------------------------------------------------------------*/

/**
 * Encodes + copresses a payload
 * @param {object} payload The payload to encode
 * @returns {Buffer} The encoded payload
 */
function encode(payload) {
	return snappy.compressSync(new Buffer(JSON.stringify(payload)));
}

/**
 * Decodes a payload
 * @param {Buffer} payload The payload to decode
 * @returns {object} The decoded payload
 */
function decode(payload) {

	return JSON.parse(snappy.uncompressSync(payload).toString());
}


/* Exports -------------------------------------------------------------------*/

module.exports = {
	encode: encode,
	decode: decode
};