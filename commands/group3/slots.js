const { Command } = require('discord.js-commando');
module.exports = class Slots extends Command {
    constructor(client) {
        super(client, {
            name: 'slot',
            aliases: ['slots'],
            group: 'group3',
            memberName: 'slots',
            description: 'play slots',
            examples: ['-slots'],
            throttling: {
                usages: 2,
                duration: 10
            }
            
                
        });    
    }
//              ,arg below
    run(msg) {
        function genoutput(){
            var emotes = [':seven:',':apple:',':pear:',':tangerine:',':lemon:',':grapes:'];
            var output = '';
            output = emotes[Math.floor((Math.random() * emotes.length))];
            output = output+':'+emotes[Math.floor((Math.random() * emotes.length))];
            output = output+':'+emotes[Math.floor((Math.random() * emotes.length))];
            return output
        }
        msg.channel.send('--------------\r\n\r\n'+genoutput()+'\r\n\r\n'+genoutput()+'   **<**\r\n\r\n'+genoutput()+'\r\n\r\n--------------')
        .then((message)=>{
            message.edit('--------------\r\n\r\n'+genoutput()+'\r\n\r\n'+genoutput()+'   **<**\r\n\r\n'+genoutput()+'\r\n\r\n--------------')
            .then((message)=>{
                message.edit('--------------\r\n\r\n'+genoutput()+'\r\n\r\n'+genoutput()+'   **<**\r\n\r\n'+genoutput()+'\r\n\r\n--------------');
            })
        })
}
}