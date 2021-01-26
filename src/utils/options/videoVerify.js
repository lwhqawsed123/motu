// 认证状态选项
export const videoTypeOptions = [
    { value: 2, label: "置顶" },
    { value: 1, label: "推荐" },
    { value: 3, label: "本人" }
]

// 审核状态选项
export const statusOptions = [
    { value: 0, label: "未通过" },
    { value: 1, label: "已认证" },
    { value: "1,0", label: "2星" },
    { value: "1,1", label: "3星" },
    { value: "1,2", label: "4星" },
    { value: "1,3", label: "5星" },
    { value: 2, label: "审核中" },
    { value: 3, label: "忽略" },
    { value: 4, label: "已禁用" }
]

// 主播星级
export const starOptions = [
    { value: "", label: "无" },
    { value: "-1", label: "0星" },
    { value: "0", label: "2星" },
    { value: "1", label: "3星" },
    { value: "2", label: "4星" },
    { value: "3", label: "5星" }
]