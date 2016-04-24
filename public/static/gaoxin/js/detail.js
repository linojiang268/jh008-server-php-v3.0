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
                    resp.gender = resp.gender == 1 ? '男' : '女'; 
                    resp.guest_apply = resp.guest_apply ? '是' : '否';
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
                        <span className="tip1">人气</span>
                        <span className="tip2">{this.state.user.vote_count}</span>
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
                        <li>性别：{this.state.user.gender}</li>
                        <li>年龄：{this.state.user.age}</li>
                        <li>职务：{this.state.user.position}</li>
                        <li>才艺：{this.state.user.talent}</li>
                        <li>年薪：{this.state.user.yearly_salary}</li>
                    </ul>
                    <p className="tl introduce-tip1">1、本次大赛由"集合"App独家承办网络人气票选</p>
                    <p className="tl introduce-tip1">2、每人每天能点赞<span className="introduce-tip-sel">9</span>次（集合App内<span className="introduce-tip-sel">4</span>次，微信分享<span className="introduce-tip-sel">5</span>次）</p>
                    <p className="tl introduce-tip1" >3、请到各大软件商城内下载"集合"</p>
                </div>
            </div>
        );
    }
});

module.exports = DetailPanel;