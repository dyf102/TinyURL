'use strict';

var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var Client = kafka.Client;
//inherient from highlevel producer
var Producer = function(){
  this.client = new Client();
  this.topic = 'topic1';
  HighLevelProducer.call(this,client);
}
producer.on('ready', function () {
  setInterval(send, 1000);
});

producer.on('error', function (err) {
  console.log('error', err);
});

function send () {
  var message = new Date().toString();
  producer.send([
    {topic: topic, messages: [message]}
  ], function (err, data) {
    if (err) console.log(err);
    else console.log('send %d messages', ++rets);
    if (rets === count) process.exit();
  });
}
