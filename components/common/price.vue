<template>

	<!-- 价格组件 -->
	<view class="d-flex  font-md line-h" :class="priceSize + ' ' + color">
		<text class="a-self-start font-sm" :class="unitSize">￥</text><slot />
	</view>
</template>

<script>
	export default {
		props:{
			priceSize:{
				type:String,
				default:'font-md'
			},
			unitSize:{
				type:String,
				default:'font-sm'
			},
			color:{
				type:String,
				default:'main-text-color'
			}
		},
		data() {
			return {};
		},
		mounted() {

		},
		methods: {
			event(item) {
				console.log('点击了three图片')
			}
		}
	}
</script>

<style>

</style>
