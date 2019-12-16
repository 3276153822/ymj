<?php
  include 'conn.php';

  $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '';

  $sql1 = "SELECT o.cid,o.pid,g.pname,g.enName,g.imgURL,g.price,o.num FROM cart as o LEFT JOIN goods AS g on o.pid=g.pid WHERE o.uid=(SELECT uid FROM users WHERE phone='$phone') ORDER BY o.cid DESC";
  $res1 = $conn->query($sql1);
  // $arr = $res1->fetch_all(MYSQLI_ASSOC);

  $num = 0;
  $total = 0;
  for($i=0; $i < $res1->num_rows; $i++){
    $item = $res1->fetch_array(MYSQLI_ASSOC);
    if($i < 4){
      $arr[$i] = $item;
    }
    // global $num;
    // global $total;
    $num += intval($item['num']);
    $total += intval($item['price']) * intval($item['num']);
  }

  $arr1 = array(
    'num'=>$num,  //购物车商品数量
    'total'=>$total,  //商品总价
    'arr'=>$arr       //前四条数据
  );

  echo json_encode($arr1,JSON_UNESCAPED_UNICODE);
  $res1->close();//关闭结果集
  $conn->close();//关闭数据库
?>