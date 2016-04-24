
// 底部
var Footer = React.createClass({displayName: "Footer",
    render: function() {
        var key = route_name;
        return (
            React.createElement("nav", {className: "footerNav clearfix"}, 
                React.createElement("li", {className: key == 'home' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}, 
                    React.createElement("a", {className: "footerNav-link footerNav-link-home", href: "#home"}, 
                        React.createElement("i", {className: "footerNav-icon footerNav-icon-home"}), 
                        React.createElement("span", null, "首页")
                    )
                ), 
               /* React.createElement("li", {className: key == 'entry' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}, 
                    React.createElement("a", {className: "footerNav-link footerNav-link-entry", href: "#entry"}, 
                        React.createElement("i", {className: "footerNav-icon footerNav-icon-entry"}), 
                        React.createElement("span", null, "我要报名")
                    )
                ), */
                React.createElement("li", {className: key == 'rules' ? 'footerNav-item footerNav-item-act' : 'footerNav-item'}, 
                    React.createElement("a", {className: "footerNav-link footerNav-link-rule", href: "#rules"}, 
                        React.createElement("i", {className: "footerNav-icon footerNav-icon-rule"}), 
                        React.createElement("span", null, "大赛规则")
                    )
                )
            )
        );
    }
});

/* 首页banner */
var HomeBanner = React.createClass({displayName: "HomeBanner",
    render: function() {
        return (
            React.createElement("div", {className: true}, 
                React.createElement("div", {className: "banner"}, 
                    React.createElement("img", {src: prefix + "/static/attendant/images/banner.jpg", className: "res-img", alt: ""}),
                    React.createElement("div", {className: "banner-rel"}, 
                        React.createElement("div", {className: "banner-text"}, 
                            React.createElement("img", {src: "/static/attendant/images/show-text.png", alt: ""})
                        )
                    ), 
                    React.createElement("div", {className: "banner-bot"}, 
                        React.createElement("div", {className: "prize-con"}, 
                            React.createElement("div", null, 
                                React.createElement("div", {className: "prize-item"}, 
                                    React.createElement("span", {className: "prize-item-wrap prize-first-item"}, 
                                        React.createElement("img", {src: "/static/attendant/images/first.png", alt: ""})
                                    ), 
                                    React.createElement("span", {className: "prize-item-text"}, "一等奖", React.createElement("span", {className: "prize-item-sel-text"}, "1名")), 
                                    React.createElement("span", {className: "prize-item-text"}, "梅赛德斯-奔驰神秘大奖")
                                )
                            ), 
                            React.createElement("ul", {className: "prize-nav clearfix"}, 
                                React.createElement("li", null, 
                                    React.createElement("div", {className: "prize-item"}, 
                                        React.createElement("span", {className: "prize-item-wrap"}, 
                                            React.createElement("img", {src: "/static/attendant/images/second.png", alt: ""})
                                        ), 
                                        React.createElement("span", {className: "prize-item-text"}, "二等奖", React.createElement("span", {className: "prize-item-sel-text"}, "2名")), 
                                        React.createElement("span", {className: "prize-item-text"}, "三星 S6 一台")
                                    )
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("div", {className: "prize-item"}, 
                                        React.createElement("span", {className: "prize-item-wrap"}, 
                                            React.createElement("img", {src: "/static/attendant/images/third.png", alt: ""})
                                        ), 
                                        React.createElement("span", {className: "prize-item-text"}, "三等奖", React.createElement("span", {className: "prize-item-sel-text"}, "3名")), 
                                        React.createElement("span", {className: "prize-item-text"}, "三星平板电脑")
                                    )
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("div", {className: "prize-item"}, 
                                        React.createElement("span", {className: "prize-item-wrap"}, 
                                            React.createElement("img", {src: "/static/attendant/images/fouth.png", alt: ""})
                                        ), 
                                        React.createElement("span", {className: "prize-item-text"}, "人气", React.createElement("span", {className: "prize-item-sel-text"}, "10"), "强"), 
                                        React.createElement("span", {className: "prize-item-text"}, "精美礼品")
                                    )
                                )
                            )
                        ), 
                        // React.createElement("a", {className: "go-entry-btn", href: "#entry"}, "立即报名")
                        React.createElement("a", {className: "go-entry-btn go-entry-end", href: "javascrpt:;"}, "报名结束")
                    ),
                    React.createElement("p", {className: "ac-tip"}, "本活动奖品与苹果公司无关")
                ), 
                React.createElement("div", {className: "ads clearfix"}, 
                    React.createElement("ul", {className: "adsNav clearfix"}, 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "http://www.capitamallsasia.com.cn/zh-cn/jinniu/"}, 
                                React.createElement("img", {src: "/static/attendant/images/logo2.png", alt: ""})
                            )
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "http://www.cdtenghao.com/"}, 
                                React.createElement("img", {src: "/static/attendant/images/logo5.png", alt: ""})
                            )
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "http://www.mercedes-benz.com.cn/"}, 
                                React.createElement("img", {src: "/static/attendant/images/logo1.png", alt: ""})
                            )
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "http://www.dianping.com/search/keyword/8/0_%E9%A9%BC%E8%83%8C%E7%81%AB%E9%94%85"}, 
                                React.createElement("img", {src: "/static/attendant/images/logo3.png", alt: ""})
                            )
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "http://fy.5153.com/s/main.html"}, 
                                React.createElement("img", {src: "/static/attendant/images/logo4.png", alt: ""})
                            )
                        )
                    )
                )
            )
        );
    }
});

var cache = {};

/* 投票照片 */
var VotePhoto = React.createClass({displayName: "VotePhoto",
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
        K.aModal({
            content:"本次大赛报名已结束。"
        });
        return;
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
            React.createElement("li", {className: "vote-photo"}, 
                React.createElement(Link, {className: "vote-photo-link", to: "detail", params: {id: this.props.data.id}}, 
                    React.createElement("div", {ref: "imgCon", id: "imgCon", className: "vote-photo-item-w"}, React.createElement("img", {className: "photo", src: this.props.data.cover_url, alt: ""})), 
                    React.createElement("div", {className: "vote-photo-content"}, 
                        React.createElement("span", {className: "name"}, this.props.data.name), 
                        React.createElement("div", {className: "clearfix mt5"}, 
                            React.createElement("span", {className: "number"}, "编号：", this.props.data.id), 
                            React.createElement("span", {className: "ticket"}, 
                                React.createElement("span", {className: "ticket-num"}, this.state.vote_count), "票"
                            )
                        )
                      /*  React.createElement("div", {className: "tc"}, 
                            React.createElement("span", {href: "javascrpt:;", onClick: this.doVote, className: "v-btn v-btn-red vote-btn"}, "投TA一票")
                        )*/
                    )
                )
            )
        );
    }
});

/* 投票照片墙 */
var VotePhotos = React.createClass({displayName: "VotePhotos",
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

        if (_this.loadMask) {
            _this.loadMask.show();
            $('#app').scrollTop(10000000);
        }

        K.server.attendantList({page: _this.props.page + 1, size: 4}, function(resp) {
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
        //this.getData();
    },    
    componentDidMount: function() {
        var _this = this;
        var datakey = _this.props.datakey;
        this.loadMask = $(_this.refs.vphotos.getDOMNode()).find('.load-div');
        this.getData();
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
            React.createElement("div", {ref: 'vphotos'}, 
                React.createElement("ul", {className: "votePhotos clearfix"}, 
                    attendants.map(function(attendant){
                        return React.createElement(VotePhoto, {data: attendant})
                    })
                ),
                React.createElement('div', {className: 'load-div'},
                    React.createElement('span', {className: 'load-img'}),
                    React.createElement('span', {className: 'load-text'}, '正在加载中...')
                )
            )
        );
    }
});

/* home panel */
var HomePanel = React.createClass({displayName: "HomePanel",
    render: function() {
        var datakey = this.props.datakey;
        return (
            React.createElement("div", null, 
                React.createElement(HomeBanner, null), 
                React.createElement(VotePhotos, {datakey: datakey})
            )
        );
    }
});


var EntryPanel = React.createClass({displayName: "EntryPanel",
    getInitialState: function() {
        return {
            user:{
               /* name: parent.find('input[name="name"]'),
                gender: parent.find('input[name="name"]'),
                age: parent.find('input[name="name"]'),
                height: parent.find('input[name="name"]'),
                specialty: parent.find('input[name="name"]'),
                school: parent.find('input[name="name"]'),
                major: parent.find('input[name="name"]'),
                education: parent.find('input[name="name"]'),
                graduation_time: parent.find('input[name="name"]'),
                ident_code: parent.find('input[name="name"]'),
                mobile: parent.find('input[name="name"]'),
                wechat_id: parent.find('input[name="name"]'),
                email: parent.find('input[name="name"]'),*/
                images_url: []
                /*motto: parent.find('input[name="name"]'),
                introduction: ''*/
            }
        }
    },
    componentDidMount: function() {
        var parent = $(this.refs.entryForm.getDOMNode());
        var btns = parent.find('#uploadBtn');
        var uploadingDiv = parent.find('.uploading-div');
        var that = this;
        var _token = $('input[name="_token"]').val();

        $('#app').scrollTop(0);
        $('input[type="file"]').ajaxfileupload({
          'action': '/wap/attendant/image/tmp/upload',
          'params': {
            '_token': $('input[name="_token"]').val()
          },
          'onComplete': function(response) {
            uploadingDiv.hide();
            if (response.code == 0) {
                that.addPhoto(response.image_url);
            } else {
                alert(response.messages || '上传照片出错了!');
            }
          },
          'onStart': function() {
            //if(weWantedTo) return false; // cancels upload
            var user = that.state.user;
            if (user.images_url.length >= 5) {
                alert('最多只能上传5张');
                return false;
            }
            uploadingDiv.show();
          },
          'onCancel': function() {
            uploadingDiv.hide();
          }
        }); 

    },
    addPhoto: function(photo) {
        var user = this.state.user;
        user.images_url.push(photo);
        this.setState({user: user});
    },
    submitHandler: function() {
        var parent = $(this.refs.entryForm.getDOMNode()),
            result = {};
            result.name          = parent.find('input[name="name"]').val(),
            result.gender        = parent.find('input[name="gender"]:checked').val(),
            result.age           = parent.find('input[name="age"]').val(),
            result.height        = parent.find('input[name="height"]').val(),
            result.speciality     = parent.find('input[name="speciality"]').val(),
            result.school        = parent.find('input[name="school"]').val(),
            result.major         = parent.find('input[name="major"]').val(),
            result.education     = parent.find('input[name="education"]').val(),
            result.graduation_time = parent.find('input[name="graduation_time"]').val(),
            result.ident_code     = parent.find('input[name="ident_code"]').val(),
            result.mobile         = parent.find('input[name="mobile"]').val(),
            result.wechat_id      = parent.find('input[name="wechat_id"]').val(),
            result.email          = parent.find('input[name="email"]').val(),
            //images_url: []
            result.motto          = parent.find('input[name="motto"]').val(),
            result.introduction   = parent.find('textarea[name="introduction"]').val();

        if (!result.name) {
            alert('姓名不能为空');
        } else if (!parent.find('input[name="gender"]:checked').length) {
            alert('请选择性别')
        } else if (!result.age) {
            alert('年龄不能为空');
        } else if (!this.state.user.images_url.length) {
            alert('至少需要上传一张照片');
        } else {
            result.images_url = this.state.user.images_url;
            K.server.enroll(result, function(resp) {
                if (resp.code == 0) {
                    K.aModal({
                        title: '提交成功！',
                        content: '<p class="tl">报名信息提交成功，请等待主委会审核，保持通讯畅通。</p><p class="tl">咨询热线：400-876-1176</p>',
                        okCallback: function() {
                            location.hash = '/home'
                        }
                    });
                } else {
                    alert(resp.message || '报名申请提交失败');
                }
            });
        }
    },
    render: function() {
        var username = this.state.user.username;
        return (
            React.createElement("div", {ref: "entryForm", className: "entryForm"}, 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("h1", {className: "entryForm-title"}, "请填写报名信息")
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "姓名"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "name"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "性别"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("div", {className: "radio-w"}, React.createElement("label", {className: "radio-label", for: ""}, "男"), React.createElement("input", {type: "radio", name: "gender", value: "0"})), 
                        React.createElement("div", {className: "radio-w"}, React.createElement("label", {className: "radio-label", for: ""}, "女"), React.createElement("input", {type: "radio", name: "gender", value: "1"}))
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "年龄"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "age", placeholder: "填写数字，如：20"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "身高"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "height", placeholder: "填写数字，如：170"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "特长"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "speciality"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "学校"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "school"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "专业"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "major"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "学历"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "education"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "毕业时间"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "graduation_time", placeholder: "在校生请填写预计毕业的时间,如：2015-06"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "身份证号"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "ident_code"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "手机号"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "mobile"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "微信号"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "wechat_id"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "邮箱"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "email"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "个人照片"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        this.state.user.images_url.map(function(image){
                            return React.createElement("div", {className: "photo-wrap mb10"}, React.createElement("img", {src: image, alt: ""}))
                        }), 
                        React.createElement("div", {className: "clearfix"}, 
                            React.createElement("div", {className: "file-con"}, 
                                React.createElement("span", {className: "file-text"}, "+"), 
                                React.createElement("input", {className: "file-input", type: "file", name: "image"})
                            ), 
                            React.createElement("p", {className: "upload-t"}, "建议上传\"竖构图\"，可实现最佳浏览效果。每人最多上传5张照片。建议照片小于3M。")
                        ), 
                        React.createElement("div", {className: "uploading-div"}, 
                            React.createElement("span", {className: "uploading-icon"}), 
                            React.createElement("span", {className: "uploading-text"}, "图片正在上传中...")
                        )
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "格言"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("input", {type: "text", className: "entryForm-input", name: "motto"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item"}, 
                    React.createElement("label", {for: "", className: "entryForm-name"}, "简历"), 
                    React.createElement("div", {className: "entryForm-wrap"}, 
                        React.createElement("textarea", {type: "text", className: "entryForm-textarea", placeholder: "限100字", name: "introduction"})
                    )
                ), 
                React.createElement("div", {className: "entryForm-item tc"}, 
                    React.createElement("a", {href: "javascript:;", onClick: this.submitHandler, className: "v-btn v-btn-yellow entryForm-btn"}, "提交")
                )
            )
        );
    }
});

var RulesPanel = React.createClass({displayName: "RulesPanel",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("img", {className: "res-img", src: "/static/attendant/images/rules.jpg"})
            )
        );
    }
});


var DownloadApp = React.createClass({displayName: "DownloadApp",
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
            React.createElement("div", {className: "download-page"}, 
                React.createElement("div", {className: "inner-page t-b"}, React.createElement("img", {src: "/static/attendant/images/juchi1.png", className: "res-img", alt: ""})), 
                React.createElement("div", {className: "inner-page dl-content shadow"}, 
                    isUs ? React.createElement("p", {className: "download-page-error"}, "请使用微信浏览器或者下载集合App打开") : '', 
                    React.createElement("div", {className: "dl-logo-w dl-w"}, React.createElement("img", {src: "/static/attendant/images/ICON_2x.png", alt: ""})), 
                    React.createElement("div", {className: "dl-name-w dl-w"}, React.createElement("img", {src: "/static/attendant/images/logoh5.png", alt: ""})), 
                    React.createElement("a", {ref: "android", "data-text": "", className: "dl-android-link", href: "http://dl.jhla.com.cn/production/static/app/android/jihe.apk"}), 
                    React.createElement("a", {ref: "ios", "data-text": "", className: "dl-iphone-link", href: "itms-services://?action=download-manifest&url=https://dl.jhla.com.cn/production/static/app/ios/jihe.plist"})
                ), 
                React.createElement("div", {className: "inner-page  b-b"}, React.createElement("img", {src: "/static/attendant/images/juchi.png", className: "res-img", alt: ""}))
            )
        );
    }
});

var DownloadQrcode = React.createClass({displayName: "DownloadQrcode",
    render: function() {
        return (
            React.createElement("div", {className: "download-page"}, 
                React.createElement("div", {className: "download-qrcode-w"}, 
                    React.createElement("img", {src: "/static/attendant/images/qrcode.jpg", alt: ""})
                )
            )
        );
    }
});

var DownloadPanel = React.createClass({displayName: "DownloadPanel",
    render: function() {
        var isUs = this.props.isUs;
        return (
            React.createElement("div", {className: "downloadPanel"}, 
                React.createElement("div", {id: "main", className: "wrap-page"}, 
                    mobile ? React.createElement(DownloadQrcode, null) : React.createElement(DownloadApp, {isUs: isUs})
                )
            )
        );
    }
});


var Detail = React.createClass({displayName: "Detail",
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
            React.createElement("div", {className: "detailPanel"}, 
                React.createElement("div", {className: "detailPanel-top"}, 
                    React.createElement("p", {className: "bar"}, 
                        React.createElement("span", {className: "bar-tip"}, "编号：", this.state.user.id)
                    ), 
                    React.createElement("span", {className: "bar-name"}, this.state.user.name)
                ), 
                React.createElement("div", {className: "detailPanel-rank clearfix"}, 
                    React.createElement("div", {className: "rank-item rank-item-b"}, 
                        React.createElement("span", {className: "tip1"}, "编号：", this.state.user.id), 
                        React.createElement("span", {className: "tip2"}, this.state.user.vote_count, "票")
                    ), 
                    React.createElement("div", {className: "rank-item"}, 
                        React.createElement("span", {className: "tip1"}, "当前排名"), 
                        React.createElement("span", {className: "tip2"}, this.state.user.vote_sort ? '第' + this.state.user.vote_sort + '名' : '')
                    )
                ), 
                React.createElement("div", {className: "detailPanel-content"}, 
                    this.state.user.images_url ? this.state.user.images_url.map(function(photo){
                        return React.createElement("div", {className: "photo-wrap"}, React.createElement("img", {src: photo}))
                    }) : '', 
                    React.createElement("ul", {className: "detailPanel-info clearfix"}, 
                        React.createElement("li", null, "学校：", this.state.user.school), 
                        React.createElement("li", null, "专业：", this.state.user.major), 
                        React.createElement("li", null, "学历：", this.state.user.education), 
                        React.createElement("li", null, "毕业时间：", this.state.user.graduation_time), 
                        React.createElement("li", null, "特长：", this.state.user.speciality), 
                        React.createElement("li", null, "身高：", this.state.user.height), 
                        React.createElement("li", {className: "al"}, "格言：", this.state.user.motto)
                    ), 
                    React.createElement("div", {className: "introduce"}, this.state.user.introduction), 
                    // React.createElement("a", {href: "javascript:;", onClick: this.doVote, className: "v-btn v-btn-red entryForm-btn"}, "投TA一票"), 
                    React.createElement("a", {href: "javascript:;",  className: "v-btn v-btn-red entryForm-btn v-btn-end"}, "投票结束"), 
                    React.createElement("p", {className: "tc introduce-tip1"}, "本次大赛由\"集合APP\"独家承办网络投票统计"), 
                    React.createElement("p", {className: "tc introduce-tip1"}, "每人每天能投", React.createElement("span", {className: "introduce-tip-sel"}, "5"), "票（集合APP内", React.createElement("span", {className: "introduce-tip-sel"}, "4"), "票，微信分享", React.createElement("span", {className: "introduce-tip-sel"}, "1"), "票）")
                )
            )
        );
    }
});

