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