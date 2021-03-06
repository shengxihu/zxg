const checkPhone = val => {
    var patrn= /^1(3|4|5|6|7|8|9)\d{9}$/;   
    if (!patrn.exec(val)) {
        return false
    }
    return true
}
const checkName = val => {
    var patrn= /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
    if (!patrn.exec(val)) {
        return false
    }
    return true
}
const checkEmpty = val => {
    if (val == '' || val == ' ' || val == undefined || val == null) {
        return true
    }
    return false
}

//把时间从秒转换为年月日
const changeDate = val => {
    if(val){
        // console.log(typeof val)
        var val = parseInt(val) * 1000
        // console.log(typeof val)

        var date = new Date(val),Y,M,D;
        Y = date.getFullYear() + '.';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        D = date.getDate() + ' ';
        return Y+M+D
    }else{
        var date = new Date();
        Y = date.getFullYear() + '.';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        D = date.getDate() + ' ';
        return Y+M+D
    }
}

const changeType = val => {
    // console.log(typeof type)
    //4油漆工 5泥瓦工 6水电工 7木工
    switch(val){
        case "1":
            return "项目经理";
            break;
        case "2":
            return "物业公司";
            break;
        case "3":
            return "业主";
            break;
        case "4":
            return "油漆工";
            break;
        case "5":
            return "泥瓦工";
            break;
        case "6":
            return "水电工";
            break;
        case "7":
            return "木工";
            break;
    }
}

const changeType2Number = val => {
     switch(val){
        case "油漆工":
            return "4";
            break;
        case "泥瓦工":
            return "5";
            break;
        case "水电工":
            return "6";
            break;
        case "木工":
            return "7";
            break;
    }

}
// const timer = (val, fn) => {
//     if()
//     var clock = setTimeout(fn, val)
//     return clock
// }


const changeRate2Number = val =>{
    if(val instanceof Array){
        for(let i =0,length = val.length;i < length;i++){
            val[i].worker_average_rate = parseFloat(val[i].worker_average_rate)
        }
        return val
    }
}

const parseUrl = () => {
    String.prototype.parseURL = function(){
        var url =this.toString()
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/'),
            params: (function() {
                var ret = {};
                var seg = a.search.replace(/^\?/, '').split('&').filter(function(v,i){
                    if (v!==''&&v.indexOf('=')) {
                        return true;
                    }
                });
                seg.forEach( function(element, index) {
                    var idx = element.indexOf('=');
                    var key = element.substring(0, idx);
                    var val = element.substring(idx+1);
                    ret[key] = val;
                });
                return ret;
            })()
        };
    }
}
export {
	checkPhone,
    checkName,
    checkEmpty,
    changeDate,
    changeType,
    changeType2Number,
    changeRate2Number,
    parseUrl
}
