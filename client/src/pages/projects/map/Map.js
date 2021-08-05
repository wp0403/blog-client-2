/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-03 11:23:10
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-05 16:03:21
 */
import React, { Component } from 'react';//66d85548fa61463f4daac625965e1e08
import "./map.scss";
import AMapLoader from '@amap/amap-jsapi-loader';
import { AimOutlined, CoffeeOutlined, BankOutlined, VideoCameraOutlined, CarOutlined, SendOutlined, SwapOutlined, BranchesOutlined, ArrowLeftOutlined } from '@ant-design/icons';

class Map extends Component {
    state = {
        timerId: "",        //定时器id
        startLngLat: [116.397428, 39.90923],    //起点坐标
        endLngLat: [],      //终点坐标
        activeType: 'typeBox_block',  //当前的功能盒子
        typeList: [
            {
                id: 1,
                typeText: "导航",
                class: "navigationBox_block"
            },
            {
                id: 2,
                typeText: "附近搜索",
                class: "searchBox_block"
            },
            {
                id: 3,
                typeText: "关键字搜索",
                class: "keywordBox_block"
            },
            {
                id: 4,
                typeText: "区域抓取",
                class: "areaBox_block"
            }
        ],                  //功能列表
        myLocation: [116.397428, 39.90923],     //我的坐标
        searchLocation: [116.397428, 39.90923], //搜索地的坐标
        searchList: [
            {
                id: 1,
                text: '餐饮',
                value: '餐饮',
                tag: <CoffeeOutlined />,
                backgroundColor: "#f90"
            },
            {
                id: 2,
                text: '酒店',
                value: '酒店',
                tag: <BankOutlined />,
                backgroundColor: "#f9f"
            },
            {
                id: 3,
                text: '电影院',
                value: '电影院',
                tag: <VideoCameraOutlined />,
                backgroundColor: "#99f"
            }, {
                id: 4,
                text: '交通',
                value: '交通',
                tag: <CarOutlined />,
                backgroundColor: "#09f"
            }
        ],                  //可供选择的搜索项
        curSearch: "",      //当前搜索的类
        city: "010",        //当前设置的城市，默认为当前定位所在
        keyword: "",        //搜索关键字
        search_flag: true,  //搜索区块搜索框功能切换
        searchListBox: 'panel',  //搜索列表展示盒子
    }

    componentDidMount() {
        this.initMap();
    }

    componentWillUnmount() {
        this.state.timerId && clearTimeout(this.state.timerId);
    }

    //初始化地图
    initMap() {
        AMapLoader.load({ //首次调用 load
            key: '66d85548fa61463f4daac625965e1e08',//首次load key为必填
            version: '2.0',
            plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.Driving', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.HawkEye', 'AMap.CitySearch', 'AMap.ControlBar'],
            viewMode: '3D', //开启3D视图,默认为关闭
            pitch: 75, // 地图俯仰角度，有效范围 0 度- 83 度
        }).then((AMap) => {
            this.map = new AMap.Map('container');
            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            this.map.addControl(new AMap.Scale())
            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            this.map.addControl(new AMap.MapType());
            //3d控件
            var controlBar = new AMap.ControlBar({
                position: {
                    right: '10px',
                    top: '140px'
                }
            });
            controlBar.addTo(this.map);
            //缩放控件
            var toolBar = new AMap.ToolBar({
                position: {
                    right: '40px',
                    top: '260px'
                }
            });
            toolBar.addTo(this.map);
            // 绑定事件
            this.map.on('click', this.clickHandler);
        }).catch((e) => {
            console.error(e);
        });

        //调用load
        this.manyMapLoad();
    }

    //清除覆盖物事件
    removeAllOverlay = () => {
        // 清除地图上所有添加的覆盖物
        this.map.clearMap();
    }

    //地图点击事件
    clickHandler = () => {
        this.setState({
            activeType: 'typeBox_block'
        })
    }

    //多次调用的load
    manyMapLoad = () => {
        AMapLoader.load({ //可多次调用load
            plugins: ['AMap.MapType']
        }).then((AMap) => {
            let { search_flag } = this.state;
            //搜索地址并设置经纬度
            let searchLngLat = (el, stateType) => () => {
                //监测标签
                var autoOptions = {
                    input: el
                };
                //清除上次图层
                this.removeAllOverlay();
                //清除搜索结果
                this.placeSearch && this.placeSearch.clear();
                //清除上次规划
                this.driving && this.driving.clear();
                //输入提示
                var auto = new AMap.AutoComplete(autoOptions);
                //构造地点查询类
                var placeSearch = new AMap.PlaceSearch({
                    map: this.map
                });
                let select = (e) => {
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name);  //关键字查询查询
                    //设置结束点的经纬度
                    this.setState({
                        [stateType]: [e.poi.location.lng, e.poi.location.lat]
                    });
                }
                //注册监听，当选中某条记录时会触发
                auto.on("select", select);
            }
            //搜索起始地点
            AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], searchLngLat('start_input', 'startLngLat'));
            //搜索终点地点
            AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], searchLngLat('end_input', 'endLngLat'));
            //搜索中心点设置
            !search_flag && AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], searchLngLat('searchBox_inp_input', 'searchLocation'));
            //搜索关键字
            AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], searchLngLat('keywordBox_inp', 'endLngLat'));

            // AMap.plugin(['AMap.CitySearch'], () => {
            //     let cityLocation = new AMap.CitySearch();
            //     cityLocation.getLocalCity((status,result)=>{
            //         console.log(result);
            //     })
            // });
        }).catch((e) => {
            console.error(e);
        });

    }

    //根据起点和终点规划行车路线
    Get_Directions = () => {
        let { startLngLat, endLngLat } = this.state;

        if (!startLngLat[0] && !endLngLat[0]) {
            return alert('请输入完整的起点和终点');
        }

        AMapLoader.load({ //可多次调用load
        }).then((AMap) => {
            //驾车路线导航绘制，根据起点，终点地名绘制路线
            AMap.plugin('AMap.Driving', () => {
                var drivingOption = {
                    // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                    policy: AMap.DrivingPolicy.LEAST_TIME,
                    //map为地图实例
                    map: this.map
                };
                //清除上次规划
                this.driving && this.driving.clear()
                //构造驾车导航类
                this.driving = new AMap.Driving(drivingOption);

                let button = document.getElementById('callApp');

                this.driving.search(startLngLat, endLngLat, (status, result) => {
                    // 未出错时，result即是对应的路线规划方案
                    button.onclick = function () {
                        this.driving.searchOnAMAP({
                            origin: result.origin,
                            destination: result.destination
                        });
                    }
                })

                if (AMap.UA.mobile) {
                    document.getElementsByClassName('info')[0].style.display = 'none';
                    button.style.fontSize = '16px';
                } else {
                    button.style.marginRight = '10px';
                }
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    //定位load
    location = () => {
        AMapLoader.load({ //可多次调用load
        }).then((AMap) => {
            this.map.addControl(new AMap.MapType());
            //清除上次图层
            this.removeAllOverlay();
            //清除搜索结果
            this.placeSearch && this.placeSearch.clear();
            //清除上次规划
            this.driving && this.driving.clear();
            //定位
            AMap.plugin(['AMap.Geolocation'], () => {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    showButton: false,//是否显示定位按钮
                    buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    markerOptions: {         //自定义定位点样式，同Marker的Options
                        'offset': new AMap.Pixel(-18, -36),
                        'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
                    },
                });
                this.map.addControl(geolocation);
                geolocation.getCurrentPosition((status, result) => {
                    if (status == 'complete') {
                        let { lng, lat } = result.position;
                        //设置自身当前经纬度
                        this.setState({
                            startLngLat: [lng, lat],
                            myLocation: [lng, lat],
                            searchLocation: [lng, lat]
                        })
                        onComplete(result)
                    } else {
                        onError(result)
                    }
                });
                //解析定位结果
                function onComplete(data) {
                    document.getElementById('status').innerHTML = '定位成功'
                    var str = [];
                    str.push('定位结果：' + data.position);
                    str.push('定位类别：' + data.location_type);
                    if (data.accuracy) {
                        str.push('精度：' + data.accuracy + ' 米');
                    }//如为IP精确定位结果则没有精度信息
                    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                    document.getElementById('result').innerHTML = str.join('<br>');
                }
                //解析定位错误信息
                function onError(data) {
                    document.getElementById('status').innerHTML = '定位失败'
                    document.getElementById('result').innerHTML = '失败原因排查信息:' + data.message;
                }
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    //点击定位当前位置
    clickLocation = () => {
        //调用定位load
        this.location();
        this.typeBoxClick('typeBox_block');
        //为结果弹窗添加类显示
        this.locator.className = 'active';
        this.setState({
            timerId: setTimeout(() => {
                //隐藏定位结果弹窗
                this.locator.className = '';
            }, 5000)
        })
    }

    //搜索
    searchNearbys = () => {
        AMapLoader.load({ //可多次调用load
        }).then((AMap) => {
            //清除上次图层
            this.removeAllOverlay();
            //搜索附近
            AMap.plugin(["AMap.PlaceSearch"], () => {
                let { curSearch, city, searchListBox } = this.state;
                //构造地点查询类
                this.placeSearch = new AMap.PlaceSearch({
                    type: curSearch, // 兴趣点类别
                    pageSize: 5, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    city: city, // 兴趣点城市
                    citylimit: true,  //是否强制限制在设置的城市内搜索
                    map: this.map, // 展现结果的地图实例
                    panel: searchListBox, // 结果列表将在此容器中进行展示。
                    autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });
                //中心点坐标,关键字
                let { searchLocation, keyword } = this.state;
                //判断什么搜索
                searchListBox === 'panel' ?
                    this.placeSearch.searchNearBy(keyword, searchLocation, 1000, function (status, result) {
                        console.log(status, result);
                    })
                    :
                    //关键字查询
                    this.placeSearch.search('北京大学');
                //事件监听
                AMap.Event.addListener(this.placeSearch, 'selectChanged', ({ selected: { data } }) => {
                    let { lng, lat } = data.entr_location ? data.entr_location : data.location;
                    //设置终点经纬度
                    this.setState({
                        endLngLat: [lng, lat]
                    })
                })
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    //点击切换搜索类型
    clickSearchType = (value) => {
        this.searInp.value = "";
        this.setState({
            curSearch: value
        }, this.searchNearbys)
    }

    //附近关键字搜索
    changeInp = (value) => {
        this.state.timerId && clearTimeout(this.state.timerId);

        this.setState({
            keyword: value,
            curSearch: "",
            city: "",
            timerId: setTimeout(this.searchNearbys, 1000)
        })
    }

    //关键字搜索
    keywordBoxInp = (value) => {
        this.state.timerId && clearTimeout(this.state.timerId);

        if (this.state.search_flag) {
            this.setState({
                keyword: value,
                timerId: setTimeout(this.searchNearbys, 1000)
            })
        }
    }

    //点击切换搜索
    swapClick = () => {
        this.searInp.value = "";

        this.setState({ search_flag: !this.state.search_flag }, this.manyMapLoad());
    }

    //是否进行自身定位
    isMyLocation = () => {
        //中心点坐标
        let { searchLocation } = this.state;
        //判断是否为默认位置
        if (searchLocation[0] === 116.397428 && searchLocation[1] === 39.90923) {
            //定位自身当前坐标
            this.location();
        }
    }

    //点击切换功能
    typeBoxClick = (value) => {
        this.setState({ activeType: value, keyword: "" });

        //清除搜索结果
        this.placeSearch && this.placeSearch.clear();

        switch (value) {
            case 'navigationBox_block':
                return;
            case 'searchBox_block':
                this.setState({
                    searchListBox: 'panel'
                });
                this.isMyLocation();
                return;
            case 'keywordBox_block':
                this.setState({
                    searchListBox: 'cateList'
                });
                return;
            case 'areaBox_block':
                return;
            default:
                return;
        }
    }

    render() {
        let { activeType, typeList, searchList, search_flag, keyword } = this.state;
        return (
            <div className="map">
                {/* 定位 --------------------------------------------------------------------------------------------------*/}
                <AimOutlined id='locationBox' onClick={this.clickLocation} />
                {/* 功能盒子 -------------------------------------------------------------*/}
                <div id={activeType === 'typeBox_block' ? activeType : ''} className="typeBox type">
                    <ArrowLeftOutlined id="goProject" onClick={() => window.location.href = "/projects"} />
                    {
                        typeList[0] && typeList.map(item => (
                            <span
                                onClick={() => this.typeBoxClick(item.class)}
                                key={item.id}
                                className="typeItem"
                            >
                                {item.typeText}
                            </span>
                        ))
                    }
                </div>
                {/* 起点终点输入组件，根据起点终点规划路线 ------------------------------------------------------------------*/}
                <div id={activeType === 'navigationBox_block' ? activeType : ''} className="mapLabel locationSearch">
                    <div className="startLocation">
                        <input
                            type="text"
                            id="start_input"
                            placeholder="请输入起始地名"
                        />
                    </div>
                    <div className="endLocation">
                        <input
                            type="text"
                            id="end_input"
                            placeholder="请输入终点地名"
                        />
                    </div>
                    <div className="buttonLocation" onClick={this.Get_Directions}>开始规划路线</div>
                </div>
                <button className="mapLabel" id="callApp"></button>
                {/* 搜索附近 ----------------------------------------------------------------------------------------------*/}
                <div id={activeType === 'searchBox_block' ? activeType : ''} className="mapLabel searchBox">
                    <div className="searchBox_inp">
                        <SendOutlined id="searchBox_inp_icon" />
                        <input
                            id="searchBox_inp_input"
                            type="text"
                            ref={searInp => this.searInp = searInp}
                            value={keyword}
                            onInput={(e) => this.changeInp(e.target.value)}
                            placeholder={search_flag ? "请输入搜索关键字" : "请输入要切换的地点"}
                        />
                        <SwapOutlined
                            id="searchBox_inp_Swap"
                            onClick={this.swapClick}
                        />
                    </div>
                    <div className="searchBox_type">
                        {
                            searchList[0] && searchList.map(item => (
                                <div
                                    className="searchItem"
                                    style={{ backgroundColor: item.backgroundColor }}
                                    key={item.id}
                                    onClick={() => this.clickSearchType(item.value)}
                                >
                                    <span className="searchItem_icon">{item.tag}</span>
                                    <span className="searchItem_text">{item.text}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div id="panel"></div>
                    <div className="searchBox_goSite" onClick={this.Get_Directions}>
                        <BranchesOutlined />去这里
                    </div>
                </div>
                {/* 关键字搜索 --------------------------------------------------------------------------------------------*/}
                <div id={activeType === 'keywordBox_block' ? activeType : ''} className="mapLabel keywordBox">
                    <div className="inp_box">
                        <input
                            type="text"
                            id="keywordBox_inp"
                            onInput={(e) => this.keywordBoxInp(e.target.value)}
                            value={keyword}
                            placeholder="请输入搜索关键字"
                        />
                    </div>
                    <div id="cateList"></div>
                </div>
                {/* 区域抓取 ----------------------------------------------------------------------------------------------*/}
                <div id={activeType === 'areaBox_block' ? activeType : ''} className="mapLabel areaBox">

                </div>
                {/* 定位结果弹窗 ------------------------------------------------------------------------------------------*/}
                <div id="locator" ref={c => this.locator = c}>
                    <div id="status"></div>
                    <div id="result"></div>
                </div>
                {/* 地图实例 ----------------------------------------------------------------------------------------------*/}
                <div id="container"></div>
            </div>
        )
    }
}

export default Map;
