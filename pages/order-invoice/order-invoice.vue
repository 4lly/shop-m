<template>
	<view>
		<divider></divider>
		<card bodyPadding headTitle="发票类型" cardStyle="background: #fff;">
			<radio-groups :label="label1" :selected.sync="label1.selected"></radio-groups>
			<view class="text-light-muted line-h-md">
				电子发票与纸质发票具有相同的法律效应，可作为报销、售后、维权凭证，推荐使用电子发票，不怕丢失，更方便，环保。
			</view>
		</card>
		<divider></divider>
		<card bodyPadding headTitle="发票抬头" cardStyle="background: #fff;">
			<radio-groups :label="label2" :selected.sync="label2.selected"></radio-groups>
		</card>
		<divider></divider>
		<view class="d-flex a-center p-2 border-bottom border-light-secondary bg-white">
			<text class="font-md">个人姓名：</text>
			<text class="font-md">个人</text>
		</view>
		<view class="d-flex a-center p-2 border-bottom border-light-secondary bg-white">
			<text class="font-md">发票内容：</text>
			<text class="font-md">商品明细</text>
		</view>
		<divider></divider>
		<view class="d-flex a-center p-2 border-bottom border-light-secondary bg-white">
			<text class="font-md">收票人手机：</text>
			<text class="font-md">17608441466</text>
		</view>
		<view class="p-2 text-secondary d-flex flex-column">
			<text>发票须知：</text>
			<text>1.发票为实际支付金额，不包括优惠券等；</text>
			<text>2.电子发票可在订单完成后，在订单详情中查看；</text>
		</view>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue'
	import radioGroups from '@/components/common/radio-group.vue'
	export default {
		components: {
			card,
			radioGroups
		},
		data() {
			return {
				label1: {
					selected: 0,
					list: [{
							name: '电子发票'
						},
						{
							name: '纸质发票'
						}
					]
				},
				label2: {
					selected: 0,
					list: [{
							name: '个人'
						},
						{
							name: '单位'
						}
					]
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #EEEEEE;
	}
</style>
