const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    }
   
  });
 
module.exports = class Key2 extends Command {
    constructor(client) {
        super(client, {
            name: 'key',
            aliases: ['鑰匙','秘鑰','我想開箱','lm'],
            group: 'group13',
            memberName: 'key2',
            description: 'open key2',
            examples: ['key2 10 billyovo'],
            args: [
                {
                    key: 'num',
                    prompt:'你要出幾把?',
                    type: 'string',
                    default :'',
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
  
    run(msg,{num,name}) { 
        var found = false;
        var user = msg.mentions.users.first();
        var temp;
        const numkey = 100;
        const emotes = ['<:Vanilla:503113045162065920>','<:Shigure:503113045120253963>','<:Maple:503113044994424844>',
        '<:Coconut:503113045053145088>','<:Cinnamon:503113044810006535>','<:Chocola:503113045069922324>','<:Azuki:503113045132705802>'];
        var rand = Math.floor((Math.random()*emotes.length));
        if(!isNaN(num)&&num!=''){
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
              if(name!=''){
                temp = num;
                num = name;
                name = temp;
                if(user!=undefined){
                    name = user.username;
                }
              }
              else{
                  if(num==''){
                  name = msg.author.username;
                  num = '5';
                  }
                  else{
                      name = num;
                      num = '5';
                      if(user!=undefined){
                        name = user.username;
                    }
                  }
              }
            }
        
            num = parseInt(num);
            if(num!==num){
                return(msg.channel.send('這是錯誤的格式!你連指令都不會用的話還學人開什麼秘箱!'));
            }
            if(num<=0){
                return(msg.channel.send('你不能出少於1條鑰匙!'))
            }

function find(callback){        
   
                  db.all(`SELECT name FROM key ORDER BY name`, (err, data) => {
                      var a = 0;          
                    if (err) {
                        console.error(err.message);
                      }
                    if(data.length>0){
                    for(a=0;a<data.length;a++){
                        if(data[a].name==name){             
                            msg.channel.send('你的名字已經存在了!');
                            found = true;
                            return;
                      }         
                         
                }                 
            }
        })
       
     
   return callback();
     
    
    }

function write(){

    if(found!=true){
    db.all(`SELECT yesterday FROM other`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        if(row[0].yesterday<numkey){
            msg.react('✅');
        }
        else{
            msg.channel.send('昨天的鑰匙數量有'+row[0].yesterday+'條呢~\r\n今天應該開免費喔');
            msg.react('❌');
        }
    })

    db.run(`INSERT INTO key ('name','num','give')VALUES(?,?,?)`,[name,num,'']);
    
    msg.channel.send('`'+name+'`'+' 出了'+num+'條鑰匙'+emotes[rand]);
    }
    else{
        return;
    }
}



    find(write);
}}


//db.run(`INSERT INTO key ('name','num','give')VALUES(?,?,?)`,[name,num,'0']);
//db.run(`INSERT INTO key ('name','num','give')VALUES(?,?,?)`,[name,num,'0']);