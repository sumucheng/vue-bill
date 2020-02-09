type Bill = {
    type: string;
    tag: string;
    note: string;
    count: string;
    time: number;
};
type displayBills = {
    date: { day: number, week: number, month: number, year: number },
    sum: { expend: number, income: number }
    data: Bill[]
}
type BillsModel = {
    data: Bill[]
    fetch: () => Bill[]
    display: (type: string) => displayBills[]
    add: (bill: Bill) => void
    save: () => void
}
const billsModel: BillsModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("billList") || "[]")
        return this.data
    },
    display(type) {
        const displayData = this.data.filter(bill => bill.type === type);
        const result = []
        let nowTime = { day: 0, month: 0, year: 0 }
        let count = -1
        for (let bill of displayData) {
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
        this.save();
    },
    save() {
        window.localStorage.setItem("billList", JSON.stringify(this.data));
    }
}
export default billsModel

