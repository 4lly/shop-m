<template>
	<scroll-view :scroll-into-view="scrollInto" scroll-x class="border-bottom scroll-row" scroll-with-animation style="height: 80rpx;">
		<view :id="'tab'+index" class="scroll-row-item px-3" @click="changeTab(index)" :class="tabIndex===index?'main-text-color':''"
		 style="height: 80rpx;line-height: 80rpx;" v-for="(item,index) in tabBars" :key="index">
			<text class="font-md">{{item.name}}</text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			tabBars: {
				type: Array,
				default: []
			},
			tabIndex:{
				type: Number,
				default: 0
			},
			scrollInto:String
		},
		data() {
			return {};
		},
		mounted() {

		},
		methods: {
			changeTab(index) {
				this.$emit('changeTab',index)
			}
		}
	}
</script>

<style>
</style>
