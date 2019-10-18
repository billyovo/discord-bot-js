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
            name: 'read',
            group: 'group13',
            memberName: 'read2',
            description: 'read2 key',
            examples: ['read2'],
        });
    }

    run(msg) {
    let promise = new Promise((resolve, reject) => {   
        db.all(`SELECT name,num FROM key ORDER BY name`, (err, row) => {
            var array = [];
         
            row.forEach((rows) => {
            array.push(rows.name+'      '+rows.num+'\r\n');                
                
            })
       
          resolve(array);
    })
   
})

promise.then((success)=>{ 
    
    db.all(`SELECT man,time,yesterday,free FROM other`, (err, row) => {
        db.all(`SELECT SUM(num) AS total FROM key`, (err, row1) => {
        var info;
        if(row1[0].total==null){
            row1[0].total= 0;
        }
        const embed = new Discord.RichEmbed()
                      .setTitle('**今天的資訊**')
                      .setColor('FFCCCC')
                      .addField("昨天剩下", row[0].yesterday, true)
                      .addField("現在共有", row1[0].total, true)
                      .addField("總和", row1[0].total+row[0].yesterday, true)
                      .addField("鑰匙收集狂",  row[0].man+'\r\n', true)
                      .addField("時間",  row[0].time, true)
                      .addField('今天免費嗎?', row[0].free, true)
                      .setTimestamp()
        msg.channel.send(success.join(''));
        msg.channel.send({embed});
/*
        info = success.join('')+'-------------------------------------------------------\r\n昨天剩下: **'+row[0].yesterday+'**\r\n現在共有: **'
                +row1[0].total+'**\r\n總和: **'+(row1[0].total+row[0].yesterday)+'\r\n\r\n**鑰匙收集狂: **'+row[0].man+'**\r\n時間: **'+row[0].time+'**\r\n今天免費嗎:** '+row[0].free+'**';
        msg.channel.send(info);
        */
    })
   
    })
})

promise.catch((err)=>{
 console.log(err);
 msg.channel.send('ERROR 404');
})

    }
}