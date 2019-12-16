require(["config"], function() {
  require(["common", "jquery"], function($jq, obj) {
    //如果上面的子模块都加载完成，就会触发这里的功能
    $(".nav-group")
      .eq(0)
      .html(getNav()); //渲染三级菜单
  });

  require(["index", "jquery", "common"], function($jq, obj) {
    toCart();
    changeName();

    let user = getCookie("username");
    if (user) {
      getCart(user);
      $(".user-center").html(`<li><a href="javascript:void(0)">会员中心</a>
    </li><li><p>您好，</p></li><li><p>${user.slice(0, 4)}***${user.slice(
        7,
        11
      )}</p></li>`);
    }

    function findParent(ele, cn) {
      if (ele.hasClass(cn)) {
        return ele;
      } else {
        // return findParent(ele.parent(), cn);
        return ele.parent();
      }
    }

    //渲染轮播图
    getCarousel(carouselData);
    changeIndex(0);

    //开启轮播图定时器
    let bannerCarousel = null;
    let bannerT = 0;
    bannerCarousel = setInterval(function() {
      let lastBannerT = bannerT;
      bannerT++;
      if (bannerT >= carouselData.length) {
        bannerT = 0;
      }
      changeCarousel(bannerT, lastBannerT);
      changeIndex(bannerT);
    }, 5000);

    //鼠标移入banner
    $(".carousel-list").mouseenter(function() {
      clearInterval(bannerCarousel);
    });

    $(".carousel-list").mouseleave(function() {
      bannerCarousel = setInterval(function() {
        let lastBannerT = bannerT;
        bannerT++;
        if (bannerT >= carouselData.length) {
          bannerT = 0;
        }
        changeCarousel(bannerT, lastBannerT);
        changeIndex(bannerT);
      }, 5000);
    });

    $(".carousel-index")
      .eq(0)
      .mouseover(function(event) {
        if ($(event.target).is("span")) {
          let lastBannerT = bannerT;
          bannerT = parseInt($(event.target).html()) - 1;
          changeCarousel(bannerT, lastBannerT);
          changeIndex(bannerT);
        }
      });

    //公告选项卡
    $(".notice-list p").mouseover(function(event) {
      $(event.target)
        .addClass("active")
        .siblings()
        .removeClass("active");

      $(this)
        .siblings()
        .hide();

      let num = $(event.target).attr("data-index");
      $(".notice-ul")
        .eq(num)
        .show();
    });

    //倒计时
    function countdown(t, countdownId) {
      var now = new Date(); //当前时间
      var end = Date.parse(t); //结束时间
      var dis = end - Date.parse(now);

      if (dis == 0) {
        //倒计时结束后关闭setInterval()
        clearInterval(countdownId);
      }

      //一位数补零
      function toDb(num) {
        if (num < 10) {
          return "0" + num;
        } else {
          return "" + num;
        }
      }

      var d = parseInt(dis / (3600000 * 24)); //天
      var h = toDb(parseInt((dis % (3600000 * 24)) / 3600000)); //时
      var m = toDb(parseInt((dis % (60 * 60 * 1000)) / 60000)); //分
      // var s = parseInt((dis % 60000) / 1000) //秒

      var time = [];
      time.push(d);
      time.push(h);
      time.push(m);
      return time;
    }

    function setCD(cd, i) {
      $(".hot-list .tcd-d")
        .eq(i)
        .html(cd[0]);
      $(".hot-list .tcd-h")
        .eq(i)
        .html(cd[1]);
      $(".hot-list .tcd-m")
        .eq(i)
        .html(cd[2]);
    }

    //渲染hot-list
    getGood(
      "api/getHotlist.php",
      [],
      function(str) {
        //渲染列表
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">`;
          if (d < 5) {
            html += `<div class="prod-countdown">
            还剩<strong class="tcd-d">0000</strong>天<strong class="tcd-h"
              >00</strong
            >时<strong class="tcd-m">00</strong>分
          </div>`;
          }
          html += `<div class="img-box">
          <img src="${data[d].imgURL}" alt="商品图片" />
        </div>
        <div class="content-box">
          <a
            title="${data[d].pname}"
            class="pname"
            href="javascript:void(0)"
            >${data[d].pname}
            <span title="${data[d].enName}" class="en">${data[d].enName}</span>
          </a>
          <p class="price-box">
            <span class="price">
              <label>抢购价：</label>¥<strong>${data[d].price}</strong>
            </span>
          </p>
        </div>`;

          if (d >= 5) {
            html += `<div class="sum">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
          </div>`;
          }
          html += "</div>";
        }
        html += "</div>";
        // console.log(data);
        $(".hot-list section")
          .eq(0)
          .html(html);
      },
      function() {
        //绑定事件
        $(".hot-tab li").mouseenter(function(event) {
          let tar = null;
          if ($(event.target).is("li")) {
            tar = $(event.target);
          } else {
            tar = $(event.target).parent();
          }
          //高亮
          tar
            .addClass("active")
            .siblings()
            .removeClass("active");
          //切换显示内容

          //停止之前的动画
          $(".hot-list section")
            .eq(0)
            .stop();
          let num = parseInt(tar.attr("data-index")) * -311;
          //开启滑动动画
          $(".hot-list section")
            .eq(0)
            .animate({ top: num + "px" }, "fast");
        });

        let cdt1 = null;
        cdt1 = setInterval(function() {
          let cd1 = countdown("2029-11-20 0:00", cdt1);
          setCD(cd1, 0);
        }, 1000);

        let cdt2 = null;
        cdt2 = setInterval(function() {
          let cd2 = countdown("2019-11-24 0:00", cdt2);
          setCD(cd2, 1);
        }, 1000);

        let cdt3 = null;
        cdt3 = setInterval(function() {
          let cd3 = countdown("2019-11-24 0:00", cdt3);
          setCD(cd3, 2);
        }, 1000);

        let cdt4 = null;
        cdt4 = setInterval(function() {
          let cd4 = countdown("2019-11-25 0:00", cdt4);
          setCD(cd4, 3);
        }, 1000);

        let cdt5 = null;
        cdt5 = setInterval(function() {
          let cd5 = countdown("2019-12-2 0:00", cdt5);
          setCD(cd5, 4);
        }, 1000);
      }
    );

    //渲染性价比列表
    getGood(
      "api/getPerformanceList.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".price-list").html(html);
      },
      function() {}
    );

    //渲染新品列表
    getGood(
      "api/getNewList.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".new-list").html(html);
      },
      function() {}
    );

    //渲染洋酒列表
    getGood(
      "api/getLiquorList.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".liquor-list").html(html);
      },
      function() {}
    );

    //渲染白酒爆款列表
    getGood(
      "api/getChineselist1.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".chinese-list")
          .eq(0)
          .html(html);
      },
      function() {}
    );

    //渲染白酒大牌列表
    getGood(
      "api/getChineselist2.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".chinese-list")
          .eq(1)
          .html(html);
      },
      function() {}
    );

    //渲染老酒性价比列表
    getGood(
      "api/getOldlist1.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".old-list")
          .eq(0)
          .html(html);
      },
      function() {}
    );

    //渲染白酒大牌列表
    getGood(
      "api/getOldlist2.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".old-list")
          .eq(1)
          .html(html);
      },
      function() {}
    );

    //渲染酒具列表
    getGood(
      "api/getSettingList.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (var d in data) {
          html += `<div class="list-item" data-id="${data[d].pid}" onclick="turnTo(${data[d].pid})">
          <div class="img-box">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </div>
          <div class="content-box">
            <a
              title="${data[d].pname}"
              class="pname"
              href="javascript:void(0)"
              >${data[d].pname}
              <span title="${data[d].enName}" class="en"
                >${data[d].enName}</span
              >
            </a>
            <p class="price-box">
              <span class="price">
                ¥<strong>${data[d].price}</strong>
              </span>
            </p>
          </div>
          <div class="sum clearfix">
            <span class="soldnum">售出<strong>${data[d].soldNum}</strong></span>
            <span class="ratepercent">好评<strong>${data[d].ratecount}%</strong></span>
          </div>
        </div>`;
        }
        $(".setting-list").html(html);
      },
      function() {}
    );

    //渲染葡萄酒销量列表
    getGood(
      "api/getTopList1.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (let d in data) {
          if (d < 2) {
            html += `<li class="on" onclick="turnTo(${data[d].pid})">`;
          } else if (d == 2) {
            html += `<li class="on change" onclick="turnTo(${data[d].pid})">`;
          } else {
            html += `<li class="change" onclick="turnTo(${data[d].pid})">`;
          }
          html += `<em>${parseInt(d) + 1}</em>
          <a class="sold-img" href="javascript:void(0)">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </a>

          <a href="javascript:void(0)" class="sold-name">${data[d].pname}
            <span>${data[d].enName}</span>
          </a>

          <p class="sold-num">售出 <span>${data[d].soldNum}</span></p>
          <p class="sold-price">￥<span>${data[d].price}</span></p>
        </li>`;
        }
        $(".sold-top-1").html(html);
      },
      function() {
        $(".sold-top-1").mouseover(function(event) {
          let ele = findParent($(event.target), "change");
          if (ele.is("li") && !ele.hasClass("on")) {
            ele
              .addClass("on")
              .siblings(".change")
              .removeClass("on");
          }
        });
      }
    );

    //渲染洋酒销量列表
    getGood(
      "api/getTopList2.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (let d in data) {
          if (d == 0) {
            html += `<li class="on change" onclick="turnTo(${data[d].pid})">`;
          } else {
            html += `<li class="change" onclick="turnTo(${data[d].pid})">`;
          }
          html += `<em>${parseInt(d) + 1}</em>
          <a class="sold-img" href="javascript:void(0)">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </a>

          <a href="javascript:void(0)" class="sold-name">${data[d].pname}
            <span>${data[d].enName}</span>
          </a>

          <p class="sold-num">售出 <span>${data[d].soldNum}</span></p>
          <p class="sold-price">￥<span>${data[d].price}</span></p>
        </li>`;
        }
        $(".sold-top-2").html(html);
      },
      function() {
        $(".sold-top-2").mouseover(function(event) {
          let ele = findParent($(event.target), "change");
          if (ele.is("li") && !ele.hasClass("on")) {
            ele
              .addClass("on")
              .siblings()
              .removeClass("on");
          }
        });
      }
    );

    //渲染白酒销量列表
    getGood(
      "api/getTopList3.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (let d in data) {
          if (d < 2) {
            html += `<li class="on" onclick="turnTo(${data[d].pid})">`;
          } else if (d == 2) {
            html += `<li class="on change" onclick="turnTo(${data[d].pid})">`;
          } else {
            html += `<li class="change" onclick="turnTo(${data[d].pid})">`;
          }
          html += `<em>${parseInt(d) + 1}</em>
          <a class="sold-img" href="javascript:void(0)">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </a>

          <a href="javascript:void(0)" class="sold-name">${data[d].pname}
            <span>${data[d].enName}</span>
          </a>

          <p class="sold-num">售出 <span>${data[d].soldNum}</span></p>
          <p class="sold-price">￥<span>${data[d].price}</span></p>
        </li>`;
        }
        $(".sold-top-3").html(html);
      },
      function() {
        $(".sold-top-3").mouseover(function(event) {
          let ele = findParent($(event.target), "change");
          if (ele.is("li") && !ele.hasClass("on")) {
            ele
              .addClass("on")
              .siblings(".change")
              .removeClass("on");
          }
        });
      }
    );

    //渲染陈年老酒销量列表
    getGood(
      "api/getTopList4.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (let d in data) {
          if (d < 2) {
            html += `<li class="on">`;
          } else if (d == 2) {
            html += `<li class="on change" onclick="turnTo(${data[d].pid})">`;
          } else {
            html += `<li class="change" onclick="turnTo(${data[d].pid})">`;
          }
          html += `<em>${parseInt(d) + 1}</em>
          <a class="sold-img" href="javascript:void(0)">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </a>

          <a href="javascript:void(0)" class="sold-name">${data[d].pname}
            <span>${data[d].enName}</span>
          </a>

          <p class="sold-num">售出 <span>${data[d].soldNum}</span></p>
          <p class="sold-price">￥<span>${data[d].price}</span></p>
        </li>`;
        }
        $(".sold-top-4").html(html);
      },
      function() {
        $(".sold-top-4").mouseover(function(event) {
          let ele = findParent($(event.target), "change");
          if (ele.is("li") && !ele.hasClass("on")) {
            ele
              .addClass("on")
              .siblings(".change")
              .removeClass("on");
          }
        });
      }
    );

    //渲染酒具销量列表
    getGood(
      "api/getTopList5.php",
      [],
      function(str) {
        let data = JSON.parse(str);
        let html = "";
        for (let d in data) {
          if (d == 0) {
            html += `<li class="on change" onclick="turnTo(${data[d].pid})">`;
          } else {
            html += `<li class="change" onclick="turnTo(${data[d].pid})">`;
          }
          html += `<em>${parseInt(d) + 1}</em>
          <a class="sold-img" href="javascript:void(0)">
            <img src="${data[d].imgURL}" alt="商品图片" />
          </a>

          <a href="javascript:void(0)" class="sold-name">${data[d].pname}
            <span>${data[d].enName}</span>
          </a>

          <p class="sold-num">售出 <span>${data[d].soldNum}</span></p>
          <p class="sold-price">￥<span>${data[d].price}</span></p>
        </li>`;
        }
        $(".sold-top-5").html(html);
      },
      function() {
        $(".sold-top-5").mouseover(function(event) {
          let ele = findParent($(event.target), "change");
          if (ele.is("li") && !ele.hasClass("on")) {
            ele
              .addClass("on")
              .siblings()
              .removeClass("on");
          }
        });
      }
    );
  });

  require(["carousel", "jquery"], function($jq, obj) {
    //小图轮播图
    $(".pic-list").each(function() {
      $(this).css(
        "width",
        $(this).children().length *
          parseInt(
            $(this)
              .children()
              .eq(0)
              .css("width")
          ) +
          "px"
      );
    });

    let timer1 = null;
    let index1 = 0;
    let flag1 = true;
    timer1 = setInterval(function() {
      if (index1 == 3) {
        flag1 = false;
      }
      if (index1 == 0) {
        flag1 = true;
      }
      if (flag1) {
        index1++;
      } else {
        index1--;
      }
      $(".carousel-index")
        .eq(1)
        .find(".active")
        .removeClass("active");
      $(".carousel-index")
        .eq(1)
        .find("span")
        .eq(index1)
        .addClass("active");
      changePic($(".pic-list").eq(0), index1);
    }, 5000);

    $(".carousel-index")
      .eq(1)
      .mouseover(function(event) {
        if ($(event.target).is("span")) {
          if (!$(event.target).hasClass("active")) {
            clearInterval(timer1);
            $(event.target)
              .addClass("active")
              .siblings()
              .removeClass("active");
            changePic(
              $(".pic-list").eq(0),
              parseInt($(event.target).html()) - 1
            );
            index1 = parseInt($(event.target).html()) - 1;
          }
        }
      });

    $(".carousel-index")
      .eq(1)
      .mouseout(function(event) {
        if ($(event.target).is("span")) {
          timer1 = setInterval(function() {
            if (index1 >= 3) {
              flag1 = false;
            }
            if (index1 == 0) {
              flag1 = true;
            }
            if (flag1) {
              index1++;
            } else {
              index1--;
            }
            $(".carousel-index")
              .eq(1)
              .find(".active")
              .removeClass("active");
            $(".carousel-index")
              .eq(1)
              .find("span")
              .eq(index1)
              .addClass("active");
            changePic($(".pic-list").eq(0), index1);
          }, 5000);
          changePic($(".pic-list").eq(0), index1);
        }
      });

    let timer2 = null;
    let index2 = 0;
    let flag2 = true;
    timer2 = setInterval(function() {
      if (index2 == 4) {
        flag2 = false;
      }
      if (index2 == 0) {
        flag2 = true;
      }
      if (flag2) {
        index2++;
      } else {
        index2--;
      }
      $(".carousel-index")
        .eq(2)
        .find(".active")
        .removeClass("active");
      $(".carousel-index")
        .eq(2)
        .find("span")
        .eq(index2)
        .addClass("active");
      changePic($(".pic-list").eq(1), index2);
    }, 5000);

    $(".carousel-index")
      .eq(2)
      .mouseover(function(event) {
        if ($(event.target).is("span")) {
          if (!$(event.target).hasClass("active")) {
            clearInterval(timer2);
            $(event.target)
              .addClass("active")
              .siblings()
              .removeClass("active");
            changePic(
              $(".pic-list").eq(1),
              parseInt($(event.target).html()) - 1
            );
            index2 = parseInt($(event.target).html()) - 1;
          }
        }
      });

    $(".carousel-index")
      .eq(2)
      .mouseout(function(event) {
        if ($(event.target).is("span")) {
          timer2 = setInterval(function() {
            if (index2 >= 4) {
              flag2 = false;
            }
            if (index2 == 0) {
              flag2 = true;
            }
            if (flag2) {
              index2++;
            } else {
              index2--;
            }
            $(".carousel-index")
              .eq(2)
              .find(".active")
              .removeClass("active");
            $(".carousel-index")
              .eq(2)
              .find("span")
              .eq(index2)
              .addClass("active");
            changePic($(".pic-list").eq(1), index2);
          }, 5000);
          changePic($(".pic-list").eq(1), index2);
        }
      });

    let timer3 = null;
    let index3 = 0;
    let flag3 = true;
    timer3 = setInterval(function() {
      if (index3 == 3) {
        flag3 = false;
      }
      if (index3 == 0) {
        flag3 = true;
      }
      if (flag3) {
        index3++;
      } else {
        index3--;
      }
      $(".carousel-index")
        .eq(3)
        .find(".active")
        .removeClass("active");
      $(".carousel-index")
        .eq(3)
        .find("span")
        .eq(index3)
        .addClass("active");
      changePic($(".pic-list").eq(2), index3);
    }, 5000);

    $(".carousel-index")
      .eq(3)
      .mouseover(function(event) {
        if ($(event.target).is("span")) {
          if (!$(event.target).hasClass("active")) {
            clearInterval(timer3);
            $(event.target)
              .addClass("active")
              .siblings()
              .removeClass("active");
            changePic(
              $(".pic-list").eq(2),
              parseInt($(event.target).html()) - 1
            );
            index3 = parseInt($(event.target).html()) - 1;
          }
        }
      });

    $(".carousel-index")
      .eq(3)
      .mouseout(function(event) {
        if ($(event.target).is("span")) {
          timer3 = setInterval(function() {
            if (index3 >= 3) {
              flag3 = false;
            }
            if (index3 == 0) {
              flag3 = true;
            }
            if (flag3) {
              index3++;
            } else {
              index3--;
            }
            $(".carousel-index")
              .eq(3)
              .find(".active")
              .removeClass("active");
            $(".carousel-index")
              .eq(3)
              .find("span")
              .eq(index3)
              .addClass("active");
            changePic($(".pic-list").eq(2), index3);
          }, 5000);
          changePic($(".pic-list").eq(2), index3);
        }
      });

    let timer4 = null;
    let index4 = 0;
    let flag4 = true;
    timer4 = setInterval(function() {
      if (index4 == 3) {
        flag4 = false;
      }
      if (index4 == 0) {
        flag4 = true;
      }
      if (flag4) {
        index4++;
      } else {
        index4--;
      }
      $(".carousel-index")
        .eq(4)
        .find(".active")
        .removeClass("active");
      $(".carousel-index")
        .eq(4)
        .find("span")
        .eq(index4)
        .addClass("active");
      changePic($(".pic-list").eq(3), index4);
    }, 5000);

    $(".carousel-index")
      .eq(4)
      .mouseover(function(event) {
        if ($(event.target).is("span")) {
          if (!$(event.target).hasClass("active")) {
            clearInterval(timer4);
            $(event.target)
              .addClass("active")
              .siblings()
              .removeClass("active");
            changePic(
              $(".pic-list").eq(3),
              parseInt($(event.target).html()) - 1
            );
            index4 = parseInt($(event.target).html()) - 1;
          }
        }
      });

    $(".carousel-index")
      .eq(4)
      .mouseout(function(event) {
        if ($(event.target).is("span")) {
          timer4 = setInterval(function() {
            if (index4 >= 3) {
              flag4 = false;
            }
            if (index4 == 0) {
              flag4 = true;
            }
            if (flag4) {
              index4++;
            } else {
              index4--;
            }
            $(".carousel-index")
              .eq(4)
              .find(".active")
              .removeClass("active");
            $(".carousel-index")
              .eq(4)
              .find("span")
              .eq(index4)
              .addClass("active");
            changePic($(".pic-list").eq(3), index4);
          }, 5000);
          changePic($(".pic-list").eq(3), index4);
        }
      });

    let timer5 = null;
    let index5 = 0;
    let flag5 = true;
    timer5 = setInterval(function() {
      if (index5 == 1) {
        flag5 = false;
      }
      if (index5 == 0) {
        flag5 = true;
      }
      if (flag5) {
        index5++;
      } else {
        index5--;
      }
      $(".carousel-index")
        .eq(5)
        .find(".active")
        .removeClass("active");
      $(".carousel-index")
        .eq(5)
        .find("span")
        .eq(index5)
        .addClass("active");
      changePic($(".pic-list").eq(4), index5);
    }, 5000);

    $(".carousel-index")
      .eq(5)
      .mouseover(function(event) {
        if ($(event.target).is("span")) {
          if (!$(event.target).hasClass("active")) {
            clearInterval(timer5);
            $(event.target)
              .addClass("active")
              .siblings()
              .removeClass("active");
            changePic(
              $(".pic-list").eq(4),
              parseInt($(event.target).html()) - 1
            );
            index5 = parseInt($(event.target).html()) - 1;
          }
        }
      });

    $(".carousel-index")
      .eq(5)
      .mouseout(function(event) {
        if ($(event.target).is("span")) {
          timer5 = setInterval(function() {
            if (index5 >= 1) {
              flag5 = false;
            }
            if (index5 == 0) {
              flag5 = true;
            }
            if (flag5) {
              index5++;
            } else {
              index5--;
            }
            $(".carousel-index")
              .eq(5)
              .find(".active")
              .removeClass("active");
            $(".carousel-index")
              .eq(5)
              .find("span")
              .eq(index5)
              .addClass("active");
            changePic($(".pic-list").eq(4), index5);
          }, 5000);
          changePic($(".pic-list").eq(4), index5);
        }
      });

    //品牌汇轮播图
    let brandTimer = null;
    let brandIndex = 4;
    brandTimer = setInterval(function() {
      brandIndex = changeBrand(brandIndex);
    }, 5000);

    //鼠标悬停在品牌汇轮播图
    $(".brand-carousel").mouseover(function(event) {
      clearInterval(brandTimer);
      if (
        $(event.target)
          .parent()
          .hasClass("carousel-img")
      ) {
        $(event.target)
          .parent()
          .prevAll(".move")
          .each(function() {
            $(this).animate({
              left: (parseInt($(this).attr("data-index")) + 1) * 150 + "px"
            });
          });
        if (
          $(event.target)
            .parent()
            .attr("data-index") != 4
        ) {
          $(event.target)
            .parent()
            .animate({
              left:
                (parseInt(
                  $(event.target)
                    .parent()
                    .attr("data-index")
                ) +
                  1) *
                  150 +
                "px"
            });
        }
        $(event.target)
          .parent()
          .nextAll(".move")
          .each(function() {
            $(this).animate({
              left:
                (parseInt($(this).attr("data-index")) + 1) * 150 + 300 + "px"
            });
          });
        brandIndex = $(event.target)
          .parent()
          .attr("data-index");
      }
    });

    //鼠标离开品牌汇轮播图
    $(".brand-carousel").mouseover(function() {
      brandTimer = setInterval(function() {
        brandIndex = changeBrand(brandIndex);
      }, 5000);
    });
  });
});
