<template>
	<view class="border-dark d-flex " :class="mtop" style="width: 140rpx;height: 32rpx; ">
		<text class="font-20 font-700 d-flex j-center" style="background: #403835;width: 36rpx;color: #efaa89;">V</text>
		<text class="font-20 text-dark d-flex j-center w-100">
			<slot></slot>
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			mtop: {
				type: "String",
				default: ""
			}
		}
	}
</script>

<style scoped>
	@import "/common/dev-yuchen.css";
</style>
