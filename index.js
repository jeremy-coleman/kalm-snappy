/**
 * JSON+Snappy Serializer 
 * @module encoders/snappy
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

const snappy = require('snappyjs');

/* Local variables -----------------------------------------------------------*/

const isBufferPre = Buffer.from([1]);
const isNotBufferPre = Buffer.from([0]);

/* Methods -------------------------------------------------------------------*/

/**
 * @param {object} payload The payload to encode
 * @returns {Promise} The encoded payload
 */
function encode(payload) {
  const isBuff = Buffer.isBuffer(payload);
  if (!isBuff) payload = Buffer.from(JSON.stringify(payload));

  return Buffer.concat([
    isBuff ? isBufferPre : isNotBufferPre, 
    snappy.compress(payload)
  ]);
}

/**
 * @param {Buffer} payload The payload to decode
 * @returns {Promise} The decoded payload
 */
function decode(payload) {
  const isBuff = !!(payload[0] === 1);
  const res = snappy.uncompress(Buffer.from(payload.slice(1)));
  if (isBuff) return res;
  return JSON.parse(res.toString());
}


/* Exports -------------------------------------------------------------------*/

module.exports = { encode, decode };