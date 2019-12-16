<?php
  include 'conn.php';

  $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '';
  $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';

  $sql = "select * from users where phone='$phone'";
  $res = $conn->query($sql);

  if($res->num_rows) {
    $arr = $res->fetch_array(MYSQLI_ASSOC);
    if($arr['password'] == $password){
          echo 'yes';
      }else{
          echo 'no';   //旧密码不正确
      }
  }else{
      echo 0;     //不存在该用户
  }

  $res->close();
  $conn->close();//关闭数据库
?>