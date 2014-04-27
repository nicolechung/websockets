/* Angular stuff goes here */
var socket = io.connect('http://localhost');

socket.on('news', function (data) {
  console.log(data);
});

function BeforeIDieCtrl($scope) {
  $scope.addBeforeTodo = function() {
    var todo = $scope.beforeIDieTxt;

    socket.emit('add', {
      todo: todo,
      createDate: new Date().getTime(),
      modifiedDate: new Date().getTime()
    });
  }
}