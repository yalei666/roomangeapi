/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-12-23 15:31:55
 * @version $Id$
 */

let userInfo = {
  "resultCode" : "0",
  "resultMsg" : "获取信息出错信息2",
  "data" : {
      "baseInfo":{
        "role":"10012",
        "token": "aabbccdd",

        "account":"81438234@qq.com",
        "nickname": "楚乔",
        "trueName": "LSS",
        "sex": "woman",
        "email":"81438234@qq.com",
        "introduction": "我的外号叫小六，呵呵。我的爱好是：吃饭睡觉打豆豆。",

        "uid": "236e3402dbab51ea17f9f6f360993233",       
      },
      "permissions" : {
              "/index/readme":true,
              "/index/personalInfo":true,
              "/example/tableList":true,
              "/movie/newMovie":true,
              "/bxxiangguan/baoxiu":true,
                  "/errorpage/401":false,
                  "/errorpage/404":false,      
      }
  }
}
module.exports = userInfo;