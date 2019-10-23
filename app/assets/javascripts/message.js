$(function() {
  function buildHTML(message){
    //ここから非同期通信 + AutoScroll
    var content = message.content == null? `` : `<p class='lower-message__content'>${message.content}</p>`;
    var image = message.image.url == null? image =  `` : image = `<img class="lower-message__image" src= ${message.image.url}> `; 

    var html = `<div class='message' data-message-id=${message.id}>
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                    ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                    ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-message'>
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  };

  function scroll(){
    $('.message_main').animate({ scrollTop: $('.message_main')[0].scrollHeight}, 'fast'); //サイト開くと一番下
  };
  scroll();

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      scroll();
      let html = buildHTML(data);
      $('.message_main').append(html)
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
  });
  $('.form__submit').removeAttr('data-disable-with');
  //ここまで非同期通信 + AutoScroll

  //ここから自動更新
  function reloadMessages(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            if (message.id > last_message_id){
              insertHTML = buildHTML(message)
              $('.message_main').append(insertHTML);
            }
          })
          scroll();
      })
      .fail(function() {
        alert('error');
      });
    };
  };
  setInterval(reloadMessages, 5000);
  //ここまで自動更新
});
