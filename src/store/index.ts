import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bills: [
      { type: "expend", count: 100, time: "", label: "餐饮" },
      { type: "income", count: 3000, time: "", label: "工资" },
      { type: "expend", count: 1000, time: "", label: "交通", note: "地铁" }
    ],
    labels: [
      { type: "expend", name: "餐饮" },
      { type: "expend", name: "娱乐" },
      { type: "expend", name: "服饰" },
      { type: "expend", name: "交通" },
      { type: "expend", name: "通讯" },
      { type: "expend", name: "宠物" },
      { type: "income", name: "工资" },
      { type: "income", name: "理财" },
      { type: "income", name: "礼金" },
      { type: "income", name: "其他" }
    ],
  },
  getters: {
    expendBills: state => {
      return state.bills.filter(bill => bill.type === 'expend')
    },
    incomeBills: state => {
      return state.bills.filter(bill => bill.type === 'income')
    },
    expendLabels: state => {
      return state.labels.filter(label => label.type === 'expend')
    },
    incomeLabels: state => {
      return state.labels.filter(label => label.type === 'income')
    },
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
