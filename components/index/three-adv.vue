<template>
	<view>
		<!-- 三图广告 -->
		<!-- 左边w:373,h:530-->
		<!-- 右边w:375,h:264 边2-->
		<view class="d-flex">
			<image :src="resdata[0].src" lazy-load style="width: 373rpx;height: 530rpx;border-right: 2rpx solid #f5f5f5;" @tap="event(resdata[0])"></image>
			<view class="d-flex flex-column">
				<image :src="resdata[1].src" lazy-load style="width: 375rpx;height: 264rpx;border-bottom: 2rpx solid #f5f5f5;"
				 @tap="event(resdata[1])"></image>
				<image :src="resdata[2].src" lazy-load style="width: 375rpx;height: 264rpx;" @tap="event(resdata[2])"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			resdata: Object
		},
		data() {
			return {};
		},
		mounted() {

		},
		methods: {
			event(item) {
				console.log('点击了three图片')
			}
		}
	}
</script>

<style>
	.divider {
		height: 18rpx;
		background-color: #f5f5f5;
	}
</style>
