<template>
	<!-- 横向滚动评论 -->
	<view class="p-2" v-if="comments.length>0">
		<scroll-view scroll-x class="scroll-row">
			<view class="scroll-row-item rounded bg-light-secondary mr-2 p-2" style="width: 620rpx;height: 380rpx;" v-for="(item,index) in comments"
			 :key="index">
				<view class="d-flex a-center mb-2">
					<image :src="item.userpic" mode="widthFix" style="height: 70rpx;width: 70rpx;" class="rounded-circle"></image>
					<view class="ml-2">
						<text class="font-md line-h">{{item.username}}</text>
						<text class="font text-light-muted d-block line-h">{{item.create_time}}</text>
					</view>
					<view class="icon icon-dianzan text-light-muted font pl-1 ml-auto"> {{item.goods_num}}</view>
				</view>
				<view class="font-md mb-2">{{item.context}}</view>
				<view class="row">
					<view class="span24-8 px-2" v-for="(img,index) in item.imglist" :key="index">
						<image :src="img" mode="widthFix" style="height: 115rpx;" class="rounded"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class=" d-flex a-center j-center py-2 mt-2 text-primary" hover-class="bg-light-secondary"  @click="openComments">
			更多评论 <view class="icon icon-you"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['comments', 'goods_id'],
		methods: {
			openComments() {
				uni.navigateTo({
					url: '/pages/detail-comments/detail-comments?id=' + this.goods_id
				})
			}
		}
	}
</script>

<style>
</style>
