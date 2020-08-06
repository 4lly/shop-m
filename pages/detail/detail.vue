<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="swipers" height="750" :preview="true" />
		<!-- 基础详情 -->
		<base-info :detail="detail" :show-price="showPrice"></base-info>
		<!-- 滚动商品特性 -->
		<scroll-attrs :baseAttrs="baseAttrs" />
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item extraWidth="15%" @click="show('attr')">
					<view class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text>{{checkedSkus}}</text>
					</view>
				</uni-list-item>
				<uni-list-item extraWidth="15%" @click="show('express')">
					<view class="d-flex">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item extraWidth="15%" @click="show('service')">
					<view class="d-flex a-center">
						<view class="text-muted font d-flex a-center mr-2">
							<view class="icon icon-finish main-text-color"></view>
							小米自营
						</view>
						<view class="text-muted font d-flex a-center mr-2">
							<view class="icon icon-finish main-text-color"></view>
							小米发货
						</view>
						<view class="text-muted font d-flex a-center mr-2">
							<view class="icon icon-finish main-text-color"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>
		<!-- 横向滚动评论 -->
		<scroll-comments :goods_id="detail.id" :comments="comments"></scroll-comments>
		<!-- 商品详情 -->
		<view class="py-4">
			<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate" />
		</view>
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headborderBottom="false" :headTitleWeight="false">
			<!-- 公共列表组件 -->
			<view class="row j-sb">
				<block v-for="(item,index) in hotList" :key="index">
					<common-list :item="item" :index="index" />
				</block>
			</view>
		</card>
		<!-- 底部操作条 -->
		<bottom-btn @click="show('attr')" />
		<!-- 属性筛选弹出框 -->
		<common-popup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 商品信息275rpx 图片 180*180 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix" style="width: 180rpx;height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">

					<price priceSize="font-lg" unitSize="font">{{showPrice}}</price>
					<view class="">
						{{checkedSkus}}
					</view>
				</view>
			</view>
			<!-- 表单部分660rpx -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card v-for="(item,index) in selects" :key="index" :headTitle="item.title" :headborderBottom="false"
				 :headTitleWeight="false">
					<!-- 单选按钮组 -->
					<radio-groups :label="item" :selected.sync="item.selected"></radio-groups>
				</card>
				<view class="d-flex a-center j-sb p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :max="maxStock" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<!-- 按钮100rpx -->
			<view hover-class="main-bg-hover-color" class="d-flex a-center j-center main-bg-color text-white font-md " style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
			 @click="addCart">
				加入购物车
			</view>
		</common-popup>

		<!-- 收货地址 -->
		<common-popup :popupClass="popup.express" @hide="hide('express')">
			<!-- title 100rpx  275+660-100=835 -->
			<view style="height: 100rpx;" class="d-flex a-center j-center font-md border-bottom border-light-secondary">收货地址</view>
			<!-- 表单部分835rpx -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="(item,index) in pathList " :key="index">
					<view class="icon icon-dingwei font-weight font-md">{{item.name}}</view>
					<view class="font text-light-muted">{{item.path}} {{item.detailPath}}</view>
				</uni-list-item>
			</scroll-view>
			<!-- 按钮100rpx -->
			<view hover-class="main-bg-hover-color" class="d-flex a-center j-center main-bg-color text-white font-md " style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
			 @click="openCreatePath">
				选择新的地址
			</view>
		</common-popup>

		<!-- 服务说明 -->
		<common-popup :popupClass="popup.service" @hide="hide('service')">
			<!-- title 100rpx  275+660-100=835 -->
			<view style="height: 100rpx;" class="d-flex a-center j-center font-md border-bottom border-light-secondary">服务说明</view>
			<!-- 表单部分835rpx -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="icon icon-finish mr-2 main-text-color"></view>小米自营
					</view>
					<text class="text-light-muted font pl-5">未满99不包邮</text>
					<text class="text-light-muted font pl-5">未满99不包邮</text>

				</view>
			</scroll-view>
			<!-- 按钮100rpx -->
			<view hover-class="main-bg-hover-color" class="d-flex a-center j-center main-bg-color text-white font-md " style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
			 @click="hide('service')">
				确定
			</view>
		</common-popup>
	</view>
</template>

<script>
	import swiperImage from '@/components/index/swiper-image.vue'
	import baseInfo from '@/components/detail/base-info.vue'
	import scrollAttrs from '@/components/detail/scroll-attrs.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import price from '../../components/common/price.vue'
	import scrollComments from '@/components/detail/scroll-comments.vue'
	import uParse from '@/components/uni-ui/uParse/src/wxParse.vue'
	import commonList from '@/components/common/common-list.vue'
	import bottomBtn from '@/components/detail/bottom-btn.vue'
	import card from '@/components/common/card.vue'
	import commonPopup from '@/components/common/common-popup.vue'
	import radioGroups from '@/components/common/radio-group.vue'
	import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var htmlString =
		`<p>
				<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
				<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
				<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
				<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
				<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
				<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
				<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
			</p>`
	export default {
		components: {
			swiperImage,
			baseInfo,
			scrollAttrs,
			uniListItem,
			scrollComments,
			uParse,
			card,
			price,
			commonList,
			bottomBtn,
			commonPopup,
			radioGroups,
			uniNumberBox
		},
		data() {
			return {
				selects: [{
					title: '颜色',
					selected: 0,
					list: [{
							name: '红色'
						},
						{
							name: '白色'
						},
						{
							name: '黑色'
						}
					]
				}],
				popupClass: 'none',
				popup: {
					attr: 'none',
					express: 'none',
					service: 'none'
				},
				swipers: [],
				detail: {
					id: 3,
					title: '米家空调',
					desc: '我是描述，1.5匹变频，我是描述，我是描述，我是描述，我是描述，我是描述',
					cover: '/static/images/demo/cate_02.png',
					oprice: 2696,
					pprice: 1996,
					num: 1,
					maxnum: 100
				},
				baseAttrs: [{
					icon: 'icon-cpu',
					title: 'CPU',
					desc: '蛟龙845八核'
				}],
				comments: [{
					userpic: '/static/images/demo/demo6.jpg',
					username: 'lly',
					create_time: '2012-07-31',
					goods_num: '99',
					context: '评论内容啊啊啊',
					imglist: [
						'/static/images/demo/demo6.jpg',
						'/static/images/demo/demo6.jpg',
						'/static/images/demo/demo6.jpg'
					]
				}],
				context: htmlString,
				hotList: [{
					cover: '/static/images/demo/list/1.jpg',
					title: '米家空调',
					desc: '1.5匹变频',
					oprice: 2696,
					pprice: 1996
				}]
			}
		},
		computed: {
			...mapState({
				pathList: state => state.path.list
			}),
			// 选中的sku
			checkedSkus() {
				// 拿到选中skus组成的字符串
				let checkedSkus = this.selects.map(v => v.list[v.selected].name)
				return checkedSkus.join(',')
			},
			// 选中sku的索引
			checkedSkusIndex() {
				let index = -1
				if(!this.detail.goodsSkus) return index
				index = this.detail.goodsSkus.findIndex(v => v.skusText === this.checkedSkus)
				return index
			},
			// 显示价格
			showPrice() {
				if (this.checkedSkusIndex < 0) {
					return this.detail.min_price || 0.00
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].pprice
			},
			// 最大库存
			maxStock(){
				if (this.checkedSkusIndex < 0) {
					return 100
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].stock ||100
			}
		},

		// 监听页面返回事件
		onBackPress() {
			// 关闭模态框
			for (let key in this.popup) {
				if (this.popup[key] !== 'none') {
					this.hide(key)
					return true
				}
			}
		},
		onLoad(e) {
			if (e.detail) {
				this.__init(JSON.parse(e.detail))
			}
		},
		methods: {
			...mapMutations(['addGoodsToCart']),
			async __init(data) {
				let res = await this.$http.get('/goods/' + data.id)
				// 轮播图
				this.swipers = res.goodsBanner.map(v => {
					return {
						src: v.url
					}
				})
				// 初始化基本信息
				this.detail = res
				this.detail.num = 1
				// 修改页面标题
				uni.setNavigationBarTitle({
					title: res.title
				})
				// 滚动商品属性
				this.baseAttrs = res.goodsAttrs.map(v => {
					return {
						title: v.name,
						desc: v.value
					}
				})
				// 热门评论
				this.comments = res.hotComments.map(v => {
					return {
						id: v.id,
						user_id: v.user.id,
						userpic: v.user.avatar,
						username: v.user.nickname,
						create_time: v.review_time,
						goods_num: v.goods_num,
						context: v.review.data,
						imglist: v.review.image
					}
				})
				// 商品详情
				this.context = res.content
				// 热门推荐
				this.hotList = res.hotList.map(v => {
					v.pprice = v.min_price
					v.oprice = v.min_oprice
					return v
				})
				// 商品规格 (选项部分)
				this.selects = res.goodsSkusCard.map(v => {
					let list = v.goodsSkusCardValue.map(v1 => {
						return {
							id: v1.id,
							name: v1.value
						}
					})
					return {
						id: v.id,
						title: v.name,
						selected: 0,
						list
					}
				})
				// 商品规格(匹配价格)
				this.detail.goodsSkus.forEach(item => {
					let arr = []
					for (let key in item.skus) {
						arr.push(item.skus[key].value)
					}
					item.skusText = arr.join(',')
				})
				// console.log(JSON.stringify(this.detail.goodsSkus))
			},
			// 加入购物车
			addCart() {
				// 组织数据
				let goods = this.detail
				goods['checked'] = false
				goods['attrs'] = this.selects
				// 加入购物车
				this.addGoodsToCart(goods)
				// 隐藏筛选框
				this.hide('attr')
				// 成功提示
				uni.showToast({
					title: '加入成功'
				});
			},
			openCreatePath() {
				uni.navigateTo({
					url: '../user-path-edit/user-path-edit'
				});
				this.hide('express')
			},
			change(num) {
				console.log('购买：' + num)
			},
			hide(key) {
				this.popup[key] = 'hide'
				setTimeout(() => {
					this.popup[key] = 'none'
				}, 200)
			},
			show(key) {
				this.popup[key] = 'show'
			},
			preview(src, e) {
				console.log('src:' + src)
			},
			navigate(href, e) {
				console.log('href:' + href)
				// 如果允许点击超链接跳转 则应该打开一个新页面 并传入href 由新页面内嵌的webview组件负责显示该链接内容
				uni.showModal({
					content: '点击链接为：' + href,
					showCancel: false
				})
			}
		}
	}
</script>

<style>

</style>
