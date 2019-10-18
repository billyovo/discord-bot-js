const { Command } = require('discord.js-commando');

module.exports = class ListOfCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'group1',
            memberName: 'list',
            description: '顯示我的指令',
            examples: ['-list'],
            throttling: {
                usages: 1,
                duration: 20
            },
        });
    }
    run(msg) {
        msg.reply('\n指令：\n-online / -on 看我是否在線\n-dice 跟陌生人玩擲骰子遊戲\n-icon 看看朋友們的超美頭像!\n-coin / -coinflip 擲硬幣幫有選擇恐懼症的你作出選擇\n-cookie 給你那個說話超棒的朋友一片曲奇\n-music 播放一首我喜歡的歌ww\n-cat 給你一張隨機可愛的貓相片\n-dog 給你一張隨機狗狗相片\n-catgirl 給你一張隨機貓娘相片\n-catgirl yes/-catgirl y 老司機快開車!!(請到老司機頻道使用)\n-info 看看群組資訊\n-count 看看這個頻道非洲人跟歐洲人的比例\n-weather 查看香港現時天氣\n-weathertw/-tww 地方名稱  查看輸入台灣分區地方的天氣,不輸入地方來查看地震等等消息\n自我介紹 讓我介紹自己\nBGM 自行播播我的BGM\n\n**音樂系列**\n-play URL 播放youtube音樂(接受歌單跟字眼搜尋)\n-np /-nowplaying 看看現在在播什麼\n-q / -queue 看看音樂隊列\n-skip 跳過歌曲\n-clear 清除歌單\n-pause 暫停播放\n-resume 取消暫停重啟播放\n-shuffle 隨機排列歌單\n-volume 數字 調整音量0.5一半 2兩倍\n-join -leave 加入/退出頻道\n\n**試煉系列**\n-key 數量 名字  為你的好朋友們在本次開秘寶時出秘鑰 如果不打名字會自動加入你的名字\n-change/-amend 數量 名字 更改你的鑰匙**數量**!如果數量是0則移除紀錄 \n-changename/-cn 更改什麼名字 更改到什麼名字 更改鑰匙紀錄的**名字**\n-read/-now 看看今天的開箱相關資訊\n-time 設定開箱時間\n-people/-peep/-man/-keyman 設定收集鑰匙人\n-r/-rollcall/-rc read 查看誰已經給了鑰匙\n-r/-rc/-rollcall write 數字 填寫誰已經給了鑰匙(可打多個數字)\n-r check/-r c 看看列表上哪位朋友還沒交鑰匙\n-search /-find 名字  看看某位朋友在不在現在的名單上\n-p 名字 多少日前 於北門紀錄頻道找找某位朋友存不存在 \n\n**圖片支援系列** : \n月亮直接來懲罰你\n要怎樣反應才好\n\n**管理猿系列**\n-kick (reason) (@mention)\n-purge/fuckoff/clear/purify 清除數量 清除執行次數 清除頻道訊息\n\n**神秘系列:** ???');
    }
}