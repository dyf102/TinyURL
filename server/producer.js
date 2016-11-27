'use strict';

var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var client = new kafka.Client("192.168.99.100");
var producer = new HighLevelProducer(client);
var topic = 'topic1';
producer.on('ready', function () {
  console.log("Hello");
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
console.log("Hello");
