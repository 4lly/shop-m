<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex a-center bg-white text-muted font-md border-top border-light-secondary border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2" :class="tabIndex===index?'tabactive':''" v-for="(item,index) in tabBars"
			 :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		<!-- 订单列表 -->
		<scroll-view scroll-y class="flex-1" style="background-color: #f5f5f5;">

			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative " style="min-height: 440rpx;" v-show="tabIndex === tabI">
					<template v-if="tab.list.length>0">
						<!-- 优惠券列表 -->
						<view class="p-3">
							<block v-for="(item,index) in tab.list" :key="index">
								<coupon :item="item" :index="index"/>
							</block>
						</view>
					</template>
					<template v-else>
						<!-- 默认页面 -->
						<no-thing :msg="tab.msg" :icon="tab.no_thing"></no-thing>
					</template>
				</view>
			</block>
		</scroll-view>


	</view>
</template>

<script>
	import coupon from '@/components/order-coupon/coupon.vue'
	export default {
		components:{
			coupon
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: '可用',
						id: 0,
						msg: '您还没有可用的优惠券',
						no_thing: 'no_pay',
						list: [{
								title: '手机立减1000元',
								start_time: '2019-12-12',
								end_time: '2020-12-12',
								price: 1000,
								desc: '满3000元使用',
								status: true, //可用/失效
								disabled: false // 是否禁用

							},
							{
								title: '手机立减1000元',
								start_time: '2019-12-12',
								end_time: '2020-12-12',
								price: 1000,
								desc: '满3000元使用',
								status: true,
								disabled: true

							}
						]
					},
					{
						name: '已失效',
						id: 1,
						no_thing: 'no_pay',
						msg: '您还没有已失效的优惠券',
						list: [{
								title: '手机立减1000元',
								start_time: '2019-12-12',
								end_time: '2020-12-12',
								price: 1000,
								desc: '满3000元使用',
								status: false, //可用/失效
								disabled: true // 是否禁用

							}
						]
					}

				],

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
