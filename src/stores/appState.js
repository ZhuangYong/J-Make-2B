import {action, observable} from "mobx";
import BaseState from "./baseState";

export default class appState extends BaseState {

    @observable appLoaded = false;
    @observable pageDeviceList = {
    tabIndex: 0
    };

    @action
    setPageDeviceListTabIndex(index) {
        this.pageDeviceList.tabIndex = index;
    }

    @action
    setAppLoaded(data) {
        this.appLoaded = data;
    }

}
