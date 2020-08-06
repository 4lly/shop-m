<template>
	<view>
		<view @click="test">vew 给nvue 发送信息 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// vue 给nvue 发送数据
			test() {
				let pages = getCurrentPages()
				let index = pages[0].$getAppWebview()
				plus.webview.postMessageToUniNView({
					msg:'hello word'
				},index.id)
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
