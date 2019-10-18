const { Command } = require('discord.js-commando');
const request = require('request');
module.exports = class ListOfCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'fortune',
            group: 'group3',
            memberName: 'fortune',
            description: 'fortune',
            examples: ['-fortune'],
            throttling: {
                usages: 1,
                duration: 3
            },
        });
    }
    run(msg) {
        request.get('http://yerkee.com/api/fortune', {
        }, function(error, response, body) {
            if(!error){
                try{
                    var fact = JSON.parse(body);
                    msg.channel.send(fact["fortune"]);
                }
                catch(error){
                    msg.channel.send('一個錯誤發生了');
                }
            }
        })

    }
}