interface Tag {
    type: string;
    name: string;
}
interface Bill {
    id: number;
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
    rest: number;
    averageExpend: number;
    averageIncome: number;
}
interface oneDayBills {
    date: { day: number, week: number, month: number, year: number },
    sum: { expend: number, income: number }
    data: Bill[]
}
interface oneTagBills {
    type: string,
    label: string,
    sum: number,
    data: Bill[]
}
