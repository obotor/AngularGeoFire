/**
 * Created by Mike on 12/19/13.
 */

(function() {
    "use strict";

    var AngularGeoFire;

    angular.module('angularGeoFire', [])
        .factory("$geofire", ["$q", "$timeout",
            function($q, $timeout) {
                return function(geoRef) {
                    var gf = new AngularGeoFire($q, $timeout, geoRef);
                    return gf.construct();
                };
            }
        ]);

    AngularGeoFire = function($q, $timeout, geoRef) {
        this._q = $q;
        this._timeout = $timeout;
        if(typeof geoRef == "string") {
            throw new Error("Please provide a Firebase reference instead of a URL");
        }
        this._geoRef = geoRef;
        this._geoFire = new geoFire(this._geoRef);
    };

    AngularGeoFire.prototype = {
        construct: function() {
            var self = this;
            var object = {};

            object.$insertByLoc = function(latLon, data) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.insertByLoc(latLon, data, function(error) {
                       if(!error) {
                           deferred.resolve();
                       } else {
                           deferred.reject(error);
                       }
                    });
                });
                return deferred.promise;
            };

            object.$insertByLocWithId = function(latLon, id, data) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.insertByLocWithId(latLon, id, data, function(error) {
                        if(!error) {
                            deferred.resolve();
                        } else {
                            deferred.reject(error);
                        }
                    });
                });
                return deferred.promise;
            };

            object.$removeById = function(id) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.removeById(id, function(error) {
                        if(!error) {
                            deferred.resolve();
                        } else {
                            deferred.reject(error);
                        }
                    });
                });
                return deferred.promise;
            };

            object.$getLocById = function(id) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.getLocById(id, function(latLon) {
                        if(latLon) {
                            deferred.resolve(latLon);
                        } else {
                            deferred.reject();
                        }
                    });
                });
                return deferred.promise;
            };

            object.$updateLocForId = function(latLon, id) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.updateLocForId(latLon, id, function(error) {
                        if(!error) {
                            deferred.resolve();
                        } else {
                            deferred.reject(error);
                        }
                    });
                });
                return deferred.promise;
            };

            object.$getPointsNearLoc = function(latLon, radius) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.getPointsNearLoc(latLon, radius, function(array) {
                        if(!error) {
                            deferred.resolve();
                        } else {
                            deferred.reject(error);
                        }
                    });
                });
                return deferred.promise;
            };

            object.$onPointsNearLoc = function(latLon, radius, callback) {
                self._timeout(function() {
                   self._geoFire.onPointsNearLoc(latLon, radius, callback);
                });
            };

            object.$offPointsNearLoc = function(latLon, radius, callback) {
                self._timeout(function() {
                    self._geoFire.offPointsNearLoc(latLon, radius, callback);
                });
            };

            object.$getPointsNearId = function(id, radius) {
                var deferred = self._q.defer();
                self._timeout(function() {
                    self._geoFire.getPointsNearId(id, radius, function(array) {
                        if(!error) {
                            deferred.resolve();
                        } else {
                            deferred.reject(error);
                        }
                    });
                });
                return deferred.promise;
            };

            object.$onPointsNearId = function(id, radius, callback) {
                self._timeout(function() {
                    self._geoFire.onPointsNearId(id, radius, callback);
                });
            };

            object.$offPointsNearId = function(id, radius, callback) {
                self._timeout(function() {
                    self._geoFire.offPointsNearId(id, radius, callback);
                });
            };

            object.$encode = function(latLon, precision) {
                return self._geoFire.encode(latLon, precision);
            };
            object.$decode = function(geohash) {
                return self._geoFire.decode(geohash);
            };
            object.$miles2km = function(miles) {
                return self._geoFire.miles2km(miles);
            };
            object.$km2miles = function(km) {
                return self._geoFire.km2miles(km);
            };

            self._object = object;
            return self._object;
        }
    }


}).call(this);
