interface Tag {
    type: string;
    name: string;
}
interface Bill {
    type: string;
    tag: string;
    note: string;
    count: number;
    time: number;
}
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
interface SortedBills {
    type: string,
    label: string,
    sum: number,
    data: Bill[]
}
interface Window {
    tags: Tag[],
    billList: Bill[]
}
