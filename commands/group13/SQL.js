const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });
module.exports = class search2 extends Command {
    constructor(client) {
        super(client, {
            name: 'sql',
            group: 'group13',
            memberName: 'sql',
            description: 'SQL a name!',
            examples: ['search2 meh'],
            args:[ {
                key: 'name',
                prompt:'誰?',
                default: '',
                type: 'string',
            }]
        });
    }
    run(msg,{name}) {
        db.all(name, (err, row) => {
           if(err){
               msg.channel.send('一個錯誤發生了!');
               return;
           }
           row = JSON.stringify(row);
           msg.channel.send(row);
        })

    }
}