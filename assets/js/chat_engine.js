let socket = io();
let btn = document.getElementById('btn');
let message = document.getElementById('message');
let senderId = document.getElementById('getSenderId');
let receiverId = document.getElementById('getReceiverId');
let senderName = document.getElementById('getsenderName');

socket.emit('user_connected',senderId.value);

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (message.value) {
      socket.emit('send_message', 
      {
        message:message.value,
        sender: senderId.value,
        receiver: receiverId.value,
        senderName: senderName.value
      });
      message.value = '';
    }
  });

  socket.on('new_message', function(data) {
      if(data.data.sender == receiverId.value)
    {
    let item = document.createElement('li');
    item.textContent = data.data.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}
  else {
    new Noty({
        theme: 'relax',
        text: 'new message from '+ data.data.senderName +': '+data.data.message,
        type: 'information',
        layout: 'topRight',
        timeout: 2500,
       
        }).on('onShow', () =>{
            var audio = new Audio('/notification.wav');
            audio.play();
        })
    .show();
    
  }
    
  });

