<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="d-flex a-center j-sb py-2 px-3 text-muted">
			<view class="icon icon-shanchu1" @click="goBack"></view>
			<view @click="forget">忘记密码</view>
		</view>

		<view class="p-5">
			<view class="font-big mb-5">密码登录</view>
			<input type="text" v-model="username" class="border-bottom  mb-4 uni-input px-0 " placeholder="请输入手机号/邮箱/账号"
			 placeholder-class="text-light-muted" :class="focusClass.username?'input-border-color':''" @focus="focus('username')"
			 @blur="blur('username')" />
			<input type="text" v-model="password" class="border-bottom  mb-4 uni-input px-0" placeholder="请输入密码"
			 placeholder-class="text-light-muted" :class="focusClass.password?'input-border-color':''" @focus="focus('password')"
			 @blur="blur('password')" />
			<view class="rounded py-2 w-100 d-flex a-center j-center main-bg-color text-white font-md mb-4 " hover-class="main-bg-hover-color"
			 @click="submit">
				登录
			</view>
			<label class="checkbox d-flex a-center" @click="ckeck =!check">
				<checkbox :checked="check" />
				<text class="font text-light-muted">已阅读并同意xxx协议</text>
			</label>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				focusClass: {
					username: false,
					password: false
				},
				username: '',
				password: '',
				check: true,
				// 验证规则
				rules: {
					username: [{
						rule: /^[a-zA-Z]\w{5,17}$/,
						msg: '以字母开头，长度在6-18之间，只能包含字母数字和下划线'
					}],
					password: [{
						rule: /^.{5,20}$/,
						msg: '长度为5-20的所有字符'
					}]
				}
			}
		},
		computed: {
			isDisable() {
				return true
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 忘记密码
			forget() {

			},
			focus(key) {
				console.log(key)
				this.focusClass[key] = true
			},
			blur(key) {
				this.focusClass[key] = false
			},
			// 表单验证
			validate(key) {
				var check = true
				this.rules[key].forEach(v => {
					if (!(v.rule).test(this[key])) {
						// 验证失败
						uni.showToast({
							title: v.msg
						});
						check = false
						return false

					}
				})
				return check
			},
			submit() {
				if (!this.check) return uni.showToast({
					title: '请先同意xxx协议'
				});
				// 校验
				if (!this.validate('username')) return
				if (!this.validate('username')) return

				// 提交
				console.log('提交成功')
				uni.showLoading({
					title: '登录中...',
					mask: true
				});
				setTimeout(() => {
					uni.hideLoading()
					uni.navigateBack({
						delta: 1
					})
				}, 3000)

			}
		}
	}
</script>

<style>

</style>
