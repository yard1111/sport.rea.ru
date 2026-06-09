function openModal(id)
{
    var elem = document.getElementById(id);
    elem.classList.add("active");
}

function closeModal(id)
{
    var elem = document.getElementById(id);
    elem.classList.remove("active");
}

function modalBGclick(event){
    var path = event.path || event.composedPath;
    if(path[0].classList.contains("pbl-modal")){
        path[0].classList.remove("active");
    }
}

function spoiler(elem){
    if(elem.classList.contains("active")){
        elem.classList.remove("active");
    }else{
        elem.classList.add("active");
    }
}

function submitLoginForm(form)
{
    $(form).find('#submitLogin').attr('disabled', 'disabled');
    $.post($(form).attr('action'), $(form).serializeArray(), function(data) {

        $('#login .errors').remove();
        $('#login .success').remove();
        if (!data.error) {
            $('#login > div').prepend('<div class="errors">'+data.msg+'</div>');
        }
        else {
            $('#login > div').prepend('<div class="success">'+data.msg+'</div>');
            location.reload();
        }

        $(form).find('#submitLogin').removeAttr('disabled');
    }, 'json');
}

function submitRegistrationForm(form)
{
    $(form).find('#submitReg').attr('disabled', 'disabled');
    $.post($(form).attr('action'), $(form).serializeArray(), function(data) {

        $('#register .errors').remove();
        $('#register .success').remove();
        if (!data.error) {
            $('#register > div').prepend('<div class="errors">'+data.msg+'</div>');
            //var i = $(form).find('.input-captcha img').first();
            //var h = /^.*\/\?v=/.exec(i.attr('src'));
            //i.attr('src', i.attr('src')+Math.floor(100000*Math.random()));
        }
        else {
            $('#register > div').prepend('<div class="success">'+data.msg+'</div>');
            location.href = data.url;
        }

        $(form).find('#submitReg').removeAttr('disabled');
    }, 'json');
}

function submitRestoreForm(form, type)
{
    $(form).find('#submitForget').attr('disabled', 'disabled');
    $.post($(form).attr('action'), $(form).serializeArray(), function(data){

        $('#forget .errors').remove();
        $('#forget .success').remove();
        if (!data.error) {
            $('#forget > div').prepend('<div class="errors">'+data.msg+'</div>');
        }
        else {
            $('#forget > div').html('<div class="success">'+data.msg+'</div>');
        }

        $(form).find('#submitForget').removeAttr('disabled');
    }, 'json');
}

function sendRegistrationConfirm(link)
{
    $('#modal .modal-content').html('<div style="background:#fff; width: 16px; height: 16px; margin: 0 auto; border-radius: 5px;"><img src="/design/images/loader-ball-16.GIF"></div>');
    $.modal().close();
    $('#modal').modal().open({
        onOpen: function(el, options){
            $('#modal').css('margin-top', '200px');
        }
    });
    $.post($(link).attr('href'), function(data){
        data = $.parseJSON(data);
        $('#modal .modal-content').html('<div class="'+(!data.error ? 'errors' : 'success')+'">'+data.msg+'</div>');
    });
}