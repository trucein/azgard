(function (AZGARD, undefined)
{
	/**
	 * @ngdoc function
	 * @name AZGARD
	 * @id AZGARD
	 * @description
	 *
	 * Set up for AZGARD Customer Web panel parameters
	**/

	AZGARD.Version			= "0.0.1";
	AZGARD.PartialsPath		= "./partials";
	AZGARD.Service 			= {};
	AZGARD.Modules			= {};
	AZGARD.Configs 			= {};
	AZGARD.Filters 			= {};
	AZGARD.Controllers 		= {};
	AZGARD.Directives 		= {};
	AZGARD.Constants		= {};
	
}(window.AZGARD = window.AZGARD || {}));
(function (Modules, undefined)
{
	'use strict';
	/**
	 * @ngdoc object
	 * @id AZGARD
	 * @name AZGARD
	 * @description
	 *
	 * This Module initializes the AZGARD Angular module.
	**/
	Modules.AZGARD = angular.module("azgard",[]);

}(AZGARD.Modules = AZGARD.Modules || {} ));
(function (Configs, undefined)
{
	AZGARD.Modules.AZGARD.config(['$httpProvider', function ($httpProvider)
	{
		$httpProvider.interceptors.push('AzgardInterceptor');
	}]);

}(AZGARD.Configs = AZGARD.Configs || {} ));
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

        function getProfile(opts) {
          opts = opts || {};
          opts.url = opts.url ? otps.url : (config.baseUrl + config.profileUrl);
          opts.method = opts.method || 'GET';

          return $http(opts)
        };


      }]);



}(window.AZGARD = window.AZGARD || {}));

(function (AZGARD, undefined)
{
	/**
	 * @ngdoc function
	 * @name AZGARD
	 * @id AZGARD
	 * @description
	 *
	 * Set up for AZGARD Customer Web APP panel constants
	**/

	AZGARD.Modules.AZGARD.constant('AzgardConfig', {
		httpInterceptor: function() { return true; },
		baseUrl: 			'/',
		loginUrl: 			'/auth/login/',
		loginSMSUrl: 		'/auth/login_with_sms',
		profileUrl:  		'/user/profile',
		registerUrl:  		'/auth/register',
		registerAdminUrl: 	'/auth/admin/register',
		logoutUrl: 			'/auth/logout',
		otpUrl: 			'/auth/get/otp',
		authHeader:			'X-Auth-Token',
		authToken: 			'',
		storageType:  		'localStorage',
		tokenName: 			'token',
		tokenPrefix: 		'azgard',
		loginPage:  		'#/login'

	});

	
	
}(window.AZGARD = window.AZGARD || {}));
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

    AZGARD.Modules.AZGARD.provider('$auth', ['AzgardConfig', function(config) {
        Object.defineProperties(this, {
            httpInterceptor: {
                get: function() {
                    return config.httpInterceptor;
                },
                set: function(value) {
                    if (typeof value === 'function') {
                        config.httpInterceptor = value;
                    } else {
                        config.httpInterceptor = function() {
                            return value;
                        };
                    }
                }
            },
            baseUrl: {
                get: function() {
                    return config.baseUrl;
                },
                set: function(value) {
                    config.baseUrl = value;
                }
            },
            loginUrl: {
                get: function() {
                    return config.loginUrl;
                },
                set: function(value) {
                    config.loginUrl = value;
                }
            },
            registerUrl: {
                get: function() {
                    return config.registerUrl;
                },
                set: function(value) {
                    config.registerUrl = value;
                }
            },
            profileUrl: {
                get: function() {
                    return config.profileUrl;
                },
                set: function(value) {
                    config.profileUrl = value;
                }
            },
            loginSMSUrl: {
                get: function() {
                    return config.loginSMSUrl;
                },
                set: function(value) {
                    config.loginSMSUrl = value;
                }
            },
            registerAdminUrl: {
                get: function() {
                    return config.registerAdminUrl;
                },
                set: function(value) {
                    config.registerAdminUrl = value;
                }
            },
            logoutUrl: {
                get: function() {
                    return config.logoutUrl;
                },
                set: function(value) {
                    config.logoutUrl = value;
                }
            },
            authHeader: {
                get: function() {
                    return config.authHeader;
                },
                set: function(value) {
                    config.authHeader = value;
                }
            },
            authToken: {
                get: function() {
                    return config.authToken;
                },
                set: function(value) {
                    config.authToken = value;
                }
            },
            loginPage: {
                get: function() {
                    return config.loginPage;
                },
                set: function(value) {
                    config.loginPage = value;
                }
            }

        });

        this.$get = [
            '$q',
            'AzgardShared',
            'AzgardAction',
            function($q, shared, action) {
                var $auth = {};

                $auth.login           = login;
                $auth.register        = register;
                $auth.logout          = logout;
                $auth.getToken        = getToken;
                $auth.removeToken     = removeToken;
                $auth.getPayload      = getPayload;
                $auth.isAuthenticated = isAuthenticated;
                $auth.getOTP          = getOTP
                $auth.loginOTP        = loginOTP;
                $auth.getProfile      = getProfile;
                $auth.setProfile      = setProfile;
                $auth.getProfileData  = getProfileData;

                return $auth;

                function login(data, opts) {
                    return action.login(data, opts);
                };

                function register(data, opts) {
                    return acton.register(data, opts);
                };

                function logout() {
                    return action.logout();
                };

                function getToken() {
                    return shared.getToken();
                };

                function removeToken() {
                    return shared.removeToken();
                };

                function getPayload() {
                    return shared.getPayload();
                };

                function isAuthenticated() {
                    return shared.isAuthenticated();
                };

                function getOTP(data, opts) {
                    return action.getOTP(data, opts);
                };

                function loginOTP(data, opts) {
                    return action.loginOTP(data, opts)
                };

                function getProfile(opts) {
                    return action.getProfile(opts) 
                };

                function setProfile(data) {
                    shared.profile = data
                };

                function getProfileData(){
                    return shared.profile
                }



            }
        ];

    }]);



}(window.AZGARD = window.AZGARD || {}));
(function(AZGARD, undefined) {
    /**
     * @ngdoc function
     * @name AZGARD
     * @id AZGARD
     * @description
     *
     * Set up for AZGARD Customer Web APP panel constants
     * Code Snippets and Motivation from https://github.com/sahat/satellizer
     **/

    AZGARD.Modules.AZGARD.factory('AzgardShared', [
        '$q',
        '$window',
        '$log',
        'AzgardConfig',
        'AzgardStorage',
        function($q, $window, $log, config, storage) {
            var Shared = {};
            var tokenName = config.tokenPrefix ? [config.tokenPrefix, config.tokenName].join('_') : config.tokenName;

            Shared.getToken        = getToken;
            Shared.getPayload      = getPayload;
            Shared.setToken        = setToken;
            Shared.removeToken     = removeToken;
            Shared.logout          = logout;
            Shared.isAuthenticated = isAuthenticated;
            Shared.setProfile      = setProfile;
            Shared.getProfile      = getProfile;
            Shared.profile         = {};
            
            return Shared;


            function getToken() {
                return storage.get(tokenName);
            };

            function getPayload() {
                var token = storage.get(tokenName);
                if (token && token.split('.').length === 3) {
                    try {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
                    } catch (e) {
                        return undefined;
                    }
                }
            };

            function setToken(response) {
                if (!response) {
                    return $log.warn('Please pass a value');
                };

                var data = response.data

                if (data) {
                    if (angular.isObject(data)) {
                        token = data.payload.token;
                    } else if (angular.isString(data)) {
                        token = data;
                    }
                };
                storage.set(tokenName, token);

            };

            function removeToken() {
                storage.remove(tokenName);
            };

            function logout() {
                storage.remove(tokenName);
                return $q.when();
            };

            // * Code Snippets and Motivation from https://github.com/sahat/satellizer
            function isAuthenticated() {
                var token = storage.get(tokenName);
                // A token is present
                if (token) {
                    // Token with a valid JWT format XXX.YYY.ZZZ
                    if (token.split('.').length === 3) {
                        // Could be a valid JWT or an access token with the same format
                        try {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            var exp = JSON.parse($window.atob(base64)).exp;
                            // JWT with an optonal expiration claims
                            if (exp) {
                                var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                                if (isExpired) {
                                    // FAIL: Expired token
                                    return false;
                                } else {
                                    // PASS: Non-expired token
                                    return true;
                                }
                            }
                        } catch (e) {
                            // PASS: Non-JWT token that looks like JWT
                            return true;
                        }
                    }
                    // PASS: All other tokens
                    return true;
                }
                // FAIL: No token at all
                return false;
            };
        }
    ]);



}(window.AZGARD = window.AZGARD || {}));
(function (AZGARD, undefined)
{
    /**
     * @ngdoc function
     * @name AZGARD
     * @id AZGARD
     * @description
     *
     * Set up for AZGARD Customer Web APP panel constants
     * Code Snippets and Motivation from https://github.com/sahat/satellizer
    **/

    AZGARD.Modules.AZGARD.factory('AzgardStorage', ['$window', '$log', 'AzgardConfig', function($window, $log, config) {

      var dataStore = {};

      // Check for Storage
      var isStorageAvailable = (function() {
        try {
          var supported = config.storageType in $window && $window[config.storageType] !== null;

          if (supported) {
            var key = Math.random().toString(36).substring(7);
            $window[config.storageType].setItem(key, '');
            $window[config.storageType].removeItem(key);
          }

          return supported;
        } catch (e) {
          return false;
        }
      })();

      if (!isStorageAvailable) {
        $log.warn(config.storageType + ' is not available.');
      }

      return {
        get: function(key) {
          return isStorageAvailable ? $window[config.storageType].getItem(key) : store[key];
        },
        set: function(key, value) {
          return isStorageAvailable ? $window[config.storageType].setItem(key, value) : store[key] = value;
        },
        remove: function(key) {
          return isStorageAvailable ? $window[config.storageType].removeItem(key): delete store[key];
        }
      };

      }]);



}(window.AZGARD = window.AZGARD || {}));
