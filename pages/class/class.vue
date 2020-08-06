<template>
	<view class="d-flex border-top border-light-secondary animated fadeIn faster" style="height: 100%; box-sizing: border-box;">
		<loading v-if="beforeReady"></loading>
		<scroll-view id="leftScroll" :scroll-top="leftScrollTop" scroll-y style="flex: 1;height: 100%;" class="border-right border-light-secondary">
			<view class="border-bottom border-light-secondary py-1 left-scroll-item" v-for="(item,index) in cate" :key="index"
			 hover-class="bg-light-secondary" @click="changeCate(index)">
				<view class="py-1 font-md text-muted text-center " :class="activeIndex===index?'class-avtive':''">{{item.name}}</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y style="flex: 3.5;height: 100%;" :scroll-top="rightScrollTop" scroll-with-animation @scroll="onRightScroll">
			<view class="row right-scroll-item" v-for="(item,index) in list" :key="index">
				<view class="span24-8 text-center py-2" v-for="(item2,index2) in item.list" :key="index2">
					<image :src="item2.src" style="width: 120rpx;height: 120rpx;"></image>
					<text class="d-block">{{item2.name}}</text>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js"
	export default {
		mixins:[loading],
		data() {
			return {
				msg: '',
				// 当前选中的分类
				activeIndex: 0,
				cate: [],
				list: [],
				leftDomsTop: [],
				rightDomsTop: [],
				rightScrollTop: 0,
				leftScrollTop: 0,
				cateItemHeight: 0,
			}
		},
		watch: {
			async activeIndex(newVal, oldVal) {
				// 获取scroll-view的高度，scrollTop的信息
				this.getElInfo({
					size: true,
					scrollOffset: true
				}).then(res => {
					let H = res.height
					let ST = res.scrollTop
					// 下边
					if ((this.leftDomsTop[newVal] + this.cateItemHeight) > (H + ST)) {
						return this.leftScrollTop = this.leftDomsTop[newVal] + this.cateItemHeight - H
					}
					// 上边
					if (ST > this.cateItemHeight) {
						return this.leftScrollTop = this.leftDomsTop[newVal]
					}
				})
			}
		},
		onLoad() {
			uni.$on('index', e => {
				// console.log('分类')
				// console.log(e)
				this.msg = e.msg
			})
			this.__init()

		},
		onReady() {
			this.getElInfo({
				all: 'left',
				size: true,
				rect: true
			}).then(res => {
				this.leftDomsTop = res.map(v => {
					this.cateItemHeight = v.height
					return v.top
				})
			})
			this.getElInfo({
				all: 'right',
				size: false,
				rect: true
			}).then(res => {
				this.rightDomsTop = res.map(v => v.top)
			})
		},
		onUnload() {
			uni.$off('index', () => {})
		},
		methods: {
			__init() {
				for (let i = 0; i < 20; i++) {
					this.cate.push({
						name: '分类' + i
					})
					this.list.push({
						list: []
					})
				}
				for (let i = 0; i < this.list.length; i++) {
					for (let j = 0; j < 24; j++) {
						this.list[i].list.push({
							src: '/static/images/demo/cate_03.png',
							name: `分类${i}-商品${j}`
						})
					}
				}
			},
			// 获取节点信息
			getElInfo(obj) {
				return new Promise((resolve, reject) => {
					let option = {
						size: obj.size ? true : false,
						rect: obj.rect ? true : false,
						scrollOffset: obj.scrollOffset ? true : false
					}
					const query = uni.createSelectorQuery().in(this);
					let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`) : query.select('#leftScroll')
					q.fields(option, data => {
						resolve(data)
					}).exec();
				})
			},
			// 点击左边分类
			changeCate(index) {
				console.log(index)
				this.activeIndex = index
				// 右边scroll-view滚动到对应区块
				this.rightScrollTop = this.rightDomsTop[index]

			},
			// 监听右边滚动事件
			async onRightScroll(e) {

				// console.log(e.detail.scrollTop)
				// 匹配当前scrollTop所处的索引
				this.rightDomsTop.forEach((v, index) => {
					if (v<e.detail.scrollTop + 3) {
						this.activeIndex = index
						return false
					}
				})
			}
		}
	}
</script>

<style>
	.class-avtive {
		border-left: 8rpx solid #FD6801;
		color: #FD6801 !important;
	}
</style>
