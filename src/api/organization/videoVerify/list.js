import request from '@/utils/request'

// 列表
export function list(data) {
    return request({
        url: '/users/verify/ajaxsearch',
        method: 'GET',
        params: data
    })
}

// 快速搜索
export function quickList(data) {
    return request({
        url: '/users/users/ajaxsearch',
        method: 'GET',
        params: data
    })
}


// 公会下拉列表
export function groupsOptions() {
    return request({
        url: '/organization/anchorsAudit/groups',
        method: 'GET',
        noLoading:true
    })
}


// 性别不符
export function updata_gender(data) {
    return request({
        url: '/users/verify/updata_gender',
        method: 'GET',
        params: data
    })
}

// 头像不符
export function avatar_discrepancy(data) {
    return request({
        url: '/users/verify/avatar_discrepancy',
        method: 'GET',
        params: data
    })
}

// 是否本人
export function isself(data) {
    return request({
        url: '/users/verify/isself',
        method: 'GET',
        params: data
    })
}

// 是否置顶
export function istop(data) {
    return request({
        url: '/users/verify/top',
        method: 'GET',
        params: data
    })
}

// 星级
export function acceptedSatr(data) {
    return request({
        url: `/users/verify/accepted/${data.id}`,
        method: 'GET',
        params: data.data
    })
}

// 不通过
export function refuse(data) {
    return request({
        url: `/users/verify/refuse/${data}`,
        method: 'GET'
    })
}

// 忽略
export function delay(data) {
    return request({
        url: `/users/verify/delay/${data}`,
        method: 'GET'
    })
}