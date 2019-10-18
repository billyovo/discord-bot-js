const { Command } = require('discord.js-commando');
module.exports = class setactiv extends Command {
    constructor(client) {
        super(client, {
            name: 'set',
            
            group: 'group1',
            memberName: 'set',
            description: 'set activity',
            examples: ['-set args'],
            throttling: {
                usages: 5,
                duration: 10
            },
            args: [
                {
                    key: 'text',
                    prompt: '-set setactivity',
                    type: 'string',
                    default : '堆積成山的貓貓狗狗',
                    
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
        if(this.client.isOwner(msg.author.id)){
        msg.channel.send('正在玩'+text+'\nPlaying '+text);
        this.client.user.setActivity(text);
        }
        else
        {
            msg.reply('這個也是大人的秘密');
        }
        
    }
};