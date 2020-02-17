const tagStore = {
    budget: {},
    fetchBudget() {
        this.budget = JSON.parse(window.localStorage.getItem("budget") || "0")
        if (this.budget === 0) this.initBudget()
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
    }

}

tagStore.fetchBudget()

export default tagStore