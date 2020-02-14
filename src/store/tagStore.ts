const tagStore = {
    tags: [] as Tag[],
    fetchTags() {
        this.tags = JSON.parse(window.localStorage.getItem("tags") || "[]")
        if (this.tags.length === 0) this.tags = this.initTags()
        return this.tags
    },
    saveTags() {
        window.localStorage.setItem("tags", JSON.stringify(this.tags));
    },
    filterTags(type: string, data?: Tag[]) {
        const tags = data ? data : this.tags
        return tags.filter(i => i.type === type);
    },
    createTag(type: string, name: string) {
        name = name.substr(0, 4);
        if (this.tags.find(i => i.name === name)) {
            window.alert('该标签已存在')
        }
        else {
            this.tags.push({ type: type, name: name })
            this.saveTags();
        }
    },
    deleteTag(tag: Tag) {
        const name = tag.name
        if (name === '一般' || name === '工资') window.alert('该标签不可删除')
        else {
            const index = this.tags.findIndex(i => i.name === name);
            this.tags.splice(index, 1);
            this.saveTags()
            return true
        }
    },
    editTag(tag: Tag, newName: string) {
        if (tag.name === newName) return true
        if (this.tags.find(tag => tag.name === newName)) {
            window.alert("标签名重复")
        }
        else {
            tag.name = newName,
                this.saveTags()
            return true
        }
    },
    findTag(name: string) {
        return this.tags.find(tag => tag.name === name)
    },
    initTags() {
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

tagStore.fetchTags()

export default tagStore