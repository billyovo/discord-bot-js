const { Command } = require('discord.js-commando');
const request = require('request');
module.exports = class ListOfCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'catfact',
            group: 'group3',
            memberName: 'catfact',
            description: 'catfact',
            examples: ['-catfact'],
            throttling: {
                usages: 1,
                duration: 3
            },
        });
    }
    run(msg) {
        request.get('https://catfact.ninja/fact', {
        }, function(error, response, body) {
            if(!error){
                try{
                    var fact = JSON.parse(body);
                    msg.channel.send(fact["fact"]);
                }
                catch(error){
                    msg.channel.send('一個錯誤發生了');
                }
            }
        })

    }
}