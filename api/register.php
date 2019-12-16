<?php
  include 'conn.php';
  $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '123456';
  $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '123456';

  $sql = "INSERT INTO users(phone,password) VALUES('$phone','$password')";
  $res = $conn->query($sql);

  if($res) {
    //true：注册成功
    echo 'yes';
  }else{
    //false：失败
    echo 'no';
  }

  $conn->close();//关闭数据库
?>
