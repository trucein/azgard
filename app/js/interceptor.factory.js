(function(AZGARD, undefined) {
  /**
   * @ngdoc function
   * @name AZGARD
   * @id AZGARD
   * @description
   *
   * Set up for AZGARD Customer Web APP panel constants
   * * Code Snippets and Motivation from https://github.com/sahat/satellizer
   **/

  AZGARD.Modules.AZGARD.factory('AzgardInterceptor', [
    '$q',
    'AzgardShared',
    'AzgardConfig',
    'AzgardStorage',
    function($q, shared, config, storage) {
      return {
        request: function(request) {
          if (request.skipAuthorization) {
            return request;
          }

          if (shared.isAuthenticated()) {
            var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
            var token = storage.get(tokenName);

            request.headers[config.authHeader] = token;
            
          }
          return request;

        },

        responseError: function(response) {

          if (response.status == 401 ) {
            shared.logout();
            window.location = config.loginPage;
          }
          return $q.reject(response);
        }
      };


    }
  ]);



}(window.AZGARD = window.AZGARD || {}));