<?php
  include 'conn.php';

  $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;

  $sql = "SELECT * FROM goods WHERE pid='$id'";
  $res = $conn->query($sql);
  if($res->num_rows) {
    $good = $res->fetch_array(MYSQLI_ASSOC);
    echo json_encode($good,JSON_UNESCAPED_UNICODE);
  }else{
      echo 0;     //不存在该商品
  }

  $res->close();//关闭结果集
  $conn->close();//关闭数据库
?>