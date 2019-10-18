const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class rollcall extends Command {
    constructor(client) {
        super(client, {
            name: 'freelist',
            aliases: ['fl'],
            group: 'group13',
            memberName: 'freelist',
            description: 'generate freelist',
            examples: ['-freelist']
           
        });    
    }
//              ,arg below
    run(msg) {
        var days = 0;
        var lastfreetime;
        var counter = [];
        var templist = [];
        var list = [];
        var half = 0;
        function FindFreeDay(){
            var isTarget = false;
            var i = 0;
            var target = false;
            var first = false;
            const recordchannel =  msg.guild.channels.get('452092281198215200');
           recordchannel.fetchMessages({ limit: 100 })
         .then((messages)=>{
            messages = messages.array();
            while(!isTarget||!target){
                if(messages[i].embeds.length!=0){
                    var temp = messages[i].embeds[0].fields[0].value;
                    var numtemp = parseInt(temp);
                    if(!first){
                        if(numtemp<100){
                            return msg.channel.send("還沒到免費的時侯!");
                        }
                    }
                    first = true;
                   // console.log(numtemp);
                   
                    if(numtemp>=100){
                    if(!isTarget){
                        isTarget = true;
                    }
                    else{
                       target = true;
                       lastfreetime = messages[i].embeds[0].timestamp;
                       //console.log(lastfreetime);
                        list.pop();
                        list.pop();
                        days = days - 2;
                        half = Math.ceil(days/2);
                        return processData();
                        
                    }
                }
                }
              
                if(messages[i].content.startsWith("```\r\n")){       
                    list.push(messages[i].content);
                    days++;
                  // console.log(list);
                  }
                i++;
                if(i>=100){
                    return msg.channel.send("並沒有找到什麼東西");
                }
            }
            //console.log(messages[2].embeds[0].fields[0].value);
        
         })
        .catch(console.error);
        }

        function processData(){
            if(days%2==0){
             half++;
         }
            for(var j=0;j<list.length;j++){
         //   msg.channel.send(list[j]);
            var tempprocess = list[j].split("\r\n");
           
           // tempprocess.pop();
            tempprocess.shift();
            tempprocess[tempprocess.length-1] = tempprocess[tempprocess.length-1].replace("```","");
            templist = templist.concat(tempprocess);
           
            }
           templist.sort();
            return findFree();
            //console.log(templist);
           
            //msg.channel.send("@死魚deadfish12 "+ days + "days passed and half is " + half + " days");
            
        }

        function findFree(){
            
            for(var i =0;i<templist.length;i++){
               // console.log(counter[templist[i]]);
                if(counter[templist[i]]==undefined){
                    counter[templist[i]] = 1;
                    
                }
                else{
                    counter[templist[i]]++;
                    
                }
            }
            return genFree();
           // console.log(counter);
        }

        function genFree(){
            var freeppl = [];
            var notfree = [];
            for(var i in counter){
                if(counter[i]>=half&&i != "神秘人"){
                    freeppl.push(i+"    "+ counter[i]+"次");
                }
                else{
                    notfree.push(i+"    "+ counter[i]+"次");
                }
            }
            const embed = new Discord.RichEmbed()
    .setTitle('下次免費名單')
    .setColor("add8e6")
	.setDescription('離上次免費共有'+days + '日, 只要有'+half+'次紀錄便可以免費')
	.addField('**以下免費**', freeppl.join("\r\n"))
	.addField('**以下不是免費**',notfree.join("\r\n"))
	.setTimestamp(lastfreetime)
	.setFooter('上次免費時間 : ');
            msg.channel.send({embed});
        }
        FindFreeDay();
        
    }}