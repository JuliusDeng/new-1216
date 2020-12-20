<template>
	<view class="border-dark d-flex " :class="mtop" style="width: 200rpx;height: 32rpx; ">
	<!-- <view class="border-dark d-flex " :class="mtop" style="height: 32rpx; ">	 -->
		<text class="font-20 font-700 d-flex j-center" style="background: #403835;width: 36rpx;color: #efaa89;">V</text>
		<text class="font-member text-dark d-flex a-center j-center w-100">
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
