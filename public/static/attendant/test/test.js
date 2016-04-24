

function init(){
    // init
    //React.render(<Footer />, document.getElementById('footer'));

    // 路由应用入口
    var App = React.createClass({
        render: function() {
            return (
                <div className="main">
                    <div className="app" id="app">
                        {this.props.isUs ? <DownloadPanel isUs={true} /> : <RouteHandler />}
                    </div>
                    <footer className="footer" id="footer">
                        <Footer />
                    </footer>
                </div>
            );
        }
    });

    // 定义页面上的路由
    var routes = (
        <Route handler={App}>
            <Route name="home" handler={HomePanel} />
            <Route name="entry" handler={EntryPanel} />
            <Route name="rules" handler={RulesPanel} />
            <Route name="download" handler={DownloadPanel} />
            <Route name="detail" path="/user/:id" handler={Detail} />
            <DefaultRoute handler={HomePanel} />
        </Route>
    );

    // 将匹配的路由渲染到 DOM 中
    Router.run(routes, Router.HashLocation, function(Root, options){
        var routeName = options.path.split('/')[1] || 'home';
        if (routeName) {
            route_name = routeName;
        }

        if(mobile || openId) {
            React.render(<Root datakey={route_name} />, document.getElementById('vote'));
        } else {
            React.render(<Root isUs={true}  datakey={routeName} />, document.getElementById('vote'));
        }
    });
}

if ((is_weixin && !openId)) {
    if (wechat_session == 0)
    {
        location.href = '/wap/wechat/oauth/go?redirect_url='+ location.origin +'/wap/attendant&is_scope_userinfo=1';
    } else {
        K.aModal({
            title: '微信授权',
            content: '微信授权成功即可参与投票，点击确定去授权',
            okCallback: function() {
                location.href = '/wap/wechat/oauth/go?redirect_url='+ location.origin +'/wap/attendant&is_scope_userinfo=1';
            }
        });
    }
} else {
    init();
}
