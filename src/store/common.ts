const billStore = {
    dayOfMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate()
    },
    initMonthSum(year?: number, month?: number) {
        return {
            year: year ? year : new Date().getFullYear(),
            month: month ? month : new Date().getMonth(),
            income: 0,
            expend: 0,
            rest: 0,
            averageExpend: 0,
            averageIncome: 0
        }
    },
    headerTitle(oneMonthSum: MonthSum | undefined, selected: string, type: string) {
        if (selected === 'detail') {
            const e = oneMonthSum ? oneMonthSum.expend : 0;
            const i = oneMonthSum ? oneMonthSum.income : 0;
            return [
                { text: "支出", count: e },
                { text: "收入", count: i }
            ];
        }
        else {
            const x = type === "expend" ? "支出" : "收入";
            const y = oneMonthSum ? (type === "expend" ? oneMonthSum.expend : oneMonthSum.income) : 0;
            const averageText = type === "expend" ? "平均每日支出" : "平均每日收入";
            const ave = oneMonthSum ? type === "expend" ? oneMonthSum.averageExpend : oneMonthSum.averageIncome : 0;
            return [
                { text: x, count: y },
                { text: averageText, count: ave }
            ];
        }
    },
    displayDate(date: number | { day?: number; week?: number; month?: number; year?: number }) {
        if (typeof date === 'number') {
            const d = new Date(date)
            date = {
                day: d.getDate(),
                week: d.getDay(),
                month: d.getMonth()
            }
        }
        const oneWeek = ["日", "一", "二", "三", "四", "五", "六"];
        const dateText = date.day && (date.day < 10 ? "0" + date.day : date.day);
        const monthText =
            date.month && (date.month < 9 ? "0" + (date.month + 1) : date.month + 1);
        const weekText = (date.week || date.week === 0) && (`星期${oneWeek[date.week]}`);
        return { dateText, weekText, monthText }
    },
    fixTwo(n: number) {
        return Number(n.toFixed(2))
    }
}

export default billStore