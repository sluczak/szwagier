var _ = require('lodash');

var Service = require('../models/Service');
var ServiceType = require('../models/ServiceType');
var ServiceStatus = require('../models/ServiceStatus');

// var mailer = require('../config/mailer');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  Service.find({})
      .populate('type')
      .populate('status')
      .sort({timestamp: -1})
      .exec((err, list) => {
        "use strict";
        res.render('home', {
          title: 'Service status',
          services: list
        });
      });
};

exports.postCreateService = function (req, res) {
  var name = req.body.name;
  var address = req.body.address;
  var serviceType = req.body.serviceType;

  var service = new Service({ name: name, url: address, serviceType: serviceType });
    service.save(function (err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      res.redirect('/');
    } else {
      req.flash('success', { msg: 'Service added!' });
      res.redirect('/');
    }
  });
};
