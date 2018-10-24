// 登录接口：/wxback/login
// 退出接口：/wxback/logout
// 首页统计数据：/wxback/statis/index
// 设备数据列表（分页）：/wxback/device/index
// 查询设备列表接口，不分页：/wxback/device/deviceList
// 查看用户信息接口：/wxback/user/index
// 保存用户信息接口：/wxback/user/save
// 修改密码接口：/wxback/user/modify

export default {
    // 登录
    API_USER_LOGIN: "/wxback/login",

    // 退出
    API_USER_LOGOUT: "/wxback/logout",

    // 微信授权
    API_WEIXIN_AUTH: "/wxback/auth",

    // 配置
    API_CONFIG_INDEX: "/wxback/config/index",

    // 1元试唱开启或关闭
    API_CONFIG_CHANGE_FREE_SING: "/wxback/config/onOffFreeSing",

    // 开启或关闭推送
    API_CONFIG_CHANGE_NOTICE_SING: "/wxback/config/onOffNotice",

    // 申请成为代理商
    API_CONFIG_APPLY_AGENT: "/wxback/config/applyAgent",

    // 首页统计数据
    API_STATIS_INDEX: "/wxback/statis/index",

    // 机型列表
    API_STATIS_CHANNEL_LIST: "/wxback/statis/channelList",

    // 查看用户信息接口
    API_STATIS_MANAGER_PAGE: "/wxback/user/list",

    // 查看用户信息接口
    API_STATIS_USER_INFO: "/wxback/user/index",

    // 修改用户信息接口
    API_USER_SAVE: "/wxback/user/save",

    // 修改管理账号信息
    API_USER_MANAGER_ACCOUNT_SAVE: "/wxback/user/saveMember",

    // 修改用户密码
    API_USER_CHANGE_PASSWORD: "/wxback/user/modifyPass",

    // 设备组列表（自营分组）
    API_STATIS_DEVICE_GROUP_PAGE: "/wxback/team/list",

    // 查询设备列表
    API_DEVICE_CHOOSE_PAGE: "/wxback/team/selectDeviceList",

    // 订单列表
    API_STATIS_ORDER_PAGE: "/wxback/order/index",

    // 找回订单列表
    API_STATIS_ORDER_RETRIEVE_PAGE: "/wxback/order/retrieveList",

    // 找回订单
    API_STATIS_ORDER_RETRIEVE: "/wxback/order/retrieve",

    // 提现申请
    API_ORDER_CASH_APPLY: "/wxback/order/cashApply",

    // 提现订单列表
    API_ORDER_CASH_ORDER_LIST: "/wxback/order/cashOrderList",

    // 提现记录
    API_ORDER_CASH_LIST: "/wxback/order/cashList",

    // 提现相关信息
    API_ORDER_CASH_DETAIL: "/wxback/order/cashDetail",

    // 首页收入概况
    API_STATIS_INDEX_DETAIL: "/wxback/statis/detail",

    // 头像上传
    API_IMAGE_UPLOAD_AVATAR: "/wxback/user/saveImage",

    // 上传图片
    API_IMAGE_UPLOAD: "/wxback/config/upload",

    // 保存意见反馈
    API_USER_SAVE_FEEDBACK: "/wxback/user/saveRemark",

    // 保存设备信息
    API_DEVICE_SAVE_INFO: "/wxback/device/save",

    // 查看产品列表分页
    API_PRICE_PRODUCT_PAGE: "/wxback/product/index",

    // 修改价格
    API_PRICE_PRODUCT_SAVE: "/wxback/product/save",

    // ------- 合作伙伴 ------
    // 查询销售方
    API_SALES_PAGE: "/wxback/sales/list",

    // 子销售方分成比例组
    API_SALES_GROUP_LIST: "/wxback/group/list",

    // 删除子销售方分成比例组
    API_PARTNER_GROUP_DELETE: "/wxback/group/delete/",

    // 删除代理商
    API_PARTNER_PARTNER_DELETE: "/wxback/sales/delete/",

    // 子销售方分成比例组设备列表
    API_SALES_GROUP_DEVICE_LIST: "/wxback/group/deviceList/",

    // 为子销售方添加设备
    API_SALES_GROUP_CHOOSE_DEVICE_LIST: "/wxback/group/selectDeviceList",

    // 合作伙伴详情
    API_PARTNER_DETAIL: "/wxback/user/child/",

    // 代理商分成详情
    API_PARTNER_PROPORTION_DETAIL: "/wxback/device/resetDetail/",

    // 修改代理商设备分成比例
    API_PARTNER_PROPORTION_RESET: "/wxback/device/reset/",

    // 保存销售方
    API_SALES_EDIT: "/wxback/sales/save",

    // 保存销售方下的价格组
    API_SALES_GROUP_EDIT: "/wxback/group/save",

    // 保存销售方设备(选择设备保存)
    // API_SALES_SAVE_DEVICE: "/wxback/device/saveDevice",
    API_SALES_SAVE_DEVICE: "/wxback/group/bind",

    // 解绑销售方设备
    API_SALES_UNBIND_DEVICE: "/wxback/group/unbind",

    // ----------自营---------
    // 虚拟设备列表
    API_DEVICE_PAGE: "/wxback/team/deviceList/",

    // 虚拟设备组详情
    API_DEVICE_GROUP_STATIS: "/wxback/team/detail/",

    // 为虚拟组添加设备
    API_DEVICE_CHOOSE_SAVE: "/wxback/team/bind",

    // 解绑虚拟组设备
    API_UNBIND_DEVICE: "/wxback/team/unbind",

    // 保存虚拟设备组
    API_DEVICE_GROUP_SAVE: "/wxback/team/save",

    // 修改别名
    API_DEVICE_NAME_SAVE: "/wxback/team/rename",

    // 删除虚拟设备组
    API_DEVICE_GROUP_DELETE: "/wxback/team/delete/",

    // 销售组的跑马灯列表
    API_DEVICE_MARQUEE_LIST: "/wxback/marquee/index",

    // 销售组的跑马灯修改
    API_DEVICE_MARQUEE_SAVE: "/wxback/marquee/save",

    // 删除跑马灯
    API_DEVICE_MARQUEE_DELETE: "/wxback/marquee/delete",
};
