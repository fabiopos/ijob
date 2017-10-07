'use strict';

var UserService = function($http) {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/usuarios';
 

  function GetAll() {
    return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
  }

  function GetById(id) {
    return $http({
      method: 'GET',
      url: uri +'/' + id,
      headers: { 'authorization': "bearer "+localStorage.getItem('token') }    
    });
  }

  function GetByUsername(username, password) {
    return $http.post(uri + '/autenticar', {
      correo: username,
      clave: password
    }).then(handleSuccess, handleError);
  }

  function GetUserByID(userid) {
    return $http.get(uri + userid).then(handleSuccess, handleError);
  }

  function GetRoles() {
    return $http.get('http://vmijob.cloudapp.net/api/usuario-roles/').then(handleSuccess, handleError);
  }

  function Create(user) { return $http.post(uri, user); }

  function RememberPass(email) { return $http.post(uri + '/recordar', { correo: email }); }

  function Update(user) {
    return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
  }

  function Delete(id) {
    return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
  }

  // private functions
  function handleSuccess(res) {
    return res.data;
  }

  function handleError(error) {
    return function () {
      return {
        success: false,
        message: error.data.mensaje
      };
    };
  }

  service.GetAll = GetAll;
  service.GetById = GetById;
  service.GetByUsername = GetByUsername;
  service.Create = Create;
  service.Update = Update;
  service.Delete = Delete;
  service.GetUserByID = GetUserByID;
  service.GetRoles = GetRoles;
  service.RememberPass = RememberPass;
  return service;
};

angular.module('ijobApp').factory('UserService', UserService);

UserService.$inject = ['$http'];

