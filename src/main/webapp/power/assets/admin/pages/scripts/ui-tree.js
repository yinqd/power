var UITree = function () {

    var handleSample1 = function () {

        $('#tree_1').jstree({
            "core": {
                "themes": {
                    "responsive": false
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });

        // handle link clicks in tree nodes(support target="_blank" as well)
        $('#tree_1').on('select_node.jstree', function (e, data) {
        
            var link = $('#' + data.selected).find('a');
            if (link.attr("href") != "#" && link.attr("href") != "javascript:;" && link.attr("href") != "") {
                if (link.attr("target") == "_blank") {
                    link.attr("href").target = "_blank";
                }
                document.location.href = link.attr("href");
                return false;
            }
        });
    }

    var handleSample2 = function () {
        $('#tree_2').jstree({
            'plugins': ["wholerow", "checkbox", "types"],
            'core': {
                "themes": {
                    "responsive": false
                },
                'data': [{
                    "text": "九院设计部",
                    "children": [
                        {
                            "text": "科室一",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "text": "科室二",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "text": "科室三",
                            "state": {
                                "opened": false,
                                "selected": true,
                            },
                            "children": [
                                {
                                    "text": "EBOM",
                                    "children": [{
                                        "text": "201-0001 压缩机",
                                        "state": {"opened": false },
                                        "children": [
                                            {
                                                "text": "202-0001 泵体",
                                                "children": [{
                                                    "text": "气缸",
                                                    "icon": "fa fa-folder icon-state-danger",
                                                    "children": [
                                                        {"text": "204 0005  缸筒", "icon": "fa fa-file icon-state-warning"},
                                                        {"text": "204 0005  活塞", "icon": "fa fa-file icon-state-success"},
                                                        {"text": "204 0005  缸筒", "icon": "fa fa-file icon-state-default"},
                                                        {"text": "204 0005  端盖", "icon": "fa fa-file icon-state-danger"},
                                                        {"text": "204 0005  活塞杆", "icon": "fa fa-file icon-state-info"}
                                                    ]
                                                }, {
                                                    "text": "204-0009 曲轴",
                                                    "icon": "fa fa-folder icon-state-danger"
                                                }]
                                            },
                                            {
                                                "text": "202-0002 壳体",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0003 马达",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0004 存储液",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            }]
                                    }]
                                },
                                {
                                    "text": "POM",
                                    "state": {"opened": false },
                                    "children": [{
                                        "text": "201-0001-1 压缩机",
                                        "children": [
                                            {
                                                "text": "202-0001-2 泵体",
                                                "state": {
                                                    "opened": true
                                                },
                                                "children": [{
                                                    "text": "气缸",
                                                    "icon": "fa fa-folder icon-state-danger",
                                                    "children": [
                                                        {"text": "204 0005 -1 缸筒", "icon": "fa fa-file icon-state-warning"},
                                                        {"text": "204 0005 -4 活塞", "icon": "fa fa-file icon-state-success"},
                                                        {"text": "204 0005 -1 缸筒", "icon": "fa fa-file icon-state-default"},
                                                        {"text": "204 0005 -1 端盖", "icon": "fa fa-file icon-state-danger"},
                                                        {"text": "204 0005 -5 活塞杆", "icon": "fa fa-file icon-state-info"}
                                                    ]
                                                }, {
                                                    "text": "204-0009-2 曲轴",
                                                    "icon": "fa fa-folder icon-state-danger"
                                                }]
                                            },
                                            {
                                                "text": "202-0002-5 壳体",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0003-3 马达",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0004-7 存储液",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            }]
                                    }]
                                },
                                {
                                    "text": "文档",
                                    "state": {"opened": false },
                                    "children":[
                                        {
                                            "text": "文档1",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "text": "文档2",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "text": "文档3",
                                            "icon": "fa fa-folder icon-state-success"
                                        }
                                    ]
                                }
                            ]
                        }]
                }]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            }
        });
    }

    var contextualMenuSample = function () {

        $("#tree_3").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                // so that create works
                "check_callback": true,
                'data': [{
                    "text": "201-0001-1 压缩机",
                    "children": [
                        {
                            "text": "202-0001-2 泵体",
                            "state": {
                                "selected": true,
                                "opened": true
                            },
                            "children": [{
                                "text": "气缸",
                                "icon": "fa fa-folder icon-state-danger",
                                "children": [
                                    {"text": "204 0005 -1 缸筒", "icon": "fa fa-file icon-state-warning"},
                                    {"text": "204 0005 -4 活塞", "icon": "fa fa-file icon-state-success"},
                                    {"text": "204 0005 -1 缸筒", "icon": "fa fa-file icon-state-default"},
                                    {"text": "204 0005 -1 端盖", "icon": "fa fa-file icon-state-danger"},
                                    {"text": "204 0005 -5 活塞杆", "icon": "fa fa-file icon-state-info"}
                                ]
                            }, {
                                "text": "204-0009-2 曲轴",
                                "icon": "fa fa-folder icon-state-danger"
                            }]
                        },
                        {
                            "text": "202-0002-5 壳体",
                            "icon": "fa fa-folder icon-state-success",
                            "state": {
                                "opened": true
                            }
                        },
                        {
                            "text": "204-0003-3 马达",
                            "icon": "fa fa-folder icon-state-success",
                            "state": {
                                "opened": true
                            }
                        },
                        {
                            "text": "204-0004-7 存储液",
                            "icon": "fa fa-folder icon-state-success",
                            "state": {
                                "opened": true
                            }
                        }]
                },
                    "其它节点"
                ]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "dnd", "state", "types"]
        });

    };

    var contextualMenuSample2 = function () {

        $("#tree_5").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                // so that create works
                "check_callback": true,
                'data': [{
                    "text": "物料",
                    "children": [
                        {
                            "text": "标准件",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "text": "通用件",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "text": "专用件",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "text": "2 零件",
                                    "icon": "fa fa-folder icon-state-danger"
                                },
                                {
                                    "text": "3成品件",
                                    "icon": "fa fa-folder icon-state-danger"

                                },
                                {
                                    "text": "...",
                                    "icon": "fa fa-folder icon-state-danger"
                                }]
                        },
                        {
                            "text": "原材料",
                            "state": {
                                "opened": true
                            },
                            "children": [
                                {
                                    "text": "1.1 黑色金属",
                                    "icon": "fa fa-folder icon-state-danger"

                                },
                                {
                                    "text": "1.2 有色金属",
                                    "state": {
                                        "selected": true,
                                    },
                                    "icon": "fa fa-folder icon-state-danger"

                                },
                                {
                                    "text": "1.3 非金属",
                                    "icon": "fa fa-folder icon-state-danger"

                                },
                                {
                                    "text": "...",
                                    "icon": "fa fa-folder icon-state-danger"
                                }]
                        }]
                }]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "dnd", "state", "types"]
        });

    };

    var contextualMenuSample7 = function () {
        $("#collectTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                // so that create works
                "check_callback": true,
                'data': [
                    { "id" : "1", "parent" : "#", "text" : "收藏夹" , "state": {"opened": true}},
                    { "id" : "2", "parent" : "1", "text" : "文件收藏" ,"icon": "fa fa-folder icon-state-danger"},
                    { "id" : "3", "parent" : "1", "text" : "PBOM收藏", "icon": "fa fa-folder icon-state-danger" },
                    { "id" : "4", "parent" : "1", "text" : "BOM收藏","icon": "fa fa-folder icon-state-info" }
                ]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "dnd", "state", "types"]
        });
    };

    var companyTree = function () {
        $("#companyTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                // so that create works
                "check_callback": true,
                'data':[
                    {"id":"2","text":"1111","parent":"#"},
                    { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
                    { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
                    { "id" : "ajson4", "parent" : "ajson3", "text" : "Child 2" },

                ]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "state", "types"]
        });

        //选中节点
        $('#companyTree').on('select_node.jstree',function(e,data){
        
            //加载改节点下所有人员的权限列表
            var id=data.node.id;
            var condition={
                partId:id
            };
            //getTable(condition);
        });

        //创建节点
        $('#companyTree').on('create_node.jstree',function(e,data){
        
            var id=data.node.id;
            var condition={
                partId:id
            };
            //getTable(condition);
        });

        //重命名节点
        $('#companyTree').on('rename_node.jstree',function(e,data){
        
            //var id=data.node.id;
            //var condition={
            //    partId:id
            //};
            //getTable(condition);
        });

        //删除节点
        $('#companyTree').on('delete_node.jstree',function(e,data){
        
            //var id=data.node.id;
            //var condition={
            //    partId:id
            //};
            //getTable(condition);
        });

    };

    var contextualMenuSample6 = function () {
    
        $("#tree_6").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': [{
                    "id":"all",
                    "text": "九院设计部",
                    "children": [
                        {
                            "id": "part1",
                            "text": "科室一",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "id": "part2",
                            "text": "科室二",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "id": "part3",
                            "text": "科室三",
                            "state": {
                                "selected": true,
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": "part3-EBOM",
                                    "text": "EBOM",
                                    "state": { "opened": false },
                                    "children": [{
                                        "text": "201-0001 压缩机",
                                        "children": [
                                            {
                                                "text": "202-0001 泵体",
                                                "state": {
                                                    "opened": true
                                                },
                                                "children": [{
                                                    "text": "气缸",
                                                    "icon": "fa fa-folder icon-state-danger",
                                                    "children": [
                                                        {"text": "204 0005  缸筒", "icon": "fa fa-file icon-state-warning"},
                                                        {"text": "204 0005  活塞", "icon": "fa fa-file icon-state-success"},
                                                        {"text": "204 0005  缸筒", "icon": "fa fa-file icon-state-default"},
                                                        {"text": "204 0005  端盖", "icon": "fa fa-file icon-state-danger"},
                                                        {"text": "204 0005  活塞杆", "icon": "fa fa-file icon-state-info"}
                                                    ]
                                                },
                                                    {
                                                    "text": "204-0009 曲轴",
                                                    "icon": "fa fa-folder icon-state-danger"
                                                }]
                                            },
                                            {
                                                "text": "202-0002 壳体",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0003 马达",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0004 存储液",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            }]
                                    }]
                                },
                                {
                                    "id": "part3-PBOM",
                                    "text": "POM",
                                    "state": {"opened": false },
                                    "children": [{
                                        "text": "201-0001-1 压缩机",
                                        "children": [
                                            {
                                                "text": "202-0001-2 泵体",
                                                "state": {
                                                    "opened": false
                                                },
                                                "children": [{
                                                    "text": "气缸",
                                                    "icon": "fa fa-folder icon-state-danger",
                                                    "children": [
                                                        {"text": "204 0005 -1 缸筒", "icon": "fa fa-file icon-state-warning"},
                                                        {"text": "204 0005 -4 活塞", "icon": "fa fa-file icon-state-success"},
                                                        {"text": "204 0005 -1 缸筒", "icon": "fa fa-file icon-state-default"},
                                                        {"text": "204 0005 -1 端盖", "icon": "fa fa-file icon-state-danger"},
                                                        {"text": "204 0005 -5 活塞杆", "icon": "fa fa-file icon-state-info"}
                                                    ]
                                                }, {
                                                    "text": "204-0009-2 曲轴",
                                                    "icon": "fa fa-folder icon-state-danger"
                                                }]
                                            },
                                            {
                                                "text": "202-0002-5 壳体",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0003-3 马达",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            },
                                            {
                                                "text": "204-0004-7 存储液",
                                                "icon": "fa fa-folder icon-state-success",
                                                "state": {
                                                    "opened": true
                                                }
                                            }]
                                    }]
                                },
                                {
                                    "id": "part3-Document",
                                    "text": "文档",
                                    "state": {"opened": false },
                                    "children":[
                                        {
                                            "id": "part3-Document-1",
                                            "text": "文档1",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-2",
                                            "text": "文档2",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-3",
                                            "text": "文档3",
                                            "icon": "fa fa-folder icon-state-success"
                                        }
                                    ]
                                }
                            ]
                        }]
                }]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "dnd", "state", "types"]
        });


    };

    var ajaxTreeSample = function () {

        $("#tree_4").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                // so that create works
                "check_callback": true,
                'data': {
                    'url': function (node) {
                        return 'demo/jstree_ajax_data.php';
                    },
                    'data': function (node) {
                        return {'parent': node.id};
                    }
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo3"},
            "plugins": ["dnd", "state", "types"]
        });
    };

    //权限管理  部门树
    var departmentTree=function (){
        var $tree=$('#departmentTree');
        $tree.jstree({
            "core": {
                "themes": { "responsive": false },
                "check_callback": true,
                'data':[{
                    "id":"all",
                    "text": "九院设计部",
                    "state": {"opened": true },
                    "children":[
                        {
                            "id": "part1",
                            "text": "科室一",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "id": "part2",
                            "text": "科室二",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "id": "part2",
                            "text": "科室三",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                    ]
                }]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "dnd", "state", "types"]
        });//刷新

        //选中节点
        $tree.on('select_node.jstree',function(e,data){
            //加载该节点下所有人员的权限列表
            var id=data.node.id;
            var condition={
                did:id
            };
            var name=data.node.text;
            $('#listTitle').text(name);
            $('#selecdDepartmenId').val(id);
            $('#selecdDepartment').val(name);
            initAccessList(condition);
        });

        //重命名节点
        $tree.on('rename_node.jstree',function(e,data){
            var nodeId=data.node.id;
            var oldName=data.old;
            var name=data.text;
            var parentId=data.node.parent;
            var names=$('#'+data.node.parent).text().replace(name,'');
            $('#nodeParentNames').val(names);//用来判断同一个父节点下是否重名

            if(oldName=='New node'){

                var pName=$('#'+data.node.parent).children('a').text();
                $('#parentNodeName').val(pName);
                $('#parentNodeId').val(parentId);
                $('#newNodeName').val(name);

                var $modal=$('#addNodeModal');
                var $tip=$('#updateNodeTip');
                var message='确定添加新部门吗?';

                //设置保存和取消的方法
                $('#addDepartmentNode').on('click',addDepartmentNode);
                $('#cancelAddDepartmentNode').on('click',function(){
                    cancelUpdatePartTree($modal,$tip,message);
                });

                //设置模态框
                $modal.modal('show');
                $modal.on('hidden.bs.modal', function (e) {
                    cancelUpdatePartTree($modal,$tip,message);
                });
            }else{
                $('#pNodeId').val(parentId);
                $('#nodeId').val(nodeId);
                $('#oldName').val(oldName);
                $('#newName').val(name);

                var $modal=$('#updateNodeModal');
                var $tip=$('#updateNodeTip');
                var message='确定要修改节点名称吗?';

                //设置保存和取消的方法
                $('#updateDepartmentNode').on('click',updateDepartmentTree);
                $('#cancelUpdateDepartmentNode').on('click',function(){
                    cancelUpdatePartTree($modal,$tip,message);
                });

                //设置模态框
                $modal.modal('show');
                $modal.on('hidden.bs.modal', function (e) {
                    cancelUpdatePartTree($modal,$tip,message);
                });
            }
        });

        //删除节点
        $tree.on('delete_node.jstree',function(e,data){

            var nodeId=data.node.id;
            var name=data.text;
            $('#deleteId').val(nodeId);
            $('#deleteName').val(name);

            var $modal=$('#updateNodeModal');
            var $tip=$('#deleteNodeTip');
            var message='确定以下部门吗?';

            $('#deleteDepartmentNode').on('click',deleteDepartmentNode);
            $('#canceldeleteDepartmentNode').on('click',function(){
                cancelUpdatePartTree($modal,$tip,message);
            });

            //设置模态框
            $modal.modal('show');
            $modal.on('hidden.bs.modal', function (e) {
                cancelUpdatePartTree($modal,$tip,message);
            });
        });
    };

    var documentTree = function () {
        var  $tree=$("#documentTree");
        $tree.jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': [{
                    "id":"all",
                    "text": "九院设计部",
                    "children": [
                        {
                            "id": "part1",
                            "text": "科室一",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "id": "part2",
                            "text": "科室二",
                            "icon": "fa fa-folder icon-state-danger"
                        },
                        {
                            "id": "part3",
                            "text": "科室三",
                            "state": {
                                "selected": true,
                                "opened": true
                            },
                            "children": [
                                {
                                    "id": "part3-EBOM",
                                    "text": "EBOM",
                                    "state": { "opened": false },
                                    "children":[
                                        {
                                            "id": "part3-Document-1",
                                            "text": "文档1",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-2",
                                            "text": "文档2",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-3",
                                            "text": "文档3",
                                            "icon": "fa fa-folder icon-state-success"
                                        }
                                    ]
                                },
                                {
                                    "id": "part3-PBOM",
                                    "text": "POM",
                                    "state": {"opened": false },
                                    "children":[
                                        {
                                            "id": "part3-Document-1",
                                            "text": "文档1",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-2",
                                            "text": "文档2",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-3",
                                            "text": "文档3",
                                            "icon": "fa fa-folder icon-state-success"
                                        }
                                    ]
                                },
                                {
                                    "id": "part3-Document",
                                    "text": "文档",
                                    "state": {"opened": false },
                                    "children":[
                                        {
                                            "id": "part3-Document-1",
                                            "text": "文档1",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-2",
                                            "text": "文档2",
                                            "icon": "fa fa-folder icon-state-success"
                                        },
                                        {
                                            "id": "part3-Document-3",
                                            "text": "文档3",
                                            "icon": "fa fa-folder icon-state-success"
                                        }
                                    ]
                                }
                            ]
                        }]
                }]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["contextmenu", "dnd", "state", "types"]
        });
        //选中节点
        $tree.on('select_node.jstree',function(e,data){
            //加载该节点下所有人员的权限列表
            $('#listTitle').text(data.node.text);
        });
    };


    return {
        //main function to initiate the module
        init: function () {
            handleSample1();
            handleSample2();
            contextualMenuSample();
            contextualMenuSample2();
            contextualMenuSample6();
            contextualMenuSample7();
            companyTree();
            ajaxTreeSample();
            departmentTree();

            documentTree();


        }

    };

}();