const { Command } = require('discord.js-commando');
const math = require('mathjs')
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'maths',
            aliases: ['math'],
            group: 'group1',
            memberName: 'maths',
            description: 'DO YOUR MATHS',
            examples: ['1+1=2'],
            args: [
                {
                    key: 'text',
                    prompt: '',
                    type: 'string',
                    default : '1+1',
                  
                } 
                //,
               // { repeat in case of second arg
               //
               // }
            ]




        });
    }
    run(msg,{text}) {
        
        try{
        var answer2 = math.compile(text);
        var answer = answer2.eval();
        msg.channel.send(text+'\r\n= '+ answer);
        }
        catch(error){
            msg.channel.send('這不是正確的輸入');
        }
    }
};

