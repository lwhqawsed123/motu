import request from '@/utils/request'

// 列表
export function list(data) {
    return request({
        url: '/organization/anchorsAudit/ajaxsearch',
        method: 'GET',
        params: data
    })
}

// 公会下拉列表
export function groupsOptions() {
    return request({
        url: '/organization/anchorsAudit/groups',
        method: 'GET',
        noLoading: true
    })
}

// 修改审核状态
export function gstatusEdit(data) {
    return request({
        url: '/organization/anchorsAudit/audit',
        method: 'GET',
        params: data
    })
}