function lekanhome(){
var spl=MY_URL.split('##');
var html = request('https://4v0r.cn/vodshow/'+spl[1]+'--------'+spl[2]+'---/');
var list = parseDomForArray(html,'.myui-vodlist&&li');
    for (var i in list) {
        var title = parseDomForHtml(list[i], 'a&&title');
        var img = parseDom(list[i], '.lazyload&&data-original');
        var url = parseDomForHtml(list[i], 'a&&href');
        var desc = parseDomForHtml(list[i], '.pic-text||span&&Text');
        items.push({
            title: title,
            pic_url: img+'@Referer='+img,
            url: 'https://4v0r.cn'+url,
            desc: desc
        });
    }
};
function lekansearch(){
var spl=MY_URL.split('#@#');
var html = request('https://4v0r.cn/vodsearch/'+spl[1]+'----------'+spl[2]+'---/');
var list = parseDomForArray(html,'.myui-vodlist__media&&li');
    for (var i in list) {
        var title = parseDomForHtml(list[i], 'a&&title');
        var img = parseDom(list[i], '.lazyload&&data-original');
        var url = parseDomForHtml(list[i], 'a&&href');
        var desc = parseDomForHtml(list[i], '.pic-text&&Text');
        var con = parseDomForHtml(list[i], '.detail--h4&&Text');
        items.push({
            title: title,
            img: img+'@Referer='+img,
            url: 'https://4v0r.cn'+url,
            desc: desc,
            content: con
        });
    }
};
function lekanerji(){
var html=getResCode();
var tabs=parseDomForArray(html,'body&&.nav-tabs&&li');
var conts=parseDomForArray(html,'body&&.myui-content__list');
var thumb = parseDom(html, ".myui-content__thumb&&.lazyload&&data-original");
d.push({
    title: '剧情简介：'+'    共'+conts.length+'条线路',
    desc:parseDomForHtml(html, ".myui-content__detail&&p,-1&&Text"),
    pic_url:thumb,
    url:thumb,
	col_type: 'pic_1'
});

for(var i in conts){
  var list=parseDomForArray(conts[i],'body&&a');
  if(list!=null){
		d.push({
			title:parseDomForHtml(tabs[i], "a&&Text"),
			col_type: 'text_1'
		});
		for(var j in list){
			d.push({
				title:parseDomForHtml(list[j], "a&&Text"),
      url:parseDom(list[j], "a&&href")+`@lazyRule=.js:eval(getVar('xyqlekan'));lekanlazy();`,
      col_type: 'text_2'
			});
   }
  }
}
};
function lekanlazy(){
var cook=base64Decode(getVar('lkyscook'));
var get=fetch(input,{headers:{"User-Agent":MOBILE_UA,"Referer":"https://4v0r.cn/","Cookie":cook}});
var js=parseDomForHtml(get,".embed-responsive&&script&&Html").replace(/player_.*?={/,'player_data={');
eval(js);
var fro=player_data.from;
var urll=player_data.url;
if(urll.indexOf('m3u8')!=-1){
return urll;
}else if(fro=='bilibili'){
return urll;
}else{
if(urll.indexOf('html')!=-1){
  if(urll.indexOf('mgtv')!=-1){
var html=request('https://jx.renrenmi.cc/?url='+urll,{});
  }else{
var jiek='https://xcx.4v0r.cn/m3u8.php?url='+urll;
var html=request(jiek,{headers:{"Referer":"https://4v0r.cn/"}})
  };
}else{
var jiek='https://xcx.4v0r.cn/m3u8.php?url='+urll;
var html=request(jiek,{headers:{"Referer":"https://4v0r.cn/"}})
};
if(html.indexOf('片源无法解析')!=-1){
return 'toast://片源无法解析也无法播放哦~';
}else{
if(!fetch("hiker://files/rules/xyq/token.js",{})){
var fileUrl=fetch("https://cdn.jsdelivr.net/gh/lzk23559/Public_folder/token.js",{});
writeFile("hiker://files/rules/xyq/token.js",fileUrl);
eval(fileUrl);
}else{
var fileUrl=fetch("hiker://files/rules/xyq/token.js",{});
eval(fileUrl)
};
if(tkurl.indexOf('url=')!=-1){
return tkurl.split('url=')[1];
}else if(tkurl.indexOf('mgtv')!=-1){
return tkurl+';{Referer@https://www.mgtv.com/}';
}else{
return tkurl}
}
}
};
function lekanycl(){
var login=JSON.parse(fetchCookie('https://4v0r.cn/user/login.html', {headers:{'User-Agent':MOBILE_UA,'Content-Type':'application/x-www-form-urlencoded','Origin':'https://4v0r.cn'},body:cs,method:'POST',withHeaders:true})).join(';');
var b64E=base64Encode(login);
putVar2('lkyscook',b64E);
};
