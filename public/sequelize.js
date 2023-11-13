//페이지가 로드 되면
document.addEventListener('DOMContentLoaded', (event) => {

  // user 로딩
  //테이블 형태로 출력
  async function getUser() {
    try {
      const res = await axios.get('/users');
      const users = res.data;
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        const row = document.createElement('tr');

        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.comment;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.created_at;
        row.appendChild(td);

        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }

  // like 로딩
  //테이블 형태로 출력
  async function getLike() {
    try {
      const res = await axios.get('/likes');
      const likes = res.data;
      console.log(likes);
      tbody.innerHTML = '';
      likes.map(function (like) {
        const row = document.createElement('tr');

        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = like.id;
        row.appendChild(td);

        td.textContent = like.married ? '좋아요' : '아니에요';
        row.appendChild(td);

        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  // reservation 로딩
  //테이블 형태로 출력
  async function getReservation() {
    try {
      const res = await axios.get('/reservations');
      const reservations = res.data;
      console.log(reservations);
      const tbody = document.querySelector('#reservation-list tbody');
      tbody.innerHTML = '';
      reservations.map(function (reservation) {
        const row = document.createElement('tr');

        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = reservation.id;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = reservation.name;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = reservation.phone_number;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = reservation.people_number;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = reservation.order_date;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = reservation.comment;
        row.appendChild(td);

        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  

  // user 등록 시
  const userForm = document.getElementById('user-form');

  // userForm이 존재할 경우에만 이벤트 리스너 추가
  if(userForm) {  
    userForm.addEventListener('submit', async (e) => {    e.preventDefault();
    const comment = e.target.comment.value;
    const name = e.target.username.value;
    if (!comment) {
      return alert('내용을 입력하세요');
    }
    if (!name) {
      return alert('이름을 입력하세요');
    }
    try {
      await axios.post('/users', { comment, name });

      //등록된 데이터 가져옴
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.comment.value = '';
    e.target.username.value = '';
  });
}
  
  
  // like 등록 시
  const likeForm = document.getElementById('like-form');

  // likeForm이 존재할 경우에만 이벤트 리스너 추가
  if(likeForm) {  
    likeForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    const liked = e.target.liked.checked;

    try {
      await axios.post('/likes', { liked });

      //등록된 데이터 가져옴
      getLike();
    } catch (err) {
      console.error(err);
    }

    e.target.liked.checked = false;
  });
}


// reservation 등록 시
const reservationButton = document.getElementById('check1');
const reservationForm = document.getElementById('reservation-form');

// 예약 버튼과 form이 존재할 경우에만 이벤트 리스너 추가
if(reservationButton && reservationForm) {  
  
  //버튼을 클릭하면
  reservationButton.addEventListener('click', async (e) => {      
    e.preventDefault();
    const name = reservationForm.reservationname.value;
    const phone_number = reservationForm.phone_number.value;
    const people_number = reservationForm.people_number.value;
    const order_date = reservationForm.order_date.value;
    const comment = reservationForm.comment.value;
      if (!phone_number) {
        return alert('전화번호를 입력하세요');
      }
      if (!people_number) {
        return alert('인원 수 입력하세요');
      }
      if (!order_date) {
        return alert('예약 날짜를 입력하세요');
      }
      if (!comment) {
        return alert('덧붙이실 내용을 입력하세요');
      }
      try {
        await axios.post('/reservations', { name, phone_number, people_number, order_date, comment });

        //등록된 데이터 가져옴
        getReservation();
      } catch (err) {
        console.error(err);
      }
  
      reservationForm.reservationname.value = '';
      reservationForm.phone_number.value = '';
      reservationForm.people_number.value = '';
      reservationForm.order_date.value = '';
      reservationForm.comment.value = '';
    });
  }
});