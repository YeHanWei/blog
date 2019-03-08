


module.exports = {
  createIdAadTime: createIdAadTime,
  handleResult: handleResult
};

// 生成ID和time，并返回
function createIdAadTime() {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString();
  let day = date.getDate()<10?'0'+date.getDate().toString():date.getDate().toString();
  let hh = date.getHours()<10?'0'+date.getHours().toString():date.getHours().toString();
  let mm = date.getMinutes()<10?'0'+date.getMinutes().toString():date.getMinutes().toString();
  let ss = date.getSeconds()<10?'0'+date.getSeconds().toString():date.getSeconds().toString();

  let id = [year,month,day,hh,mm,ss].join('');
  let ymd = [year,month,day].join('-');
  let time = [year,month,day].join('-') + ' ' + [hh,mm,ss].join(':');

  return {id: id, date: ymd, time: time};
}

// 处理sequelize查询结果
function handleResult(rows) {
  let result = [];
  for(let i=0; i < rows.length; i++) {
    result.push(rows[i].dataValues)
  }
  return result;
}
