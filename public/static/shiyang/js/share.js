/* 分享组件 */
var Share = React.createClass({
	shareHandler: function() {
		/**
		 * 调用分享native 分享方法
		 * @param {string} [title]   [分享标题]
		 * @param {string} [image]   [分享图片]
		 * @param {string} [url]     [分享链接]
		 * @param {string} [content] [分享内容]
		 */
		console.dir([actTitle,actImg,actLink,actDesc]);
		if ( S ) {
			console.info('native shared method called');
			S.share(actTitle,actImg,actLink,actDesc);
		}
	},
	render: function(){
		return(
			<button className="share-btn" onClick={this.shareHandler}></button>		
		);
	}
});

module.exports = Share;