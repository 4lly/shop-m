<template>
	<!-- 弹出框 -->
	<view class="_popup" :class="popupClass">
		<view class="_msak" @click.stop="hide" @touchmove.stop.prevent="touchmove"></view>
		<view class="_body">
			<slot />
		</view>
	</view>
</template>

<script>
	
	export default {
		props:{
			popupClass:{
				type:String,
				default:'none'
			}
		},
		methods:{
			hide(){
				this.$emit('hide')
			},
			touchmove(){
				
			}
		}
		
	}
</script>

<style scoped>
	._popup,
	._msak {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	._popup {
		z-index: 2000;
		display: none;
	}
	
	._msak {
		z-index: 2002;
		background: rgba(0, 0, 0, .5);
	}
	
	._popup ._body {
		z-index: 2003;
		position: fixed;
		bottom: -1035rpx;
		width: 92%;
		padding: 0 4%;
		height: 1035rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx 20rpx 0 0;
	}
	
	._popup.show {
		display: block;
	}
	
	.show ._mask {
		animation: showPopupMask 0.2s linear both;
	}
	
	.show ._body {
		animation: showPopupBody 0.2s linear both;
	}
	
	._popup.hide {
		display: block;
	}
	
	.hide ._mask {
		animation: hidePopupMask 0.2s linear both;
	}
	
	.hide ._body {
		animation: hidePopupBody 0.2s linear both;
	}
	
	@keyframes showPopupMask {
		0% {
			opacity: 0;
		}
	
		100% {
			opacity: 1;
		}
	}
	
	@keyframes hidePopupMask {
		0% {
			opacity: 1;
		}
	
		100% {
			opacity: 0;
		}
	}
	
	@keyframes showPopupBody {
		0% {
			transform: translateY(0);
		}
	
		100% {
			transform: translateY(-100%);
		}
	}
	
	@keyframes hidePopupBody {
		0% {
			transform: translateY(-100%);
		}
	
		100% {
			transform: translateY(0);
		}
	}
	
	._popup.none {
		display: none;
	}
</style>
