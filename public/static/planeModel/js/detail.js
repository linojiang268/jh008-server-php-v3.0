var DetailPanel = React.createClass({
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
                var userDate = _this.state.user;
                userDate.vote_count += 1;
                _this.setState({user: userDate});
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
                        <li>身高：{this.state.user.height}</li>
                        <li>体重：{this.state.user.weight}</li>
                        <li>三围：{this.state.user.bwh}</li>
                        <li>鞋码：{this.state.user.shoe_size}</li>
                    </ul>
                    <div className="introduce">{this.state.user.intro}</div>
                    <a href="javascript:;" onClick={this.doVote} className="v-btn v-btn-red entryForm-btn">投TA一票</a>
                    <p className="tc introduce-tip1">本次大赛由"集合APP"独家承办网络投票统计</p>
                    <p className="tc introduce-tip1 hide">每人每天能投<span className="introduce-tip-sel">5</span>票（集合APP内<span className="introduce-tip-sel">4</span>票，微信分享<span className="introduce-tip-sel">1</span>票）</p>
                    <p className="tc introduce-tip1" >请到各大软件商城内下载"集合"</p>
                </div>
                
            </div>
        );
    }
});

module.exports = DetailPanel;