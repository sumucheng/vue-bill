const model = {
    state: {
        billList() {
            return JSON.parse(window.localStorage.getItem("billList") || "[]") as Bill[]
        },
        tags() {
            return JSON.parse(window.localStorage.getItem("tags") || "[]") as Tag[]
        }
    },
    save: {
        billList(data: Bill[]) {
            window.localStorage.setItem("billList", JSON.stringify(data));
        },
        tags(data: Tag[]) {
            window.localStorage.setItem("tags", JSON.stringify(data));
        }
    }
}
export default model