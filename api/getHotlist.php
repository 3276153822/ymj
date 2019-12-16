<?php
  include 'conn.php';

  $sql1 = "SELECT * FROM goods ORDER BY commentNum DESC LIMIT 1,5";
  $res1 = $conn->query($sql1);
  $arr1 = $res1->fetch_all(MYSQLI_ASSOC);
  $sql2 = "SELECT * FROM goods WHERE pname LIKE '%整箱%' LIMIT 0,5";
  $res2 = $conn->query($sql2);
  $arr2 = $res2->fetch_all(MYSQLI_ASSOC);
  $sql3 = "SELECT * FROM goods WHERE pname LIKE '%名庄%' LIMIT 0,5";
  $res3 = $conn->query($sql3);
  $arr3 = $res3->fetch_all(MYSQLI_ASSOC);
  $sql4 = "SELECT * FROM goods WHERE label='陈年老酒' ORDER BY soldNum DESC LIMIT 0,5";
  $res4 = $conn->query($sql4);
  $arr4 = $res4->fetch_all(MYSQLI_ASSOC);
  $sql5 = "SELECT * FROM goods WHERE label='白酒' LIMIT 0,5";
  $res5 = $conn->query($sql5);
  $arr5 = $res5->fetch_all(MYSQLI_ASSOC);
  // $conn->set_charset('utf8');

  $arr = array_merge($arr1,$arr2,$arr3,$arr4,$arr5);

  echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  $res1->close();//关闭结果集
  $res2->close();
  $res3->close();
  $res4->close();
  $res5->close();
  $conn->close();//关闭数据库
?>