const model = {
    state: {
        billList() {
            return JSON.parse(window.localStorage.getItem("billList") || "[]") as Bill[]
        },
        tags() {
            return JSON.parse(window.localStorage.getItem("tags") || "[]") as Tag[]
        }
    },
    update: {
        billList() {

        },
        tags(oldName: string, newName: string) {
            const tags = model.state.tags()
            const tag = tags.find(tag => tag.name === oldName)
            if (tags.find(tag => tag.name === newName)) {
                window.alert("标签名重复");
            }
            else if (tags) {
                tag!.name = newName;
                model.save.tags(tags)
            }
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