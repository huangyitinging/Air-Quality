


const AQIapi = 'https://cors-anywhere.herokuapp.com/http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json';

let CallbackData = {};

$('.title').hide();
$('.main').hide();
$('.content').hide();
$('.footer').hide();

//取得 api
setTimeout(function(){
    getapi();
},5000);

function getapi() {
    let promise = new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', AQIapi, true);
        xhr.send(null);
        xhr.onload = () =>{
            if (xhr.status >= 200 && xhr.status < 400){
                resolve(xhr.response);
            } else {
                reject('取得資料失敗:' + xhr.status);
            }
        }
    });
    promise.then((res) => {
        $('.loading-box').hide();
        $('.title').show();
        $('.main').show();
        $('.content').show();
        $('.footer').show();
        let CallbackData = JSON.parse(res);
        //console.log(res);
        let CountyArray = [];
        let CountyList = document.querySelector('.CountyList');
        let PublishTime = document.querySelector('.PublishTime');
        let County = document.querySelector('.County');
        let table_list = document.querySelector('.table_list')
        let timeArray;
        let optionValue;
        let data = [];
        let SiteNameValue;
        for (let i = 0; i < CallbackData.length; i++){
            CountyArray.push(CallbackData[i].County);
            //console.log(CountyArray);
            timeArray = CallbackData[i].PublishTime;
            //console.log(timeArray);
            data.push(CallbackData[i]);
        }
        //select 下拉選單
        let select = CountyArray.filter((item, key, arr) => {
            //console.log(item, key, arr);
            return arr.indexOf(item) === key;
        });
        for (let i = 0; i < select.length; i++){
            let option = document.createElement('option');
            option.value = select[i];
            option.innerText = select[i];
            CountyList.appendChild(option);
        }
        let dataList = () => {
            if (!optionValue){
                optionValue = '高雄市';
                County.innerText = optionValue;
                PublishTime.innerText = timeArray;
            }
            let str ='';
            let selectStr = '';
            for (let i = 0; i < data.length; i++){
                if (optionValue === data[i].County){
                    let AQI = data[i].AQI;
                    if (AQI !==''){
                        str +=`
                        <table class="table table-bordered bg-white region_list">
                            <thead>
                                <tr>
                                    <th scope="col" width="190px" height="97px" class="table-bordered region_list_textsize">${data[i].SiteName}</th>
                                    <th scope="col" width="160px" height="97px" class="table-bordered numsize AQIcolor">${data[i].AQI}</th>
                                </tr>
                            </thead>
                        </table>`;
                        SiteNameValue = data[i].SiteName;
                    }
                    table_list.innerHTML = str;
                    let AQIcolor = document.querySelectorAll('.AQIcolor');
                    for (j = 0; j < AQIcolor.length; j++){
                        let AQItext = AQIcolor[j].innerText;
                        if (AQItext <= 50){
                            AQIcolor[j].setAttribute('style','background:#95F084');
                        }else if (AQItext >=51 && AQItext <= 100){
                            AQIcolor[j].setAttribute('style','background:#FFE695');
                        }else if (AQItext >= 101 && AQItext <= 150){
                            AQIcolor[j].setAttribute('style','background:#FFAF6A');
                        }else if (AQItext >= 151 && AQItext <= 200){
                            AQIcolor[j].setAttribute('style','background:#FF5757');
                        }else if (AQItext >= 201 && AQItext <=300){
                            AQIcolor[j].setAttribute('style','background:#9777FF');
                        }else if (AQItext >= 301 && AQItext <= 400){
                            AQIcolor[j].setAttribute('style','background:#AD1774');
                        }
                    }
                }
            }
        };
        dataList();

        let selectList = (e) => {
            optionValue = e.target.value;
            //console.log(optionValue)
            County.innerText = optionValue;
            PublishTime.innerText = timeArray;
            dataList();
            dataSiteName();
        };
        CountyList.addEventListener('change', selectList, false);

        let SiteName_select = document.querySelector('.SiteName_select');
        let AQI_select = document.querySelector('.AQI_select');
        let O3 = document.querySelector('.O3');
        let PM10 = document.querySelector('.PM10');
        let PM25 = document.querySelector('.PM25');
        let CO = document.querySelector('.CO');
        let SO2 = document.querySelector('.SO2');
        let NO2 = document.querySelector('.NO2');

        let dataSiteName = () => {
            if (!SiteNameValue){
               // SiteNameValue = data[0].SiteName;
                console.log(SiteNameValue);
            }
            for(let i = 0; i < data.length; i++){
                if (SiteNameValue === data[i].SiteName){
                    SiteName_select.innerText = data[i].SiteName;
                    if (data[i].AQI === ''){
                        AQI_select.innerHTML = '';
                        O3.innerHTML = '';
                        PM10.innerHTML = '';
                        PM25.innerHTML = '';
                        CO.innerHTML = '';
                        SO2.innerHTML = '';
                        NO2.innerHTML = '';
                        AQI_select.setAttribute('style','background:none;');
                    }else {
                        AQI_select.innerHTML = data[i].AQI;
                        O3.innerHTML = data[i].O3;
                        PM10.innerHTML = data[i].PM10;
                        PM25.innerHTML = data[i]['PM2.5'];
                        CO.innerHTML = data[i].CO;
                        SO2.innerHTML = data[i].SO2;
                        NO2.innerHTML = data[i].NO2;
                        
                        let AQItext = AQI_select.innerText; 
                        if (AQItext <= 50){
                            AQI_select.setAttribute('style','background:#95F084');
                        }else if (AQItext >=51 && AQItext <= 100){
                            AQI_select.setAttribute('style','background:#FFE695');
                        }else if (AQItext >= 101 && AQItext <= 150){
                            AQI_select.setAttribute('style','background:#FFAF6A');
                        }else if (AQItext >= 151 && AQItext <= 200){
                            AQI_select.setAttribute('style','background:#FF5757');
                        }else if (AQItext >= 201 && AQItext <=300){
                            AQI_select.setAttribute('style','background:#9777FF');
                        }else if (AQItext >= 301 && AQItext <= 400){
                            AQI_select.setAttribute('style','background:#AD1774');
                        }
                    }
                }
            }
        };
        dataSiteName();

        let select_SiteName  = (e) => {
            SiteNameValue = e.target.textContent;
            dataSiteName();
        }
        table_list.addEventListener('click', select_SiteName, false);
    });
    promise.catch((error) => {
        console.log(error);
    })
}


