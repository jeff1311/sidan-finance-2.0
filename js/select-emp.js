


function select_emp(table,type){
    
    layer.closeAll();

    var content = '<div style="padding:10px;">' +
                        '<div class="layui-row" style="margin-bottom:0;">' +
                            '<div class="layui-col-md2 mr-1">' +
                                '<input type="text" autocomplete="off" class="layui-input" placeholder="员工姓名" id="name">' +
                            '</div>' +
                            '<div class="layui-col-md2 mr-1">' +
                                '<input type="text" autocomplete="off" class="layui-input" placeholder="联系电话" id="phone">' +
                            '</div>' +
                            '<div class="layui-col-md2 mr-1">' +
                                '<input type="text" autocomplete="off" class="layui-input" placeholder="身份证号" id="cert-no">' +
                            '</div>' +
                            '<div class="layui-col-md1">' +
                                '<button class="layui-btn layui-btn-primary" id="emp-search" style="font-size:12px;">查询</button>' +
                            '</div>' +
                        '</div>' +
                        '<table id="emp-table" lay-filter="emp-table-filter"></table>' +
                    '</div>';
    layer.open({
        title: '选择员工',
        type: 1,
        skin: 'layui-layer-demo', //样式类名
        area: ["1000px", "730px"],
        closeBtn: 1, //不显示关闭按钮
        btn: '确定', //按钮
        anim: 2,
        shade: 0.1,
        shadeClose: true, //开启遮罩关
        resize: false,
        content: content,
        success: function(layero){
            table.render({
                elem: '#emp-table',
                height: '550px',
                url: baseUrl + '/sidan/finance/employee/list', //数据接口
                cellMinWidth: 100,
                page: true, //开启分页
                limit: 20,
                cols: [
                    [//表头
                        {type: type},
                        {field: 'name', title: '员工姓名', width: 100},
                        {field: 'gender', title: '性别', width: 60},
                        {field: 'typeName', title: '工种', width: 60},
                        {field: 'phone', title: '联系电话', width: 110},
                        {field: 'certNo', title: '身份证号'},
                        {field: 'bankNo', title: '银行卡号'},
                        {field: 'bankName', title: '开户行'},
                        {field: 'superiorName', title: '工长', width: 100},
                    ]   
                ],
                id: 'select-emp-reload',
                where:{
                    // name: $('#name').val(),
                    // phone: $('#phone').val(),
                    // certNo: $('#cert-no').val()
                }
            });
        },
        yes: function(index, layero){
            var data = table.checkStatus('select-emp-reload').data;
            // console.log(data);
            if(data.length > 0){
                layui.select_emp_callback(data);
                layer.close(index);
            }else{
                layer.msg('未选择任何员工！');
            }
        } 
      });

      $('#emp-search').on('click',function(){
            //执行重载
            table.reload('select-emp-reload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    name: $('#name').val(),
                    phone: $('#phone').val(),
                    certNo: $('#cert-no').val()
                }
            }, 'data');
      })
      
}
