//'use strict';
let sql = require('mssql');
const Connection = require('tedious').Connection;  // ac: de Quick.js
const Request2 = require('tedious').Request;
// const TYPES = require('tedious').TYPES;

/// ac: de Quici.js
const config3 = {
  authentication: {
    options: {
      userName: 'andrec', // update me
      password: 'Bonjour1', // update me
      port: 1433
    },
    type: 'default'
  },
  server: 'srv-lrobo-sql-cloud.database.windows.net',
  options: {
    database: 'LR_INV_CLOUD', //update me
    encrypt: true
  }
};



exports.getInventaire = function (req, res) {
  res.header("content-type: application/json");
  console.log('getInventaire - Recherche de tous les objets en inventaire');
  let id = 3105; //req.params.id;
  console.log('getInventaire - Recherche document  inventaire: ' + id);
  if( !( id >=0 )){
    id=3105;  // ac: reviser
  }
  console.log('getInventaire -  apres if');
  ///res.writeHead(200, { 'Content-Type': 'text/html' });
  //res.send("Recherche de tous les formDuMetail");
  //return res.end();
  // connect to your database
  //sql.close();
  res.send("allo")
  console.log('getInventaire -  apres send allo');
  return;
  let requestForme = new sql.Request();
  //requestForme.query('select ID, DynaStamp, ExID, Forme, Diminutif from x0016769_Forme where ID=2 AND ExID= ' + id, function (err, recordset) {
  requestForme.query(
    'select DISTINCT * from SelecteurInventaire where ID <= ' +
      id +
      " AND DiminutifForme <> 'PL' ",
    function(err, recordset) {
      console.log('requestNomen err=' + err)
      if (err) {
        console.log('query failed! err=' + err)
        return
      }
      console.log('JSON.stringify(recordset)')
      //console.log(recordset.recordset);
      ///res.json(recordset.recordset);
      ////res.send(recordset.recordset);
      return res.json({ status: true, InvenDet: recordset.recordset })

    //sql.close();
  });

  console.log('FIN:::   getInventaire - Recherche de tous les inventaire');
};
