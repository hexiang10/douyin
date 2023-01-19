<script>
import provinceList from './json/area_province.js';
import cityList from './json/area_city.js';
import districtList from './json/area_district.js';
export default {
	globalData: {
		serverUrl: 'http://192.168.31.178:8888', // 开发环境，不能使用localhost
		// serverUrl: "http://localhost",					// 错误示范！！！
		// serverUrl: "http://192.168.1.6",					// 生产环境

		provinceList: provinceList,
		cityList: cityList,
		districtList: districtList
	},

	onLaunch: function() {
		console.log('onLaunch...测试调试信息的打印');

		var me = this;
		uni.onTabBarMidButtonTap(() => {
			// 未登录不能发布视频
			var myUserInfo = getApp().getUserInfoSession();
			if (myUserInfo == null) {
				uni.showToast({
					duration: 1500,
					title: '请登录~',
					icon: 'none'
				});
				uni.navigateTo({
					url: '../loginRegist/loginRegist',
					animationType: 'slide-in-bottom',
					success() {
						me.loginWords = '请登录';
					}
				});
				return;
			}

			// console.log('onTabBarMidButtonTap');
			uni.switchTab({
				url: '../me/me'
			});

			uni.chooseVideo({
				sourceType: ['album', 'camera'],
				success(e) {
					uni.navigateTo({
						url: '/pages/publish/publish?fileObjectEvent=' + JSON.stringify(e)
					});

					/**
					 * 或者采用uniCloud，在客户端完成上传，减少链路，因为文件大，通信链路和耗时是双倍的
					 */
					var times = new Date().getTime();
				}
			});
		});
	},
	onShow: function() {},
	onHide: function() {},
	methods: {
		getDefaultVlogList() {
			var list = [
				{
					vlogId: '2109307DX5GFABXP',
					vlogerId: '211003H4SG5Y1ZF8',
					vlogerFace: 'blog.csdnimg.cn/2592a77c1b45499ea109d39d67aa827b.jpeg',
					vlogerName: '@肖黑子',
					content: '🐓你太美⛹️‍♂️电光版！炫酷登场🏀',
					url: 'http://1.12.42.148:9000/douyin-cloud/test/video/01.mp4',
					cover: 'https://img-blog.csdnimg.cn/24157ab93ac04df6a8c7d5ca4c78fbc8.png',
					isLike: 1,
					play: false
				}
			];
			return list;
		},
		graceNumber(number) {
			if (number == 0) {
				return '0';
			} else if (number > 999 && number <= 9999) {
				return (number / 1000).toFixed(1) + 'k';
			} else if (number > 9999 && number <= 99999) {
				return (number / 10000).toFixed(1) + 'w';
			} else if (number > 99999) {
				return '10w+';
			}
			return number;
		},
		// 时间格式化时间为：多少分钟前、多少天前
		// time 2022-09-10 20:20:20
		getDateBeforeNow(stringTime) {
			// console.log(stringTime);
			stringTime = new Date(stringTime.replace(/-/g, '/'));

			var minute = 1000 * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var week = day * 7;
			var month = day * 30;

			var time1 = new Date().getTime(); //当前的时间戳
			// console.log(time1);
			// console.log(new Date(stringTime));
			var time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
			// console.log(time2);
			var time = time1 - time2;

			var result = null;
			if (time < 0) {
				// alert("设置的时间不能早于当前时间！");
				result = stringTime;
			} else if (time / month >= 1) {
				result = parseInt(time / month) + '月前';
			} else if (time / week >= 1) {
				result = parseInt(time / week) + '周前';
			} else if (time / day >= 1) {
				result = parseInt(time / day) + '天前';
			} else if (time / hour >= 1) {
				result = parseInt(time / hour) + '小时前';
			} else if (time / minute >= 1) {
				result = parseInt(time / minute) + '分钟前';
			} else {
				result = '刚刚';
			}
			// console.log(result);
			return result;
		},

		// 判断是否为空
		isStrEmpty(str) {
			if (str == null || str == undefined || str == '') {
				return true;
			} else {
				return false;
			}
		},
		// 判断用户是否登录
		userIsLogin() {
			var userToken = this.getUserSessionToken();
			var userInfo = this.getUserInfoSession();
			// console.log("userInfo=" + userInfo);
			// console.log("userToken=" + userToken);
			if (!this.isStrEmpty(userToken) && !this.isStrEmpty(userInfo)) {
				return true;
			} else {
				return false;
			}
		},
		// 用户登录以后的session存取，token和userInfo
		setUserSessionToken(token) {
			uni.setStorageSync('userToken', token);
		},
		getUserSessionToken() {
			var token = uni.getStorageSync('userToken');
			if (this.isStrEmpty(token)) {
				return '';
			}
			return token;
		},
		setUserInfoSession(user) {
			uni.setStorageSync('userInfo', JSON.stringify(user));
		},
		getUserInfoSession() {
			var user = uni.getStorageSync('userInfo');
			if (this.isStrEmpty(user)) {
				return null;
			}
			return JSON.parse(user);
		},
		clearUserInfo() {
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('userToken');
		},

		// let date = new Date()
		// dateFormat("YYYY-mm-dd HH:MM", date)
		dateFormat(fmt, date) {
			let ret;
			const opt = {
				'Y+': date.getFullYear().toString(), // 年
				'm+': (date.getMonth() + 1).toString(), // 月
				'd+': date.getDate().toString(), // 日
				'H+': date.getHours().toString(), // 时
				'M+': date.getMinutes().toString(), // 分
				'S+': date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp('(' + k + ')').exec(fmt);
				if (ret) {
					fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
				}
			}
			return fmt;
		},

		// 获得星座
		getAstro(m, d) {
			return '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(m * 2 - (d < '102223444433'.charAt(m - 1) - -19) * 2, 2);
		},
		//下面写一个测试函数
		testAstro(month, day) {
			// console.log(month + '月' + day + '日: ' + this.getAstro(month, day));
		},
		// 获得生肖
		getAnimal(year) {
			year = year % 12;
			var animal = '';
			switch (year) {
				case 1:
					animal = '鸡';
					break;
				case 2:
					animal = '狗';
					break;
				case 3:
					animal = '猪';
					break;
				case 4:
					animal = '鼠';
					break;
				case 5:
					animal = '牛';
					break;
				case 6:
					animal = '虎';
					break;
				case 7:
					animal = '兔';
					break;
				case 8:
					animal = '龙';
					break;
				case 9:
					animal = '蛇';
					break;
				case 10:
					animal = '马';
					break;
				case 11:
					animal = '羊';
					break;
				case 0:
					animal = '候';
					break;
			}
			return animal;
		}
	}
};
</script>

<style>
/*每个页面公共css */
.activate-line {
	background-color: #ffffff;
}
</style>
