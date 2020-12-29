/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-12-06 10:26:22
 * @version $Id$
 */

var mysql = require('mysql');
var dbConfig = require('./db.config');

module.exports = {
  //查
  query : function (sql,callback){
    var connection = mysql.createConnection(dbConfig.database);
    connection.connect(function(err){
      if(err){
        console.log('数据库连接失败');
        throw err;
      }
    })
    connection.query(sql,function(err,results,fields){
      console.log(sql);
      if(err){
        console.log('数据操作失败');
        throw err;
      } else {    
        
        callback && callback(results);
      }
    })
   connection.end(function(err){
      if(err){
          console.log('关闭数据库连接失败！');
        }
      })
    },
  //增
  insert : function (sql,values,callback){
    var connection = mysql.createConnection(dbConfig.database);
    connection.connect(function(err){
      if(err){
        console.log('数据库连接失败');
        throw err;
      }
    })
    connection.query(sql,[values],function(err,results){
      if(err){
        console.log('数据操作失败');
        throw err;
      } else {
        console.log(results);
        callback && callback(results);
      }
    })
      connection.end(function(err){
      if(err){
          console.log('关闭数据库连接失败！');
        }
      })
    },
  //改
  updateData :(params,callback)=>{
    var connection = mysql.createConnection(dbConfig);
    connection.connection(function(err){
      if(err){
        console.log('数据库连接失败');
        throw err;
      }
    })
    var _SETS='';
    var _WHERE='';
    for (var k in sets){
      _SETS+=K+"="
    }
    for (var k2 in where){
      _WHERE+= k2+"="+where[k2];
    }

    var sql="UPDATE"+table +'SET'+_SETS+'WHERE'+_WHERE;
    console.log(sql);
    connection.query(sql,callback);
  },
  deleteData :(params,callback)=>{
    var _WHERE='';
    for(var k2 in where){
      _WHERE+=k2+"="+where[k2];
    }
    var sql="DELETE FROM"+table+'WHERE'+_WHERE;
    connection.query(sql,callback); 
  }
}