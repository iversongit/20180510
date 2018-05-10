function addShop(goods_id){
     alert("addShop");
     csrf = $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
        url:'/shopapp/addgoods/',
        type:'POST',
        data:{"goods_id":goods_id},
        dataType:'json',
        headers:{"X-CSRFToken":csrf},
        success:function (msg) {
            alert("success"+msg.c_num);
            alert(goods_id);
            $('#num_'+ goods_id).html(msg.c_num);
            var current_price = $('#sum').html();
            var new_price = parseFloat(current_price) + parseFloat(msg.price)
            $('#sum').html(new_price.toFixed(1))
        },
        error:function (msg) {
            alert("传送错误");
            alert("error"+msg.c_num);
        }
    });
}

function subShop(goods_id){
    alert("subShop");
    csrf = $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
        url:'/shopapp/subgoods/',
        type:'POST',
        data:{"goods_id":goods_id},
        dataType:'json',
        headers:{'X-CSRFToken':csrf},
        success:function (msg) {
            $('#num_'+ goods_id).html(msg.c_num)
            var current_price = $('#sum').html();
            var new_price = parseFloat(current_price) - parseFloat(msg.price)
            $('#sum').html(new_price.toFixed(1))
        },
        error:function (msg) {
            alert("传送错误");
        }
    });
}

function changecartselect(card_id){
    csrf = $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
        url:'/shopapp/changecartselect/',
        type:'POST',
        data:{"card_id":card_id},
        dataType:'json',
        headers:{"X-CSRFToken":csrf},
        success:function(msg){
            if(msg.is_select){
                alert("is_select true");
                s = '<span onclick="changecartselect('+ card_id +')">√</span>';
            }else{
                s = '<span onclick="changecartselect('+ card_id +')">x</span>';
            }
            $('#changeselect_'+ card_id).html(s);
        },
        error:function (msg){
            alert("传输错误")
        }
    });
}

// function allselect(carts) {
//     alert("allselected");
//     csrf = $('input[name="csrfmiddlewaretoken"]').val();
//     allChoice = $('#all_select').html();
//     let flag;
//     if(allChoice=='√'){
//         flag=0;
//     }else{
//         flag=1;
//     }
//     $.ajax({
//         url:'/shopapp/changecartselect/',
//         type:'POST',
//         data:{"carts":carts,"flag":flag},
//         dataType:'json',
//         headers:{"X-CSRFToken":csrf},
//         success:function(msg){
//             for(let i=0; i<carts.length; i++) {
//                 flag=msg.flag;
//                 if (flag) {
//                     alert("is_select true");
//                     s = '<span onclick="changecartselect(' + carts[i].id + ')">√</span>';
//                 } else {
//                     s = '<span onclick="changecartselect(' + carts[i].id  + ')">x</span>';
//                 }
//                 $('#changeselect_'+ carts[i].id).html(s);
//             }
//         },
//         error:function (msg){
//             alert("全选传输错误")
//         }
//     });
// }

$("#all_select").on("click",function () {
   alert("hahaha!!");
   csrf = $('input[name="csrfmiddlewaretoken"]').val();
   allChoice = $(this).html();
   let flag;
   if(allChoice=='√'){
       flag=1;
       $(this).html('x');
   }else{
       flag=0;
       $(this).html('√');
   }
    $.ajax({
        url:'/shopapp/changecartselect/',
        type:'POST',
        data:{"flag":flag},
        dataType:'json',
        headers:{"X-CSRFToken":csrf},
        success:function(msg){
                alert("success!");
                carts=msg.carts;
                for(let i=0; i<carts.length; i++) {
                    changecartselect(carts[i][0])
                }
                // if(allChoice=='√'){
                //     s = '<span onclick=id="all_select">x</span>';
                // }else{
                //    s = '<span onclick=id="all_select">√</span>';
                // }
                //
                // $("#sum_select").html(s);

        },
        error:function (msg){
            alert("全选传输错误")
        }
    });
});

function totalprice() {
    $(this).html("hah")
}