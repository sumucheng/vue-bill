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
    display: (type: string) => Bill[]
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
        return this.data.filter(bill => bill.type === type);
    },
    add(bill) {
        this.data.push(bill);
        this.save();
    },
    save() {
        window.localStorage.setItem("billList", JSON.stringify(this.data));
    }
}
export default billsModel