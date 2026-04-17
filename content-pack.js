/*
  Dead World content expansion pack.
  Purpose: add content only (locations, encounters, events, names, flavor text, quests).
  No mechanics or UI changes.
  Load this file AFTER the main game script.
*/
(function applyDeadWorldContentPack(){
  if(typeof window==='undefined') return;
  const hasCore = typeof LOCS!=='undefined' && typeof ROADS!=='undefined' && typeof WORLD_EVENTS!=='undefined';
  if(!hasCore) return;

  // ---------------------------------------------------------------------------
  // New locations + surrounding areas (using existing enemy/item ids only)
  // ---------------------------------------------------------------------------
  Object.assign(LOCS, {
    CDC: {
      n:"CDC Safe Zone", r:"Atlanta, Georgia", d:"A fortified research annex with locked labs and fading backup power.", e:"🧪", t:"facility",
      b:["safehouse","infirmary","workshop","trading_post"], f:"None", dg:2,
      sur:[
        {n:"Quarantine Wing", e:"🚪", d:"Barricades, blood trails, and sealed doors.", en:["walker","lurker","crawler"], lt:["antibiotics","medkit","bandage","batteries"]},
        {n:"Loading Dock", e:"📦", d:"Crates and biohazard waste.", en:["walker","bandit","raider"], lt:["supplies","water","scrap_metal","fuel"]}
      ]
    },
    Savannah: {
      n:"Savannah Port", r:"Georgia Coast", d:"A quiet harbor of rusted cargo ships and drifting dead.", e:"⚓", t:"ruins",
      b:["safehouse","trading_post","workshop"], f:"None", dg:2,
      sur:[
        {n:"Container Yard", e:"📦", d:"Narrow lanes between steel walls.", en:["walker","walker_fast","bandit"], lt:["canned_food","ammo","rope","scrap_metal"]},
        {n:"Ferry Terminal", e:"⛴", d:"Flooded halls and broken glass.", en:["walker","crawler","bloater"], lt:["water","salt","flashlight","medkit"]}
      ]
    },
    Charleston: {
      n:"Charleston Quarter", r:"South Carolina", d:"Historic streets, boarded homes, and armed enclaves.", e:"⛪", t:"settlement",
      b:["safehouse","trading_post","armory","alehouse"], f:"None", dg:2,
      sur:[
        {n:"Battery Seawall", e:"🌊", d:"Wave-battered stone and stranded walkers.", en:["walker","bloater","lurker"], lt:["fish","water","clothing","ammo"]},
        {n:"Market Ruins", e:"🛒", d:"Food stalls turned kill zones.", en:["raider","bandit","walker"], lt:["canned_food","fruit","bandage","supplies"]}
      ]
    },
    Nashville: {
      n:"Nashville Stronghold", r:"Tennessee", d:"Music City turned fortress of militia checkpoints.", e:"🎸", t:"fortress",
      b:["safehouse","armory","workshop","trading_post","infirmary"], f:"None", dg:3,
      sur:[
        {n:"Studio Row", e:"🎙", d:"Silent studios and echoing footsteps.", en:["walker","walker_fast","raider"], lt:["batteries","water","ammo","scrap_metal"]},
        {n:"Interstate Choke", e:"🛣", d:"Gridlocked highway and sniper nests.", en:["fighter","raider","armored_walker"], lt:["fuel","rifle","armor_vest","medkit"]}
      ]
    }
  });

  Object.assign(ROADS, {
    CDC:{Atlanta:1,Prison:2,Woodbury:2,ForestCamp:2},
    Savannah:{Atlanta:3,Charleston:2,Oceanside:3},
    Charleston:{Savannah:2,Oceanside:2,Alexandria:3},
    Nashville:{Prison:3,Hilltop:3,Sanctuary:3,CommonWealth:4}
  });

  // ---------------------------------------------------------------------------
  // Expand existing location flavor/areas without changing structure
  // ---------------------------------------------------------------------------
  if(LOCS.Atlanta?.sur){
    LOCS.Atlanta.sur.push(
      {n:"Underground MARTA",e:"🚇",d:"Dark tunnels. Bad air. Worse sounds.",en:["walker","crawler","lurker","walker_fast"],lt:["flashlight","batteries","ammo","water"]},
      {n:"Police Precinct",e:"🚔",d:"Lockers, cells, and last stands.",en:["walker","armored_walker","bandit"],lt:["pistol","ammo","riot_gear","bandage"]}
    );
  }

  if(LOCS.Alexandria?.sur){
    LOCS.Alexandria.sur.push(
      {n:"Water Treatment Plant",e:"🚰",d:"Critical infrastructure, now contested.",en:["walker","raider","lurker"],lt:["water","scrap_metal","batteries","pipe"]}
    );
  }

  if(LOCS.Kingdom?.sur){
    LOCS.Kingdom.sur.push(
      {n:"Abandoned Zoo",e:"🦁",d:"Cracked habitats and feral packs.",en:["wolf","walker","lurker"],lt:["deer_meat","rope","water","herbs"]}
    );
  }

  // ---------------------------------------------------------------------------
  // Names, roles, traits, backstories, dialogue pools
  // ---------------------------------------------------------------------------
  FM.push("Caleb","Jonah","Micah","Preston","Wyatt","Roman","Silas","Kieran","Bennett","Colt");
  FF.push("Naomi","Selene","Freya","Harper","Iris","Maeve","Kira","Raina","Delilah","Vera");
  LN.push("Hayes","Donovan","Keller","Bishop","Nolan","Cross","Parker","Lawson","Bennett","Serrano");
  ROLES.push("quartermaster","apothecary","fence runner","signal tech","beekeeper","generator tech");

  TRAITS.push(
    {t:'Resourceful',d:'Can salvage value from almost anything.'},
    {t:'Hotheaded',d:'Acts first, thinks later.'},
    {t:'Disciplined',d:'Follows plans under pressure.'},
    {t:'Protective',d:'Always shields weaker survivors.'},
    {t:'Superstitious',d:'Reads omens in everything.'}
  );

  BACKS.push(
    "Former paramedic. Still carries a trauma kit everywhere.",
    "Radio hobbyist who rebuilt a shortwave tower by hand.",
    "Restaurant owner. Knows rationing and logistics.",
    "National Guard deserter. Haunted but capable.",
    "Former sailor. Navigates by stars and shoreline."
  );

  RET_LINES.idle.Resourceful=["I can make this useful.","Don't throw that away.","Give me ten minutes and duct tape."];
  RET_LINES.idle.Hotheaded=["Let's hit them first.","Waiting gets people killed.","Point me at trouble."];
  RET_LINES.idle.Disciplined=["Routine keeps us alive.","Weapons checked. Perimeter checked.","We stick to the plan."];
  RET_LINES.camp.Resourceful=["I patched the water filter.","Fire's efficient tonight.","I fixed two broken tools."];
  RET_LINES.combat_start.Hotheaded=["Finally!","No more running.","I'm taking point."];

  // ---------------------------------------------------------------------------
  // Travel scenes + daily/world events
  // ---------------------------------------------------------------------------
  TSCENES.push(
    {e:"🛢",l:["A fuel truck lies overturned.","The air smells like diesel and rot.","One spark could end this road."]},
    {e:"📻",l:["A radio crackles with half a sentence.","Someone repeats coordinates, then static.","You hear a child's voice, then silence."]},
    {e:"🌁",l:["Fog smothers the road.","Shapes move inside the mist.","Every sound feels close."]},
    {e:"🦅",l:["A hawk circles overhead.","Carrion birds point to trouble.","Feathers and bones line the ditch."]}
  );

  WORLD_EVENTS.push(
    {type:'bridge_collapse',title:'Bridge collapse near {loc}',desc:'A key crossing has fallen, stranding caravans and refugees.',duration:12},
    {type:'ammo_cache',title:'Ammo cache rumor in {loc}',desc:'Scouts report sealed military crates in an underground depot.',duration:9},
    {type:'plague_animals',title:'Rabid animals near {region}',desc:'Feral packs are attacking camps at night.',duration:10},
    {type:'water_poison',title:'Water contamination at {loc}',desc:'A tainted reservoir is making survivors sick.',duration:14},
    {type:'radio_net',title:'New relay network from {loc}',desc:'A patched radio network links distant communities.',duration:16}
  );

  // ---------------------------------------------------------------------------
  // Quest templates using existing quest mechanics
  // ---------------------------------------------------------------------------
  QTPL.push(
    {id:'qz',n:'Silent Sweep',d:'Clear lurkers around {loc}. Eliminate {count}.',t:'kill',kt:'lurker',kc:[2,5],rg:[20,40],rx:[16,28]},
    {id:'qw',n:'Broken Fence',d:'A walker breach threatens {loc}. Destroy {count}.',t:'kill',kt:'walker',kc:[6,12],rg:[28,52],rx:[20,36]},
    {id:'qp',n:'Courier Route',d:'Carry a sealed message to {dest}. No detours.',t:'travel',rg:[18,34],rx:[14,24]},
    {id:'qd',n:'Dog Pack Hunt',d:'Feral dogs stalk survivors near {loc}. Kill {count}.',t:'kill',kt:'wolf',kc:[2,4],rg:[24,44],rx:[18,30]}
  );

  // ---------------------------------------------------------------------------
  // Building ambiance lines only (content expansion)
  // ---------------------------------------------------------------------------
  if(BLDS.safehouse?.am){
    BLDS.safehouse.am.push('Maps and route notes cover one wall.','A hand-painted sign reads: STAY QUIET, STAY ALIVE.');
  }
  if(BLDS.trading_post?.am){
    BLDS.trading_post.am.push('A chalkboard tracks prices by the hour.','Two guards watch every deal.');
  }
  if(BLDS.infirmary?.am){
    BLDS.infirmary.am.push('Someone boils water over a camping stove.','A shelf of scavenged painkillers sits under lock.');
  }

})();
