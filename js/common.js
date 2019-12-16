//菜单数据
let listData = [
  {
    title: "中国白酒<span class='hn-hot'></span>",
    label: [
      "<span class='dark'>茅台</span>",
      "五粮液",
      "洋河",
      "红花郎",
      "<span class='dark'>陈年老酒</span>",
      "酱香型",
      "贵州"
    ],
    kind1: {
      白酒: [
        "<span class='dark'>白酒特卖馆</span>",
        "<span class='dark'>陈年老酒馆</span>"
      ],
      香型: [
        "浓香型",
        "酱香型",
        "清香型",
        "凤香型",
        "绵柔型",
        "米香型",
        "兼香型",
        "其他香型"
      ],
      产地: [
        "贵州",
        "四川",
        "山西",
        "北京",
        "江苏",
        "安徽",
        "新疆",
        "其他产地"
      ],
      价格: [
        "1-49",
        "50-99",
        "100-199",
        "200-299",
        "300-499",
        "500-999",
        "1000以上"
      ]
    },
    kind2: {
      陈年老酒: [
        "80年代",
        "90年代",
        "2000年",
        "2001年",
        "2002年",
        "2003年",
        "2004年",
        "2005年",
        "2006年",
        "2007年",
        "2008年"
      ],
      品牌: [
        "茅台",
        "五粮液",
        "泸州老窖",
        "剑南春",
        "洋河",
        "口子窖",
        "汾酒",
        "国窖",
        "水井坊",
        "西凤",
        "牛栏山",
        "金六福",
        "宋河",
        "杜康",
        "红星二锅头",
        "古井贡",
        "迎驾贡酒",
        "红楼梦",
        "丰谷",
        "国粹",
        "沱牌",
        "河套",
        "董酒",
        "小糊涂仙",
        "舍得",
        "习酒",
        "今世缘",
        "酒鬼",
        "燃点",
        "兄弟"
      ]
    },
    height: 400
  },
  {
    title: "葡萄酒",
    label: [
      "法国",
      "意大利",
      "智利",
      "干红",
      "桃红",
      "甜白",
      "起泡",
      "<span class='dark'>2018期酒</span>",
      "列级庄"
    ],
    kind1: {
      红葡萄酒: ["干红", "半干红", "半甜红", "甜红"],
      白葡萄酒: ["干白", "半干白", "半甜白", "甜白", "贵腐酒"],
      桃红葡萄酒: ["干型桃红", "半干型桃红", "半甜桃红", "甜型桃红"],
      起泡酒: [
        "干起泡酒",
        "半干起泡酒",
        "甜起泡酒",
        "绝干型起泡酒",
        "半甜型起泡酒"
      ],
      香槟: ["干香槟", "半干香槟", "绝干香槟"],
      加强葡萄酒: [
        "半干型雪莉酒",
        "干型雪莉酒",
        "甜型雪莉酒",
        "波特酒",
        "加强甜白"
      ]
    },
    kind2: {
      热门产地: [
        "法国",
        "意大利",
        "澳大利亚",
        "德国",
        "美国",
        "西班牙",
        "新西兰",
        "阿根廷",
        "匈牙利",
        "智利",
        "葡萄牙",
        "加拿大",
        "希腊",
        "南非",
        "中国"
      ],
      独家品牌: [
        "季风酒庄",
        "斯皮尔酒庄",
        "圣勒庄园",
        "贝马格雷",
        "黄金天使",
        "教堂山酒庄",
        "维纳酒庄",
        "贝尔莱酒庄",
        "帕索斯蒂芬",
        "贝托纳酒庄",
        "夏迪酒庄",
        "维斯塔酒庄"
      ],
      列级名庄: [
        "名庄特卖",
        "香港免税",
        "勃艮第名庄",
        "中级庄",
        "拉菲酒庄",
        "宝嘉龙酒庄",
        "宝得根酒庄",
        "爱士图尔庄园",
        "木桐酒庄",
        "美国优质酒庄"
      ]
    },
    height: 400
  },
  {
    title: "洋酒烈酒",
    label: [
      "轩尼诗",
      "威士忌",
      "鸡尾酒",
      "百利甜",
      "干邑",
      "白兰地",
      "朗姆酒",
      "伏特加"
    ],
    kind1: {
      种类: [
        "威士忌",
        "伏特加",
        "白兰地",
        "力娇酒",
        "干邑",
        "雅文邑",
        "纯麦芽威士金酒",
        "朗姆酒",
        "墨西哥烈酒",
        "开胃酒",
        "清酒",
        "烧酒"
      ],
      产地: [
        "法国",
        "意大利",
        "西班牙",
        "德国",
        "美国",
        "南非",
        "阿根廷",
        "葡萄牙",
        "英国",
        "印度",
        "瑞典",
        "乌克兰",
        "墨西哥",
        "俄罗斯",
        "爱尔兰",
        "牙买加"
      ]
    },
    kind2: {
      品牌: [
        "人头马",
        "轩尼诗",
        "摩根船长",
        "芝华士",
        "百龄坛",
        "百利",
        "金巴利",
        "百加得",
        "占边",
        "斯米诺",
        "万事好",
        "杰克丹尼",
        "奥美加",
        "必富达",
        "百富",
        "帝萨诺",
        "尊美醇",
        "甘露",
        "杰彼斯",
        "柑曼怡",
        "蜂巢",
        "爱德华",
        "皇家",
        "奥特西诺",
        "哥顿",
        "富豪",
        "灰雁",
        "红牌",
        "格朗",
        "君度",
        "苏本",
        "马爹利",
        "尊尼获加",
        "绝对",
        "博泰勒斯",
        "格兰威特",
        "帝王",
        "高原骑士",
        "伯爵斯云利",
        "托马斯",
        "马天尼",
        "拿破仑"
      ]
    },
    height: 320
  },
  {
    title: "啤酒 黄酒 日韩酒",
    label: [
      "进口啤酒",
      "精酿黄酒",
      "矩惠抢购",
      "绍兴黄酒",
      "清酒",
      "梅酒",
      "烧酒"
    ],
    kind1: {
      啤酒产地: ["经典热销", "德国大牌", "比利时", "荷兰", "中国", "其它"],
      啤酒种类: ["黑啤", "黄啤", "白啤", "红啤"],
      啤酒价格: [
        "1-99元",
        "100-199",
        "200-299",
        "300-399",
        "400-499",
        "500-599"
      ],
      日韩酒类型: ["清酒", "梅酒", "烧酒", "水果酒", "浊酒", "其他酒"],
      日韩酒品牌: [
        "三得利",
        "日本盛",
        "月桂冠",
        "名果の屋",
        "俏雅",
        "千岛美人",
        "乐天",
        "男山",
        "梅乃宿",
        "中野"
      ],
      日韩酒价格: [
        "1-49元",
        "50-99元",
        "100-199",
        "200-299",
        "300-499",
        "500-999",
        "其他价格"
      ]
    },
    kind2: {
      啤酒活动: ["特价秒杀", "世界杯热", "买赠不停", "满百包邮", "1折起特"],
      啤酒品牌: [
        "卡力特",
        "宝龙",
        "凯撒",
        "莱宝鲜啤",
        "威斯路",
        "粉象",
        "林德曼",
        "万德力",
        "马奥",
        "喜力",
        "百威",
        "青岛",
        "弗伦辛格",
        "极乐",
        "更多大牌"
      ],
      黄酒热销品牌: ["石库门", "古越龙山", "会稽山", "塔牌", "女儿红"],
      养生黄酒: [
        "1-49元",
        "50-99元",
        "100-199",
        "200-299",
        "300-399",
        "1000元"
      ],
      生鲜食品: ["大闸蟹礼盒"]
    },
    height: 470
  },
  {
    title: "酒具周边",
    label: ["酒杯", "酒柜", "酒刀", "醒酒器", "礼盒", "其他酒具"],
    kind1: {
      种类: [
        "酒杯",
        "醒酒器",
        "酒刀",
        "酒架",
        "酒鼻子",
        "<span class='dark'>酒柜</span>",
        "礼盒",
        "壶"
      ]
    },
    kind2: { 品牌: ["醴铎", "弓箭", "诗杯客乐", "石岛", "梵酷", "卢卡瑞斯"] },
    height: 120
  },
  {
    title: "一键选酒<span class='hn-hot'></span>",
    label: [
      "<span class='dark'>礼盒</span>",
      "餐酒精选",
      "实惠套装",
      "权威高分酒",
      "聚会婚庆整箱",
      "精品闪购",
      "<span class='dark'>海淘</span>",
      "<span class='dark'>陈酿老酒</span>"
    ],
    kind1: {
      热门活动: ["2016薄若莱", "名庄特卖", "起泡甜白", "赵薇名酒", "整箱巨恵"]
    },
    height: 100
  }
];

let navHtml = "";
function getNav() {
  listData.forEach(item => {
    navHtml += `<dl class="hn-2-dl">
    <dt>
      <div class="hn-2-title">
        ${item.title}
      </div>
      <div class="label-group clearfix">`;
    item.label.forEach(labels => {
      navHtml += `<a href="javascript:void(0)">${labels}</a>`;
    });
    navHtml += `</div>
    </dt>
    <dd class="clearfix hn-2-dd" style="height:${item.height}px">
      <div class="hn-3-box fl">`;

    for (var kind in item.kind1) {
      navHtml += `<div class="nav-box clearfix">
      <p>${kind}</p>
      <div class="clearfix fl">`;
      item.kind1[kind].forEach(k => {
        navHtml += `<a href="javascript:void(0)" class="nav-link">${k}</a>`;
      });
      navHtml += `</div></div>`;
    }

    if (item.kind2) {
      navHtml += `</div><div class="hn-3-box fl">`;
      for (var kind in item.kind2) {
        navHtml += `<div class="nav-box clearfix">
        <p>${kind}</p>
        <div class="clearfix fl">`;
        item.kind2[kind].forEach(k => {
          navHtml += `<a href="javascript:void(0)" class="nav-link">${k}</a>`;
        });
        navHtml += `</div></div>`;
      }
    }

    navHtml += `</div></div></div></dd></dl>`;
  });

  return navHtml;
}

function turnTo(id) {
  if (window.location.href.indexOf("/html/") == -1) {
    window.open("html/good.html?pid=" + id);
  } else {
    window.open("../html/good.html?pid=" + id);
  }
}

//设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : "; expires=" + exdate) +
    ";path=/";
}

//获取cookie
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
}

//删除cookie
function removeCookie(c_name) {
  setCookie(c_name, "", -1);
}

//生成随机数
function ranNum(min, max) {
  //Math.random() 0-0.99 当随机数等于0的时候，整体最小的时候
  //最大的时候，Math.random() 最大就是1(实际没到1)
  return parseInt(Math.random() * (max - min + 1)) + min;
}

function changeName() {
  let user = getCookie("username");
  if (user) {
    $(".userinfo").html(`<li>您好, ${user.slice(0, 4)}***${user.slice(
      7,
      11
    )}</li>
      <li><a class="site-last" href="javascript:void(0)" onclick="logout()">退出</a></li>`);
  }
}

//退出登录
function logout() {
  if (confirm("是否退出？")) {
    removeCookie("username");
    window.location.href = window.location.href;
  }
}

function getCart(phone) {
  let url = "";
  if (window.location.href.indexOf("/html/") == -1) {
    url = "api/getCartlist.php";
  } else {
    url = "../api/getCartlist.php";
  }
  $.ajax({
    type: "post",
    url: url,
    data: {
      phone: phone
    },
    success: str => {
      let arr = JSON.parse(str);
      let data = arr.arr;
      let html = "";
      for (var item in data) {
        html += `<li onclick="turnTo(${data[item].pid})">
        <img src="${data[item].imgURL}" alt="${data[item].pname}" />
        <span class="c_name">${data[item].pname}</span>
        <span class="e_name">${data[item].enName}</span>
        <span class="c_price"><strong>¥ ${data[item].price}</strong> × <em>${data[item].num}</em></span>
      </li>`;
      }
      $(".cart-list").each(function() {
        $(this).html(html);
      });
      if ($(".side-num")) {
        $(".side-num").html(arr.num);
      }
      $(".shop-num").html(arr.num);
      $(".cart-num").each(function() {
        $(this).html(arr.num);
      });
      $(".total").each(function() {
        $(this).html(arr.total);
      });
    }
  });
}

function toCart() {
  $(".btn-viewcart").each(function() {
    $(this).click(function() {
      if (getCookie("username")) {
        if (window.location.href.indexOf("/html/") == -1) {
          window.open("html/cart.html");
        } else {
          window.open("../html/cart.html");
        }
      } else {
        alert("请先登录！");
      }
    });
  });
}

function getList() {
  $.ajax({
    type: "post",
    url: "../api/getCartlistAll.php",
    data: {
      phone: getCookie("username")
    },
    success: str => {
      let arr = JSON.parse(str);
      let data = arr.arr;
      console.log(data);
      let html = "";
      for (var item in data) {
        html += `<div class="block-box" onclick="turnTo(${data[item].pid})">
        <div class="check-box">
          <input type="checkbox" />
        </div>

        <div class="g-name">
          <img src="${data[item].imgURL}" alt="" />
          <div class="name-content">
            <a class="g-cn" href="javascript:void(0)">${data[item].pname}</a>
            <p class="g-en">${data[item].enName}</p>
          </div>
        </div>
        <div class="g-price">${data[item].price}</div>
        <div class="g-num">${data[item].num}</div>
        <div class="g-delete"><a href="javascript:void(0)" onclick="deleteCart(${data[item].pid})">删除</a></div>
      </div>`;
      }
      $(".g-list").html(html);
      $(".good-num").html(arr.num);
      $(".total-price").html(arr.total);
    }
  });
}

function deleteCart(id) {
  this.event.stopPropagation();
  if (confirm("是否确认删除？")) {
    if (getCookie("username")) {
      $.ajax({
        type: "post",
        url: "../api/deleteCart.php",
        data: {
          phone: getCookie("username"),
          id: parseInt(id)
        },
        success: str => {
          console.log(str);
          if (str == "yes") {
            alert("删除成功！");
            getList();
          } else if (str == "no") {
            alert("删除失败！");
          }
        }
      });
    } else {
      alert("你尚未登录！");
    }
  }
}
