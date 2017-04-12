# kalm-snappy

[Snappy](https://google.github.io/snappy/) [serializer](https://github.com/kalm/kalm.js/wiki/Serials) for [Kalm](https://github.com/kalm/kalm.js)

[![kalm-snappy](https://img.shields.io/npm/v/kalm-snappy.svg)](https://www.npmjs.com/package/kalm-snappy)
[![Node](https://img.shields.io/badge/node->%3D4.0-blue.svg)](https://nodejs.org)
[![Build Status](https://travis-ci.org/kalm/kalm-websocket.svg?branch=master)](https://travis-ci.org/kalm/kalm-snappy)
[![Dependencies Status](https://david-dm.org/kalm/kalm-snappy.svg)](https://david-dm.org/kalm/kalm-snappy)

## Install

    npm install kalm-snappy


## Usage

Setting up your server:

```node
    const Kalm = require('kalm');
    const snappy = require('kalm-snappy');
    
    const server = Kalm.listen({
        port: 3000,
        serial: snappy
    });

    server.on('connection', (client) => {
        client.subscribe('/', (data) => {
            console.log(data);  // 'Hello from Browser!'
        });
    });
    
```

Using in your browser:

```node
    // Install kalm and kalm-snappy via a package manager (recommended).
         
    import Kalm from 'kalm';
    import snappy from 'kalm-snappy';
    
    const client = Kalm.connect({
        hostname: '127.0.0.1',  // Your server's hostname
        port: 3000,             // Your server's port
        serial: snappy
    });

    client.write('Hello from Browser');
    
```


## Testing

`npm test`


## Contribute

Please do! This is an open source project - if you see something that you want, [open an issue](//github.com/kalm/kalm-snappy/issues/new) or file a pull request.

If you have a major change, it would be better to open an issue first so that we can talk about it. 

I am always looking for more maintainers, as well. Get involved. 


## License 

[Apache 2.0](LICENSE) (c) 2017 Frederic Charette