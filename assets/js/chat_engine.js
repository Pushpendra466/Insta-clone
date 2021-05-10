let socket = io();
let btn = document.getElementById('btn');
let ul = document.getElementById('messages');
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
      
      let item = document.createElement('li');
      item.textContent = message.value;
      ul.appendChild(item);
      console.log(ul.scrollHeight)
      // $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1500);
      // 
      item.classList.add('sender');

      message.value = '';
    }
  });

  socket.on('new_message', function(data) {
      if(data.data.sender == receiverId.value)
    {
    let item = document.createElement('li');
    item.textContent = data.data.message;
    ul.appendChild(item);
    // $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1500);
    item.classList.add('receiver');
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

