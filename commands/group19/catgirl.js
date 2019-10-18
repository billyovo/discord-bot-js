const { Command } = require('discord.js-commando');
const request = require('request');
const website = 'https://nekos.moe/image/';
const Discord = require('discord.js');

module.exports = class catgirl extends Command {
    constructor(client) {
        super(client, {
            name: 'catgirl',
            aliases: ['catgirls','貓娘'],
            group: 'group19',
            memberName: 'catgirl',
            description: 'CATGIRL',
            examples: ['CATGIRL CATGIRL CATGIRL'],
            throttling:{
                usages : 1,
                duration : 3
            },
            args: [
                {
                    key: 'choice',
                    prompt:'?',
                    type: 'string',
                    default : '',
                } 
   
            ]
        });
    }
    run(msg,{choice}) {
        var web = 'https://nekos.moe/api/v1/random/image?count=1&nsfw=false';
        if(choice=='yes'||choice=='y'){
            if(!msg.channel.nsfw){
                msg.channel.send('請步行至老司機指令頻道再開車!');
                return;
            }
            else{
            web = 'https://nekos.moe/api/v1/random/image?count=1&nsfw=true';
            }
        }

      msg.channel.send('正在自家培育貓娘')
      .then((message)=>{
        request.get(web, {
        }, function(error, response, body) {
            if(!error){
            response = JSON.stringify(response);
            response = JSON.parse(response);
            response = JSON.parse(response.body);
            const embed = new Discord.RichEmbed()
                .setImage(website+response.images[0].id)
                .setColor('36393E');
                message.edit('你要求的貓娘來了囉!');
                msg.channel.send({embed});
                
            }
            else{
                message.edit('抱歉找不到可愛的貓娘...');
            }    
            
        }) 
      })
         
    
    }
    
};

