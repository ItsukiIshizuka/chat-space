$(function() {
  function buildHTML(message){

    if(message.content == null){
      var content = ``;
    }else {
      var content = `<p class='lower-message__content'>
                      ${message.content}
                    </p>`
    }

    if(message.image !== null){
      var image = ``;
    }else {
      var image = `<img class="lower-message__image" src=${message.image.url}>`;
    }

    var html = `<div class='message'>
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
    $('.message_main').animate({ scrollTop: $('.message_main')[0].scrollHeight}, 1000, 'linear'); //サイト開くと一番下
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
      $('.form__message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })

  $('.form__submit').removeAttr('data-disable-with')

});