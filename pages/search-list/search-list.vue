<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifndef APP-PLUS -->
		<view class="d-flex a-center bg-white" style="height: 90rpx;">
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
		<!-- 排序|搜索 -->
		<view class="position-relative d-flex border-top border-bottom bg-white a-center" style="height: 100rpx;z-index: 10;">
			<view class="flex-1 d-flex a-center j-center font-md" v-for="(item,index) in screen.list" :key="index" @tap="changeScreem(index)">
				<text :class="screen.currentIndex===index?'main-text-color':'text-muted'">{{item.name}}</text>
				<view>
					<view class="icon icon-paixu-shengxu line-h0 " :class="item.status===1?'main-text-color':'text-light-muted'"></view>
					<view class="icon icon-paixu-jiangxu line-h0 " :class="item.status===2?'main-text-color':'text-light-muted'"></view>
				</view>
			</view>
			<view class="flex-1 d-flex a-center j-center font-md main-text-color" @click="showDrawer">
				刷选
			</view>
		</view>


		<!-- 筛选 -->
		<uni-drawer :visible="showRight" mode="right" @close="hideDrawere">
			<card headTitle="价格范围" :headborderBottom="false" :headTitleWeight="false">
				<!-- 单选按钮组 -->
				<radio-groups :label="label" :selected.sync="label.selected"></radio-groups>
			</card>
			<!-- 按钮 -->
			<view class="d-flex position-fixed right-0 bottom-0 w-100">
				<view class="flex-1 main-bg-color text-white font-md py-2 text-center" hover-class="main-bg-hover-color" @click="comfrim">确定</view>
				<view class="flex-1 font-md py-2 text-center border-top border-light-secondary" hover-class="bg-light-secondary"
				 @click="reset">重置</view>
			</view>
		</uni-drawer>
		<!-- 列表 -->
		<view class="bg-white" v-if="list.length>0">
		<block v-for="(item,index) in list" :key="index">
			<search-list :item="item" :index="index"></search-list>
		</block>
		<!-- 上拉加载更多 -->
		<view class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadingText}}
		</view>
		</view>
		<!-- 没有数据 -->
		<view  v-else class="position-relative" style="min-height: 440rpx;" >
			<no-thing msg="空空如也"></no-thing>
		</view>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import card from '@/components/common/card.vue'
	import radioGroups from '@/components/common/radio-group.vue'
	import searchList from '@/components/search-list/search-list.vue'
	export default {
		components: {
			card,
			uniDrawer,
			radioGroups,
			searchList
		},
		data() {
			return {
				loadingText: '上拉加载更多',
				showRight: false,
				keyword: '',
				page: 1,
				condition: {},
				screen: {
					currentIndex: 0,
					list: [{
							name: '综合',
							key: 'all',
							status: 1
						},
						{
							name: '销量',
							key: 'sale_count',
							status: 0
						},
						{
							name: '价格',
							key: 'min_price',
							status: 0
						}
					]
				},
				label: {
					selected: 0,
					list: [{
							name: '不限',
							rule: false,
							value: false
						}, {
							name: '0-50',
							rule: 'between',
							value: '0,50'
						},
						{
							name: '50-100',
							rule: 'between',
							value: '50,100'
						},
						{
							name: '100-500',
							rule: 'between',
							value: '100,500'
						},
						{
							name: '500-1000',
							rule: 'between',
							value: '500,1000'
						},
						{
							name: '大于1000',
							rule: '>',
							value: '1000'
						}
					]
				},
				oldSelected: 0,
				list: [{
					title: '真无线蓝牙耳机',
					titlepic: '/static/images/demo/demo6.jpg',
					desc: '雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作',
					pprice: '999',
					comment_num: '990',
					good_num: '99%'
				}],
				historyList: []
			}
		},
		computed: {
			// 排序相关
			options() {
				let obj = this.screen.list[this.screen.currentIndex]
				let value = obj.status === 1 ? 'asc' : 'desc'
				return {
					[obj.key]: value
				}
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
		onLoad(e) {
			this.keyword = e.keyword
			// 修改搜索占位符
			// #ifdef APP-PLUS
			let currentWebview = this.$scope.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView
			tn.searchInput.placeholder = this.keyword
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif
			// 加载数据
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getData(true, () => {
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
			})
		},
		// 上拉加载
		onReachBottom() {
			if (this.loadingText !== '上拉加载更多') return
			this.page++
			this.loadingText = '加载中...'
			this.getData()
		},

		methods: {
			// 初始化数据
			__init() {
				this.page = 1
				this.list = []
				this.label.selected = 0
				this.oldSelected = 0
				this.condition = {}
			},
			showDrawer() {
				this.showRight = true
				// 记录已有的值
				this.oldSelected = this.label.selected
			},
			hideDrawere() {
				this.label.selected = this.oldSelected
				// 恢复原有的值
				this.showRight = true
				// 旧的值重置为0
				this.oldSelected = 0
			},
			// 组织筛选条件
			getCondition() {
				let item = this.label.list[this.label.selected]
				this.condition = (item.rule && item.value) ? {
					price: item.rule + ',' + item.value
				} : {}
			},
			// 重置筛选条件
			reset() {
				this.condition = {}
				this.label.selected = 0
				// 获取数据
				this.getData()
				this.showRight = false
			},
			// 提交筛选条件
			comfrim() {
				this.getCondition()
				// 获取数据
				this.getData()
				this.showRight = false
			},
			// 加载数据
			async getData(refresh = false, callback) {
				let page = refresh ? 1 : this.page
				let params = {
					title: this.keyword,
					page,
					...this.options,
					...this.condition
				}
				let res = await this.$http.post('/goods/search', params)
				let list = this.format(res)
				this.list = this.page === 1 ? [...list] : [...this.list, ...list]
				this.loadingText = list.length < 10 ? '没有更多了' : '上拉加载更多'
				if (typeof callback === 'function') {
					callback()
				}
			},
			// 格式化
			format(res) {
				return res.map(v => {
					let good_num = v.comments_count === 0 ? 0 : (v.comments_good_count / v.comments_count) * 100
					return {
						id: v.id,
						title: v.title,
						titlepic: v.cover,
						desc: v.desc,
						pprice: v.min_price,
						comment_num: v.comments_count,
						good_num: good_num.toFixed(2) + '%'
					}
				})
			},
			changeScreem(index) {
				// 判断当前点击是否已经是激活状态
				let oldIndex = this.screen.currentIndex
				let oldItem = this.screen.list[oldIndex]
				if (oldIndex === index) {
					oldItem.status = oldItem.status === 1 ? 2 : 1
				} else {
					let newItem = this.screen.list[index]
					// 移除旧激活状态
					oldItem.status = 0
					this.screen.currentIndex = index
					// 增加新激活状态
					newItem.status = 1
				}

				this.__init()
				// 加载数据
				this.getData()
			},
			changeRadio(index) {
				console.log('parant changeRadio')
				this.label.selected = index
			},
			searchComfirm() {
				
				this.search()
			},
			search() {
				this.__init()
				if (this.keyword === '') {
					return uni.showToast({
						title: '关键词不能为空',
						icon: 'none'
					});
				}
				this.addHistory()
				this.__init()
				this.getData()
				uni.$emit('refresh', this.keyword)
			},
			// 加入搜索记录
			addHistory() {
				let historyList = uni.getStorageSync("searchHistory") ? JSON.parse(uni.getStorageSync("searchHistory")) : []
				let index = historyList.indexOf(this.keyword)
				if (index === -1) {
					historyList.unshift(this.keyword)
				} else {
					historyList.unshift(historyList.splice(index, 1)[0])
				}
				uni.setStorageSync('searchHistory', JSON.stringify(historyList))
			},
		}
	}
</script>

<style>
	.radio-active {
		background-color: #ECE0D5 !important;
		color: #EB7320 !important;
		border-color: #EB7320 !important;
	}
	page{
		background-color: #f5f5f5;
	}
</style>
