<?php
  include 'conn.php';

  $sql1 = "SELECT * FROM goods WHERE pid BETWEEN 891 and 895";
  $res1 = $conn->query($sql1);
  $arr = $res1->fetch_all(MYSQLI_ASSOC);
  // $conn->set_charset('utf8');

  echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  $res1->close();//关闭结果集
  $conn->close();//关闭数据库
?>