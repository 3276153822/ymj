require(["config"], function() {
  require(["common", "jquery"], function($jq, obj) {
    changeName();

    // function getList() {
    //   $.ajax({
    //     type: "post",
    //     url: "../api/getCartlistAll.php",
    //     data: {
    //       phone: getCookie("username")
    //     },
    //     success: str => {
    //       let arr = JSON.parse(str);
    //       let data = arr.arr;
    //       console.log(data);
    //       let html = "";
    //       for (var item in data) {
    //         html += `<div class="block-box" onclick="turnTo(${data[item].pid})">
    //         <div class="check-box">
    //           <input type="checkbox" />
    //         </div>

    //         <div class="g-name">
    //           <img src="${data[item].imgURL}" alt="" />
    //           <div class="name-content">
    //             <a class="g-cn" href="javascript:void(0)">${data[item].pname}</a>
    //             <p class="g-en">${data[item].enName}</p>
    //           </div>
    //         </div>
    //         <div class="g-price">${data[item].price}</div>
    //         <div class="g-num">${data[item].num}</div>
    //         <div class="g-delete"><a href="javascript:void(0)" onclick="deleteCart(this,${data[item].pid})">删除</a></div>
    //       </div>`;
    //       }
    //       $(".g-list").html(html);
    //       $(".good-num").html(arr.num);
    //       $(".total-price").html(arr.total);
    //     }
    //   });
    // }

    getList();

    // function deleteCart(t, id) {
    //   console.log(t);
    //   if (getCookie("username")) {
    //     $.ajax({
    //       type: "post",
    //       url: "../api/deleteCart.php",
    //       data: {
    //         phone: getCookie("username"),
    //         id: parseInt(id)
    //       },
    //       success: str => {
    //         if (str == "yes") {
    //           alert("删除成功！");
    //           getList();
    //         } else if (str == "no") {
    //           alert("删除失败！");
    //         }
    //       }
    //     });
    //   } else {
    //     alert("你尚未登录！");
    //   }
    // }
  });
});
