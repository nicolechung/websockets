/* Angular stuff goes here */
var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', {
    my: 'data'
  });
});

function BeforeIDoCtrl($scope) {

}