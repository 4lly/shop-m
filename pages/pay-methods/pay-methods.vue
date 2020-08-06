<template>
	<view>
		<view class="d-flex flex-column a-center j-center my-3 py-5">
			<text class="text-light-muted font-md">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md"> 399.00</price>
		</view>
		<view class="px-5 ">
			<label>
				<uni-list-item showExtraIcon leftIcon="text-primary icon-zhifubao" leftIconStyle="font-size:60rpx" title="支付宝支付"
				 note="推荐使用支付宝支付">
					<radio slot="right" color="#FD6801" value="1"></radio>
				</uni-list-item>
			</label>
			<label>
				<uni-list-item showExtraIcon leftIconStyle="font-size:60rpx" leftIcon="text-success icon-weixinzhifu " title="微信支付">
					<radio slot="right" color="#FD6801" value="2"></radio>
				</uni-list-item>
			</label>
			<view class="text-center mt-3 rounded main-bg-color text-white font-md w-100 py-2 " hover-class="main-bg-hover-color"
			 @click="submit">
				确认支付
			</view>
		</view>

	</view>
</template>

<script>
	import price from '@/components/common/price.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'

	export default {
		components: {
			price,
			uniListItem
		},
		data() {
			return {

			}
		},
		methods: {
			submit() {
				uni.navigateTo({
					url: '../pay-result/pay-result'
				})
			}
		}
	}
</script>

<style>

</style>
