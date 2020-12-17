import urlConfig from '../common/config.js'
 import store from '../store'
 export default {
   /*
    * 单图上传
    * @param object opt
    * @param callable successCallback 成功执行方法 data 
    * @param callable errorCallback 失败执行方法 
    */
   uploadImageOne: function(opt, successCallback, errorCallback) {
   	let that = this;
   	if (typeof opt === 'string') {
   		let url = opt;
   		opt = {};
   		opt.url = url;
   	}
   	let count = opt.count || 1,
   		sizeType = opt.sizeType || ['compressed'],
   		sourceType = opt.sourceType || ['album', 'camera'],
   		is_load = opt.is_load || true,
   		uploadUrl = opt.url || '',
   		inputName = opt.name || 'field';
   	uni.chooseImage({
   		count: count, //最多可以选择的图片总数  
   		sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有  
   		sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有  
   		success: function(res) {
   			//启动上传等待中...  
   			uni.showLoading({
   				title: '图片上传中',
   			});
   			uni.uploadFile({
   				url: urlConfig + '/api/' + uploadUrl+'/'+inputName,
   				filePath: res.tempFilePaths[0],
   				name: inputName,
   				formData: {
   					'filename': inputName
   				},
   				header: {
   					// #ifdef MP
   					"Content-Type": "multipart/form-data",
   					// #endif
   					['x-token']: store.state.userInfo.token
   				},
   				success: function(res) {
   					uni.hideLoading();
   					if (res.statusCode == 403) {
              uni.showToast({
                title: res.data,
                icon: 'none'
              })
   					} else {
   						let data = res.data ? JSON.parse(res.data) : {};
   						if (data.status == 200) {
   							successCallback && successCallback(data)
   						} else {
   							errorCallback && errorCallback(data);
                uni.showToast({
                  title: data.msg,
                  icon: 'none'
                })
   						}
   					}
   				},
   				fail: function(res) {
   					uni.hideLoading();
            uni.showToast({
              title: '上传图片失败',
              icon: 'none'
            })
   				}
   			})
   			// pathToBase64(res.tempFilePaths[0])
   			// 	.then(imgBase64 => {
   			// 		console.log(imgBase64);
   					
   			// 	})
   			// 	.catch(error => {
   			// 		console.error(error)
   			// 	})
   		}
   	})
   },
	 /**
		* 字符串截取
		* @obj 传入的数据
		* @state 0 某个参数之前 1某个参数之后
		* 
		*
		* **/ 
	stringIntercept:function(obj,state,type){
		var index=obj.lastIndexOf(type);
		if(state==0){
			obj=obj.substring(0,index);
		}else {
			obj=obj.substring(index+1,obj.length);
		}
		return obj;
	},
  $h: {
  	//除法函数，用来得到精确的除法结果
  	//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
  	//调用：$h.Div(arg1,arg2)
  	//返回值：arg1除以arg2的精确结果
  	Div: function(arg1, arg2) {
  		arg1 = parseFloat(arg1);
  		arg2 = parseFloat(arg2);
  		var t1 = 0,
  			t2 = 0,
  			r1, r2;
  		try {
  			t1 = arg1.toString().split(".")[1].length;
  		} catch (e) {}
  		try {
  			t2 = arg2.toString().split(".")[1].length;
  		} catch (e) {}
  		r1 = Number(arg1.toString().replace(".", ""));
  		r2 = Number(arg2.toString().replace(".", ""));
  		return this.Mul(r1 / r2, Math.pow(10, t2 - t1));
  	},
  	//加法函数，用来得到精确的加法结果
  	//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  	//调用：$h.Add(arg1,arg2)
  	//返回值：arg1加上arg2的精确结果
  	Add: function(arg1, arg2) {
  		arg2 = parseFloat(arg2);
  		var r1, r2, m;
  		try {
  			r1 = arg1.toString().split(".")[1].length
  		} catch (e) {
  			r1 = 0
  		}
  		try {
  			r2 = arg2.toString().split(".")[1].length
  		} catch (e) {
  			r2 = 0
  		}
  		m = Math.pow(100, Math.max(r1, r2));
  		return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
  	},
  	//减法函数，用来得到精确的减法结果
  	//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
  	//调用：$h.Sub(arg1,arg2)
  	//返回值：arg1减去arg2的精确结果
  	Sub: function(arg1, arg2) {
  		arg1 = parseFloat(arg1);
  		arg2 = parseFloat(arg2);
  		var r1, r2, m, n;
  		try {
  			r1 = arg1.toString().split(".")[1].length
  		} catch (e) {
  			r1 = 0
  		}
  		try {
  			r2 = arg2.toString().split(".")[1].length
  		} catch (e) {
  			r2 = 0
  		}
  		m = Math.pow(10, Math.max(r1, r2));
  		//动态控制精度长度
  		n = (r1 >= r2) ? r1 : r2;
  		return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
  	},
  	//乘法函数，用来得到精确的乘法结果
  	//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
  	//调用：$h.Mul(arg1,arg2)
  	//返回值：arg1乘以arg2的精确结果
  	Mul: function(arg1, arg2) {
  		arg1 = parseFloat(arg1);
  		arg2 = parseFloat(arg2);
  		var m = 0,
  			s1 = arg1.toString(),
  			s2 = arg2.toString();
  		try {
  			m += s1.split(".")[1].length
  		} catch (e) {}
  		try {
  			m += s2.split(".")[1].length
  		} catch (e) {}
  		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  	},
  },
 }
