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
                    return action.getOTP(data, opts)
                };


            }
        ];

    }]);



}(window.AZGARD = window.AZGARD || {}));