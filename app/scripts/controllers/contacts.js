'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:ContactsCtrl
 * @description
 * # AboutCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('ContactsCtrl', function (ContactsService, $location) {
    var vm = this;
    // if (!$rootScope.user.id) $location.path('/')
    var id = localStorage.getItem('id');
    vm.idUser = id;
    vm.contacts = { active :[], pendingForAnswer: [], pendingToAnswer: [] };
    vm.putResult = { status: null, message: null };
    vm.getActiveContacts = function(){ 
        var response = ContactsService.getActiveContacts(id)
                        .then(function(){}, function(){});
    };

    vm.getPendingContacts = function(tipo){ 
        console.log('se enviará ..', tipo)
        var response = ContactsService.getPending(id, tipo)
                        .then(function(response){
                            console.log(tipo, response);
                            if(response.data.codigo) 
                            {
                                response.data = []
                            }
                            if(tipo === 1) vm.contacts.pendingForAnswer = response.data;
                            if(tipo === 2) vm.contacts.pendingToAnswer = response.data;
                        }, function(response){});
    };

    vm.getActiveContacts = function(){
        ContactsService.getActiveContacts(id).then(function(response){     
            console.log('actives', response);                   
            vm.contacts.active = response.data;
        }, function(response){});
    };
    
    vm.doRequest = function(){
        vm.requestResult = '';
        var payload = { idUsuarioSolicita: vm.idUser, idUsuarioRecibe: vm.idUserTarget };
        ContactsService.postContact(id, payload ).then(function(response){
            console.log(response);
            vm.requestResult = response.data;
        }, function(response){
            console.log(response);
            vm.requestResult = response.data;
        })
    };

    vm.accept =  function(item) {updateRequest(item, 1);};
     
    vm.reject = function(item){updateRequest(item, 2);};

    var updateRequest = function(item, estado){
        var payload = {
            idContacto: item._id,
            estado: estado,
            observacion: ''
        };
        ContactsService.putContact(payload).then(function(response){
            console.log(response);
            vm.putResult.status = 'success';
            vm.putResult.message = response.data.message;
        },function(response){
            console.log(response);
            vm.putResult.status = 'danger';
            vm.putResult.message = response.data.message;
        });
    };

    vm.getPendingContacts(1); // enviadas
    vm.getPendingContacts(2); // recibidas
    vm.getActiveContacts();

  });