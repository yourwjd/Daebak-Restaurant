window.onload = function() {
  const socket = io();

  // 서버에서 전달받은 nick을 저장
  const nick = document.body.dataset.nick;
  
  console.log('Nick:', window.nick);

  /* 접속 되었을 때 실행 */
  socket.on('connect', function() {
    /* 서버에 새로운 유저가 왔다고 알림 */
    socket.emit('newUser', nick)
  })

  /* 서버로부터 데이터 받은 경우 */
  socket.on('update', function(data) {
    var chat = document.getElementById('chat')
    var message = document.createElement('div')
    var node = document.createTextNode(`${data.name}: ${data.message}`)
    var className = ''

    // 타입에 따라 적용할 클래스를 다르게 지정
    switch(data.type) {
      case 'message':
        className = 'other'
        break

      case 'connect':
        className = 'connect'
        break

      case 'disconnect':
        className = 'disconnect'
        break
    }

    message.classList.add(className)
    message.appendChild(node)
    chat.appendChild(message)
  })

  window.send = function() {
    // 입력되어있는 데이터 가져오기
    var message = document.getElementById('test').value

    // 채팅창의 마지막 사용자 메시지 가져오기
    var chat = document.getElementById('chat')
    var lastMessage = null
    for (var i = chat.childNodes.length - 1; i >= 0; i--) {
      var msg = chat.childNodes[i]
      if (msg.nodeType === Node.ELEMENT_NODE && (msg.classList.contains('me') || msg.classList.contains('other'))) {
        lastMessage = msg.textContent.slice(nick.length + 2)  // nick + ': ' 부분 제거
        break
      }
    }

    //채팅창에 메시지가 없을 때
    if (!lastMessage) {
      if (message.charAt(0) !== '육') {
        alert('첫 번째 메시지는 "육"으로 시작해야 합니다.')
        return
      }

    }

    // 채팅창에 메시지가 있을 때
    else {
      // 마지막 메시지와 새로운 메시지를 비교
      if (lastMessage.slice(-1) !== message.charAt(0)) {
        alert('끝말잇기 규칙에 어긋납니다.')
        return
      }
    }


    // 가져왔으니 데이터 빈칸으로 변경
    document.getElementById('test').value = ''

    // 내가 전송할 메시지 클라이언트에게 표시
    var msg = document.createElement('div')
    var node = document.createTextNode(nick + ': ' + message)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)

    // 서버로 message 이벤트 전달 + 데이터와 함께    
    socket.emit('message', {type: 'message', message: message, name: nick})
  }
};
