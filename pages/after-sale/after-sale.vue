<template>
	<view>
		<divider></divider>
		<card headTitle="申请售后的产品" cardStyle="background:#fff" bodyPadding>
			<view class="d-flex a-center px-3 py-2">
				<image class="flex-shrink" src="../../static/images/demo/list/1.jpg" mode="widthFix" style="height: 100rpx;width: 100rpx;"></image>
				<view class="flex-1 ml-2">
					<view class="font-md line-h">
						小米10 红色 128GB 标准版
					</view>
					<view class="text-light-muted font">
						维修服务:还剩111天
					</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<card headTitle="服务类型" cardStyle="background:#fff" bodyPadding>
			<radio-groups :label="label" :selected.sync='label.selected'></radio-groups>
		</card>
		<divider></divider>
		<card headTitle="问题描述" cardStyle="background:#fff" bodyPadding>
			<view class="position-relative">
				<textarea class="border border-light-secondary p-2 rounded" placeholder="请详细描述一下您遇到的问题" v-model="content" :maxlength="maxlength" style="width: 100%;height: 400rpx;box-sizing: border-box;"></textarea>
				<view class="position-absolute text-light-muted font" style="bottom: 5rpx;right: 10rpx;">
					{{remain}}/{{maxlength}}
				</view>
			</view>
		</card>
		<view class="p-3">
			<view class="text-center rounded py-2 w-100 main-bg-color text-white font-md" hover-class="main-bg-hover-color">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import radioGroups from '@/components/common/radio-group.vue'
	export default {
		components: {
			card,
			uniListItem,
			radioGroups
		},
		data() {
			return {
				content:'',
				maxlength:200,
				label:{
					
					selected:0,
					list:[
						{name:'维修'}
					]
				}
				
			}
		},
		computed:{
			// 剩余可输入字数
			remain(){
				return this.maxlength -this.content.length
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
