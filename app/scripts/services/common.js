'use strict';



var CommonService = function ($http)  {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/';
  service.Roles = [{
      codigo: '1',
      nombre: 'Cliente'
    },
    {
      codigo: '2',
      nombre: 'Proveedor'
    }
  ];
  service.Genero = [{
      codigo: '1',
      nombre: 'Masculino'
    },
    {
      codigo: '2',
      nombre: 'Femenino'
    }
  ];
  service.MetodoRegistro = [{
    codigo: '4',
    nombre: 'nativo'
  }];

  service.getUbicaciones = function(){
    return $http.get(uri+ '/ubicaciones/');
  }

  return service;
};

angular
  .module('ijobApp')
  .factory('CommonService', CommonService);

CommonService.$inject = ['$http'];
