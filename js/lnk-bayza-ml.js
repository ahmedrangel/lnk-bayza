$(document).ready(function(){
    $("[data-toggle='tooltip']").tooltip();
      $(".copy-to-clipboard").click(function(){
        document.getElementById('copy-to-clipboard').style.opacity = "1";
        $('#clipboard').html('<i id="copied-check" class="fas fa-check text-success" aria-hidden="true"></i>');
        $("[data-toggle='tooltip']").tooltip('dispose');
        $("[data-toggle='tooltip-copied']").attr('data-original-title', "Copied!").tooltip({trigger: 'manual'}).tooltip('show');
        $(document).mouseup(function(e) {
          var container = $("#copied-check")
        if (!container.is(e.target) && container.has(e.target).length == 0) {
          $("[data-toggle='tooltip']").tooltip();
          $("[data-toggle='tooltip-copied']").tooltip('dispose');
          document.getElementById('copy-to-clipboard').style.opacity = "70%";
          container.hide();
        }
      });
    });
});
  
function CopyToClipboard() {  
  var dummy = document.createElement('input'),
  text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

jQuery(document).ready(function ($){
  if (navigator.userAgent.match(/Android/i)){
    $('#itunes').hide();
  };
});