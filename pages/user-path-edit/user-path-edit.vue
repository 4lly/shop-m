<template>
	<view>
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="font-md text-secondary mr-2 flex-shrink">收货人:</view>
			<input type="text" v-model="form.name" class="px-1 font-md flex-1" />
		</view>
		<view class="p-2 d-flex a-center  bg-white">
			<view class="font-md text-secondary mr-2 flex-shrink">手机号码:</view>
			<input type="text" v-model="form.phone" class="px-1 font-md flex-1" />
		</view>
		<divider></divider>
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="font-md text-secondary mr-2 flex-shrink">所在地区:</view>
			<input type="text" placeholder="请选择所在地区" :value="form.path" class="px-1 font-md flex-1" disabled @click="showPicker" />
			<mpvue-city-picker :themeColor="themeColor" :pickerValueDefault="pickerValue" ref="mpvueCityPicker" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		<view class="p-2 d-flex a-center  bg-white">
			<view class="font-md text-secondary mr-2 flex-shrink">详细地址:</view>
			<input type="text" v-model="form.detailPath" class="px-1 font-md flex-1" />
		</view>
		<divider></divider>
		<view class="p-2 d-flex a-center  bg-white">
			<view class="font-md text-secondary mr-2 flex-shrink">设为默认地址:</view>
			<switch :checked="form.isdefault" class="ml-auto" color="#FD6801" @change="form.isdefault = $event.detail.value" />
		</view>
		<view class=" p-3">
			<view class="text-center w-100 main-bg-color text-white font-md rounded py-2 " hover-class="main-bg-hover-color"
			 @click="submit">
				保存

			</view>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		mapActions
	} from 'vuex'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				isedit: false,
				themeColor: '#FD6801',
				pickerValue: [0, 0, 0],
				index: -1,
				form: {
					name: '',
					phone: '',
					path: '',
					detailPath: '',
					isdefault: false
				}

			}
		},
		onLoad(e) {
			console.log()
			if (e.data) {
				let result = JSON.parse(e.data)
				this.form = result.item
				this.index = result.index
				this.isedit = true
				uni.setNavigationBarTitle({
					title: '修改收货地址'
				})
			}
		},
		// 监听返回
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
				return true
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		methods: {

			...mapActions(['updatePathAction', 'createPathAction']),
			// 显示三级联动
			showPicker() {
				this.$refs.mpvueCityPicker.show()
			},
			// 三级联动确定
			onConfirm(e) {
				console.log(e)
				this.form.path = e.label
				this.pickerValue = e.value
			},
			// 提交保存
			submit() {
				// 验证表单
				// 创建
				if (this.isedit) {
					this.updatePathAction({
						index: this.index,
						item: this.form
					})
					uni.showToast({
						title: '修改成功'
					});
					uni.navigateBack({
						delta: 1
					})
					return
				}
				this.createPathAction(this.form)
				uni.showToast({
					title: '创建成功'
				});
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #eee;
	}
</style>
