import store from './store'
const budgetStore = {
    budget: {
        sum: 0,
        rest: 0,
        dailyCanUse: 0
    },
    fetchBudget() {
        this.budget = JSON.parse(window.localStorage.getItem("budget")!)
        if (!this.budget) this.initBudget()
        return this.budget
    },
    saveBudget() {
        window.localStorage.setItem("budget", JSON.stringify(this.budget));
    },
    initBudget() {
        this.budget = {
            sum: 0,
            rest: 0,
            dailyCanUse: 0
        }
    },
    settingBudget(sum: number) {
        const now = new Date()
        const yy = now.getFullYear()
        const mm = now.getMonth()
        const monthSum = store.monthSum.find(i => i.year === yy && i.month === mm);
        const expend = monthSum ? monthSum.expend : 0;
        const restDay = store.dayOfMonth(yy, mm) - now.getDate()
        this.budget = {
            sum: sum,
            rest: sum - expend > 0 ? sum - expend : 0,
            dailyCanUse: sum - expend > 0 ? store.fixTwo((sum - expend) / restDay) : 0
        }
        this.saveBudget()
    },

}

budgetStore.fetchBudget()

export default budgetStore