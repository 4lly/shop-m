<template>
	<view>
		<view class="d-flex a-center bg-light-secondary j-center flex-column py-5 my-3">
			<image src="../../static/images/demo/cate_02.png" mode="widthFix" style="width: 100rpx;height: 100rpx;"></image>
			<view class="text-light-muted font-md">
				小米商城：1.1.1
			</view>
		</view>
		<view class="bg-white">
			<uni-list-item title="版本更新"></uni-list-item>
			<uni-list-item title="了解小米"></uni-list-item>
			<uni-list-item title="官方微博"></uni-list-item>
			<uni-list-item title="廉洁小米"></uni-list-item>
			<uni-list-item title="版本更新"></uni-list-item>
			<uni-list-item title="版本更新"></uni-list-item>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
page{
	background: #EEEEEE;
	}
</style>
