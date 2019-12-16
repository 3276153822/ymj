<?php
  include 'conn.php';
  $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '';
  $n = isset($_REQUEST['n']) ?  intval($_REQUEST['n']) : 1;
  $id = isset($_REQUEST['id']) ?  intval($_REQUEST['id']) : 0;

  
  $sql1 = "SELECT uid FROM users WHERE phone='$phone'";
  $res1 = $conn->query($sql1)->fetch_assoc();   

  $sql2 = "SELECT * FROM cart WHERE uid=".intval($res1['uid'])." AND pid=$id";
  $res2 = $conn->query($sql2);
  if($res2->num_rows) {
    $sql = "SELECT stock FROM goods WHERE pid=$id";
    $res = $conn->query($sql)->fetch_assoc();
    $sql4 = "SELECT num FROM cart WHERE pid=$id AND uid=".intval($res1['uid']);
    $res4 = $conn->query($sql4)->fetch_assoc();
    if($n + intval($res4['num'])  > intval($res['stock'])){
      echo 'false';
    }else{
      $arr = $res2->fetch_array(MYSQLI_ASSOC);
      $num = intval($arr['num']) + $n;
      $sql3 = "UPDATE cart SET num=$num WHERE uid=".intval($res1['uid'])." AND pid=$id";
      $res3 = $conn->query($sql3);
      if($res3) {
        //true：添加成功
        echo 'yes';
      }else{
        //false：失败
        echo 'no';
      }
    }    
  }else{
    $sql5 = "INSERT INTO cart(uid,pid,num) VALUES(".intval($res1['uid']).",$id,$n)";
    $res5 = $conn->query($sql5);
    
    if($res5) {
      //true：添加成功
      echo 'yes';
    }else{
      //false：失败
      echo 'no';
    }
  }
         
  $conn->close();//关闭数据库
?>