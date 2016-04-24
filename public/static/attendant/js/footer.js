// 底部
var Footer = React.createClass({
    render: function() {
        var key = route_name;
        return (
            <nav className="footerNav clearfix">
                <li className={key == 'home' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}>
                    <a className="footerNav-link footerNav-link-home" href="#home">
                        <i className="footerNav-icon footerNav-icon-home"></i>
                        <span>首页</span>
                    </a>
                </li>
                <li className={key == 'entry' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}>
                    <a className="footerNav-link footerNav-link-entry" href="#entry">
                        <i className="footerNav-icon footerNav-icon-entry"></i>
                        <span>我要报名</span>
                    </a>
                </li>
                <li className={key == 'rules' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}>
                    <a className="footerNav-link footerNav-link-rule" href="#rules">
                        <i className="footerNav-icon footerNav-icon-rule"></i>
                        <span>大赛规则</span>
                    </a>
                </li>
                <li className={key == 'download' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}>
                    <a className="footerNav-link footerNav-link-download" href="#download">
                        <i className="footerNav-icon footerNav-icon-download"></i>
                        <span>下载</span>
                    </a>
                </li>
            </nav>
        );
    }
});

/*<li className="footerNav-item">
    <a className="footerNav-link footerNav-link-ranklist" href="#ranklist">
        <i className="footerNav-icon footerNav-icon-ranklist"></i>
        <span>排行榜</span>
    </a>
</li>*/