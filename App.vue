<script>
	export default {
		// 接收nvue的值
		onUniNViewMessage(e){
			let data = e.data
			console.log(data)
			if(data.msg){
				uni.$emit('index',data)
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
		/* #ifndef APP-PLUS-NVUE */
		/* 官方ui库 */
		@import "/common/uni.css";
		/* 第三方动画库 */
		@import "/common/animate.css";
		/* 自定义图标库 */
		@import "/common/icon.css";
		/* UI基础库 */
		@import "/common/zcm-main.css";
		/* #endif */
		/* #ifdef APP-NVUE */
		@import "/common/zcm-main-nvue.css";
		/* #endif */
		/* 公共样式 */
		@import "/common/common.css";
		.uparse .p {
			padding: 0 !important;
		}
		
		.uparse view {
			line-height: 0 !important;
		}
</style>
