'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:SearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('SearchCtrl', function (SearchService, UserService, CommonService) {
    var vm = this;
    var id = localStorage.getItem('id');
    vm.search = {};
    vm.searchResult = null;
    vm.advanced = false;
<<<<<<< HEAD
    vm.geografica = false;
=======
>>>>>>> 327534da7cc82fe1eabfaa32a2eeb984908e1c7d
    vm.ubicaciones = [];
    vm.escolaridad = [];
    vm.ocupaciones = [];
    vm.estados = [];
    vm.sectores = [];
    vm.jobs = [];
    var simpleSearch = function () {
<<<<<<< HEAD
      vm.advanced = false;
      vm.searchResult = '';
      vm.jobs = [];
=======
        vm.advanced = false;
        vm.searchResult = '';
        vm.jobs = [];
>>>>>>> 327534da7cc82fe1eabfaa32a2eeb984908e1c7d
      SearchService.search().then(function (response) {
        mapResult(response);
      })
    };

    var advancedSearch = function () {
      vm.advanced = true;
      vm.searchResult = '';
      vm.jobs = [];
      var payload = {
        ocupacion: vm.search.idOcupacion,
        categoria: vm.search.idSector,
        ciudad: vm.search.ciudad,
        calificacion: vm.search.calificacion,
        jornada: "",
        horario: "",
        pagina: 1
      };

      SearchService.adSearch(id, payload).then(function (response) {
        console.log('advanced', response);
        mapResult(response);
      });


    };
    vm.searchJobs = simpleSearch;
    vm.advancedSearch = advancedSearch;
<<<<<<< HEAD
    vm.advancedSearchInit = function () {
      vm.advanced = true;
=======
    vm.advancedSearchInit = function(){
        vm.advanced = true;
>>>>>>> 327534da7cc82fe1eabfaa32a2eeb984908e1c7d
    };
    var sinceFormat = function (creado) {
      var a = moment(creado);
      var days = a.diff(moment(), 'days') * -1;
      var hours = a.diff(moment(), 'hours') * -1;
      var years = a.diff(moment(), 'years') * -1;
      var since = '';
      if (years > 0 && days > 0) {
        since = 'Hace más de un año';
      } else if (days > 30) {
        since = 'Hace más de un mes';
      } else if (days <= 30) {
        since = 'Hace ' + days + ' día(s) y ' + hours + ' horas'
      }
      return since;
    };

   
    var mapResult = function (response) {
      if (response.data.codigo) {
        if (response.data.codigo === 204) vm.searchResult = response.data.mensaje;
      } else {
        vm.jobs = response.data;
        angular.forEach(vm.jobs, function (job, key) {
          job.since = sinceFormat(job.creado);
          job.creadoEn = moment(job.creado).format('YYYY-MM-DD hh:mm a');
          if (job._imagen) {
            job.srcImage = UserService.GetUserImage(job._imagen);
          } else {
            job.srcImage = '/images/avatar_male.png';
          }
        });
      }

    };
    var getUbicaciones = function () {
      CommonService.getUbicaciones().then(function (response) {
          vm.ubicaciones = response.data;
        },
        function (response) {
          console.log('error ubicaciones =>', response)
        });
    };

    var getSectores = function () {
      CommonService.getSectores().then(function (response) {
          vm.sectores = response.data;
        },
        function (response) {
          console.log('error sectores =>', response)
        });
    };

    var getEscolaridad = function () {
      CommonService.getEscolaridad().then(function (response) {
          vm.escolaridad = response.data;
        },
        function (response) {
          console.log('error escolaridad =>', response)
        });
    };

    var getEstados = function () {
      CommonService.getEstados().then(function (response) {
          vm.estados = response.data; // codigo & nombre
        },
        function (response) {
          console.log('error getEstados =>', response)
        });
    };

    var getOcupaciones = function () {
      CommonService.getOcupaciones().then(function (response) {
          vm.ocupaciones = response.data;
        },
        function (response) {
          console.log('error escolaridad =>', response)
        });
    };
    var initMap = function initMap(position) {
      console.log('position',position);
      var uluru = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13 ,
        center: uluru     
      });
      var marker = new google.maps.Marker({
         position: uluru,
         map: map
       });
    };
    var getLocation = function(){
      if (navigator.geolocation) {
          console.log('navigator', navigator, navigator.geolocation);        
          navigator.geolocation.watchPosition(showPosition, function(err){console.log('error watch position',err)});
      } else {          
          showPosition({ latitude: 4.6923, longitude: -74.1063661});
      }
    };
    var showPosition = function(position){
      console.log('position', position);
      
      vm.position = position;
      initMap(position);
     
    };
    vm.searchGeografica = function(){
        vm.geografica = true;
        getLocation();       
    };

    vm.adSearch = function(){
      vm.advanced = !vm.advanced;
      vm.geografica = false;
    };

    var getGeoSearch = function (){
      vm.geoSearchResult = '';
      vm.jobs = [];
      if(!vm.search.geoOcupacion) alert('seleccione una ocupación');
      var payload = {
        latitud: vm.position.coords.latitude,
        longitud: vm.position.coords.longitude,
        ocupacion: vm.search.geoOcupacion,
        pagina: 1
      };
      console.log('payload => ', payload);
      
      SearchService.geoSearch(id, payload).then(function(response){ 
        console.log('response ', response);
        vm.geoSearchResult = response.data;
      }, 
        function(response){ console.log('response '. response );
      });
    }
    vm.geoSearch =  getGeoSearch;
    getUbicaciones();
    getEscolaridad();
    getOcupaciones();
    getEstados();
    getSectores();
  });
