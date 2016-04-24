var HomePanel  = require('./home.js');
var EntryPanel = require('./entry.js');
var RulesPanel = require('./rules.js');
var Detail = require('./detail.js');
var DownloadPanel = require('./download.js');
var Footer = require('./footer.js');

function init() {
    // 路由应用入口
    var App = React.createClass({displayName: "App",
        render: function() {
            return (
                React.createElement("div", {className: "main"}, 
                    React.createElement("div", {className: "app", id: "app"}, 
                        this.props.isUs ? React.createElement(DownloadPanel, {isUs: true}) : React.createElement(RouteHandler, null)
                    ), 
                    React.createElement("footer", {className: "footer", id: "footer"}, 
                        React.createElement(Footer, null)
                    )
                )
            );
        }
    });

    // 定义页面上的路由
    var routes = (
        React.createElement(Route, {handler: App}, 
            React.createElement(Route, {name: "home", handler: HomePanel}), 
            React.createElement(Route, {name: "entry", handler: EntryPanel}), 
            React.createElement(Route, {name: "rules", handler: RulesPanel}), 
            React.createElement(Route, {name: "detail", path: "/user/:id", handler: Detail}), 
            React.createElement(Route, {name: "download", handler: DownloadPanel}), 
            React.createElement(DefaultRoute, {handler: HomePanel})
        )
    );

    // 将匹配的路由渲染到 DOM 中
    Router.run(routes, Router.HashLocation, function(Root, options){
        var routeName = options.path.split('/')[1] || 'home';
        if (routeName) {
            route_name = routeName;
        }

        if(mobile || openId) {
            React.render(React.createElement(Root, {datakey: route_name}), document.getElementById('vote'));
        } else {
            React.render(React.createElement(Root, {isUs: true, datakey: routeName}), document.getElementById('vote'));
        }
    });
}


if ((is_weixin && !openId)) {
    if (wechat_session == 0)
    {
        location.href = '/wap/wechat/oauth/go?redirect_url='+ location.origin +'/wap/shiyang&is_scope_userinfo=1';
    } else {
        K.aModal({
            title: '微信授权',
            content: '微信授权成功即可参与投票，点击确定去授权',
            okCallback: function() {
                location.href = '/wap/wechat/oauth/go?redirect_url='+ location.origin +'/wap/shiyang&is_scope_userinfo=1';
            }
        });
    }
} else {
    init();
}