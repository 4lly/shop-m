<template>
	<view class="animated fadeIn faster">
		<loading v-if="beforeReady"></loading>
		<!-- 头部 -->
		<view class="position-relative d-flex a-center w-100" style="height: 320rpx;">
			<!-- 右边图标 -->
			<navigator url="../msg-list/msg-list">
			<view class="position-absolute icon icon-xiaoxi text-white" style="font-size: 50rpx;top: 75rpx;right: 20rpx;z-index: 2;"></view>
					</navigator>
			<image src="../../static/images/bg.jpg" style="height: 320rpx;width: 100%;"></image>
			<view class="d-flex  a-center position-absolute left-0 right-0 " style="bottom: 50rpx;">
				<image src="../../static/images/demo/demo6.jpg" style="width: 145rpx;height: 145rpx;border:5rpx solid" class="rounded-circle border-light ml-4"></image>
				<navigator url="../login/login">
					<view class="ml-2 text-white font-md"> lly</view>
				</navigator>
				<view class="ml-auto px-2 d-flex a-center j-center a-self-end" style="height: 70rpx;background-color:#ffd43f ;color: #cc4a00; border-top-left-radius: 40rpx;border-bottom-left-radius: 40rpx;">
					<view class="icon icon-huangguan line-h mr-1"></view>会员积分 1.11
				</view>
			</view>
		</view>
		<!--我的订单  -->
		<card>
			<view class="d-flex j-sb a-center" slot="title">
				<text class="font-md font-weight">
					我的订单
				</text>
				<view class="text-secondary font" @click="navigate('order')">
					全部订单 <text class="icon icon-you font"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="flex-1  d-flex flex-column a-center j-center  py-3 " hover-class="bg-light-secondary" v-for="(item,index) in orderTabs" :key="index">
					<view class="icon icon-cpu font-md font-lg line-h">

					</view>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<uni-list-item title="小米会员" showExtraIcon leftIcon="icon-VIP" leftIconStyle="color:#fdbf2e"></uni-list-item>
		<uni-list-item title="会员中心" showExtraIcon leftIcon="icon-huangguan" leftIconStyle="color:#fcbe2d"></uni-list-item>
		<uni-list-item title="服务中心" showExtraIcon leftIcon="icon-service" leftIconStyle="color:#fa6c5e"></uni-list-item>
		<uni-list-item title="小米之家" showExtraIcon leftIcon="icon-home" leftIconStyle="color:#fe8b42"></uni-list-item>
		<uni-list-item title="更多功能" showExtraIcon leftIcon="icon-gengduo" leftIconStyle="color:#9ed45a"></uni-list-item>
		<divider></divider>
		<uni-list-item title="更多设置" showExtraIcon leftIcon="icon-icon_set_up" leftIconStyle="color:#808c98" @click="navigate('user-set')"></uni-list-item>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
import loading from "@/common/mixin/loading.js"
	export default {
		mixins:[loading],
		components: {
			card,
			uniListItem
		},
		data() {
			return {
				orderTabs:[
					{
						icon:'icon-daishouhuo',
						name:'待付款'
					},
					
					{
						icon:'icon-daishouhuo',
						name:'待发货'
					},
					{
						icon:'icon-daishouhuo',
						name:'待收货'
					},
					{
						icon:'icon-daishouhuo',
						name:'待评价'
					},
					{
						icon:'icon-daishouhuo',
						name:'退款/售后'
					}
				]
			}
		},
		methods: {
		
			navigate(path){
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			}
		}
	}
</script>

<style>

</style>
