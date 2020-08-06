<template>
	<view style="background: #F5F5F5;" class="animated fadeIn faster">
		<loading v-if="beforeReady"></loading>
		<uni-nav-bar fixed title="购物车" statusBar :shadow="false" :rightText="isedit?'完成':'编辑'" @click-right="isedit=!isedit"></uni-nav-bar>

		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white" v-if="disableSelectAll">
			<view class="icon icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
			<text class="text-light-muted mx-2">购物车为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded " hover-class="bg-light-secondary">去逛逛</view>
		</view>

		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" v-else>
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item,index) in list" :key="index">
				<label class="radio  d-flex a-center j-center flex-shrink" style="width: 110rpx;height: 110rpx;" @tap="selectItem(index)">
					<radio :value="item.id" :checked="item.checked" color="#FD6801" />
				</label>
				<image :src="item.cover" style="width:150rpx;height: 150rpx;" class="flex-shrink rounded p-2 border border-light-secondary"
				 mode="widthFix"></image>
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark " style="font-size: 35rpx;">{{item.title}}</view>
					<!-- 属性规格 -->
					<view class="d-flex text-light-muted mb-2 " :class="isedit?'p-1 bg-light-secondary':''" @tap.stop="dopShowPopup(index)">
						<text class="mr-1" v-for="(attr,attrIndex) in item.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
						<view class="icon icon-bottom font ml-auto">

						</view>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-start">
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum" @change="changeNum($event,item,index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 为你推荐-->
		<view class="text-center main-text-color font-md font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary pt-3 mb-4">
			<view class="px-2 position-absolute" style="background-color: #F5F5F5;z-index: 2;">
				买的人还买了
			</view>
			<view class="position-absolute" style="height: 1rpx;left: 0;right: 0;background-color: #ddd;"></view>
		</view>
		<view class="row j-sb bg-white">
			<block v-for="(item,index) in hotList" :key="index">
				<common-list :item="item" :index="index" />
			</block>
		</view>
		<!-- 占位 -->
		<view style="height: 100rpx;background-color: #eee;"></view>
		<!-- 合计 -->
		<view class="d-flex a-center position-fixed bg-white bottom-0 left-0 right-0 border-top border-light-secondary "
		 style="height: 100rpx;z-index: 1000;">
			<label class="radio  d-flex a-center j-center flex-shrink" style="width: 120rpx;" @tap="doSelectAll">
				<radio color="#FD6801" :checked="checkedAll" :disabled="disableSelectAll" />
			</label>
			<template v-if="!isedit">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计：<price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" style="height: 100rpx;" hover-class="main-bg-hover-color" @tap="orderConfirm">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center main-bg-color font-md text-white " style="height: 100rpx;" hover-class="main-bg-hover-color">
					加入收藏
				</view>
				<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md" style="height: 100rpx;" @tap="doDelGoods">
					删除
				</view>
			</template>
		</view>

		<!-- 属性筛选弹出框 -->
		<common-popup :popupClass="popupShow" @hide="dopHidePopup">
			<!-- 商品信息275rpx 图片 180*180 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix" style="width: 180rpx;height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">

					<price priceSize="font-lg" unitSize="font">199</price>
					<view>
						<text class="mr-1" v-for="(attr,attrIndex) in popupData.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
					</view>
				</view>
			</view>
			<!-- 表单部分660rpx -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card v-for="(item,index) in popupData.attrs" :key="index" :headTitle="item.title" :headborderBottom="false"
				 :headTitleWeight="false">
					<radio-groups :label="item" :selected.sync="item.selected"></radio-groups>
				</card>
				<view class="d-flex a-center j-sb p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="0" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<!-- 按钮100rpx -->
			<view hover-class="main-bg-hover-color" class="d-flex a-center j-center main-bg-color text-white font-md " style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;"
			 @tap="dopHidePopup">
				确 定
			</view>
		</common-popup>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue'
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import price from '@/components/common/price.vue'
	import card from '@/components/common/card.vue'
	import commonPopup from '@/components/common/common-popup.vue'
	import radioGroups from '@/components/common/radio-group.vue'
	import commonList from '@/components/common/common-list.vue'
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
import loading from "@/common/mixin/loading.js"
	export default {
		mixins:[loading],
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			card,
			commonPopup,
			radioGroups,
			commonList
		},
		data() {
			return {
				isedit: false,
				hotList: [{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹变频',
						oprice: 2696,
						pprice: 1996
					},
					{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹变频',
						oprice: 2696,
						pprice: 1996
					}, {
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹变频',
						oprice: 2696,
						pprice: 1996
					}
				]

			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				popupShow: state => state.cart.popupShow
			}),
			...mapGetters(['checkedAll', 'totalPrice', 'disableSelectAll', 'popupData'])
		},
		methods: {
			...mapActions(['doSelectAll', 'doDelGoods', 'dopShowPopup', 'dopHidePopup']),
			...mapMutations(['selectItem']),
			changeNum(e, item, index) {
				item.num = e
			},
			orderConfirm(){
				uni.navigateTo({
					url:"../order-confirm/order-confirm"
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>
