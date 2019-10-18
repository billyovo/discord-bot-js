const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });

module.exports = class change2 extends Command {
    constructor(client) {
        super(client, {
            name: 'amend2',
            aliases: ['change','x'],
            group: 'group13',
            memberName: 'change2',
            description: 'change2 key',
            examples: ['change2 10 billyovo'],
            args: [
                {
                    key: 'num1',
                    prompt:'你要出幾把?',
                    type: 'string',
                    default : '1',
                } ,
                {
                    key: 'name',
                    prompt:'who are you?',
                    default: '',
                    type: 'string',
                }
            ]
        });
    }

    run(msg,{num1,name}) {
      var num = num1.toString();
      var i = 0;
      var user = msg.mentions.users.first();
      var temp;
      if(!isNaN(num1)){
        if(user == undefined){
            if(name==''){
                name = msg.author.username;
            }
        }
        else{
            name = user.username;
        }
    }
    else{
        var temp;
        temp = name;
        name = num;
        num = temp;
        if(user!=undefined){
            name = user.username;
        }
    }
    num = parseInt(num);
    if(num!==num){
        return(msg.channel.send('這是錯誤的格式!'));
    }
    if ((num <= -1)&&(num>=100)){
     return '你不能出少於0或大於100把鑰匙\n正確用法 :-change 數量 名字';
    }      
    db.all(`SELECT name,num FROM key WHERE name LIKE ?`,[name],(err, row) => {
        if(row.length!=0){
        msg.channel.send({embed: {
            color: '16761035',
            fields:[{
                name : '更改:',
                value: row[0].name+' '+row[0].num +'\r\n:arrow_down: :arrow_down::arrow_down:\r\n '+name+' '+num1
            },
        ]
    }})
}
else{
    msg.channel.send({embed: {
        color: '16761035',
        fields:[{
            name : '更改:',
            value: '找不到更改的項目!'
        },
    ]
}})
}
    })      

if(num!=0){
        db.run('UPDATE key SET num = ? WHERE name LIKE ?',[num,name], function(err) {
            msg.channel.send('更改紀錄成功');
            if (err) {
                msg.channel.send('一個我不想告訴你的錯誤發生了!');
                console.error(err.message);
                return;
              }
        })
    }

else{
    db.run('DELETE FROM key WHERE name LIKE ?',[name],function(err){
        if (err) {
            msg.channel.send('一個我不想告訴你的錯誤發生了!');
            console.error(err.message);
            return;
          }
        msg.channel.send('刪除紀錄成功');
    })

}
    }
}