var EntryPanel = React.createClass({
    getInitialState: function() {
        return {
            user:{
                images_url: []
            }
        }
    },
    componentDidMount: function() {
        var parent = $(this.refs.entryForm.getDOMNode());
        var btns = parent.find('#uploadBtn');
        var uploadingDiv = parent.find('.uploading-div');
        var that = this;
        var _token = $('input[name="_token"]').val();
        var queueLength = 0;

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
                queueLength--;
            }
          },
          'onStart': function() {
            //if(weWantedTo) return false; // cancels upload
            if (queueLength >= 5 ) {
                alert('最多只能上传5张');
                return false;
            }
            queueLength ++;
            var user = that.state.user;
            if (user.images_url.length >= 5) {
                alert('最多只能上传5张');
                return false;
            }
            uploadingDiv.show();
          },
          'onCancel': function() {
            uploadingDiv.hide();
            queueLength --;
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
            result = {},
            submitBtn = parent.find('#submit-info');
        if ( submitBtn.hasClass('disabled') ) {
            return;
        }
            result.name         = parent.find('input[name="name"]').val(),
            result.gender       = parent.find('input[name="gender"]:checked').val(),
            result.age          = parent.find('input[name="age"]').val(),
            result.mobile       = parent.find('input[name="mobile"]').val(),
            result.work_unit    = parent.find('input[name="work_unit"]').val(),
            result.yearly_salary= parent.find('input[name="yearly_salary"]').val(),
            result.wechat_id    = parent.find('input[name="wechat_id"]').val(),
            result.talent       = parent.find('input[name="talent"]').val(),
            result.guest_apply  = parent.find('input[name="guest_apply"]').prop('checked') ? 1 : 0,
            result.images_url   = this.state.user.images_url;
        if (!result.name) {
            alert('姓名不能为空');
        } else if (!result.gender){
            alert('请选择性别');
        } else if (!result.age) {
            alert('请输入年龄');
        } else if (!/^(((17[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(result.mobile)) {
            alert('手机号码格式出错');
        } else if (!result.work_unit) {
            alert('请填写工作单位');
        } else if (!result.yearly_salary) {
            alert('请填写年薪');
        } else if (!result.wechat_id) {
            alert('请填写微信号');
        } else if (result.images_url.length < 1) {
            alert('请至少上传1张个人照片');
        } else if (result.images_url.length > 5) {
            alert('最多上传5张照片');
        } else { 
            submitBtn.addClass('disabled');
            K.server.enroll(result, function(resp) {
                submitBtn.removeClass('disabled');
                if (resp.code == 0) {
                    K.aModal({
                        title: '提交成功！',
                        content: '<p class="tl">报名信息提交成功，请等待审核，保持通讯畅通。</p><p class="tl">咨询热线：028 85126556</p>',
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
            <div ref="entryForm" className="entryForm">
                <div className="entryForm-item">
                    <h1 className="entryForm-title">请填写报名信息</h1>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">姓名</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="name" placeholder="必填"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">性别</label>
                    <div className="entryForm-wrap sex-item">
                        <div className="fl">
                            <input type="radio" value="1" id="gender_male" name="gender" /><label htmlFor="gender_male">男</label>
                        </div>
                        <div className="fl">
                            <input type="radio" value="2" id="gender_female" name="gender" /><label htmlFor="gender_female">女</label>
                        </div>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">年龄</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="age" placeholder="必填"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">手机号</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="mobile" placeholder="必填"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">工作单位</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="work_unit" placeholder="必填"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">年薪</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="yearly_salary" placeholder="必填  填写格式如：7万"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">微信号</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="wechat_id" placeholder="必填"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">才艺</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="talent" placeholder="选填"/>
                    </div>
                </div>

                <div className="entryForm-item">
                    <label for="" className="entryForm-name">个人照片</label>
                    <div className="entryForm-wrap">
                        {this.state.user.images_url.map(function(image){
                            return <div className="photo-wrap mb10"><img src={image} alt="" /></div>
                        })}
                        <div className="clearfix">
                            <div className="file-con">
                                <span className="file-text">+</span>
                                <input className="file-input" type="file" name="image" />
                            </div>
                        </div>
                        <div className="uploading-div">
                            <span className="uploading-icon"></span>
                            <span className="uploading-text">图片正在上传中...</span>
                        </div>
                    </div>
                </div>
            
                <div className="entryForm-item">
                    <label htmlFor="guest_apply" className="entryForm-name w125">申请成为上台嘉宾</label>
                    <input type="checkbox" className="guest-checkbox" id="guest_apply" name="guest_apply" />
                </div>

                <div className="entryForm-item tc">
                    <a href="javascript:;" onClick={this.submitHandler} id="submit-info" className="v-btn v-btn-yellow entryForm-btn">提交</a>
                </div>
            </div>
        );
    }
});

module.exports = EntryPanel;