const { Command } = require('discord.js-commando');
const api = 'http://random.cat/meow';
const request = require('request');
module.exports = class dogs extends Command {
    constructor(client) {
        super(client, {
            name: 'dogs',
            aliases: ['dog','狗'],
            group: 'group19',
            memberName: 'dogs',
            description: 'DOGS',
            examples: ['dogs'],
            throttling:{
                usages : 2,
                duration : 20
            },
        });
    }
    run(msg) {
        msg.channel.send('正在周遊各國為你找尋最棒的狗');
         request.get('https://random.dog/woof.json', {
        }, function(error, response, body) {
            if(!error){
                var info = JSON.parse(body);
                msg.channel.send(info.url);
                console.log(msg.author.username+' gets a random dog');
            }
            else{
                msg.channel.send('抱歉找不到可愛的狗狗...');
            }
                
        })
    }
};
