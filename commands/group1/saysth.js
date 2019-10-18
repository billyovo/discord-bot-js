const { Command } = require('discord.js-commando');
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['講'],
            group: 'group1',
            memberName: 'say',
            description: '讓我說點東西',
            examples: ['-say 嗨朋友'],
            throttling: {
                usages: 5,
                duration: 10
            },
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string',
                    default : '連個指令都不會用 -say 這兒打東西啦',
                  
                } 
                //,
               // { repeat in case of second arg
               //
               // }
            ]
        });    
    }
//              ,arg below
    run(msg, { text }) {
        if(this.client.isOwner(msg.author)){
        msg.delete();
        return msg.channel.send(text);
        }
        else{
            msg.say('對不起這個指令是大人的秘密');
        }
        
    }
};