(function (AZGARD, undefined)
{
    /**
     * @ngdoc function
     * @name AZGARD
     * @id AZGARD
     * @description
     *
     * Set up for AZGARD Customer Web APP panel constants
     *
     * Code Snippets and Motivation from https://github.com/sahat/satellizer
    **/

    AZGARD.Modules.AZGARD.factory('AzgardAction', [
      '$http',
      'AzgardShared',
      'AzgardConfig',
      function ($http, shared, config) {

        var Action = {};

        Action.loginOTP       = loginOTP;
        Action.logout         = doLogout;
        Action.register       = doRegister;
        Action.getOTP         = getOTP;
        Action.getProfile     = getProfile;

        return Action;

        function loginOTP(data, opts) {
          opts = opts || {};
          opts.url = opts.url ? otps.url : (config.baseUrl + config.loginSMSUrl);
          opts.data = data || opts.data;
          opts.method = opts.method || 'POST';

          return $http(opts).then(function(response){
            shared.setToken(response);
            return response
          });
        };

        function doLogout() {
          shared.removeToken();
          opts = {}
          opts.url = opts.url ? otps.url : (config.baseUrl + config.logoutUrl);
          opts.method = opts.method || 'GET';

          return $http(opts).then(function(response) {
            return response
          });
        };

        function doRegister(data, opts) {
          opts = opts || {};
          opts.url = opts.url ? otps.url : (config.baseUrl + config.registerUrl);
          opts.data = data || opts.data;
          opts.method = opts.method || 'POST';

          return $http(opts)
        };

        function getOTP(data, opts) {
          opts = opts || {};
          opts.url = opts.url ? otps.url : (config.baseUrl + config.otpUrl);
          opts.data = data || opts.data;
          opts.method = opts.method || 'POST';

          return $http(opts)
        };

        function getProfile(data, opts) {
          opts = opts || {};
          opts.url = opts.url ? otps.url : (config.baseUrl + config.profileUrl);
          opts.method = opts.method || 'GET';

          return $http(opts)
        };


      }]);



}(window.AZGARD = window.AZGARD || {}));
