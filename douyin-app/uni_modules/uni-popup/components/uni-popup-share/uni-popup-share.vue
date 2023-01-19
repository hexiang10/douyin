<style>
.page {
	background-color: #000000;
	opacity: 0.9;
}

.btn-cancel {
	background-color: #1d1d1e;
	border-color: #3a3a3d;
}
.btn-cancel-touched {
	background-color: #515156;
	border-color: #2b2b2f;
}
.all-box {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	height: 280rpx;
}
.share-item {
	display: flex;
	flex-direction: column;
	margin-top: 60rpx;
}
.icon-wrapper {
	width: 120rpx;
	height: 120rpx;
	background-color: #343437;
	border-radius: 100px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	opacity: 0.8;
}
.icon-image {
	width: 60rpx;
	height: 60rpx;
}
.icon-tag-text {
	color: #ffffff;
	font-size: 14px;
	margin-top: 10rpx;
}
</style>

<template>
	<view class="page">
		<view class="all-box">
			<view class="share-item" @click="downloadVlog()">
				<view class="icon-wrapper" style="align-self: center;"><image class="icon-image" src="/static/images/icon-download.png" style="align-self: center;"></image></view>
				<text class="icon-tag-text" style="align-self: center;">保存到相册</text>
			</view>

			<view class="share-item" @click="copyLink()">
				<view class="icon-wrapper" style="align-self: center;"><image class="icon-image" src="/static/images/icon-copy.png" style="align-self: center;"></image></view>
				<text class="icon-tag-text" style="align-self: center;">复制链接</text>
			</view>

			<view class="share-item" @click="gotoQRCode()">
				<view class="icon-wrapper" style="align-self: center;"><image class="icon-image" src="/static/images/icon-qrcode.png" style="align-self: center;"></image></view>
				<text class="icon-tag-text" style="align-self: center;">二维码</text>
			</view>

			<!-- 判断只有我自己才能显示这个按钮 -->
			<view v-if="thisVlogerId == userId && isPrivate == 0" class="share-item" @click="changeVlogToPrivate()">
				<view class="icon-wrapper" style="align-self: center;"><image class="icon-image" src="/static/images/icon-private.png" style="align-self: center;"></image></view>
				<text class="icon-tag-text" style="align-self: center;">转为私密</text>
			</view>
			<view v-if="thisVlogerId == userId && isPrivate == 1" class="share-item" @click="changeVlogToPublic()">
				<view class="icon-wrapper" style="align-self: center;"><image class="icon-image" src="/static/images/icon-private.png" style="align-self: center;"></image></view>
				<text class="icon-tag-text" style="align-self: center;">转为公开</text>
			</view>
		</view>

		<view class="" style="padding: 0 20rpx;">
			<!-- :class="{'btn-preplay':!preplayTouched, 'btn-preplay-touched': preplayTouched}"
			@click="preview"
			@touchstart="touchstartPreplay" 
			@touchend="touchendPreplay" -->

			<view
				:class="{ 'btn-cancel': !cancelTouched, 'btn-cancel-touched': cancelTouched }"
				@click="close"
				@touchstart="touchstartCancel"
				@touchend="touchendCancel"
				style="height: 50px;display: flex;flex-direction: column;justify-content: center;border-width: 1rpx;border-radius: 10px;"
			>
				<text class="" style="color: #FFFFFF;font-size: 16px;align-self: center;align-self: center;">取消</text>
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();
import popup from '../uni-popup/popup.js';
export default {
	name: 'UniPopupShare',
	mixins: [popup],
	emits: ['select'],
	props: {
		title: {
			type: String,
			default: ''
		},
		beforeClose: {
			type: Boolean,
			default: false
		},
		thisVlogerId: {
			type: String,
			default: ''
		},
		thisVlogId: {
			type: String,
			default: ''
		},
		vlogUrl: {
			type: String,
			default: ''
		},
		isPrivate: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			userId: '',
			cancelTouched: false
		};
	},
	created() {
		var userId = getApp().getUserInfoSession().id;
		this.userId = userId;
	},
	methods: {
		/**
		 * 选择内容
		 */
		select(item, index) {
			this.$emit('select', {
				item,
				index
			});
			this.close();
		},
		/**
		 * 关闭窗口
		 */
		close() {
			if (this.beforeClose) return;
			this.popup.close();
			uni.showTabBar({
				animation: true
			});
		},

		touchstartCancel() {
			this.cancelTouched = true;
		},

		touchendCancel() {
			this.cancelTouched = false;
		},

		downloadVlog() {
			console.log('downloadVlog...thisVlogId = ' + this.vlogUrl);
			uni.showLoading();
			uni.downloadFile({
				url: this.vlogUrl,
				success: res => {
					if (res.statusCode === 200) {
						console.log('下载成功');
						uni.saveVideoToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								console.log('save success');
								uni.hideLoading();
								uni.showToast({
									title: '保存成功~！',
									duration: 5000
								});
							}
						});
					}
				}
			});
		},

		copyLink() {
			uni.setClipboardData({
				data: this.vlogUrl,
				success: () => {
					uni.showToast({
						//提示
						title: '复制成功'
					});
				}
			});
		},

		gotoQRCode() {
			uni.navigateTo({
				url: '/pages/qrcode/qrcode?vlogId=' + this.thisVlogId
			});
		},

		changeVlogToPublic() {
			var vlogId = this.thisVlogId;
			var me = this;
			var userId = getApp().getUserInfoSession().id;
			var serverUrl = app.globalData.serverUrl;
			uni.request({
				method: 'POST',
				header: {
					headerUserId: userId,
					headerUserToken: app.getUserSessionToken()
				},
				url: serverUrl + '/vlog/changeToPublic?userId=' + userId + '&vlogId=' + vlogId,
				success(result) {
					// console.log(result);

					if (result.data.status == 200) {
						uni.showToast({
							title: '设置完毕~'
						});
					}
				}
			});
		},

		changeVlogToPrivate() {
			var vlogId = this.thisVlogId;
			var me = this;
			var userId = getApp().getUserInfoSession().id;
			var serverUrl = app.globalData.serverUrl;
			uni.request({
				method: 'POST',
				header: {
					headerUserId: userId,
					headerUserToken: app.getUserSessionToken()
				},
				url: serverUrl + '/vlog/changeToPrivate?userId=' + userId + '&vlogId=' + vlogId,
				success(result) {
					// console.log(result);

					if (result.data.status == 200) {
						uni.showToast({
							title: '设置完毕~'
						});
					}
				}
			});
		}
	}
};
</script>
