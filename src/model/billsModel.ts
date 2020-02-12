interface BillsModel {
    data: Bill[]
    monthSum: MonthSum[]
    fetch: () => Bill[]
    add: (bill: Bill) => void
    save: () => void
    display: (now: Date) => DisplayBills[]
    classify: (now: Date) => SortedBills[]
    oneMonth: (now: Date) => Bill[]
    fix: (n: number) => number
}
const billsModel: BillsModel = {
    data: [],
    monthSum: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("billList") || "[]")
        this.monthSum = JSON.parse(window.localStorage.getItem("monthSum") || "[]")
        return this.data
    },
    display(now) {
        const result = []
        const displayBill = this.oneMonth(now)
        let nowTime = { day: 0, month: 0, year: 0 }
        let count = -1
        for (let bill of displayBill) {
            const t = new Date(bill.time)
            const temp = { day: t.getDate(), week: t.getDay(), month: t.getMonth(), year: t.getFullYear() }
            if (temp.day === nowTime.day && temp.month === nowTime.month && temp.year === nowTime.year) {
                result[count].data.push(bill)
                if (bill.type === 'expend') result[count].sum['expend'] = this.fix(result[count].sum['expend'] + Number(bill.count))
                else result[count].sum['income'] = this.fix(result[count].sum['income'] + Number(bill.count))
            }
            else {
                const sum = bill.type === 'expend' ? { expend: Number(bill.count), income: 0 } : { expend: 0, income: Number(bill.count) }
                result.push({ date: temp, data: [bill], sum: sum })
                nowTime = { day: temp.day, month: temp.month, year: temp.year }
                count += 1
            }
        }
        return result;
    },
    classify(now) {
        const result: SortedBills[] = []
        const displayBill = this.oneMonth(now)
        for (let bill of displayBill) {
            let exist = false
            for (let item of result) {
                if (item.label === bill.tag) {
                    item.data.push(bill)
                    item.sum = this.fix(item.sum + Number(bill.count))
                    exist = true
                    break;
                }
            }
            if (!exist)
                result.push({ type: bill.type, label: bill.tag, sum: this.fix(Number(bill.count)), data: [bill] })
        }
        result.sort((a, b) => b.sum - a.sum)
        return result
    },
    oneMonth(now) {
        return this.data.filter(bill => {
            const time = new Date(bill.time)
            return time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()
        })
    },
    add(bill) {
        this.data.unshift(bill);
        const yy = new Date(bill.time).getFullYear()
        const mm = new Date(bill.time).getMonth()
        const last = this.monthSum[this.monthSum.length - 1]
        if (last && last.year === yy && last.month === mm) {
            if (bill.type === 'expend') last.expend = this.fix(last.expend + Number(bill.count))
            else last.income = this.fix(last.income + Number(bill.count))
        }
        else {
            const newSum: MonthSum = bill.type === 'expend' ?
                ({ year: yy, month: mm, expend: this.fix(Number(bill.count)), income: 0 }) :
                ({ year: yy, month: mm, income: this.fix(Number(bill.count)), expend: 0 })
            this.monthSum.push(newSum)
        }
        this.save();
    },
    fix(n) {
        return Number(n.toFixed(2))
    },
    save() {
        window.localStorage.setItem("billList", JSON.stringify(this.data));
        window.localStorage.setItem("monthSum", JSON.stringify(this.monthSum));
    }

}
export default billsModel

