(function (Configs, undefined)
{
	AZGARD.Modules.AZGARD.config(['$httpProvider', function ($httpProvider)
	{
		$httpProvider.interceptors.push('AzgardInterceptor');
	}]);

}(AZGARD.Configs = AZGARD.Configs || {} ));