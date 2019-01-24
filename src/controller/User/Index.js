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

import CircularProgress from "material-ui/Progress/CircularProgress";
import {observer} from "mobx-react";
import {inject} from "mobx-react/index";
import BaseComponent from "../../components/common/BaseComponent";
import PictureUpload from "../../components/CustomUpload/PictureUpload";
import Path from "../../utils/path";
import customStyle from "../../assets/jss/view/custom";
import editIcon from "../../assets/img/icon/edit.png";
import Const from "../../utils/const";
import Switch from 'material-ui/Switch';
import {
    AddressIcon,
    AgreementIcon,
    AliPayIcon,
    CashIcon,
    FeedbackIcon,
    LocationIcon, PartnerIcon, PasswordIcon,
    PhoneIcon, TryIcon,
    UserIcon
} from "../../components/common/SvgIcons";
import {setTitle} from "../../utils/comUtils";
import Button from "../../components/CustomButtons/Button";
import UserState from "../../stores/userState";

// 0表示未开启 1表示已开启 2表示已关闭  0可以开启 1 可以关闭  2不可以操作*
const FREE_SING_TYPE_OFF = 0;
const FREE_SING_TYPE_ON = 1;
const FREE_SING_TYPE_CLOSE = 2;

const PUSH_MSG_ON = 1;
const PUSH_MSG_OFF = 2;

const style = {...customStyle, ...{
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
@inject("statisticsState", "userState")
@observer
export default class Index extends BaseComponent {

    constructor(props) {
        super(props);
        setTitle("我的");
        this.state = {
            submiting: false
        };
        this.refreshStatistics = this.refreshStatistics.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.getConfig();
        this.refreshStatistics();
    }
    render() {
        const {loginUserData, configData = {}, logoutLoading} = this.props.userState;
        const {classes = ""} = this.props;
        return <div>
            {
                loginUserData.type === Const.ROLE.SALES && <Card className={classes.card}>
                    <CardHeader
                        style={{paddingBottom: '2rem'}}
                        className={[classes.carHeader, classes.card].join(" ")}
                        title={<PictureUpload
                            label={loginUserData.viewName || ""}
                            labelStyle={style.carHeaderLabel}
                            defaultImage={loginUserData.headImg}
                            uploadAction={this.uploadUserAvatarAction}
                        />}
                    />
                    <div style={{position: 'relative'}}>
                        <div className={classes.infoBar} style={{}}>
                            <span style={{lineHeight: '1.6rem', fontSize: '.8rem'}}>
                             基本信息
                            </span>
                                <span style={style.editButton} onClick={() => this.linkTo(Path.PATH_USER_EDIT_INFO)}>
                                编辑 <img src={editIcon} className={classes.editIcon}/>
                            </span>
                        </div>
                    </div>
                    <List className={classes.list} style={{paddingTop: 0}}>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <UserIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="昵称"
                            />
                            <ListItemSecondaryAction className={classes.secondary}>
                                {loginUserData.nickName || "未设置"}
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
                                {loginUserData.phone || "未设置"}
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
                                {loginUserData.alipayAccount || "未设置"}
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
                                {loginUserData.area ? `${loginUserData.region} ${loginUserData.city} ${loginUserData.area}` : "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.item}>
                            <ListItemIcon>
                                <AddressIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="详细地址"
                            />
                            <ListItemSecondaryAction className={classes.secondary} style={{maxWidth: '60%', height: '2.6rem', lineHeight: '1rem', display: 'flex', alignItems: 'center'}}>
                                {loginUserData.address || "未填写"}
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Card>
            }

            {
                loginUserData.type === Const.ROLE.MANUFACTURE && <Card className={classes.card} style={{border: 'none'}}>
                    <CardHeader className={[classes.carHeader, classes.carHeader].join(" ")}
                                title={<PictureUpload
                                    label={loginUserData.viewName || ""}
                                    labelStyle={style.carHeaderLabel}
                                    defaultImage={loginUserData.headImg}
                                    uploadAction={this.uploadUserAvatarAction}
                                />}
                    />
                </Card>
            }

            <Card className={classes.card} style={{marginTop: 16}}>
                <List className={classes.list}>
                    {/*{
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item}>
                            <ListItemIcon>
                                <TryIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="试唱"
                            />
                            <ListItemSecondaryAction>
                                {
                                    this.state.submiting === "freeSign" ? <div style={{margin: '0 1.6rem'}}><CircularProgress color="secondary" size={14} /></div> : <div>
                                        {
                                            configData.freeSing === FREE_SING_TYPE_CLOSE ? <font style={{padding: '0 1.2rem', fontSize: '1rem'}}>已关闭</font> : <Switch
                                                checked={configData.freeSing === FREE_SING_TYPE_ON}
                                                onChange={this.changeFreeSing}
                                            />
                                        }
                                    </div>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    }*/}
                    {
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_ORDER_CASH_APPLY_INDEX)}>
                            <ListItemIcon>
                                <CashIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                          primary="提现"
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.linkTo(Path.PATH_ORDER_CASH_APPLY_INDEX)}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }
                   {/* {
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item}>
                            <ListItemIcon>
                                <PartnerIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                          // agent 1是代理人 2不是代理人 3申请中 4  审核失败
                                          primary={"代理商"}
                            />
                            <ListItemSecondaryAction style={{margin: '0 1.2rem'}}>
                                {
                                    this.getPartnerStatusStr()
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    }*/}

                     {
                        loginUserData.type === Const.ROLE.SALES && configData.admin === Const.SALES_ROLE_ADMIN && <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_ACCOUNT_MANAGER_LIST)}>
                            <ListItemIcon>
                                <UserIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                          primary={"管理者账号"}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.linkTo(Path.PATH_USER_ACCOUNT_MANAGER_LIST)}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }

                    {
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item}>
                            <ListItemIcon>
                                <PartnerIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                // notice 1： 推送 2： 不推送
                                          primary={"推送收益"}
                            />
                            <ListItemSecondaryAction>
                                {
                                    this.state.submiting === "pushMsg" ? <div style={{margin: '0 1.6rem'}}><CircularProgress color="secondary" size={14} /></div> : <div>
                                        <Switch
                                            checked={configData.notice === PUSH_MSG_ON}
                                            onChange={this.changePushMsg}
                                        />
                                    </div>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    }

                    {
                        loginUserData.type === Const.ROLE.SALES && <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                            <ListItemIcon>
                                <AgreementIcon size="1.6rem"/>
                            </ListItemIcon>
                            <ListItemText className={classes.ListItemText}
                                primary="电子协议"
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.linkTo(Path.PATH_USER_ELECTRONIC_AGREEMENT)}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }
                    <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_FEEDBACK)}>
                        <ListItemIcon>
                            <FeedbackIcon size="1.6rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                            primary="意见反馈"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.linkTo(Path.PATH_USER_FEEDBACK)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.item} onClick={() => this.linkTo(Path.PATH_USER_EDIT_PASSWORD)}>
                        <ListItemIcon>
                            <PasswordIcon size="1.4rem"/>
                        </ListItemIcon>
                        <ListItemText className={classes.ListItemText}
                                      primary="修改密码"
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => this.linkTo(Path.PATH_USER_EDIT_PASSWORD)}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                </List>
            </Card>

            <Card className={classes.card} style={{marginTop: 16}}>
                <List className={classes.list}>
                    <ListItem className={classes.item} onClick={!this.state.submiting ? this.logout : f => f}>
                        <ListItemText
                            primary={<div style={{margin: 0, padding: 0, textAlign: 'center'}}>
                                {
                                    this.state.submiting === "logout" && <CircularProgress color="secondary" size={14} />
                                }
                                退出登录
                            </div>}
                        />
                    </ListItem>
                </List>
            </Card>
        </div>;
    }

    getPartnerStatusStr = () => {
        const {applyLing} = this.state;
        if (applyLing) return <CircularProgress color="secondary" size={18}/>;
        // agent 1是代理人 2不是代理人 3申请中 4  审核失败
        const {configData} = this.props.userState;
        const {agent} = configData || {};
        switch (agent) {
            case UserState.AGENT_TYPE_AGENT:
                return "已是代理商";
            case UserState.AGENT_TYPE_NOT_AGENT:
                return <Button
                    style={{padding: '.6rem 1rem'}}
                    color="success"
                    onClick={() => this.applyAgent()}>
                    申请成为代理商
                </Button>;
            case UserState.AGENT_TYPE_AGENT_APPLY_ING:
                return "申请中";
            case UserState.AGENT_TYPE_AGENT_APPLY_FAIL:
                return <Button
                    style={{padding: '.6rem 1rem'}}
                    color="success"
                    onClick={() => this.applyAgent()}>
                    审核失败，再次申请
                </Button>;
            default:
                return "未知状态";
        }

    };

    /**
     * 申请成为代理商
     */
    applyAgent = () => {
        this.setState({applyLing: true});
        this.props.userState.applyAgent()
            .then(res => {
                this.setState({applyLing: false});
                this.getConfig();
                this.alert("感谢您的支持，我们将在三个工作日内为您处理！", "申请提交成功");
            })
            .catch(err => this.setState({applyLing: false}));
    };

    uploadUserAvatarAction = (data) => {
        return this.props.userState.uploadUserAvatar(data)
            .then(res => this.props.userState.getUserInfo());
    };

    refreshStatistics() {
        this.props.statisticsState.getIndexStatisticsData();
    }

    logout() {
        this.setState({submiting: "logout"});
        this.props.userState.logout().then(res => {
            this.setState({submiting: false});
            this.linkTo(Path.PATH_LOGIN);
        }).catch(err => this.setState({submiting: false}));
    }

    getConfig = () => {
        this.props.userState.getConfigData();
    };

    changeFreeSing = () => {
        const {freeSing} = this.props.userState;
        if (freeSing === FREE_SING_TYPE_CLOSE) {
            return;
        }
        this.setState({submiting: "freeSign"});
        this.props.userState.onOffFreeSing()
            .then(res => {
                this.getConfig();
                this.setState({submiting: false});
            })
            .catch(err => this.setState({submiting: false}));
    };

    changePushMsg = () => {
        this.setState({submiting: "pushMsg"});
        this.props.userState.onOffNotice()
            .then(res => {
                this.getConfig();
                this.setState({submiting: false});
            })
            .catch(err => this.setState({submiting: false}));
    };
}
