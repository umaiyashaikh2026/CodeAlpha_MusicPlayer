const tracks=[
{title:'song 1 (1)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 01",year:"2026",src:"music/song 1 (1).mp3",duration:"00:00"},
{title:'song 1 (2)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 02",year:"2026",src:"music/song 1 (2).mp3",duration:"00:00"},
{title:'song 1 (3)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 03",year:"2026",src:"music/song 1 (3).mp3",duration:"00:00"},
{title:'song 1 (4)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 04",year:"2026",src:"music/song 1 (4).mp3",duration:"00:00"},
{title:'song 1 (5)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 05",year:"2026",src:"music/song 1 (5).mp3",duration:"00:00"},
{title:'song 1 (6)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 06",year:"2026",src:"music/song 1 (6).mp3",duration:"00:00"},
{title:'song 1 (7)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 07",year:"2026",src:"music/song 1 (7).mp3",duration:"00:00"},
{title:'song 1 (8)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 08",year:"2026",src:"music/song 1 (8).mp3",duration:"00:00"},
{title:'song 1 (9)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 09",year:"2026",src:"music/song 1 (9).mp3",duration:"00:00"},
{title:'song 1 (10)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 10",year:"2026",src:"music/song 1 (10).mp3",duration:"00:00"},
{title:'song 1 (11)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 11",year:"2026",src:"music/song 1 (11).mp3",duration:"00:00"},
{title:'song 1 (12)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 12",year:"2026",src:"music/song 1 (12).mp3",duration:"00:00"},
{title:'song 1 (13)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 13",year:"2026",src:"music/song 1 (13).mp3",duration:"00:00"},
{title:'song 1 (14)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 14",year:"2026",src:"music/song 1 (14).mp3",duration:"00:00"},
{title:'song 1 (15)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 15",year:"2026",src:"music/song 1 (15).mp3",duration:"00:00"},
{title:'song 1 (16)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 16",year:"2026",src:"music/song 1 (16).mp3",duration:"00:00"},
{title:'song 1 (17)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 17",year:"2026",src:"music/song 1 (17).mp3",duration:"00:00"},
{title:'song 1 (18)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 18",year:"2026",src:"music/song 1 (18).mp3",duration:"00:00"},
{title:'song 1 (19)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 19",year:"2026",src:"music/song 1 (19).mp3",duration:"00:00"},
{title:'song 1 (20)',artist:"LOCAL LIBRARY",kicker:"NIGHT DRIVE / 20",year:"2026",src:"music/song 1 (20).mp3",duration:"00:00"}];
const $=id=>document.getElementById(id),audio=$("audio");let index=0,shuffled=false,repeating=false;
const fmt=s=>{if(!Number.isFinite(s))return"00:00";return String(Math.floor(s/60)).padStart(2,"0")+":"+String(Math.floor(s%60)).padStart(2,"0")};
function render(){ $("queueCount").textContent=String(tracks.length).padStart(2,"0"); $("trackTotal").textContent=String(tracks.length).padStart(2,"0"); $("playlist").innerHTML=tracks.map((t,i)=>`<div class="song ${i===index?"active":""}" data-i="${i}"><span class="song-number">${String(i+1).padStart(2,"0")}</span><div><div class="song-title">${t.title}</div><div class="song-artist">${t.artist}</div></div><span class="song-duration">${t.duration}</span></div>`).join("");document.querySelectorAll(".song").forEach(x=>x.onclick=()=>load(+x.dataset.i,true))}
function load(i,auto=false){index=(i+tracks.length)%tracks.length;let t=tracks[index];audio.src=t.src;$("trackNumber").textContent=String(index+1).padStart(2,"0");$("trackKicker").textContent=t.kicker;$("trackArtist").textContent=t.artist;$("labelYear").textContent=t.year;let words=t.title.split(" ");$("trackTitle").innerHTML=words.length>1?words.slice(0,-1).join(" ")+"<br><em>"+words.at(-1)+"</em>":t.title;$("duration").textContent=t.duration;$("currentTime").textContent="00:00";$("seekBar").value=0;render();if(auto)play()}
async function play(){try{await audio.play();set(true)}catch{set(false)}}
function set(v){$("playBtn").textContent=v?"Ⅱ":"▶";$("statusText").textContent=v?"PLAYING":"PAUSED";$("recordWrap").classList.toggle("playing",v);document.querySelector(".now-playing").classList.toggle("playing",v)}
function next(){if(shuffled){let n;do n=Math.floor(Math.random()*tracks.length);while(tracks.length>1&&n===index);load(n,true)}else load(index+1,true)}
$("playBtn").onclick=()=>audio.paused?play():(audio.pause(),set(false));$("nextBtn").onclick=next;$('prevBtn').onclick=()=>audio.currentTime>4?audio.currentTime=0:load(index-1,true);
audio.ontimeupdate=()=>{$("seekBar").value=audio.duration?audio.currentTime/audio.duration*100:0;$("currentTime").textContent=fmt(audio.currentTime);$("statusClock").textContent=fmt(audio.currentTime)};
audio.onloadedmetadata=()=>$("duration").textContent=fmt(audio.duration);audio.onended=()=>repeating?(audio.currentTime=0,play()):next();
$("seekBar").oninput=e=>{if(audio.duration)audio.currentTime=e.target.value/100*audio.duration};
$("volumeBar").oninput=e=>{audio.volume=+e.target.value;$("volumeValue").textContent=Math.round(audio.volume*100);$("muteBtn").textContent=audio.volume===0?"MUTE":"VOL"};
$("muteBtn").onclick=()=>{audio.muted=!audio.muted;$("muteBtn").textContent=audio.muted?"MUTED":"VOL"};
$("shuffleBtn").onclick=()=>{shuffled=!shuffled;$("shuffleBtn").classList.toggle("active",shuffled)};$("repeatBtn").onclick=()=>{repeating=!repeating;$("repeatBtn").classList.toggle("active",repeating)};
$("queueToggle").onclick=()=>$("queue").classList.add("open");$("closeQueue").onclick=()=>$("queue").classList.remove("open");
document.onkeydown=e=>{if(e.target.matches("input"))return;if(e.code==="Space"){e.preventDefault();audio.paused?play():($("audio").pause(),set(false))}if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")$("prevBtn").click();if(e.key==="ArrowUp"){e.preventDefault();$("volumeBar").value=Math.min(1,+$("volumeBar").value+.05);$("volumeBar").dispatchEvent(new Event("input"))}if(e.key==="ArrowDown"){e.preventDefault();$("volumeBar").value=Math.max(0,+$("volumeBar").value-.05);$("volumeBar").dispatchEvent(new Event("input"))}};
audio.volume=.72;load(0);
