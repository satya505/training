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
        path:"/api/beats",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query('SELECT * from beats', function (error, produce, fields) {
                    if (error) reject(error);
                    resolve(produce);
                  });
                   
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"POST",
        path:"/api/beats",
        handler:(request,reply)=>{
            bname=request.payload.bname;
            burl=request.payload.burl;
            approved=request.payload.approved;
            sub_date=request.payload.sub_date;
            app_date=request.payload.app_date;
            post_date=request.payload.post_date;
            pro_id=request.payload.pro_id;
            if(bname.length>=64)
            return "beat name must be less than 32 characters";
        else if(bname.includes("must listen")==true)
            return "beat name can't contain text must listen";
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
                connection.query(`insert into beats(bname,burl, approved,sub_date,app_date, post_date,pro_id)values('${bname}','${burl}','${approved}','${sub_date}','${app_date}','${post_date}','${pro_id}')`, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
                
            })
        } 
        }
    })


    server.route({
        method:"GET",
        path:"/api/producers/{id}/approvedbeats",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var id=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`SELECT bname,app_date,post_date from beats where pro_id=${id} and approved=1`, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"GET",
        path:"/api/producers/{id}/submitedbeats",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var id=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`SELECT pname,bname from producers p inner join beats b on p.pid=b.pro_id where pid=${id}`, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"GET",
        path:"/api/beats/submitedNotapvd",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var id=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`SELECT * from beats where approved=0`, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
            })
            
        }
    })

    server.route({
        method:"GET",
        path:"/api/beats/approved/{startdate}/{enddate}",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var startdate=request.params.startdate;
                var enddate=request.params.enddate;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`SELECT * from beats where post_date > '${startdate}' and post_date < '${enddate}' `, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
            })
            
        }
    })


    
    server.route({
        method:"GET",
        path:"/api/beats/posted/{startdate}",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var startdate=request.params.startdate;
                var enddate=request.params.enddate;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`SELECT * from beats where post_date > '${startdate}' and post_date < current_date and approved=1 `, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
            })
            
        }
    })
     
    server.route({
        method:"GET",
        path:"/api/beats/pending",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`SELECT * from beats where app_date=0000-00-00  and approved=1`, function (error, beat, fields) {
                    if (error) reject(error);
                    resolve(beat);
                  });
                   
                  connection.end();
            })
            
        }
    })
     
    server.route({
        method:"GET",
        path:"/api/beats/{id}",
        handler:(request,reply)=>{
           
            return new Promise((resolve,reject)=>{
                var bid=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.query(`
            select * from beats
            WHERE bid=${bid}
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
        path:"/api/beats/{id}",
        handler:(request,reply)=>{
           
            return new Promise((resolve,reject)=>{
                var bid=request.params.id;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.query(`
            delete from beats
            WHERE bid=${bid}
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
        path:"/api/beats/{id}",
        handler:(request,reply)=>{
            var bid=request.params.id;
            bname=request.payload.bname;
            burl=request.payload.burl;
            approved=request.payload.approved;
            sub_date=request.payload.sub_date;
            app_date=request.payload.app_date;
            post_date=request.payload.post_date;
            //pro_id=request.payload.pro_id;
            if(bname.length>=64)
            return "beat name must be less than 32 characters";
        else if(bname.includes("must listen")==true)
            return "beat name can't contain text must listen";
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
                  UPDATE beats
                  SET bname='${bname}',
                      burl='${burl}',
                      approved='${approved}',
                      sub_date='${sub_date}',
                      app_date='${app_date}',
                      post_date='${post_date}'
                  WHERE bid=${bid}
                `, 
                  function (error, books, fields) {
                  if (error) reject(error);
                  resolve(books);
                });
                   
                  connection.end();
                
            })
        } 
        }
    })

    server.route({
        method:"PUT",
        path:"/api/beats/{id}/approve",
        handler:(request,reply)=>{
           
            return new Promise((resolve,reject)=>{
                var bid=request.params.id;
                //approved=request.payload.approved;
                app_date=request.payload.app_date;
                post_date=request.payload.post_date;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.query(`
            update beats set
             approved=1,
             app_date='${app_date}',
             post_date='${post_date}'
             WHERE bid=${bid}
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
        path:"/api/beats/{id}/unapprove",
        handler:(request,reply)=>{
           
            return new Promise((resolve,reject)=>{
                var bid=request.params.id;
                approved=request.payload.approved;
                app_date=request.payload.app_date;
                post_date=request.payload.post_date;
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.query(`
            update beats set
             approved=0,
             app_date="null",
             post_date="null"
             WHERE bid=${bid}
          `, 
            function (error, produce, fields) {
            if (error) reject(error);
            resolve(produce);
          });
           
                  connection.end();
            })
            
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