<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uni-swipe-action :options="options" @click="bindClick($event,index)">
				<uni-list-item @click="choose(item)">
					<view class="text-secondary">
						<view class="d-flex a-center">
							<text class="main-text-color mr-1">{{item.name}}</text>
							{{item.phone}}
							<text class="main-text-color" v-if="item.isdefault">【默认】</text>
						</view>
						<view class="">
							{{item.path}}
						</view>
						<view class="font">
							{{item.detailPath}}
						</view>
					</view>
				</uni-list-item>
			</uni-swipe-action>
		</block>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniListItem,
			uniSwipeAction
		},
		data() {
			return {
				isChoose:false,
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#007AFF'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#DD524D'
						}
					}
				]
			}
		},
		computed: {
			...mapState({
				'list': state => state.path.list
			})
		},
		onLoad(e) {
			console.log(e)
			if(e.type==='choose'){
				this.isChoose = true
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '../user-path-edit/user-path-edit'
				})
			}
		},
		methods: {
			...mapMutations(['delPath']),
			bindClick(e, index) {
				switch (e.index) {
					case 0:
						// 修改
						let obj = JSON.stringify({
							index,
							item: this.list[index]
						})
						setTimeout(()=>{
							uni.navigateTo({
								url: '../user-path-edit/user-path-edit?data=' + obj
							})
						},50)
						break;
					case 1:
						// 删除
						uni.showModal({

							content: '要删除该收货地址吗？',

							success: res => {
								if (res.confirm) {
									this.delPath(index)
									uni.showToast({
										title: '删除成功'
									});
								}
							}

						});

						break;
				}
			},
			// 选择收货地址
			choose(item){
				if(this.isChoose){
					// 通知订单提交页修改收货地址
					uni.$emit('choosePath',item)
					uni.navigateBack({
						delta:1
					})
				}
			}
		}
	}
</script>

<style>

</style>
