const { Command } = require('discord.js-commando');
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('key', (err) => {
    if (err) {
      return console.error(err.message);
    } 
  });
module.exports = class rollcall2 extends Command {
    constructor(client) {
        super(client, {
            name: 'rollcall',
            aliases: ['rc','r'],
            group: 'group13',
            memberName: 'rollcall2',
            description: '點算人數2',
            examples: ['-r 1'],
            args: [
                {
                    key: 'choice',
                    prompt:'寫人數 : write\n看人數:read',
                    type: 'string',
                    default :'read',
                } ,
                {
                    key: 'ppl',
                    prompt:'誰已經給了鑰匙?',
                    type: 'string',
                    default :'1',
                }
            ]
        });    
    }
//              ,arg below
    run(msg, { choice,ppl }) {
        //db.run('UPDATE key SET num = ? WHERE name LIKE ?',[num,name], function(err) {
            if(ppl.indexOf('  ')!=-1){
                return(msg.channel.send('你又打了2個空格來弄壞我!'));
            }
            ppl = ppl.split(' ');
            var i,k;
        
            function writekey(input){
                var j;
                    db.run('UPDATE key SET give = ? WHERE name LIKE ?',['✓','%'+input+'%'], function(err) {    
                        db.all('SELECT name FROM key WHERE name LIKE ?',['%'+input+'%'],(err,row)=>{
                           var success = [];
                           if(row.length!=0){
                           for(j=0;j<row.length;j++){
                               success.push(row[j].name);
                           }
                           if(row.length>1){
                         
                           msg.channel.send({embed: {
                            color: '16761035',
                            fields:[{
                                name : '**注意**',
                                value: '__'+input+'__ 這個輸入令多個朋友交出了秘鑰'
                            },
                        ]
                    }})
                           }
                           msg.channel.send(success.join(',')+'已經交出秘鑰!');
                           
                        }
                        else{
                            msg.channel.send('**你是個神秘人 : __'+input+'__**');
                        }
                        
                        
                    })    
                })
                       
                
            }
    
        
        if(choice=='write'||choice=='w'){    
            if(!msg.member.hasPermission('ADMINISTRATOR')){
                msg.channel.send('你沒有權限這樣做');
                return;
            }
        
            for(i=0;i<ppl.length;i++){
                 writekey(ppl[i])
            }
            db.run('UPDATE other SET man = ?',[msg.author.username], function(err){ 
            })
            
    }

        if(choice=='read'||choice=='r'){
            db.all('SELECT name,give FROM key ORDER BY name',(err, row) => {
                var array = [];
                row.forEach(element => {
                    array.push(element.name+'      '+element.give+'\r\n');
            })
            msg.channel.send(array.join(''));
            db.all('SELECT SUM(num) as total FROM key WHERE give = ?',['✓'],(err, row) => {
                db.all('SELECT SUM(num) as total1 FROM key',(err, row1) => {
                    msg.channel.send('**總數: '+row[0].total+'/'+row1[0].total1+'**');
                })
            
            })

        })


    }

    if(choice=='c'||choice=='check'){
        db.all('SELECT name FROM key WHERE give <> ? ORDER BY name',['✓'],(err, row) => {
            var array = [];
            row.forEach(element => {
                array.push(element.name);
            })
            if(array.length==0){
                msg.channel.send('**所有朋友都交了鑰匙呢:D**')
            }
            else{
            msg.channel.send('**這些朋友再不交鑰匙我就開槍** <:KannaFreeze:465484461010845697> \r\n'+array.join('\r\n'));
            }
        })

    }

    if(choice=='delete'||choice=='d'){
        ppl = ppl.split(' ');
        for(i=0;i<ppl.length;i++){
        db.run('UPDATE key SET give = ? WHERE name LIKE ?',['','%'+ppl[i]+'%'], function(err) {
            
        })
    }
    for(i=0;i<ppl.length;i++){
    db.all('SELECT name FROM key WHERE name LIKE ?',['%'+ppl[i]+'%'],(err,row)=>{
        try{
        msg.channel.send(row[0].name+'的紀錄已被刪除!');
        }
        catch(err){
            msg.channel.send('這是神秘人!');
        }
})
    }
   
    }

    }
}