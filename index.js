const { CommandoClient } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const path = require('path');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('');
const Discord = require('discord.js');
var min,sec,temp;


const queue = new Map();


//const server = {queue:{url:[],titles:[]},connection:null,voiceChannel:[]};
const client = new CommandoClient({
    commandPrefix: '-',
    unknownCommandResponse: false,
    owner:['395454424954437632','274087244200017921'],
    disableEveryone: false
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1','在線?'],
        ['group2','說話'],
        ['group3','擲骰子大賽'],
        ['group4','指令列表'],
        ['group5','看看別人超醜的頭像'],
        ['group6','weather'],
        ['group7','擲硬幣 選擇恐懼症的好幫手'],
        ['group8','你好棒給你一塊曲奇'],
        ['group9','kick'],
        ['group10','set activity'],
        ['group11','delete channel message'],
        ['group12','key'],
        ['group13','read'],
        ['group14','delete'],
        ['group15','time'],
        ['group16','change'],
        ['group17','people'],
        ['group18','rollcall'],
        ['group19','Cats!!!!!!'],
        ['group20','CATGIRLS!!!!'],
        ['group21','DOGS'],
        
       
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
//^defaults setting
//music var^
var restart = false;
const token  = '';
client.login(token);
client.on('message', (message) => {
if(message.channel.type=='dm'){
    return;
}



const queueConstruct = {
    voiceChannel: null,
    connection: null,
    queue: {url:[],titles:[]},
    playing: false
};
var server = queue.get(message.guild.id);
if(!server){
queue.set(message.guild.id, queueConstruct);
var server = queue.get(message.guild.id);
}



     //this line
    
    function playmusic(){
      server.voiceChannel = message.member.voiceChannel;
      //message.channel.send(server.queue.url[0]);
    message.member.voiceChannel.join()
    .then(connection =>{ 
        server.connection = connection;
        const dispatcher =  server.connection.playStream(ytdl(server.queue.url[0], { filter: 'audioonly' }));
        dispatcher.on('end', end => 
             {
                 server.playing = false;
                 server.queue.url.shift();
                 server.queue.titles.shift();   //thisline
                if(server.queue.url.length>=1){
                    playmusic();
                }
                if(server.queue.url.length==0){
                    server.voiceChannel.leave();
                }

        })
        dispatcher.on('start',start=>
             {
                server.playing = true;
             })
    })
    .catch(console.log)
}

//play music function
if(!message.content.startsWith('-')){
    return;
}
/*
if(message.content=='-tst'){
    var counter = 0;
    for(var first = 65;first<125;first++){
        counter++;
        var x ="https://www.youtube.com/watch?v=MmUkkQ0"+String.fromCharCode(first);
        if(ytdl.validateURL(x)){
            message.channel.send(x);
        }
        else{
            console.log(x);
        }
    }
    message.channel.send(counter);
}
*/
    if(message.content =='-uptime'){
        if(client.isOwner(message.author)){
            temp = client.uptime/1000;
            min = Math.floor(temp/60);
            sec = Math.ceil(temp - 60*min);
            message.reply('I have been online for '+min+' minutes '+sec+' seconds. <:Vanilla:503113045162065920> ');
        }
        else{
            message.reply('對不起這是大人的指令你不能用');
        }
    }

    if(message.content.toLowerCase()=='-end'){
        if(client.isOwner(message.author)){
            var guila = client.channels.get("494027970092990475");
            guila.setName('リリカ離線中');
            message.delete();
            client.destroy();
        }
        else{
            message.channel.send('這是朕才能使用的指令!!!不要碰!!');
        }
    }

    if(message.content.toLowerCase()=='-restart'){
        if(client.isOwner(message.author)){
            message.delete();
            restart = true;
            client.emit('disconnect');
            client.login(token)
        }
        else{
            message.channel.send('這是朕才能使用的指令!!!不要碰!!');
        }
    }
    
    
  //music bot area
  var choice = message.content.slice('0','5');
  choice = choice.toLowerCase();
  var link = message.content.slice('6');
  var i;

    if(choice=='-play'){
        if(message.member.voiceChannel){
            if(link.indexOf('list=')==-1||link.indexOf('playlist')==-1){
        if(ytdl.validateURL(link)){
            server.queue.url.push(link);
            ytdl.getInfo(link,{downloadURL: true},
                function(err, info) {
                message.channel.send('`'+info.title+'` 已被加到歌單!');
                server.queue.titles.push(info.title);
                }
            )
            if(server.playing!=true){
                playmusic();
            }
    }
    else{
            youtube.searchVideos(link, 5)
            .then(results => {
                server.queue.url.push(results[0].url);
                server.queue.titles.push(results[0].title);
                message.channel.send('`'+results[0].title+'`已被加到隊列');
            })
            .catch(console.log)
            .then(()=>{
                if(server.playing!=true){
                    playmusic();
                }
            })
        }
    
        
    }
    else{   
    youtube.getPlaylist(link)
    .then(playlist => {
        playlist.getVideos()
            .then(videos => {
            for(i=0;i<videos.length;i++){
                server.queue.url.push(videos[i].url);
                server.queue.titles.push(videos[i].title);
            }
          message.channel.send('歌單中的'+videos.length+'首歌已被加到排放隊列');
         })
        .catch(console.log);
    })
    .catch(console.log)
    .then(()=>{
        if(server.playing!=true){
            playmusic();
        }
    })


}
     }
     else{
         message.channel.send('你要在語音頻道才能使用這個指令!');
     }
    }

    if(message.content.toLowerCase()=='-nowplaying'||message.content.toLowerCase()=='-np'){
        if(server.queue.url[0]!=undefined){
            var bar = ['▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬','▬'];
            var temtime = (server.connection.dispatcher.time)/1000;
            var npmin = Math.floor(temtime/60);
            var npsec = Math.floor(temtime-(npmin*60));
            if(npsec<10){
                npsec = '0'+npsec;
            }
        ytdl.getInfo(server.queue.url[0],{downloadURL: true},
            function(err, info) {
                var mins = Math.floor(info.length_seconds/60);
                var seconds = info.length_seconds-(mins*60);
                if(seconds<10){
                    seconds = seconds.toString();
                    seconds = '0'+seconds;
                } 
                var bartemp = (server.connection.dispatcher.time/1000)/info.length_seconds;
                bartemp = Math.round((bartemp*100)/5)
                bar[bartemp] = '🔘';
               // message.channel.send('正在播放: :musical_note:  **'+info.title+'**');
                message.channel.send({
                    embed:{
                     color : '16761035', 
                     title : message.guild.name+'的歌曲',
                     fields:[{
                        name : '正在播放:',
                        value : '['+info.title+']('+server.queue.url[0]+')\r\n\r\n'+bar.join('')+'\r\n▶️ '+npmin+':'+npsec+' | '+mins+':'+seconds,
                     }]
                    
                    },
                 })
         
            
    })
}
else{
    message.channel.send('現在沒有在播東西呢~');
}
    }


    if(message.content.toLowerCase()=='-queue'||message.content.toLowerCase()=='-q'){
        if(server.queue.url[1]!= undefined){
            var Qtemp = server.queue.titles.slice('1',server.queue.titles.length);
            for(i=0;i<Qtemp.length;i++){
                Qtemp[i] = (i+1)+' **'+Qtemp[i]+'**';
            }
            Qtemp = Qtemp.join('\r\n');
            message.channel.send('**__歌曲隊列 : __**\r\n'+Qtemp+'\r\n\r\n正在播放:**'+server.queue.titles[0]+'**');
        
        var tempo = server.queue.url.length-1;
        message.channel.send('共有 **'+tempo+'**首歌在歌單內');
      }
    
      else{
          message.channel.send('隊列沒有歌曲喔~');
      }
    }


    if(message.content.toLowerCase()=='-leave'){
        if(message.member.voiceChannel){
            if(message.member.voiceChannel==server.voiceChannel){
            server.queue.url = [];
            server.queue.titles = [];
        message.member.voiceChannel.leave();
            }
            else{
                message.channel.send('你要跟我同一個語音頻道才能使用這個指令!');
            }
        }
        else{
            message.channel.send('你要在一個語音頻道才能使用這個指令!');
        }
    }

    if(message.content.toLowerCase()=='-join'){
        if(message.member.voiceChannel){
            if(playing!=true){
            message.member.voiceChannel.join();
            }
            else{
                message.channel.send('你不能在音樂播放時移走我!');
            }
        }
        else{
            message.channel.send('你要在一個語音頻道才能使用這指令!');
        }
    }

    if(message.content.toLowerCase()=='-clear'){
        var temp = server.queue.url.length-1;
        message.channel.send('已清除'+temp+'首歌曲囉!');
        server.queue.url = server.queue.url.slice('0','1');
        server.queue.titles = server.queue.titles.slice('0','1');
        
    }

    if(message.content.toLowerCase()=='-skip'){
        if(message.member.voiceChannel){
      if(server.playing==true){
          message.channel.send('已跳過歌曲:`'+server.queue.titles[0]+'`')
          .then(()=>{
        server.connection.dispatcher.end();
          })
      }
        else{
            message.channel.send('沒有東西可以讓你跳過呢..');
        }
    }
    else{
        message.channel.send('你要在一個語音頻道才能使用這指令!');
    }
    }
        
    if(message.content.toLowerCase()=='-pause'){
        if(message.member.voiceChannel){
            server.connection.dispatcher.pause();
            server.playing = false;
            message.channel.send('已暫停播放');
        }
        else{
            message.channel.send('你要在一個語音頻道才能使用這指令!');
        }
    }

    if(message.content.toLowerCase()=='-resume'){
        if(message.member.voiceChannel){
            server.connection.dispatcher.resume();
            server.playing = true;
            message.channel.send('已重啟播放');
        }
        else{
            message.channel.send('你要在一個語音頻道才能使用這指令!');
        }
    }

    if(message.content.toLowerCase()=='-shuffle'){
        var tem;
        var pass = 0;
        var temparr = server.queue.url.slice('1',server.queue.url.length);
        var temparr1 = server.queue.titles.slice('1',server.queue.url.length)
        var len = temparr.length-1;
        if(server.queue.url.length!=0){
            while(len>0){
                var ran = Math.floor(Math.random() * len);
                tem = temparr[ran];
                temparr[ran] = temparr[len];
                temparr[len] = tem;
                tem = temparr1[ran];
                temparr1[ran] = temparr1[len];
                temparr1[len] = tem;
                len--;
                pass++;
            }
            server.queue.url = server.queue.url.slice('0','1');
            server.queue.url = server.queue.url.concat(temparr);
            server.queue.titles = server.queue.titles.slice('0','1');
            server.queue.titles = server.queue.titles.concat(temparr1);
            message.channel.send('隊列的'+(pass+1)+'首歌已被隨機排序!');
        }
        
        else{
            message.channel.send('隊列是空的呢..');
        }
        
    }

    if(message.content.toLowerCase().indexOf('-volume')!=-1){
        if(server.playing==true){
        var x = message.content.slice('8',message.content.length);
        if(!isNaN(x)){
        server.connection.dispatcher.setVolume(x);
        }
        message.channel.send('現時音量為: **'+server.connection.dispatcher.volume+'**');
        }
        else{
            message.channel.send('現在並沒有播放任何東西呢..');
        }

    }


//music bot area


function HCF(a,b){
    if(b==0){
        return a;
    }
    
    return HCF(b, a%b);
}

function LCM(a,b){
    
    return a*b/HCF(a,b);
}

if(message.content.toLowerCase().indexOf("-hcf")!=-1||message.content.toLowerCase().indexOf("-gcd")!=-1){
    var temp = message.content.split(" ");
    temp.shift();
    temp.sort(function(a, b){return a - b});
    temp.reverse();
    var answer = temp[0];
    for(var i=1;i<temp.length;i++){
        answer = HCF(answer,temp[i]);
    }
    //var answer = HCF(temp[0],temp[1]);
    message.channel.send(answer);
}


if(message.content.toLowerCase().indexOf("-lcm")!=-1){
    
    var temp = message.content.split(" ");
    temp.shift();
    temp.sort(function(a, b){return a - b});
    temp.reverse();
    var answer = temp[0];
    
    for(var i=1;i<temp.length;i++){
          answer = LCM(answer,temp[i]);
        
    }
   
    message.channel.send(answer);
}

});


client.on('guildMemberAdd', member =>{
    member.addRole(member.guild.roles.find(role => role.name === "新手手(?"))
    .catch(()=>{
        console.error;
    })
   var chan= member.guild.systemChannel;
   var name = member.user.username;
    chan.send('歡迎'+name+'來到'+member.guild.name+'!\r\n請隨便四處看看喔!');
if(member.guild.id=='448133681178083349'){
   member.user.send('**嗨,我是這個群組的魔法少女,請把你的名稱設成遊戲id以方便收集鑰匙!\n');
}
   member.user.send('以下是我的指令:**');     
   member.user.send({embed: {
    color: '16761035',
    title: '指令列表:',
    description: "\n指令：\n-online / -on 看我是否在線\n-dice 跟陌生人玩擲骰子遊戲\n-icon 看看朋友們的超美頭像!\n-coin / -coinflip 擲硬幣幫有選擇恐懼症的你作出選擇\n-cookie 給你那個說話超棒的朋友一片曲奇\n-music 播放一首我喜歡的歌ww\n-cat 給你一張隨機可愛的貓相片\n-dog 給你一張隨機狗狗相片\n-catgirl 給你一張隨機貓娘相片\n-catgirl yes/-catgirl y 老司機快開車!!(請到老司機頻道使用)\n-count 看看這個頻道非洲人跟歐洲人的比例\n-weather 查看香港現時天氣\n-weathertw/-tww 地方名稱  查看輸入台灣分區地方的天氣,不輸入地方來查看地震等等消息\n-info 看看群組資訊\n自我介紹 讓我介紹自己\nBGM 自行播播我的BGM\n\n**音樂系列**\n-play URL 播放youtube音樂(接受歌單跟字眼搜尋)\n-np /-nowplaying 看看現在在播什麼\n-q / -queue 看看音樂隊列\n-skip 跳過歌曲\n-clear 清除歌單\n-pause 暫停播放\n-resume 取消暫停重啟播放\n-shuffle 隨機排列歌單\n-volume 數字 調整音量0.5一半 2兩倍\n-join -leave 加入/退出頻道\n\n**試煉系列**\n-key 數量 名字  為你的好朋友們在本次開秘寶時出秘鑰 如果不打名字會自動加入你的名字\n-change/-amend 數量 名字 更改你的鑰匙**數量**!如果數量是0則移除紀錄 \n-changename/-cn 更改什麼名字 更改到什麼名字 更改鑰匙紀錄的**名字**\n-read/-now 看看今天的開箱相關資訊\n-time 設定開箱時間\n-people/-peep/-man/-keyman 設定收集鑰匙人\n-r/-rollcall/-rc read 查看誰已經給了鑰匙\n-r/-rc/-rollcall write 數字 填寫誰已經給了鑰匙(可打多個數字)\n-r check/-r c 看看列表上哪位朋友還沒交鑰匙\n-search /-find 名字  看看某位朋友在不在現在的名單上\n-p 名字 多少日前 於北門紀錄頻道找找某位朋友存不存在 \n\n**圖片支援系列** : \n月亮直接來懲罰你\n要怎樣反應才好\n\n**管理猿系列**\n-kick (reason) (@mention)\n-purge/fuckoff/clear/purify 清除數量 清除執行次數 清除頻道訊息\n\n**神秘系列:** ???",
    footer: {
        icon_url: client.user.avatarURL,
        text: "一位可愛的魔法少女"
      }
}});
    
});
client.on('guildMemberRemove', member =>{
    var name2 = member.user.username;
    var chan= member.guild.systemChannel;
    if(chan!=undefined){
        chan.send(name2+'偷偷走了卻沒有人注意 :( ');
    }
})


client.on('ready',()=>{
    var guil = client.channels.get("494027970092990475");
    console.log('Online now');
    guil.setName('リリカ上線中')
    restart = false;
    client.user.setActivity('humans make mistakes', { type: 'WATCHING' });
})

client.on('disconnect',()=>{
    console.log('Disconnected');
if(restart==true){
    client.login(token);
}
  })


client.on('error', console.error)
process.on('unhandledRejection', err => console.error(`Uncaught Promise Rejection: \n${err.stack}`));

//^commands no comando



