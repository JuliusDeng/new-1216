<template>
	<view>
		<!-- navbar -->
		<view class="" >
			<!-- <u-navbar :is-back="false" title="" :background="{backgroundColor: '#001f3f'}">
				dfsgdsfgsd
			</u-navbar> -->	
			
			<u-navbar :is-back="false" >
				<view class="search">
					<view class="search-text">{{ baseInfo.site_name }}</view>
					<u-search placeholder="搜索好物" :show-action="false" disabled height="56 " @click="toRoute({
			    url: 'pages/index/search'
			  })"></u-search>
				</view>
			</u-navbar>
		</view>
		<!-- tips 添加至我的小程序-->
		<struggler-uniapp-add-tip></struggler-uniapp-add-tip>
		<!-- 顶部选项卡 tabs -->
		<!-- <u-sticky :offset-top="offsetTop">
			<view class="tabs">
				<u-tabs name="cate_name" :list="tabsList" :current="tabsCurrent" @change="tabsChange"></u-tabs>
			</view>
		</u-sticky> -->
		<scroll-view class="position-fixed" style="height: 80rpx;z-index: 99;" >
			<u-tabs name="cate_name" font-size="32" :bold="true" :list="tabsList" :current="tabsCurrent" @change="tabsChange"></u-tabs>
		</scroll-view>
		<view class="bg-yellow" style="height: 80rpx;"></view>
			
		
		<!-- top -->
		<view class="top-box bg-red">
			<image src="/static/topbg.jpg" mode="aspectFill" class="image"></image>
		</view>
		<!-- topradius -->
		<view class="top-radius"></view>

		<template v-if="!tabsCurrent">
			<!-- 八个分类 grid -->
			<view class="grid-box">
				<u-grid :col="4" :border="false">
					<view class="" style="padding-top: -20rpx;padding-bottom: -20rpx;">
						<u-grid-item v-for="(item, index) in gridList" :key="index" @click="toRoute({
							  url: item.url,
							  params: {
								title: item.name
							  }
							})" >
							<u-icon :name="item.pic" :size="68"></u-icon>
							<view class="grid-text font-700 mt-1 font-title">{{ item.name }}</view>
						</u-grid-item>
					</view>
				</u-grid>
			</view>

			<!-- 今日商品秒杀 -->
			
			<view class="new-goods" v-if="footMoreList[0].length > 0">
				<!-- 标题栏 -->
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative"  style="width: 270rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100"
						style="height: 16rpx;"></view>	
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35" >
							⭐ 今日商品秒杀
						</view>
					</view>
					<view class="font-23 text-muted d-flex ">
						<navigator url="../goods/seckill">
							查看更多<u-icon name="arrow-right" size="24"></u-icon>
						</navigator>
					</view>	
				</view>
				<!-- 内容 -->
				<view class="new-goods-list">
					<view class="new-goods-item" v-for="(item, index) in footMoreList[0]" :key="index" @click="toDetails(item, 1, datatime)">
						<advance-item :src="item.image" :title="item.store_name" :price="item.price" :show-old="false" :timestamp="datatime"
						 @handle="toDetails(item, 1, datatime)">
						</advance-item>
					</view>
					<view class="look-more">
						<navigator url="../goods/seckill" class="ain">查看更多</navigator>
					</view>
				</view>
			</view>
			
			

			<!-- 天天爱抽奖 v-if="lotterys < 0" -->
			<view v-if="lotterys > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 236rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐ 天天爱抽奖
						</view>
					</view>
					<view class="font-23 text-muted d-flex "
					@click="toRoute({
										  url: lottery.url,
										  params: {
											title: lottery.name
										  }
										})">
						查看更多<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				
				<view class="mx-2 py-2 shadow-nom" @click="toDay(lotteryDetail)">
					<view class="position-relative">
						<image :src="lotteryDetail.image" style="height: 390rpx;width: 710rpx;" class="d-block"></image>
						<view class="font-25 position-absolute right-0 bottom-0 d-flex a-center j-center rounded-top-left text-white"
						 style="background-color: rgba(19,14,11,0.6);width: 250rpx;height: 50rpx;">
							{{lotteryDetail.mer_name}} 赞助
						</view>
					</view>

					<!-- 图下文字 -->
					<view class="mx-1">
						<view class="mt-1 text-elli-two w-100 font-title">{{lotteryDetail.store_name}}</view>
						<view class="mt-1">
							<text class="text-red font-member">价值</text>
							<text class="text-red font-price ml-1">￥{{lotteryDetail.coupon_price}}</text>
						</view>
						<view class="d-flex j-sb my-2">
							<view class="text-light-muted font-member">
								<text>{{lotteryDetail.activite_endtime}}</text>
								<text class="ml-1">{{lotteryDetail.title}}</text>
							</view>
							<view class="text-light-muted font-member">
								{{lotteryDetail.join_people}}人已参与
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--  广告1 2 3 商圈查看 -->
			<view class="mx-2 my-4 d-flex j-sb" v-if="hot[0].pic">
				<!-- <image :src="hot[0].pic" style="width: 710rpx;height: 430rpx;" class="rounded"></image> -->
				<image :src="hot[0].pic" v-if="hot[0].pic" style="width: 350rpx;height: 430rpx;"></image>
				<view class="d-flex flex-column j-sb">
					<image :src="hot[1].pic" v-if="hot[1].pic" style="width: 350rpx;height: 210rpx;"></image>
					<image :src="hot[2].pic" v-if="hot[2].pic" style="width: 350rpx;height: 210rpx;"></image>
				</view>
			</view>

			<!-- 2 吃喝玩乐推荐 card swiper -->
			<view class="card-swiper mb-2 " v-if="footMoreList[1].length > 0">
				<view class="mx-2 d-flex j-sb a-end mb-2" style="height: 60rpx;">
					<view class="position-relative" style="width: 270rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 吃喝玩乐推荐
						</view>
					</view>
					<view class="t-right">
						<text class="bold">{{ cardSwiper1+1 }}</text>
						<text class="" style="padding-bottom: 6rpx;">/{{ footMoreList[1].length }}</text>
					</view>
				</view>
				
				<!-- 轮播图 -->
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true" :current="cardSwiper1"
				 @change="changeCardSwiper1" style="height: 610rpx;">
					<swiper-item v-for="(item, index) in footMoreList[1]" :key="index"
					 class="mx-2 rounded-8"
					@click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					  })">
						<image :src="item.image" class="rounded-8" style="width: 710rpx; height: 390rpx;"></image>
						<!-- 图下文字 -->
						<view class="" style="width: 710rpx;height: 190rpx;">
							<text class="text-elli-two my-1 font-title" style="height: 80rpx;">{{ item.store_name}}</text>
							<view class="d-flex j-sb a-center">
								<!-- 左侧 -->
								<view class="my-1">
									<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
									<view class="d-flex a-center font-20" style="height: 50rpx;">
										<text class="text-red font-700 font-price mr-1">￥{{item.price}}</text>
										<text class="text-red-light font-up mr-1" v-if="item.spec_type">起</text>
										
										<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
										<!-- css写左箭头 -->
										<arrow>{{ ((item.price / item.ot_price) * 10).toFixed(1)  }}折</arrow>
									</view>
								</view>
								<!-- 右侧 -->
								<view >
									<bottom-buy>立即购买</bottom-buy>
								</view>
							</view>
						</view>

					</swiper-item>
				</swiper>

			</view>

			<!-- 广告图4 轮播广告图 -->
			<!-- <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" :circular="true">
				<swiper-item style="height: 360rpx;">
					<image src="/static/topbg.jpg" style="height: 360rpx;width: 710rpx;" class="d-block mx-2"></image>
				</swiper-item>
				<swiper-item class=" " style="height: 360rpx;">
					<image src="/static/tran.png" style="height: 360rpx;width: 710rpx;" class="d-block mx-2 border"></image>
				</swiper-item>
			</swiper> -->
			<view class="mx-2 my-1" v-if="hot[3].pic">
				<!-- <image :src="hot[1].pic" style="width: 710rpx;height: 360rpx;" class="rounded"></image> -->
				<image :src="hot[3].pic" style="width: 710rpx;height: 300rpx;" class="rounded"></image>
			</view>


			<!-- 3 必吃美食|优选Top -->
			<view class="goods-list" v-if="footMoreList[2].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 必吃美食|优选Top
						</view>
					</view>
					<view class="font-23 text-muted d-flex "
					@click="toRoute({
									  url: 'pages/goods/list', 
									  params: {
										title: '必吃美食|优选Top',
										hot_type: 'good'
									  }
									})">
						更多推荐<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>

				<!-- 内容 -->
				<view class="mx-2 mt-2 p-2 shadow rounded-8 " style="width: 710rpx;">
					<view class="d-flex j-sb mb-2" v-for="(item, index) in footMoreList[2]" :key="index"
					@click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					  })">
						<!-- 左图 -->
						<image :src="item.image" style="width: 220rpx;height: 220rpx;"></image>
						<!-- 右侧 -->
						<view class="d-flex flex-column j-sb" style="width: 420rpx;height: 220rpx;">
							<view style="height: 125rpx;">
								<view class="text-elli-two font-700 font-title" style="height: 82rpx;">{{item.store_name}}</view>
								<view  class="d-flex a-center font-20" style="height: 40rpx;">
									<view class="text-red-light" style="
									width: 0;
									height: 0;
									border: 10px solid #fee9eb;
									border-color: transparent  #fee9eb transparent  transparent ;
									z-index: 99;
									"></view>
									<text class="text-red-light px-1 font-sale" style="background: #fee9eb;">
										{{ ((item.price / item.ot_price) * 10).toFixed(1)  }}折
									</text>
								</view>
								<!-- <arrow style="margin-left: -20rpx;">{{ ((item.price / item.ot_price) * 10).toFixed(1)  }}折</arrow> -->
							</view>

							<view class="d-flex j-sb ">
								<view class="">
									<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
									<text class="text-red font-700 font-25 mr-1">￥{{item.price}}</text>
									<text class="text-red-light" v-if="item.spec_type">起</text>
								</view>
								<view >
									<bottom-buy>立即购买</bottom-buy>
								</view>
							</view>


						</view>

					</view>



				</view>
			</view>

			 <!-- 广告5 -->
			<view class="mx-2 my-3" v-if="hot[4].pic">
				<!-- <image :src="hot[2].pic" style="width: 710rpx;height: 260rpx;" class="rounded"></image> -->
				<image :src="hot[4].pic" style="width: 710rpx;height: 240rpx;" class="rounded"></image>
			</view>
			<!-- 广告6 -->
			<view class="mx-2 mb-3" v-if="hot[5].pic">
				<!-- <image :src="hot[3].pic" style="width: 710rpx;height: 430rpx;" class="rounded"></image> -->
				<image :src="hot[5].pic" style="width: 710rpx;height: 360rpx;" class="rounded"></image>
			</view>
			
			<!-- 4 网红风味|吃货必备 本周上新 -->
			<view class="goods-list" v-if="footMoreList[3].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 网红风味|吃货必备
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
					  url: 'pages/goods/list', 
					  params: {
						pid: '314',
						title: '网红风味|吃货必备',
					  }
					})">
						向右滑动查看<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				<scroll-view scroll-x="true">
					<view class="goods-list-box">
						<view class="goods-listitem u-padding-right-10" v-for="(item, index) in footMoreList[3]" :key="index">
							<goods-item :src="item.image" :title="item.store_name" :price="item.price" o-price=" " @click="toDetails(item)">
							</goods-item>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 5 火锅|一起涮火锅 本周上新 -->
			<view class="goods-list" v-if="footMoreList[4].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 火锅|一起涮火锅
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
									  url: 'pages/goods/list',
									  params: {
									  title: '火锅|一起涮火锅',
									  pid: '325'
									  }
									})">
						向右滑动查看<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				<scroll-view scroll-x="true">
					<view class="goods-list-box">
						<view class="goods-listitem u-padding-right-10" v-for="(item, index) in footMoreList[4]" :key="index">
							<goods-item :src="item.image" :title="item.store_name" :price="item.price" o-price=" " @click="toDetails(item)">
							</goods-item>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 6 烤肉|烤鱼|烧烤吃不腻 本周上新 -->
			<view class="goods-list" v-if="footMoreList[5].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 烤肉|烤鱼|烧烤吃不腻
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
									  url: 'pages/goods/list',
									  params: {
									  title: '烤肉|烤鱼|烧烤吃不腻',
									  pid: '326'
									  }
									})">
						向右滑动查看<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				<scroll-view scroll-x="true">
					<view class="goods-list-box">
						<view class="goods-listitem u-padding-right-10" v-for="(item, index) in footMoreList[5]" :key="index">
							<goods-item :src="item.image" :title="item.store_name" :price="item.price" o-price=" " @click="toDetails(item)">
							</goods-item>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 广告7 -->
			<!-- <view class="advint" v-if="nowStep > 4 && ad.home_ad_pic" @click="toRoute({url: ad.home_ad_url})">
				<u-image :src="ad.home_ad_pic" width="100%" height="400rpx"></u-image>
			</view> -->
			<view class="mx-2 mb-3" v-if="hot[6].pic">
				<image :src="hot[6].pic" style="width: 710rpx;height: 365rpx;" class="rounded"></image>
			</view>
			<!-- 广告8 -->
			<view class="mx-2 mb-3" v-if="hot[7].pic">
				<image :src="hot[7].pic" style="width: 710rpx;height: 365rpx;" class="rounded"></image>
			</view>

			<!-- 7 玩乐特惠专区 -->
			<view class="goods-list" v-if="footMoreList[6].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 270rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 玩乐特惠专区
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
									  url: 'pages/goods/list',
									  params: {
									  title: '玩乐特惠专区',
									  isvip: '1'
									  }
									})">
						更多推荐<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				
				<!-- 玩乐特惠专区内容 -->
				<view class="px-2 pt-2 d-flex j-sb flex-wrap ">
					<!-- 750-40=710-660=50 -->
					<view class="mb-2  border-bottom" style="width: 340rpx;height: 390rpx;" 
					v-for="(item, index) in footMoreList[6]" :key="index" @click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					})">
						<image :src="item.image" style="width: 340rpx;height: 190rpx;"></image>
						<view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;">{{item.store_name}}</view>
						<!-- 190 + 80 + 20 = 290 -->
					
						<view class="d-flex j-sb " style="height: 95rpx;">
							<view>
								<!-- 32rpx -->
								<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
								<!-- 40rpx -->
								<view class="d-flex a-center font-20 mb-2" style="height: 40rpx;">
									<text class="text-red font-700 font-price mr-1 ">￥{{item.price}}</text>
									<text class="text-red-light font-up mr-1" v-if="item.spec_type">起</text>
									<!-- <text class="text-red-light font-up mr-1">起</text> -->
									<!-- 原价 -->
									<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
								</view>

							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<!-- 广告9 -->
			<view class="mx-2 mb-3" v-if="hot[8].pic">
				<image :src="hot[8].pic" style="width: 710rpx;height: 365rpx;" class="rounded"></image>
			</view>
			
			<!-- 8 丽人美容|气质小仙女 -->
			<view class="goods-list" v-if="footMoreList[7].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 390rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 丽人美容|气质小仙女
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
									 url: 'pages/goods/list',
									 params: {
									 title: '丽人美容|气质小仙女',
									 pid: '313'
									 }
									})">
						更多推荐<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				
				<!-- 丽人美容|气质小仙女内容 -->
				<view class="px-2 pt-2 d-flex j-sb flex-wrap ">
					<!-- 750-40=710-660=50 -->
					<view class="mb-2  border-bottom" style="width: 340rpx;height: 390rpx;" 
					v-for="(item, index) in footMoreList[7]" :key="index" @click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					})">
						<image :src="item.image" style="width: 340rpx;height: 190rpx;"></image>
						<view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;">{{item.store_name}}</view>
						<!-- 190 + 80 + 20 = 290 -->
						<!-- <view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;"
						>圣诞节的反馈了所发生的快捷方式打开了就是的就是快乐副驾驶的房价快速的链接发的说法凉快圣诞节发生了大家胜多负少的解放路口史蒂夫</view> -->
					
						<view class="d-flex j-sb " style="height: 95rpx;">
							<view>
								<!-- 32rpx -->
								<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
								<!-- 40rpx -->
								<view class="d-flex a-center font-20 mb-2" style="height: 40rpx;">
									<text class="text-red font-700 font-price mr-1 ">￥{{item.price}}</text>
									<text class="text-red-light font-up mr-1" v-if="item.spec_type">起</text>
									<!-- <text class="text-red-light font-up mr-1">起</text> -->
									<!-- 原价 -->
									<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
								</view>
			
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<!-- 广告10 -->
			<view class="mx-2 mb-3" v-if="hot[9].pic">
				<image :src="hot[9].pic" style="width: 710rpx;height: 365rpx;" class="rounded"></image>
			</view>
			
			<!-- 9 生活服务类专区 -->
			<view class="goods-list" v-if="footMoreList[8].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 生活服务类专区
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
									 url: 'pages/goods/list',
									 params: {
									 title: '生活服务类专区',
									 pid: '316'
									 }
									})">
						更多推荐<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
				
				<!-- 玩乐特惠专区内容 -->
				<view class="px-2 pt-2 d-flex j-sb flex-wrap ">
					<!-- 750-40=710-660=50 -->
					<view class="mb-2  border-bottom" style="width: 340rpx;height: 390rpx;" 
					v-for="(item, index) in footMoreList[8]" :key="index" @click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					})">
						<image :src="item.image" style="width: 340rpx;height: 190rpx;"></image>
						<view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;">{{item.store_name}}</view>
						<!-- 190 + 80 + 20 = 290 -->
					
						<view class="d-flex j-sb " style="height: 95rpx;">
							<view>
								<!-- 32rpx -->
								<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
								<!-- 40rpx -->
								<view class="d-flex a-center font-20 mb-2" style="height: 40rpx;">
									<text class="text-red font-700 font-price mr-1 ">￥{{item.price}}</text>
									<text class="text-red-light font-up mr-1" v-if="item.spec_type">起</text>
									<!-- <text class="text-red-light font-up mr-1">起</text> -->
									<!-- 原价 -->
									<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
								</view>
			
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
			<!-- 广告11 -->
			<view class="mx-2 mb-3" v-if="hot[10].pic">
				<image :src="hot[10].pic" style="width: 710rpx;height: 365rpx;" class="rounded"></image>
			</view>
			
			<!-- 10 休闲娱乐专区 -->
			<view class="goods-list" v-if="footMoreList[9].length > 0">
				<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 休闲娱乐专区
						</view>
					</view>
					<view class="font-23 text-muted d-flex " @click="toRoute({
												url: 'pages/goods/list',
												params: {
												title: '休闲娱乐专区',
												pid: '315'
												}
												})">
						更多推荐<u-icon name="arrow-right" size="24"></u-icon>
					</view>
				</view>
			
				<!-- 休闲娱乐专区内容 -->
				<view class="px-2 pt-2 d-flex j-sb flex-wrap ">
					<!-- 750-40=710-660=50 -->
					<view class="mb-2  border-bottom" style="width: 340rpx;height: 390rpx;" v-for="(item, index) in footMoreList[9]" :key="index"
					 @click="toRoute({
									url: 'pages/goods/details',
									params: {
									  id: item.product_id
									}
								})">
						<image :src="item.image" style="width: 340rpx;height: 190rpx;"></image>
						<view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;">{{item.store_name}}</view>
						<!-- 190 + 80 + 20 = 290 -->
						<!-- <view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;"
									>圣诞节的反馈了所发生的快捷方式打开了就是的就是快乐副驾驶的房价快速的链接发的说法凉快圣诞节发生了大家胜多负少的解放路口史蒂夫</view> -->
			
						<view class="d-flex j-sb " style="height: 95rpx;">
							<view>
								<!-- 32rpx -->
								<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
								<!-- 40rpx -->
								<view class="d-flex a-center font-20 mb-2" style="height: 40rpx;">
									<text class="text-red font-700 font-price mr-1 ">￥{{item.price}}</text>
									<text class="text-red-light font-up mr-1" v-if="item.spec_type">起</text>
									<!-- <text class="text-red-light font-up mr-1">起</text> -->
									<!-- 原价 -->
									<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
								</view>
			
							</view>
						</view>
			
					</view>
				</view>
			</view>
				
			<!-- 广告12 -->
			<view class="mx-2 mb-3" v-if="hot[11].pic">
				<image :src="hot[11].pic" style="width: 710rpx;height: 365rpx;" class="rounded"></image>
			</view>
				
			
			
			<!-- 11 亲子教育 -->
			<view class="card-swiper" v-if="footMoreList[10].length > 0">
				<view class="mx-2 d-flex j-sb a-end mb-2" style="height: 60rpx;">
					<view class="position-relative" style="width: 350rpx;">
						<view class="d-flex bg-gradual-orange rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;"></view>
						<view class="d-flex  position-absolute bottom-0 left-0 font-700 font-35">
							⭐️ 亲子教育|快乐时光
						</view>
					</view>
					<view class="t-right">
						<text class="bold">{{ cardSwiper2+1 }}</text>
						<text class="" style="padding-bottom: 6rpx;">/{{ footMoreList[10].length }}</text>
					</view>
				</view>
				<!-- 轮播图 -->
				<!-- :current="cardSwiper2" -->
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true" 
				 @change="changeCardSwiper2" style="height: 550rpx;">  
					<swiper-item v-for="(item, index) in footMoreList[11]" :key="index" class="mx-2 rounded-8"
					@click="toRoute({
						url: 'pages/goods/details',
						params: {
						  id: item.product_id
						}
					  })"> 
						<image :src="item.image" class="rounded-8" style="width: 710rpx; height: 390rpx;"></image>
						<!-- 图下文字 -->
						<view class="" style="width: 710rpx;">
							<text class="text-elli-two my-1 font-title">{{ item.store_name}}</text>
							<view class="d-flex j-sb a-center">
								<!-- 左侧 -->
								<view class="my-1">
									<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
									<view class="d-flex a-center font-20 mt-1">
										<text class="text-red font-700 font-price mx-1">￥{{item.price}}</text>
										<text class="text-red-light font-up" v-if="item.spec_type">起</text>
										
										<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
										<!-- css写左箭头 -->
										<arrow>{{ ((item.price / item.ot_price) * 10).toFixed(1)  }}折</arrow>
									</view>
								</view>
								<!-- 右侧 -->
								<view >
									<bottom-buy>立即购买</bottom-buy>
								</view>
							</view>
						</view>
			
					</swiper-item>
				</swiper>
			
			</view>


			<!-- 底部技术支持栏 foot logo -->
			<view class="logo-box" v-if="baseInfo.site_name">
				<text class="text">{{ baseInfo.site_name }}技术支持</text>
			</view>
			<!-- loadmore -->
			<!-- <view class="u-padding-20" v-else>
				<u-loadmore :status="indexLoadStatus"></u-loadmore>
			</view> -->
		</template>
		<template v-else>
			<view class="goods-inbox">
				<view class="goods-initem" v-for="(item, index) in list" :key="index">
					<goods-item :src="item.image" :title="item.store_name" :price="item.price" :o-price="item.ot_price" :show-btn="false"
					 :right-text="`已售 ${item.sales}`" @click="toDetails(item)">
					</goods-item>
				</view>
			</view>
			<view class="u-padding-20">
				<u-loadmore :status="loadStatus"></u-loadmore>
			</view>
		</template>

	</view>
</template>

<script>
	import Arrow from '@/components/index/arrow.vue';
	import Member from '@/components/index/member.vue';
	import BottomBuy from '@/components/index/bottom-buy.vue';

	const appSystem = uni.getSystemInfoSync()
	export default {
		components: {
			Arrow,
			Member,
			BottomBuy
		},
		data() {
			return {
				hot: [],
				showReindex: true,
				tabsList: [{
					cate_name: '推荐'
				}, ],
				tabsCurrent: 0,
				banner: [],
				swiperCurrent: 0,
				
				cardSwiper1: 0,
				cardSwiper2: 0,
				
				
				gridList: [],
				page: 1,
				limit: 10,
				loadStatus: 'loadmore',
				indexLoadStatus: 'loadmore',
				list: [],
				recommendList: [],
				nowStep: -1,
				footMoreList: [],
				datatime: 0,
				init: true,
				ad: {},
				// 抽奖
				lottery: "",
				lotteryDetail: "",
				lotterys: 0,
				
				// 数组-获取推荐商品
				dataArr: [],

			}
		},
		computed: {
			baseInfo() {
				return this.$store.state.baseInfo
			},
			offsetTop() {
				let scale = 750 / appSystem.screenWidth
				// #ifndef H5
				return (appSystem.statusBarHeight + 44) * scale
				// #endif
				// #ifdef H5
				return 0
				// #endif
			}
		},
		onLoad() {
			// 获取数据
			// this.getIndexData()
			// this.getFootMore()
			
			// if (this.indexLoadStatus == 'loadmore') {
			// 	this.indexLoadStatus = 'loading'
			// 	this.getFootMore()
			// }
			
			// this.getSeckillTime()
			// this.showLottery()
			
			this.showLoading()
			
		},
		// onReachBottom() {
		// 	if (!this.tabsCurrent) { // 首页index
		// 		if (this.indexLoadStatus == 'loadmore') {
		// 			this.indexLoadStatus = 'loading'
		// 			this.getFootMore()
		// 		}
		// 	} else { // 列表list
		// 		this.getList()
		// 	}
		// },
		onShow() {
			// 获取数据
			this.getIndexData()
			this.getFootMore()
			
			this.getSeckillTime()
			this.showLottery()
			
			
			// this.cardSwiper1 = 0
			// console.log("轮播index:",this.cardSwiper1);
			// this.cardSwiper2 = 0
		},
		methods: {
			showLoading() {
				uni.showLoading({
				    title: '加载中',
					mask: false
				});
			},
			
			toDetails(item, type = 0, date) {
				this.toRoute({
					url: 'pages/goods/details',
					params: {
						type: type,
						id: item.product_id,
						date: date
					}
				})
			},
			// 获取秒杀截止时间
			getSeckillTime() {
				this.$u.get('/api/store/product/seckill/select').then(res => {
					this.datatime = res.data.seckillEndTime;
				});
			},
			// 获取推荐商品
			
			getFootMore() {
				let url = '/api/store/product/recommend/lst'
				let limit = 10
				let params = {}
				switch (this.nowStep) {
					case -1: // 1 今日商品秒杀 nowStep默认值为 -1 变0
						url = '/api/store/product/seckill/lst'
						break;
					case 0: // 2 吃喝玩乐推荐
						url = '/api/store/product/lst'
						params.hot_type = 'best'
						break;
					case 1: // 3 必吃美食 优选top
						url = '/api/store/product/lst'
						params.hot_type = 'good'
						break;
					case 2: // 4 网红风味|吃货必备
						url = '/api/store/product/lst'
						params.pid = 314
						// params.hot_type = 'new'
						break;
					case 3: // 5 火锅|一起涮火锅
						url = '/api/store/product/lst'
						params.pid = '325'
						// this.nowStep ++
						// this.getFootMore()
						// return null;
						break;
					case 4: // 6 烤肉|烤鱼|烧烤吃不腻
						url = '/api/store/product/lst'
						params.pid = '326'
						// this.nowStep ++
						// this.getFootMore()
						// return null;
						break;
					case 5:  // 7 玩乐特惠专区
						url = '/api/store/product/lst'
						params.isvip = '1'
						break;
					case 6:  // 8 丽人美容|气质小仙女
						url = '/api/store/product/lst'
						params.pid  = '313'
						break;	
					case 7:  // 9 生活服务类专区
						url = '/api/store/product/lst'
						params.pid = '316'
						break;
					case 8:  // 10 休闲娱乐专区
						url = '/api/store/product/lst'
						params.pid = '315'
						break;
						
					case 9: // 11 亲子教育
						url = '/api/store/product/lst'
						params.pid = '327'
						break;
					default:
						break;
				}
				this.$u.get(url, {
					page: 1,
					limit,
					...params
				}).then(({data}) => {
					
					
					// nowStep默认值为 -1
					this.nowStep++
					this.footMoreList[this.nowStep] = data.list
					// console.log("data:",data);
					// console.log("this.nowStep：", this.nowStep)
					// console.log(`获取footMoreList[this.nowStep]:`, data);
					// 递归  nowStep默认值为 -1 +1
					if(this.nowStep < 10) {
						this.getFootMore()
						uni.hideLoading()
					} else {
						// console.log("介绍打印：",this.footMoreList);
						return false
					}
					
					
					
					// if (this.nowStep > 6) {
					// 	console.log(`上拉66了nowStep：${this.nowStep}`);
					// 	this.indexLoadStatus = 'nomore'
					// } else {
						
					// 	this.indexLoadStatus = 'loadmore'
					// }
					// if (this.init) { // init 默认是 true
					// 	this.init = false
					// 	this.getFootMore()
					// }
				})
			},
			// 获取除首页外列表数据
			getList() {
				if (this.tabsCurrent && this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					let pid = this.tabsList[this.tabsCurrent].store_category_id
					this.$u.get('/api/store/product/lst', {
						pid: pid,
						page: this.page++,
						limit: this.limit
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

			// ** 获取首页数据
			getIndexData() {
				this.$u.get('/api/common/home')
					.then(({
						data
					}) => {
						this.ad = data.ad
						this.banner = data.banner
						// this.recommendList = data.hot
						this.hot = data.hot
						this.tabsList = this.tabsList.concat(data.category)
						// "全民疯抢" 那六个
						this.gridList = this.gridList.concat(data.menu)
						// console.log("数据：", this.gridList);
						// 这里去第一个 全民疯抢
						this.lottery = data.menu[0]
						// console.log("lottery:", this.lottery);
					})
			},

			// banner 点击跳转对应页面
			toSwiperPath(index) {
				let url = this.banner[index].url
				if (url) {
					this.$u.route({
						url: url
					})
				}
			},
			// 路由跳转
			toRoute(params) {
				this.$u.route(params)
			},
			// 卡片切换
			changeCardSwiper1({detail}) {
				// console.log("cardSwiper111:", detail);
				this.cardSwiper1 = detail.current
			},
			changeCardSwiper2({detail}) {
				// console.log("cardSwiper222:", detail.current);
				this.cardSwiper2 = detail.current
			},
			// tabs切换
			tabsChange(index) {
				this.tabsCurrent = index
				this.page = 1
				this.loadStatus = 'loadmore'
				this.list = []
				this.getList()
			},
			// swiper banner 切换

			// 11天天爱抽奖
			showLottery() {
				this.$u.get('/api/store/product/getCouponProjectList', {
					page: 1,
					limit: 1
				}).then(res => {
					// console.log("天天爱抽奖：",res);
					this.lotterys = res.data.list.length
					this.lotteryDetail = res.data.list[0];
				});
			},
			// 天天爱抽奖--跳转去详情页
			toDay(item) {
				// console.log("疯抢：", item);
				this.$u.route({
					url: 'pages/activity/details',
					params: {
						product_id: item.product_id,
						coupon_id: item.coupon_id,
						cp_id: item.cp_id
					}
				})
			},




		}
	}
</script>

<style lang="scss" scoped>
	/*公共样式 */
	// @import "/common/common.css";
	/*自定义UI库 */
	@import "/common/dev-yuchen.css";


	.search {
		padding-right: 50rpx;
		display: flex;
		align-items: center;
		height: 100%;

		.search-text {
			font-size: 27rpx;
			padding: 0 $gutter;
			width: 250rpx;
		}
	}

	.banner {
		padding: $gutter;
		position: relative;
		min-height: 250rpx;

		.d-botbox {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: $gutter;

			.b-dot {
				width: 16rpx;
				height: 4rpx;
				background-color: rgba($color: #000000, $alpha: 0.3);

				&.active {
					background-color: rgba($color: #000000, $alpha: 0.8);
				}
			}
		}

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 200rpx;
			border-bottom-left-radius: 50%;
			border-bottom-right-radius: 50%;
			background-color: $uni-color-warning;
		}
	}

	.card-swiper {
		position: relative;

		.card-top {
			display: flex;
			padding: $gutter;

			.t-left {
				flex: 1;
				display: flex;
				flex-direction: column;
				position: relative;
				padding-left: 16rpx;

				.title {
					font-size: 36rpx;
					padding-bottom: 10rpx;
				}

				.label {
					font-size: $uni-font-size-sm;
				}
			}

			.t-right {
				display: flex;
				align-items: flex-end;
				font-size: $uni-font-size-sm;
				color: #999;
				padding-bottom: 2rpx;

				.bold {
					font-size: $uni-font-size-xl;
					color: #333;
					font-weight: bold;
				}

				.text {
					padding-bottom: 6rpx;
				}
			}
		}

		.card-bot {
			position: relative;
			margin-left: -$gutter;

			.cardbox {
				display: flex;
				flex-direction: column;
				padding: 0 $gutter / 2;

				.card-info {
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;

					.text {
						font-size: $uni-font-size-lg;
						padding-bottom: 10rpx;
					}

					.label {
						font-size: $uni-font-size-sm;
						color: #999;
					}
				}
			}
		}
	}

	.grid-box {
		position: relative;

		.grid-text {
			font-size: $uni-font-size-sm;
		}
	}

	.title-box {
		position: relative;
		padding: $gutter;
		font-size: $uni-font-size-xl;
		color: #333;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;

		.label {
			font-size: $uni-font-size-sm;
			color: #999;
			margin-top: 10rpx;
		}

		.sk-more {
			position: absolute;
			right: $gutter;
			top: 50%;
			z-index: 10;
			color: #666;
			margin-top: -12rpx;
			font-size: 24rpx;
		}
	}

	.goods-list {
		position: relative;

		.goods-list-box {
			display: flex;
			align-items: center;
			padding: $gutter;
		}

		.goods-listitem {
			min-width: 300rpx;
			max-width: 300rpx;
		}
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

	.new-goods-list {
		display: flex;
		flex-direction: column;

		.new-goods-item {
			padding: $gutter;
		}
	}

	.look-district {
		display: flex;
		flex-direction: column;
		background-color: $bg;
		padding-top: 20rpx;

		.lookwrapbox {
			display: flex;
			flex-wrap: wrap;

			.lookitem {
				width: 345rpx;
				height: 240rpx;
				position: relative;
				border-radius: $uni-border-radius-lg;
				overflow: hidden;
				margin-left: $gutter;
				margin-bottom: $gutter;

				&:nth-child(3n-2) {
					height: 500rpx;

					&.look-two {
						height: 240rpx;
					}
				}

				&:nth-child(3n) {
					margin-top: -260rpx;
					margin-left: auto;
					margin-right: 24rpx;

					&.look-two {
						margin-top: 0;
						margin-left: $gutter;
						margin-right: 0;
					}
				}

				&.look-one {
					width: 710rpx;
					height: 300rpx;
				}

				.text {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 10;
					color: #fff;
					font-size: $uni-font-size-xl;
					font-weight: bold;
					white-space: nowrap;
				}

				// &::after {
				//   content: '';
				//   position: absolute;
				//   left: 0;
				//   top: 0;
				//   width: 100%;
				//   height: 100%;
				//   background-color: rgba($color: #000000, $alpha: 0.6);
				// }
			}
		}
	}


	.logo-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: $gutter;

		.img-logo {
			width: 60rpx;
			height: 60rpx;
		}

		.text {
			font-size: 24rpx;
			color: #999;
			line-height: 1.5em;
			margin-top: 10rpx;
		}
	}

	.look-more {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #666;
		padding: $gutter 0 30rpx;

		.ain {
			width: 100%;
			text-align: center;
		}
	}

	.top-box {
		height: 240rpx;
		width: 100%;
		background-color: #FFDD00;
		padding-bottom: 40rpx;
	}

	.top-radius {
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		height: 30rpx;
		background-color: #fff;
		margin-top: -26rpx;
		position: relative;
		z-index: 10;
	}

	.re-index {
		width: 100%;
		height: 500rpx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-40%);
		z-index: 9999;

		.re-content {
			height: 400rpx;
			z-index: 10;
			position: relative;
			overflow: hidden;

			.re-item {
				width: 360rpx;
				margin: 105rpx auto 0;
				background-color: #fff;
				padding: 10rpx;
				border-radius: 10rpx;
				border: 4rpx solid #FFDD00;
				box-shadow: 0 0 5rpx rgba($color: #000000, $alpha: 0.3);
				display: flex;

				.re-img {
					min-width: 120rpx;
					width: 120rpx;
					height: 110rpx;
				}

				.re-right {
					margin-left: auto;
					width: 200rpx;
					max-width: 200rpx;
					min-width: 200rpx;
					font-size: 24rpx;
					display: flex;
					flex-direction: column;

					.re-bot {
						margin-top: auto;
						font-size: 16rpx;
						display: flex;
						justify-content: space-between;

						.re-price {
							color: red;
							font-size: 20rpx;
						}

						.re-small {
							color: #999;
						}
					}
				}
			}
		}

		.button-text {
			position: absolute;
			left: 0;
			bottom: 136rpx;
			font-size: 36rpx;
			color: #844216;
			z-index: 10;
			width: 100%;
			text-align: center;
			padding-left: 30rpx;
			height: 70rpx;
			line-height: 70rpx;
		}

		.re-bg {
			width: 100%;
			height: 450rpx;
			position: absolute;
			top: -50rpx;
			left: 0;
			z-index: 0;
		}

		.re-hide {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 2;
		}
	}

	.ico-star {
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -40rpx;
		width: 80rpx;
		height: 80rpx;
		z-index: 10;
	}

	.line {
		position: absolute;
		left: 10rpx;
		bottom: 10rpx;
		width: 260rpx;
		height: 16rpx;
		background-color: #fee233;
		z-index: -1;
		border-radius: 10rpx;

		&.line-top {
			// width: 260rpx;
			bottom: 30rpx;
		}
	}

	.secmore {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 24rpx;
		z-index: 10;
		color: #666;
	}

	.advint {
		padding: $gutter;
	}
</style>
