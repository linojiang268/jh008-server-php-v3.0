var Detail = React.createClass({
    mixins: [StateMixin],
    getInitialState: function() {
        return {
            user: {}
        } 
    },
    componentWillMount: function() {
        var _this = this;
        // ajax 获取 用户数据
        var id = this.getParams().id;
        K.server.attendantDetail({
            attendant: id
        }, function(resp){
            if (resp.code == 0) {
                var data = _this.state.user;
                if ((data && data.id) != resp.id) {
                    _this.setState({user: resp});
                }
            } else {
                alert(resp.message || '获取用户信息出错了'); 
            }
        });
    },
    doVote: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var params = {};
        var _this = this;
        params.voter = mobile || openId;
        params.type = mobile ? 1 : openId ? 2 : '';
        params.user = this.state.user.id;
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
        return (
            <div className="detailPanel">
                <div className="detailPanel-top">
                    <p className="bar">
                        <span className="bar-tip">编号：{this.state.user.id}</span>
                    </p>
                    <span className="bar-name">{this.state.user.name}</span>
                </div>
                <div className="detailPanel-rank clearfix">
                    <div className="rank-item rank-item-b">
                        <span className="tip1">编号：{this.state.user.id}</span>
                        <span className="tip2">{this.state.user.vote_count}票</span>
                    </div>
                    <div className="rank-item">
                        <span className="tip1">当前排名</span>
                        <span className="tip2">{this.state.user.vote_sort ? '第' + this.state.user.vote_sort + '名' : ''}</span>
                    </div>
                </div>
                <div className="detailPanel-content">
                    {this.state.user.images_url ? this.state.user.images_url.map(function(photo){
                        return <div className="photo-wrap"><img src={photo} /></div>
                    }) : ''}
                    <ul className="detailPanel-info clearfix">
                        <li>学校：{this.state.user.school}</li>
                        <li>专业：{this.state.user.major}</li>
                        <li>学历：{this.state.user.education}</li>
                        <li>毕业时间：{this.state.user.graduation_time}</li>
                        <li>特长：{this.state.user.speciality}</li>
                        <li>身高：{this.state.user.height}</li>
                        <li className="al">格言：{this.state.user.motto}</li>
                    </ul>
                    <div className="introduce">{this.state.user.introduction}</div>
                    <a href="javascript:;" onClick={this.doVote} className="v-btn v-btn-red entryForm-btn">投TA一票</a>
                    <p className="tc introduce-tip1">本次大赛由"集合APP"独家承办网络投票统计</p>
                    <p className="tc introduce-tip1">每人每天能投<span className="introduce-tip-sel">5</span>票（集合APP内<span className="introduce-tip-sel">4</span>票，微信分享<span className="introduce-tip-sel">1</span>票）</p>
                </div>
                <div className="down-w down-banner mt10">
                    <div className="down-wrap">
                        <div className="p10">
                            <div className="dl-banner clearfix">
                                <a className="logo">
                                </a>
                                <a id="downloadBannerBtn"  href="#download" className="btn-green" data-text="立即下载客户端">
                                    立即下载客户端
                                </a>
                            </div>
                        </div>         
                    </div>
                </div>
            </div>
        );
    }
});