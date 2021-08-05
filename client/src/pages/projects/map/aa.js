/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-04 20:53:04
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-04 20:53:11
 */
 //行政区块
 get = () => {
    var district = null;
    var polygons = [];
    function drawBounds() {
        //加载行政区划插件
        if (!district) {
            //实例化DistrictSearch
            var opts = {
                subdistrict: 0,   //获取边界不需要返回下级行政区
                extensions: 'all',  //返回行政区边界坐标组等具体信息
                level: 'district'  //查询行政级别为 市
            };
            district = new AMap.DistrictSearch(opts);
        }
        //行政区查询
        district.setLevel(document.getElementById('level').value)
        district.search(document.getElementById('district').value, function (status, result) {
            map.remove(polygons)//清除上次结果
            polygons = [];
            var bounds = result.districtList[0].boundaries;
            if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    var polygon = new AMap.Polygon({
                        strokeWeight: 1,
                        path: bounds[i],
                        fillOpacity: 0.4,
                        fillColor: '#80d8ff',
                        strokeColor: '#0091ea'
                    });
                    polygons.push(polygon);
                }
            }
            map.add(polygons)
            map.setFitView(polygons);//视口自适应
        });
    }
    drawBounds();
    // document.getElementById('draw').onclick = drawBounds;
    // document.getElementById('district').onkeydown = function(e) {
    //     if (e.keyCode === 13) {
    //         drawBounds();
    //         return false;
    //     }
    //     return true;
    // };
}