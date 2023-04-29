// 17b2072f09321489e9b19b51cc5affdc

var mapContainer = document.getElementById('map');
// 지도를 표시할 div 
const t_on = document.querySelectorAll(".traffic li")[0];
//교통 정보를 보게 하는 버튼
const t_off = document.querySelectorAll(".traffic li")[1];
//교통 정보를 끄게 하는 버튼
const branch_btns = document.querySelectorAll(".branch li");
//branch 버튼들을 모두 선택한 배열의 변수 

let drag = true;
let zoom = true;


mapOption = { 
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
// 보여질 지도의 욥션을 설정 

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커 생성하는 옵션을 객체 형태로 각값을 설정하고, 그값을 배열로 변수에 저장한것 
var markerOptions = [
    {
        title: "본점", //제목
        latlng: new kakao.maps.LatLng(37.4764153, 126.8023891), //지도의 위치
        imageSrc: 'img/marter1.png', //마커 이미지경로
        imgSize: new kakao.maps.Size(232, 99), //마커이미지 크기
        imgPos: { offset: new kakao.maps.Point(116,69) }, //마커이미지 위치
        button: branch_btns[0], // 마커와 매치할 버튼의 인덱스 
    },
    {
        title: "지점1",
        latlng: new kakao.maps.LatLng(37.4764153, 126.8023891), 
        imageSrc: 'img/marter2.png', 
        imgSize: new kakao.maps.Size(232, 99), 
        imgPos: { offset: new kakao.maps.Point(116,69) }, 
        button: branch_btns[1], 
    },
    {
        title: "지점2",
        latlng: new kakao.maps.LatLng(37.4764153, 126.8023891), 
        imageSrc: 'img/marter2.png', 
        imgSize: new kakao.maps.Size(232, 99), 
        imgPos: { offset: new kakao.maps.Point(116,69) }, 
        button: branch_btns[2], 
    }       
];

for (let i = 0; i < markerOptions.length; i++) {
    new kakao.maps.marker({
        map: map, //앞의 map은 Maker생성시 필요한 정보를 받는 변수 이고, 뒤의 map은 우리가 위에서 선언한 map이다
        position:markerOptions[i].latlng, //지도의 위치, 위도 경도 값 -이 값은 우리가 makerOptions에 latlng값으로 저장 했으므로 해당 객체배열에 접근해서 기져온다 
        title: markerOptions[i].title, //제목 값이고 위와 같이 접근해서 가지고 온다
        image: new kakao.maps.MakerImage(markerOptions[i].imageSrc, markerOptions[i].imgSize, markerOptions[i].imgPos),
        // new kakao.maps.MakerImage(imageSrc, imgeSize, imageOption),
        // 카카오에서 제공하는 MakerImage라는 메서드를 사용하는데()안의 매개 변수 자리에 필요한 값이 markerOptions에 있기 때문에 각 값을 해당 객체 배열에 접근해서 가지고 오는것
    });
    //  branch 버튼을 클릭 했을때 해당 위치로 이동 및 버튼 활성화 시키는 코드 - markerOptions의 각인덱스 버튼을 접근해서 click 이벤트를 걸어줌 
    markerOptions[i].button.onclick =(e) => {
        e.preventDefault();

        //모든 버튼에 반복을 돌면서 on을 지우고 
        for (let k = 0; k < markerOptions.length; k++) {
            markerOptions[k].button.classList.remove("on");
        }
        //내가 클릭한 그 index에 만 접근해서 on을 붙임 
        markerOptions[i].button.classList.add("on");

        //최종적으로 클릭한 인덱스의 위도 경도 값을로 moveTo함수의 매개 변수로 넣어 최종 이동 시킴 
        moveTo(markerOptions[i].latlng);
    }
}
//리사이즈 해도 지도의 가운데로 마커가 세팅 되게 하는 이벤트 
window.onresize = () => {
    let active_btn = document.querySelector(".branch li on");
    //먼저 on 활성화 클래스가 있는 li를 찾아서 변수에 담음
    let active_index = active_btn.getAttribute("data-index");
    //위에 변수에서 활성화 되어있는 li안의 data-index 속성 값을 가져옴 - 0,1,2 같은 숫자가 담김 

    map.setCenter(markerOptions[active_index].latlng);
    setCenter함수를 사용하여 지도를 정중앙에 배치하는데 위치는 위에서 변수로 담은 현재 활성화 되어 있는 인덱스로 위치
}

t_on.addEventListener("click", (e) => {
    e.preventDefault();

    if (t_on.classList.contains('on')) return;

    map.addOverlayTypeId(kakao.maps.MapTypeId.TRAFFIC);

    //t_on 버튼을 활성화 함
    t_on.classList.add("on");
    //t_off는 비활성화함
    t_off.classList.remove("on");
});

t_off.addEventListener("click", (e) => {
    e.preventDefault();
    if (t_off.classList.contains("on")) return;
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

    //t_on 버튼의 on을 활성화함
    t_off.classList.add("on");
    //t_off는 비활성화 함
    t_on.classList.remove("on");
});



// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);  
