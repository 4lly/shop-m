<template>

	<!-- 基础卡片组件 -->
	<view class="card" :style="cardStyle">
		<!-- 标题 -->
		<view v-if="showhead" class="p-2 main-border-color d-flex a-center j-sb" :class="getHeadClass">
			<slot name="title">
				<text v-if="headTitle" class="font-md" :class="headTitleWeight?'font-weight':''">{{headTitle}}</text>
			</slot>
			<slot name="right"></slot>
		</view>
		<!-- body -->
		<view :class="getBodyClass" :style="bodyStyle">
			<image v-if="bodyCover" :src="bodyCover" mode="widthFix"></image>
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bodyStyle:String,
			// 头部标题
			headTitle: String,
			// 封面图
			bodyCover: String,
			// 是否显示头部
			showhead: {
				type: Boolean,
				default: true
			},
			// 标题是否加粗
			headTitleWeight: {
				type: Boolean,
				default: true
			},
			// 是否显示下边线
			headborderBottom: {
				type: Boolean,
				default: true
			},
			// 是否给body加padding bodyPadding
			bodyPadding: {
				type: Boolean,
				default: false
			},
			cardStyle:{
				type: String,
				default: ''
				}
		},
		data() {
			return {};
		},
		mounted() {

		},
		computed: {
			getBodyClass() {
				let bodyPadding = this.bodyPadding ? 'p-2' : ''
				return `${bodyPadding}`
			},
			getHeadClass() {
				let borderBottom = this.headborderBottom ? 'border-bottom' : ''
				return `${borderBottom}`
			}
		},
		methods: {
			event(item) {
				console.log('点击了three图片')
			}
		}
	}
</script>

<style >
</style>
