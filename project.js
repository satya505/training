const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
require('dotenv').config();
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    server.route({
        method:"GET",
        path:"/api/producers",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query('SELECT * from producers', function (error, produce, fields) {
                    if (error) reject(error);
                    resolve(produce);
                  });
                   
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"POST",
        path:"/api/producers",
        handler:(request,reply)=>{
            newData=request.payload;
            pname=request.payload.pname;
            email=request.payload.email;
            twitter_name=request.payload.twitter_name;
            scloudname=request.payload.scloudname;

            if(pname.length>=32)
            return "producer name must be less than 32 characters";
        else if(pname.includes("XxXxStr8FireexXxX")==true)
            return "producer name can't contain text like XxXxStr8FireexXxX";
      else if(email.length>=256)
        return "email must be less than 252 characters";
      else if((email.includes("@gmail.com")==false) && (email.includes("@yahoo.com")==false))
         return "email must be valid";
      else if(twitter_name.length>16)
         return "twitter name must be less than 16 characters";
         else if(scloudname.length>32)
         return "sound cloud name must be less than 32 characters";
         else
         {
              return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
                connection.query(`insert into producers(pname,email,password,twitter_name,scloudname,pstatus)values('${newData.pname}','${newData.email}','${newData.password}','${newData.twitter_name}','${newData.scloudname}','${newData.pstatus}')`, function (error, produce, fields) {
                    if (error) reject(error);
                    resolve(produce);
                  });
                   
                  connection.end();
                
            })
        } 
        }
    })


    server.route({
        method:"GET",
        path:"/api/producers/{id}",
        handler:(request,reply)=>{
           
            return new Promise((resolve,reject)=>{
                var pid=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.query(`
            select * from producers
            WHERE pid=${pid}
          `, 
            function (error, produce, fields) {
            if (error) reject(error);
            resolve(produce);
          });
           
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"DELETE",
        path:"/api/producers/{id}",
        handler:(request,reply)=>{
           
            return new Promise((resolve,reject)=>{
                var pid=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.query(`
            delete from producers
            WHERE pid=${pid}
          `, 
            function (error, produce, fields) {
            if (error) reject(error);
            resolve(produce);
          });
           
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"PUT",
        path:"/api/producers/{id}",
        handler:(request,reply)=>{
            var id=request.params.id;
            newData=request.payload;
            pname=request.payload.pname;
            email=request.payload.email;
            twitter_name=request.payload.twitter_name;
            scloudname=request.payload.scloudname;

            if(pname.length>=32)
            return "producer name must be less than 32 characters";
        else if(pname.includes("XxXxStr8FireexXxX")==true)
            return "producer name can't contain text like XxXxStr8FireexXxX";
      else if(email.length>=256)
        return "email must be less than 252 characters";
      else if((email.includes("@gmail.com")==false) && (email.includes("@yahoo.com")==false))
         return "email must be valid";
      else if(twitter_name.length>16)
         return "twitter name must be less than 16 characters";
         else if(scloudname.length>32)
         return "sound cloud name must be less than 32 characters";
         else
         {
              return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
                  connection.query(`
                  UPDATE producers
                  SET pname='${newData.pname}',
                      email='${newData.email}',
                      twitter_name='${newData.twitter_name}',
                      scloudname='${newData.scloudname}',
                      pstatus='${newData.pstatus}'
                  WHERE pid=${id}
                `, 
                  function (error, books, fields) {
                  if (error) rject(error);
                  resolve(books);
                });
                   
                  connection.end();
                
            })
        } 
        }
    })

    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();