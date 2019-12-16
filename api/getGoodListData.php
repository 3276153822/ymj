<?php
  include 'conn.php';

  $n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 30;	//每页显示条数
  $sort = (isset($_REQUEST['sort']) && $_REQUEST['sort'] != '') ? "ORDER BY ".$_REQUEST['sort'] : '';	//排序规则
  $label = (isset($_REQUEST['kind']) && $_REQUEST['kind'] != '') ? "label='".$_REQUEST['kind']."'" : '';	//分类规则
  $price = (isset($_REQUEST['price']) && $_REQUEST['price'] != '') ? "price ".$_REQUEST['price'] : '';	//价格区间

  if($label != '' && $price != ''){
    $where = "WHERE ".$label." AND ".$price;
  }else if($label == '' && $price == ''){
    $where = "";
  }else{
    $word = ($label == '')?$price:$label;
    $where = "WHERE ".$word;
  }
  

  $sql = "SELECT * FROM goods {$where} {$sort}";
  $res = $conn->query($sql);
  $arr = $res->fetch_all(MYSQLI_ASSOC);
  $conn->set_charset('utf8');
  
  $list = array(
    'page' => ceil(($res->num_rows) / $n),
    'num' => $res->num_rows
  );
 

  echo json_encode($list,JSON_UNESCAPED_UNICODE);
  $res->close();//关闭结果集
  $conn->close();//关闭数据库
?>
