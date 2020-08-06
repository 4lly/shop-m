<template>
	<view>
		<view class="p-2">
			<view class="d-flex a-center py-2 border-bottom border-light-secondary">
				<text class="text-muted">用户评价 ({{total}})</text>
				<text class="main-text-color ml-auto mr-1">{{good_rate*100}}%</text>
				<text class="text-muted">满意</text>
			</view>
			<view class="d-flex flex-wrap pt-2" style="margin-right: -20rpx;">
				<view class="px-2 py border rounded mr-2 mb-2 cate-item" v-for="(item,index) in cateList" :key="index" :class="cateIndex===index?'active':''"
				 @click="cateChange(index)">
					{{item.name}}
				</view>
			</view>
		</view>
		<divider />


		<!-- 评论内容 -->
		<view class="p-2 d-flex a-start border-bottom border-light-secondary" v-for="(item,index) in list" :key="index">
			<image :src="item.user.avatar" mode="widthFix" style="width: 90rpx;height: 90rpx;" class="flex-shrink"></image>
			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-md text-primary font-weight">{{item.user.nickname}}</text>
					<view class="icon icon-service  main-text-color ml-auto d-flex a-center">
						<text class="pl-1 font">{{item.rating |rating}}</text>
					</view>
				</view>
				<view class="line-h-md font-md"> {{item.review.data}}</view>
				<view class="row" v-if="item.review.image.length>0">
					<view class="span24-8 px pb" v-for="(img,imgIndex) in item.review.image" :key="imgIndex">
						<image :src="img" style="height:100rpx;" mode="widthFix"></image>
					</view>
				</view>
				<view class="d-flex a-center">
					<text class="text-light-muted">{{item.review_time}}</text>
					<view class="ml-auto d-flex a-center text-light-muted mr-1">
						{{item.goods_num}} <text class="icon icon-dianzan text-muted ml"></text>
					</view>
					<view class="d-flex a-center text-light-muted">
						10 <text class="icon icon-pinglun text-muted ml"></text>
					</view>
				</view>
				<!-- 客服回复 -->
				<view class="bg-light-secondary rounded p-2 d-flex flex-wrap  a-center mt-1" v-if="item.extra">
					<text class="main-text-color">官方回复：</text>{{item.extra[0].data}}
					<view class="icon icon-dianzan text-light-muted line-h-md font ml-2">
						<text class="text-muted pl-1">赞客服 {{item.extra[0].goods_num}}</text>
					</view>
				</view>
			</view>
		</view>
		<divider></divider>
		<!-- 上拉加载更多 -->
		<view class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadingText}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingText: '上拉加载更多',
				id: 0,
				page: 1,
				total: 0,
				// 好评率
				good_rate: 0,
				cateIndex: 0,
				cateList: [{
						name: '全部',
						value: ''
					},
					{
						name: '好评',
						value: '/good'
					},
					{
						name: '中评',
						value: '/middle'
					},
					{
						name: '差评',
						value: '/bad'
					}
				],
				list: []
			}
		},
		filters: {
			rating(value) {
				if (value === 3) {
					return '中评'
				} else if (value > 3) {
					return '好评'
				} else {
					return '差评'
				}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.__init()
		},
		onReachBottom() {
			if (this.loadingText !== '上拉加载更多') return
			this.page++
			this.loadingText !== '加载中...'
			this.getData()

		},
		onPullDownRefresh() {
			this.getData(true,() => {
				uni.showToast({
					title: '刷新成功',
					icon:'none'
				});
				uni.stopPullDownRefresh()
			})
		},

		methods: {
			async __init() {
				this.getData()
			},
			async getData(refresh = false,callback) {
				let page = refresh?1:this.page
				let res = await this.$http.get(
					`/goods/${this.id}/comments${this.cateList[this.cateIndex].value}?page=${page}`)
				this.good_rate = res.good_rate
				this.total = res.total
				this.list = !refresh ? [...this.list, ...res.list] : res.list
				this.loadingText = res.list.length < 10 ? '没有更多了' : '上拉加载更多'
				if (typeof callback === 'function') {
					callback()
				}
			},
			cateChange(index) {
				this.cateIndex = index
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				this.getData(true,() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.cate-item {
		background-color: #ffebec !important;
		color: #7b6d6c !important;
		border-color: #f4e0e1 !important;
	}

	.cate-item.active {
		background-color: #ff6b01 !important;
		color: #fff !important;
		border-color: #de7232 !important;
	}
</style>
