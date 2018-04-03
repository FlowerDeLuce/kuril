$(document).ready(function () {

  $('.top-banner-slider').slick({
    nextArrow: '',
    prevArrow: '',
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });
  $('.mobile-menu__icon').click(function(){
     $(this).toggleClass('active');
     $(this).parent().find('.main-menu').slideToggle();
  })
    
  $('.popup-close').click(function(){
    $(this).closest('.popup').fadeOut('slow');
  });
  
  $('.popup-link').click(function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $(target).fadeIn('slow');
  });
  $('.main-menu .dropdown-link').click(function(e){
    e.preventDefault();
    $(this).parent().find('.dropdown-menu').slideToggle();
  });
  
  var validateForm = function(){
     var nameInput = $(".contact-input[data-type='name']");
     var phoneInput = $(".contact-input[data-type='phone']");
     var emailInput = $(".contact-input[data-type='email']");
     var textarea = $(".contact-textarea");
     var name = nameInput.val();
     var phone = phoneInput.val();
     var email = emailInput.val();
     var text = textarea.val();
     if(name.length<2){
        var message='name is too short';
        createMessage(nameInput, message);
     }
    if(phone.length<5){
        var message='incorrect phone number';
        createMessage(phoneInput, message);
     }
     if(name.match(/[^a-zA-Z ]/)){
        var message='incorrect name';
        createMessage(nameInput, message);
     }
     if(!email.match(/@+/g)||email.length<6){
        var message='incorrect email';
        createMessage(emailInput, message);
     }
     if(text.length<3){
        var message='your message is too short';
        createMessage(textarea, message);
     }
     function createMessage(input,message){
       if(input.parent().find('span').length>0){
          var msg = input.parent().find('span');
       }else{
          var msg = document.createElement('span');
          input.parent().append(msg);
       }
       input.parent().addClass('error');
       $(msg).html(message);
     }
    }
  $('.contact-submit').on('click', validateForm );
  $('.contact-input').on('focus', resetInput);
  $('.contact-textarea').on('focus', resetInput);
  function resetInput(){
    $(this).parent().removeClass('error');
    $(this).parent().find('span').html('');
  }
  $('.contact-input[data-type="phone"]').mask("+38(999) 999-99-99");
});
