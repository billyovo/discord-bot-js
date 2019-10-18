const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });
module.exports = class changename2 extends Command {
    constructor(client) {
        super(client, {
            name: 'changename',
            aliases: ['cn'],
            group: 'group13',
            memberName: 'change_name',
            description: '改名字',
            examples: ['-cn from to'],
            args: [
                {
                    key: 'first',
                    prompt:'改什麼?',
                    type: 'string',
                    default : '',
                },
                {
                    key: 'second',
                    prompt:'改成什麼?',
                    type: 'string',
                    default :'',
                }
            ]
        });    
    }
//              ,arg below
    run(msg, {first,second}) {
        db.run('UPDATE key SET name = ? WHERE name LIKE ?',[second,first], function(err) {
            msg.channel.send('更改紀錄成功');
        })
    }
}