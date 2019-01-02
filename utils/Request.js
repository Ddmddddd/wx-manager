var util = require('util.js');
const app = getApp()
/**
 * URL for request
 */
const BASEURL = 'https://zjubiomedit.com/HypertensionService.svc/'
const validateUrl = BASEURL + 'ValidateRegister' 
const registUrl = BASEURL + 'WapRegistWithPatientInfo'
/**
 * 通用请求 
 */
export const request = ({ data = {}, url = '', method = 'GET' ,
header = {'content-type': 'application/json'}}) => {
   
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}

/** 
 * 身份核验请求
*/
export const validateRequest = (patientId, patientName) => {
    let header = {
        'content-type': 'application/json'
    }
    let url = validateUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "patientName": patientName
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none'
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none'
                    })
                }
                if (res.data.flag == (246 || 0)) {
                    wx.showToast({
                        title: '核验成功',
                        icon: 'success'
                    })
                    resolve({ flag: 246 })
                } else if (res.data.flag == 248) {
                    wx.showToast({
                        title: '该账号已存在' + res.data.flag,
                        icon: 'none'
                    })
                } else if (res.data.flag == 247){
                    wx.showToast({
                        title: '用户姓名不匹配' + res.data.flag,
                        icon: 'none'
                    })
                } else {
                    wx.showToast({
                        title: '异常' + res.data.flag,
                        icon: 'none'
                    })
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}
/**
 * 注册请求
 */
export const registWithInfo = (patientId, dataString) => {
    let header = {
        'content-type': 'application/json'
    }
    let url = registUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "info": dataString
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none'
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none'
                    })
                }
                if (res.data.flag == 0) {
                    wx.showToast({
                        title: '注册成功',
                        icon: 'success'
                    })
                    resolve({ flag: 0 })
                } else if (res.data.flag == 254) {
                    wx.showToast({
                        title: '注册失败' + res.data.flag,
                        icon: 'none'
                    })
                } else {
                    wx.showToast({
                        title: '异常' + res.data.flag,
                        icon: 'none'
                    })
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}
/** 
 * pages/index初始化或刷新，获取量表填写情况，上一次各项记录
 */
function Loadrequest() {
    let index = 4
    return Promise.all([DateRequest(1, 1),
    DateRequest(2, 2),
    DateRequest(3, 2),
    LastRequest(index),
    LastRequest(++index),
    LastRequest(++index),
    LastRequest(++index)]).then(req => {
        return req
    })

}

/**
 * 注册功能
 * 检查身份证号码 && 手机号码
 */
function validateID(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;
    var birthDate = ""
    if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    }
    //18位身份证
    if (code.length == 18) {
        var birthday = code.substr(6, 4) + '/' + Number(code.substr(10, 2)) + '/' + Number(code.substr(12, 2));
        birthDate = code.substr(6, 4) + '-' + code.substr(10, 2) + '-' + code.substr(12, 2);
        var d = new Date(birthday);
        var currentTime = new Date().getTime();
        var time = d.getTime();
        if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dxX]$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (time >= currentTime) {
            tip = "身份证号非法生日";
            pass = false;
        } else {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17].toUpperCase()) {
                tip = "身份证号校验位错误";
                pass = false;
            }
        }
    } else if (code.length == 15) {
        if (!code || !/^[1-9]\d{5}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }
        birthDate = '19' + code.substr(6, 2) + '-' + code.substr(8, 2) + '-' + code.substr(10, 2);
    } else {
        tip = "身份证号长度有误"
        pass = false;
    }
    if (!pass) console.log(tip);

    return {
        birthDate: birthDate,
        tip: tip,
        pass: pass
    }

}
function validatePhone(phone) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    return (reg.test(phone))
}

export const personInfoVali = (code, phone) => {
    return new Promise((resolve, reject) => {
        let id = validateID(code)
        let p = validatePhone(phone)
        if (!id.pass || !p) {
            wx.showToast({
                title: id.tip || '手机号输入有误',
                icon: 'none',
                duration: 1500
            })
            reject(id.tip)
        } else {
            resolve(id.birthDate)
        }
    })
}
