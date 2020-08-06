<template>
	<view>
		<!-- 底部操作条 -->
		<view style="height: 100rpx;"></view>
		<view class="w-100 d-flex a-stretch bg-white position-fixed bottom-0 left-0" style="height: 100rpx;z-index: 100;">
			<view class="flex-1 d-flex flex-column a-center line-h-md" hover-class="bg-light-secondary">
				<view class="icon icon-xihuan text-muted "></view>
				收藏
			</view>
			<view class="flex-1 d-flex flex-column a-center line-h-md" hover-class="bg-light-secondary">
				<view class="icon icon-gouwuche text-muted" @tap="toCart"></view>
				购物车
			</view>
			<view hover-class="main-bg-hover-color" style="flex: 2.5;" class="d-flex j-center a-center font-md main-bg-color text-white"
			 @tap="_click">
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			_click() {
				this.$emit('click')
			},
			toCart() {
				uni.switchTab({
					url:'../../pages/cart/cart'
				})
			}
		}
	}
</script>

<style>
</style>
