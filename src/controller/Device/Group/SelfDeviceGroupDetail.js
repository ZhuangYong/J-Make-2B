import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress from "material-ui/Progress/CircularProgress";
import withStyles from "material-ui/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from "@material-ui/icons/KeyboardArrowRight";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import customStyle from "../../../assets/jss/view/custom";

import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import Path from "../../../utils/path";

import ktvIcon from "../../../assets/img/icon/ktv.png";
import percentIcon from "../../../assets/img/icon/percent.png";
import incomeIcon from "../../../assets/img/icon/income.png";
import totalIncomeIcon from "../../../assets/img/icon/totalIncome.png";
import {BarrageIcon, PriceIcon} from "../../../components/common/SvgIcons";
import {getQueryString, setTitle} from "../../../utils/comUtils";

@withStyles({
    ...customStyle,
    ...{
        gradeItem: {
            margin: 0,
            backgroundColor: 'white',
            backgroundRepeat: 'no-repeat',
            padding: '.6rem .6rem .6rem 4rem',
            borderBottom: '1px solid #dedede',
            backgroundSize: 'auto 60%',
            backgroundPosition: '.6rem center'
        },
        gradeItemPrimary: {
            fontSize: '1rem',
            fontWeight: 400,
            margin: 0
        },
        gradeItemPrimaryRight: {
            float: 'right',
            fontSize: '1.4rem'
        },
        gradeItemSecond: {
            margin: '.2rem 0 0 0',
            fontSize: '.8rem'
        },
        picture: {
            width: '4rem',
            height: '4rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        nickname: {
            margin: 0,
            fontSize: '1.4rem',
        },
        viewName: {
            margin: 0,
            fontSize: '1rem',
        },
        staticsTitle: {
            margin: 0,
            fontSize: '.9rem',
            padding: '.2rem .6rem',
            backgroundColor: '#f6f6f6',
        },
        deviceUserInfo: {
            top: '4rem',
            right: '.6rem',
            color: 'white',
            position: 'absolute',
            textShadow: '1px 1px 4px black'
        },
        todayDetail: {
            display: 'flex',
            fontSize: '1rem',
            backgroundColor: '#e6e6e6',
            padding: '0 3rem 0 16px',
            '&>p': {
                margin: '0 2rem 1rem 0',
                whiteSpace: 'nowrap'
            }
        }
    }
})
@inject("deviceState")
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        setTitle("设备组详情");
        this.state = {
            groupUuid: getQueryString("groupUuid"),
            submiting: false
        };
    }
    componentDidMount() {
        this.getDeviceGroupDetail();
    }

    render() {
        const {deviceGroupDetailData} = this.props.deviceState;
        const {classes = ""} = this.props;
        const {submiting, groupUuid} = this.state;
        return <div>
            <Card className={classes.card} style={{borderRadius: 0}}>
                <CardHeader
                    style={{backgroundColor: '#e6e6e6'}}
                    title={<p className={classes.nickname}>{deviceGroupDetailData.name || "..."}</p>}
                    subheader={<p className={classes.viewName}>{deviceGroupDetailData.createTime || "..."}</p>}
                />
                <span className={classes.todayDetail}>
                    <p>今日  ￥{deviceGroupDetailData.dayAmount}</p>
                    <p>昨日  ￥{deviceGroupDetailData.yesterdayAmount}</p>
                    <p>最近7天  ￥{deviceGroupDetailData.sevenAmount}</p>
                </span>
                <List className={classes.list}>
                    {/*<ListItem className={classes.item}>
                        <ListItemIcon>
                            <img src={percentIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="分成比例"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {deviceGroupDetailData.proportion}
                        </ListItemSecondaryAction>
                    </ListItem>*/}
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <img src={incomeIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="收入总金额"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {deviceGroupDetailData.allAmount}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item} style={{borderBottom: '1px solid #cecece'}} >
                        <ListItemIcon>
                            <img src={totalIncomeIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="累计分红"
                        />
                        <ListItemSecondaryAction className={classes.secondary}>
                            {deviceGroupDetailData.getAmount}
                        </ListItemSecondaryAction>
                    </ListItem>

                    <div>
                        <p className={classes.staticsTitle}>
                             &nbsp;
                        </p>
                    </div>

                    <ListItem className={classes.item} onClick={() => this.deviceList(deviceGroupDetailData)}>
                        <ListItemIcon>
                            <img src={ktvIcon} className={classes.itemIcon}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="设备"
                        />
                        <ListItemSecondaryAction>
                            {deviceGroupDetailData.deviceCount}
                            <IconButton onClick={() => this.deviceList(deviceGroupDetailData)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem className={classes.item} onClick={() => this.devicePriceList(deviceGroupDetailData)}>
                        <ListItemIcon>
                            <PriceIcon size="1.6rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                                      primary="套餐价格"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.devicePriceList(deviceGroupDetailData)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>


                    <ListItem className={classes.item} onClick={() => this.deviceMarqueeList(deviceGroupDetailData)}>
                        <ListItemIcon>
                            <BarrageIcon size="1.6rem" color="red"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                                      primary="扫码滚动文字"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.deviceMarqueeList(deviceGroupDetailData)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Card>

            <Card className={classes.card} style={{marginTop: 16}}>
                <List className={classes.list}>
                    <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_DEVICE_GROUP_EDIT, {groupUuid: groupUuid})}>
                        <ListItemText
                            primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                                编辑
                            </div>}
                        />
                    </ListItem>
                </List>
                <List className={classes.list}>
                    <ListItem className={classes.item} onClick={() => !submiting && this.deleteGroup()}>
                        <ListItemText
                            primary={<div style={{margin: 0, padding: 0, textAlign: 'center', color: 'red'}}>
                                {
                                    submiting && <CircularProgress color="secondary" size={14} />
                                }
                                删除
                            </div>}
                        />
                    </ListItem>
                </List>
            </Card>

        </div>;
    }

    /**
     * 设备组
     * @param item
     */
    deviceList = (item) => {
        this.linkTo(Path.PATH_DEVICE_INDEX, {groupUuid: item.uuid || "", channelCode: item.channelCode || ""});
    };

    /**
     * 设备组中的套餐价格包
     * @param item
     */
    devicePriceList = (item) => {
        this.linkTo(Path.PATH_PRICE_INDEX, {groupUuid: item.uuid || ""});
    };

    /**
     * 跑马灯列表
     * @param item
     */
    deviceMarqueeList = (item) => {
        item.uuid && this.linkTo(Path.PATH_DEVICE_MARQUEE_LIST, {groupUuid: item.uuid});
    };

    /**
     * 获取设备组详情
     */
    getDeviceGroupDetail = () => {
        const {groupUuid} = this.state;
        this.props.deviceState.getDeviceGroupDetail(groupUuid);
    };

    /**
     * 删除虚拟设备组
     */
    deleteGroup() {
        const {deviceGroupDetailData} = this.props.deviceState;
        this.alert("确认删除该分组码？", "删除分组", () => {
            this.setState({submiting: true});
            this.props.deviceState.deleteDeviceGroup(deviceGroupDetailData.uuid).then(res => {
                this.notification("删除成功！");
                setTimeout(() => this.back(), 1500);
            }).catch(err => this.setState({submiting: false}));
        }, null, true);
    }


}
