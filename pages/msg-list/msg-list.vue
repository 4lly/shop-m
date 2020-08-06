<template>
	<view class="p-2">
		<view class="p-2 my-3 p-2 bg-white rounded" hover-class="bg-light-secondary" v-for="(item,index) in list" :key="index"
		 @click="open(item)">
			<view class="font-md text-dark">
				{{item.title}}
				<view class="font text-light-muted">
					{{item.desc}}
				</view>
				<view class="font text-light-muted">
					{{item.create_time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: 'hello world',
						desc: 'hello',
						create_time: '2012-12-12'
					},
					{
						title: 'hello world',
						desc: 'hello',
						create_time: '2012-12-12'
					}
				]
			}
		},
		methods: {
			open(item) {
				uni.navigateTo({
					url: '../msg-detail/msg-detail?detail=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #EEEEEE;
	}
</style>
