/* 首页banner */
var HomeBanner = React.createClass({
    render: function() {
        return (
            <div className>
                <div className="banner">
                    <img src="/static/attendant/images/banner.jpg" className="res-img" alt="" />
                    <div className="banner-rel">
                        <div className="banner-text">
                            <img src="/static/attendant/images/show-text.png" alt="" />
                        </div>
                    </div>
                    <div className="banner-bot">
                        <div className="prize-con">
                            <div>
                                <div className="prize-item">
                                    <span className="prize-item-wrap prize-first-item">
                                        <img src="/static/attendant/images/first.png" alt="" />
                                    </span>
                                    <span className="prize-item-text">一等奖<span className="prize-item-sel-text">1名</span></span>
                                    <span className="prize-item-text">梅赛德斯-奔驰神秘大奖</span>
                                </div>
                            </div>
                            <ul className="prize-nav clearfix">
                                <li>
                                    <div className="prize-item">
                                        <span className="prize-item-wrap">
                                            <img src="/static/attendant/images/second.png" alt="" />
                                        </span>
                                        <span className="prize-item-text">二等奖<span className="prize-item-sel-text">2名</span></span>
                                        <span className="prize-item-text">三星 S6 一台</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="prize-item">
                                        <span className="prize-item-wrap">
                                            <img src="/static/attendant/images/third.png" alt="" />
                                        </span>
                                        <span className="prize-item-text">三等奖<span className="prize-item-sel-text">3名</span></span>
                                        <span className="prize-item-text">三星平板电脑</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="prize-item">
                                        <span className="prize-item-wrap">
                                            <img src="/static/attendant/images/fouth.png" alt="" />
                                        </span>
                                        <span className="prize-item-text">人气<span className="prize-item-sel-text">10</span>强</span>
                                        <span className="prize-item-text">精美礼品</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <a className="go-entry-btn" href="#entry">立即报名</a>
                    </div>
                </div>
                <div className="ads clearfix">
                    <ul className="adsNav clearfix">
                        <li>
                            <a href="http://www.capitamallsasia.com.cn/zh-cn/jinniu/">
                                <img src="/static/attendant/images/logo2.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.cdtenghao.com/">
                                <img src="/static/attendant/images/logo5.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.mercedes-benz.com.cn/">
                                <img src="/static/attendant/images/logo1.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.dianping.com/search/keyword/8/0_%E9%A9%BC%E8%83%8C%E7%81%AB%E9%94%85">
                                <img src="/static/attendant/images/logo3.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="http://fy.5153.com/s/main.html">
                                <img src="/static/attendant/images/logo4.png" alt="" />
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

        K.server.attendantList({page: _this.props.page + 1, size: 4}, function(resp) {
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
        this.getData();
    },    
    componentDidMount: function() {
        var _this = this;
        var datakey = _this.props.datakey;
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
            <ul className="votePhotos clearfix">
                {attendants.map(function(attendant){
                    return <VotePhoto data={attendant} />
                })}
            </ul>
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