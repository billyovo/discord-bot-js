const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
const Discord = require('discord.js');
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    }
   
  });
module.exports = class name2 extends Command {
    constructor(client) {
        super(client, {
            name: 'secret',
            aliases: ['secretman'],
            group: 'group13',
            memberName: 'secretppl',
            description: '-secret 18',
            examples: ['secret'],
            args: [
                {
                    key: 'text',
                    prompt: '',
                    type: 'integer',
                    default : '',
                  
                } 
            ]
        });
    }

    run(msg,{text}) {
    if(text==''){
        msg.channel.send('用法: -secret 已有鑰匙數量');
        return;
    }
        db.all(`SELECT num FROM key`, (err, row) => {
            var total = 0;
            for(var i=0;i<row.length;i++){
                total = total + row[i].num;
            }
            total = parseInt(text) - total;
            if(total>=1){
                db.run(`INSERT INTO key ('name','num','give')VALUES(?,?,?)`,['神秘人',total,'✓']);
                msg.channel.send('成功增加了神秘人'+total+'個!');
            }
            else{
                msg.channel.send('沒有神秘人!');
            }
         
       
})
}
}