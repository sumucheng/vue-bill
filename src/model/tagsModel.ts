
type TagsModel = {
    data: Tag[]
    fetch: () => Tag[]
    display: (type: string) => Tag[]
    add: (tag: Tag) => 'success' | '该标签已存在'
    update: (tag: Tag, newName: string) => 'success' | '标签名重复'
    delete: (tag: Tag) => 'success' | '该标签不可删除'
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
    update(tag, newName) {
        if (tag.name === newName) return 'success'
        if (this.data.find(tag => tag.name === newName)) {
            return "标签名重复"
        }
        tag!.name = newName;
        this.save()
        return "success"
    },
    delete(tag) {
        const name = tag.name
        if (name === '一般' || name === '工资') return '该标签不可删除'
        const index = this.data.findIndex(tag => tag.name === name);
        this.data.splice(index, 1);
        this.save()
        return "success"
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