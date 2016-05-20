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
