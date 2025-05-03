export default {
	// 获取用户中心数据
	center(options = {}) {
		return uni.$http.get('user/center', null, options).then(res => {
			uni.$user.notify(res.userinfo);
			return res;
		});
	},

	// 获取用户详情信息
	get(options = {}) {
		return uni.$http.get('user/info', null, options).then(res => {
			uni.$user.notify(res);
			return res;
		});
	},

	// 更新用户信息
	update(data, options = {}) {
		return uni.$http.post('user/update', data, options);
	},

	// 同步微信用户信息
	syncWechat(options = {}) {
		return new Promise((resolve, reject) => {
			const syncTime = uni.getStorageSync('sync_user_info_time') || null;
			if (options.force || !syncTime) {
				uni.$getUserInfo({
					force: true
				}).then((res) => {
					return this.update({
						avatar: res.avatarUrl,
						nickname: res.nickName,
						gender: res.gender,
						language: res.language,
						province: res.province,
						city: res.city,
					}, options);
				}).then(() => {
					uni.setStorageSync('sync_user_info_time', syncTime);
					resolve({
						errMsg: 'ok'
					});
				}, reject);
			} else {
				resolve({
					errMsg: 'ok'
				});
			}
		});
	},

	// 更新密码
	restPassword(data, options = {}) {
		return uni.$http.post('user.rest_password/rest', data, options);
	},

	// 获取认证信息
	getIdentityInfo(options = {}) {
		return uni.$http.get('user.identity', null, options);
	},

	// 申请认证
	applyIdentity(data, options = {}) {
		return uni.$http.post('user.identity/apply', data, options);
	},

	// 获取钱包中心
	getWalletCenter(query, options = {}) {
		return uni.$http.get('user.wallet/center', query, options);
	},

	// 获取钱包账单列表
	getBillList(query, options = {}) {
		return uni.$http.get('user.wallet/index', query, options);
	},

	// 获取钱包账单详情
	getBillDetail(query, options = {}) {
		return uni.$http.get('user.wallet/info', query, options);
	},

	// 获取提现记录地址
	getCashoutList(query, options = {}) {
		return uni.$http.get('user.cashout', query, options);
	},

	// 获取提现记录详情
	getCashoutDetail(id, options = {}) {
		return uni.$http.get('user.cashout/detail', {
			id: id
		}, options);
	},

	// 获取银行卡信息
	getBankInfo(query, options = {}) {
		return uni.$http.get('user.bank/info', query, options);
	},

	// 获取提现数据
	getCashoutInfo(query, options = {}) {
		return uni.$http.get('user.cashout/getapplyinfo', query, options);
	},

	// 申请提现
	applyCashout(data, options = {}) {
		return uni.$http.post('user.cashout/apply', data, options);
	},

	// 获取申请合伙人信息
	getApplyVipInfo(data, options = {}) {
		return uni.$http.get('user.vip/getapplyinfo', data, options);
	},

	// 申请合伙人
	applyVip(data, options = {}) {
		return uni.$http.post('user.vip/apply', data, options);
	},

	// 用户收藏
	favorite(topicType, topicId, options = {}) {
		return uni.$http.get('user.favorite/favorite', {
			topic_type: topicType,
			topic_id: topicId,
		}, options);
	},

	// 用户取消收藏
	unfavorite(topicType, topicId, options = {}) {
		return uni.$http.get('user.favorite/unfavorite', {
			topic_type: topicType,
			topic_id: topicId,
		}, options);
	},

	// 我的收藏列表
	getFavoriteList(data, options = {}) {
		return uni.$http.get('user.favorite/index', data, options);
	},

	// 我的推荐
	getInvitedList(data, options) {
		return uni.$http.get('user.team/invitedlist', data, options);
	},

	// 我推荐的人明细数据
	getInvitedDetail(id, options) {
		return uni.$http.get('user.team/invitedDetail', { id: id }, options);
	}
}
