<template>
	<view class="bg-white rounded border border-light-secondary  d-flex a-center mb-3">
		<view class="flex-1 d-flex flex-column  j-center p-3 ">
			<view class="font-md" :class="item.disabled || !item.status?'text-light-muted':''">
				{{item.title}}
			</view>
			<view class="font text-light-muted">
				{{item.start_time}} ~ {{item.end_time}}
			</view>
		</view>
		<view class=" text-white d-flex flex-column a-center j-center px-3 " :class="item.disabled||!item.status?'bg-secondary':'main-bg-color'"
		 style="height: 200rpx;width: 220rpx;">
			<view class="line-h" style="font-size: 42rpx;">
				{{item.price}}
				<text class="font-md">元</text>
			</view>
			<view class="font">
				{{item.desc}}
			</view>
			<view class="rounded text-center bg-white w-50" hover-class="bg-light" :class="item.disabled||!item.status?'text-secondary':'main-text-color'">
				{{item.status?'去使用':'已失效'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		}
	}
</script>

<style>
</style>
