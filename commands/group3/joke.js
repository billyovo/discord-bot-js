const { Command } = require('discord.js-commando');
const request = require('request');
module.exports = class ListOfCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'joke',
            group: 'group3',
            memberName: 'joke',
            description: 'a joke',
            examples: ['-joke'],
            throttling: {
                usages: 1,
                duration: 3
            },
        });
    }
    run(msg) {
        request.get('https://api.yomomma.info/', {
        }, function(error, response, body) {
            if(!error){
                try{
                    var joke = JSON.parse(body);
                    msg.channel.send(joke["joke"]);
                }
                catch(error){
                    msg.channel.send('一個錯誤發生了');
                }
            }
        })

    }
}