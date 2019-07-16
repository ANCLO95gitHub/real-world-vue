console.log('DEBUT  connect');
const sql = require('mssql');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const config = {
  user: 'andrec',
  password: 'Bonjour1',
  server: 'tcp:srv-lrobo-sql-cloud.database.windows.net,1433;Initial Catalog=LR_INV_CLOUD;Persist Security Info=False;User ID={andrec};Password={Bonjour1};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;',
  driver: 'tedious',
  database: 'LR_INV_CLOUD',
  options: {
    instanceName: 'sql'
  }
}
// You can use 'localhost\\instance' to connect to named instance
// server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
// server: 'tcp:srv-lrobo-sql-cloud.database.windows.net,1433;Initial Catalog=LR_INV_CLOUD;Persist Security Info=False;User ID={andrec};Password={Bonjour1};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;',
// server: 'Driver={ODBC Driver 13 for SQL Server};Server=tcp:srv-lrobo-sql-cloud.database.windows.net,1433;Database=LR_INV_CLOUD;Uid=andrec@srv-lrobo-sql-cloud;Pwd=Bonjour1;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;',

// const config2 ='mssql//:srv-lrobo-sql-cloud.database.windows.net,1433;Initial Catalog=LR_INV_CLOUD;Persist Security Info=False;User ID={andrec};Password={Bonjour1};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;';

const config3 =
{
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
let connection = new Connection(config3);
// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
{
  if (err)
  {
    console.log(err)
  }
  else
  {
    queryDatabase()
  }
}
);
console.log('apres  connection.on');

/*
(async function()  {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    // await sql.connect('mssql://username:password@localhost/database')
    // 'mssql://andrec:Bonjour1@https://lrmarketplace.azurewebsites.net/srv-lrobo-sql-cloud/LR_INV_CLOUD?encrypt=true'
    console.log('avant await sql.connect');
    await sql.connect(config3)
    const result = await sql.query`select * from [dbo].[SelecteurInventaire] where id < 3085`;
    console.log(result);
  } catch (err) {
    // ... error checks
    console.log('error connect err=' + err);
  }

})()
sql.on('error', err => {
  // ... error handler
  console.log('.. error handler');
})
*/


function queryDatabase()
{
  console.log('Reading rows from the Table...');

  // Read all rows from table
  var request = new Request("select * from PoidsMetaux",
    // eslint-disable-next-line no-unused-vars
    function(err, rowCount, rows)
    {
      console.log(rowCount + ' row(s) returned');
      process.exit();
    }
  );

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });
  connection.execSql(request);
}


console.log('FIN  connect');
