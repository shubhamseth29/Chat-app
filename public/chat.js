socket = io();

console.log(socket.id)

$(function(){
  let loginbox=$('#loginbox');
  let chatbox=$('#chatbox');

  chatbox.hide();
  let username = $('#username');
  let login = $('#login');
  let message = $('#message');
  let send = $('#send');
  let list = $('#list');

login.click(function () {
  socket.emit('login', {username: username.val()})
})

socket.on('logged-in', (data) => {
  chatbox.show();
  loginbox.hide();
})

send.click(function () {
  socket.emit('send_message', {message: message.val()})
})

socket.on('receive_message', (data) => {

  list.append(`<li>${data.username} : ${data.message}</li>`)
})

})
