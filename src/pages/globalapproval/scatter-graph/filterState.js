export default {
    data() {
        return {
            filter_loading: false,
            zwformCount: 0,
            infoObj: { zwform: "", zwformCount: 0 },
            keyword: "", //
            filter_condition: "",
            types: [],
            areas: [],
            selected_types: [],
            selected_areas: [],
            noSelected_areas: [],
            selected_typesArr: [],
            selected_areasArr: [],
            timer: null,
            searchObj: {}
        };
    },
    methods: {
        // 导出分散图
        async exportHandler() {
            this.isloading = true;
            let url = `/api/globalapproval/outdata`,
                filter_condition = "",
                zwform = "_and zwform=",
                use_source = " _and source=",
                useless_source = "";
            if (this.searchObj.keyword !== "") {
                url += `?cname_eq=${this.searchObj.keyword}`;
            }
            console.log(
                this.selected_types,
                this.selected_areas,
                this.noSelected_areas
            );
            if (this.selected_types.length > 0) {
                this.selected_types.forEach((item, i) => {
                    zwform += item + (i < this.selected_types.length - 1 ? "ღ" : "");
                });
                filter_condition += zwform;
            }
            if (this.selected_areas.length > 0) {
                this.selected_areas.forEach((item, i) => {
                    use_source +=
                        item +
                        (i <
                            this.selected_areasArr.filter(item => item.checked == 1).length - 1 ?
                            "ღ" :
                            "");
                });
                filter_condition += use_source;
            }
            if (this.noSelected_areas.length > 0) {
                this.noSelected_areas.forEach((item, i) => {
                    useless_source += ` _not source=${item}`;
                });
                filter_condition += useless_source;
            }
            this.filter_condition = filter_condition;
            if (filter_condition) {
                url += `&filter_condition=${this.filter_condition}`;
            }

            url += `&accesstoken=${GETCOOKIEFUN("accesstoken")}&outdata_action=cname`;
            console.log(url);
            await this.downloadFile(url);
            this.isloading = false;
        },
        checkedChange(e, idx, item) {
            this.$set(this.areas, idx, {...item, checked: e });
        },
        clearFiter() {
            let t = this.areas.map(item => {
                return {...item, checked: 0 };
            });
            let p = this.types.map(item => {
                return {...item, checked: false };
            });
            this.selected_areas = t;
            this.selected_types = p;
        },
        // 查询左侧条件筛选的数据项
        inputChange(e, types, areas) {
            this.keyword = e;
            this.filter_loading = true;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            let url = `/api/globalapproval/cnameSecondOption`,
                filter_condition = "",
                zwform = "_and zwform=",
                use_source = " _and source=",
                useless_source = "";
            if (e !== "") {
                url += `?cname_eq=${e}`;
            }

            if (types) {
                this.selected_typesArr = types;
                this.selected_types = types.filter(t => t.checked).map(s => s.value);

                if (this.selected_types.length > 0) {
                    this.selected_types.forEach((item, i) => {
                        zwform += item + (i < this.selected_types.length - 1 ? "ღ" : "");
                    });
                    filter_condition += zwform;
                }
            }
            if (areas) {
                // this.selected_areasArr = areas;
                let use_sourceArr = areas.filter(t => t.checked == 1).map(s => s.value),
                    useless_sourceArr = areas
                    .filter(t => t.checked == -1)
                    .map(s => s.value);
                this.selected_areas = use_sourceArr;
                this.noSelected_areas = useless_sourceArr;

                if (use_sourceArr.length > 0) {
                    use_sourceArr.forEach((item, i) => {
                        use_source += item + (i < use_sourceArr.length - 1 ? "ღ" : "");
                    });
                    filter_condition += use_source;
                }
                if (useless_sourceArr.length > 0) {
                    useless_sourceArr.forEach((item, i) => {
                        useless_source += ` _not source=${item}`;
                    });
                    filter_condition += useless_source;
                }
            }
            if (filter_condition) {
                this.filter_condition = filter_condition;
                url += `&filter_condition=${filter_condition}`;
            }
            this.timer = setTimeout(() => {
                Axios.get(url).then(res => {
                    if (res && res.data.code === 200) {
                        this.areas = [];
                        if (areas) {
                            res.data.data.source.forEach(t => (t.checked = 0));
                            res.data.data.source.forEach(t => {
                                if (this.selected_areas.length > 0) {
                                    this.selected_areas.forEach(item => {
                                        if (item === t.label) t.checked = 1;
                                    });
                                }
                                if (this.noSelected_areas.length > 0) {
                                    this.noSelected_areas.forEach(item => {
                                        if (item === t.label) t.checked = -1;
                                    });
                                }
                            });
                            this.areas = res.data.data.source.map(t => ({
                                label: t.label,
                                value: t.key,
                                nums: t.doc_count,
                                checked: t.checked
                            }));
                        } else {
                            this.areas = res.data.data.source.map(t => ({
                                label: t.label,
                                value: t.key,
                                nums: t.doc_count,
                                checked: 0
                            }));
                        }
                        if (types) {
                            if (this.selected_types.length > 0) {
                                this.types = res.data.data.zwform.map(t => ({
                                    label: t.label,
                                    value: t.key,
                                    nums: t.doc_count,
                                    checked: true
                                }));
                            } else {
                                this.types = res.data.data.zwform.map(t => ({
                                    label: t.label,
                                    value: t.key,
                                    nums: t.doc_count,
                                    checked: false
                                }));
                            }
                        } else {
                            this.types = res.data.data.zwform.map(t => ({
                                label: t.label,
                                value: t.key,
                                nums: t.doc_count,
                                checked: false
                            }));
                        }
                    }
                    this.filter_loading = false;
                    this.searchObj.keyword = this.keyword;
                    this.searchScatterGraph(this.searchObj.keyword);
                });
            }, 2000);
        },
        search(types, areas) {
            this.selected_types = types.filter(t => t.checked).map(s => s.value);
            this.selected_areas = areas.filter(t => t.checked == 1).map(s => s.value);
            let zwform = this.selected_types;
            let use_source = this.selected_areas;
            let useless_source = areas.filter(t => t.checked == -1).map(s => s.value);
            this.noSelected_areas = useless_source;
            // console.log({
            //     剂型: zwform,
            //     包含的来源: use_source,
            //     排除的来源: useless_source,
            //     cname: this.keyword
            // });
            this.$nextTick(() => {
                this.searchObj = {
                    zwform,
                    use_source,
                    useless_source,
                    keyword: this.keyword
                };
                this.selected_typesArr = types;
                this.selected_areasArr = areas;
            });
            // await this.searchScatterGraph();
        },
        // 查询分散图
        async searchScatterGraph(keyword) {
            this.isloading = true;
            let params = {
                accesstoken: GETCOOKIEFUN("accesstoken")
            };
            if (keyword != "") {
                params.cname_eq = keyword ? keyword : this.searchObj.keyword;
            }
            let filter_condition = "";
            if (this.searchObj.zwform && this.searchObj.zwform.length > 0) {
                let zwform = "_and zwform=";
                this.searchObj.zwform.forEach((item, i) => {
                    zwform += item + (i < this.searchObj.zwform.length - 1 ? "ღ" : "");
                });
                filter_condition += zwform;
            }

            let use_source = " _and source=",
                useless_source = "";
            this.searchObj.use_source = Array.from(
                new Set(this.searchObj.use_source)
            );
            this.searchObj.useless_source = Array.from(
                new Set(this.searchObj.useless_source)
            );

            if (this.searchObj.use_source && this.searchObj.use_source.length > 0) {
                this.searchObj.use_source.forEach((item, i) => {
                    use_source +=
                        item + (i < this.searchObj.use_source.length - 1 ? "ღ" : "");
                });
                filter_condition += use_source;
            }
            if (
                this.searchObj.useless_source &&
                this.searchObj.useless_source.length > 0
            ) {
                this.searchObj.useless_source.forEach((item, i) => {
                    useless_source += ` _not source=${item}`;
                });
                filter_condition += useless_source;
            }
            if (filter_condition) {
                this.filter_condition = filter_condition;
                params.filter_condition = filter_condition;
            }
            const res = await window
                .Axios({
                    method: "get",
                    url: "/api/globalapproval/cname",
                    params
                })
                .catch(err => {
                    this.zwformCount = 0;
                    this.scatterData = [];
                    this.infoObj.zwform = this.searchObj.keyword;
                    this.infoObj.zwformCount = this.zwformCount;
                    this.isloading = false;
                });

            if (res.data.code === 200 && res.data.data) {
                let data = res.data.data;
                this.zwformCount = res.data.data.zwformCount;
                this.scatterData = data.res;
                this.infoObj.zwform = this.searchObj.keyword;
                this.infoObj.zwformCount = this.zwformCount;
                this.isloading = false;
            } else {
                this.zwformCount = 0;
                this.scatterData = [];
                this.infoObj.zwform = this.searchObj.keyword;
                this.infoObj.zwformCount = this.zwformCount;
                this.isloading = false;
            }
        }
    }
};