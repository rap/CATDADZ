  var socket = io();

  /**** Click Events ***/

  $(document).keypress(function(e){
    socket.emit('key', e.charCode);
    $(document).trigger("input:key", e);
    return false;
  });

  $("body").click(function(e){
    socket.emit('click');
    $(document).trigger("input:click", e);
    return false;
  });

  $("#clockToggle").click(function(e){
    e.preventDefault();
    e.stopPropagation();

    if(!$(this).hasClass("on")) {
      $(this).addClass("on");
      socket.emit('clock:on');
    }
    else {
      $(this).removeClass("on");
      socket.emit('clock:off');
    }
    
    return false;
  });

  /**** Socket Listeners ***/

  socket.on('log:key', function(msg){
    // console.log(msg);
  });

  socket.on('log:active', function(msg){
    // console.log(msg);
  });

  socket.on('pulse', function(msg){
    $("#rate").find('.key span').html(msg[0]);
    $("#rate").find('.click span').html(msg[1]);
  });

  socket.on('cat:instantiate', function(){
    console.log("new cat here!");
  });