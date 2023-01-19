<style>
.page {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #000000;
}
.bg-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.bg-size {
	width: 750rpx;
	height: 750rpx;
}
.button-change-bg {
	background-color: #1e1e1e;
}
.button-change-bg-touched {
	background-color: #646262;
}
</style>

<template>
	<view class="page">
		<view class="bg-wrapper" :style="{ height: screenHeight + 'px' }">
			<image :src="bgUrl" class="bg-size" style="align-self: center;"></image>
			<!-- <image src="../../static/images/defaultBgImg.png" class="bg-size" style="align-self: center;"></image> -->

			<view
				:class="{ 'button-change-bg': !changeTouched, 'button-change-bg-touched': changeTouched }"
				@touchstart="touchstartChange"
				@touchend="touchendChange"
				@click="changeBg()"
				style="width: 250rpx;height: 80rpx;border-radius: 50px;display: flex;flex-direction: column;justify-content: center;margin-top: 150rpx;align-self: center;"
			>
				<text style="color: #FFFFFF;align-self: center;">更换背景</text>
			</view>
		</view>
	</view>
</template>

<script>
var system = uni.getSystemInfoSync();
var app = getApp();
export default {
	data() {
		return {
			// bgUrl: "/static/face/face-arrow-1.png",
			bgUrl: getApp().getUserInfoSession().bgImg,

			changeTouched: false,

			screenHeight: system.safeArea.bottom
		};
	},
	onShow() {
		var bgimg = app.getUserInfoSession().bgImg;
		if (app.isStrEmpty(bgimg)) {
			bgimg = '/static/images/defaultBgImg.png';
		}
		this.bgUrl = bgimg;
		// this.bgUrl = "../../static/face/face-arrow-1.png";
	},
	methods: {
		touchstartChange() {
			this.changeTouched = true;
		},
		touchendChange() {
			this.changeTouched = false;
		},
		changeBg() {
			var me = this;
			var userId = getApp().getUserInfoSession().id;

			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				crop: {
					quality: 60,
					width: 400,
					height: 400
				},
				success: e => {
					var newBg = e.tempFilePaths[0];
					me.bgUrl = newBg;

					// 上传
					var serverUrl = app.globalData.serverUrl;
					uni.uploadFile({
						header: {
							headerUserId: userId,
							headerUserToken: app.getUserSessionToken()
						},
						url: serverUrl + '/user/modifyImage?userId=' + userId + '&type=1',
						name: 'file',
						filePath: newBg,
						success(result) {
							if (result.statusCode == 200) {
								var res = JSON.parse(result.data);

								if ((res.status = 200)) {
									var userInfoUpdated = res.data;
									// 重置本地用户信息
									app.setUserInfoSession(userInfoUpdated);

									uni.navigateBack({
										delta: 1,
										animationType: 'fade-out'
									});
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'error'
									});
								}
							} else {
								uni.showToast({
									title: '上传失败',
									icon: 'error'
								});
							}
						}
					});
				}
			});
		}
	}
};
</script>
