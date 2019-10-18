const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });
module.exports = class setpeople extends Command {
    constructor(client) {
        super(client, {
            name: 'people',
            aliases: ['peep','man','keyman'],
            group: 'group13',
            memberName: 'people2',
            description: 'set man.',
            examples: ['people2'],
            args: [
                {
                    key: 'text',
                    prompt: '請設定人物',
                    type: 'string',
                    default : ''
                } 
               
            ]
        });
    
    }
    run(msg,{text}) {
        var user = msg.mentions.users.first();
        var name;
        if(user == undefined){
            if(text==''){
                name = msg.author.username;
            }
            else{
                name = text;
            }
        }
        else{
            name = user.username;
        }
        
        db.run('UPDATE other SET man = ?',[name], function(err) {
            msg.channel.send('已設定鑰匙收集狂為'+name);
        })

    }
};
