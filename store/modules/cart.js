export default {
	state: {
		list: [{
			id: 1,
			checked: false,
			title: '商品标题',
			cover: '/static/images/demo/cate_01.png',
			pprice: 336,
			num: 1,
			minnum: 1,
			maxnum: 10, // 该商品最大商品数，跟库存有关系
			attrs: [{
					title: '颜色',
					selected: 0,
					list: [{
							name: '火焰红'
						},
						{
							name: '炭黑'
						},
						{
							name: '冰川蓝'
						}
					]
				},
				{
					title: '容量',
					selected: 0,
					list: [{
							name: '64GB'
						},
						{
							name: '128GB'
						},
						{
							name: '256GB'
						}
					]
				},
				{
					title: '套餐',
					selected: 0,
					list: [{
							name: '标配'
						},
						{
							name: '套餐一'
						},
						{
							name: '套餐二'
						}
					]
				}
			]
		}, {
			id: 2,
			checked: false,
			title: '商品标题',
			cover: '/static/images/demo/cate_01.png',
			pprice: 336,
			num: 1,
			minnum: 1,
			maxnum: 10, // 该商品最大商品数，跟库存有关系
			attrs: [{
					title: '颜色',
					selected: 0,
					list: [{
							name: '火焰红'
						},
						{
							name: '炭黑'
						},
						{
							name: '冰川蓝'
						}
					]
				},
				{
					title: '容量',
					selected: 0,
					list: [{
							name: '64GB'
						},
						{
							name: '128GB'
						},
						{
							name: '256GB'
						}
					]
				},
				{
					title: '套餐',
					selected: 1,
					list: [{
							name: '标配'
						},
						{
							name: '套餐一'
						},
						{
							name: '套餐二'
						}
					]
				}
			]
		}],
		// 选中列表（存放选中的id）
		selectedList: [],
		// popup显示
		popupShow: 'none',
		popupIndex: -1
	},
	getters: {
		// 判断是否全选
		checkedAll: state => {
			console.log(state)
			return state.list.length === state.selectedList.length
		},
		// 合计
		totalPrice: state => {
			var total = 0
			state.list.map(v => {
				if (state.selectedList.indexOf(v.id) > -1) {
					total += v.pprice * v.num
				}

			})
			return total
		},
		// 禁用全选
		disableSelectAll: state => state.list.length === 0,
		// 拿到当前需要修改属性的商品
		popupData: state => {
			return state.popupIndex>-1?state.list[state.popupIndex]:{}
		}
	},
	mutations: {
		// 选中/取消选中某个商品
		selectItem(state, index) {
			let id = state.list[index].id
			let i = state.selectedList.indexOf(id)
			// 之前是选中，取消选中
			if (i > -1) {
				// 取消当前商品选中状态
				state.list[index].checked = false
				// 移除选中列表中的当前商品
				return state.selectedList.splice(i, 1)
			}
			// 选中
			state.list[index].checked = true
			state.selectedList.push(id)
		},
		// 全选
		selectAll(state) {
			state.selectedList = state.list.map(v => {
				// 设置全选状态
				v.checked = true
				return v.id
			})
		},
		// 取消全选
		unSelectAll(state) {
			state.list.forEach(v => {
				// 设置全选状态
				v.checked = false

			})
			state.selectedList = []
		},
		// 删除选中
		delGoods(state) {
			state.list = state.list.filter(v => {
				return state.selectedList.indexOf(v.id) === -1
			})
			state.selectedList = []
		},
		// 初始化popupIndex
		initPopupIndex(state, index) {
			state.popupIndex = index
		},
		// 加入购物车
		addGoodsToCart(state,goods){
			state.list.unshift(goods)
		}
	},
	actions: {
		// 显示popup
		dopShowPopup({
			state,
			commit
		}, index) {
			commit('initPopupIndex', index)
			state.popupShow = 'show'
		},
		// 隐藏popup
		dopHidePopup({
			state
		}) {
			state.popupShow = 'hide'
			setTimeout(() => {
				state.popupShow = 'none'
				commit('initPopupIndex', -1)
			}, 200)
		},
		// 全选/反选
		doSelectAll({
			commit,
			getters
		}) {
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		// 删除选中
		doDelGoods({
			commit
		}) {
			uni.showModal({
			content: '是否删除选中？',
				success: res => {
					console.log(res)
					if (res.confirm) {
						commit('delGoods')
						uni.showToast({
							title: '删除成功'
						});
					}
				}
			});
		}
	}
}
