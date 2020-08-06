<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">卖家已发货</view>
				<view class="font">还差7天10时自动确认</view>
			</view>
			<view class="icon icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<!-- 收货地址 -->
		<view class="p-3 ">
			<view class="text-light-muted font-md">
				<text class="font-lg text-dark mr-2">lly</text> 17608441466
			</view>
			<view class="text-light-muted font-md">
				广东省 广州市 白云区 xxx街道
			</view>
		</view>
		<divider></divider>
		<!-- 商品列表 -->
		<view class="px-2">
			<block v-for="(item,index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"></order-list-item>
			</block>
		</view>
		<divider></divider>
		<uni-list-item :showArrowIcon="false">
			<view class="text-muted">商品总价</view>
			<text slot="rightContent" class="text-muted">￥123</text>
		</uni-list-item>
		<uni-list-item :showArrowIcon="false">
			<view class="text-muted">快递</view>
			<text slot="rightContent" class="text-muted">￥123</text>
		</uni-list-item>
		<uni-list-item :showArrowIcon="false">
			<view class="text-muted">优惠券</view>
			<text slot="rightContent" class="text-muted">￥123.00</text>
		</uni-list-item>
		<uni-list-item :showArrowIcon="false">
			<view class="main-text-color">实际付款</view>
			<price slot="rightContent">123</price>
		</uni-list-item>
		<divider></divider>
		<card headTitle="订单信息">
			<uni-list-item title="订单编号" :showArrowIcon="false" extraWidth="40%">
				<text slot="rightContent" class="text-muted">NO123456789</text>
			</uni-list-item>
		</card>
	</view>
</template>

<script>
	import orderListItem from '@/components/order/order-list-item.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import card from '@/components/common/card.vue'
	import price from '@/components/common/price.vue'
	export default {
		components: {
			orderListItem,
			uniListItem,
			price,
			card
		},
		data() {
			return {
				create_time: '2020-06-06',
				status: '已发货',
				order_items: [{
						cover: "/static/images/demo/demo6.jpg",
						title: "小米10",
						pprice: 299.00,
						attrs: '金色 标配',
						num: 1
					},
					{
						cover: "/static/images/demo/demo6.jpg",
						title: "小米10",
						pprice: 299.00,
						attrs: '金色 标配1',
						num: 1
					}
				],
				total_num: 2,
				total_price: 698.00
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
