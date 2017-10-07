'use strict';


angular.module('ijobApp').controller('ProfileCtrl', function ($location, ProfileService, UserService,CommonService) {
    var vm = this;
    vm.Roles = CommonService.Roles;
    vm.MetodoRegistro = CommonService.MetodoRegistro;
    vm.Genero = CommonService.Genero;
    vm.ubicaciones;

    var id = localStorage.getItem('id');
    
    var getUserInfo = function (){
        vm.dataLoading = true;
        UserService.GetById(id).then(handleGetSuccess,handleGetError);        
    };

    var getUbicaciones = function (){
        CommonService.getUbicaciones().then(function(response ){ console.log('ok =>',response)}, 
                                            function(response){console.log('error =>',response)});
    };
    
    var handleGetSuccess = function(response){
        vm.dataLoading = false;
        vm.user = response.data;
        vm.user.nacimiento = moment(response.data.nacimiento).toDate();
        vm.user.genero = response.data.genero.toString();

        //console.log('original date =>', response.data.nacimiento);
        //console.log('format date =>', moment(response.data.nacimiento).format('YYYY-MM-DD'));

        console.log('ok =>', response.data);
    };
    var handleGetError = function(response){
        console.log('error =>', response);
        vm.dataLoading = true;
    };
    
    vm.getUserInfo = getUserInfo;
    
    getUserInfo(id);
    getUbicaciones();
});