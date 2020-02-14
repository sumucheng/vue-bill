const billStore = {
    bills: [] as Bill[],
    monthSum: [] as MonthSum[],
    fetchBills() {
        this.bills = JSON.parse(window.localStorage.getItem("billList") || "[]")
        this.monthSum = JSON.parse(window.localStorage.getItem("monthSum") || "[]")
    },
    saveBills() {
        window.localStorage.setItem("billList", JSON.stringify(this.bills));
        window.localStorage.setItem("monthSum", JSON.stringify(this.monthSum));
    },
    test(now: Date) {
        const result: SortedBills[] = []
        const oneMonthBills = this.oneMonthBills(now)
        const tagList: string[] = []
        for (let bill of oneMonthBills) {
            if (!tagList.find((i: string) => i === bill.tag)) {
                tagList.push(bill.tag)
            }
        }
        const OneTagBills: { tag: string, bills: Bill[] }[] = []
        for (let tag of tagList) {
            OneTagBills.push({ tag: tag, bills: oneMonthBills.filter(bill => bill.tag === tag) })
        }
        for (let oneTag of OneTagBills) {
            let sum = 0;
            for (let bill of oneTag.bills) {
                sum = this.fixTwo(sum + bill.count)
            }
            result.push({
                type: oneTag.bills[0].type,
                label: oneTag.tag,
                sum: sum,
                data: oneTag.bills
            })
        }
    },
    OneTagBills(now: Date) {
        const OneTagBills: SortedBills[] = []
        const oneMonthBills = this.oneMonthBills(now)
        for (let bill of oneMonthBills) {
            let exist = false
            for (let item of OneTagBills) {
                if (item.label === bill.tag) {
                    item.data.push(bill)
                    item.sum = this.fixTwo(item.sum + bill.count)
                    exist = true
                    break;
                }
            }
            if (!exist)
                OneTagBills.push({
                    type: bill.type,
                    label: bill.tag,
                    sum: this.fixTwo(bill.count),
                    data: [bill]
                })
        }
        OneTagBills.sort((a, b) => b.sum - a.sum)
        return OneTagBills
    },
    oneDayBills(now: Date) {
        const oneDayBills = []
        let nowTime = { day: 0, month: 0, year: 0 }
        let count = -1
        const oneMonthBills = this.oneMonthBills(now)
        for (let bill of oneMonthBills) {
            const t = new Date(bill.time)
            const thisBill = { day: t.getDate(), week: t.getDay(), month: t.getMonth(), year: t.getFullYear() }
            if (thisBill.day === nowTime.day && thisBill.month === nowTime.month && thisBill.year === nowTime.year) {
                oneDayBills[count].data.push(bill)
                if (bill.type === 'expend') oneDayBills[count].sum['expend'] = this.fixTwo(oneDayBills[count].sum['expend'] + bill.count)
                else oneDayBills[count].sum['income'] = this.fixTwo(oneDayBills[count].sum['income'] + bill.count)
            }
            else {
                const sum = bill.type === 'expend' ? { expend: bill.count, income: 0 } : { expend: 0, income: bill.count }
                oneDayBills.push({ date: thisBill, data: [bill], sum: sum })
                nowTime = { day: thisBill.day, month: thisBill.month, year: thisBill.year }
                count += 1
            }
        }
        return oneDayBills;
    },
    createBill(newBill: Bill) {
        const bill = JSON.parse(JSON.stringify(newBill));
        this.bills.unshift(bill);
        const yy = new Date(bill.time).getFullYear()
        const mm = new Date(bill.time).getMonth()
        const last = this.monthSum[this.monthSum.length - 1]
        if (last && last.year === yy && last.month === mm) {
            if (bill.type === 'expend') last.expend = this.fixTwo(last.expend + bill.count)
            else last.income = this.fixTwo(last.income + bill.count)
        }
        else {
            if (bill.type === 'expend') this.monthSum.push({ year: yy, month: mm, expend: this.fixTwo(bill.count), income: 0 })
            else this.monthSum.push({ year: yy, month: mm, income: this.fixTwo(bill.count), expend: 0 })
        }
        this.saveBills();
    },
    oneMonthBills(now: Date) {
        return this.bills.filter(bill => {
            const time = new Date(bill.time)
            return time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()
        })
    },
    fixTwo(n: number) {
        return Number(n.toFixed(2))
    }
}

billStore.fetchBills()

export default billStore