<template>
	<view  class="d-flex a-center font-20" :class="mtop">
		<view class="text-red-light" style="
		width: 0;
		height: 0;
		border: 10px solid #fee9eb;
		border-color: transparent  #fee9eb transparent  transparent ;
		z-index: 99;
		"></view>
		<text class="text-red-light px-1" style="background: #fee9eb;">
			<slot/>
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			mtop: {
				type: String,
				default: ""
			}
		},
		mounted() {
			// console.log("mtop:",this.aa);
		}
	}
</script>

<style>
	@import "/common/dev-yuchen.css";
</style>
