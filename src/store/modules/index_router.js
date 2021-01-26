const router={
    data:[
        {
            alwaysShow:true,
            children:[
                {
                    component: "users/users/index",
                    meta: {title: "用户列表", icon: "peoples"},
                    name: "Users",
                    path: "users",
                    menuId:10
                },
                {
                    component: "users/order/index",
                    meta: {title: "订单", icon: "clipboard"},
                    name: "Order",
                    path: "order",
                    menuId:11
                },
                {
                    component: "users/creditlogs/index",
                    meta: {title: "金币流水", icon: "money"},
                    name: "Creditlogs",
                    path: "creditlogs",
                    menuId:12
                },
                {
                    component: "operation/msg/index",
                    meta: {title: "消息日志", icon: "message"},
                    name: "Msg",
                    path: "msg",
                    menuId:13
                },
                {
                    component: "operation/gift_log/index",
                    meta: {title: "礼物日志", icon: "excel"},
                    name: "Gift_log",
                    path: "gift_log",
                    menuId:14
                },
            ],
            component: "Layout",
            meta: {title: "一级平台", icon: "tree"},
            name: "UsersAndOrder",
            path: "/user",
            redirect: "noRedirect",
            menuId:1
        },
        {
            alwaysShow:true,
            children:[
                {
                    component: "organization/anchors/index",
                    meta: {title: "主播列表", icon: "peoples"},
                    name: "Anchors",
                    path: "anchors",
                    menuId:20
                },
              
                {
                    component: "organization/anchorsAudit/index",
                    meta: {title: "公会主播审核", icon: "edit"},
                    name: "AnchorsAudit",
                    path: "anchorsAudit",
                    menuId:21
                },
            ],
            component: "Layout",
            meta: {title: "公会组织", icon: "tree"},
            name: "Organization",
            path: "/organization",
            redirect: "noRedirect",
            menuId:2
        },
        {
            alwaysShow:true,
            children:[
                {
                    component: "union/anchors/index",
                    meta: {title: "主播列表", icon: "peoples"},
                    name: "Anchors",
                    path: "anchors",
                    menuId:31
                },
                {
                    component: "union/incomes/index",
                    meta: {title: "主播收入分析", icon: "chart"},
                    name: "Incomes",
                    path: "incomes",
                    menuId:32
                },
                {
                    component: "union/callRecords/index",
                    meta: {title: "通话记录", icon: "phone"},
                    name: "CallRecords",
                    path: "callRecords",
                    menuId:34
                },
                {
                    component: "union/diamonds/index",
                    meta: {title: "积分流水", icon: "international"},
                    name: "Diamonds",
                    path: "diamonds",
                    menuId:35
                },
                {
                    component: "union/incomeSupervise/index",
                    meta: {title: "主播获利监控", icon: "monitor"},
                    name: "IncomeSupervise",
                    path: "incomeSupervise",
                    menuId:36
                },
                {
                    component: "union/anchorsAudit/index",
                    meta: {title: "公会主播审核", icon: "edit"},
                    name: "AnchorsAudit",
                    path: "anchorsAudit",
                    menuId:37
                },
                {
                    component: "union/chattingRecords/index",
                    meta: {title: "聊天记录", icon: "wechat"},
                    name: "ChattingRecords",
                    path: "chattingRecords",
                    menuId:38
                },
            ],
            component: "Layout",
            meta: {title: "主播公会", icon: "tree"},
            name: "Union",
            path: "/union",
            redirect: "noRedirect",
            menuId:3
        },
        {
            alwaysShow:true,
            children:[
                {
                    component: "unionSystem/role/index",
                    meta: {title: "角色管理", icon: "user"},
                    name: "Role",
                    path: "role",
                    menuId:40
                },
                {
                    component: "unionSystem/menu/index",
                    meta: {title: "菜单管理", icon: "tree-table"},
                    name: "Menu",
                    path: "menu",
                    menuId:41
                },
              
            ],
            component: "Layout",
            meta: {title: "管理中心", icon: "system"},
            name: "UnionSystem",
            path: "/unionSystem",
            redirect: "noRedirect",
            menuId:4
        }

    ]
}
export default router