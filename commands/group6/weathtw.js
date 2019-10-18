const { Command } = require('discord.js-commando');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
module.exports = class weathertw extends Command {
    constructor(client) {
        super(client, {
            name: 'weathertw',
            aliases: ['天氣tw','tww'],
            group: 'group6',
            memberName: 'weathertw',
            description: 'get weathertw',
            examples: ['-weathertw'],
            args: [
                {
                    key: 'place',
                    prompt:'你要查看哪個地方的天氣?',
                    type: 'string',
                    default : 'afca',
                }]
   
        });    
    }
//              ,arg below
    run(msg,{place}) {
        const area = ['臺北市','高雄市','基隆市','新北市','桃園市','新竹縣','苗栗縣','臺中市','彰化縣',
                      '南投縣','雲林縣','嘉義縣','臺南市','新竹市','屏東縣','嘉義市','宜蘭縣','花蓮縣',
                      '臺東縣','澎湖縣','金門縣','連江縣'];
       place = place.replace('台','臺');
        var urlTestFeed = "https://www.cwb.gov.tw/rss/forecast/36_";
        var i;
        var data;
        var pos = -1;
        for(i=0;i<area.length;i++){
            if(area[i].indexOf(place)!=-1){
                pos = i;
            }
        }
        if(pos != -1){
            pos = pos + 1;
            if(pos<10){
                pos = '0'+pos;
            }
            urlTestFeed = urlTestFeed.concat(pos+'.xml');
		}
		else{
			if(place=='afca'){
			urlTestFeed='https://www.cwb.gov.tw/rss/Data/cwb_warning.xml';
			}
			else{
				msg.channel.send('找不到你想找的地方呢...');
				return;
			}
		}



function getFeed (urlfeed, callback) {
	var req = request (urlfeed);
	var feedparser = new FeedParser ();
	var feedItems = new Array ();
	req.on ("response", function (response) {
		var stream = this;
		if (response.statusCode == 200) {
			stream.pipe (feedparser);
			}
		});
	req.on ("error", function (err) {
		console.log ("getFeed: err.message == " + err.message);
		});
	feedparser.on ("readable", function () {
		try {
			var item = this.read (), flnew;
			if (item !== null) { //2/9/17 by DW
				feedItems.push (item);
				}
			}
		catch (err) {
			console.log ("getFeed: err.message == " + err.message);
			}
		});
	feedparser.on ("end", function () {
		callback (undefined, feedItems);
		});
	feedparser.on ("error", function (err) {
		console.log ("getFeed: err.message == " + err.message);
		callback (err);
		});
	}
 
getFeed (urlTestFeed, function (err, feedItems) {
	if (!err) {
		function pad (num) { 
			var s = num.toString (), ctplaces = 3;
			while (s.length < ctplaces) {
				s = "0" + s;
				}
			return (s);
			}
        console.log ("There are " + feedItems.length + " items in the TW weather feed.\nBy "+msg.author.username);
        
		for (var i = 0; i < feedItems.length; i++) {
			
			msg.channel.send(feedItems[i].title);
			msg.channel.send(feedItems[i].summary.replace(/<[^>]*>/g, ''));
            
			}
			if(feedItems==null){
				msg.channel.send('暫時沒有相關報告呢~');
			}
		}
	});
     } 
};
