<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifndef APP-PLUS -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center" >
				<text class="icon icon-xiaoxi"></text>
			</view>
			<!-- 中 -->
			<view class="flex-1 bg-light-secondary rounded d-flex a-center text-light-muted" style="height: 65rpx;" @click="openSearch">
				<text class="icon icon-sousuo mx-2"></text>智能积木
			</view>
			<!-- 右 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="icon icon-richscan_icon"></text>
			</view>
		</view>
		<!-- #endif -->


		<!-- 顶部选项卡 -->
		<index-tabbar :scrollInto="scrollInto" :tabBars="tabBars" :tabIndex="tabIndex" @changeTab="changeTab"></index-tabbar>
		<!-- 滑块 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newsitems" :key="index">
				<scroll-view scroll-y :style="'height:'+scrollH+'px;'" @scrolltolower="loadMore(index)" @scrolltoupper="refresh(index)">
					<template v-if="item.data.length>0 && item.firstLoad==='after'">
						<block v-for="(list,listIndex) in item.data" :key="listIndex">
							<!-- 轮播图组件 -->
							<swiper-image v-if="list.type==='swiper'" :resdata="list.data" />
							<!-- 首页图标分类 -->
							<template v-else-if="list.type==='indexnavs'">
								<index-nav :resdata="list.data" />
								<!-- 全局分割线 -->
								<divider />
							</template>

							<!-- 三图广告 -->
							<template v-else-if="list.type==='threeAdv'">
								<three-adv :resdata="list.data" />
								<divider />
							</template>
							<!-- 大图广告位 -->
							<card v-else-if="list.type==='oneAdv'" :headTitle="list.data.title" :bodyCover="list.data.cover" />
							<!-- 公共列表组件 -->
							<view class="row j-sb" v-else-if="list.type==='list'">
								<block v-for="(item2,index2) in list.data" :key="index2">
									<common-list :item="item2" :index="index2" />
								</block>
							</view>
						</block>
						<divider />
						<!-- 上拉加载更多 -->
						<view class="d-flex a-center j-center text-light-muted font-md py-3">
							{{item.loadingText}}
						</view>
					</template>
					<!-- 加载中 -->
					<template v-else-if="item.firstLoad==='ing'">
						<view class="pt-5 font-md text-light-muted d-flex a-center j-center ">
							加载中...
						</view>
					</template>
					<!-- 空数据 -->
					<template v-else>
						<view class="pt-5 font-md text-light-muted d-flex a-center j-center ">
							暂无数据.
						</view>
					</template>

				</scroll-view>
			</swiper-item>

		</swiper>

	</view>
</template>
<script>
	import swiperImage from '@/components/index/swiper-image.vue'
	import indexNav from '@/components/index/index-nav.vue'
	import threeAdv from '@/components/index/three-adv.vue'
	import card from '@/components/common/card.vue'
	import commonList from '@/components/common/common-list.vue'
	import indexTabbar from '@/components/index/index-tabbar.vue'
	export default {
		components: {
			swiperImage,
			indexNav,
			threeAdv,
			card,
			commonList,
			indexTabbar
		},
		data() {
			return {
				scrollInto: '',
				scrollH: 500,
				tabIndex: 0,
				tabBars: [],
				newsitems: []
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		onLoad() {
			// 获取可视区域高度
			uni.getSystemInfo({
				success: res => {
					// #ifndef MP
					let navbarH = 0
					// #endif
					// #ifdef MP
					let navbarH = uni.upx2px(90)
					// #endif
					this.scrollH = res.windowHeight - uni.upx2px(82) - navbarH
				}
			})
			// 初始化事件
			this.__init()
		},
		// currentWebview.removeEventListener('show', () => {})
		methods: {
			openSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			refresh(index) {
				this.newsitems[index].refreshText = '正在刷新'
				this.addData(() => {
					uni.showToast({
						title: '下拉刷新成功',
						icon: 'none'
					});
					this.newsitems[index].refreshText = '下拉可以刷新'
					uni.stopPullDownRefresh()

				}, true)
			},
			// 初始化事件
			async __init() {
				let res = await this.$http.get('/index_category/data')
				// 获取顶部选项卡
				// this.tabBars = demoTabBars
				this.tabBars = res.category
				// 初始化页面
				this.newsitems = this.setNewsitems(res)

			},
			// 初始化页面
			setNewsitems(e) {
				// 更具顶部选项卡生成页面
				let arr = []
				let tablength = this.tabBars.length
				for (let i = 0; i < tablength; i++) {
					let firstLoad = i === 0 ? 'after' : 'before'
					let aryItem = {
						// list: [],
						// 1.上拉加载更多 2.加载中 3.没有更多了
						loadingText: '上拉加载更多',
						data: [],
						loadingShow: 'hide',
						refreshShow: 'hide',
						refreshText: '下拉可以刷新',
						firstLoad
					}
					// 获取首屏数据
					if (this.tabBars[i].template === 'index') {
						aryItem.data = e.data
					}
					arr.push(aryItem)
				}
				return arr
			},
			// 切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) return
				this.tabIndex = index
				this.scrollInto = 'tab' + index
				if (this.newsitems[this.tabIndex].firstLoad === 'before') {
					this.addData()
				}

			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			// 加载/刷新数据
			async addData(callback = false, refresh = false) {
				// 拿到当前索引
				let index = this.tabIndex
				// 拿到当前分类的id
				let id = this.tabBars[index].id
				// 拿到当前分类的分页数 0 
				let page = !refresh ? Math.ceil(this.newsitems[index].data.length / 5) + 1 : 1
				// 首次加载中
				if (page === 1) {
					this.newsitems[index].firstLoad = 'ing'
				}
				let res = await this.$http.get(`/index_category/${id}/data/${page}`)
				// 成功
				// 首次加载完成，修改请求状态
				if (page === 1) {
					this.newsitems[index].firstLoad = 'after'
				}
				// 成功
				this.newsitems[index].data = !refresh ? [...this.newsitems[index].data, ...res] : [...res]
				if (typeof callback === 'function') {
					callback()
				}
				// 没有更多了
				if (res.length < 5) {
					this.newsitems[index].loadingText = '没有更多了'
				}

			},
			// 上拉加载更多
			async loadMore(index) {
				// 拿到当前索引
				// let index = this.tabIndex
				// 获取当前对象
				let item = this.newsitems[index]
				// 时候否处于可加载状态
				if (item.loadingText !== '上拉加载更多') return uni.showToast({
					title: '没有更多了',
					icon: 'none'
				});
				// 模拟加载
				item.loadingText = '加载中'
				await this.addData(() => {
					uni.showToast({
						title: '加载成功',
						icon: 'none'
					});
					item.loadingText = '上拉加载更多'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
