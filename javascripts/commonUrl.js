$(document).ready(function (){

      var bookmarkClassify=[
          { id: 15,text: "全部",href: "#",value: "all"},
          { id: 15,text: "未分类",href: "#",value: "undo"},
          { id: 11,text: "博客&资料",href: "#",value: "blog"},
          { id: 12,text: "开发文档",href: "#",value: "doc"},
          { id: 13,text: "测试地址",href: "#",value: "test"},
          { id: 14,text: "开发工具",href: "#",value: "tool"},
          { id: 16,text: "国科大",href: "#",value: "ucas"}
      ];



    $("#navigation").kendoTreeView({
        autoScroll: true,
        dataImageUrlField: "image",
        template: '<a href="#:item.href#">#:item.text#</a>',
        dataSource: [
            { 
              id: 1,
              text: "查看",
              href: "commonUrl_view.html",
              image: "http://demos.telerik.com/kendo-ui/content/web/treeview/mail.png"
            },{ 
              id: 2,
              text: "导入书签",
              href: "commonUrl_import.html",
              image: "http://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" 
            },{ 
              id: 3,
              text: "书签分类",
              href: "commonUrl_classify.html",
              image: "http://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" 
            },{ 
              id: 4,
              text: "历史档案",
              href: "commonUrl_old.html",
              image: "http://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" 
            }
        ]
    });

    var navigation=UCAS["getPage"]('navigation');
    if(navigation&&navigation.text){
        var treeview = $("#navigation").data("kendoTreeView");
        var bar = treeview.findByText(navigation.text);
        treeview.select(bar);
        //console.log(navigation.text);
        // treeview.expand(".k-item");// expand all loaded items
        treeview.expandPath([1]);
    }

    $("#classify").kendoComboBox({
       placeholder:"请选择书签类型...",
       dataTextField: "text",
       dataValueField: "value",
       dataSource: bookmarkClassify,
       autoClose: false
    });



    //表格数据源
    var gridData=[];
    //
    var gridColumns=[
        {
            field:'projectName',
            title: "名称",
            width: "300px",
            headerAttributes: {
              style: "text-align:center;"
            },
            template: '<a href="#: href #" target="_blank" class="bookmarkName">#: projectName #</a>'
        },{
            field: 'type',
            title: "书签类型",
            width: "70px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'time',
            title: "添加时间",
            width: "100px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'degree',
            title: "等级",
            width: "80px",
            headerAttributes: {
              style: "text-align: center;"
            },
            template: '<span class="degree #: degree #"><i></i>#: degree #</span>'
        },{
            field: 'description',
            title: "描述",
            width: "200px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
          command: ["edit", "destroy"],
          width: "155px"
        }
    ];

    $("#grid").kendoGrid({
        columns: gridColumns,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        editable: "inline",
        toolbar: ["import","create","save", "cancel"],
        messages:{
          commands: {
            create: "新建",
            save: "保存",
            edit: "编辑",
            canceledit: "取消",
            excel: "导出Execl",
            pdf: "导出Pdf",
            chart:"图表分析",
            group: "分组",
            ungroup: "取消分组",
            import:"导入书签"
          }
        }
    });

    $.ajax({
        type: "GET",
        url: "json/commonUrl.json",
        dataType:"json",
        success: function(data){
          var grid = $("#grid").data("kendoGrid");
          gridData=data;
          if(grid){
              var myDataSource=new kendo.data.DataSource({
                data: data,
                pageSize:20,
                schema: {
                  id: "href",
                  model: {
                    fields: {
                      href: {validation: { required: true } }
                    }
                  }
                }
            });
            grid.setDataSource(myDataSource);
          }//if
          
        }//success
    });
});


$(function(){
   var $error=$("#uploadDialog .error");
   $('#importExecl').on('click',function(){
      //var file = $('#file').filebox('getValue');
      var file = $('#file').val();
      if(file.length == 0){
        $error.text('请选择要上传的文件!').css("visibility","visible");
        return false;
      }
      var extName = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
      if(extName != '.xlsx' && extName != '.xls'){
         $error.text('只支持xlsx文件').css("visibility","visible");             
         return false;        
      }
      var fileType=$("input[name='fileType']:checked").val();
      console.log("fileType", fileType)
      if(fileType==undefined || fileType==""){
        $error.text('请选择文件类型').css("visibility","visible");             
         return false; 
      }
      $("#fileForm").submit();  
  });
   //获取上传文件名
   //必须使用代理，在dialog中，直接用#file不起作用
   $("#uploadDialog").on("change","input[type='file']", function(){
      var filePath=$(this).val();
      var arr=filePath.split('\\');
      var fileName=arr[arr.length-1];
      $("#fileName").val(fileName);
  });
   $("#uploadDialog").kendoWindow({
      pinned: true,
      actions: [ "Minimize", "Maximize"],
      //modal: true,
      width:450,
      height:200,
      position: {
        top: "35%", // or "100px"
        left: "35%"
      },
      title:"上传文件"
    });
});
