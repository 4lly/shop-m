<template>
	<view>
		<!-- 轮播图组件 -->
		<swiper indicator-dots circular autoplay :interval="3000" :duration="1000" :style="getStyle">
			<block v-for="(item,index) in resdata" :key="index">
				<swiper-item @tap="event(item,index)">
					<view class="swiper-item">
						<image :src="item.src" lazy-load :style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	import props from '@/common/mixin/props.js'
	export default {
		mixins: [props],
		props: {
			height: {
				type: String,
				default: '350'
			},
			preview: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		computed: {
			getStyle() {
				return `height:${this.height}rpx`
			},
			getUrls() {
				let arr = []
				for (let key in this.resdata) {
					arr.push(this.resdata[key].src)
				}
				console.log(arr)
				return arr

			}
		},
		methods: {
			event(item, index) {
				if (this.preview) {
					uni.previewImage({
						urls: this.getUrls,
						current: index
					})
				} else {
					console.log('点击了轮播图')
				}
			}
		}
	}
</script>

<style>

</style>
