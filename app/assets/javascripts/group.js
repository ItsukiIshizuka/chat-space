
$(function() {
  var search_result = $("#user-search-result");

  function appendUser(user) {
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>
                `
    search_result.append(html);
  }

  function appendDontUser(none){
    
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">"${none}"</p>
                </div>
                `
    search_result.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { input: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }else {
        appendDontUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert("ユーザーの検索に失敗しました");
    });
    
  });

  $('.chat-group-form__field--right').on("click", ".chat-group-user__btn--add", function (e) {
    var user = e.target;
    name = $(user).attr('data-user-name');
    id = $(user).attr('data-user-id');

    function  appendAddUser(name, id){
      var html = `
              <div class='chat-group-user clearfix js-chat-member' id=${id}>
                <input name='group[user_ids][]' type='hidden' value=${id} id=group_user_ids>
                <p class='chat-group-user__name'>${name}</p>
                <a class='chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>
              `
      $('.chat-group-users.js-add-user').append(html)
    };
    
    appendAddUser(name, id);
    var user = $(this).parent();
    user.remove();
  });
  
  $('.chat-group-form__field--right').on("click", ".js-remove-btn", function () {
    var user = $(this).parent();
    user.remove();
  });
});