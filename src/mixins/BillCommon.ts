import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import dayjs from 'dayjs'
@Component
export default class BillCommon extends Vue {
    fixTwo(n: number) {
        return Number(n.toFixed(2))
    }
    createId() {
        let id = Number(window.localStorage.getItem("billId") || '0') || 0
        id += 1
        window.localStorage.setItem('billId', id.toString())
        return id
    }
    dayOfMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate()
    }
    getHeaderTitle(oneMonthSum: MonthStats, selected: string, type: string) {
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
    }
    displayDate(date: { day: number, week: number, month: number, year: number }) {
        const oneWeek = ["日", "一", "二", "三", "四", "五", "六"];
        const weekText = (date.week || date.week === 0) && (`星期${oneWeek[date.week]}`);
        const text = dayjs(new Date(date.year, date.month, date.day)).format('MM/DD')
        return { text, weekText }
    }
}