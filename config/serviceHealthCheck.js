var _ = require('lodash');

var schedule = require('node-schedule');
var mailer = require('../config/mailer');

var http = require("http");
var https = require("https");

var Service = require('../models/Service');
var ServiceType = require('../models/ServiceType');
var ServiceStatus = require('../models/ServiceStatus');


schedule.scheduleJob("*/5 * * * * *", function() {
    Service.find({})
        .populate('type')
        .populate('status')
        .sort({timestamp: -1})
        .exec((err, services) => {
            _.forEach(services, (service) => checkService(service));
        });
});

function checkService(service) {
    var address = service.url;
    var protocol = address.indexOf("https") > -1 ? https : http;
    protocol.get(address, (res) => {
        handleRunning(service);
        res.resume();
    }).on('error', (e) => {
        handleDead(service);
        console.log(address);
        console.log(e.message);
    });
}

function handleRunning(service) {
    console.log('Running ' + service.url);
    if(service.status.name === 'Dead') {
        mailer.sendMail('bootcamp.asg@gmail.com', 'fester3000@gmail.com', 'Service is up again', service.url, function (err, success) {
            if (err) {
                console.log('Problem sending email to: ' + 'fester3000@gmail.com');
            }
        });
    }
    updateService(service, "Running");
}

function handleDead(service) {
    console.log('Dead ' + service.url);
    if(service.status.name === 'Running') {
        mailer.sendMail('bootcamp.asg@gmail.com', 'fester3000@gmail.com', 'Service is down', service.url, function (err, success) {
            if (err) {
                console.log('Problem sending email to: ' + 'fester3000@gmail.com');
            }
        });
    }
    updateService(service, "Dead");

}

function updateService(service, statusName) {
    ServiceStatus.findOne({name: statusName})
        .exec((err, status) => {
            if (err) {
                console.error('Status not found: ' + err.message);
            }
            Service.update({name: service.name}, {$set: {status: status.id}}, function (err) {
                if (err) {
                    console.error('Service status update failed: ' + err.message);
                }
            });
        });
}
