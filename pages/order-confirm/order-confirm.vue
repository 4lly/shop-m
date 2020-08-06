<template>
	<view style="background: #F5F5F5;min-height: 100%;height: auto;">
		<!-- 地址选择 -->
		<view class="main-bg-color  text-white d-flex a-center px-3" style="height: 250rpx;" hover-class="main-bg-hover-color"
		 @click="openPathList">
			<view class="flex-1">
				<template v-if="path">
					<view class="font-md font-weight d-flex a-center">
						{{path.name}} {{path.phone}}
						<view class="border border-white rounded px font ml-2">
							默认
						</view>
					</view>
					<view class="font">
						{{path.path}} {{path.detailPath}}
					</view>
				</template>
				<template v-else>
					<view class="font-md font-weight d-flex a-center">
						请选择收货地址
					</view>
				</template>

			</view>
			<view class="icon icon-you ml-auto"></view>
		</view>

		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx; margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<view class="d-flex">
						<image src="/static/images/demo/demo6.jpg" style="height: 100rpx;width: 100rpx;" class="rounded mr-2" mode="widthFix"></image>
					</view>
					<view slot="rightContent">共3件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent">
						<price color="text-dark">199</price>
					</view>
				</uni-list-item>
				<uni-list-item title="运费" :showArrowIcon="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
				<navigator url="../order-coupon/order-coupon">
				<uni-list-item title="优惠券">
					<view slot="rightContent" class="text-light-muted">无可用</view>
				</uni-list-item>
				</navigator>
				<uni-list-item :showArrowIcon="false">
					<view class="main-text-color">小计</view>
					<view slot="rightContent">
						<price>199</price>
					</view>
				</uni-list-item>
				<divider></divider>
				<uni-list-item title="发票" extraWidth="40%" @click="openOrderInvoice">
					<view slot="rightContent">电子发票-个人</view>
				</uni-list-item>
			</view>
		</view>
		<!-- 底部导航条 -->
		<view class="border-top bg-white border-light-secondary p-2 position-fixed bottom-0 left-0 right-0 d-flex a-center j-end font-md">
			合计： <price>3000</price>
			<view class="font-md text-white ml-2 main-bg-color ml-2 py-1 px-2 " style="border-radius: 50rpx;" hover-class="main-bg-hover-color" @click="openPayMethods">去支付</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import price from '@/components/common/price.vue'
	import {
		mapGetters
	} from 'vuex'
	export default {
		components: {
			uniListItem,
			price
		},
		data() {
			return {
				path: false
			}
		},
		computed: {
			...mapGetters(['defaultPath'])
		},
		onLoad() {
			if (this.defaultPath.length > 0) {
				this.path = this.defaultPath[0]
			}
			// 开启监听选择收货地址事件
			uni.$on('choosePath', res => {
				this.path = res
			})
		},
		onUnload() {
			// 关闭监听选择收货地址事件
			uni.$off('choosePath', () => {
				console.log('关闭监听选择收货地址事件')
			})
		},
		methods: {
			openPathList() {
				uni.navigateTo({
					url: '../user-path-list/user-path-list?type=choose'
				})
			},
			openOrderInvoice() {
				uni.navigateTo({
					url: '../order-invoice/order-invoice'
				})
			},
			openPayMethods(){
				uni.navigateTo({
					url: '../pay-methods/pay-methods'
				})
				}
		}
	}
</script>

<style>

</style>
