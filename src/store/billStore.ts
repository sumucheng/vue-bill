const billStore = {
    bills: [] as Bill[],
    monthSum: [] as MonthSum[],
    oneMonthSum(now: Date) {
        return this.monthSum.find(
            i => i.year === now.getFullYear() && i.month === now.getMonth()
        );
    },
    fetchBills() {
        this.bills = JSON.parse(window.localStorage.getItem("billList") || "[]")
        this.monthSum = JSON.parse(window.localStorage.getItem("monthSum") || "[]")
        if (this.monthSum.length === 0) this.monthSum = [this.initMonthSum()]
    },
    saveBills() {
        window.localStorage.setItem("billList", JSON.stringify(this.bills));
        window.localStorage.setItem("monthSum", JSON.stringify(this.monthSum));
    },
    test(now: Date) {
        const result: oneTagBills[] = []
        const oneMonthBills = this.oneMonthBills(now)
        const tagList: string[] = []
        for (let bill of oneMonthBills) {
            if (!tagList.find((i: string) => i === bill.tag)) {
                tagList.push(bill.tag)
            }
        }
        const OneTagBills: { tag: string, bills: Bill[] }[] = []
        for (let tag of tagList) {
            OneTagBills.push({ tag: tag, bills: oneMonthBills.filter(bill => bill.tag === tag) })
        }
        for (let oneTag of OneTagBills) {
            let sum = 0;
            for (let bill of oneTag.bills) {
                sum = this.fixTwo(sum + bill.count)
            }
            result.push({
                type: oneTag.bills[0].type,
                label: oneTag.tag,
                sum: sum,
                data: oneTag.bills
            })
        }
    },
    OneTagBills(now: Date) {
        const OneTagBills: oneTagBills[] = []
        const oneMonthBills = this.oneMonthBills(now)
        for (let bill of oneMonthBills) {
            let exist = false
            for (let item of OneTagBills) {
                if (item.label === bill.tag) {
                    item.data.push(bill)
                    item.sum = this.fixTwo(item.sum + bill.count)
                    exist = true
                    break;
                }
            }
            if (!exist)
                OneTagBills.push({
                    type: bill.type,
                    label: bill.tag,
                    sum: this.fixTwo(bill.count),
                    data: [bill]
                })
        }
        OneTagBills.sort((a, b) => b.sum - a.sum)
        return OneTagBills
    },
    oneDayBills(now: Date) {
        const oneDayBills = []
        let nowTime = { day: 0, month: 0, year: 0 }
        let count = -1
        const oneMonthBills = this.oneMonthBills(now)
        for (let bill of oneMonthBills) {
            const t = new Date(bill.time)
            const thisBill = { day: t.getDate(), week: t.getDay(), month: t.getMonth(), year: t.getFullYear() }
            if (thisBill.day === nowTime.day && thisBill.month === nowTime.month && thisBill.year === nowTime.year) {
                oneDayBills[count].data.push(bill)
                if (bill.type === 'expend') oneDayBills[count].sum['expend'] = this.fixTwo(oneDayBills[count].sum['expend'] + bill.count)
                else oneDayBills[count].sum['income'] = this.fixTwo(oneDayBills[count].sum['income'] + bill.count)
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
    createBill(newBill: Bill) {
        const bill = JSON.parse(JSON.stringify(newBill));
        this.bills.unshift(bill);
        this.updateMonthSum(bill)
        this.saveBills();
    },
    deleteBill(id: number) {
        const index = this.bills.findIndex(i => i.id === id);
        this.updateMonthSum(this.findBill(id)!)
        this.bills.splice(index, 1);
        this.saveBills()
    },
    editBill(bill: Bill) {
        bill && this.updateMonthSum(bill)
        this.saveBills()
    },
    findBill(id: number) {
        return this.bills.find(bill => bill.id === id)
    },
    updateMonthSum(bill: Bill) {
        const billTime = new Date(bill.time)
        const yy = billTime.getFullYear()
        const mm = billTime.getMonth()
        const oneMonthBills = this.oneMonthBills(billTime)
        const ms = this.monthSum.find(i => i.month === mm && i.year === yy) as MonthSum
        if (!ms) this.monthSum.unshift(this.initMonthSum(yy, mm))
        ms.expend = 0
        ms.income = 0
        for (let bill of oneMonthBills) {
            ms[bill.type as 'income' | 'expend'] = this.fixTwo(ms[bill.type as 'income' | 'expend'] + bill.count)
        }
        ms.rest = this.fixTwo(ms.income - ms.expend)
        const days = this.dayOfMonth(ms.year, ms.month)
        ms.averageExpend = this.fixTwo(ms.expend / days)
        ms.averageIncome = this.fixTwo(ms.income / days)
    },
    dayOfMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate()
    },
    oneMonthBills(now: Date) {
        return this.bills.filter(bill => {
            const time = new Date(bill.time)
            return time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()
        })
    },
    initNewBill() {
        return {
            id: this.bills[0] ? (this.bills[0].id + 1) : 0,
            type: "expend",
            tag: "一般",
            note: "",
            count: 0,
            time: 0
        }
    },
    initMonthSum(year?: number, month?: number) {
        return {
            year: year ? year : new Date().getFullYear(),
            month: month ? month : new Date().getMonth(),
            income: 0,
            expend: 0,
            rest: 0,
            averageExpend: 0,
            averageIncome: 0
        }
    },
    headerTitle(oneMonthSum: MonthSum | undefined, selected: string, type: string) {
        if (selected === 'detail') {
            const e = oneMonthSum ? oneMonthSum.expend : 0;
            const i = oneMonthSum ? oneMonthSum.income : 0;
            return [
                { text: "支出", count: e },
                { text: "收入", count: i }
            ];
        }
        else {
            const averageText = type === "expend" ? "平均每日支出" : "平均每日收入";
            const rest = oneMonthSum ? oneMonthSum.rest : 0;
            const ave = oneMonthSum ? type === "expend" ? oneMonthSum.averageExpend : oneMonthSum.averageIncome : 0;
            return [
                { text: "结余", count: rest },
                { text: averageText, count: ave }
            ];
        }
    },
    displayDate(date: number | { day?: number; week?: number; month?: number; year?: number }) {
        if (typeof date === 'number') {
            const d = new Date(date)
            date = {
                day: d.getDate(),
                week: d.getDay(),
                month: d.getMonth()
            }
        }
        const oneWeek = ["日", "一", "二", "三", "四", "五", "六"];
        const dateText = date.day && (date.day < 10 ? "0" + date.day : date.day);
        const monthText =
            date.month && (date.month < 9 ? "0" + (date.month + 1) : date.month + 1);
        const weekText = (date.week || date.week === 0) && (`星期${oneWeek[date.week]}`);
        return { dateText, weekText, monthText }
    },
    fixTwo(n: number) {
        return Number(n.toFixed(2))
    }
}

billStore.fetchBills()

export default billStore