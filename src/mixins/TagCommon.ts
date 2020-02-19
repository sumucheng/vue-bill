import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class TagCommon extends Vue {
    addTag(type: string) {
        const name = window.prompt("请输入标签名称（不超过四个字）");
        if (name && name != "") {
            this.$store.commit("createTag", { type: type, name: name });
        }
    }
}