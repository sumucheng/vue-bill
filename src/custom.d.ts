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
interface MonthStats {
    date: Date;
    expend: number;
    income: number;
    rest: number;
    averageExpend: number;
    averageIncome: number;
}
interface BillsGroupByDay {
    [key: string]: {
        data: Bill[],
        date: { day: number, week: number, month: number, year: number },
        sum: { expend: number, income: number }
    }
}
interface BillsGroupByTag {
    [key: string]: oneTagBills
}
interface oneTagBills {
    type: string,
    tag: string,
    sum: number,
    data: Bill[]
}
interface headerTitle {
    text: string; count: number | string
}
interface Budget {
    sum: number,
    rest: number,
    dailyCanUse: number,
}