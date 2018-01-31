<?php

/*
虽然本文件中从 验证码数据表 中获取手机号为指定手机号的行，用的是索引数组
不过本文件的算法如果没有时间差的话并不会产生索引数组长度大于1的情况
万一产生了，后续对于这写数据的读取也是以第一个值为标准
这种情况下也产生不了什么大问题
*/



header("content-type:text/html;charset=utf-8");  
date_default_timezone_set("Asia/Shanghai");

//默认情况下php给html返回json数据时如果php报错，则整个json将无法返回（返回给php还没测试）
//该函数在json情况下提供报错功能，但解析错误和致命错误无法报错，且会导致返回数据错误
function ErrorToJson($error_level,$error_message,
$error_file,$error_line){ 
	global $echo;
	$echo['err'][]=array('error_level'=>$error_level,//级别号
						'error_message'=>$error_message,//错误信息
						'error_file'=>$error_file,//错误文件位置
						'error_line'=>$error_line);//错误行号
}
set_error_handler("ErrorToJson");

//检验输入手机号格式是否符合要求
//若符合则进入后续代码
$receive_phone=$_POST['phone'];
if(!preg_match("/^1[0-9]{10}$/",$receive_phone)){
	$echo['msg']='请输入正确手机号码';
}else{
	$echo['msg']='输入手机号格式符合要求';
	//生成随机验证码
	$verification_code=rand(100000,999999); 

	//连接数据库需要的各种信息
	$db_server = 'localhost';
	$db_username = 'root';
	$db_password = 'root';
	$db_type='mysql';
	$db_name='fkqqnptb_small_blog'; 
	$db_tsn="$db_type:host=$db_server;dbname=$db_name;charset=utf8";
	 
	$conn = new PDO($db_tsn, $db_username, $db_password);

	$conn->setAttribute(PDO::ATTR_ERRMODE, false);
	//查
	foreach ($conn->query("SELECT * from verification_code WHERE phone='$receive_phone'") as $row) {
		//获取 验证码数据表 中 “手机号”数据 与输入手机号相同的行的 “提交时间”数据
		$db_msg[]=array('submit_time'=>$row['submit_time']); 
	}
	//如果该数据表中没有与输入手机号相同的 “手机号”数据 
	//则命令短信服务商发送验证码，并将该验证码相关信息放入数据表
	if(!isset($db_msg)){
		$echo['msg']='验证码已发送，有效期为2分钟';
		$echo['log']='获取前该手机号验证码不存在'; 
		add_verification_code();
	}
	//如果 “提交时间”数据 过早
	//则将原来 验证码数据表 中关于这个手机号的验证码全部删除
	//再命令短信服务商发送验证码，并将该验证码相关信息放入数据表
	else if(IfSubmittimeTooEarly()){
		$echo['msg']='验证码已发送，有效期为2分钟';
		$echo['log']='获取前该手机号验证码存在，且已经过期'; 
		//删除原来残留的行
		$conn->query("DELETE FROM verification_code WHERE phone='$receive_phone'");
		add_verification_code();
	}
	//剩下的情况就是“验证码2分钟内已发送过”的情况
	//这种情况就提示用户无需重复获取
	else{
		$echo['msg']='验证码2分钟内已发送过，请勿重复获取';
		$echo['log']='获取前该手机号验证码存在，且未过期'; 
	} 
	
	$conn = null;//关闭连接
}

echo json_encode($echo);

function add_verification_code(){
	global $verification_code,$receive_phone,$conn,$echo;
	
	//------------------以下为请求短信商服务器发送短信代码-------------------
	
    require 'submail_php_sdk_master/app_config.php'; 
    require_once('submail_php_sdk_master/SUBMAILAutoload.php');
       
    $submail=new MESSAGEXsend($message_configs);
    
    /*
     |必选参数
     |--------------------------------------------------------
     |设置短信接收的11位手机号码
     |--------------------------------------------------------
     */    
    $submail->setTo('18368492446');
    
    /*
     |必选参数
     |--------------------------------------------------------
     |设置短信模板ID
     |--------------------------------------------------------
     */    
    $submail->SetProject('Q4Daw3');
    
    /*
     |可选参数
     |--------------------------------------------------------
     |添加文本变量
     |可多次调用
     |--------------------------------------------------------
     */   
    $submail->AddVar('code',$verification_code);
    $submail->AddVar('use','注册帐号');
    
    /*
     |调用 xsend 方法发送短信
     |--------------------------------------------------------
     */    
    $xsend=$submail->xsend();
    
    
    /*
     |打印服务器返回值
     |--------------------------------------------------------
     */
    $echo['log']=$echo['log'].' 短信商服务器返回内容: '.$xsend;
    //print_r($xsend);
	//------------------以上为请求短信商服务器发送短信代码-------------------
		
	//增
	$sql = "INSERT INTO verification_code (verification_code,phone,submit_time)
	VALUES ('$verification_code','$receive_phone',NOW())";
	$conn->exec($sql);
	
	/*
	关于定时自删的问题以后再考虑，目前已存放部分测试脚本在small_problem/delay_delete里
	有两个思路：
	1、改变php最大时间限制后用sleep()
	2、mysql定期检测过期数据并进行自删
	*/
}

//比较数据表中指定行的 “提交时间”数据 与现在的时间
//如果现在时间比提交时间大得超过30秒则返回true
//反之返回false
function IfSubmittimeTooEarly(){
	global $db_msg;
	$db_time=$db_msg[0]['submit_time'];
	$now_time=date("Y-m-d h:i:sa");
	$db_time_s=strtotime($db_time);
	$now_time_s=strtotime($now_time);
	if($now_time_s>$db_time_s+30){//测试用30秒。项目用120
		return true;
	}else{
		return false;
	}
}


?>