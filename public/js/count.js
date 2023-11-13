window.addEventListener('load', () => {

  //좋아요 값 가져오기
  fetch('/likes/count')
  .then(response => response.json())
  .then(data => {

    //like-count 클래스 가진 모든 요소에 좋아요 값 설정
    let countElements = document.querySelectorAll('.like-count');
    countElements.forEach(countElement => {
      countElement.textContent = data.count;
    });
  })
  .catch(error => console.error(error));
});


//like-button 버튼 클릭 시 이벤트 리스너
document.querySelectorAll('.like-button').forEach(button => {
button.addEventListener('click', (event) => {
  event.preventDefault();

  console.log("Previous sibling: ", button.previousElementSibling);
  
  const likeId = button.dataset.likeId;
  const liked = document.querySelector('#' + likeId).checked;

  console.log("Liked value: ", liked);

  //liked 값 서버로 전송
  fetch('http://localhost:8080/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ liked: liked }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })

  // 좋아요 개수 가져오고 업데이트
    .then(() => {
    fetch('/likes/count')
    .then(response => response.json())
    .then(data => {
      let countElement = document.querySelector('.like-count');
      countElement.textContent = data.count;
      console.log(data);
    });
  })
  .catch(error => console.error(error));
});
});