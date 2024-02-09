let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

let background = Document.getElementById("background");
let title = document.createElement("map_title");
let data = document.createElement("map_data");
let hp = document.getElementById("hp");
let od = document.getElementById("od");

let h320 = document.getElementById("h320");
let h300 = document.getElementById("h300");
let h200 = document.getElementById("h200");
let h100 = document.getElementById("h100");
let h50 = document.getElementById("h50");
let h0 = document.getElementById("h0");

let t_title;
let t_data;
let t_hp;
let t_od;
let temp_path;
let state;

let t_h320;
let t_h300;
let t_h200;
let t_h100;
let t_h50;
let t_h0;

function display_section(){
  Main.style.opacity = 1;
}
socket.onmessage = event => {
  try {
    let data = JSON.parse(event.data);
    let menu = data.menu;
    let play = data.gameplay;

    if (state !== menu.state){
    state = menu.state;          
    if(state == 2){
        setTimeout(display_section, 1000);
    }
    else{
        section_2.style.opacity = 0;
    }        
  }

    /* song */
    if(t_title !== menu.bm.metadata.artist + ' - ' + menu.bm.metadata.title){
      t_title = menu.bm.metadata.artist + ' - ' + menu.bm.metadata.title;
      title.innerHTML = t_title;
      title.style.width = 'auto';
      let titleWidth = title.offsetWidth;
    }
    if(t_data !== menu.bm.metadata.mapper + "' " + menu.bm.metadata.diffculty){
      t_data = menu.bm.metadata.mapper + "' " + menu.bm.metadata.diffculty;
      data.innerHTML = t_data;
      data.style.width = 'auto';
      let dataWidth = data.offsetWidth;
    }
    
    /* hit counts */
    if (t_h320 !== play.hits.geki){
      t_h320 = play.hits.geki;
      h320.innerHTML = t_h320;
    }
    if (t_h300 !== play.hits[300]){
        t_h300 = play.hits[300];
        h300.innerHTML = t_h300;
    }
    if (t_h200 !== play.hits.katu){
        t_h200 = play.hits.katu;
        h200.innerHTML = t_h200;
    }
    if (t_h100 !== play.hits[100]){
        t_h100 = play.hits[100];
        h100.innerHTML = t_h100;
    }
    if (t_h50 !== play.hits[50]){
        t_h50 = play.hits[50];
        h50.innerHTML = t_h50;
    }
    if (t_h0 !== play.hits[0]){
        t_h0 = play.hits[0];
        h0.innerHTML = t_h0;
    }   

    /* map data */
    if(t_hp!= menu.bm.stats.HP){
      t_hp = menu.bm.stats.HP;
      hp.innerHTML = t_hp;
    }
    
    if(t_od!= menu.bm.stats.OD){
      t_od = menu.bm.stats.OD;
      od.innerHTML = t_od;
    }
     /*background img */
    if (temp_path !== menu.bm.path.full){
      temp_path = data.menu.bm.path.full;
      data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g, '%23').replace(/%/g, '%25').replace(/\'/g, '%27').replace(/\\/g, '/');
      background.style.backgroundImage = `url('http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}')`;
      background.style.backgroundPosition = "50% 50%";
    }	
    
  } catch (err) { console.log(err); };
}
