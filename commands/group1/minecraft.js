const { Command } = require('discord.js-commando');
const request = require('request');
const Discord = require('discord.js');
module.exports = class minecraft extends Command {
    constructor(client) {
        super(client, {
            name: 'minecraft',
            aliases: ['mc'],
            group: 'group1',
            memberName: 'mc',
            description: 'MC',
            examples: ['MC'],
        });
    }
    run(msg) {
        
        function getdata(){
            var i,j;
         request.get('https://status.mojang.com/check', {
        }, function(error, response, body) {
            if(!error){
                
                var forsend = body.replace(/green/gi, "正常");
                forsend = forsend.replace(/yellow/gi, "出現了問題");
                forsend = forsend.replace(/red/gi, "死亡");
                forsend = JSON.parse(forsend);
           
                const embed = new Discord.RichEmbed()
                .setTitle("minecraft的上線狀態")
                .setColor(0x00AE86)
                .setURL("https://status.mojang.com/check")
                .setTimestamp(new Date)
                .addBlankField(true);
              //  .addField(forsend);
                for(i in forsend){
                    for(var j in forsend[i]){
                    //embed.addField(map1[i]);
                    embed.addField(j,forsend[i][j],true);
              
                    }
                }
                
                msg.channel.send({embed});
               //console.log(typeof(forsend[0]));
            
            }
            else{
                msg.channel.send('一個錯誤發生了');
            }
             
        })
        
    }
   
    getdata();
}

    
};
