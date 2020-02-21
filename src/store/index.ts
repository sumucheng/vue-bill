import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import dayjs from 'dayjs'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tags: [] as Tag[],
    budget: 0,
    bills: [] as Bill[],
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
    fixTwo: (state) => (n: number) => {
      return Number(n.toFixed(2))
    },
    dayOfMonth: (state) => (year: number, month: number) => {
      return new Date(year, month + 1, 0).getDate()
    },
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
    oneMonthBills: (state) => (now: Date) => {
      return state.bills.filter(bill => dayjs(now).isSame(bill.time, 'month'))
    },
    getYearStats: (state, getters) => (now: Date) => {
      const msList: MonthStats[] = []
      let yearData = { expend: 0, income: 0, rest: 0 };
      let date = dayjs(now).startOf('year')
      for (let i = 0; i < 12; i++) {
        const ms = getters.getMonthStats(date)
        if(ms.expend>0 ||ms.income>0){  
          msList.push(ms)
          yearData.expend += ms.expend
          yearData.income += ms.income}
        date = date.add(1, 'month')
      }
      yearData.rest = yearData.income - yearData.expend
      return { yearData, msList }
    },
    getMonthStats: (state, getters) => (now: Date) => {
      const ms :MonthStats= { date:now, expend: 0, income: 0, rest: 0, averageExpend: 0, averageIncome: 0 }
      const oneMonthBills = getters.oneMonthBills(now)
      for (let bill of oneMonthBills) {
        const type = bill.type as 'income' | 'expend'
        ms[type] = getters.fixTwo(ms[type] + bill.count)
      }
      ms.rest = getters.fixTwo(ms.income - ms.expend)
      const days = dayjs(now).endOf('month').date()
      ms.averageExpend = getters.fixTwo(ms.expend / days)
      ms.averageIncome = getters.fixTwo(ms.income / days)
      return ms
    },
    getBillsByTag: (state, getters) => (now: Date) => {
      const bills: BillsGroupByTag = {}
      const oneMonthBills = getters.oneMonthBills(now)
      for (let bill of oneMonthBills) {
        const key = bill.tag
        bills[key] = bills[key] || { data: [], type: bill.type, sum: 0, tag: key }
        bills[key].data.push(bill)
        bills[key].sum = getters.fixTwo(bills[key].sum + bill.count)
      }
      return bills
    },
    getBillsByDay: (state, getters) => (now: Date) => {
      const bills: BillsGroupByDay = {}
      const oneMonthBills = getters.oneMonthBills(now)
      for (let bill of oneMonthBills) {
        const type = bill.type as 'income' | 'expend'
        const time = dayjs(bill.time)
        const key = time.format('YYYY MM DD')
        bills[key] = bills[key] || { data: [], sum: { expend: 0, income: 0 }, date: { day: time.date(), week: time.day(), month: time.month(), year: time.year() } }
        bills[key].data.push(bill)
        bills[key].sum[type] = getters.fixTwo(bills[key].sum[type] + bill.count)
      }
      return bills
    },
  },
  mutations: {
    fetch(state) {
      state.tags = JSON.parse(window.localStorage.getItem("tags") || "[]")
      if (state.tags.length === 0) state.tags = JSON.parse(JSON.stringify(state.initTags))
      state.budget = JSON.parse(window.localStorage.getItem("budget") || "0")
      state.bills = JSON.parse(window.localStorage.getItem("billList") || "[]")
      state.bills.sort((a, b) => b.time - a.time)
    },
    saveTags(state) {
      window.localStorage.setItem("tags", JSON.stringify(state.tags));
    },
    createTag(state, payload: { type: string, name: string }) {
      let { type, name } = payload
      name = name.substr(0, 4);
      if (state.tags.find((i: Tag) => i.name === name)) {
        window.alert('该标签已存在')
      }
      else {
        state.tags = [...state.tags, { type: type, name: name }]
        store.commit('saveTags')
      }
    },
    deleteTag(state, tag: Tag) {
      const name = tag.name
      const index = state.tags.findIndex(i => i.name === name);
      state.tags.splice(index, 1);
      store.commit('saveTags')
    },
    editTag(state, payload: { tag: Tag, newName: string }) {
      const { tag, newName } = payload
      tag.name = newName
      store.commit('saveTags')
    },
    saveBudget(state) {
      window.localStorage.setItem("budget", JSON.stringify(state.budget));
    },
    settingBudget(state, sum: number) {
      state.budget = sum
      store.commit("saveBudget")
    },
    createBill(state, newBill: Bill) {
      const bill = JSON.parse(JSON.stringify(newBill));
      state.bills.unshift(bill);
      store.commit('saveBills')
    },
    saveBills(state) {
      window.localStorage.setItem("billList", JSON.stringify(state.bills));
    },
    deleteBill(state, id: number) {
      const index = state.bills.findIndex(i => i.id === id);
      state.bills.splice(index, 1);
      store.commit('saveBills')
    },
    editBill(state, bill: Bill) {
      store.commit('saveBills')
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store