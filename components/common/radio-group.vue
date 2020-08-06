<template>
	<!-- 单选按钮组 -->
	<view class="row">
		<view class="span24-8 px-2 mb-2" v-for="(item,index) in label.list" :key="index">
			<view class="px-2 py-1 bg-light-secondary rounded font-md text-center border" :class="label.selected === index ? 'radio-active' :'border-light-secondary' "
			 @click="changeRadio(index)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			label:{
				type:Object
			}
		},
		data() {
			return {};
		},
		mounted() {
	
		},
		methods: {
			changeRadio(index) {
				console.log('点击了changeRadio')
				// this.$emit('changeRadio',index)
				this.$emit('update:selected',index)
			}
		}
	}
</script>

<style scoped>
	.radio-active {
		background-color: #ECE0D5 !important;
		color: #EB7320 !important;
		border-color: #EB7320 !important;
	}
</style>
