// 所有模块都通过 define 来定义
define(function (require, exports, module) {
    var base = require('base');
    var core = require('core');
    // 通过 require 引入依赖
    var F = module.exports = {
        basepath: '',
        codeName:'',
        charge_code_id:'',
        table:new core.Table('areaChargeCodeTable'),
        init:function(_basepath) {
            F.basepath = _basepath;
           // $("#charge-code-area-header .actions").append("<a href='#' id='allCheck' data-toggle='modal' class='btn btn-small btn-success' style='margin-left:5px'><i class='icon-plus'></i>全部选中</a>");
          //  $("#charge-code-area-header .actions").append("<a href='#' id='allCancel' class='btn btn-danger btn-small' style='margin-left:5px'><i class='icon-remove'></i>全部取消</a>");
          //  $("#charge-code-area-header .actions").append("<a href='#' id='allSubmit' class='btn btn-warning btn-small' style='margin-left:5px'><i class='icon-remove'></i>全部提交</a>");
	        
	        operateEvents = {
			        /**
					 * 
					 */
			        'click .setChargeArea': function (e, value, row, index) {
			        	var code_id = row.id;
			        	var code_name = row.code_name;
			        	$('#code_name').text(code_name);
			        	$('.chargeId').each(function(){
							$(this).val(code_id);
	              	  	});
			        	F.initAreaCharge(code_id,false);
			        },
			        /**
					 * 删除菜单
					 */
			        'click .viewAreaLimit': function (e, value, row, index) {
			        	var code_id = row.id;
			        	var code_name = row.code_name;
			        	$('#code_name').text(code_name);
			        	F.initAreaCharge(code_id,true);
			        }
			    };
		        
		        var cols = [
		                   {
		    			        field: 'id',
		    			        title: '菜单主键',
		    			        visible:false
		    		        },{
		        		        field: 'code_name',
		        		        title: '计费代码名称'
		        		    }];
		        cols.push({
			    	align: 'center',
			        title: '操作',
			        events: operateEvents,
			        formatter:F.operateFormatter
			    });
	    		F.table.init(F.basepath+'/main/charge_code/get-list-charge-codes',cols);
	    		
				/**
				 * 提交表单
				 */
				$('#btnSubmit').click(function(){
					F.submit();
	            });
				$('#allCheck').click(function(){
					$('input[name=check]').each(function(){
						 $(this).attr("checked",true);
              	  	});
				});
				$('#allCancel').click(function(){
					$('input[name=check]').each(function(){
						$(this).attr("checked",false);
              	  	});
				});

				$('#allSubmit').click(function(){
					var code_name = $('#code_name').text();
					if(!code_name||code_name==''){
						base.bootAlert({"ok":false,"msg":"请先选择计费代码设置，然后做设置"});
						return;
					}else{
						var datas=[]; 
						$('input[name=check]').each(function(){
							var id = $(this).attr('id');
							var charge_code_id = $('#charge_id_'+id).val(); 
							var code_area_id =$('#hidden_'+id).val(); 
							var checkBox = $('#'+id);
							if(checkBox.attr("checked")){//已选择
								var rxl = $('#rxl_'+id).val();
								var yxl = $('#yxl_' + id).val();
								var data = {id:code_area_id,area_id:id,charge_code_id:charge_code_id,checked:1,rxl:rxl,yxl:yxl};
							}else{
								var data = {id:code_area_id,area_id:id,charge_code_id:charge_code_id,checked:0,rxl:-1,yxl:-1};
							}
							datas.push(data);
						});
						var url = F.basepath+'/main/charge_code_rule/area/set-all-area';
						var list = {list:datas};
						base.ajaxRequest(url,datas,function(data, status){
							//F.initAreaCharge(charge_code_id,false);
						},function(){
							//alert("异常");
						});
					}
				});
				//单个提交
				$("a[class='btn btn-success btn-small']").click(function(){
					var id = $(this).attr('id').substr(3);
					var charge_code_id = $('#charge_id_'+id).val(); 
					if(charge_code_id){
						var code_area_id =$('#hidden_'+id).val(); 
						var checkBox = $('#'+id);
						if(checkBox.attr("checked")){//已选择
							var rxl = $('#rxl_'+id).val();
							var yxl = $('#yxl_' + id).val();
							if(!rxl){
								rxl=-1;
							}
							if(!yxl){
								yxl=-1
							}
							var data = {id:code_area_id,area_id:id,charge_code_id:charge_code_id,checked:1,rxl:rxl,yxl:yxl};
						}else{
							var data = {id:code_area_id,area_id:id,charge_code_id:charge_code_id,checked:0,rxl:-1,yxl:-1};
						}
						var url = F.basepath+'/main/charge_code_rule/area/set-one-area';
						base.ajaxRequest(url,data,function(data, status){
							F.initAreaCharge(charge_code_id,false);
						},function(){
							//alert("异常");
						});
					}else{
						base.bootAlert({"ok":false,"msg":"请先选择计费代码设置，然后做设置"});
					}
				});
        },submit:function(){
        	var url = F.basepath+'/main/charge_code_rule/disableTime/create';
        	var options = {
                    success: F.showResponse,      //提交后的回调函数
                    url: url,       //默认是form的action， 如果申明，则会覆盖
                    type: 'post',               //默认是form的method（get or post），如果申明，则会覆盖
                    dataType: 'json',           //html(默认), xml, script, json...接受服务端返回的类型
                    clearForm: true,          //成功提交后，清除所有表单元素的值
                    timeout: 30000               //限制请求的时间，当请求大于3秒后，跳出请求
                }
        	$('#submit-form').ajaxForm(options);
        },showResponse:function(data, status){
            base.bootAlert(data);
            if (data.ok) {
            	core.closeModel('modal-charge-code-disable-time');
            	F.reload();
            }
        },delDisableTime:function(ids){
        	base.ajaxRequest(F.basepath+'/main/charge_code_rule/disableTime/del',{"chargeCodeDisableTimeIds":ids},function(data){
        		base.ajaxSuccess(data);
        		F.reload();
        	},function(){
        		base.bootAlert({"ok":false,"msg":"网络异常"});
        	});
        },reload:function(){
        	F.chargeCodeTimeRuleTable.reload();
        },
        operateFormatter:function (value, row, index) {
        	var _btnAction = "";
        	if (base.perList.menu.grant) {
        		_btnAction += "<a class='setChargeArea btn btn-primary btn-small' href='#' title='设置适用区域' style='margin-left:5px'>设置适用区域</a>";
        		_btnAction += "<a class='viewAreaLimit btn btn-primary btn-small' href='#' title='查看适用区域' style='margin-left:5px'>查看</a>";
        	}
        	return _btnAction;
        },initAreaCharge:function(code_id,isview){
        	var data = {"code_id":code_id};
        	var url = F.basepath+'/main/charge_code_rule/area/get-list-area';
        	//清除全部的内容
        	$('input[name=check]').each(function(){
	       		 $(this).attr("checked",false);
		     });
	       	 $('input[name=rxl]').each(function(){
	       		    $(this).val('');
	       	  });
	       	 $('input[name=yxl]').each(function(){
	       		    $(this).val('');
	       	  });
	       	 $('.codeAreaId').each(function(){
	       		 $(this).val('');
	       	 });
        	base.ajaxRequest(url,data,function(data, status){
                 if (data.ok) {
                	// base.bootAlert(data);
                	 var dataArray = data.data;
                 	//数据绑定到使用区域设置中
                	 for(var i=0;i<dataArray.length;i++){
                		 var one = dataArray[i];
                		 var area_id = one.area_id;
                		 var id = one.id;
                		 var rxl = one.rxl;
                		 var yxl = one.yxl;
                		 $('#'+area_id).attr("checked",true);
                		 $('#rxl_'+area_id).val(rxl);
                		 $('#yxl_'+area_id).val(yxl);
                		 $('#hidden_'+area_id).val(id);
                	 }
                	//清除全部选中
                	 $('input[name=check]').each(function(){
                		  //设置是否可写
                       	 if(isview){
                       		 $(this).attr('disabled','disabled');
                       	 }else{
                       		 $(this).removeAttr('disabled');
                       	 }
                	  });
                	 $('input[name=rxl]').each(function(){
                		    //设置是否可写
                          	 if(isview){
                          		 $(this).attr('disabled','disabled');
                          	 }else{
                          		 $(this).removeAttr('disabled');
                          	 }
                	  });
                	 $('input[name=yxl]').each(function(){
                		    //设置是否可写
                          	 if(isview){
                          		 $(this).attr('disabled','disabled');
                          	 }else{
                          		 $(this).removeAttr('disabled');
                          	 }
                	  });
                	
                 }else{
                	 //清除全部选中
                	 $('input[name=check]').each(function(){
                		 $(this).attr("checked",false);
                		  //设置是否可写
                       	 if(isview){
                       		 $(this).attr('disabled','disabled');
                       	 }else{
                       		 $(this).removeAttr('disabled');
                       	 }
                	  });
                	 $('input[name=rxl]').each(function(){
                		    $(this).val('');
                		    //设置是否可写
                          	 if(isview){
                          		 $(this).attr('disabled','disabled');
                          	 }else{
                          		 $(this).removeAttr('disabled');
                          	 }
                	  });
                	 $('input[name=yxl]').each(function(){
                		    $(this).val('');
                		    //设置是否可写
                          	 if(isview){
                          		 $(this).attr('disabled','disabled');
                          	 }else{
                          		 $(this).removeAttr('disabled');
                          	 }
                	  });
                	
                 }
        	},function(){
        		//alert("异常");
        	});
        }
    };

});
