(function(){

var server = K.server = {};

var send = function (type, api, parameters, success, async) {
    typeof success == 'function' || (success = function () {
    });
    var request = $.ajax({
        url: api + "?r=" + Math.random(),
        data: parameters,
        type: type,
        dataType: 'json',
        async: true,
        cache: false,
        headers: {"Cache-Control": "no-cache", "Accept": "application/json"},
        timeout: 300000,
        success: function (data, textStatus, jqXHR) {
            success.call(this, data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                location.href = contextPath;
            } else {
                if (!errorThrown) {
                    return false;
                }
                var errors = {
                    101: "网络不稳定或不畅通，请检查网络设置",
                    403: "服务器禁止此操作！",
                    500: "服务器遭遇异常阻止了当前请求的执行<br/><br/><br/>"
                };

                var msg = null;
                switch (textStatus) {
                    case "timeout":
                        msg = "网络连接超时，请检查网络是否畅通！";
                        break;
                    case "error":
                        if (errors[jqXHR.status]) {
                            var data = null;
                            try {
                                data = jQuery.parseJSON(jqXHR.responseText);
                            } catch (e) {
                            }
                            if (data && data.message) {
                                msg = data.message;
                            } else {
                                msg = errors[jqXHR.status];
                            }
                        } else {
                            msg = "服务器响应异常<br/><br/>" + (jqXHR.status == 0 ? "" : jqXHR.status) + "&nbsp;" + errorThrown;
                        }
                        break;
                    case "abort":
                        msg = null;//"数据连接已被取消！";
                        break;
                    case "parsererror":
                        msg = "数据解析错误！";
                        break;
                    default:
                        msg = "出现错误:" + textStatus + "！";
                }
                if (errorThrown.code != null && errorThrown.message != null && !errors[errorThrown.code]) {
                    msg += "</br>[code:" + errorThrown.code + "][message:" + errorThrown.message + "]" + (null == errorThrown.stack ? "" : errorThrown.stack);
                }
                if (msg == null) {
                    msg = '';
                }
                success.call(this, {code: jqXHR.status, msg: msg}, textStatus, jqXHR, errorThrown);
            }
        }
    });
    return request;
}


// 列表
server.attendantList = function (data, callback) {
    return send('get', '/wap/gaoxin/approved/list', data, callback);
};
//排序列表
server.attendantSortList = function (data, callback) {
    return send('get', '/wap/gaoxin/approved/sort/list', data, callback);
};
// 申请注册
server.enroll = function (data, callback) {
    return send('post', '/wap/gaoxin/enroll', data, callback);
};

// 个人详情
server.attendantDetail = function (data, callback) {
    return send('get', '/wap/gaoxin/detail', data, callback);
};

// 投票
server.attendantVote = function (data, callback) {
    return send('post', '/wap/gaoxin/vote', data, callback);
};

//=========== 后台

// 待审核列表
server.pendingList = function (data, callback) {
    return send('get', '/gaoxin/pending/list', data, callback);
};

// 已通过列表
server.approvedList = function (data, callback) {
    return send('get', '/gaoxin/approved/list', data, callback);
};

// 通过
server.approve = function (data, callback) {
    return send('post', '/gaoxin/approve', data, callback);
};

// 拒绝
server.remove = function (data, callback) {
    return send('post', '/gaoxin/remove', data, callback);
};

})();