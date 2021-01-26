
// 收费类型选项
export const chargeTypeOptions = [
    { value: '0', label: "正常收费" },
    { value: '1', label: "赠送免费" },
    { value: '2', label: "红钻免费" },
    { value: '3', label: "审核免费" }
]

// 话单状态选项
export const callStatusOptions = [
    { value: 'SUCCESS', label: "已接通" },
    { value: 'SINGLE_PARTICIPATE', label: "未接通(汇总)" },
    { value: 'TIMEOUT', label: "无人接听" },
    { value: 'CALLER_HANGUP', label: "主叫挂断" },
    { value: 'REJECT', label: "被叫拒绝" },
    { value: 'LOST', label: "掉单话单" },
]

// 挂断原因选项
export const hangupOptions = [
    { value: 'porn', label: "涉嫌发布低俗内容" },
    { value: 'nomoney', label: "余额不足" }
]

// 呼叫类型选项
export const callTypeOptions = [
    { value: 'AUDIO', label: "语音" },
    { value: 'VEDIO', label: "视频" }
]

// 费率选项
export const feerateOptions = [
    { value: '0', label: "0" },
    { value: '15', label: "15" },
    { value: '20', label: "20" },
    { value: '25', label: "25" },
    { value: '30', label: "30" },
    { value: '35', label: "35" },
    { value: '40', label: "40" },
    { value: '50', label: "50" },
    { value: '60', label: "60" },
    { value: '70', label: "70" },
    { value: '80', label: "80" }
]