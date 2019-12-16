require(["config"], function() {
  require(["common", "jquery"], function($jq, obj) {
    changeName();
    toCart();
    if (getCookie("username")) {
      getCart(getCookie("username"));
    }

    $(".nav-group")
      .eq(0)
      .html(getNav()); //渲染三级菜单

    //获取数据
    function getData(url, arg, fnBefore, fnAfter) {
      let p = new Promise(resolve => {
        $.ajax({
          type: "post",
          url: url,
          data: arg,
          success: str => {
            // console.log(str);
            fnBefore(str);
            resolve(str); //把DOM操作放到外面进行
            // fn(str);
          }
        });
      });

      p.then(data => {
        if (fnAfter) {
          //选填
          fnAfter(data);
        }
      });
    }

    let gid = parseInt(window.location.href.split("=")[1]);
    //数据渲染
    getData(
      "../api/getGood.php",
      { id: gid },
      function(str) {
        let data = JSON.parse(str);
        $(document).attr("title", data.pname);
        $(".big-img img").attr(
          "src",
          data.imgURL.split("_")[0] +
            "_220x360." +
            data.imgURL.split("_")[1].split(".")[1]
        );
        $(".large-img").css(
          "background-image",
          "url(" +
            data.imgURL.split("_")[0] +
            "_220x360." +
            data.imgURL.split("_")[1].split(".")[1] +
            ")"
        ); /* _380x620.*/
        $(".little-list img").attr("src", data.imgURL);
        $(".title").html(data.pname);
        $("#rate").css("width", data.ratecount + "%");
        $(".comment a").html(data.commentNum);
        if (data.promo == "") {
          $(".promo-box").hide();
        } else {
          $(".promo-box dd").html(data.promo);
        }

        $(".price-box strong").html(data.price);
        $("#stock").html(data.stock);
      },
      function() {
        let maxNum = parseInt($("#stock").html());
        //加购物车
        $("#add").click(function() {
          let num = parseInt($("#num").val());
          if (num + 1 <= maxNum) {
            $("#num").val(num + 1);
          } else {
            alert("加购数量已达上限！");
          }
        });

        $("#minus").click(function() {
          let num = parseInt($("#num").val());
          if (num > 1) {
            $("#num").val(num - 1);
          } else {
            alert("加购数量不可小于1！");
          }
        });

        $("#num").keyup(function() {
          $(this).val(
            $(this)
              .val()
              .replace(/\D/g, "")
          );
          if (parseInt($(this).val()) > maxNum) {
            $(this).val(maxNum);
            alert("加购数量已达上限！");
          } else if (parseInt($(this).val()) < 1) {
            $(this).val(1);
            alert("加购数量不可小于1！");
          }
        });

        $("#to-cart").click(function() {
          if (getCookie("username")) {
            let phone = getCookie("username");
            let n = parseInt($("#num").val());
            getData(
              "../api/addToCart.php",
              { phone: phone, n: n, id: gid },
              function(str) {
                console.log(str);
                if (str == "false") {
                  alert("加购数量超过库存！");
                } else if (str == "no") {
                  alert("加入购物车失败！");
                } else if (str == "yes") {
                  getCart(getCookie("username"));
                }
              },
              function() {}
            );
          } else {
            alert("你尚未登录");
          }
        });
      }
    );

    $(".big-img img").mouseenter(function() {
      $(".large-img").show();
    });

    $(".big-img img").mouseleave(function() {
      $(".large-img").hide();
    });

    $(".big-img img").mousemove(function(event) {
      let x = event.offsetX; //鼠标在图片上的水平坐标
      let y = event.offsetY; //鼠标在图片上的垂直坐标
      if (x < 50) {
        x = 0;
      } else if (x > parseInt($(".big-img img").width()) - 50) {
        x = parseInt($(".big-img img").width()) - 100;
      } else {
        x = x - 50;
      }
      // shadow.style.left = x + 'px';

      if (y < 50) {
        y = 0;
      } else if (y > parseInt($(".big-img img").height()) - 50) {
        y = parseInt($(".big-img img").height()) - 100;
      } else {
        y = y - 50;
      }
      // shadow.style.top = y + 'px';

      //大图片对应的坐标
      let posX = (x / parseInt($(".big-img img").width())) * 340 * -1;
      let posY = (y / parseInt($(".big-img img").height())) * 490 * -1;
      $(".large-img").css("background-position", `${posX}px ${posY}px`);
    });
  });
});
