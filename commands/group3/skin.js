
const { Command } = require('discord.js-commando');
const request = require('request');
const Discord = require('discord.js');
module.exports = class skinstealing extends Command {
    constructor(client) {
        super(client, {
            name: 'skin',
            aliases: ['skins'],
            group: 'group3',
            memberName: 'skin',
            description: 'steal skin',
            examples: ['-skin Ankie_'],
            args: [
                {
                    key: 'name',
                    prompt: 'nope',
                    type: 'string',
                    default : 'Notch',
                  
                } 
                //,
               // { repeat in case of second arg
               //
               // }
            ]
        });    
    }
//              ,arg below
    run(msg, { name }) {
        var UUID;

    
        var promise1 = new Promise(function(resolve, reject) {
        request.get('https://api.mojang.com/users/profiles/minecraft/'+name, {
        }, function(error, response, body) {
            if(!error){
                try{
                body = JSON.parse(body);
                UUID = body['id'];   
                resolve();
                }
                catch(error){
                    msg.channel.send('一個錯誤發生了或找不到這位朋友');
                }
            }
            else{
                msg.channel.send('一個錯誤發生了');
                return;
            }
             
        })
    })
    //https://crafatar.com/renders/body/
    promise1.then(()=>{
        request.get('https://sessionserver.mojang.com/session/minecraft/profile/'+UUID, {
        }, function(error, response, body2) {
            if(!error){
                try{
                var response1 = JSON.parse(body2);  
                var decodedData = response1['properties'][0]['value'];
                let buff = new Buffer(decodedData,'base64');  
                var result = buff.toString('ascii'); 
                result = JSON.parse(result);
                const embed = new Discord.RichEmbed()
                .setTitle('按此盜取'+name+'的皮膚')
                .setURL(result['textures']['SKIN']['url'])
                .setColor('228B22')
                .setThumbnail('https://visage.surgeplay.com/head/800/'+UUID)
                .setImage('https://visage.surgeplay.com/full/800/'+UUID)
                .setTimestamp(new Date)
                .setFooter(UUID);
               
                msg.channel.send({embed});
                }
                catch(error){
                    msg.channel.send('一個錯誤發生 一分鍾只能查看同一位玩家一次');
                }
            }
            else{
                msg.channel.send('一個錯誤發生了');
                return;
            }
             
        })
    })
}}

// https://sessionserver.mojang.com/session/minecraft/profile/<uuid>