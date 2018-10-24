import {action, observable} from "mobx";
import Api from "../utils/api";
import BaseState from "./baseState";

export default class salesState extends BaseState {

    @observable salesPageData = "";
    @observable partnerDetailData = "";
    @observable partnerDeviceGroupPageData = "";
    @observable partnerChooseDeviceListData = "";

    @action
    setSalesPageData(data) {
        this.orderData = data;
    }

    @action
    setPartnerDetailData(data) {
        this.partnerDetailData = data;
    }

    @action
    setPartnerDeviceGroupPageData(data) {
        this.partnerDeviceGroupPageData = data;
    }

    @action
    setPartnerChooseDeviceListData(data) {
        this.partnerChooseDeviceListData = data;
    }

    /**
     * 查询销售方
     * @param data
     * @returns {*}
     */
    getSalesPageData(data) {
        return this.fetch({
            url: Api.API_SALES_PAGE,
            setState: "setSalesPageData",
            data: data
        });
    }

    /**
     * 子销售方设备组
     * @param data
     * @returns {*}
     */
    getPartnerDeviceGroupPageData(data) {
        return this.fetch({
            url: Api.API_SALES_GROUP_LIST,
            setState: "setPartnerDeviceGroupPageData",
            data: data
        });
    }

    /**
     * 保存销售方
     * @param data
     * @returns {*}
     */
    editSalesData(data) {
        return this.fetch({
            url: Api.API_SALES_EDIT,
            data: data
        });
    }

    /**
     * 保存销售方设备(选择设备保存)
     * @param data
     * @returns {*}
     */
    saveSalesDevice(data) {
        return this.fetch({
            url: Api.API_SALES_SAVE_DEVICE,
            data: data
        });
    }

    /**
     * 解绑销售方设备
     * @param data
     * @returns {*}
     */
    unbindSalesDevice(data) {
        return this.fetch({
            url: Api.API_SALES_UNBIND_DEVICE,
            data: data
        });
    }

    /**
     * 合作伙伴详情
     * @param salesUUID
     * @returns {*}
     */
    getPartnerDetail(salesUUID) {
        return this.fetch({
            method: "get",
            url: Api.API_PARTNER_DETAIL + salesUUID,
            setState: "setPartnerDetailData",
        });
    }

    /**
     * 合作伙伴详情
     * @param deviceUuid
     * @returns {*}
     */
    getPartnerProportionDetail(deviceUuid) {
        return this.fetch({
            method: "get",
            url: Api.API_PARTNER_PROPORTION_DETAIL + deviceUuid,
            setState: "setPartnerDetailData",
        });
    }

    /**
     * 为子销售方添加设备
     * @param data
     * @returns {*}
     */
    getPartnerChooseDeviceListData(data) {
        return this.fetch({
            url: Api.API_SALES_GROUP_CHOOSE_DEVICE_LIST,
            setState: "setPartnerChooseDeviceListData",
            data
        });
    }

    /**
     * 保存销售方下的价格组
     * @param data
     * @returns {*}
     */
    saveDeviceGroup(data) {
        return this.fetch({
            url: Api.API_SALES_GROUP_EDIT,
            data: data
        });
    }

    /**
     * 修改代理商设备分成比例
     * @param data
     * @returns {*}
     */
    savePartnerDeviceProportion(deviceUuid, data) {
        return this.fetch({
            url: Api.API_PARTNER_PROPORTION_RESET + deviceUuid,
            data: data
        });
    }

    /**
     * 删除子销售方下分成比例组
     * @param uuid
     * @returns {*}
     */
    deleteDeviceGroup(uuid) {
        return this.fetch({
            url: Api.API_PARTNER_GROUP_DELETE + uuid,
        });
    }

    /**
     * 删除代理商
     * @param salesUuid
     * @returns {*}
     */
    deletePartner(salesUuid) {
        return this.fetch({
            url: Api.API_PARTNER_PARTNER_DELETE + salesUuid,
        });
    }
}
