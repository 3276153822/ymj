<?php
  include 'conn.php';

  $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '';
  $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;

  $sql1 = "DELETE FROM cart WHERE uid=(SELECT uid FROM users WHERE phone='$phone') AND pid=$id";
  $res1 = $conn->query($sql1);
 
  if($res1) {
    //true：删除成功
    echo 'yes';
  }else{
    //false：失败
    echo 'no';
  }

  $conn->close();//关闭数据库
?>