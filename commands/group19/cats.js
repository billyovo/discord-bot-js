const { Command } = require('discord.js-commando');
const api = 'http://random.cat/meow';
const request = require('request');
module.exports = class cats extends Command {
    constructor(client) {
        super(client, {
            name: 'cats',
            aliases: ['cat','貓'],
            group: 'group19',
            memberName: 'cats',
            description: 'CATS',
            examples: ['CATS CATS CATS'],
            throttling:{
                usages : 2,
                duration : 20
            },
        });
    }
    run(msg) {
        msg.channel.send('正在周遊各國為你找尋最棒的貓')
        .then((message)=>{
         request.get('http://thecatapi.com/api/images/get?format=src', {
        }, function(error, response, body) {
            if(!error){
                msg.channel.send(response.request.uri.href);
                console.log(msg.author.username+' gets a random cat');
                message.edit('是貓!!');
            }
            else{
                message.edit('抱歉找不到可愛的貓咪...');
            }
                
        })
    })
}

};



