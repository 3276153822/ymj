let carouselData = [
  "img/carousel1-1.jpg",
  "img/carousel1-2.jpg",
  "img/carousel1-3.jpg",
  "img/carousel1-4.jpg",
  "img/carousel1-5.jpg",
  "img/carousel1-6.jpg"
];

//渲染轮播图列表
function getCarousel(data) {
  let ulHtml = "";
  let indexHtml = "";
  data.forEach((item, i) => {
    ulHtml += `<li style="background-image: url(${item});"></li>`;
    indexHtml += `<span>${i + 1}</span>`;
  });
  $(".carousel-list")
    .eq(0)
    .html(ulHtml);
  $(".carousel-index")
    .eq(0)
    .html(indexHtml);
}

//轮播
function changeCarousel(i, n) {
  $(".carousel-list li")
    .eq(n)
    .show()
    .addClass("low-show")
    .siblings()
    .hide();
  $(".carousel-list li")
    .eq(i)
    .fadeIn(1000);

  setTimeout(function() {
    $(".carousel-list li")
      .eq(n)
      .removeClass("low-show")
      .hide();
  }, 1000);
}

//切换焦点
function changeIndex(i) {
  $(".carousel-index span")
    .eq(i)
    .addClass("active")
    .siblings()
    .removeClass("active");
}

//获取数据
function getGood(url, arg, fnBefore, fnAfter) {
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
