<style>
.page {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #ffffff;

	display: flex;
	flex-direction: column;
	justify-content: center;
}

.qrcode-middle-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: -120rpx;
}

.qrcode-box {
	position: absolute;
	top: 0;
	bottom: 0;
	background-color: #ffffff;

	box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}

.user-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: -70rpx;
}

.canvas-qrcode-box {
	margin-top: 50rpx;
}

.bg-cover {
	width: 750rpx;
}

.btn-close {
	/* position: absolute; */
	/* top: 0;
	bottom: 0; */
	width: 50rpx;
	height: 50rpx;
	margin-top: 80rpx;
	margin-left: 20rpx;
}
</style>

<template>
	<view class="page">
		<image mode="scaleToFill" :style="{ height: screenHeight + 'px' }" class="bg-cover" src="../../static/images/bg-qrcode2.png"></image>

		<view class="qrcode-box" style="width: 550rpx;height: 700rpx;margin-top: 320rpx;align-self: center;">
			<view class="user-box">
				<image
					mode="aspectFill"
					class="bg-cover"
					style="width: 130rpx;height: 130rpx;border-radius: 100px;align-self: center;"
					src="../../static/face/face-arrow-2.jpg"
				></image>
				<text style="align-self: center; margin-top: 10rpx;font-size: 14px;font-weight: 400;">期待的话😘请多多为我投票吧~</text>

				<view class="canvas-qrcode-box" style="align-self: center;"><canvas id="qrcode" canvas-id="qrcode" style="width: 170px;height: 170px;align-self: center;" /></view>

				<text style="align-self: center; margin-top: 20rpx;color: #808080;font-size: 11px;font-weight: 300;">扫描二维码，就能看我的作品哟</text>
			</view>
		</view>
	</view>
</template>

<script>
var system = uni.getSystemInfoSync();
import uQRCode from '@/uni_modules/Sansnn-uQRCode/components/uqrcode/common/uqrcode.js';
export default {
	data() {
		return {
			vlogId: '',
			// screenHeight: system.screenHeight,
			screenHeight: system.safeArea.bottom,
			statusBarHeight: system.statusBarHeight
		};
	},
	onReady() {
		var vlogId = this.vlogId;
		var content = {
			type: 'vlog',
			content: vlogId
		};
		var contentStr = JSON.stringify(content);
		uQRCode
			.make({
				canvasId: 'qrcode',
				componentInstance: this,
				size: 170,
				margin: 10,
				text: contentStr,
				backgroundColor: '#ffffff',
				foregroundColor: '#0f0827',
				fileType: 'png',
				errorCorrectLevel: uQRCode.errorCorrectLevel.H
			})
			.then(res => {});
	},
	onLoad(params) {
		var vlogId = params.vlogId;
		this.vlogId = vlogId;
	},
	methods: {
		close() {
			uni.navigateBack({
				delta: 1,
				animationType: 'slide-out-bottom'
			});
		}
	}
};
</script>
