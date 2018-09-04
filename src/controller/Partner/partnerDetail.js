import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from "material-ui/styles/withStyles";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import PictureUpload from "../../components/CustomUpload/PictureUpload";
import Path from "../../utils/path";
import customStyle from "../../assets/jss/view/custom";

import {
    AddressIcon,
    AgreementIcon,
    AliPayIcon, DeviceIcon, GroupIcon,
    LocationIcon,
    PhoneIcon,
    UserIcon
} from "../../components/common/SvgIcons";
import ktvIcon from "../../assets/img/icon/ktv.png";
import headBg from "../../assets/img/bg/headbg.jpg";
import {getQueryString, setTitle} from "../../utils/comUtils";

const style = {...customStyle, ...{
        partnerCarHead: {
            backgroundImage: `url(${headBg})`,
        },
        editButton: {
            height: '1.6rem',
            float: 'right',
            fontSize: '.8rem',
            color: '#484848',
            display: 'flex',
            alignItems: 'center'
        },
        editIcon: {
            height: '.8rem',
            marginLeft: '.2rem'
        },
        carHeaderLabel: {
            fontSize: '1.4rem',
            color: 'white',
            textShadow: '1px 1px 4px black'
        },
        infoBar: {
            position: 'absolute',
            top: '-2rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '1rem 1rem 0 0',
            padding: '.4rem 1rem'
        }
    }};
@withStyles(style)
@inject("salesState")
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        setTitle("合作者详情");
        this.state = {
            submiting: false,
            salesUuid: getQueryString("salesUuid")
        };
    }

    componentDidMount() {
        this.getPartnerDetail();
    }

    render() {
        const {partnerDetailData} = this.props.salesState;
        const {classes = ""} = this.props;
        return <div>
            {
                <Card className={classes.card}>
                    <CardHeader
                        style={{paddingBottom: '2rem'}}
                        className={[classes.carHeader, classes.partnerCarHead].join(" ")}
                        title={<PictureUpload
                            label={partnerDetailData.viewName || "..."}
                            labelStyle={style.carHeaderLabel}
                            defaultImage={partnerDetailData.headImg}
                        />}
                    />
                    <List className={classes.list} style={{paddingTop: 0}}>
                        <ListItem>
                            <ListItemIcon>
                                <UserIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="昵称"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.nickName || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <PhoneIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="手机号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.phone || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <AliPayIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="收款账号"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.alipayAccount || "未设置"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <LocationIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="所在区域"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.area ? `${partnerDetailData.region} ${partnerDetailData.city} ${partnerDetailData.area}` : "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <AddressIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="详细地址"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {partnerDetailData.address || "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
            }


            <Card className={classes.card} style={{marginTop: 16}}>
                <List className={classes.list}>
                    <ListItem className={classes.item} onClick={this.deviceList}>
                        <ListItemIcon>
                            <DeviceIcon size="1.6rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                            primary="设备"
                        />
                        <ListItemSecondaryAction>
                            {partnerDetailData.count}
                            <IconButton onClick={this.deviceList}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem className={classes.item} onClick={this.deviceGroupList}>
                        <ListItemIcon>
                            <GroupIcon size="1.6rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                                      primary="分成组"
                        />
                        <ListItemSecondaryAction>
                            {partnerDetailData.groupCount}
                            <IconButton onClick={this.deviceGroupList}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem className={classes.item} onClick={this.partnerAgreement}>
                        <ListItemIcon>
                            <AgreementIcon size="1.6rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                            primary="电子协议"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={this.partnerAgreement}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>

        </div>;
    }

    /**
     * 所有设备
     */
    deviceList = () => {
        const {salesUuid} = this.state;
        this.linkTo(Path.PATH_DEVICE_PARTNER_INDEX, {salesUuid: salesUuid || ""});
    };

    /**
     * 价格组设备
     */
    deviceGroupList = () => {
        const {salesUuid} = this.state;
        this.linkTo(Path.PATH_PARTNER_DEVICE_GROUP_LIST, {salesUuid: salesUuid || ""});
    };

    /**
     * 获取合作者详情
     */
    getPartnerDetail = () => {
        const {salesUuid} = this.state;
        this.props.salesState.getPartnerDetail(salesUuid);
    };

    /**
     * 合作者电子协议
     */
    partnerAgreement = () => {
        const {salesUuid} = this.state;
        this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT, {salesUuid: salesUuid});
    };

}
