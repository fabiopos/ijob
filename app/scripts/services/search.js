'use strict';

<<<<<<< HEAD
var SearchService = function ($http) {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/busqueda';

  service.search = function () {
    return $http.get(uri + '/jobsmes');
  };

 
  service.adSearch = function (id, payload) {
    return $http({
      method: 'PUT',
      url: uri + '/' + id + '/avanzada',
      data: payload,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
  };

  service.geoSearch = function (id, payload) {
    return $http({
      method: 'POST',
      url: uri + '/' + id + '/geografica',
      data: payload,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
  };
 
  
  return service;
=======
var SearchService = function ($http)  {
    var service = {};
    var uri = 'http://vmijob.cloudapp.net/api/busqueda';

    service.search = function(){
        return $http.get(uri+'/jobsmes');
    };

    service.adSearch = function(id, payload){
        return $http({
            method: 'PUT',
            url: uri + '/' + id + '/avanzada',
            data: payload,
            headers: {
              'authorization': "bearer " + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          });
    };


    return service;
>>>>>>> 327534da7cc82fe1eabfaa32a2eeb984908e1c7d

};

angular
<<<<<<< HEAD
  .module('ijobApp')
  .factory('SearchService', SearchService);

SearchService.$inject = ['$http'];
=======
.module('ijobApp')
.factory('SearchService', SearchService);

SearchService.$inject = ['$http'];
>>>>>>> 327534da7cc82fe1eabfaa32a2eeb984908e1c7d
