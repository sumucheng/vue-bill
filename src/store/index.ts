import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import common from './common'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tags: [] as Tag[],
    budget: 0,
    bills: [] as Bill[],
    monthSum: [] as MonthSum[],
    initOneMonthSum: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      income: 0,
      expend: 0,
      rest: 0,
      averageExpend: 0,
      averageIncome: 0
    },
    initTags: [
      { type: "expend", name: "一般" },
      { type: "expend", name: "餐饮" },
      { type: "expend", name: "娱乐" },
      { type: "expend", name: "服饰" },
      { type: "expend", name: "交通" },
      { type: "expend", name: "通讯" },
      { type: "income", name: "工资" },
      { type: "income", name: "理财" },
      { type: "income", name: "礼金" },
      { type: "income", name: "其他" }
    ]
  },
  getters: {
    filterTags: (state) => (type: string, data?: Tag[]) => {
      const tags = data ? data : state.tags
      return tags.filter(i => i.type === type);
    },
    findTag: (state) => (name: string) => {
      return state.tags.find(tag => tag.name === name)
    },
    findBill: (state) => (id: number) => {
      return state.bills.find(bill => bill.id === id)
    },
    oneMonthSum: (state) => (now: Date) => {
      return state.monthSum.find(i => i.year === now.getFullYear() && i.month === now.getMonth())
    },
    getMonthSumByYear: (state) => (now: Date) => {
      return state.monthSum.filter(i => i.year === now.getFullYear())
    },
    oneMonthBills: (state) => (now: Date) => {
      return state.bills.filter(bill => {
        const time = new Date(bill.time)
        return time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()
      })
    },
    OneTagBills: (state, getters) => (now: Date) => {
      const OneTagBills: oneTagBills[] = []
      const oneMonthBills = getters.oneMonthBills(now)
      for (let bill of oneMonthBills) {
        let exist = false
        for (let item of OneTagBills) {
          if (item.label === bill.tag) {
            item.data.push(bill)
            item.sum = common.fixTwo(item.sum + bill.count)
            exist = true
            break;
          }
        }
        if (!exist)
          OneTagBills.push({
            type: bill.type,
            label: bill.tag,
            sum: common.fixTwo(bill.count),
            data: [bill]
          })
      }
      OneTagBills.sort((a, b) => b.sum - a.sum)
      return OneTagBills
    },
    oneDayBills: (state, getters) => (now: Date) => {
      const oneDayBills = []
      let nowTime = { day: 0, month: 0, year: 0 }
      let count = -1
      const oneMonthBills = getters.oneMonthBills(now)
      for (let bill of oneMonthBills) {
        const t = new Date(bill.time)
        const thisBill = { day: t.getDate(), week: t.getDay(), month: t.getMonth(), year: t.getFullYear() }
        if (thisBill.day === nowTime.day && thisBill.month === nowTime.month && thisBill.year === nowTime.year) {
          oneDayBills[count].data.push(bill)
          if (bill.type === 'expend') oneDayBills[count].sum['expend'] = common.fixTwo(oneDayBills[count].sum['expend'] + bill.count)
          else oneDayBills[count].sum['income'] = common.fixTwo(oneDayBills[count].sum['income'] + bill.count)
        }
        else {
          const sum = bill.type === 'expend' ? { expend: bill.count, income: 0 } : { expend: 0, income: bill.count }
          oneDayBills.push({ date: thisBill, data: [bill], sum: sum })
          nowTime = { day: thisBill.day, month: thisBill.month, year: thisBill.year }
          count += 1
        }
      }
      return oneDayBills;
    },
  },
  mutations: {
    fetchTags(state) {
      state.tags = JSON.parse(window.localStorage.getItem("tags") || "[]")
      if (state.tags.length === 0) state.tags = JSON.parse(JSON.stringify(state.initTags))
    },

    saveTags(state) {
      window.localStorage.setItem("tags", JSON.stringify(state.tags));
    },
    createTag(state, dispatch: { type: string, name: string }) {
      const name = dispatch.name.substr(0, 4);
      if (state.tags.find((i: Tag) => i.name === name)) {
        window.alert('该标签已存在')
      }
      else {
        state.tags = [...state.tags, { type: dispatch.type, name: name }]
        store.commit('saveTags')
      }
    },
    deleteTag(state, tag: Tag) {
      const name = tag.name
      const index = state.tags.findIndex(i => i.name === name);
      state.tags.splice(index, 1);
      store.commit('saveTags')
    },
    editTag(state, dispatch: { tag: Tag, newName: string }) {
      dispatch.tag.name = dispatch.newName
      store.commit('saveTags')
    },
    fetchBudget(state) {
      state.budget = JSON.parse(window.localStorage.getItem("budget") || "0")
    },
    saveBudget(state) {
      window.localStorage.setItem("budget", JSON.stringify(state.budget));
    },
    settingBudget(state, sum: number) {
      state.budget = sum
      store.commit("saveBudget")
      // const now = new Date()
      // const yy = now.getFullYear()
      // const mm = now.getMonth()
      // const monthSum = state.monthSum.find(i => i.year === yy && i.month === mm);
      // const expend = monthSum ? monthSum.expend : 0;
      // const restDay = common.dayOfMonth(yy, mm) - now.getDate()
      // state.budget = {
      //   sum: sum,
      //   rest: sum - expend > 0 ? sum - expend : 0,
      //   dailyCanUse: sum - expend > 0 ? common.fixTwo((sum - expend) / restDay) : 0
      // }
    },

    fetchBills(state) {
      state.bills = JSON.parse(window.localStorage.getItem("billList") || "[]")
      state.monthSum = JSON.parse(window.localStorage.getItem("monthSum") || "[]")
      if (state.monthSum.length === 0) state.monthSum = [JSON.parse(JSON.stringify(state.initOneMonthSum))]
    },
    createBill(state, newBill: Bill) {
      const bill = JSON.parse(JSON.stringify(newBill));
      state.bills.unshift(bill);
      store.commit("updateMonthSum", bill)
      store.commit('saveBills')
    },
    saveBills(state) {
      window.localStorage.setItem("billList", JSON.stringify(state.bills));
      window.localStorage.setItem("monthSum", JSON.stringify(state.monthSum));
    },
    deleteBill(state, id: number) {
      const index = state.bills.findIndex(i => i.id === id);
      const bill = state.bills[index]
      state.bills.splice(index, 1);
      store.commit("updateMonthSum", bill)
      store.commit('saveBills')
    },
    editBill(state, bill: Bill) {
      bill && store.commit("updateMonthSum", bill)
      store.commit('saveBills')
    },

    updateMonthSum(state, bill: Bill) {
      const billTime = new Date(bill.time)
      const yy = billTime.getFullYear()
      const mm = billTime.getMonth()
      const oneMonthBills = store.getters.oneMonthBills(billTime)
      let ms = state.monthSum.find(i => i.month === mm && i.year === yy) as MonthSum
      if (!ms) {
        ms = JSON.parse(JSON.stringify(state.initOneMonthSum))
        ms.year = yy
        ms.year = mm
        state.monthSum = [...state.monthSum, ms]
      }
      ms.expend = 0
      ms.income = 0
      for (let bill of oneMonthBills) {
        ms[bill.type as 'income' | 'expend'] = common.fixTwo(ms[bill.type as 'income' | 'expend'] + bill.count)
      }
      ms.rest = common.fixTwo(ms.income - ms.expend)
      const days = common.dayOfMonth(ms.year, ms.month)
      ms.averageExpend = common.fixTwo(ms.expend / days)
      ms.averageIncome = common.fixTwo(ms.income / days)
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store