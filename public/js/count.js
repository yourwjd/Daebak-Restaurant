window.addEventListener('load', () => {

  //like-checked 버튼 클릭 시 이벤트 리스너
  document.querySelectorAll('.liked').forEach(checkbox  => {

    const likeId = checkbox .id.substring(4); // 'like'의 'id'를 가져옴

    // const likeId = new Date().getTime().toString(); // 고유한 'id' 값 생성

    //좋아요 값 가져오기
    fetch('/likes/count/' + likeId)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // 응답을 텍스트로 변환
    })
    
    .then(text => {
      try {
        // 텍스트를 JSON으로 변환
        const data = JSON.parse(text);
        // like-count 클래스 가진 모든 요소에 좋아요 값 설정
        let countElement = checkbox.nextElementSibling.firstChild;
        countElement.textContent = data.count;
      } catch (error) {
        // JSON으로 변환할 수 없는 경우, 오류 메시지를 출력
        console.error('Invalid JSON:', text);
      }
    })
      .catch(error => console.error(error));

      checkbox.addEventListener('click', (event) => {

      // 좋아요 버튼을 누른 메뉴의 좋아요 개수 업데이트
      let countElement = checkbox.nextElementSibling.firstChild;
      let currentCount = parseInt(countElement.textContent);
      if (isNaN(currentCount)) {
        currentCount = 0;
      }

      countElement.textContent = currentCount + 1; // 카운트 증가

      //liked 값 서버로 전송
      fetch('/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: likeId, liked: true }), // liked는 항상 true
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch(error => console.error(error));
    });
  });
});