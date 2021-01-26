import Mock from 'mockjs'

let msgContent = [
    {
        cmd: "",
        msgtype: "TEXT",
        msgcontent: "hello，吱吱吱"
    },
    {
        cmd: "TEXT",
        msgtype: "CUSTOM",
        msgcontent: '{"type":100,"info":{"cmd":"TEXT","msg":"该账号为机器人账号，如有疑问请联系[官方客服<\/tag>]账号"}}'
    },
    {
        cmd: "",
        msgtype: "PICTURE",
        msgcontent: '{"md5":"0366348839165b3faa0a00fa9fdd0d06","name":"temp_image_26573f1e-4773-4fa9-b888-42b747b10308.jpg","url":"https:\/\/nim-nosdn.netease.im\/NDI4NDk3OA==\/bmltYV8xOTQ2NTk2MzI2M18xNTk0MjE0NDU1MDMyXzYxYmFjNjFjLTFjNDgtNDg3OC1hYmQ1LTNiNTE4ZTI3OWU1Yw==","size":62021,"ext":"jpg","sen":"nim_default_im","force_upload":false,"w":540,"h":960}'
    },
    {
        cmd: "",
        msgtype: "AUDIO",
        msgcontent: '{"size":108858,"ext":"wav","dur":6547,"url":"https:\/\/nim-nosdn.netease.im\/NDI4NDk3OA==\/bmltYV8xOTA3ODcyMTMxOV8xNTk0MTM2ODI1OTAzX2FmYTE4NWQ2LWMwYTUtNDViNy1iMWMxLTY5NjBhYTQyNTQxMg==","md5":"cdcf34b2a9a5398489326c03606ae812"}'
    },
    {
        cmd: "",
        msgtype: "VIDEO",
        msgcontent: '{"md5":"05d2182cede2c0cfba94736ce41f8bf6","name":"05d2182cede2c0cfba94736ce41f8bf6","url":"https:\/\/nim-nosdn.netease.im\/NDI4NDk3OA==\/bmltYV8xNzQwOTI1MDM3Nl8xNTk0MzU3NjQ0MTEzXzE5YjFiMTZjLTQ3OGQtNDZhOC04ZGJhLTVhMGNkYjcwM2Q1Ng==","size":12857792,"ext":"mp4","sen":"nim_default_im","force_upload":false,"w":720,"h":1024,"dur":60024}'
    },
    {
        cmd: "gift",
        msgtype: "CUSTOM",
        msgcontent: '{"info":{"to_userinfo":{"gender":"1","avatar":"https://img.howfuli.com/iconurl/202006/22/5ee663c5556bfbad.JPEG?x-oss-process\u003dimage/resize,w_720","nickname":"男神","userid":"40000290444","vip":"0","wealth":"8"},"cmd":"gift","forward":"40000290444","from":"40000167785","gift":{"anim_type":"common","id":"2246","name":"纯情白玫瑰","price":"15","special_zip":"","special_zip_md5":"","src":"https://img.howfuli.com/gift/202007/09/0234237199211eee.png"},"from_userinfo":{"gender":"2","avatar":"https://img.howfuli.com/iconurl/202006/30/23611967493fe243.jpg?x-oss-process\u003dimage/resize,w_720","nickname":"晴子","userid":"40000167785","vip":"0","wealth":"5"},"number":"1","to":["40000290444"],"type":100},"multi_amount":"1","type":100,"cmd":"gift"}'
    },
]

let data = {
    callid: "",
    convType: "",
    dateline: "1594210200",
    domain: "",
    eventType: "0",
    f_age: "25",
    f_avatar: "https://img.inallog.com/iconurl/default_male.png",
    f_gender: "1",
    f_nickname: "男神298246",
    f_status: "1",
    f_username: "298246",
    f_verify_status: "0",
    fromClientType: "",
    from_gender: "0",
    from_host: "",
    from_platform: "",
    'fromid|1': ["40000298245", '50000100004'],
    gid: "0",
    'id|1-99999999': 1,
    is_hello: "0",
    is_read: "0",
    msgid: "",
    msgidClient: "",
    response: "0",
    strlength: "0",
    t_age: "18",
    t_avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/ZXLibyRlJXxH7MVxCxkjk508qTiaSzOy6MWBOVUJmGKsGibWczuBV6lb6eIw0zUB2Xgbib2r1TSM1AVbuAubfodibOA/132",
    t_gender: "2",
    t_nickname: "Justin",
    t_status: "1",
    t_username: "100004",
    t_verify_status: "1",
    time: "0.69462100 159421020",
    to_gender: "0",
    to_platform: "",
    toid: "50000100004",
    total_rows: "1"
}

let xhrRes = {
    code: 0,
    info: '',
    data: {
        class: "msg",
        col_key: "id",
        columns: [],
        dir: "cdr/",
        ext_stat: ", 发送:1人, 接收:1人",
        has_checkbox: false,
        total_rows: '',
        items: []
    }
}
let Random = Mock.Random

Random.extend({
    msgContent: msgContent,
    constellation: function(date){
        return this.pick(this.msgContent)
    }
})



for (let index = 0; index < 20; index++) {
    let item = JSON.parse(JSON.stringify(data))
    // let i = Math.floor(Math.random() * 5)

    // let thisItem= Object.assign(item, msgContent[i])
    
    let thisItem= Object.assign(item,Random.constellation())
    xhrRes.data.items.push(thisItem)
}


Mock.mock('/cdr/msg/ajaxsearch/','get',xhrRes)


