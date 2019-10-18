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
            name: 'search',
            aliases: ['find'],
            group: 'group13',
            memberName: 'search2',
            description: 'search2 a name!',
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
        db.all(`SELECT name FROM key WHERE name LIKE ?`,['%'+name+'%'], (err, row) => {
            if(row.length==0){
                msg.channel.send('找不到這位朋友!');
            }
            row.forEach(element => {
               msg.channel.send('你是不是在找'+element.name+'呢?'); 
            });
        })

    }
}