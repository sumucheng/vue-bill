type Tag = {
    type: string;
    name: string;
};
type TagsModel = {
    data: Tag[]
    fetch: () => Tag[]
    add: (tag: Tag) => 'success' | '该标签已存在'
    update: (oldName: string, newName: string) => 'success' | '标签名重复'
    delete: (name: string) => void
    save: () => void
}
const tagsModel: TagsModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("tags") || "[]")
        return this.data
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
    }
}
export default tagsModel