Google Cloud Datastore Emulator
===============================

[![Build Status](https://travis-ci.org/ert78gb/google-datastore-emulator.svg?branch=master)](https://travis-ci.org/ert78gb/google-datastore-emulator)
[![Greenkeeper badge](https://badges.greenkeeper.io/ert78gb/google-datastore-emulator.svg)](https://greenkeeper.io/)

This package helps to start / stop [Google Datatstore Emulator](https://cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore/) with javascript.
From 1.1.0 also could usable with [google/cloud-sdk](https://hub.docker.com/r/google/cloud-sdk/) docker image. 
The wrapper automatically pull the image is not exists on the host, but I suggest to pull the image in the 'before_test' section in the CI script 
**Important:** Be careful with the timeouts, need time to pull the image, start and stop the container.

Perfect to support unit testing where the persistent layer is the gcloud Datastore.

The wrapper sets DATASTORE_EMULATOR_HOST and DATASTORE_PROJECT_ID environment variables.

# Prerequisites
To use the emulator locally you need to install [Google Cloud SDK](https://cloud.google.com/sdk/downloads) or
with Docker you need to install [Docker host](https://www.docker.com/community-edition)  


# Installation
```
npm install google-datastore-emulator --save-dev
```

# Usage
I think the package is the most suitable for unit testing.
 
```javascript
const datastore = require('@google-cloud/datastore');
const Emulator = require('google-datastore-emulator');

describe('test suit', ()=>{
    process.env.GCLOUD_PROJECT = 'project-id'; // Set the datastore project Id globally

    let emulator;
    
    before(()=>{
        const options = {
            legacy: true, // if you need legacy support
            useDocker: true // if you need docker image
        };
        
        emulator = new Emulator(options);
        
        return emulator.start();
    });
    
    after(()=>{
        return emulator.stop();
    });
    
    it('test case', ()=>{
        // your test
    });
})

```

## Options

parameter (type) | default value | description
---------- | --------------- | -------------------
projectId (string) | empty | This variable is datastore project Id. If it is empty, GCLOUD_PROJECT environment variable will be used. Either you should set it directly or the environment variable should be set.
storeOnDisk (boolean) | false | The datastore either persists the entities on disk or not.
dataDir (string) | empty | The emulator creates a directory where the project files are stored. If it is empty the emulator default value will be used. You could set relative ./directory or absolute path /tmp/dir1/dir2/. If this directory does not exist, it will be created. **Bug** : With linux Docker host don't delete the folder
clean (boolean) | true | If dataDir value is set and 'clean' value is true then the package deletes the dataDir. The package **does not** delete the gcloud emulator default directory. 
host (string) | localhost | If it is empty the'localhost' of google default value is used. It can take the form of a single address (hostname, IPv4, or IPv6)
port (number) | 8081 | If it is empty the emulator selects a random free port.
debug (boolean) | false | If it is true, it writes the console.logs of the emulator onto the main process console.
legacy (boolean) | false | If it is true, it supports Cloud Datastore API v1beta2.
consistency (string) | '1.0' | The consistency level of the Datastore Emulator. [More details](https://cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore/start) 
useDocker (boolean) | false | If it is true, it use [google/cloud-sdk](https://hub.docker.com/r/google/cloud-sdk/) docker image to run emulator instead of locally installed version.

## Methods

name | description
-----|------------
start | Starts the emulator and returns a Promise.
stop | Stops the emulator and returns a Promise.

# License

MIT
