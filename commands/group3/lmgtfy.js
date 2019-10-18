const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lmgtfy',
            group: 'group3',
            memberName: 'lmgtfy',
            description: 'let me google that for you',
            examples: ['-lmgtfy facebook'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [
                {
                    key: 'text',
                    prompt: '',
                    type: 'string',
                    default : '',
                  
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
        var link = 'http://lmgtfy.com/?q='+text;
        if(text==''){
            msg.channel.send('請提供搜尋字眼');
        }
        else{
            const embed = new Discord.RichEmbed()
            .setTitle('我幫你找到答案了喔!')
            .addField("\u200b","[請按這裡查看你的答案]("+link+")")
            .setColor('228B22')
            .setTimestamp(new Date);  
            msg.channel.send({embed});
        }
    }
};