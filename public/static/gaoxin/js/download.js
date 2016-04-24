var DownloadApp = React.createClass({
    componentDidMount: function() {
        var android = $(this.refs.android.getDOMNode()),
            ios     = $(this.refs.ios.getDOMNode());

        android.click(function(e) {
            var loading = K.loadingButton($(this)).load();
            K.testApp('joinTeam', function() {
                loading.unload();
            });
            e.preventDefault();
            e.stopPropagation();
        });

        ios.click(function(e) {
            var loading = K.loadingButton($(this)).load();
            K.testApp('joinTeam', function() {
                loading.unload();
            });
            e.preventDefault();
            e.stopPropagation();
        });
    },
    render: function() {
        var isUs = this.props.isUs;
        return (
            <div className="download-page">
                <div className="inner-page t-b"><img src="/static/attendant/images/juchi1.png" className="res-img" alt="" /></div> 
                <div className="inner-page dl-content shadow">
                    {isUs ? <p className="download-page-error">请使用微信浏览器或者下载集合App打开</p> : ''}
                    <div className="dl-logo-w dl-w"><img src="/static/attendant/images/ICON_2x.png" alt="" /></div>
                    <div className="dl-name-w dl-w"><img src="/static/attendant/images/logoh5.png" alt="" /></div>
                    <a ref="android" data-text="" className="dl-android-link" href="http://dev.file.jhla.com.cn/app/android/jihe.apk"></a>
                    <a ref="ios" data-text="" className="dl-iphone-link" href="https://itunes.apple.com/cn/app/ji-he-zhao-huo-dong-jiao-peng/id935532535?l=en&mt=8"></a>
                          
                </div>
                <div className="inner-page  b-b"><img src="/static/attendant/images/juchi.png" className="res-img" alt="" /></div> 
            </div>
        );
    }
});

var DownloadQrcode = React.createClass({
    render: function() {
        return (
            <div className="download-page">
                <div className="download-qrcode-w">
                    <img src="/static/attendant/images/qrcode.jpg" alt="" />
                </div>
            </div>
        );
    }
});

var DownloadPanel = React.createClass({
    render: function() {
        var isUs = this.props.isUs;
        return (
            <div className="downloadPanel">
                <div id="main" className="wrap-page">
                    {mobile ? <DownloadQrcode /> : <DownloadApp isUs={isUs} />}
                </div>
            </div>
        );
    }
});

module.exports = DownloadPanel;