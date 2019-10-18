const { Command } = require('discord.js-commando');
module.exports = class rollcall extends Command {
    constructor(client) {
        super(client, {
            name: 'past',
            aliases: ['p'],
            group: 'group13',
            memberName: 'past',
            description: 'find past',
            examples: ['-p me 2'],
            args: [
                {
                    key: 'ppl',
                    prompt:'who is that',
                    type: 'string',
                    default :'',
                } ,
                {
                    key: 'day',
                    prompt:'how many days ago',
                    type: 'string',
                    default :'a',
                }
            ]
        });    
    }
//              ,arg below
    run(msg, { ppl,day }) {
        const today = new Date();
        const day1 = today.getFullYear()*365 + (today.getMonth()+1)*31 + today.getDate();
        var i;
        ppl = ppl.toLowerCase();
        day = parseInt(day);
        if(!Number.isInteger(day)){
           msg.channel.send('這不是正確的數字!');
           return; 
        }
   
        const channel = msg.guild.channels.get('452092281198215200');
        if(channel==undefined){
            return;
        }
        if(day>20){
            msg.channel.send('只能找到最多20日前的紀錄!');
            return;
        }
    var promise = new Promise(function(resolve, reject) {
        channel.fetchMessages({ limit: (day*5) })
        .then(messages =>{
            var real = [];
            messages = messages.array();
            for(i=0;i<messages.length;i++){
                var temp = messages[i].createdAt;
                var day2 = temp.getFullYear()*365 + (temp.getMonth()+1)*31 + temp.getDate();
                if((day1-day2)==day&&messages[i].author.id=='414662329217843201'){
                    real.push(messages[i]);
                }    
            }

        if(real.length!=0){
            resolve(real);
        }

        else{
            reject('找不到任何訊息!');
        }
    })
})
             
    .catch(console.error);
promise.then((success)=>{
    var found = false;
    var list;
    var tem;
    var pos = 0;
    for(i=0;i<success.length;i++){
    if(success[i].content.indexOf('```')!=-1){
        list = success[i].content;
        pos = i;
    }
}
list = list.replace('```','');
tem = list.split('\r\n');
for(i=0;i<tem.length;i++){
    if(tem[i].toLowerCase().indexOf(ppl)!=-1){
        msg.channel.send('你是不是在找那天的第'+(i+1)+'位朋友**'+tem[i]+'**呢?');
        found = true;
    }
}
if(!found){
    msg.channel.send('找不到這位朋友!');
    }
    var link = 'https://discordapp.com/channels/';
    link = link+msg.guild.id+'/'+success[pos].channel.id+'/'+success[pos].id;
msg.channel.send({
    embed: {
    color: '16761035',
    fields: [{
        name: "紀錄訊息的ID",
        value: success[pos].id
      },
      {
          name:'紀錄連結',
          value: link
      },
      {
        name: "訊息日期",
        value: success[pos].createdAt.toLocaleString()
      },
      {
          name:'紀錄訊息位於',
          value: success[pos].channel.name
      }
    ]
  }});
//msg.channel.send('訊息紀錄ID:**'+success[pos].id+'**\r\n訊息日期:**'+success[pos].createdAt.toLocaleString()+'**\r\n位於:**'+success[pos].channel.name+'**');
})

promise.catch((rejected)=>{
    msg.channel.send(rejected);
})


    }}