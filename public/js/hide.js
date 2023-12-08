
//check1 버튼(예약 조회 버튼)에 이벤트 리스너 추가
document.querySelector('#check1').addEventListener('click', function() {

    //예약하기 화면 안 보이게
    document.querySelector('#reservation-list').style.display = 'none';
    //예약조회 화면 보이게
    document.querySelector('#reservation-form').style.display = 'table';
});

//check2 버튼()예약 하기 버튼에 이벤트 리스너 추가
document.querySelector('#check2').addEventListener('click', function() {

    //예약조회 화면 안 보이게
    document.querySelector('#reservation-list').style.display = 'table';

    //예약하기 화면 보이게
    document.querySelector('#reservation-form').style.display = 'none';
});

