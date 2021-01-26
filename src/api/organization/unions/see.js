import request from '@/utils/request'
import Qs from 'qs'

// 列表
export function list(data) {
    return request({
        url: '/live/group_details/ajaxsearch',
        method: 'GET',
        params: data
    })
}

// 查询
export function get_by_id(data) {
    return request({
        url: `/live/group_details/edit/${data}`,
        method: 'GET'
    })
}

// 新增/编辑
export function save_edit(data) {
    return request({
        url: `/live/group_details/save`,
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: Qs.stringify(data)
    })
}

// 删除
export function delete_by_id(data) {
    return request({
        url: `/live/group_details/delete/${data}`,
        method: 'GET'
    })
}

// 获取公会详情
export function get_detail_by_id(data) {
    return request({
        url: `/live/group/view/${data}`,
        method: 'GET'
    })
}

// 获取公会详情
export function get_group_data(data) {
    return request({
        url: `/live/group/view/${data}`,
        method: 'GET'
    })
}