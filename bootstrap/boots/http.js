import $ from "../$";
import { Request, request, uploader } from "../http";
import * as util from "../util/index";
import * as logins from './logins';

// 请求类
$.$define('http', request);
$.$define('Http', Request);
$.$define('uploader', uploader);
$.$define('logins', logins);


//初始化网络请求配置
(function() {
	let config = null;

	try {
		config = require('../../common/config/http.js');

		if (typeof config === 'function') {
			config = config();
		}
	} catch (e) {
		console.warn("/common/config/http.js not found!");
		config = {};
	}


	// 默认配置
	if (config.defaults) {
		util.assign(request.defaults, config.defaults);
	}

	// 请求拦截器
	if (config.requestInterceptors) {
		config.requestInterceptors.forEach(interceptor => {
			if (typeof interceptor === 'function') {
				interceptor.fulfilled = interceptor;
			}
			request.addRequestInterceptor(interceptor.fulfilled, interceptor.rejected)
		});
	}

	// 响应拦截器
	if (config.responseInterceptors) {
		config.responseInterceptors.forEach(interceptor => {
			if (typeof interceptor === 'function') {
				interceptor.fulfilled = interceptor;
			}
			request.addResponseInterceptor(interceptor.fulfilled, interceptor.rejected)
		});
	}
})();


// 初始化上传器
(function() {
	let config = null;
	try {
		let config = require('../../common/config/upload.js');
		if (typeof config === 'function') {
			config = config();
		}
	} catch (e) {
		console.warn("/common/config/upload.js not found!");
		config = {};
	}

	// 默认配置
	util.assign(uploader.defaults, config);
})();
