function getDataSourceByData(data){
    return new kendo.data.DataSource({
      data: data,
      pageSize: 10
    });
  }
function getAllDataSourceByData(data){
    return new kendo.data.DataSource({
      data: data
    });
  }
var getRandomColor = function(){
  return  '#' +    
    (function(color){    
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
      && (color.length == 6) ?  color : arguments.callee(color);    
  })('');    
};
//采用正则表达式获取地址栏参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return decodeURIComponent(r[2]);
     return null;
}

//教师列表
var teacherList=[];
var classNameList=[];

$(function(){
  //菜单
  $("#menu").kendoMenu({
    animation: false,
    dataSource: [
     {
        text: "基础技术",
        items: [
           { text: "jQuery", url: "index.html"},
           { text: "JavaScript", url:"JavaScriptComponentDesign.html"},
           { text: "DIV+CSS", url:"DIVCSS.html"},
           { text: "HTML5+CSS3", url:"HTML5CSS3.html"}
        ]
      },{
        text: "前端开发框架",
        items: [
           { text: "Bootstrap", url: "#"},
           { text: "VueJS", url:"#"},
           { text: "RequiresJS", url:"#"},
           { text: "React", url:"#"},
           { text: "Prototype", url:"#"},
           { text: "MooTools", url:"#"},
           { text: "YUI", url:"#"},
           { text: "KendoUI", url:"#"},
           { text: "SVG", url:"#"}
        ]
      },{
        text: "MVC开发框架",
        items: [
           { text: "Spine", url: "#"},
           { text: "Backbone", url:"#"},
           { text: "JavaScriptMVC", url:"#"}
        ]
      },{
        text: "MEAN全栈开发框架",
        items: [
           { text: "NodeJS", url: "#"},
           { text: "AngularJS", url:"#"},
           { text: "Express", url:"#"},
           { text: "MongoDB", url:"#"}
        ]
      },{
        text: "开发测试",
        items: [
           { text: "Fiddler", url: "#"},
           { text: "GitHub", url:"#"},
           { text: "QUnit", url:"#"},
           { text: "Jshint", url:"#"}
        ]
      },{
        text: "求职简历",
        url: "resume/resume/index.html"
      },{
        text: "网络日志",
        items: [
           { text: "查看",  url:"index.html"},
           { text: "更新",  url:"index.html"},
           { text: "归类",  url:"index.html"}
        ]
      },{
        text: "图书资料",
        items: [
           { text: "JavaScript", url: "book_JavaScript"},
           { text: "jQuery", url:"book_jQuery.html"},
           { text: "CSS", url:"book_CSS.html"}
        ]
      }
    ]
  });
  $("#degree").kendoComboBox({
      placeholder: "请选择学习阶段...",
      dataSource:[
         {text: "一阶", value: "first"},
         {text: "二阶", value: "second"},
         {text: "三阶", value: "third"},
         {text: "四阶", value: "fourth"}
      ],
      dataTextField: "text",
      dataValueField: "value",
      autoClose: false
   });
  // $("#teacher").kendoComboBox({
  //     placeholder: "请选择教师...",
  //     dataTextField: "text",
  //     dataValueField: "value",
  //     filter: "contains",
  //     autoClose: false
  //  });
  function getView(data, field){
     var dataSource=new kendo.data.DataSource({
         data: data
     });
     dataSource.group({field: field});
     var view = dataSource.view();
     var items=[];
     items.push({
        text :"全部",
        value: "全部"
     });
     for(var i=0;i<view.length;i++){
        items.push({
          text :view[i].value,
          value: view[i].value
        });
     }
     return items;
  }

  // $.ajax({
  //       type: "GET",
  //       url: "/json/teachingList",
  //       dataType:"json",
  //       success: function(data){
  //          if(data.length){
  //             teacherList=getView(data, "teacher");
  //             //console.log("teacherList", teacherList);
  //             classNameList=getView(data, "className");
  //             //console.log("classNameList", classNameList);
  //             // init();
  //         }
  //       }//success
  //   });

});

$(function(){
    // 使用KendoUI替代Alert提示框、Confirm确认框
    var flag=false;
    var myKendoConfirm = function( options ){
        this.defaults={
            text:"",        //提示文本
            css:"",
            textCSS:"",     //自定义文本样式
            autoClose:false, //自动关闭
            time:2000,      //time秒后，弹框自动关闭
            title:"",       //提示
            manipute:null,  //关闭按钮触发的事件
            cancel:null,    //关闭按钮触发的事件
            okVal:"确定",       //确认按钮文字
            cancelVal:"取消"    //取消按钮文字
        };
        this.type=-1;//按钮类型
        this.options =$.extend({},this.defaults,options);
        this.init();
        this.setOptions();
    };
    myKendoConfirm.prototype.init = function(){
        var self=this;
        if ($("#kendoConfirm").length!=0){
            //$("body").remove($("#kendoConfirm"));
            $("#kendoConfirm").remove();
        }
        if(this.options.okVal!=""&&this.options.cancelVal==""){//确定，警示提示框
            this.type=0;//按钮类型
            var tpl =[
                '    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
                '        <p class="content"  style="margin-bottom:40px;font-size:15px;text-align:center;'+this.options.textCSS+'"></p>',
                '        <div style="text-align:center;position:absolute;bottom:0;left:0;width:300px;height:40px;">',
                '            <button id="kendoButtonOK" type="button">'+this.options.okVal+'</button>',
                '        </div>',
                '    </div>'
            ].join('');
        }
        if(this.options.okVal!=""&&this.options.cancelVal!=""){//确定、取消，询问提示框
            this.type=1;//按钮类型
            var tpl =[
                '    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
                '        <p class="content"  style="margin-bottom:40px;font-size:15px;text-align:center;'+this.options.textCSS+'"></p>',
                '        <div style="text-align:center;position:absolute;bottom:0;left:0;width:300px;height:40px;">',
                '            <button id="kendoButtonOK" type="button">'+this.options.okVal+'</button>',
                '            <button id="kendoButtonCancel" type="button">'+this.options.cancelVal+'</button>',
                '        </div>',
                '    </div>'
            ].join('');
        }
        if(this.options.okVal==""&&this.options.cancelVal==""){//操作成功提示框，没有标题、确认、取消按钮，一闪而过
            this.type=2;//按钮类型
            var tpl =[
                '    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
                '        <p class="content"  style="font-size:15px;text-align:center;'+this.options.textCSS+'"></p>',
                '    </div>'
            ].join('');
        }
        if(this.options.okVal==""&&this.options.cancelVal!=""){//只有取消按钮，询问提示框
            this.type=3;//按钮类型
            var tpl =[
                '    <div id="kendoConfirm" style="min-height:150px;position:relative;">',
                '        <p class="content"  style="margin-bottom:40px;font-size:15px;text-align:center;'+this.options.textCSS+'"></p>',
                '        <div style="text-align:center;position:absolute;bottom:0;left:0;width:300px;height:40px;">',
                '            <button id="kendoButtonCancel" type="button">'+this.options.cancelVal+'</button>',
                '        </div>',
                '    </div>'
            ].join('');
        }
        $(tpl).appendTo($("body"));
        //使用kendoWindow替代Confirm提示框
        $("#kendoConfirm").kendoWindow({
            width:"300px",
            actions:["Close"],
            modal:true,     //灰色背景
            visible:false,  //不可见
            pinned:true,     //不随页面滚动条滚动
            title:this.options.title    //提示
        });
    };
    myKendoConfirm.prototype.setOptions = function(){
        var self=this;
        var $p=$("#kendoConfirm p.content");
        $p.text(this.options.text);//内容
        var dialog=$("#kendoConfirm").data("kendoWindow");
        dialog.center().toFront().open();  //视口居中、z-index最上层、打开
        if(this.options.autoClose==true) {
            setTimeout(function () {
                dialog.close();
            }, this.options.time);//自动关闭
        }
        switch(this.type){
            case 0:
                $p.css("margin-top",($("#kendoConfirm").height()-$p.height()-40)/2);
                //确认按钮
                $("#kendoButtonOK").kendoButton({
                    icon:"check",
                    click:function(){
                        var dialog=$("#kendoConfirm").data("kendoWindow");
                        //dialog.bind("close",self.options.manipute);
                        dialog.close();
                    }
                });
                if(typeof self.options.manipute=='function') {
                    dialog.bind("close",self.options.manipute);
                }
                break;
            case 1:
                $p.css("margin-top",($("#kendoConfirm").height()-$p.height()-40)/2);
                //确认按钮
                $("#kendoButtonOK").kendoButton({
                    icon:"check",
                    click:function(){
                        flag=true;
                        var dialog=$("#kendoConfirm").data("kendoWindow");
                        if(typeof self.options.manipute=='function') {
                            dialog.bind("close",self.options.manipute);
                        }
                        dialog.close();
                    }
                });
                //取消按钮
                $("#kendoButtonCancel").kendoButton({
                    icon:"close",
                    click:function(){
                        flag=false;
                        var dialog=$("#kendoConfirm").data("kendoWindow");
                        if(typeof self.options.cancel=='function') {
                            dialog.bind("close",self.options.cancel);
                        }
                        dialog.close();
                    }
                });
                if(typeof self.options.cancel=='function') {//点击X，行为同取消按钮
                    $(".k-window-actions").bind("click",self.options.cancel);
                }
                break;
            case 2:
                $p.css("margin-top",($("#kendoConfirm").height()-$p.height())/2);
                if(typeof self.options.manipute=='function') {
                    dialog.bind("close",self.options.manipute);
                }
                break;
            case 3:
                $p.css("margin-top",($("#kendoConfirm").height()-$p.height()-40)/2);
                //取消按钮
                $("#kendoButtonCancel").kendoButton({
                    icon:"close",
                    click:function(){
                        var dialog=$("#kendoConfirm").data("kendoWindow");
                        if(typeof self.options.cancel=='function') {
                            dialog.bind("close",self.options.cancel);
                        }
                        dialog.close();
                    }
                });
                if(typeof self.options.manipute=='function') {
                    dialog.bind("close",self.options.manipute);
                }
                break;
        }//switch
        dialog.bind("close",function(){
            dialog.destroy();
        });
    };
    window["customKendoAlert"]=function(options){
        return new myKendoConfirm( $.extend({autoClose:true,okVal:"", cancelVal:""},options));
    };
    window["customKendoConfirm"]=function(options){
        return new myKendoConfirm(options);
    };
});