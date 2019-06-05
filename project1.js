const Hapi = require('@hapi/hapi');
var books=[
    {
        id:1,
        name:'Kashish',
        age:24
    },
    {
        id:2,
        name:'Shubham',
        age:21
    }
]

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return books;
        }
    });
    server.route({
        method: 'post',
        path:'/',
        handler: (request, h) => {
            var newBook=request.payload;
            books.push(newBook);
            return books;
        }
    });
    /*server.route({
        method: 'put',
        path:'/{id}',
        handler: (request, h) => {
            var id=request.params.id;
            var newName=request.payload.name;
            var bookToBeUpdated=books.filter((book)=>{
                return book.id==id;
            })
            bookToBeUpdated[0].name=newName;
            return bookToBeUpdated;
        }
    });*/
    server.route({
        method: 'GET',
        path: '/producers/{pid}',
        handler: function (request, reply) {
        const pid = request.params.pid;
     
        connection.query('SELECT *  FROM producers WHERE pid = "' + pid + '"',
        function (error, results, fields) {
           if (error) throw error;
     
           reply(results);
        });
        },



     server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();