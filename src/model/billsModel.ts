interface Bill {
    type: string;
    tag: string;
    note: string;
    count: string;
    time: number;
};
interface MonthSum {
    year: number;
    month: number;
    expend: number;
    income: number;
}
interface DisplayBills {
    date: { day: number, week: number, month: number, year: number },
    sum: { expend: number, income: number }
    data: Bill[]
}
interface BillsModel {
    data: Bill[]
    monthSum: MonthSum[]
    fetch: () => Bill[]
    add: (bill: Bill) => void
    save: () => void
    display: (now: Date) => DisplayBills[]
    classify: (now: Date) => void
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
        const displayBill = this.oneMonth(now)
        let result: { [propName: string]: number } = {}
        for (let bill of displayBill) {
            if (result[bill.tag]) {
                result[bill.tag] = this.fix(result[bill.tag] + Number(bill.count))
            }
            else {
                result[bill.tag] = this.fix(Number(bill.count))
            }
        }
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
            else last.income += this.fix(last.income + Number(bill.count))
        }
        else {
            const newSum: MonthSum = bill.type === 'expend' ?
                ({ year: yy, month: mm, expend: Number(bill.count), income: 0 }) :
                ({ year: yy, month: mm, income: Number(bill.count), expend: 0 })
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

