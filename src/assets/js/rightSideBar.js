$(document).ready(function(){
  $(".right_menu_toggle").click(function(){
    $(".main").toggleClass("shrink");
    $(".sidepanel").toggleClass("show");
    $(".right_menu_toggle").toggleClass("close");
    $(".porfile_sec").toggleClass("hide");
  });
});

$('.modal-backdrop').remove();
$('#edit_icon').click(function () {
  $(".enabled_inp").removeAttr('disabled');
});


// $("#dt").datepicker('show');