import React from "react";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import customStyle from "../../assets/jss/view/custom";

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import Path from "../../utils/path";
import PullRefreshPage from "../../components/CommonPage/PullrefreshPage";
import {setTitle} from "../../utils/comUtils";

const style = {
    ...customStyle,
    infoLine: {
        fontSize: '.86rem',
        color: '#555555',
        margin: '.2rem 0'
    },
    infoLabel: {
        color: 'black',
        width: '4rem',
        fontSize: '.9rem',
        fontWeight: 500
    },
    searchClear: {
        position: 'absolute',
        right: 12,
        top: 2
    },
    menuBottomButton: {
        bottom: 56,
        width: '100%',
        position: 'fixed',
        backgroundColor: 'white',
        borderTop: '1px solid #dedede',
        borderRadius: '0'
    }
};
@inject("salesState")
@observer
export default class PartnerListIndex extends PullRefreshPage {
    constructor(props) {
        super(props);
        setTitle("代理商");
    }

    pageAction = (data) => {
        return this.props.salesState.getSalesPageData(data);
    };

    listItem = (item) => {
        return <ListItem
            key={item.id || item.channelCode}
            style={style.item}
            onClick={() => this.deviceGroupDetail(item)}>
            <ListItemText style={style.ListItemText}
                          primary={<span>{item.name || item.channelName || "未命名"}<font style={{fontSize: '.8rem', color: '#808080'}}> （{item.deviceCount || 0}台）</font></span>}
            />
            <ListItemSecondaryAction style={{fontSize: '.8rem'}}>
                <font color="#808080">{item.total || 0}元</font>
                <IconButton style={{width: '2rem'}} onClick={() => this.deviceGroupDetail(item)}>
                    <ArrowForwardIcon color="disabled"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>;
    };

    renderExt = () => {
        return <Button style={{...style.menuBottomButton, bottom: 56}} onClick={() => this.linkTo(Path.PATH_SALES_EDIT)}>
            <AddIcon/> 添加代理商
        </Button>;
    };

    getFixBottom = () => {
        return 56 + 41;
    };

    deviceGroupDetail = (item) => {
        this.props.salesState.setPartnerDetailData(item);
        this.linkTo(Path.PATH_PARTNER_DETAIL, {salesUuid: item.uuid || ""});
    };

}

PartnerListIndex.defaultProps = {
    showSearch: false,
};
