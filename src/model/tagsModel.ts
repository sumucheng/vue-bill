type Tag = {
    type: string;
    name: string;
};
type TagsModel = {
    data: Tag[]
    fetch: () => Tag[]
    display: (type: string) => Tag[]
    add: (tag: Tag) => 'success' | '该标签已存在'
    update: (oldName: string, newName: string) => 'success' | '标签名重复'
    delete: (name: string) => void
    save: () => void
    init: () => Tag[]
}
const tagsModel: TagsModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("tags") || "[]")
        if (this.data.length === 0) this.data = this.init()
        return this.data
    },
    display(type) {
        return this.data.filter(tag => tag.type === type);
    },
    add(tag) {
        tag.name = tag.name.substr(0, 4);
        if (this.data.find(item => item.name === tag.name)) {
            return '该标签已存在';
        }
        this.data.push(tag);
        this.save();
        return 'success'
    },
    update(oldName, newName) {
        const tag = this.data.find(tag => tag.name === oldName)
        if (this.data.find(tag => tag.name === newName)) {
            return "标签名重复"
        }
        tag!.name = newName;
        this.save()
        return "success"
    },
    delete(name) {
        const index = this.data.findIndex(tag => tag.name === name);
        this.data.splice(index, 1);
        this.save()
    },
    save() {
        window.localStorage.setItem("tags", JSON.stringify(this.data));
    },
    init() {
        return [
            { type: "expend", name: "一般" },
            { type: "expend", name: "餐饮" },
            { type: "expend", name: "娱乐" },
            { type: "expend", name: "服饰" },
            { type: "expend", name: "交通" },
            { type: "expend", name: "通讯" },
            { type: "income", name: "工资" },
            { type: "income", name: "理财" },
            { type: "income", name: "礼金" },
            { type: "income", name: "其他" }
        ];
    }
}
export default tagsModel