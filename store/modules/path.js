// export default {
// 	state: {

// 	},
// 	getters: {

// 	},
// 	mutations: {

// 	},
// 	actions: {

// 	}
// }

export default {
	state: {
		list: [{
			name: 'lly',
			phone: '17608441466',
			path: '广东省 广州市 白云区',
			detailPath: 'xxx街道',
			isdefault: true
		}, {
			name: 'lly',
			phone: '17727990644',
			path: '广东省 广州市 白云区',
			detailPath: 'xxx街道',
			isdefault: false
		}],
	},
	getters: {
		// 获取默认地址
		defaultPath:state=>{
			return state.list.filter(v=>v.isdefault)
		}
	},
	mutations: {
		// 创建收货地址
		createPath(state, item) {
			state.list.unshift(item)
		},
		// 删除收货地址
		delPath(state, index) {
			state.list.splice(index, 1)
		},
		// 修改收货地址
		updatePath(state, {
			index,
			item
		}) {
			for (let key in item) {
				state.list[index][key] = item[key]
			}
		},
		// 取消默认地址
		removeDefault(state) {
			state.list.forEach(v => {
				if (v.isdefault) {
					v.isdefault = false
				}
			})
		}
	},
	actions: {
		createPathAction({
			commit
		}, item) {
			if (item.isdefault) {
				commit('removeDefault')
			}
			commit('createPath', item)
		},
		// 修改收货地址
		updatePathAction({
			commit
		}, obj) {
			if (obj.item.isdefault) {
				commit('removeDefault')
			}
			commit('updatePath', obj)
		}
	}
}
