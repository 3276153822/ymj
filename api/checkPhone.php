<?php
    //连接数据库
    include 'conn.php';

    //接收前端数据
    $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '';

    //查询语句
    $sql = "SELECT * FROM users WHERE phone='$phone'";

    //执行语句
    $res = $conn->query($sql);

    // var_dump($res);
    if($res->num_rows) {
        echo 'no';
    }else{
        echo 'yes';
    }
    
    //3.关闭连接
    $res->close();//关闭结果集
    $conn->close();//关闭数据库
?>