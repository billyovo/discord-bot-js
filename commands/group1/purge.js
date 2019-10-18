const { Command } = require('discord.js-commando');
module.exports = class purge extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: ['purify','fuckoff'],
            group: 'group1',
            memberName: 'purge',
            description: 'purify the channel',
            examples: ['-purge 100'],
            
            args: [
                {
                    key: 'text',
                    prompt:'How many messages to delete?\nSyntax: -purge (number of delete per time) (number of run)',
                    type: 'integer',
                } ,
                {
                    key: 'num',
                    prompt:'Run the delete how many times?',
                    default: '1',
                    type: 'integer',
                }
            ]
         
        });    
    }
//              ,arg below
    run(msg, { text,num }) {
        var i = 1;
        function purge(){
            msg.channel.bulkDelete(text)
            .catch(error => console.error)
        }
        if(msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')){
         while(num >= i){
           purge();
           i = i + 1;
            console.log('Successfully cleared '+text+' messages by '+msg.author.username );
         }  
        }
        else{
            msg.channel.send('你沒有清除訊息的權限');
        }
        
    }
};