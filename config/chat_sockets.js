const User = require('../models/user');

module.exports.getApp = (app,port)=>{
    const http = require('http');
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = new Server(server);

    let users = [];

    io.on('connection', (socket) => {
        socket.on('user_connected',function(userId){
            users[userId] = socket.id;
            console.log('a user connected',users);
        });
        

        socket.on('send_message',async function(data){
            console.log(users);
            let socketId = users[data.receiver];
       
            io.to(socketId).emit('new_message', {data});
        })


        socket.on('disconnect', () => {
            console.log('user disconnected');
          });
      });

    

    server.listen(port, () => {
        console.log(`listening on *:${port}`);
      });
}
// module.exports.chatSokets = function(socketServer){
//     let io = require('socket.io')(socketServer);
//     io.sockets.on('connection', function(socket){
//         console.log('new connection received', socket.id);

//         socket.on('disconnect', function(){
//             console.log('socket disconnected!');
//         });

        
//         socket.on('join_room', function(data){
//             console.log('joining request rec.', data);

//             socket.join(data.chatroom);

//             io.in(data.chatroom).emit('user_joined', data);
//         });

//         // CHANGE :: detect send_message and broadcast to everyone in the room
//         socket.on('send_message', function(data){
//             io.in(data.chatroom).emit('receive_message', data);
//         });

//     });
  
// }

