var express = require('express');
var dl  = require('delivery');
var fs  = require('fs');
var path = require('path');
// var serveIndex = require('serve-index');
var emoji = require('node-emoji');
var format = function (code, name) {
  return '<img alt="' + code + '" src="/public/img/apple40/' + name + '.png" />';
};
var usernames={};
datainfo="";	
	app = express(),
	
	//app.use('/rootdata',express.static(__dirname+"/images"));
	app.use('/public', express.static(path.join(__dirname + '/public')));
	// app.use('/public', serveIndex(path.join(__dirname, '/public')));
	// app.use('/public', express.static(__dirname + "/public"));
	//app.use('/emojidata',express.static(__dirname+"/jqueryemoji-master/img/emojione/"));
	
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	server.listen(3000);
	app.get('/',function(req,res){
		res.sendfile(__dirname+'/chat.html');
	});
	io.sockets.on('connection',function(socket){
		// new user enter in chat
		socket.on('adduser', function(username){
        socket.username = username;
        usernames[username] = socket.id;
        console.log(username+' has connected to the server');
        io.sockets.emit('friend',username);
        io.sockets.socket(usernames[username]).emit("friends",usernames);
        //socket.broadcast.emit('friend', username);

        // end of new user chat
    		});

		socket.on('send_user',function(data){
			io.sockets.socket(usernames[data.to]).emit("type_user",data);
		});	
		socket.on('nosend_user',function(data){
			io.sockets.socket(usernames[data.to]).emit("notype_user",data);
		});
		socket.on('send_message',function(data){
			message_data=emoji.emojify(data.message, null, format);
			console.log(message_data);
			data1={
				"from" :data.from,
				"to":data.to,
				"message":message_data
			};	
			io.sockets.socket(usernames[data.from]).emit("new message",data1);
			io.sockets.socket(usernames[data.to]).emit("new message",data1);
			// io.sockets.emit("new message",socket.username,data);
			// io.sockets.emit('new message',data);
		});

		var delivery = dl.listen(socket);
  		delivery.on('receive.success',function(file,info){
    		
    		datainfo=file.params;
    		buf=file.buffer;

    		// socket.emit('image', { image: true, buffer: buf.toString('base64') });
    		io.sockets.socket(usernames[datainfo.to]).emit("image", { image: true, buffer: buf.toString('base64') ,datainfo });
    		io.sockets.socket(usernames[datainfo.from]).emit("image", { image: true, buffer: buf.toString('base64') ,datainfo });
 			console.log(datainfo);




    		// code if you want to store file in directory
    	// 	 fs.writeFile(file.name,file.buffer, function(err,buf){
    			
     //  		if(err){
     //    		console.log('File could not be saved.');
     //  		}else{
     //    		console.log('File saved.');
     //  		};
    	// });

  });

	});

