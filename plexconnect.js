/**
 *
 *      ioBroker Plex Media Server Connect Adapter
 *
 *      Copyright (c) 2016 Eisbaeeer@gmail.com
 *
 *      MIT License
 *
 */

// you have to require the utils module and call adapter function
const utils = require('@iobroker/adapter-core'); // Get common adapter utils

// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.template.0
const adapter = new utils.Adapter('plexconnect');

var express = require('express');
//    request = require('request'),
var  multer  = require('multer');
var app = express();
var upload = multer({ dest: '/tmp/' });


app.post('/', upload.single('thumb'), function (req, res, next) {
    var payload = JSON.parse(req.body.payload);
    adapter.log.info('Getting payload from Server '+payload.Server.title+'...');

// Account
    adapter.setState (adapter.namespace + '.' + 'account.id', {val: payload.Account.id, ack: true});
    adapter.setState (adapter.namespace + '.' + 'account.thumb', {val: payload.Account.thumb, ack: true});
    adapter.setState (adapter.namespace + '.' + 'account.title', {val: payload.Account.title, ack: true});
    
// Event
    adapter.setState (adapter.namespace + '.' + 'event.name', {val: payload.event, ack: true});
    adapter.setState (adapter.namespace + '.' + 'event.refreshed', {val: Math.floor(Date.now()/1000), ack: true});

// Metadata 
    adapter.setState (adapter.namespace + '.' + 'metadata.addedAt', {val: payload.Metadata.addedAt, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.art', {val: 'http://' + adapter.config.host + ":" + adapter.config.pmsport + payload.Metadata.art, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.grandparentArt', {val: 'http://' + adapter.config.host + ":"  + adapter.config.pmsport + payload.Metadata.grandparentArt, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.grandparentThumb', {val: 'http://' + adapter.config.host + ":"  + adapter.config.pmsport + payload.Metadata.grandparentThumb, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.grandparentTitle', {val: payload.Metadata.grandparentTitle, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.librarySectionType', {val: payload.Metadata.librarySectionType, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.parentThumb', {val: 'http://' + adapter.config.host + ":"  + adapter.config.pmsport + payload.Metadata.parentThumb, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.parentTitle', {val: payload.Metadata.parentTitle, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.thumb', {val: 'http://' + adapter.config.host + ":"  + adapter.config.pmsport + payload.Metadata.thumb, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.title', {val: payload.Metadata.title, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.type', {val: payload.Metadata.type, ack: true});
    adapter.setState (adapter.namespace + '.' + 'metadata.updatedAt', {val: payload.Metadata.updatedAt, ack: true});

// Player
    adapter.setState (adapter.namespace + '.' + 'player.local', {val: payload.Player.local, ack: true});
    adapter.setState (adapter.namespace + '.' + 'player.publicAddress', {val: payload.Player.publicAddress, ack: true});
    adapter.setState (adapter.namespace + '.' + 'player.title', {val: payload.Player.title, ack: true});
    adapter.setState (adapter.namespace + '.' + 'player.uuid', {val: payload.Player.uuid, ack: true});    

// Server
    adapter.setState (adapter.namespace + '.' + 'server.title', {val: payload.Server.title, ack: true});
    adapter.setState (adapter.namespace + '.' + 'server.uuid', {val: payload.Server.uuid, ack: true});
    
    res.sendStatus(200);

});

adapter.on('ready', function () {
    adapter.log.debug('function ready');
  
    // starting express server
    var server = app.listen(adapter.config.port, function () {
    var port = server.address().port;
    adapter.log.info('Server listening on port:' + port);
    adapter.log.info('PMS:' + adapter.config.host);
//    adapter.log.info('PMC:' + adapter.config.player);  
   
});
    main();
});

adapter.on('objectChange', function (id, obj) {
    adapter.log.debug('objectChange ' + id + ' ' + JSON.stringify(obj));
});

adapter.on('stateChange', function (id, state) {
//    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));
    adapter.log.silly('State for id '+id+' has changed to ' + state.val);
       
    // you can use the ack flag to detect if state is command(false) or status(true)
    if (state.ack) {
     //   adapter.log.info('ack is not set!');
                                                                    
    // here we go and set the outputs if state of object is changed with no ack
   }
});

function main() {
    adapter.log.debug('function main');
    adapter.subscribeStates('*');
}
