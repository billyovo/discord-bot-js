const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });
module.exports = class empty2 extends Command {
    constructor(client) {
        super(client, {
            name: 'empty',
            aliases: ['delete'],
            group: 'group13',
            memberName: 'delete2',
            description: '看看我是否在線.',
            examples: ['delete2'],
            args: [
                {
                    key: 'used',
                    prompt: '這次用了幾把鑰匙?',
                    type: 'integer',
                } 
                
            ]
        });
    }
    run(msg,{used}) {
    const numkey = 100;
    const url = this.client.user.avatarURL;
    var guil = msg.guild.channels.get('493733113378373632');
      msg.delete();
        db.all('SELECT yesterday FROM other',(err, row) => {
            db.all('SELECT SUM(num) AS total FROM key',(err, row1) => {
     
           const num = row[0].yesterday+row1[0].total - used;
            db.run('UPDATE other SET yesterday = ?',[num], function(err) {
                db.run('UPDATE other SET man = ?',[''], function(err) {
                    db.run('UPDATE other SET time = ?',['10:00(有活動則延後)'], function(err) {
                        
                    var free;
                    var guil = msg.guild.channels.get('494027901981687814');
                
                    if(num>=numkey){
                        free = '是的,明天免費';
                        
                       guil.setName('今天免費');
                        
                    }
                    else{
                        free = '不是..';
                        
                       guil.setName('今天要交鑰匙');
                    }
                    db.all(`SELECT name FROM key ORDER BY name`, (err, row) => {
                      var array = row.map(function (obj) {
                      
                        return obj.name;
            /*            row.forEach(function(element) {
                            array.push(element.name);
                        })
                    */    
                    })
    var dat = new Date;
    var senda =dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+dat.getDate();
     msg.channel.send('**__'+senda+'__**');
    msg.channel.send({
           embed:{
            title: "各種你需要知道的問答:",
            color : '16761035', 
            timestamp: new Date(),
            fields: [{
                name: "**剩下多少鑰匙?**",
                value: num+'條\n'
              },
              {
                name: "**明天是免費嗎?**",
                value: free+'.\n'
              },
              {
                  name:'鑰匙收集人',
                  value: msg.author.username
              }
            ],
            footer: {
              icon_url: url,
              text: '一位可愛的魔法少女 |'
            }
           },
          
        })
        array = array.join('\r\n');
        array = '```\r\n'+array+'```';
    
        msg.channel.send(array)
        .then(()=>{
            db.serialize(function() {
        db.run('DROP TABLE key');
        db.run('CREATE TABLE key(name TEXT,num INTEGER,give TEXT)');
        db.run('UPDATE other SET free = ?',['不是'], function(err) {
            console.error(err);
        })
        db.run('UPDATE other SET man = ?',['鑰匙收集人其中一個'], function(err) {

        })
        if(num>=numkey){
            db.run('UPDATE other SET free = ?',['是'], function(err) {
                console.error(err);
            })
        }
        db.all(`SELECT free FROM other`, (err, row) => {
        var sub = msg.guild.roles.get('500999786380525577').members.map(m=>m.nickname);
        var suba = msg.guild.roles.get('500999786380525577').members.map(m=>m.user);
        var subchannel = msg.guild.channels.find('id', '500993117852532737');
        var A = new Date;
        var B =A.getFullYear()+'/'+(A.getMonth()+1)+'/'+A.getDate();
        var j;
        if(row[0].free!='是'){
        for(j=0;j<sub.length;j++){
            try{
                if(sub[j]==null){
                    sub[j] = suba[j].username;
                }
            db.run(`INSERT INTO key ('name','num','give')VALUES(?,5,?)`,[sub[j],'']);
            }
            catch(err){
                console.log('An error occured in subscribe!');
            }
        }
        subchannel.send('**'+B+'**,<@&500999786380525577>');
       subchannel.send({embed: {
    color: 16761035,
    title: '明天的秘鑰紀錄',
    fields: [{
        name: '人數:',
        value: '共有'+j+'個人被加到明天的紀錄了!'
      }
      
    ],
    timestamp:new Date,
  }
});
    }
    })
            })
        })

    })
                    })
                })
            })

            })
        })
       

    

       
    
        
            
             
    }
}
        
