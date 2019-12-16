//切换品牌汇轮播图
function changeBrand(brandIndex) {
  if (brandIndex > 3) {
    brandIndex = 0;
    $(".brand-carousel")
      .children(".move")
      .each(function() {
        $(this).animate({
          left: (parseInt($(this).attr("data-index")) + 1) * 150 + 300 + "px"
        });
      });
  } else {
    $(".brand-carousel .move")
      .eq(brandIndex)
      .animate({
        left:
          (parseInt(
            $(".brand-carousel .move")
              .eq(brandIndex)
              .attr("data-index")
          ) +
            1) *
            150 +
          "px"
      });
    brandIndex++;
  }
  return brandIndex;
}

//切换小图轮播图
function changePic(ele, i) {
  ele.animate({
    left:
      i *
        parseInt(
          ele
            .children()
            .eq(0)
            .css("width")
        ) *
        -1 +
      "px"
  });
}
