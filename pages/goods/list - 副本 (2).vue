<template>
	<view class="goods-list page h-vh100">
		<view class="tabulation-box">
			<view class="d-flex j-center a-center px-2 position-relative font-700 font-35">
				<!-- <text class="text-yellow">⭐️</text> {{title}} <text class="text-yellow">⭐️</text> -->
			<!-- 	<view class="text-yellow d-flex a-center">⭐️</view>
				<view class="d-flex a-center">{{title}}</view>
				<view class="text-yellow d-flex a-center">⭐️</view> -->
				<image src="../../static/banner.png" mode="" style="width: 750rpx;height: 70rpx;"></image>
				<view class="position-absolute top-0 font-32 text-red " style="padding-top: 15rpx;">
					必吃美食 优选进口
				</view>
			</view>
			<template v-if="list.length || loadStatus != 'nomore'">
				
				<view class="px-2 pt-2 d-flex j-sb flex-wrap page">
					<view class="mb-2  rounded-12 bg-white" style="width: 340rpx;height: 390rpx;"
					v-for="(item, index) in list" :key="index" @click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					})">
						<image :src="item.image" style="width: 340rpx;height: 190rpx;" class="rounded-top "></image>
						<view>
							<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
						</view>
						<view class="text-elli-two font-700 font-26 my-1 ml-1" style="height: 68rpx;">{{item.store_name}}</view>
						<!-- 190 + 80 + 20 = 290 -->
						
						
						
						
					</view>
				</view>
				
				
				<view class="u-padding-30 bg-main">
					<u-loadmore :status="loadStatus" />
				</view>
			</template>
			<template v-else>
				<view class="u-padding-30">
					<image src="/static/noShopper.png" mode="aspectFit" class="empty-image"></image>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import Arrow from '@/components/index/arrow.vue';
	import Member from '@/components/index/member.vue';
	import BottomBuy from '@/components/index/bottom-buy.vue';
	
	export default {
		components: {
			Arrow,
			Member,
			BottomBuy
		},
		data() {
			return {
				loadStatus: 'loadmore',
				page: 1,
				limit: 10,
				list: [],
				title: '',
				type: '',
				isvip: 0,
				brand_id: '',
				price_on: '',
				price_off: '',
				cate_id: ''
			};
		},
		onLoad(options) {
			this.title = options.title
			this.type = options.type
			this.isvip = options.isvip
			this.price_on = options.price_on
			this.price_off = options.price_off
			this.brand_id = options.brand_id
			this.hot_type = options.hot_type
			this.cate_id = options.cate_id
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			getList() {
				let params = {}
				// 获取后台传参
				if (this.isvip) {
					params.isvip = this.isvip
				}
				if (this.price_on) {
					params.price_on = this.price_on
				}
				if (this.price_off) {
					params.price_off = this.price_off
				}
				if (this.brand_id) {
					params.brand_id = this.brand_id
				}
				if (this.cate_id) {
					params.cate_id = this.cate_id
				}
				if (this.hot_type) {
					params.hot_type = this.hot_type
				}
				if (this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					this.$u.get('/api/store/product/lst', {
						page: this.page++,
						limit: this.limit,
						...params
					}).then(({
						data
					}) => {
						this.list = this.list.concat(data.list)
						if (data.list.length < this.limit) {
							this.loadStatus = 'nomore'
						} else {
							this.loadStatus = 'loadmore'
						}
					})
				}
			},
			toRoute(params) {
				this.$u.route(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "/common/dev-yuchen.css";
	.page {
		background-color: #f0f0f0;
	}

	.goods-list {
		padding-top: $gutter;
	}

	.goods-inbox {
		position: relative;
		display: flex;
		flex-wrap: wrap;

		.goods-initem {
			width: 345rpx;
			margin-left: $gutter;
			margin-bottom: $gutter;
		}
	}

	.tabulation-box {
		position: relative;

		.tabulation-image {
			padding: 0 $gutter;
		}

		.tabulation-more {
			padding: $gutter;
			background-color: rgba($color: #ffdd00, $alpha: 0.2);
			margin: $gutter;
			border-top-right-radius: $uni-border-radius-lg;
			border-top-left-radius: $uni-border-radius-lg;
			overflow: hidden;
		}
	}

	.empty-image {
		width: 414rpx;
		height: 336rpx;
		margin: 0 auto;
		display: block;
	}
</style>
