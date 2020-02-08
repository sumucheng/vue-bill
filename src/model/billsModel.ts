type Bill = {
    type: string;
    tag: string;
    note: string;
    count: string;
    time: number;
};
type BillsModel = {
    data: Bill[]
    fetch: () => Bill[]
    display: (type: string, period: string) => Bill[]
    add: (bill: Bill) => void
    save: () => void
}
const billsModel: BillsModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("billList") || "[]")
        return this.data
    },
    display(type, period) {
        const now = new Date()
        const today = { day: now.getDate(), week: now.getDay(), month: now.getMonth(), year: now.getFullYear() }
        function filter(billTime: number) {
            const t = new Date(billTime)
            const time = { day: t.getDate(), week: t.getDay(), month: t.getMonth(), year: t.getFullYear() }
            if (period === 'day') {
                return time.day === today.day && time.month === today.month && time.year === today.year
            }
            if (period === 'week') {
                const msPerDay = 86400000;
                const todayStart = new Date(today.year, today.month, today.day, 0, 0, 0, 0).valueOf()
                const min = new Date(todayStart - msPerDay * (today.week - 1)).valueOf()
                const max = new Date(min + msPerDay * 7).valueOf()
                return billTime >= min && billTime <= max
            }
            if (period == 'month') {
                return time.month === today.month && time.year === today.year
            }
        }
        return this.data.filter(bill => bill.type === type && filter(bill.time));
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

