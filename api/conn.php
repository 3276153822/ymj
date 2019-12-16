<?php
    //1.建立连接：文件名不能用con.php 系统有个文件就是con文件
    $severname = '127.0.0.1';//主机名
    $username = 'root';//用户名
    $password = '';//密码 变量名$pwd $psw可能会报错
    $dbname = 'ymj';//要连接的数据库名

    $conn = new mysqli($severname,$username,$password,$dbname);
    mysqli_query($conn, "set names 'utf8'");
    //获取对象的属性：js中arr.length;php用->获取属性和方法 $con->属性名；$conn->方法名();
    if($conn->connect_error) {
        //连接失败
        die('失败的原因'.$conn->connect_error);
    }else{
        // echo '连接成功';//检测成功后就可以注释了
    }
    
?>