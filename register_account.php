<?php 
 
//为了操作时间不出现BUG，必须加上这一句
date_default_timezone_set("Asia/Shanghai");

//默认情况下php给html返回json数据时如果php报错，则整个json将无法返回（返回给php还没测试）
//该函数在json情况下提供报错功能，但解析错误和致命错误无法报错，除此外还会导致返回数据错误
function ErrorToJson($error_level,$error_message,
$error_file,$error_line){ 
	global $echo;
	$echo['err'][]=array('error_level'=>$error_level,//级别号
						'error_message'=>$error_message,//错误信息
						'error_file'=>$error_file,//错误文件位置
						'error_line'=>$error_line);//错误行号
}
//set_error_handler() 函数设置用户自定义的错误处理程序,可以通过trigger_error()触发
set_error_handler("ErrorToJson");

//连接数据库需要的各种信息
$db_server = 'localhost';
$db_username = 'root';
$db_password = 'root';
$db_type='mysql';
//连接的数据库名称
$db_name='fkqqnptb_small_blog'; 
$db_tsn="$db_type:host=$db_server;dbname=$db_name";
$conn = new PDO($db_tsn, $db_username, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);// 设置 PDO 错误模式，用于抛出数据库异常

//获取前端发来的各信息
$receive_phone=$_POST['phone'];
$receive_password=$_POST['password'];
$receive_username=$_POST['username'];
$receive_verification_code=$_POST['verification_code'];

//从 验证码数据表 中获取手机号为输入手机号的行
//并从该行取出验证 验证码所需的一些信息
foreach ($conn->query("SELECT * from verification_code WHERE phone='$receive_phone'") as $row) {
	$ds_verification_code[]=array('submit_time'=>$row['submit_time'],
									'phone'=>$row['phone'],
									'verification_code'=>$row['verification_code']); 
}

//如果 验证码数据表 中没有手机号为输入手机号的行
//则代表还未获取验证码
if(!$ds_verification_code){
	$echo['msg']= '请先获取验证码~';
}
//如果有多个手机号为输入手机号的行
//则提示用户 服务器出错，请重新获取验证码 并删除这些行
else if(count($ds_verification_code)>1){
	$conn->query("DELETE FROM verification_code WHERE phone='$receive_phone'");
	$echo['msg']= '服务器发生错误，请重新获取验证码并注册';
	$echo['log']= '数据库内有多个该手机号验证码，现已进行删除';
}
//剩下的情况就是只有一行的情况，也就是正常情况
else{
	//$db_time是从服务器获取的验证码获取时间
	$db_time=$ds_verification_code[0]['submit_time'];
	//PHP语言特点导致i表示分钟，因为m被月占用了
	$now_time=date("Y-m-d h:i:sa");
	$db_time_s=strtotime($db_time);
	$now_time_s=strtotime($now_time);
	
	//比较验证码的获取时间与现在的时间，如果差异超过30秒，则判断为验证码过期
	if($now_time_s>$db_time_s+30){//测试用30秒。项目用120
		//删除原来残留的行
		$conn->query("DELETE FROM verification_code WHERE phone='$receive_phone'");
		$echo['msg']= '验证码过期';
		$echo['log']= '数据库内验证码过期，现已进行删除';
	}else if($receive_verification_code==$ds_verification_code[0]['verification_code']){
		
		if(!HaveSameUsernameOrPhone()){
			$echo['msg']='注册成功';
			//增
			$sql = "INSERT INTO account (username, password,phone)
			VALUES ('$receive_username', '$receive_password', '$receive_phone')";
			$conn->exec($sql);//使用exec()不会返回结果 
		}
		
	}else{
		$echo['msg']='验证码错误';
	}
}

//检查输入的用户名或手机号是否已经被注册
//都没被注册的话返回true
function HaveSameUsernameOrPhone(){
	global $conn,$echo,$receive_phone,$receive_username;
	//查
	foreach ($conn->query('SELECT phone,username from account') as $row) {
		if($receive_phone==$row['phone']){
			$echo['msg']='该手机号已被注册，请更换手机号进行注册';
			return true;
			break;
		}else if($receive_username==$row['username']){
			$echo['msg']='该用户名已被注册，请更换用户名进行注册';
			return true;
			break;
		}
	}
	return false;
}

echo json_encode($echo);

$conn = null;//关闭连接

?>