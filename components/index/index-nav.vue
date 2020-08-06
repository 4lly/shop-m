<template>
	<view>
		<!-- 首页图标分类 -->
		<view class="row j-center m-2">
			<block v-for="(item,index) in resdata" :key="index">
				<view @tap="event(item)" class="span-4 d-flex flex-column a-center j-center py-1">
					<image :src="item.src" style="width: 60rpx; height: 60rpx;" mode="widthFix"></image>
					<text>{{item.text}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['resdata'],
		data() {
			return {
				
			};
		},
		methods: {
			event(item) {
				console.log('点击了图标')
			}
		}
	}
</script>

<style>
</style>
