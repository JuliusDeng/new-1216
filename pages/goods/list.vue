<template>
	<view class="goods-list">
		<view class="tabulation-box">
			<view class="tabulation-more">
				<u-section :title="title" :right="false" :show-line="false" :bold="false" font-size="36"></u-section>
			</view>
			<template v-if="list.length || loadStatus != 'nomore'">
				<view class="goods-inbox">
					<view class="goods-initem" v-for="(item, index) in list" :key="index" @click="toRoute({
              url: 'pages/goods/details',
              params: {
                id: item.product_id
              }
            })">
						
						
						<goods-item :src="item.image" :title="item.store_name" :price="item.price" :o-price="item.ot_price" :vip_price="item.vip_price" :show-btn="false"
						 :right-text="`已售 ${item.sales}`">
						</goods-item>
					</view>
				</view>
				<view class="u-padding-30">
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
	export default {
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
				cate_id: '',
				pid: ""
			};
		},
		onLoad(options) {
			console.log("options:", options);
			this.title = options.title
			// 增加参数
			this.pid = options.pid

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
				if (this.pid) {
					params.pid = this.pid
				}
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
						console.log("参数：", params)
						console.log("list页返回：", data.list);
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

<style lang="scss" >
	
	page {
		background-color: $bg;
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
