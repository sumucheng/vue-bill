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
interface HeaderData {
    expend: number;
    income: number;
    rest: string;
    averageExpend: string;
    averageIncome: string;
}
interface Window {
    tags: Tag[],
    displayTags: Tag[],
    switchTags: (type: string) => Tag[],
    createTag: (type: string, name: string) => void,
    deleteTag: (tag: Tag) => true | undefined,
    editTag: (tag: Tag, newName: string) => true | undefined,
    find: (name: string) => Tag | undefined,
    billList: Bill[],
    createBill: (bill: Bill) => void
}
