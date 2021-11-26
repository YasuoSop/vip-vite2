import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/introduce'
    },
    //产品介绍页
    {
        path: '/introduce',
        component: () =>
            import ('@/pages/introduce/introduce.vue'),
        meta: {
            title: '药智数据企业版 - 智能决策，洞见未来'
        }
    },
    //产品介绍页移动
    {
        path: '/introducemobile',
        component: () =>
            import ('@/pages/introduce/introducemobile.vue'),
        meta: {
            title: '药智数据企业版 - 智能决策，洞见未来'
        }
    },
    // 无权限全屏页
    {
        path: '/no-permission',
        component: () =>
            import ('@/pages/permission/no-permission.vue')
    },
    // 医院销售数据放大测试版无权限全屏页
    {
        path: '/yyxs-large-no-permission',
        component: () =>
            import ('@/pages/permission/yyxs-no-permission.vue')
    },
    // vip文献 vipdetail
    {
        path: '/literature',
        component: () =>
            import ('@/pages/vipwenxian/base.vue'),
        meta: {
            title: '文献'
        }
    },
    {
        path: '/literature/detail/:id',
        component: () =>
            import ('@/pages/vipwenxian/lists/detail.vue'),
        meta: {
            title: '文献'
        }
    },
    // 首页
    {
        path: '/home',
        component: () =>
            import ('@/pages/home/home.vue')
    },

    // 登录注册页
    {
        path: '/login',
        component: () =>
            import ('@/pages/login/login.vue')
    },

    //版本更新日志
    {
        path: '/updatelog',
        component: () =>
            import ('@/pages/updatelog/list.vue'),
        meta: {
            title: '更新日志'
        }
    },
    //客户服务页
    {
        path: '/service',
        component: () =>
            import ('@/pages/service/service.vue'),
        meta: {
            title: '客服中心'
        }
    },
    // 会员中心
    {
        path: '/usercenter',
        redirect: '/usercenter/message',
        component: () =>
            import ('@/pages/usercenter/base.vue'),
        children: [
            // 1、消息通知
            {
                path: '/usercenter/message',
                component: () =>
                    import ('@/pages/usercenter/message/base.vue'),
                meta: {
                    title: '消息通知'
                },
            },
            // 通知详情
            {
                path: '/usercenter/message/:id',
                component: () =>
                    import ('@/pages/usercenter/message/detail.vue'),
                meta: {
                    title: '消息通知'
                },
            },
            // 2、订阅管理
            {
                path: '/usercenter/take',
                redirect: '/usercenter/take/dynamic',
                component: () =>
                    import ('@/pages/usercenter/take/base.vue'),
            },
            // 订阅动态
            {
                path: '/usercenter/take/dynamic',
                component: () =>
                    import ('@/pages/usercenter/take/detail/dynamic.vue'),
                meta: {
                    title: '订阅动态'
                },
            },
            {
                path: '/usercenter/take/dynamic/slh/:id',
                component: () =>
                    import ('@/pages/usercenter/take/include/slh.vue'),
                meta: {
                    title: '订阅动态'
                },
            },
            {
                path: '/usercenter/take/dynamic/other/:id',
                component: () =>
                    import ('@/pages/usercenter/take/include/other.vue'),
                meta: {
                    title: '订阅动态'
                },
            },
            {
                path: '/usercenter/take/condition',
                component: () =>
                    import ('@/pages/usercenter/take/detail/condition.vue'),
                meta: {
                    title: '订阅动态'
                },
            },
            {
                path: '/usercenter/take/new',
                name: 'usercenter_take_new',
                component: () =>
                    import ('@/pages/usercenter/take/detail/new.vue'),
                meta: {
                    title: '订阅动态'
                },
            },
            // 3、收藏管理
            {
                path: '/usercenter/collect',
                redirect: '/usercenter/collect/database',
                component: () =>
                    import ('@/pages/usercenter/collect/base.vue'),
                meta: {
                    title: '收藏管理'
                },
            },
            {
                path: '/usercenter/collect/database',
                component: () =>
                    import ('@/pages/usercenter/collect/cl-database.vue'),
                meta: {
                    title: '收藏管理'
                },
            },
            {
                path: '/usercenter/collect/page',
                component: () =>
                    import ('@/pages/usercenter/collect/cl-page.vue'),
                meta: {
                    title: '收藏管理'
                },
            },
            {
                path: '/usercenter/collect/company',
                component: () =>
                    import ('@/pages/usercenter/collect/cl-company.vue'),
                meta: {
                    title: '收藏管理'
                },
            },
            // 4、搜索记录
            {
                path: '/usercenter/history',
                redirect: '/usercenter/history/saved',
                component: () =>
                    import ('@/pages/usercenter/history/base.vue'),
                meta: {
                    title: '搜索记录'
                },
            },
            {
                path: '/usercenter/history/saved',
                component: () =>
                    import ('@/pages/usercenter/history/hs-saved.vue'),
                meta: {
                    title: '搜索记录'
                },
            },
            {
                path: '/usercenter/suggest',
                component: () =>
                    import ('@/pages/usercenter/suggest/base.vue'),
                meta: {
                    title: '建议反馈'
                },
            },
            {
                path: '/usercenter/suggest/:id',
                component: () =>
                    import ('@/pages/usercenter/suggest/detail.vue'),
                meta: {
                    title: '建议反馈'
                },
            },
            // 6、账号管理
            {
                path: '/usercenter/account',
                component: () =>
                    import ('@/pages/usercenter/account/base.vue'),
                meta: {
                    title: '账号管理'
                },
            }
        ]
    },

    // 搜索页
    {
        path: '/search',
        component: () =>
            import ('@/pages/search/search.vue'),
        meta: {
            title: '综合搜索结果'
        },
    },

    // 智能分析系统
    {
        path: '/intelligent',
        component: () =>
            import ('@/pages/intelligent/intelligent.vue'),
        meta: {
            title: '智能分析系统'
        },
    },

    // 情报系统
    {
        path: '/information',
        component: () =>
            import ('@/pages/information/information.vue'),
        meta: {
            title: '情报系统'
        },
    },

    // 注册数据库
    {
        path: '/zhuce',
        redirect: '/zhuce/list',
        component: () =>
            import ('@/pages/zhuce/zhuce.vue'),
        name: 'database_zhuce_index',
        children: [{
                path: '/zhuce/list',
                component: () =>
                    import ('@/pages/zhuce/list.vue'),
                name: 'database_zhuce',
            },
            {
                path: '/zhuce/analy',
                component: () =>
                    import ('@/pages/zhuce/analy.vue'),
                name: 'database_zhuce_analy',
            }
        ]
    },
    // 注册数据库 - 详情页(不能放到/zhuce的children内)
    {
        path: '/zhuce/:id',
        component: () =>
            import ('@/pages/zhuce/detail/detail.vue'),
    },

    // 中国临床数据库
    {
        path: '/linchuangshiyan',
        redirect: '/linchuangshiyan/list',
        component: () =>
            import ('@/pages/linchuangshiyan/base.vue'),
        name: 'database_linchuangshiyan_index',
        children: [{
                path: '/linchuangshiyan/list',
                component: () =>
                    import ('@/pages/linchuangshiyan/list.vue'),
                name: 'database_linchuangshiyan',
            },
            {
                path: '/linchuangshiyan/analy',
                component: () =>
                    import ('@/pages/linchuangshiyan/analy.vue'),
                name: 'database_linchuangshiyan_analy',
            }
        ]
    },
    // 中国临床数据库 - 详情页
    {
        path: '/linchuangshiyan/:id',
        component: () =>
            import ('@/pages/linchuangshiyan/detail/detail.vue'),
    },
    // 药物报告 - 列表页
    {
        path: '/report',
        component: () =>
            import ('@/pages/drugreport/base.vue'),
        name: 'database_report',
    },
    // 药物报告 - 详情页
    {
        path: '/report/:id',
        component: () =>
            import ('@/pages/drugreport/detail/base.vue'),
    },

    // 企业报告 - 列表页
    {
        path: '/company',
        component: () =>
            import ('@/pages/companyreport/base.vue'),
        name: 'database_company',
    },
    // 企业报告 - 详情页
    {
        path: '/company/:id',
        component: () =>
            import ('@/pages/companyreport/detail/base.vue'),
    },

    // 审评文档 - 列表页
    {
        path: '/doc',
        component: () =>
            import ('@/pages/doc/base.vue'),
        name: 'database_doc',
    },
    // 审评文档 - 详情页
    {
        path: '/doc/:id',
        component: () =>
            import ('@/pages/doc/detail/detail.vue'),
    },

    // 审评文档 - 列表页
    {
        path: '/dae',
        component: () =>
            import ('@/pages/dae/base.vue'),
        name: 'database_dae',
    },
    // 审评文档 - 详情页
    {
        path: '/dae/:id',
        component: () =>
            import ('@/pages/dae/detail/detail.vue'),
    },

    // 上市药品
    // 上市药品 - 中国
    {
        path: '/cfdadrug',
        component: () =>
            import ('@/pages/cfdadrug/china/cfdadrug.vue'),
        name: 'database_cfdadrug',
        redirect: '/cfdadrug/list',
        children: [{
                path: 'list',
                component: () =>
                    import ('@/pages/cfdadrug/china/list.vue')
            },
            {
                path: 'analy',
                component: () =>
                    import ('@/pages/cfdadrug/china/analy.vue')
            }
        ]
    },
    // 上市药品 - 中国国产的详情
    {
        path: '/cfdadrug/detail/:id',
        component: () =>
            import ('@/pages/cfdadrug/china/detail/chinaDetail.vue')

    },
    // 上市药品 - 中国进口详情
    {
        path: '/cfdadrug/jkdetail/:id',
        component: () =>
            import ('@/pages/cfdadrug/china/detail/importDetail.vue')
    },
    // 上市药品 - 美国
    {
        path: '/fdadrug',
        redirect: '/fdadrugnew/list',
        component: () =>
            import ('@/pages/cfdadrug/america/fdadrug.vue'),
        name: 'database_fdadrug'
    },
    // 上市药品- 美国复杂详情页面
    {
        path: '/fdadrug/:id',
        component: () =>
            import ('@/pages/cfdadrug/america/detail/detail.vue')
    },
    // 上市药品 - 欧盟
    {
        path: '/epyp',
        component: () =>
            import ('@/pages/cfdadrug/europe/epyp.vue'),
        name: 'database_epyp',
    },
    //上市药品 - 欧盟ema的详情
    {
        path: '/epyp/emadetail/:id',
        component: () =>
            import ('@/pages/cfdadrug/europe/detail/emadetail.vue')
    },
    //上市药品 - 欧盟hma的详情
    {
        path: '/epyp/hmadetail/:id',
        component: () =>
            import ('@/pages/cfdadrug/europe/detail/hmadetail.vue')
    },
    // 上市药品 - 日本
    {
        path: '/pmda',
        component: () =>
            import ('@/pages/cfdadrug/japan/pmda.vue'),
        name: 'database_pmda',
    },
    {
        path: '/pmda/:id',
        component: () =>
            import ('@/pages/cfdadrug/japan/detail/detail.vue'),
    },
    // // 说明书
    // // 说明书 - 中国药品
    {
        path: '/instruct',
        component: () =>
            import ('@/pages/instruct/china/base.vue'),
        name: 'database_instruct',
    },
    {
        path: '/instruct/:id',
        name: 'ChinaShuomingshuDetail1',
        component: () =>
            import ('@/pages/instruct/china/detail/detail.vue'),
    },
    // 说明书 - 美国药品
    {
        path: '/fdalabel',
        component: () =>
            import ('@/pages/instruct/america/base.vue'),
        name: 'database_fdalabel',
    },
    // 说明书 - 日本药品
    {
        path: '/jp_shuomingshu',
        component: () =>
            import ('@/pages/instruct/japan/base.vue'),
        name: 'database_jp_shuomingshu',
    },
    // 说明书 - 超说明药品
    {
        path: '/unlabeleduse',
        component: () =>
            import ('@/pages/instruct/unlabeleduse/base.vue'),
        name: 'database_unlabeleduse',
    },
    {
        path: '/unlabeleduse/:id',
        component: () =>
            import ('@/pages/instruct/unlabeleduse/detail/detail.vue'),
    },

    // 药品中标数据库
    {
        path: '/yaopinzhongbiao',
        redirect: '/yaopinzhongbiao/list',
        component: () =>
            import ('@/pages/yaopinzhongbiao/base.vue'),
        name: 'database_yaopinzhongbiao_index',
        children: [{
                path: '/yaopinzhongbiao/list',
                component: () =>
                    import ('@/pages/yaopinzhongbiao/list.vue'),
                name: 'database_yaopinzhongbiao',
            },
            {
                path: '/yaopinzhongbiao/analy',
                component: () =>
                    import ('@/pages/yaopinzhongbiao/analy.vue'),
                name: 'database_yaopinzhongbiao_analy',
            }
        ]
    },

    // 带量采购数据库
    {
        path: '/dailiangcaigou',
        redirect: '/dailiangcaigou/list',
        component: () =>
            import ('@/pages/dailiangcaigou/base.vue'),
        name: 'database_dailiangcaigou_index',
        children: [{
            path: '/dailiangcaigou/list',
            component: () =>
                import ('@/pages/dailiangcaigou/list.vue'),
            name: 'database_dailiangcaigou',
        }]
    },

    // 带量采购精准分析路由
    {
        path: '/dailiangcaigou/analysis',
        component: () =>
            import ('@/pages/dailiangcaigou/analysis.vue'),
        name: 'database_dailiangcaigou_analysis',
    },

    // 带量采购数据库 - 详情页(不能放到/dailiangcaigou的children内)
    {
        path: '/dailiangcaigou/detail',
        component: () =>
            import ('@/pages/dailiangcaigou/detail/detail.vue'),
        name: 'database_dailiangcaigou_detail',
    },
    // 生物制品数据库
    {
        path: '/pqf',
        redirect: '/pqf/list',
        component: () =>
            import ('@/pages/shengwuzhipin/base.vue'),
        name: 'database_pqf_index',
        children: [{
                path: '/pqf/list',
                component: () =>
                    import ('@/pages/shengwuzhipin/list.vue'),
                name: 'database_pqf',
            },
            {
                path: '/pqf/analy',
                component: () =>
                    import ('@/pages/shengwuzhipin/analy.vue'),
                name: 'database_pqf_analy',
            }
        ]
    },
    //生物制品数据库的详情页
    {
        path: '/pqf/:id',
        component: () =>
            import ('@/pages/shengwuzhipin/detail/detail.vue'),
    },

    // 投融资数据库
    {
        path: '/tourongzi',
        redirect: '/tourongzi/list',
        component: () =>
            import ('@/pages/tourongzi/base.vue'),
        name: 'database_tourongzi_index',
        children: [{
                path: '/tourongzi/list',
                component: () =>
                    import ('@/pages/tourongzi/list.vue'),
                name: 'database_tourongzi',
            },
            {
                path: '/tourongzi/analy',
                component: () =>
                    import ('@/pages/tourongzi/analy.vue'),
                name: 'database_tourongzi_analy',
            }
        ]
    },
    //投融资数据库 - 详情页面
    {
        path: '/tourongzi/:id',
        component: () =>
            import ('@/pages/tourongzi/detail/detail.vue')
    },

    //医疗器械上市数据库 - 器械标准
    {
        path: '/qxss',
        component: () =>
            import ('@/pages/qixieshangshi/qxss/qxss.vue'),
        name: 'database_qxss',
    },
    //医疗器械上市数据库 - 器械标准- 国产的详情
    {
        path: '/qxss/:id',
        component: () =>
            import ('@/pages/qixieshangshi/qxss/detail/qxssdetail.vue')
    },

    //医疗器械上市数据库 - 器械备案
    {
        path: '/qxba',
        component: () =>
            import ('@/pages/qixieshangshi/qxba/qxba.vue'),
        name: 'database_qxba',
    },
    //医疗器械上市数据库 - 器械备案详情页面
    {
        path: '/qxba/:id',
        component: () =>
            import ('@/pages/qixieshangshi/qxba/detail/qxbadetail.vue')
    },

    // 药品销售数据库
    {
        path: '/ypxs',
        redirect: '/ypxs/list',
        component: () =>
            import ('@/pages/yaopinxiaoshou/base.vue'),
        name: 'database_ypxs_index',
        children: [{
                path: '/ypxs/list',
                component: () =>
                    import ('@/pages/yaopinxiaoshou/list.vue'),
                name: 'database_ypxs',
            },
            {
                path: '/ypxs/analy',
                component: () =>
                    import ('@/pages/yaopinxiaoshou/analy.vue'),
                name: 'database_ypxs_analy',
            }
        ]
    },
    // 药品销售数据库 - 详情页(不能放到/ypxs的children内)
    {
        path: '/ypxs/:id',
        component: () =>
            import ('@/pages/yaopinxiaoshou/detail/detail.vue')
    },
    // 美国橙皮书
    {
        path: '/fdaproducts',
        component: () =>
            import ('@/pages/orange/america/base.vue'),
        name: 'database_fdaproducts',
    },
    // 美国橙皮书 - 详情页
    {
        path: '/fdaproducts/:id',
        component: () =>
            import ('@/pages/orange/america/detail/detail.vue')
    },
    // 中国橙皮书
    {
        path: '/orangebook',
        component: () =>
            import ('@/pages/orange/china/base.vue'),
        name: 'database_orangebook',
    },
    // 中国橙皮书 - 详情页
    {
        path: '/orangebook/:id',
        component: () =>
            import ('@/pages/orange/china/detail/detail.vue')
    },

    // 药物合成数据库 - 原料药
    {
        path: '/ywfzk',
        component: () =>
            import ('@/pages/yaowuhecheng/ywfzk/base.vue'),
        name: 'database_ywfzk',
    },
    // 药物合成数据库 - 原料药 - 详情
    {
        path: '/ywfzk/:id',
        component: () =>
            import ('@/pages/yaowuhecheng/ywfzk/detail/detail.vue')
    },
    // 药物合成数据库 - 中间体
    {
        path: '/fzk1',
        component: () =>
            import ('@/pages/yaowuhecheng/fzk1/base.vue'),
        name: 'database_fzk1',
    },
    // 药物合成数据库 - 中间体 - 详情
    {
        path: '/fzk1/:id',
        component: () =>
            import ('@/pages/yaowuhecheng/fzk1/detail/detail.vue')
    },
    // 器械注册
    {
        path: '/qxzhuce',
        component: () =>
            import ('@/pages/qxzhuce/base.vue'),
        name: 'database_qxzhuce',
    },
    {
        path: '/qxzhuce/:id',
        component: () =>
            import ('@/pages/qxzhuce/detail/detail.vue'),
    },

    /* 帮助中心 */
    {
        path: '/help',
        redirect: '/help/list',
        component: () =>
            import ('@/pages/help/help.vue'),
        meta: {
            title: '帮助中心'
        },
        children: [{
            path: '/help/list',
            component: () =>
                import ('@/pages/help/list.vue'),
            meta: {
                title: '帮助中心'
            },
        }, ]
    },
    /* 帮助中心 */
    // 帮助中心详情页
    {
        path: '/help/detail/:id',
        component: () =>
            import ('@/pages/help/detail/detail.vue'),
        meta: {
            title: '帮助中心'
        },
    },
    // 一致性评价进度
    {
        path: '/yzxjd',
        component: () =>
            import ('@/pages/yzxpj/yzxpj.vue'),
    },
    //仿制药一致性评价
    {
        path: '/yzx',
        redirect: '/yzx/pjdt',
        component: () =>
            import ('@/pages/fzyyzx/fzyyzx.vue'),
        name: 'database_yzx_index',
        children: [{
                path: '/yzx/pjdt',
                component: () =>
                    import ('@/pages/fzyyzx/pjdt.vue'),
                name: 'database_fzyyzx_pjdt',
            },
            {
                path: '/yzx/pjjd',
                component: () =>
                    import ('@/pages/fzyyzx/pjjd.vue'),
                name: 'database_fzyyzx_pjjd',
            },
            {
                path: '/yzx/pjzc',
                component: () =>
                    import ('@/pages/fzyyzx/pjzc.vue'),
                name: 'database_fzyyzx_pjzc',
            },
        ]
    },
    {
        path: '/yzx/detail',
        component: () =>
            import ('@/pages/fzyyzx/detail/detail.vue'),
        name: 'database_fzyyzx_detail',
    },

    // 医院销售数据库
    {
        path: '/yyxs',
        redirect: '/yyxs/list',
        component: () =>
            import ('@/pages/yiyuanxiaoshou/base.vue'),
        name: 'database_yyxs_index',
        children: [{
                path: '/yyxs/list',
                component: () =>
                    import ('@/pages/yiyuanxiaoshou/list.vue'),
                name: 'database_yyxs',
            },
            {
                path: '/yyxs/analy',
                component: () =>
                    import ('@/pages/yiyuanxiaoshou/analy.vue'),
                name: 'database_yyxs_analy',
            }
        ]
    },
    // 中药处方数据库
    {
        path: '/chufang',
        redirect: '/chufang/list',
        component: () =>
            import ('@/pages/zcycf/base.vue'),
        name: 'database_chufang_index',
        children: [{
                path: '/chufang/list',
                component: () =>
                    import ('@/pages/zcycf/list.vue'),
                name: 'database_chufang',
            },
            {
                path: '/chufang/analy',
                component: () =>
                    import ('@/pages/zcycf/analy.vue'),
                name: 'database_chufang_analy',
            }
        ]
    },
    {
        path: '/chufang/:id',
        component: () =>
            import ('@/pages/zcycf/detail/detail.vue')
    },
    // 靶点数据库
    {
        path: '/targetdatas',
        redirect: '/targetdatas/list',
        component: () =>
            import ('@/pages/targetdatas/base.vue'),
        name: 'database_targetdatas_index',
        children: [{
            path: '/targetdatas/list',
            component: () =>
                import ('@/pages/targetdatas/list.vue'),
            name: 'database_targetdatas',
        }]
    },
    {
        path: '/targetdatas/:id',
        component: () =>
            import ('@/pages/targetdatas/detail/detail.vue')
    },
    // 新药数据库
    {
        path: '/newdrug',
        redirect: '/newdrug/list',
        component: () =>
            import ('@/pages/newdrug/base.vue'),
        name: 'database_newdrug_index',
        children: [{
            path: '/newdrug/list',
            component: () =>
                import ('@/pages/newdrug/list.vue'),
            name: 'database_newdrug',
        }]
    },
    {
        path: '/newdrug/:id',
        component: () =>
            import ('@/pages/newdrug/detail/detail.vue')
    },
    // 医院销售数据库
    {
        path: '/yyxsdata',
        component: () =>
            import ('@/pages/yyxsdata/base.vue'),
        name: 'database_yyxsdata_index',
        meta: {
            title: '医院销售数据库'
        }
    },
    // 美国上市数据库新
    {
        path: '/fdadrugnew',
        redirect: '/fdadrugnew/list',
        component: () =>
            import ('@/pages/fdadrugnew/base.vue'),
        name: 'database_fdadrugnew_index',
        children: [{
                path: '/fdadrugnew/list',
                component: () =>
                    import ('@/pages/fdadrugnew/list.vue'),
                name: 'database_fdadrugnew',
            },
            {
                path: '/fdadrugnew/analy',
                component: () =>
                    import ('@/pages/fdadrugnew/analy.vue'),
                name: 'database_fdadrugnew_analy',
            }
        ]
    },
    {
        path: '/fdadrugnew/:id',
        component: () =>
            import ('@/pages/fdadrugnew/detail/detail.vue'),
    },
    {
        path: '/fdadrugnew/:id/cber',
        component: () =>
            import ('@/pages/fdadrugnew/detail/detail-cber.vue'),
    },
    // 全球临床试验数据库(升级)
    {
        path: '/clinical',
        redirect: '/clinical/list',
        component: () =>
            import ('@/pages/clinical/base.vue'),
        name: 'database_clinical_index',
        children: [{
            path: '/clinical/list',
            component: () =>
                import ('@/pages/clinical/list.vue'),
            name: 'database_clinical',
        }]
    },
    {
        path: '/clinical/cate',
        redirect: '/clinical/cate',
        component: () =>
            import ('@/pages/clinical/cate.vue'),
        name: 'database_clinical_cate',
        children: [{
            path: '/clinical/cate',
            component: () =>
                import ('@/pages/clinical/catelist.vue'),
            name: 'database_clinical_catelist',
        }]
    },
    {
        path: '/clinical/:id',
        component: () =>
            import ('@/pages/clinical/detail/detail.vue')
    },

    // 药品不良反应检测信息分析预警系统
    {
        path: '/faers',
        redirect: '/faers/list',
        component: () =>
            import ('@/pages/faers/base.vue'),
        name: 'database_faers_index',
        children: [{
            path: '/faers/list',
            component: () =>
                import ('@/pages/faers/list.vue'),
            name: 'database_faers',
        }]
    },

    // 药品不良反应检测信息分析预警系统详情页
    {
        path: '/faers/:id',
        component: () =>
            import ('@/pages/faers/detail/detail.vue')
    },

    // 导航地图
    {
        path: '/nav',
        component: () =>
            import ('@/pages/nav/base.vue'),
        name: 'database_nav_index',
        meta: {
            title: '导航地图'
        }
    },

    /* 通用数据库组件 start */
    /* ！！！！！**注意**此区间的router配置放在本页的最末尾！！！！！ */
    {
        path: '/:dbname',
        component: () =>
            import ('@/pages/database/base.vue'),
    },
    // （通用）单表 - 详情页
    {
        path: '/:dbname/:id',
        component: () =>
            import ('@/pages/database/detail/detail.vue'),
    },
    /* 通用数据库组件 end */
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

export default router