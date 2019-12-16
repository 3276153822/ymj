(function() {
  $("#phone").blur(function() {
    let phone = $("#phone")
      .val()
      .trim();
    let reg = new RegExp("^1[3-9][0-9]{9}$");
    if (!reg.test(phone)) {
      $(".message")
        .eq(0)
        .html("请输入正确的手机号！");
    } else {
      if (window.location.href.indexOf("register") != -1) {
        $.ajax({
          type: "post",
          url: "../api/checkPhone.php",
          data: {
            phone: phone
          },
          success: str => {
            if (str == "yes") {
              $(".message")
                .eq(0)
                .html("");
            } else if (str == "no") {
              $(".message")
                .eq(0)
                .html("该手机号已注册！");
            }
          }
        });
      } else {
        $(".message")
          .eq(0)
          .html("");
      }
    }
  });
  let captcha1 = new Captcha({
    dotNum: 10,
    lineNum: 20,
    fontSize: 30,
    length: 4,

});
let code;
captcha1.draw(document.querySelector('#captcha'), r => {
    console.log(r, '验证码1');
    code = r.toUpperCase();
});


$("#imageCode").blur(function() {
    if ($.trim($(this).val()).toUpperCase() != code) {
        $(this).parents(".image-code").addClass("form-group-error");
        $(this).next().text("请输入正确的图形验证码");
    } else {
        $(this).parents(".image-code").removeClass("form-group-error");
        $(this).next().text("");
    }
})
  $("#login").click(function() {
    if (getCookie("username")) {
      alert("你已登录！请勿重复登录！");
    } else {
      let phone = $("#phone")
        .val()
        .trim();
      let password = $("#password")
        .val()
        .trim();

      let reg = new RegExp("^1[3-9][0-9]{9}$");
      if (reg.test(phone) && password) {
        $.ajax({
          type: "post",
          url: "../api/login.php",
          data: {
            phone: phone,
            password: password
          },
          success: str => {
            if (str == 0) {
              $(".message")
                .eq(0)
                .html("该用户不存在！");
            } else if (str == "yes") {
              setCookie("username", phone, 1);
              alert("登录成功！");
              window.location.href = "../index.html";
            } else if (str == "no") {
              $(".message")
                .eq(1)
                .html("密码错误！");
            }
          }
        });
      } else {
        alert("请先正确完成表单！");
      }
    }
  });

  // function randCode() {
  //   let str = "0123456789abcdefghijklmnopqrstuvwxyz";
  //   let code =
  //     str[ranNum(0, 35)] +
  //     str[ranNum(0, 35)] +
  //     str[ranNum(0, 35)] +
  //     str[ranNum(0, 35)];
  //   return code;
  // }

  // let rc = randCode();
  // $("#code").html(rc);
  // $("#code").click(function() {
  //   rc = randCode();
  //   $("#code").html(rc);
  // });

  $("#code-input").blur(function() {
    let code = $(this)
      .val()
      .toLowerCase();
    if (code != rc) {
      $(".message")
        .eq(1)
        .html("验证码错误！");
    } else {
      $(".message")
        .eq(1)
        .html("");
    }
  });

  $("#password1").blur(function() {
    let reg = new RegExp("^[0-9a-zA-Z]{6,16}$");
    let password = $(this).val();
    if (!reg.test(password)) {
      $(".message")
        .eq(2)
        .html("密码请设为6-16位字母或数字！");
    } else {
      $(".message")
        .eq(2)
        .html("");
    }
  });

  $("#password2").blur(function() {
    let password = $("#password1").val();
    if (password == $(this).val()) {
      $(".message")
        .eq(3)
        .html("");
    } else {
      $(".message")
        .eq(3)
        .html("密码确认不一致！");
    }
  });

  $("#submit").click(function() {
    $("#phone").blur();
    $("#code-input").blur();
    $("#password1").blur();
    $("#password2").blur();
    let flag = true;
    $(".message").each(function() {
      if ($(this).html()) {
        flag = false;
        return false;
      }
    });
    if (flag && $("#accept").is(":checked")) {
      let phone = $("#phone").val();
      $.ajax({
        type: "post",
        url: "../api/register.php",
        data: {
          phone: phone,
          password: $("#password1").val()
        },
        success: str => {
          if (str == "yes") {
            setCookie("username", phone, 1);
            alert("注册成功！");
            window.location.href = "DL.html";
          } else if (str == "no") {
            alert("注册失败！");
          }
        }
      });
    } else {
      alert("请确认完成表单和接受条款！");
    }
  });
})();
