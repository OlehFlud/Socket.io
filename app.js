const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const db = require('./dataBase').getInstance();
db.setModels();

app.use(express.json());
app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended:true}));

app.engine('hbs', expHbs({
    defaultLayout: null,
}));

app.set('view engine','.hbs');
app.set('views',path.join(__dirname,'static'));


io.on('connection', socket =>{

    socket.on('message',data =>{
        console.log(data);

        io.emit('respMessage',{id: socket.id ,data});
    });

    socket.on('msg',data =>{
        console.log(data);
        io.to(data.room_id).emit('msg_resp', {id: socket.id, data: data.data});
    });

    socket.on('joinRoom',data =>{
        console.log(data);
        socket.join(data.room_id);

    })

});

let { usersRouter, authRouter,housesRouter } = require('./router');
app.get('/support', (req,res) => {res.render('support')});
app.use('/user',usersRouter);
app.use('/auth',authRouter);
app.use('/house',housesRouter);

app.all('*',(req,res)=>{
    res.json('404 NOT FOUND' );
});

http.listen(3000,()=>{
    console.log('3000');
});

