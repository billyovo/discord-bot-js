const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });

module.exports = class settime extends Command {
    constructor(client) {
        super(client, {
            name: 'time',
            aliases: ['taimu'],
            group: 'group13',
            memberName: 'time2',
            description: '設定開箱時間.',
            examples: ['time2'],
            args: [
                {
                    key: 'text',
                    prompt: '請設定時間',
                    type: 'string',
                    default : '10:00'
                } 
               
            ]
        });
    
    }
    run(msg,{text}) {
        db.run('UPDATE other SET time = ?',[text], function(err) {
            msg.channel.send('已設定時間為'+text);
        })
    }
};

