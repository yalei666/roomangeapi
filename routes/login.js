const qs = require('qs');
const db = require('./../db.js');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const config = require('./../db.config');
const fs = require('fs');
const userInfoTemplate = require('./../global/userInfo.js');
/* GET home page. */
router.post('/',(req,res,next)=> {
  const form = new formidable.IncomingForm();
  req.body = qs.stringify(req.body);
  form.parse(req,(err,fields,files)=>{
    console.log(fields);
    db.query('select * from userinfo where account = \"'+fields.account+'\"',row=>{
      console.log(row);
      let resData = {
        "resultCode":'0',
        "resultMsg":'登录出错返回信息1',
        "data" : {
          uid:'',
          token:''
        }
      };
      if(!row){
        console.log('账号不存在！')
        resData.resultCode = '-1';
        resData.resultMsg = '账号不存在';
      }
      else if(row[0].id&&row[0].password === fields.password){
        console.log('账号 密码正确');
        var token = jwt.sign({account:fields.account},config.secret,{
          expiresIn:10080
        });
        resData.data.token = 'Bearer' + token,
        resData.resultCode = '0';
        resData.resultMsg='登录成功';
        resData.data.uid = row[0].id;
      } else if(row[0].id&&row[0].password !==fields.password){
        console.log('账号存在，但是密码不正确')
        resData.resultCode = '-1';
        resData.resultMsg = '密码不正确!';
      }
      res.send(resData);
    });    
  })

});
/* POST login page. */
router.post('/reset', function(req, res, next) {
	const form = new formidable.IncomingForm({uploadDir:"./public/uploadimages",keepExtensions:true});
	form.parse(req,(err,fields,files)=>{
    console.log(files);
    console.log(files.touxiang.path);
    let obj = {id:0};
    let newname = new Date()*1+files.touxiang.name;
    let imgpath = {imgpath:"/api/uploadimages/"+newname};
    fs.rename(files.touxiang.path,"./public/uploadimages/"+newname,function(err){
      console.log(err);
    });
    fields = {
      ...obj,
      ...fields,
      ...imgpath,
    };
    let returndata = {
      resultmsg : '',
      resultcode : 1,
    }; 
    db.insert("INSERT INTO userinfo SET ? ",fields,row=>{
      if(row){
        returndata.resultmsg = '注册成功';
        res.send(returndata);
      }
    })
	})

});
/*GET Userinfo page*/
router.get('/getUserInfo',(req,res)=>{
  let resData = userInfoTemplate;
  let data = JSON.stringify(req.query.userId);
  db.query('select * from userinfo where id = '+data,row=>{
    let userData = row[0];    
    delete userData.password;
    //设置返回信息
    resData.resultMsg = "成功获取信息";    
    //设置用户基本信息
    resData.data.baseInfo = userData;
    //设置菜单权限信息
    resData.data.permissions = {
       "/index/seelifeCirel":true,
       "/index/personalInfo":true,
       "/bxxiangguan/baoxiu":true,
       "/form/edit":true,
       "/financialManage/financialAdd":userData.role!=='10012'?true:false,
       "/financialManage/financialUpdate":userData.role!=='10012'?true:false,
       "/user/userList": userData.role=='10010'?true:false,
    };
    res.send(resData);
  });
});
module.exports = router;