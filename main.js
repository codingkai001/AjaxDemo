/***javascript ajax示例***/
function loadData() {
    var xmlObj;
    if (window.XMLHttpRequest)
        xmlObj = new XMLHttpRequest();
    else
        xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
    xmlObj.onreadystatechange = function () {
        if (xmlObj.readyState === 4 && xmlObj.status === 200) {
            var result = document.getElementById("result");
            try {
                var data = eval('(' + xmlObj.responseText + ')');   //将json字符串转化为json对象
                // alert(typeof data);
                result.innerHTML = "姓名：" + data.name + ",性别：" + data.sex;
            }
            catch (err) {
                // alert(err.toString());
                console.log(err.toString());
            }
        }
    };
    xmlObj.open("GET", "http://localhost:8000", true);  //可添加查询字符串
    xmlObj.send();   //仅用于POST方法发送数据
}

/***jquery Ajax-load示例***/
$(document).ready(function () {
    $("#load").click(function () {
        /*load() 方法从服务器加载数据，并把返回的数据放入被选元素中。
            $(selector).load(URL,data,callback)
            必需的 URL 参数规定您希望加载的 URL。
            可选的 data 参数规定与请求一同发送的查询字符串键/值对（字典），
                  data为空时为GET请求，否则为POST请求且Content-Type:application/x-www-form-urlencoded
            可选的 callback 参数是 load() 方法完成后所执行的函数名称。

        回调函数在载入成功时执行
            responseTxt - 包含调用成功时的结果内容
            statusTXT - 包含调用的状态
            xhr - 包含 XMLHttpRequest 对象
         */
        $("#info").load("http://localhost:8000/load/", {"name": "fengkai"}, function (responseTxt, statusTxt, xhr) {
            if (statusTxt === "success") {
                alert(xhr.status + ": " + xhr.statusText);  //200：ok
            }
            if (statusTxt === "error") {
                alert("Error:" + xhr.status + ": " + xhr.statusText);
            }
        })
    })
});

/***jquery Ajax-get示例***/
$(document).ready(function () {
    $("#load-name").click(function () {
        /*$.get() 方法通过 HTTP GET 请求从服务器上请求数据
            $.get(URL,callback);
            必需的 URL 参数规定您希望请求的 URL。
            可选的 callback 参数是请求成功后所执行的函数名，参数data为请求内容，status为请求状态(success/error)
        * */
        $.get("http://localhost:8000/load/?name=fengkai", function (data, status) {
            if (status === "success")
                $("#name").html(data);
            else
                alert("Error:" + status);
        });
    })
});

/***jquery Ajax-post示例***/
$(document).ready(function () {
    $("#load-name2").click(function () {
        /*必需的 URL 参数规定您希望请求的 URL。
        可选的 data 参数规定与请求一同发送的键/值对（字典），Content-Type:application/x-www-form-urlencoded。
        可选的 callback 参数是请求成功后所执行的函数名。
        */
        $.post("http://localhost:8000/load/", {"name": "fengkai", "sex": "male"}, function (data, status) {
            if (status === "success")
                $("#name2").append(data);
            else
                alert("Error:" + status);
        });
    });
});