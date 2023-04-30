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
    center: new kakao.maps.LatLng(37.3340318, 126.8362407), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
// 보여질 지도의 욥션을 설정 


// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커 생성하는 옵션을 객체 형태로 각값을 설정하고, 그값을 배열로 변수에 저장한것 
var markerOptions = [
    {
        title: "본점", //제목
        latlng: new kakao.maps.LatLng(37.3340318, 126.8362407), //지도의 위치
        imageSrc: 'img/marter1.png', //마커 이미지경로
        imgSize: new kakao.maps.Size(232, 99), //마커이미지 크기
        imgPos: { offset: new kakao.maps.Point(116,69) }, //마커이미지 위치
        button: branch_btns[0], // 마커와 매치할 버튼의 인덱스 
    },
    {
        title: "지점1",
        latlng: new kakao.maps.LatLng(37.5053274, 126.7464023), 
        imageSrc: 'img/marter2.png', 
        imgSize: new kakao.maps.Size(232, 99), 
        imgPos: { offset: new kakao.maps.Point(116,69) }, 
        button: branch_btns[1], 
    },
    {
        title: "지점2",
        latlng: new kakao.maps.LatLng(37.3764175, 127.2290772), 
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
    // setCenter함수를 사용하여 지도를 정중앙에 배치하는데 위치는 위에서 변수로 담은 현재 활성화 되어 있는 인덱스로 위치
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



//일반 지도와 스카이뷰로 지도 타입을 전환할수 있는 지도 타입 컨트롤을 생성 합니다.
var MapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시 됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의 하는데 TOPRIGHT는 오른쪽 위를 의미합니다.
map.addControl(MapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//지도 확대 축소를 제어할수 있는 줌 컨트롤을 생성 합니다.
var zoomControl = new kakao.mapsZoomcControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

setDraggable(drag);
setZoomable(zoom);






//버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
    //마우스 힐로 지도 확대, 축소 가능 여부를 설정 합니다
    map.setZoomable(zoomable);
}

//버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다.
function setDraggable(draggable) {
    //마우스 드래그로 지도 이동 가능 여부를 설정합니다
    map.setDraggable(draggable);
}



function moveTo(target) {  //함수가 위치 시킬 값을 매개로 받아서
    var moveLatlng = target; //밑에 전달해서 최종 지도를 움직임 
    map.setCenter(moveLatlng); //지도를 중심으로 이동시킴 
}

