var Share = require('./share.js');
var Search = require('./search.js');
/* 首页banner */
var HomeBanner = React.createClass({
    render: function() {
        return (
            <div className>
                <div className="banner">
                    <Share/>
                    <img src={prefix + "/static/gaoxin/images/banner.jpg"} className="res-img" alt="banner" />
                    <div className="banner-bot">
                        <div className="prize-con hide mt15">
                            <div>
                                <div className="prize-item">
                                    <span className="prize-item-wrap">
                                        <img src="/static/gaoxin/images/first.png" alt="" />
                                    </span>
                                    <span className="prize-item-text mt5">一等奖 <i className="prize-item-text1">1名</i></span>
                                    <span className="prize-item-text">iphone 6s 1台</span>
                                </div>
                                <div className="prize-item fl">
                                    <span className="prize-item-wrap mt5">
                                        <img src="/static/gaoxin/images/seconds.png" alt="" />
                                    </span>
                                    <span className="prize-item-text">二等奖 <i className="prize-item-text1">2名</i></span>
                                    <span className="prize-item-text">礼品为神秘礼品现场揭晓</span>
                                </div>
                                <div className="prize-item fr">
                                    <span className="prize-item-wrap mt5">
                                        <img src="/static/gaoxin/images/seconds.png" alt="" />
                                    </span>
                                    <span className="prize-item-text">三等奖 <i className="prize-item-text1">3名</i></span>
                                    <span className="prize-item-text">礼品为神秘礼品现场揭晓</span>
                                </div>
                            </div>
                        </div>
                        <a className="go-entry-btn go-entry-btn-end clearfix" href="javascript:;">报名结束</a>
                    </div>
                    <p className="ac-tip">本活动奖品与苹果公司无关</p>
                    <div className="organization-w hide">
                        <p>主办单位：高新区党工委管委会</p>
                        <p>承办单位：高新区党群工作局、高新区石羊街道办事处</p>
                        <p>协办单位：成都高新区青春同路单身青年俱乐部</p>
                    </div>
                </div>
                <Search/>
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
        /*var imgCon = $(this.refs.imgCon.getDOMNode());
        if (!cache.width) {
            cache.width = imgCon.width();
        }
        imgCon.height(cache.width);*/
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
    componentWillReceiveProps: function(nextProps){
        this.setState({vote_count: nextProps.data.vote_count});
    },
    render: function() {
        var data = this.props.data,
            id = data.id;
        return (                                                                                                                                                                                                               
            <li className="vote-photo" ref="voteItem">
                <Link className="vote-photo-link" to="detail" data-id={id} params={{id: this.props.data.id}}>
                    <div ref="imgCon" id="imgCon" className="vote-photo-item-w"><img className="photo" src={this.props.data.cover_url} alt="" /></div>
                    <div className="vote-photo-content">
                        <span className="name">{this.props.data.name}</span>
                        <div className="clearfix mt5">
                            <span className="number">编号：{this.props.data.id}</span>
                            <span className="ticket">
                                <span className="ticket-num">{this.state.vote_count}</span>
                            </span>
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
    sortHandler:function(callback){
        var _this = this;
        var attendants = [];

        var sortBtn = this.refs.sortBtn && $(this.refs.sortBtn.getDOMNode());

        this.props.page = 0;
        _this.props.end = false;

        K.server.attendantSortList({page: _this.props.page + 1, size: 4}, function(resp) {
            _this.loadMask.hide();
            if (resp.code == 0) {
                sortBtn.addClass('on').siblings().removeClass('on');

                if (resp.pages > _this.props.page) {
                    _this.props.page += 1; 
                }

                var attendantsResult = attendants.concat(resp.attendants);
                _this.setState({attendants: attendantsResult});                
                               
                if (resp.pages == _this.props.page) {
                    _this.props.end = true;
                }
            } else {
                alert(resp.message || '获取数据出错了,请重新打开页面试试');
            }
        });
    },
    listHandler: function(){
        var _this = this;
        var dBtn = this.refs.defaultBtn && $(this.refs.defaultBtn.getDOMNode()),
            sBtn = this.refs.sortBtn && $(this.refs.sortBtn.getDOMNode());
        dBtn && dBtn.addClass('on');
        sBtn && sBtn.removeClass('on');

        this.props.end = false;
        this.props.page = 0;
        this.setState({attendants:[]});
    },
    getData: function(callback) {
        console.log('getData');
        var _this = this;
        var attendants = _this.state.attendants;
        var sortBtn = this.refs.sortBtn && $(this.refs.sortBtn.getDOMNode());

        if ( !sortBtn ) return false;

        if (_this.props.end) return false;

        if (_this.loadMask) {
            _this.loadMask.show();
            $('#app').scrollTop(10000000);
        }

        if ( sortBtn.hasClass('on') ) {
            K.server.attendantSortList({page: _this.props.page + 1, size: 4}, function(resp) {
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
                } else {
                    alert(resp.message || '获取数据出错了,请重新打开页面试试');
                    callback && callback();
                }
            });
        } else {
            console.log('default1');
            K.server.attendantList({page: _this.props.page + 1}, function(resp) {
                _this.loadMask.hide();
                console.log('default');
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
        }
    },
    componentWillMount: function() {
        console.log('componentWillMount');
        this.props.page = 0;
        this.props.end = false;
        /*this.getData();*/
    },    
    componentDidMount: function() {
        console.log('componentDidMount');
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
        console.log('render');
        return (
            <div ref="vphotos">
                <div className="sort-w">
                    <button ref="defaultBtn" className="default-btn on" onClick={this.listHandler}>选手列表</button>
                    <button ref="sortBtn" className="sort100-btn" onClick={this.sortHandler}>点击查看 Top 100</button>
                </div>
                <ul className="votePhotos clearfix">
                    {attendants.map(function(attendant){
                        if ( attendant ) {
                            return <VotePhoto data={attendant} />
                        };
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
/*
    componentWillUnmount: function() {
        $('#app2').off('scroll', this.scrollHandler);
    },
    componentDidMount: function(){
        $('#app2').on('scroll', this.scrollHandler);
    },*/
    render: function() {
        var datakey = this.props.datakey;
        return (
            <div className="homePanel" >
                <HomeBanner />
                <VotePhotos datakey={datakey} />
            </div>
        );
    }
});

module.exports = HomePanel;