require(["config"], function() {
  require(["common", "jquery"], function($jq, obj) {
    changeName();
    toCart();
    let user = getCookie("username");
    if (user) {
      getCart(user);
    }
    //如果上面的子模块都加载完成，就会触发这里的功能
    $(".nav-group")
      .eq(0)
      .html(getNav()); //渲染三级菜单

    //获取数据
    function getList(url, arg, fnBefore, fnAfter) {
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

    //存规则
    let label = "";
    let sort = "";
    let price = "";
    let pageMax = 0;
    let pageNow = 1;

    function getData(page) {
      getList(
        "../api/getGoodList.php",
        { page: page, n: 30, kind: label, sort: sort, price: price },
        function(str) {
          scrollTo(0, 0);
          pageNow = page;
          console.log(pageNow);
          $("#page-now").html(page);
          if (page == 1) {
            $(".prev").each(function() {
              if (!$(this).hasClass("disabled")) {
                $(this).addClass("disabled");
              }
            });
          } else {
            $(".prev").each(function() {
              if ($(this).hasClass("disabled")) {
                $(this).removeClass("disabled");
              }
            });
          }
          if (page == pageMax) {
            $(".next").each(function() {
              if (!$(this).hasClass("disabled")) {
                $(this).addClass("disabled");
              }
            });
          } else {
            $(".next").each(function() {
              if ($(this).hasClass("disabled")) {
                $(this).removeClass("disabled");
              }
            });
          }
          let item = JSON.parse(str);
          let html = "";
          item.data.forEach(i => {
            html += `<div class="good-item" onclick="turnTo(${i.pid})">
          <a href="javascript:void(0)" class="item-img">
            <img src="${i.imgURL}" alt="商品图片" />
          </a>
  
          <div class="item-text">
            <a class="pname" title="${i.pname}">
              <span class="cn">${i.pname}</span>
              <span class="en" title="${i.enName}">${i.enName}</span>
              <span class="promo" title="${i.promo}">${i.promo}</span>
            </a>
  
            <p class="price">
              ¥<strong style="font-family:inherit;">${i.price}</strong>
            </p>
  
            <a class="item-btn" href="javascript:void(0)">加入购物车</a>
          </div>
          <dd class="sum">
            <span class="ratecount"><strong>${i.ratecount}%</strong>好评度</span>
            <span class="commentcount">
              <a href="javascript:void(0)"><strong>${i.commentNum}</strong></a>评论
            </span>
            <span class="soldnum"><strong>${i.soldNum}</strong>售出</span>
          </dd>
        </div>`;
          });

          $(".goodlist").html(html);
        }
      );
    }

    function init() {
      getList(
        "../api/getGoodListData.php",
        {
          kind: label,
          sort: sort,
          price: price
        },
        function(str) {
          let data = JSON.parse(str);
          pageMax = data.page;
          $("#good-num").html(data.num);
          $("#page-num").html(data.page);
          getData(1);
        },
        function() {}
      );
    }
    init();

    $(".first").click(function() {
      getData(1);
    });

    $(".last").click(function() {
      getData(pageMax);
    });

    $(".next").each(function() {
      $(this).click(function() {
        if (!$(this).hasClass("disabled")) {
          pageNow++;
          getData(pageNow);
        }
      });
    });

    $(".prev").each(function() {
      $(this).click(function() {
        if (!$(this).hasClass("disabled")) {
          pageNow--;
          getData(pageNow);
        }
      });
    });

    $(".page-turn").click(function() {
      let input = $("#input")
        .val()
        .trim();
      let reg = new RegExp("^[0-9]*$");
      if (reg.test(input)) {
        if (parseInt(input) > 0 && parseInt(input) <= pageMax) {
          getData(parseInt(input));
          $("#input").val("");
        } else {
          alert("请输入正确的页数！");
        }
      } else {
        alert("请输入正确的数字！");
      }
    });

    $(".selector-box")
      .eq(0)
      .click(function(event) {
        if ($(event.target).is("a")) {
          $(event.target)
            .addClass("chosen")
            .siblings()
            .removeClass("chosen");
          label =
            $(event.target).html() == "不限" ? "" : $(event.target).html();
          init();
        }
      });

    $(".selector-box")
      .eq(1)
      .click(function(event) {
        if ($(event.target).is("a")) {
          $(event.target)
            .addClass("chosen")
            .siblings()
            .removeClass("chosen");
          let d = $(event.target)
            .attr("data-bt")
            .split("-");
          let s = `BETWEEN ${d[0]} AND ${d[1]}`;
          price = $(event.target).html() == "不限" ? "" : s;
          init();
        }
      });

    $(".good-sort").click(function(event) {
      let $tar = null;

      if ($(event.target).is("a")) {
        if (!$(event.target).hasClass("active")) {
          $tar = $(event.target);
          $(event.target)
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      } else if ($(event.target).is("span")) {
        if (
          !$(event.target)
            .parent()
            .hasClass("active")
        ) {
          $tar = $(event.target).parent();
          $(event.target)
            .parent()
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      }

      if ($tar != null) {
        sort = $tar.text() == "默认" ? "" : $tar.attr("data-type") + " DESC";
        init();
      }
    });
  });
});
