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
            result = {};
            result.name          = parent.find('input[name="name"]').val(),
            result.mobile         = parent.find('input[name="mobile"]').val(),
            result.bwh         = parent.find('input[name="bwh"]').val(),
            result.height        = parent.find('input[name="height"]').val(),
            result.weight     = parent.find('input[name="weight"]').val(),
            result.shoe_size        = parent.find('input[name="shoe_size"]').val(),
            result.intro   = parent.find('textarea[name="intro"]').val(),
            result.images_url = this.state.user.images_url;
        if (!result.name) {
            alert('姓名不能为空');
        } else if (!/^(((17[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(result.mobile)) {
            alert('手机号码格式出错');
        } else if (!/^\d{1,},\d{1,},\d{1,}$/.test(result.bwh)) {
            alert('三围格式错误');
        } else if (!/^\d{1,}$/.test(result.height)) {
            alert('身高格式错误');
        } else if (!/^\d{1,}$/.test(result.weight)) {
            alert('体重格式错误')
        } else if (!/^\d{1,}$/.test(result.shoe_size)) {
            alert('鞋码大小格式错误');
        } else if (!result.intro) {
            alert('简历不能为空');
        } else if (result.intro.length > 100) {
            alert('简历100字以内');
        } else if (result.images_url.length < 5 || result.images_url.length > 5) {
            alert('需要上传5张照片');
        } else {
            
            K.server.enroll(result, function(resp) {
                if (resp.code == 0) {
                    K.aModal({
                        title: '提交成功！',
                        content: '<p class="tl">报名信息提交成功，请等待审核，保持通讯畅通。</p><p class="tl">咨询热线：18408220128</p>',
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
                    <label for="" className="entryForm-name">手机号</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"   name="mobile" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">三围数据</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="bwh" placeholder="使用如下格式，如：90,90,90" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">身高</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="height" placeholder="填写数字，如：170" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">体重</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="weight" placeholder="填写数字，单位kg, 如：60" />
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">鞋码大小</label>
                    <div className="entryForm-wrap">
                        <input type="text" className="entryForm-input"  name="shoe_size" placeholder="填写数字，如：42" />
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
                            <p className="upload-t">全身照3张，自拍照2张，建议上传"竖构图"，可实现最佳浏览效果。每人需要上传5张照片。建议照片小于3M。</p>
                        </div>
                        <div className="uploading-div">
                            <span className="uploading-icon"></span>
                            <span className="uploading-text">图片正在上传中...</span>
                        </div>
                    </div>
                </div>
                <div className="entryForm-item">
                    <label for="" className="entryForm-name">简历</label>
                    <div className="entryForm-wrap">
                        <textarea type="text" className="entryForm-textarea" placeholder="限100字"   name="intro" ></textarea>
                    </div>
                </div>
                <div className="entryForm-item tc">
                    <a href="javascript:;" onClick={this.submitHandler} className="v-btn v-btn-yellow entryForm-btn">提交</a>
                </div>
            </div>
        );
    }
});

module.exports = EntryPanel;