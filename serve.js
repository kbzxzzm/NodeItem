const express = require("express");
const mysql = require("mysql");
let APP = express();

const con = mysql.createConnection({
  host: "localhost", //主机名
  user: "root",
  password: "root",
  port: "3306", //端口号
  database: "blog" //数据库名
});

APP.get("/get", (req, res) => {
  let { id } = req.query; //按照id返回数据
  let sql = `select * from user where id=${id}`;
  con.query(sql, (err, result) => {
    console.log(result);
    let newobj = { ...result[0] };
    newobj.state = 200;
    console.log(newobj);
    res.header("Access-Control-Allow-Origin", "*"); //解决跨越问题
    res.send(newobj);
  });
});

APP.get("/getmore", (req, res) => {
  let sql = "select * from user "; //  /getmore返回user全部数据
  con.query(sql, (err, result) => {
    let newobj = { ...result };
    newobj.state = 200; 
    res.header("Access-Control-Allow-Origin", "*"); //解决跨越问题
    res.send(newobj);
  });
});

let sql = "select * from user";
con.query(sql, (err, result) => {
  console.log(result);//服务端口返回数据
});

// con.end(); //关闭连接
APP.listen(8888, () => {
  console.log("监听成功");
});
