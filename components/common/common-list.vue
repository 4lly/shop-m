<template>
	<!-- 公共列表组件 750-5= 745 372.5 -->
	<view style="width: 372.5rpx;" @click="openDetail">
		<image :src="item.cover" mode="widthFix" lazy-load></image>
		<view class="p-2 pt-1">
			<view class="font-md nowarp" >{{item.title}}</view>
			<view class="font text-light-muted nowarp">{{item.desc}}</view>
			<view class="d-flex my-1">
				<!-- 价格组件 -->
				<price>{{item.pprice}}</price>
				<view class="font-sm text-light-muted line-through ml-1 a-self-end line-h">
					￥{{item.oprice}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/common/price.vue'
	export default {
		props: {
			// 头部标题
			item: Object,
			index: Number
		},
		data() {
			return {};
		},
		components: {
			price
		},
		mounted() {

		},
		methods: {
			openDetail() {
				uni.redirectTo({
					url: '../../pages/detail/detail?detail='+JSON.stringify(this.item)
				})
			}
		}
	}
</script>

<style scoped>
	.nowarp {
		/* white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */
	}
</style>
