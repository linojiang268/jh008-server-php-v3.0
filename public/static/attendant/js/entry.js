var EntryPanel = React.createClass({
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
            <div ref="entryForm" className="entryForm">
                <div className="entryForm-item">
                    <h1 className="entryForm-title">请填写报名信息</h1>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">姓名</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input" name="name" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">性别</label>
                    <div className="entryForm-wrap">
                        <div className="radio-w"><label className="radio-label" for="">男</label><input type="radio" name="gender" value="0" /></div>
                        <div className="radio-w"><label className="radio-label" for="">女</label><input type="radio" name="gender" value="1" /></div>
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">年龄</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="age" placeholder="填写数字，如：20" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">身高</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="height" placeholder="填写数字，如：170" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">特长</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="speciality"  />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">学校</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="school" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">专业</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="major" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">学历</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="education" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">毕业时间</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="graduation_time" placeholder="请按此格式：2016-06" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">身份证号</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="ident_code" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">手机号</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="mobile" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">微信号</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="wechat_id" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">邮箱</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="email"  />
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
                            <p className="upload-t">建议上传"竖构图"，可实现最佳浏览效果。每人最多上传5张照片。建议照片小于3M。</p>
                        </div>
                        <div className="uploading-div">
                            <span className="uploading-icon"></span>
                            <span className="uploading-text">图片正在上传中...</span>
                        </div>
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">格言</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="motto" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">简历</label>
                    <div className="entryForm-wrap">
                        <textarea type="text" className="entryForm-textarea" placeholder="限100字"   name="introduction" ></textarea>
                    </div>
                </div>
                <div className="entryForm-item tc">
                    <a href="javascript:;" onClick={this.submitHandler} className="v-btn v-btn-yellow entryForm-btn">提交</a>
                </div>
            </div>
        );
    }
});