type Bill = {
    type: string;
    tag: string;
    note: string;
    count: string;
    time: number;
};
type MonthSum = {
    year: number;
    month: number;
    expend: number;
    income: number;
}
type displayBills = {
    date: { day: number, week: number, month: number, year: number },
    sum: { expend: number, income: number }
    data: Bill[]
}
type BillsModel = {
    data: Bill[],
    monthSum: MonthSum[],
    fetch: () => Bill[]
    display: (now: Date) => displayBills[]
    add: (bill: Bill) => void
    save: () => void
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
        const displayBill = this.data.filter(bill => {
            const time = new Date(bill.time)
            return time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()
        })
        let nowTime = { day: 0, month: 0, year: 0 }
        let count = -1
        for (let bill of displayBill) {
            const t = new Date(bill.time)
            const temp = { day: t.getDate(), week: t.getDay(), month: t.getMonth(), year: t.getFullYear() }
            if (temp.day === nowTime.day && temp.month === nowTime.month && temp.year === nowTime.year) {
                result[count].data.push(bill)
                if (bill.type === 'expend') result[count].sum['expend'] += Number(bill.count)
                else result[count].sum['income'] += Number(bill.count)
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
    add(bill) {
        this.data.unshift(bill);
        const yy = new Date(bill.time).getFullYear()
        const mm = new Date(bill.time).getMonth()
        const last = this.monthSum[this.monthSum.length - 1]
        if (last && last.year === yy && last.month === mm) {
            if (bill.type === 'expend') last.expend += Number(bill.count)
            else last.income += Number(bill.count)
        }
        else {
            const newSum: MonthSum = bill.type === 'expend' ?
                ({ year: yy, month: mm, expend: Number(bill.count), income: 0 }) :
                ({ year: yy, month: mm, income: Number(bill.count), expend: 0 })
            this.monthSum.push(newSum)
        }
        console.log(this.monthSum)
        this.save();
    },
    save() {
        window.localStorage.setItem("billList", JSON.stringify(this.data));
        window.localStorage.setItem("monthSum", JSON.stringify(this.monthSum));
    }
}
export default billsModel

