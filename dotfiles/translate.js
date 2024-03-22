function translate_all() {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://res.zvo.cn/translate/translate.js';
  script.onload = script.onreadystatechange = function() {
    translate.storage.set('to', '');

    //SELECT 修改 onchange 事件
    translate.selectLanguageTag.selectOnChange = function(event) {
      //判断是否是第一次翻译，如果是，那就不用刷新页面了。 true则是需要刷新，不是第一次翻译
      var isReload = translate.to != null && translate.to.length > 0;
      if (isReload) {
        //如果要刷新页面的话，弹出友好提示
        alert('您好，快速体验暂时只能切换其中一种语言进行体验，只是提供效果展示，您可参考接入文档来接入您的项目中进行完整体验及使用。详细文档参考： http://translate.zvo.cn');
      } else {
        var language = event.target.value;
        translate.changeLanguage(language);
      }
    }

    translate.service.use('client.edge');
    translate.listener.start();	//开启html页面变化的监控，对变化部分会进行自动翻译。注意，这里变化区域，是指使用 translate.setDocuments(...) 设置的区域。如果未设置，那么为监控整个网页的变化
    translate.execute();
    document.getElementById('translate').style.position = 'fixed';
    document.getElementById('translate').style.fontSize = '1rem';
    document.getElementById('translate').style.left = '10px';
    document.getElementById('translate').style.top = '50px';
    document.getElementById('translate').style.zIndex = '9999999999999';

    setInterval(function() {
      try {
        if (document.getElementById('translateSelectLanguage') == null) {
          return;
        }
        document.getElementById('translateSelectLanguage').style.fontSize = '1rem';
      } catch (e) {
        //select数据是通过接口返回的
      }
    }, 1000);

  }
  head.appendChild(script);
}

setTimeout(translate_all, 10)
