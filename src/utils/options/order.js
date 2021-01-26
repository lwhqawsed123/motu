// 支付方式选项
export const payModeOptions = [
    { value: 'alipay', label: "支付宝" },
    { value: 'wxpay', label: "微信支付" },
    { value: 'appstore', label: "苹果支付" },
    { value: 'huaweipay', label: "华为支付" }
]

// 支付状态选项
export const payStatusOptions = [
    { value: 'success', label: "成功" },
    { value: 'paid', label: "已付款" },
    { value: 'non-payment', label: "未支付" },
    { value: 'refund', label: "已退款" }
]