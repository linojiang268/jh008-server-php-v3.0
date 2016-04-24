// 底部
var Footer = React.createClass({
    getInitialState: function(){
        /**
         * @param {bool} [inApp] [true:在app中打开]
         * @param {bool} [activity_state] [true:活动进行中。false:活动已结束。]
         * 
         */
        return { 
            inApp: false, 
            activity_state: false
        };
    },
    componentDidMount: function() {
        if ( mobile ) {
            this.setState({ inApp: true });
        }
    },
    activityStates:  function(){
        var inAppState = this.state.inApp,
            activityState = this.state.activity_state;
        if ( inAppState && !activityState ) {
            return "footerNav inApp ac-ended clearfix";
        }else if ( inAppState && activityState ) {
            return "footerNav inApp clearfix"
        }else if ( !inAppState && !activityState ) {
            return "footerNav ac-ended clearfix"
        }else if ( !inAppState && activityState ) {
            return "footerNav clearfix"
        }
    },
    render: function() {
        var key = route_name;
        return (
            <nav className={this.activityStates()}>
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

module.exports = Footer;