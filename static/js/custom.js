 var caption;
$("#addCaptionbtn").click(function() {
 caption=$("#punc1").val()+$("#input1").val()+$("#punc2").val()+$("#input2").val()+$("#punc3").val()+$("#input3").val()+$("#punc4").val()+$("#input4").val()+$("#punc5").val()+$("#input5").val()+$("#punc6").val()+$("#input6").val()+$("#punc7").val();
  console.log(caption);
  $.post("/addcaption", { 'text':caption, 'name' : $("#nameInput").val()},function(data) {
     location.reload(); 
   });
});

 $(document).ready(function(){
   $(".word").keydown(function(event) {
        if( (event.keyCode<65 && event.keyCode >16 && event.keyCode!=46 && event.keyCode!=39)  || (event.keyCode>90 && event.keyCode!=189 && event.keyCode!=222))  {event.preventDefault(); }   
    });
 
 });