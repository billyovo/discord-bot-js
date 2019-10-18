const { Command } = require('discord.js-commando');
const request = require('request');
const Discord = require('discord.js');

module.exports = class DiceRoll extends Command {
    constructor(client) {
        super(client, {
            name: 'dice',
            group: 'group3',
            memberName: 'game',
            description: '玩遊戲',
            examples: ['open'],
            throttling: {
                usages: 1,
                duration: 30
            },
           
        });
    }
 run(msg) {
    var player = [msg.author.username];
    var links = [msg.author.avatarURL];
    var temp = 0;
    var dice = [];
    function checkwin(dices){
        if(dices[0]>dices[1]){
            msg.channel.send(':tada:'+player[0]+'嬴了!')
        }
        if(dices[1]>dices[0]){
            msg.channel.send(':tada:'+player[1]+'嬴了!')
        }
        if(dices[1]==dices[0]){
            msg.channel.send(':tada:平手!!:tada:');
        }
    }
    function getDice(){
        request.get('http://roll.diceapi.com/json/d6', {
        }, function(error, response, body) {
            if(!error){
                try{
                    var body = JSON.parse(body);
                    dice.push(body["dice"][0].value);   
                var embed = new Discord.RichEmbed()
                .setTitle(player[temp]+'擲到 : '+body["dice"][0].value+'點')
                .setColor('228B22')
                .setThumbnail(links[temp])
                .setImage('http://roll.diceapi.com/images/poorly-drawn/d6/'+body["dice"][0].value+'.png')
                .setTimestamp(new Date);      
                msg.channel.send(embed);    
                temp++;
                if(dice[1]!=undefined){
                    checkwin(dice);
                    
                }
                }
                catch(error){
                    msg.channel.send('一個錯誤發生了');
                }
            }
            else{
                msg.channel.send('一個錯誤發生了');
                return;
            }
             
        })
    }

    var timeout2 = true;
    // msg.channel.send(msg.author.username+'想跟你玩遊戲!請按下面的表情加入!')
    msg.channel.send({embed: {
     color: '65280',
     fields:[{
         name: '**'+msg.author.username+'** 想跟你玩遊戲!請按下面的表情加入!',
         value: '\u200b'
     },
 ]
}})
     .then((message)=>{
     message.react('503113045162065920')
     .then(()=>{
     const filter = (reaction, user) => reaction.emoji.id == "503113045162065920";
 let collector = message.createReactionCollector(filter, { time: 15000 });
 collector.on('collect', (reaction, collector) => {
     var play = reaction.users.map(m=>m.username);
     var play2 = reaction.users.map(k=>k.avatarURL);
     if(play[1]!=undefined){
         timeout2 = false;
         player[1] = play[1];
         links[1] = play2[1];
         msg.channel.send(player[1]+'已經加入遊戲!');
         collector.stop();
     }
 });
 collector.on('end', (reaction, collector) => {
     message.clearReactions();
     if(timeout2==false){
    getDice();
    getDice();
     }  
    })
})
     })

     
    
        
    }
}
