<template>
	<view style="height: 100%;" class="d-flex flex-column">
		<!-- 选项卡 -->
		<view class="flex-shrink d-flex a-center bg-white text-muted font-md border-top border-light-secondary border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2" :class="tabIndex===index?'tabactive':''" v-for="(item,index) in tabBars"
			 :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		<scroll-view scroll-y class="flex-1" style="background-color: #F5F5F5;">
			<!-- 订单列表 -->
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative" style="min-height: 440rpx;" v-show="tabIndex === tabI">
					<template v-if="tab.list.length>0">
						<!-- 订单列表 -->
						<block v-for="(item,index) in tab.list" :key="index">
							<order-list :item="item" :index="index" />
						</block>
					</template>
					<template v-else>
						<!-- 默认页面 -->
						<no-thing :msg="tab.msg" :icon="tab.no_thing"></no-thing>
					</template>
				</view>
			</block>




			<!-- 为你推荐-->
			<view class="text-center main-text-color font-md font-weight mt-5">
				为你推荐
			</view>
			<view class="position-relative d-flex a-center j-center text-secondary pt-3 mb-4">
				<view class="px-2 position-absolute" style="background-color: #F5F5F5;z-index: 2;">
					买的人还买了
				</view>
				<view class="position-absolute" style="height: 1rpx;left: 0;right: 0;background-color: #ddd;"></view>
			</view>
			<view class="row j-sb bg-white">
				<block v-for="(item,index) in hotList" :key="index">
					<common-list :item="item" :index="index" />
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import orderList from '@/components/order/order-list.vue'
	export default {
		components: {
			commonList,
			orderList
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '全部',
						id: 0,
						msg: '您还没有订单',
						no_thing: 'no_pay',
						list: [{
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
							},
							{
								create_time: '2020-06-06',
								status: '已发货',
								order_items: [{
									cover: "/static/images/demo/demo6.jpg",
									title: "小米10",
									pprice: 299.00,
									attrs: '金色 标配',
									num: 3
								}],
								total_num: 3,
								total_price: 698.00
							}
						]
					},
					{
						name: '待付款',
						id: 1,
						no_thing: 'no_pay',
						msg: '您还没有待付款的订单',
						list: []
					},
					{
						name: '待发货',
						id: 1,
						no_thing: 'no_pay',
						msg: '您还没有待发货的订单',
						list: []
					},
					{
						name: '待收货',
						id: 2,
						no_thing: 'no_receiving',
						msg: '您还没有待收货的订单',
						list: []
					},
					{
						name: '待评价',
						id: 3,
						no_thing: 'no_comment',
						msg: '您还没有待评价的订单',
						list: []
					}
				],

				hotList: [{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹变频',
						oprice: 2696,
						pprice: 1996
					},
					{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹变频',
						oprice: 2696,
						pprice: 1996
					}, {
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹变频',
						oprice: 2696,
						pprice: 1996
					}
				]
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style>
	.tabactive {
		border-bottom: 5rpx solid #FD6801;
		color: #FD6801;
		margin-bottom: -5rpx;
	}
</style>
