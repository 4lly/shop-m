<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifndef APP-PLUS -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 中 -->
			<view class="flex-1 bg-light-secondary rounded d-flex a-center text-light-muted mx-2" style="height: 65rpx;">
				<input class="pl-2" v-model="keyword" placeholder="智能积木" placeholder-class="font-md" focus @confirm="searchComfirm"></input>
			</view>
			<!-- 右 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="font-md" @click="search">搜索</text>
			</view>
		</view>
		<!-- #endif -->
		<!-- 大图广告位 -->
		<card headTitle="热门搜索" bodyCover="/static/images/demo/search-banner.png" />
		<!-- 多色按钮 -->
		<view class="px-1 mb-2">
			<color-tag :item="item" v-for="(item,index) in hot" :key="index" @click="quickSearch(item.name)" />
		</view>
		<!-- 常用分类 -->
		<card headTitle="常用分类" :headborderBottom="false" :bodyPadding="true">
			<color-tag :item="item" v-for="(item,index) in cate" :color="false" :key="index" @click="quickSearch(item.name)" />
		</card>
		<template v-if="historyList.length>0">
			<!-- 分割线 -->
			<divider />
			<!-- 搜索记录 -->
			<card headTitle="搜索记录" :headborderBottom="false">
				<view slot="right" @click="clearHistory" class="text-primary font">清除记录</view>
				<uni-list-item v-for="(item,index) in historyList" :key="index" :title="item" :showArrow="false" @click="quickSearch(item)"></uni-list-item>
			</card>
		</template>

	</view>
</template>

<script>
	import card from '@/components/common/card.vue'
	import colorTag from '@/components/search/color-tag.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			card,
			colorTag,
			uniListItem
		},
		data() {
			return {
				keyword: '',
				hot: [{
						name: '领券中心'
					},
					{
						name: 'Readmi k20'
					},
					{
						name: 'ReadmiBook 14'
					},
					{
						name: '智能积木 越野四驱车'
					},
					{
						name: '手环 腕带'
					}
				],
				cate: [{
						name: '耳机'
					},
					{
						name: '手机'
					},
					{
						name: '音响'
					},
					{
						name: '手表'
					},
					{
						name: '配件'
					},
					{
						name: '网关/传感器'
					},
					{
						name: '健康'
					},
					{
						name: '酷玩'
					}
				],
				historyList: []
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.search()
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			this.search()
			//  #ifdef APP-PLUS
			plus.key.hideSoftKeybord()
			// #endif
			// #ifndef APP-PLUS
			uni.hideKeyboard()
			// #endif
		},
		onLoad() {
			this.__init()
			// 开启监听选择收货地址事件
			uni.$on('refresh', keyword => {
				this.keyword = keyword
				this.__init()
			})
		},
		onUnload() {
			uni.$off('refresh', () => {})
		},
		updated() {
			console.log(this.keyword)
		},
		methods: {
			quickSearch(name) {
				this.keyword = name
				this.search()
			},
			__init() {
				this.historyList = uni.getStorageSync("searchHistory") ? JSON.parse(uni.getStorageSync("searchHistory")) : []
			},
			// 清除搜索历史
			clearHistory() {
				uni.showModal({
					title: '提示',
					content: '是否要清除搜索历史?',
					success: res => {
						if (res.confirm) {
							this.historyList = []
							uni.removeStorageSync('searchHistory')
							uni.showToast({
								title: '清除成功',
								icon: 'none'
							});
						}
					}

				});
			},
			searchComfirm() {
				this.search()
			},
			search() {
				if (this.keyword === '') {
					return uni.showToast({
						title: '关键词不能为空',
						icon: 'none'
					});
				}
				uni.navigateTo({
					url: '../search-list/search-list?keyword=' + this.keyword
				});
				setTimeout(() => {
					this.addHistory()
				}, 500)

			},
			// 加入搜索记录
			addHistory() {
				let index = this.historyList.indexOf(this.keyword)
				if (index === -1) {
					this.historyList.unshift(this.keyword)
				} else {
					this.historyList.unshift(this.historyList.splice(index, 1)[0])
				}
				// 移除最后一条
				if(this.historyList.length>6){
					this.historyList.splice(this.historyList.length-1,1)
				}
				uni.setStorageSync('searchHistory', JSON.stringify(this.historyList))
			},
			openSearchList() {
				uni.navigateTo({
					url: '../search-list/search-list'
				})
			}
		}
	}
</script>

<style>

</style>
