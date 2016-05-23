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