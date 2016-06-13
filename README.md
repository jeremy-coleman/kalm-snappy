# kalm-snappy

[Snappy]() compressing encoder for [Kalm](https://github.com/fed135/Kalm)

[![kalm-snappy](https://img.shields.io/npm/v/kalm-snappy.svg)](https://www.npmjs.com/package/kalm-snappy)
[![Build Status](https://travis-ci.org/fed135/kalm-websocket.svg?branch=master)](https://travis-ci.org/fed135/kalm-snappy)
[![Dependencies Status](https://david-dm.org/fed135/Kalm.svg)](https://www.npmjs.com/package/kalm-snappy)

## Compatibility

NODE >= 6.0.0
Kalm >= 1.0.0

## Usage

Using with Kalm:

    var Kalm = require('kalm');
    var snappy = require('kalm-snappy');
    
    Kalm.encoders.register('snappy', snappy);

    var server = new Kalm.Server({
	    port: 3000,
	    adapter: 'tcp',
	    encoder: 'snappy',
	    channels: {
		    '/': function(data) {
			    console.log('GOT "' + data + '" on main channel!');
		    }
		  }
    });


Using in your browser:

    // Install kalm and kalm-snappy via a package manager (recommended).
		 
    var Kalm = require('kalm');
    var snappy = require('kalm-snappy');
    var ws = require('kalm-websocket');
    
    Kalm.adapters.register('ws', ws);
    Kalm.encoders.register('snappy', snappy);

    var server = new Kalm.Server({
	    hostname: 'http://127.0.0.1',	// Put your server addr
	    port: 3000,
	    adapter: 'ws',
	    encoder: 'snappy',
	    channels: {
		    '/': function(data) {
			    console.log('GOT "' + data + '" on main channel!');
		    }
		  }
    });

    