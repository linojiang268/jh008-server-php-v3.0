var Share = require('./share.js');
/* 首页banner */
var HomeBanner = React.createClass({
    getInitialState: function(){
        return {
            activity_states: false
        }
    },
    activityState: function(){
        return this.state.activity_states ? <a className="go-entry-btn" href="#entry">立即报名</a> : false;
    },
    render: function() {
        return (
            <div className>
                <div className="banner">
                    <Share/>
                    <img src={prefix + "/static/planeModel/images/banner.jpg"} className="res-img" alt="" />
                    <div className="banner-bot">
                        <p className="tip_w_1">报名条件</p>
                        <p className="tip_w_1">在读女大学生，身高158cm以上，形象气质佳选手</p>
                        <p className="tip_w_1">报名时间</p>
                        <p className="tip_w_1">2015年10月09日至2015年10月24日</p>
                        <div className="prize-con mt15">
                            <div>
                                <div className="prize-item">
                                    <span className="prize-item-wrap prize-first-item">
                                        <img src="/static/planeModel/images/first.png" alt="" />
                                    </span>
                                    <span className="prize-item-text1 mt15">3名 胜出选手</span>
                                    <span className="prize-item-text mt15">获胜选手可与公司签约三年</span>
                                    <span className="prize-item-text">并获得相应的奖金及产品</span>
                                </div>
                            </div>
                        </div>
                        {this.activityState()}
                        <p className="ac-tip">（本活动奖品与苹果公司无关）</p>
                    </div>
                </div>
                <div className="ads clearfix">
                    <ul className="adsNav adsNav-4 clearfix">
                        <li>
                            <a href="javascrpt:;">
                                <img src="/static/planeModel/images/logo1.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="javascrpt:;">
                                <img src="/static/planeModel/images/logo2.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="javascrpt:;">
                                <img src="/static/planeModel/images/logo3.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="javascrpt:;">
                                <img src="/static/planeModel/images/logo4.png" alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

var cache = {};

/* 投票照片 */
var VotePhoto = React.createClass({
    getInitialState: function() {
        return {
            vote_count: 0,
        }
    },
    componentDidMount: function() {
        var imgCon = $(this.refs.imgCon.getDOMNode());
        if (!cache.width) {
            cache.width = imgCon.width();
        }
        imgCon.height(cache.width);
        var vote_count = this.props.data.vote_count || 0;
        this.setState({vote_count: vote_count});
    },
    doVote: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var params = {};
        var _this = this;
        params.voter = mobile || openId;
        params.type = mobile ? 1 : openId ? 2 : '';
        params.user = this.props.data.id;
        K.server.attendantVote(params, function(resp) {
            var text = '',
                title = '提示';
            if (resp.code == 0) {
                alert('投票成功');
                _this.setState({vote_count: _this.state.vote_count + 1});
                return;
            } else if (resp.code == 1) {
                text = '<p class="tl">对不起，今天您已投满4票，请明天再来^_^</p><p class="tl">您可以分享给朋友，邀请他们一起投票。</p>';

            } else if (resp.code == 2) {
                text = '<p class="tl">对不起，今天您已经投过票了，请明天再来^_^</p><p class="tl">您可以下载“集合APP”每天增加4次投票机会。</p>';
            } else {
                text = '网络不给力，请重试';
                title = '投票失败';
            }

            K.aModal({
                title: title,
                content: text,
                okCallback: function() {
                    if (resp.code == 2) {
                        location.hash = 'download';
                    }
                }
            });   
        });
    },
    render: function() {
        var data = this.props.data;
        return (                                                                                                                                                                                                               
            <li className="vote-photo">
                <Link className="vote-photo-link" to="detail" params={{id: this.props.data.id}}>
                    <div ref="imgCon" id="imgCon" className="vote-photo-item-w"><img className="photo" src={this.props.data.cover_url} alt="" /></div>
                    <div className="vote-photo-content">
                        <span className="name">{this.props.data.name}</span>
                        <div className="clearfix mt5">
                            <span className="number">编号：{this.props.data.id}</span>
                            <span className="ticket">
                                <span className="ticket-num">{this.state.vote_count}</span>票
                            </span>
                        </div>
                        <div className="tc">
                            <span href="javascrpt:;" onClick={this.doVote} className="v-btn v-btn-red vote-btn">投TA一票</span>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
});

/* 投票照片墙 */
var VotePhotos = React.createClass({
    getInitialState: function() {
        return {
            attendants: []
        };
    },   
    getData: function(callback) {
        var _this = this;
        var attendants = _this.state.attendants;

        if (_this.props.end) 
            return false;

        if (_this.loadMask) {
            _this.loadMask.show();
            $('#app').scrollTop(10000000);
        }

        K.server.attendantList({page: _this.props.page + 1, size: 4}, function(resp) {
            _this.loadMask.hide();
            if (resp.code == 0) {
                if (resp.pages > _this.props.page) {
                    _this.props.page += 1; 
                }

                var attendantsResult = attendants.concat(resp.attendants);
                _this.setState({attendants: attendantsResult});                
                               
                if (resp.pages == _this.props.page) {
                    _this.props.end = true;
                }
                callback && callback();
                //setTimeout(function(){
                //    _this.myScroll.refresh();
                //}, 100);
            } else {
                alert(resp.message || '获取数据出错了,请重新打开页面试试');
                callback && callback();
            }
        });
    },
    componentWillMount: function() {
        this.props.page = 0;
        this.props.end = false;
        //this.getData();
    },    
    componentDidMount: function() {
        var _this = this;
        var datakey = _this.props.datakey;
        this.loadMask = $(_this.refs.vphotos.getDOMNode()).find('.load-div');
        this.getData();
       /* _this.myScroll = new IScroll('#appCon', { scrollY: true, scrollbars: 'custom' });
        var fn = K.throttle(function(){
            _this.getData(function(){
                if (_this.props.end) {
                    alert('已经是所有用户了');
                } else {
                    // fn({result: 1});
                }
            });
        }, 500);
        _this.myScroll.on('scrollEnd', fn);*/
        //$('#appCon').bind('touchmove', function (e) { e.preventDefault(); }, false);
        K.checkScrollToBottom({
            filter: datakey,
            callback: function(fn) {
                _this.getData(function(){
                    if (_this.props.end) {
                        fn({result: 0})
                    } else {
                        fn({result: 1});
                    }
                });
            },
            tip: function() {
                if (route_name == 'home') {
                    alert('已经是所有用户了');
                }
            },
            el: $('#app')
        });
    },
    render: function() {
        var attendants = this.state.attendants;
        return (
            <div ref="vphotos">
                <ul className="votePhotos clearfix">
                    {attendants.map(function(attendant){
                        return <VotePhoto data={attendant} />
                    })}
                </ul>
                <div className="load-div">
                    <span className="load-img"></span>
                    <span className="load-text">正在加载中...</span>
                </div>
            </div>
        );
    }
});

/* home panel */
var HomePanel = React.createClass({
    render: function() {
        var datakey = this.props.datakey;
        return (
            <div>
                <HomeBanner />
                <VotePhotos datakey={datakey} />
            </div>
        );
    }
});

module.exports = HomePanel;