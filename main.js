function pageStartup() {
    
	initList('poke1choice');
	initList('poke2choice');
	initList('poke3choice');
	initList('poke4choice');
	initList('poke5choice');
	initList('poke6choice');
	changePic(document.getElementById('poke1choice'));
	changePic(document.getElementById('poke2choice'));
	changePic(document.getElementById('poke3choice'));
	changePic(document.getElementById('poke4choice'));
	changePic(document.getElementById('poke5choice'));
	changePic(document.getElementById('poke6choice'));
	AvgStatCalc();
	getMovelist('poke1choice');
	getMovelist('poke2choice');
	getMovelist('poke3choice');
	getMovelist('poke4choice');
	getMovelist('poke5choice');
	getMovelist('poke6choice');
	randomMove('poke1');
	randomMove('poke2');
	randomMove('poke3');
	randomMove('poke4');
	randomMove('poke5');
	randomMove('poke6');
	getAbilities(document.getElementById('poke1choice'));
	getAbilities(document.getElementById('poke2choice'));
	getAbilities(document.getElementById('poke3choice'));
	getAbilities(document.getElementById('poke4choice'));
	getAbilities(document.getElementById('poke5choice'));
	getAbilities(document.getElementById('poke6choice'));
	getStrengths();
	getWeaknesses();
	getChecklist();
	getItems(document.getElementById('poke1item'));
	getItems(document.getElementById('poke2item'));
	getItems(document.getElementById('poke3item'));
	getItems(document.getElementById('poke4item'));
	getItems(document.getElementById('poke5item'));
	getItems(document.getElementById('poke6item'));
	getPresets();
	
	
  } 
  
function checkfilled() {
    if(document.getElementById('submittextname').value !== '' && document.getElementById('submitteamtext').value !== ''){
     document.getElementById('confirmteamsubmit').disabled = false;     
    }else{
     document.getElementById('confirmteamsubmit').disabled = true;  
    }

}

function highlightText(element) {
	element.select();
}


function makeShiny(img) {
	if(document.getElementById('poke1choice').disabled===false){
		var testvar = img.src;
		for(i = testvar.length - 1; i > 0; i--) {
			if(testvar[i] === '/') {
				var nameExtract = testvar.substr(i+1,testvar.length);
                if (startsWith(img.src, "https://play.pokemonshowdown.com/sprites/ani/")) {
                    img.src = "https://play.pokemonshowdown.com/sprites/ani-shiny/" + nameExtract;
                }
                else if (startsWith(img.src, "https://play.pokemonshowdown.com/sprites/ani-shiny/")) {
                    img.src = "https://play.pokemonshowdown.com/sprites/ani/" + nameExtract;
                }
                else if (startsWith(img.src, "https://pyrotoz.com/shinymodels/")) {
                    img.src = "https://pyrotoz.com/models/" + nameExtract;
                }
                else if (startsWith(img.src, "https://pyrotoz.com/models/")) {
                    img.src = "https://pyrotoz.com/shinymodels/" + nameExtract;
                }
                else if (startsWith(img.src, "https://pyrotoz.com/bwmodels/")) {
                    img.src = "https://pyrotoz.com/bwshinymodels/" + nameExtract;
                }
                else if (startsWith(img.src, "https://pyrotoz.com/bwshinymodels/")) {
                    img.src = "https://pyrotoz.com/bwmodels/" + nameExtract;
                }
                else if (startsWith(img.src, "https://play.pokemonshowdown.com/sprites/gen5/")) {
                    img.src = "https://play.pokemonshowdown.com/sprites/gen5-shiny/" + nameExtract;
                }
                else if (startsWith(img.src, "https://play.pokemonshowdown.com/sprites/gen5-shiny/")) {
                    img.src = "https://play.pokemonshowdown.com/sprites/gen5/" + nameExtract;
                }
				
				break;
			}
		}
	}
}

function showAvgStats() {
	var avgText = "Average stats of team:\n\n";
	
	avgText += "HP: " + ((parseFloat(document.getElementById('hpbar').style.width))*255/80).toFixed(1);
	avgText += "\nAttack: " + ((parseFloat(document.getElementById('atkbar').style.width))*190/80).toFixed(1);
	avgText += "\nDefense: " + ((parseFloat(document.getElementById('defbar').style.width))*230/80).toFixed(1);
	avgText += "\nSpecial Attack: " + ((parseFloat(document.getElementById('spattbar').style.width))*194/80).toFixed(1);
	avgText += "\nSpecial Defense: " + ((parseFloat(document.getElementById('spdefbar').style.width))*230/80).toFixed(1);
	avgText += "\nSpeed: " + ((parseFloat(document.getElementById('speedbar').style.width))*180/80).toFixed(1);
	document.getElementById('statzoneleft').title=avgText;
}

function getPresets() {
	var targetbox="";
	
	for(elem in PresetTeams) {
		if(PresetTeams[elem].tier === 'UU') targetbox=document.getElementById('UUTeams');
		if(PresetTeams[elem].tier === 'NU') targetbox=document.getElementById('NUTeams');
		if(PresetTeams[elem].tier === 'RU') targetbox=document.getElementById('RUTeams');
		if(PresetTeams[elem].tier === 'Ubers') targetbox=document.getElementById('ubersTeams');
		if(PresetTeams[elem].tier === 'OU') targetbox=document.getElementById('OUTeams');
		if(PresetTeams[elem].tier === 'PU') targetbox=document.getElementById('PUTeams');
		if(PresetTeams[elem].tier === 'ZU') targetbox=document.getElementById('ZUTeams');
		
		var newOption = document.createElement("option");
		newOption.text = PresetTeams[elem].name;
		targetbox.add(newOption);
	}
	sortSelect(document.getElementById('ubersTeams'));
	sortSelect(document.getElementById('OUTeams'));
	sortSelect(document.getElementById('UUTeams'));
	sortSelect(document.getElementById('RUTeams'));
	sortSelect(document.getElementById('NUTeams'));
	sortSelect(document.getElementById('PUTeams'));
	sortSelect(document.getElementById('ZUTeams'));
}

function selectPreset(selector) {
	var tempvalue = selector.value;
	document.getElementById('ubersTeams').value = '(Ubers)';
	document.getElementById('OUTeams').value = '(OU)';
	document.getElementById('UUTeams').value = '(UU)';
	document.getElementById('RUTeams').value = '(RU)';
	document.getElementById('NUTeams').value = '(NU)';
	document.getElementById('PUTeams').value = '(PU)';
	document.getElementById('ZUTeams').value = '(ZU)';
	selector.value = tempvalue;
	for(elem in PresetTeams) {
		if(PresetTeams[elem].name===selector.value){
			document.getElementById('exporttext').value = PresetTeams[elem].data;
			var temphold = PresetTeams[elem].data;
			doImport();
			presetTeams();
			document.getElementById('presettext').innerHTML = temphold;
		}
	}
}

function getAbilities(pokechoice) {
	var abillist = [];
	var listOfMoves = [];
	
    if (document.getElementById('tierChoice').value !== 'Hackmons') {
        var elem = compress(pokechoice.value.toLowerCase());

		for(elem1 in BattlePokedex[elem].abilities) {
			if (!(contains(BattlePokedex[elem].types,'Ground') && BattlePokedex[elem].abilities[elem1] === 'Lightning Rod')){
				abillist.push(BattlePokedex[elem].abilities[elem1]);
			}
		}

	}
	else {
		for(elem2 in BattleAbilities) {
			abillist.push(BattleAbilities[elem2].name);
		}
	}
	
	
	//Determine which Pokemon slot you are referring to
	//Also store the movelist in an array for ability determination
	
	switch(pokechoice) {
		case document.getElementById('poke1choice'):
			targetAdd = document.getElementById('poke1ability');
			listOfMoves.push(document.getElementById('poke1move1').value);
			listOfMoves.push(document.getElementById('poke1move2').value);
			listOfMoves.push(document.getElementById('poke1move3').value);
			listOfMoves.push(document.getElementById('poke1move4').value);
			break;
		case document.getElementById('poke2choice'):
			targetAdd = document.getElementById('poke2ability');
			listOfMoves.push(document.getElementById('poke2move1').value);
			listOfMoves.push(document.getElementById('poke2move2').value);
			listOfMoves.push(document.getElementById('poke2move3').value);
			listOfMoves.push(document.getElementById('poke2move4').value);
			break;
		case document.getElementById('poke3choice'):
			targetAdd = document.getElementById('poke3ability');
			listOfMoves.push(document.getElementById('poke3move1').value);
			listOfMoves.push(document.getElementById('poke3move2').value);
			listOfMoves.push(document.getElementById('poke3move3').value);
			listOfMoves.push(document.getElementById('poke3move4').value);
			break;
		case document.getElementById('poke4choice'):
			targetAdd = document.getElementById('poke4ability');
			listOfMoves.push(document.getElementById('poke4move1').value);
			listOfMoves.push(document.getElementById('poke4move2').value);
			listOfMoves.push(document.getElementById('poke4move3').value);
			listOfMoves.push(document.getElementById('poke4move4').value);
			break;
		case document.getElementById('poke5choice'):
			targetAdd = document.getElementById('poke5ability');
			listOfMoves.push(document.getElementById('poke5move1').value);
			listOfMoves.push(document.getElementById('poke5move2').value);
			listOfMoves.push(document.getElementById('poke5move3').value);
			listOfMoves.push(document.getElementById('poke5move4').value);
			break;
		case document.getElementById('poke6choice'):
			targetAdd = document.getElementById('poke6ability');
			listOfMoves.push(document.getElementById('poke6move1').value);
			listOfMoves.push(document.getElementById('poke6move2').value);
			listOfMoves.push(document.getElementById('poke6move3').value);
			listOfMoves.push(document.getElementById('poke6move4').value);
			break;
	}
	
	
	var oldcount = targetAdd.length;
	
	for(i = 0; i < abillist.length; i++) {
		var newOption = document.createElement("option");
		newOption.text = abillist[i];
		targetAdd.add(newOption);
	}
	
	
	var randAbil = oldcount + (Math.floor(Math.random()*(abillist.length)));
	targetAdd.selectedIndex = randAbil;
	
	
	for(i = 0; i < oldcount; i++) {
		targetAdd.remove(targetAdd[i]);
	}
	
	//Fix to make sure an OLD ability is not present (mainly mobile issue)
	for(i = 0; i < targetAdd.length; i++) {
		if(!contains(abillist,targetAdd[i].value)) {
			targetAdd.remove[targetAdd[i]];
		}
	}
	
	
	sortSelect(targetAdd);
	
	
	//Choose either a random ability or the most viable
	if(document.getElementById('viableChoice').value !== 'Random') {
		var abilArray = [];
		var abilMax = -10;
		var abilFinal = [];
		
		
		for(elem in BattleAbilities) {
			for(i = 0; i < targetAdd.length; i++) {
				if((targetAdd[i].value === BattleAbilities[elem].name) && (targetAdd[i].value !== 'Moody')) {
					abilArray.push(elem);
					if(BattleAbilities[elem].rating > abilMax) abilMax = BattleAbilities[elem].rating;
				}
			}
		}
		for(j = 0; j < abilArray.length; j++) {
			if(BattleAbilities[abilArray[j]].rating >= abilMax) {
				abilFinal.push(BattleAbilities[abilArray[j]]);
			}
		}
		randAbil = abilFinal[Math.floor(Math.random()*(abilFinal.length))];
		targetAdd.value = randAbil.name;
		
		if(pokechoice.value === 'Scorbunny') targetAdd.value = 'Blaze';
		if(pokechoice.value === 'Raboot') targetAdd.value = 'Blaze';
		if(pokechoice.value === 'Cinderace') targetAdd.value = 'Blaze';
		if(pokechoice.value === 'Grookey') targetAdd.value = 'Overgrow';
		if(pokechoice.value === 'Thwackey') targetAdd.value = 'Overgrow';
		if(pokechoice.value === 'Rillaboom') targetAdd.value = 'Overgrow';
		if(pokechoice.value === 'Sobble') targetAdd.value = 'Torrent';
		if(pokechoice.value === 'Drizzile') targetAdd.value = 'Torrent';
		if(pokechoice.value === 'Inteleon') targetAdd.value = 'Torrent';
		if(pokechoice.value === 'Zygarde') targetAdd.value = 'Aura Break';
		if(pokechoice.value === 'Zygarde-10%') targetAdd.value = 'Aura Break';
		if(pokechoice.value === 'Dustox') targetAdd.value = 'Shield Dust';
		if(startsWith(pokechoice.value,'Gourgeist')) targetAdd.value = 'Frisk';
		if(startsWith(pokechoice.value,'Pumpkaboo')) targetAdd.value = 'Frisk';
		if(pokechoice.value === 'Smeargle') targetAdd.value = 'Own Tempo';
		if(pokechoice.value === 'Passimian') targetAdd.value = 'Receiver';
		if(pokechoice.value === 'Raikou') targetAdd.value = 'Pressure';
		if(pokechoice.value === 'Entei') targetAdd.value = 'Pressure';
		if(pokechoice.value === 'Suicune') targetAdd.value = 'Pressure';
		if(pokechoice.value === 'Moltres') targetAdd.value = 'Flame Body';
		if(pokechoice.value === 'Piplup') targetAdd.value = 'Torrent';
		if(pokechoice.value === 'Prinplup') targetAdd.value = 'Torrent';
		if(pokechoice.value === 'Empoleon') targetAdd.value = 'Torrent';
		if(pokechoice.value === 'Snorunt') targetAdd.value = 'Inner Focus';
		if(pokechoice.value === 'Rhyperior') targetAdd.value = 'Solid Rock';
		if(pokechoice.value === 'Glalie') targetAdd.value = 'Inner Focus';
		if(pokechoice.value === 'Braviary') targetAdd.value = 'Defiant';
		if(pokechoice.value === 'Ambipom') targetAdd.value = 'Technician';
		if(pokechoice.value === 'Watchog' || pokechoice.value === 'Patrat') targetAdd.value = 'Analytic';
		if(pokechoice.value === 'Raticate' || pokechoice.value === 'Rattata') {
			targetAdd.value = 'Guts';
		}
		if(pokechoice.value === 'Geodude' || pokechoice.value === 'Graveler' || pokechoice.value === 'Golem') {
			targetAdd.value = 'Sturdy';
		}
		if(pokechoice.value === 'Remoraid' || pokechoice.value === 'Octillery') {
			targetAdd.value = 'Sniper';
		}
		if(pokechoice.value === 'Dusclops' || pokechoice.value === 'Dusknoir') {
			targetAdd.value = 'Frisk';
		}
		if(pokechoice.value === 'Ponyta' || pokechoice.value === 'Rapidash') {
			var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Flash Fire';
				}
				else {
					targetAdd.value = 'Flame Body';
				}
		}
		if(pokechoice.value === 'Meowstic-F') {
			var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Infiltrator';
				}
				else {
					targetAdd.value = 'Competitive';
				}
		}
		if(pokechoice.value === 'Gothita' || pokechoice.value === 'Gothorita' || pokechoice.value === 'Gothitelle') {
			var ranNum = Math.floor(Math.random()*3);
				if(ranNum === 0) {
					targetAdd.value = 'Frisk';
				}
				else {
					targetAdd.value = 'Competitive';
				}
		}
		if(pokechoice.value === 'Gulpin' || pokechoice.value === 'Swalot') {
			var ranNum = Math.floor(Math.random()*3);
				if(ranNum === 0) {
					targetAdd.value = 'Liquid Ooze';
				}
				else {
					targetAdd.value = 'Sticky Hold';
				}
		}
		if(pokechoice.value === 'Deerling' || pokechoice.value === 'Sawsbuck') {
			targetAdd.value = 'Sap Sipper';
		}
		if(pokechoice.value === 'Vanillite' || pokechoice.value === 'Vanillish' || pokechoice.value === 'Vanilluxe') {
			targetAdd.value = 'Weak Armor';
		}
		if(pokechoice.value === 'Buizel' || pokechoice.value === 'Floatzel') {
			targetAdd.value = 'Water Veil';
		}
		if(pokechoice.value === 'Wynaut' || pokechoice.value === 'Wobbuffet') {
			targetAdd.value = 'Telepathy';
		}
		if(pokechoice.value === 'Seel' || pokechoice.value === 'Dewgong') {
			targetAdd.value = 'Thick Fat';
		}
		if(pokechoice.value === 'Spheal' || pokechoice.value === 'Sealeo' || pokechoice.value === 'Walrein') {
			targetAdd.value = 'Thick Fat';
		}
		if(pokechoice.value === 'Staravia' || pokechoice.value === 'Staraptor') {
			if(contains(listOfMoves,'Brave Bird') || contains(listOfMoves,'Double-Edge')) {
				var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Reckless';
				}
				else {
					targetAdd.value = 'Intimidate';
				}
			}
			else {
				targetAdd.value = 'Intimidate';
			}
		}
		if(pokechoice.value === 'Krabby' || pokechoice.value === 'Kingler') {
			if(contains(listOfMoves,'Rock Slide')) {
				targetAdd.value = 'Sheer Force';
			}
			else {
				var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Shell Armor';
				}
				else {
					targetAdd.value = 'Hyper Cutter';
				}
			}
		}
		if(pokechoice.value === 'Sunkern' || pokechoice.value === 'Sunflora') {
			if(contains(listOfMoves,'Sunny Day')) {
				var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Chlorophyll';
				}
				else {
					targetAdd.value = 'Solar Power';
				}
			}
			else {
				targetAdd.value = 'Early Bird';
			}
		} 
		if(pokechoice.value === 'Mr. Mime' || pokechoice.value === 'Mime Jr.') {
			if(contains(listOfMoves,'Hidden Power Fighting')) {
				targetAdd.value = 'Technician';
			}
			else {
				var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Filter';
				}
				else {
					targetAdd.value = 'Soundproof';
				}
			}
		}
		if(pokechoice.value === 'Relicanth') {
			if(contains(listOfMoves,'Head Smash') || contains(listOfMoves,'Double-Edge')) {
				targetAdd.value = 'Rock Head';
			}
			else {
				targetAdd.value = 'Sturdy';
			}
		}
		if(pokechoice.value === 'Beheeyem' || pokechoice.value === 'Elgyem') {
			if(contains(listOfMoves,'Trick Room')) {
				targetAdd.value = 'Synchronize';
			}
			else {
				targetAdd.value = 'Analytic';
			}
		}
		if(pokechoice.value === 'Persian') {
			if(contains(listOfMoves,'Fake Out')) {
				targetAdd.value = 'Technician';
			}
			else {
				targetAdd.value = 'Limber';
			}
		}
		if(pokechoice.value === 'Butterfree') {
			var ranNum = Math.floor(Math.random()*2);
			if(contains(listOfMoves,'Sleep Powder') && (ranNum === 0)) {
				targetAdd.value = 'Compound Eyes';
			}
			else {
				targetAdd.value = 'Tinted Lens';
			}
		}
		if(pokechoice.value === 'Hoothoot' || pokechoice.value === 'Noctowl') {
			var ranNum = Math.floor(Math.random()*2);
			if(contains(listOfMoves,'Air Slash') && (ranNum === 0)) {
				targetAdd.value = 'Tinted Lens';
			}
			else {
				targetAdd.value = 'Insomnia';
			}
		}
		if(pokechoice.value === 'Chimchar' || pokechoice.value === 'Monferno' || pokechoice.value === 'Infernape') {
			if(contains(listOfMoves,'Mach Punch') || contains(listOfMoves,'Fire Punch') || contains(listOfMoves,'Thunder Punch')) {
				targetAdd.value = 'Iron Fist';
			}
			else {
				targetAdd.value = 'Blaze';
			}
		}
		if(pokechoice.value === 'Flareon') {
			if(contains(listOfMoves,'Facade')) {
				targetAdd.value = 'Guts';
			}
		}
		if(pokechoice.value === 'Luxray' || pokechoice.value === 'Luxio' || pokechoice.value === 'Shinx') {
			if(contains(listOfMoves,'Facade')) {
				targetAdd.value = 'Guts';
			}
			else {
				var ranNum = Math.floor(Math.random()*2);
				if(ranNum === 0) {
					targetAdd.value = 'Guts';
				}
				else {
					targetAdd.value = 'Intimidate';
				}
			}
		}
		if(pokechoice.value === 'Hitmonlee') {
			if(contains(listOfMoves,'Fake Out')) {
				targetAdd.value = 'Unburden';
			}
			else {
				if(contains(listOfMoves,'High Jump Kick')) {
					targetAdd.value = 'Reckless';
				}
				else {
					targetAdd.value = 'Limber';
				}
			}
		}
		if(pokechoice.value === 'Hawlucha') {
			if(contains(listOfMoves,'Substitute')) {
				targetAdd.value = 'Unburden';
			}
			else {
				targetAdd.value = 'Limber';
			}
		}
		if(pokechoice.value === 'Hitmontop') {
			var ranNum = Math.floor(Math.random()*2);
			if(contains(listOfMoves,'Mach Punch') || contains(listOfMoves,'Bullet Punch')) {
				if(ranNum === 0) {
					targetAdd.value = 'Technician';
				}
				else {
					targetAdd.value = 'Intimidate';
				}
			}
			else {
				targetAdd.value = 'Intimidate';
			}
		}
		if(pokechoice.value === 'Tyrantrum') {
			if(contains(listOfMoves,'Head Smash')) {
				targetAdd.value = 'Rock Head';
			}
			else {
				targetAdd.value = 'Strong Jaw';
			}
		}
		if(pokechoice.value === 'Zapdos') {
			if(contains(listOfMoves,'Defog')) {
				targetAdd.value = 'Pressure';
			}
			else {
				targetAdd.value = 'Static';
			}
		}
		if(pokechoice.value === 'Machop' || pokechoice.value === 'Machoke' || pokechoice.value === 'Machamp') {
			if(contains(listOfMoves,'Dynamic Punch')) {
				targetAdd.value = 'No Guard';
			}
			else {
				targetAdd.value = 'Guts';
			}
		}
		if(pokechoice.value === 'Swirlix' || pokechoice.value === 'Slurpuff') {
			if(contains(listOfMoves,'Belly Drum')) {
				targetAdd.value = 'Unburden';
			}
			else {
				targetAdd.value = 'Sweet Veil';
			}
		}
		if(pokechoice.value === 'Swoobat' || pokechoice.value === 'Woobat') {
			if(contains(listOfMoves,'Calm Mind') || contains(listOfMoves,'Amnesia')) {
				targetAdd.value = 'Simple';
			}
			else {
				targetAdd.value = 'Unaware';
			}
		}
		if(pokechoice.value === 'Cinccino') {
			if(contains(listOfMoves,'Wake-Up Slap')) {
				var ranNum = Math.floor(Math.random()*3);
				if(ranNum === 0) {
					targetAdd.value = 'Technician';
				}
				else {
					targetAdd.value = 'Skill Link';
				}
			}
			else {
				targetAdd.value = 'Skill Link';
			}
		}
		if(pokechoice.value === 'Druddigon') {
			var ranNum = Math.floor(Math.random()*2);
			var ranNum2 = Math.floor(Math.random()*2);
			if(contains(listOfMoves, "Thunder Punch") || contains(listOfMoves, "Fire Punch") || contains(listOfMoves, "Gunk Shot")) {
				if(ranNum === 0) {
					targetAdd.value = 'Sheer Force';
				}
				else {
					if(ranNum2 === 0 && contains(listOfMoves,'Earthquake')) {
						targetAdd.value = 'Mold Breaker';
					}
					else {
						targetAdd.value = 'Rough Skin';
					}
				}
			}
			else {
					if(ranNum2 === 0 && contains(listOfMoves,'Earthquake')) {
						targetAdd.value = 'Mold Breaker';
					}
					else {
						targetAdd.value = 'Rough Skin';
					}
			}
			
		}
		if(pokechoice.value === 'Wooper' || pokechoice.value === 'Quagsire') {
			targetAdd.value = 'Unaware';
		}
		if(pokechoice.value === 'Conkeldurr' || pokechoice.value === 'Gurdurr' || pokechoice.value === 'Timburr') {
			var ranNum = Math.floor(Math.random()*4);
			if(ranNum!==0)targetAdd.value = 'Guts';
		}
		if(pokechoice.value === 'Chinchou' || pokechoice.value === 'Lanturn') {
			var ranNum = Math.floor(Math.random()*4);
			if(ranNum!==0)targetAdd.value = 'Volt Absorb';
			if(ranNum===0)targetAdd.value = 'Water Absorb';
		}
		if(pokechoice.value === 'Purugly') {
			var ranNum = Math.floor(Math.random()*4);
			if(ranNum!==0)targetAdd.value = 'Defiant';
			if(ranNum===0)targetAdd.value = 'Thick Fat';
		}
		if(pokechoice.value === 'Makuhita' || pokechoice.value === 'Hariyama') {
			var ranNum = Math.floor(Math.random()*2);
			if(ranNum!==0)targetAdd.value = 'Thick Fat';
			if(ranNum===0)targetAdd.value = 'Guts';
		}
		if(pokechoice.value === 'Magby' || pokechoice.value === 'Magmar' || pokechoice.value === 'Magmortar') {
			var ranNum = Math.floor(Math.random()*2);
			if(ranNum!==0)targetAdd.value = 'Vital Spirit';
			if(ranNum===0)targetAdd.value = 'Flame Body';
		}
		if(pokechoice.value === 'Magnemite' || pokechoice.value === 'Magneton' || pokechoice.value === 'Magnezone') {
			var ranNum = Math.floor(Math.random()*2);
			if(ranNum!==0)targetAdd.value = 'Magnet Pull';
			if(ranNum===0)targetAdd.value = 'Analytic';
		}
		if(pokechoice.value === 'Snover' || pokechoice.value === 'Abomasnow') {
			var ranNum = Math.floor(Math.random()*2);
			if(ranNum!==0)targetAdd.value = 'Snow Warning';
			if(ranNum===0)targetAdd.value = 'Soundproof';
		}
		if(pokechoice.value === 'Pyroar' || pokechoice.value === 'Litleo') {
			var ranNum = Math.floor(Math.random()*4);
			if(ranNum!==0)targetAdd.value = 'Unnerve';
			if(ranNum===0)targetAdd.value = 'Rivalry';
		}
		if(pokechoice.value === 'Politoed' && (document.getElementById('tierChoice').value!=='Ubers' && document.getElementById('tierChoice').value!=='OU')) {
			targetAdd.value = 'Water Absorb';
		}
		if(pokechoice.value === 'Ninetales' && (document.getElementById('tierChoice').value!=='Ubers' && document.getElementById('tierChoice').value!=='OU')) {
			targetAdd.value = 'Flash Fire';
		}
		if(pokechoice.value === 'Vulpix' && (document.getElementById('tierChoice').value!=='Ubers' && document.getElementById('tierChoice').value!=='OU')) {
			targetAdd.value = 'Flash Fire';
		}
		if(pokechoice.value === 'Pelipper' && (document.getElementById('tierChoice').value!=='Ubers' && document.getElementById('tierChoice').value!=='OU')) {
			targetAdd.value = 'Keen Eye';
		}
		if(pokechoice.value === 'Torkoal' && (document.getElementById('tierChoice').value!=='Ubers' && document.getElementById('tierChoice').value!=='OU')) {
			var ranNum = Math.floor(Math.random()*2);
			if(ranNum!==0)targetAdd.value = 'Shell Armor';
			if(ranNum===0)targetAdd.value = 'White Smoke';
		}
		
	}
	else {
		randAbil = Math.floor(Math.random()*(abillist.length));
		targetAdd.selectedIndex = randAbil;
		if(targetAdd.value === 'Moody') getAbilities(pokechoice);
		
		if(document.getElementById('tierChoice').value!=='Ubers' && document.getElementById('tierChoice').value!=='OU') {
			if(targetAdd.value === 'Drizzle' || targetAdd.value === 'Drought') {
				getAbilities(pokechoice);
			}
		}
		
	}
	
}

function randomName(pokename) {
	var randompos = 0;
	randompos = Math.floor(Math.random()*dictionarytext.length);
	var i = 0;
	while(dictionarytext[randompos + i] !== '\n') {
		i+=1;
	}
	//Startpoint found, now for the endpoint
	var j = 1;
	while((dictionarytext[randompos + i + j] !== '\n') && (dictionarytext[randompos + i + j] !== "/")) {
		j+=1;
	}
	
	var newname = dictionarytext.slice(randompos + i + 1, randompos + i + j);
	newname = newname[0].toUpperCase() + newname.slice(1);
	
	//Special cases
	if(pokename === 'Tentacool') {
		return('Kenny');
	}
	if(pokename === 'Dedenne') {
		return('Chippy');
	}
	if(pokename === 'Galvantula') {
		return('Bully Maguire');
	}
	if(newname.length <= 17) {
		return(newname);
	}
	else {
		return(randomName());
	}
}

function addNames(ownText) {
	if(ownText === 'Add Names') {
		document.getElementById('confirmnames').innerHTML = 'Remove Names';
		exportToShowdown();
	}
	else {
		document.getElementById('confirmnames').innerHTML = 'Add Names';
		exportToShowdown();
	}
}

function getItems(selector) {
	for(elem in BattleItems) {
		var newOption = document.createElement("option");
		newOption.text = BattleItems[elem].name;
		selector.add(newOption);
	}
	sortSelect(selector);
	changeItem(selector);
}

function lockUnlock(padlock) {
	if(endsWith(padlock.src,"padlock-unlocked.png")) padlock.src = "lockedicon.png";
	else if(endsWith(padlock.src,"lockedicon.png")) padlock.src = "padlock-unlocked.png";
}

function presetTeams() {
	document.getElementById("exportbox").style.display = 'none';
	document.getElementById("presetbox").style.visibility = 'visible';
	document.getElementById("presettextp").style.fontSize = '95%';
	document.getElementById('ubersTeams').value = '(Ubers)';
	document.getElementById('OUTeams').value = '(OU)';
	document.getElementById('UUTeams').value = '(UU)';
	document.getElementById('RUTeams').value = '(RU)';
	document.getElementById('NUTeams').value = '(NU)';
	document.getElementById('PUTeams').value = '(PU)';
	document.getElementById('ZUTeams').value = '(ZU)';
	document.getElementById('presettext').innerHTML = '';
	document.getElementById('presettext').readOnly = true;
	
	//Temporarily disable all select boxes
	
	document.getElementById('poke1choice').disabled=true;
	document.getElementById('poke2choice').disabled=true;
	document.getElementById('poke3choice').disabled=true;
	document.getElementById('poke4choice').disabled=true;
	document.getElementById('poke5choice').disabled=true;
	document.getElementById('poke6choice').disabled=true;
	
	document.getElementById('poke1move1').disabled=true;
	document.getElementById('poke2move1').disabled=true;
	document.getElementById('poke3move1').disabled=true;
	document.getElementById('poke4move1').disabled=true;
	document.getElementById('poke5move1').disabled=true;
	document.getElementById('poke6move1').disabled=true;
	
	document.getElementById('poke1move2').disabled=true;
	document.getElementById('poke2move2').disabled=true;
	document.getElementById('poke3move2').disabled=true;
	document.getElementById('poke4move2').disabled=true;
	document.getElementById('poke5move2').disabled=true;
	document.getElementById('poke6move2').disabled=true;
	
	document.getElementById('poke1move3').disabled=true;
	document.getElementById('poke2move3').disabled=true;
	document.getElementById('poke3move3').disabled=true;
	document.getElementById('poke4move3').disabled=true;
	document.getElementById('poke5move3').disabled=true;
	document.getElementById('poke6move3').disabled=true;
	
	document.getElementById('poke1move4').disabled=true;
	document.getElementById('poke2move4').disabled=true;
	document.getElementById('poke3move4').disabled=true;
	document.getElementById('poke4move4').disabled=true;
	document.getElementById('poke5move4').disabled=true;
	document.getElementById('poke6move4').disabled=true;
	
	document.getElementById('poke1item').disabled=true;
	document.getElementById('poke2item').disabled=true;
	document.getElementById('poke3item').disabled=true;
	document.getElementById('poke4item').disabled=true;
	document.getElementById('poke5item').disabled=true;
	document.getElementById('poke6item').disabled=true;
	
	document.getElementById('poke1ability').disabled=true;
	document.getElementById('poke2ability').disabled=true;
	document.getElementById('poke3ability').disabled=true;
	document.getElementById('poke4ability').disabled=true;
	document.getElementById('poke5ability').disabled=true;
	document.getElementById('poke6ability').disabled=true;
	
	document.getElementById('regionChoice').disabled=true;
	document.getElementById('tierChoice').disabled=true;
	document.getElementById('typeChoice').disabled=true;
	document.getElementById('genRand').disabled=true;
	document.getElementById('exportshowdown').disabled=true;
	document.getElementById('importshowdown').disabled=true;
	document.getElementById('presetshowdown').disabled=true;
	document.getElementById('viableChoice').disabled=true;
}

function submitTeamPopup() {
	
	document.getElementById("presetbox").style.display = 'none';
	document.getElementById("submitteambox").style.display = 'inline-block';
	document.getElementById("submitteambox").style.visibility = 'visible';
	
}

function closeSubmitBox() {
	document.getElementById("presetbox").style.visibility = 'visible';
	document.getElementById("presetbox").style.display = 'inline-block';
	document.getElementById("submitteambox").style.display = 'none';
}

function doImport() {

	//Refill all options in Pokemon selectors and reset filters
	document.getElementById('tierChoice').value = '(Any)';
	document.getElementById('typeChoice').value = '(Any)';
	document.getElementById('regionChoice').value = '(Any)';
	filterConflict('whatever');

	//Try to import the textbox, one line at a time
	
	var importtext = document.getElementById('exporttext').value;

	importtext = importtext + '\n';
	
	//Add a space, then remove BOTH double and triple spaces
	//importtext = importtext.replace(/\s\n/g, '  \n');
	//Trim spaces from ends of each line
	//importtext = importtext.replace(/\s\n/g, '\n');
	//alert(importtext);
	//importtext = importtext.replace(/\s\s\n/g, '\n');
	//End trimming
	importtext = importtext.replace(/ {1,}\n/g, '\n');
	importtext = importtext.replace(/Keldeo-Resolute/g, 'Keldeo');
	importtext = importtext.replace(/Wishiwashi-School/g, 'Wishiwashi');
	importtext = importtext.replace(/Sirfetch'd/g, "Sirfetch’d");
	//importtext = importtext.replace(/ \n/g, '\n');
	//importtext = importtext.replace(/ \n/g, '\n');

	var poke1 = importtext.substr(0, importtext.indexOf('\n\n'));
	importtext = importtext.slice(poke1.length + 2, importtext.length);
	var poke2 = importtext.substr(0, importtext.indexOf('\n\n'));
	importtext = importtext.slice(poke2.length + 2, importtext.length);
	var poke3 = importtext.substr(0, importtext.indexOf('\n\n'));
	importtext = importtext.slice(poke3.length + 2, importtext.length);
	var poke4= importtext.substr(0, importtext.indexOf('\n\n'));
	importtext = importtext.slice(poke4.length + 2, importtext.length);
	var poke5 = importtext.substr(0, importtext.indexOf('\n\n'));
	importtext = importtext.slice(poke5.length + 2, importtext.length);
	var poke6 = importtext;
	
	
	//Check for Pokemon name////////////////////
		
		var startpos = 0;
		var endpos = 0;
		var hadGender = false;
	
		//First Pokemon
			var poke1name = "";
			hadGender = false;
			//Remove gender
			for(i = 0; i < poke1.indexOf('\n'); i++) {
				if((poke1[i] === '(') && (poke1[i + 1] === 'M') && (poke1[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
				if((poke1[i] === '(') && (poke1[i + 1] === 'F') && (poke1[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
			}
			if(hadGender === true) {
				var poke1temp = poke1;
				poke1 = poke1temp.slice(0, chopfrom - 1);
				poke1 += poke1temp.slice(chopfrom + 3, poke1temp.length);
				//Gender removed
			}
			
			//Get Pokemon name
			//If no nickname and no item
			if((poke1.indexOf('(') === -1) && (poke1.indexOf('@') === -1)) {
				poke1name = poke1.substr(0, poke1.indexOf('\n'));
			}
			//If no nickname and has item
			else if(poke1.indexOf('(') === -1) {
				poke1name = poke1.substr(0, poke1.indexOf('@') - 1);
			}
			//If has nickname and has item
			else if(poke1.indexOf('(') !== -1) {
				
				for(i = poke1.length; i > 0; i--) {
					if(poke1[i] === ')') {
						endpos=i;
						break;
						
					}
				}
				for(i = endpos; i > 0; i--) {
					if(poke1[i] === '(') {
						startpos=i+1;
						break;
						
					}
				}
				poke1name = poke1.substr(startpos, endpos-startpos);
				
			}
			//Got name
			
		//Second Pokemon
			var poke2name = "";
			hadGender = false;
			//Remove gender
			for(i = 0; i < poke2.indexOf('\n'); i++) {
				if((poke2[i] === '(') && (poke2[i + 1] === 'M') && (poke2[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
				if((poke2[i] === '(') && (poke2[i + 1] === 'F') && (poke2[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
			}
			if(hadGender === true) {
				var poke2temp = poke2;
				poke2 = poke2temp.slice(0, chopfrom - 1);
				poke2 += poke2temp.slice(chopfrom + 3, poke2temp.length);
				//Gender removed
			}
			
			//Get Pokemon name
			//If no nickname and no item
			if((poke2.indexOf('(') === -1) && (poke2.indexOf('@') === -1)) {
				poke2name = poke2.substr(0, poke2.indexOf('\n'));
			}
			//If no nickname and has item
			else if(poke2.indexOf('(') === -1) {
				poke2name = poke2.substr(0, poke2.indexOf('@') - 1);
			}
			//If has nickname and has item
			else if(poke2.indexOf('(') !== -1) {
				for(i = poke2.length; i > 0; i--) {
					if(poke2[i] === ')') {
						endpos=i;
						break;
					}
				}
				for(i = endpos; i > 0; i--) {
					if(poke2[i] === '(') {
						startpos=i+1;
						break;
					}
				}
				poke2name = poke2.substr(startpos, endpos-startpos);
			}
			//Got name
			
		//Third Pokemon
			var poke3name = "";
			hadGender = false;
			//Remove gender
			for(i = 0; i < poke3.indexOf('\n'); i++) {
				if((poke3[i] === '(') && (poke3[i + 1] === 'M') && (poke3[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
				if((poke3[i] === '(') && (poke3[i + 1] === 'F') && (poke3[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
			}
			if(hadGender === true) {
				var poke3temp = poke3;
				poke3 = poke3temp.slice(0, chopfrom - 1);
				poke3 += poke3temp.slice(chopfrom + 3, poke3temp.length);
				//Gender removed
			}
			
			//Get Pokemon name
			//If no nickname and no item
			if((poke3.indexOf('(') === -1) && (poke3.indexOf('@') === -1)) {
				poke3name = poke3.substr(0, poke3.indexOf('\n'));
			}
			//If no nickname and has item
			else if(poke3.indexOf('(') === -1) {
				poke3name = poke3.substr(0, poke3.indexOf('@') - 1);
			}
			//If has nickname and has item
			else if(poke3.indexOf('(') !== -1) {
				for(i = poke3.length; i > 0; i--) {
					if(poke3[i] === ')') {
						endpos=i;
						break;
					}
				}
				for(i = endpos; i > 0; i--) {
					if(poke3[i] === '(') {
						startpos=i+1;
						break;
					}
				}
				poke3name = poke3.substr(startpos, endpos-startpos);
			}
			//Got name
			
		//Fourth Pokemon
			var poke4name = "";
			hadGender = false;
			//Remove gender
			for(i = 0; i < poke4.indexOf('\n'); i++) {
				if((poke4[i] === '(') && (poke4[i + 1] === 'M') && (poke4[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
				if((poke4[i] === '(') && (poke4[i + 1] === 'F') && (poke4[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
			}
			if(hadGender === true) {
				var poke4temp = poke4;
				poke4 = poke4temp.slice(0, chopfrom - 1);
				poke4 += poke4temp.slice(chopfrom + 3, poke4temp.length);
				//Gender removed
			}
			
			//Get Pokemon name
			//If no nickname and no item
			if((poke4.indexOf('(') === -1) && (poke4.indexOf('@') === -1)) {
				poke4name = poke4.substr(0, poke4.indexOf('\n'));
			}
			//If no nickname and has item
			else if(poke4.indexOf('(') === -1) {
				poke4name = poke4.substr(0, poke4.indexOf('@') - 1);
			}
			//If has nickname and has item
			else if(poke4.indexOf('(') !== -1) {
				for(i = poke4.length; i > 0; i--) {
					if(poke4[i] === ')') {
						endpos=i;
						break;
					}
				}
				for(i = endpos; i > 0; i--) {
					if(poke4[i] === '(') {
						startpos=i+1;
						break;
					}
				}
				poke4name = poke4.substr(startpos, endpos-startpos);
			}
			//Got name
			
		//Fifth Pokemon
			var poke5name = "";
			hadGender = false;
			//Remove gender
			for(i = 0; i < poke5.indexOf('\n'); i++) {
				if((poke5[i] === '(') && (poke5[i + 1] === 'M') && (poke5[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
				if((poke5[i] === '(') && (poke5[i + 1] === 'F') && (poke5[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
			}
			if(hadGender === true) {
				var poke5temp = poke5;
				poke5 = poke5temp.slice(0, chopfrom - 1);
				poke5 += poke5temp.slice(chopfrom + 3, poke5temp.length);
				//Gender removed
			}
			
			//Get Pokemon name
			//If no nickname and no item
			if((poke5.indexOf('(') === -1) && (poke5.indexOf('@') === -1)) {
				poke5name = poke5.substr(0, poke5.indexOf('\n'));
			}
			//If no nickname and has item
			else if(poke5.indexOf('(') === -1) {
				poke5name = poke5.substr(0, poke5.indexOf('@') - 1);
			}
			//If has nickname and has item
			else if(poke5.indexOf('(') !== -1) {
				for(i = poke5.length; i > 0; i--) {
					if(poke5[i] === ')') {
						endpos=i;
						break;
					}
				}
				for(i = endpos; i > 0; i--) {
					if(poke5[i] === '(') {
						startpos=i+1;
						break;
					}
				}
				poke5name = poke5.substr(startpos, endpos-startpos);
			}
			//Got name
			
		//Sixth Pokemon
			var poke6name = "";
			hadGender = false;
			//Remove gender
			for(i = 0; i < poke6.indexOf('\n'); i++) {
				if((poke6[i] === '(') && (poke6[i + 1] === 'M') && (poke6[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
				if((poke6[i] === '(') && (poke6[i + 1] === 'F') && (poke6[i + 2] === ')')) {
					chopfrom = i;
					hadGender = true;
				}
			}
			if(hadGender === true) {
				var poke6temp = poke6;
				poke6 = poke6temp.slice(0, chopfrom - 1);
				poke6 += poke6temp.slice(chopfrom + 3, poke6temp.length);
				//Gender removed
			}
			
			//Get Pokemon name
			//If no nickname and no item
			if((poke6.indexOf('(') === -1) && (poke6.indexOf('@') === -1)) {
				poke6name = poke6.substr(0, poke6.indexOf('\n'));
			}
			//If no nickname and has item
			else if(poke6.indexOf('(') === -1) {
				poke6name = poke6.substr(0, poke6.indexOf('@') - 1);
			}
			//If has nickname and has item
			else if(poke6.indexOf('(') !== -1) {
				for(i = poke6.length; i > 0; i--) {
					if(poke6[i] === ')') {
						endpos=i;
						break;
					}
				}
				for(i = endpos; i > 0; i--) {
					if(poke6[i] === '(') {
						startpos=i+1;
						break;
					}
				}
				poke6name = poke6.substr(startpos, endpos-startpos);
			}
			//Got name
		
		document.getElementById('poke1choice').value = poke1name;
		changePic(document.getElementById('poke1choice'));
		document.getElementById('poke2choice').value = poke2name;
		changePic(document.getElementById('poke2choice'));
		document.getElementById('poke3choice').value = poke3name;
		changePic(document.getElementById('poke3choice'));
		document.getElementById('poke4choice').value = poke4name;
		changePic(document.getElementById('poke4choice'));
		document.getElementById('poke5choice').value = poke5name;
		changePic(document.getElementById('poke5choice'));
		document.getElementById('poke6choice').value = poke6name;
		changePic(document.getElementById('poke6choice'));
	
	///////////End Pokemon name checking////////

	//Check first item
	var item1="";
	var chopfrom = 0;	
	for(i = 0; i < poke1.indexOf('\n'); i++) {
		if(poke1[i] === '@') {
			chopfrom = i;
		}
	}
	item1 = poke1.slice(chopfrom + 2, poke1.indexOf('\n'));
	
	//Check second item
	var item2="";
	chopfrom = 0;	
	for(i = 0; i < poke2.indexOf('\n'); i++) {
        if (poke2[i] === '@') {
			chopfrom = i;
		}
	}	
	item2 = poke2.slice(chopfrom + 2, poke2.indexOf('\n'));
	
	//Check third item
	var item3="";
	chopfrom = 0;	
	for(i = 0; i < poke3.indexOf('\n'); i++) {
        if (poke3[i] === '@') {
			chopfrom = i;
		}
	}

	item3 = poke3.slice(chopfrom + 2, poke3.indexOf('\n'));
	
	//Check fourth item
	var item4="";
	chopfrom = 0;	
	for(i = 0; i < poke4.indexOf('\n'); i++) {
        if (poke4[i] === '@') {
			chopfrom = i;
		}
	}	
	item4 = poke4.slice(chopfrom + 2, poke4.indexOf('\n'));
	
	//Check fifth item
	var item5="";
	chopfrom = 0;	
	for(i = 0; i < poke5.indexOf('\n'); i++) {
        if (poke5[i] === '@') {
			chopfrom = i;
		}
	}	
	item5 = poke5.slice(chopfrom + 2, poke5.indexOf('\n'));
	
	//Check sixth item
	var item6="";
	chopfrom = 0;	
	for(i = 0; i < poke6.indexOf('\n'); i++) {
        if (poke6[i] === '@') {
			chopfrom = i;
		}
	}	
	item6 = poke6.slice(chopfrom + 2, poke6.indexOf('\n'));
	
	
	//Scan each item to see if it matches an imported item
	for(elem in BattleItems) {
		currentitem = BattleItems[elem].name;
		if(item1 === currentitem) document.getElementById('poke1item').value=currentitem;
        if(item2 === currentitem) document.getElementById('poke2item').value=currentitem;
        if(item3 === currentitem) document.getElementById('poke3item').value=currentitem;
        if(item4 === currentitem) document.getElementById('poke4item').value=currentitem;
        if(item5 === currentitem) document.getElementById('poke5item').value=currentitem;
        if(item6 === currentitem) document.getElementById('poke6item').value=currentitem;
	}
	
	
	poke1 = poke1.slice(poke1.indexOf('\n') + 1, poke1.length);
	poke2 = poke2.slice(poke2.indexOf('\n') + 1, poke2.length);
	poke3 = poke3.slice(poke3.indexOf('\n') + 1, poke3.length);
	poke4 = poke4.slice(poke4.indexOf('\n') + 1, poke4.length);
	poke5 = poke5.slice(poke5.indexOf('\n') + 1, poke5.length);
	poke6 = poke6.slice(poke6.indexOf('\n') + 1, poke6.length);
	
	var poke1ability="";
	var poke2ability="";
	var poke3ability="";
	var poke4ability="";
	var poke5ability="";
	var poke6ability="";
	
	var poke1shiny = false;
	var poke2shiny = false;
	var poke3shiny = false;
	var poke4shiny = false;
	var poke5shiny = false;
	var poke6shiny = false;
	
	for(i = 0; i < poke1.length; i++) {
		if((poke1[i] === 'A') && (poke1[i+1] === 'b') && (poke1[i+2] === 'i') && (poke1[i+3] === 'l') && (poke1[i+4] === 'i') && (poke1[i+5] === 't') && (poke1[i+6] === 'y') && (poke1[i+7] === ':')) {
			poke1ability = poke1.slice(i + 9, poke1.indexOf('\n'));
		}
		if((poke1[i] === 'S') && (poke1[i+1] === 'h') && (poke1[i+2] === 'i') && (poke1[i+3] === 'n') && (poke1[i+4] === 'y') && (poke1[i+5] === ':') && (poke1[i+6] === ' ') && (poke1[i+7] === 'Y') && (poke1[i+8] === 'e') && (poke1[i+9] === 's')) {
			poke1shiny = true;
		}
	}
	
	for(i = 0; i < poke2.length; i++) {
		if((poke2[i] === 'A') && (poke2[i+1] === 'b') && (poke2[i+2] === 'i') && (poke2[i+3] === 'l') && (poke2[i+4] === 'i') && (poke2[i+5] === 't') && (poke2[i+6] === 'y') && (poke2[i+7] === ':')) {
			poke2ability = poke2.slice(i + 9, poke2.indexOf('\n'));
		}
		if((poke2[i] === 'S') && (poke2[i+1] === 'h') && (poke2[i+2] === 'i') && (poke2[i+3] === 'n') && (poke2[i+4] === 'y') && (poke2[i+5] === ':') && (poke2[i+6] === ' ') && (poke2[i+7] === 'Y') && (poke2[i+8] === 'e') && (poke2[i+9] === 's')) {
			poke2shiny = true;
		}
	}
	
	for(i = 0; i < poke3.length; i++) {
		if((poke3[i] === 'A') && (poke3[i+1] === 'b') && (poke3[i+2] === 'i') && (poke3[i+3] === 'l') && (poke3[i+4] === 'i') && (poke3[i+5] === 't') && (poke3[i+6] === 'y') && (poke3[i+7] === ':')) {
			poke3ability = poke3.slice(i + 9, poke3.indexOf('\n'));
		}
		if((poke3[i] === 'S') && (poke3[i+1] === 'h') && (poke3[i+2] === 'i') && (poke3[i+3] === 'n') && (poke3[i+4] === 'y') && (poke3[i+5] === ':') && (poke3[i+6] === ' ') && (poke3[i+7] === 'Y') && (poke3[i+8] === 'e') && (poke3[i+9] === 's')) {
			poke3shiny = true;
		}
	}
	
	for(i = 0; i < poke4.length; i++) {
		if((poke4[i] === 'A') && (poke4[i+1] === 'b') && (poke4[i+2] === 'i') && (poke4[i+3] === 'l') && (poke4[i+4] === 'i') && (poke4[i+5] === 't') && (poke4[i+6] === 'y') && (poke4[i+7] === ':')) {
			poke4ability = poke4.slice(i + 9, poke4.indexOf('\n'));
		}
		if((poke4[i] === 'S') && (poke4[i+1] === 'h') && (poke4[i+2] === 'i') && (poke4[i+3] === 'n') && (poke4[i+4] === 'y') && (poke4[i+5] === ':') && (poke4[i+6] === ' ') && (poke4[i+7] === 'Y') && (poke4[i+8] === 'e') && (poke4[i+9] === 's')) {
			poke4shiny = true;
		}
	}
	
	for(i = 0; i < poke5.length; i++) {
		if((poke5[i] === 'A') && (poke5[i+1] === 'b') && (poke5[i+2] === 'i') && (poke5[i+3] === 'l') && (poke5[i+4] === 'i') && (poke5[i+5] === 't') && (poke5[i+6] === 'y') && (poke5[i+7] === ':')) {
			poke5ability = poke5.slice(i + 9, poke5.indexOf('\n'));
		}
		if((poke5[i] === 'S') && (poke5[i+1] === 'h') && (poke5[i+2] === 'i') && (poke5[i+3] === 'n') && (poke5[i+4] === 'y') && (poke5[i+5] === ':') && (poke5[i+6] === ' ') && (poke5[i+7] === 'Y') && (poke5[i+8] === 'e') && (poke5[i+9] === 's')) {
			poke5shiny = true;
		}
	}
	
	for(i = 0; i < poke6.length; i++) {
		if((poke6[i] === 'A') && (poke6[i+1] === 'b') && (poke6[i+2] === 'i') && (poke6[i+3] === 'l') && (poke6[i+4] === 'i') && (poke6[i+5] === 't') && (poke6[i+6] === 'y') && (poke6[i+7] === ':')) {
			poke6ability = poke6.slice(i + 9, poke6.indexOf('\n'));
		}
		if((poke6[i] === 'S') && (poke6[i+1] === 'h') && (poke6[i+2] === 'i') && (poke6[i+3] === 'n') && (poke6[i+4] === 'y') && (poke6[i+5] === ':') && (poke6[i+6] === ' ') && (poke6[i+7] === 'Y') && (poke6[i+8] === 'e') && (poke6[i+9] === 's')) {
			poke6shiny = true;
		}
	}
	
	
	//Unlock all padlocks, get correct movelists and set to required values
	document.getElementById('padlock1').src="/Images/padlock-unlocked.png"
    document.getElementById('padlock2').src ="/Images/padlock-unlocked.png"
    document.getElementById('padlock3').src ="/Images/padlock-unlocked.png"
    document.getElementById('padlock4').src ="/Images/padlock-unlocked.png"
    document.getElementById('padlock5').src ="/Images/padlock-unlocked.png"
    document.getElementById('padlock6').src ="/Images/padlock-unlocked.png"
	AvgStatCalc();
	getMovelist('poke1choice');
	getMovelist('poke2choice');
	getMovelist('poke3choice');
	getMovelist('poke4choice');
	getMovelist('poke5choice');
	getMovelist('poke6choice');
	
	//First Pokemon's moves
	var poke1move1 = "";
	var poke1move2 = "";
	var poke1move3 = "";
	var poke1move4 = "";
	
	for(i = 0; i < poke1.length; i++) {
		if((poke1[i] === '-') && (poke1[i+1] === ' ')) {
			poke1 = poke1.slice(i,poke1.length);
			break;
		}
	}
	
	poke1 = poke1.replace(/- /g, "");
	poke1 = poke1.replace(/[\[\]]/g, "");
	poke1 += '\n'
	poke1move1 = poke1.slice(0, poke1.indexOf('\n'));
	poke1move2 = poke1.slice(poke1move1.length + 1, poke1.indexOf('\n',poke1move1.length + 1));
	poke1move3 = poke1.slice(poke1move1.length + poke1move2.length + 2, poke1.indexOf('\n',poke1move1.length + poke1move2.length + 2));
	poke1move4 = poke1.slice(poke1move1.length + poke1move2.length + poke1move3.length + 3, poke1.indexOf('\n',poke1move1.length + poke1move2.length + poke1move3.length + 3));
	document.getElementById('poke1move1').value = poke1move1;
	document.getElementById('poke1move2').value = poke1move2;
	document.getElementById('poke1move3').value = poke1move3;
	document.getElementById('poke1move4').value = poke1move4;
	
	//Second Pokemon's moves
	var poke2move1 = "";
	var poke2move2 = "";
	var poke2move3 = "";
	var poke2move4 = "";
	
	for(i = 0; i < poke2.length; i++) {
		if((poke2[i] === '-') && (poke2[i+1] === ' ')) {
			poke2 = poke2.slice(i,poke2.length);
			break;
		}
	}
	
	poke2 = poke2.replace(/- /g, "");
	poke2 = poke2.replace(/[\[\]]/g, "");
	poke2 += '\n'
	poke2move1 = poke2.slice(0, poke2.indexOf('\n'));
	poke2move2 = poke2.slice(poke2move1.length + 1, poke2.indexOf('\n',poke2move1.length + 1));
	poke2move3 = poke2.slice(poke2move1.length + poke2move2.length + 2, poke2.indexOf('\n',poke2move1.length + poke2move2.length + 2));
	poke2move4 = poke2.slice(poke2move1.length + poke2move2.length + poke2move3.length + 3, poke2.indexOf('\n',poke2move1.length + poke2move2.length + poke2move3.length + 3));
	document.getElementById('poke2move1').value = poke2move1;
	document.getElementById('poke2move2').value = poke2move2;
	document.getElementById('poke2move3').value = poke2move3;
	document.getElementById('poke2move4').value = poke2move4;
	
	//Third Pokemon's moves
	var poke3move1 = "";
	var poke3move2 = "";
	var poke3move3 = "";
	var poke3move4 = "";
	
	for(i = 0; i < poke3.length; i++) {
		if((poke3[i] === '-') && (poke3[i+1] === ' ')) {
			poke3 = poke3.slice(i,poke3.length);
			break;
		}
	}
	
	poke3 = poke3.replace(/- /g, "");
	poke3 = poke3.replace(/[\[\]]/g, "");
	poke3 += '\n'
	poke3move1 = poke3.slice(0, poke3.indexOf('\n'));
	poke3move2 = poke3.slice(poke3move1.length + 1, poke3.indexOf('\n',poke3move1.length + 1));
	poke3move3 = poke3.slice(poke3move1.length + poke3move2.length + 2, poke3.indexOf('\n',poke3move1.length + poke3move2.length + 2));
	poke3move4 = poke3.slice(poke3move1.length + poke3move2.length + poke3move3.length + 3, poke3.indexOf('\n',poke3move1.length + poke3move2.length + poke3move3.length + 3));
	document.getElementById('poke3move1').value = poke3move1;
	document.getElementById('poke3move2').value = poke3move2;
	document.getElementById('poke3move3').value = poke3move3;
	document.getElementById('poke3move4').value = poke3move4;
	
	//Fourth Pokemon's moves
	var poke4move1 = "";
	var poke4move2 = "";
	var poke4move3 = "";
	var poke4move4 = "";
	
	for(i = 0; i < poke4.length; i++) {
		if((poke4[i] === '-') && (poke4[i+1] === ' ')) {
			poke4 = poke4.slice(i,poke4.length);
			break;
		}
	}
	
	poke4 = poke4.replace(/- /g, "");
	poke4 += '\n'
	poke4 = poke4.replace(/[\[\]]/g, "");
	poke4move1 = poke4.slice(0, poke4.indexOf('\n'));
	poke4move2 = poke4.slice(poke4move1.length + 1, poke4.indexOf('\n',poke4move1.length + 1));
	poke4move3 = poke4.slice(poke4move1.length + poke4move2.length + 2, poke4.indexOf('\n',poke4move1.length + poke4move2.length + 2));
	poke4move4 = poke4.slice(poke4move1.length + poke4move2.length + poke4move3.length + 3, poke4.indexOf('\n',poke4move1.length + poke4move2.length + poke4move3.length + 3));
	document.getElementById('poke4move1').value = poke4move1;
	document.getElementById('poke4move2').value = poke4move2;
	document.getElementById('poke4move3').value = poke4move3;
	document.getElementById('poke4move4').value = poke4move4;
	
	//Fifth Pokemon's moves
	var poke5move1 = "";
	var poke5move2 = "";
	var poke5move3 = "";
	var poke5move4 = "";
	
	for(i = 0; i < poke5.length; i++) {
		if((poke5[i] === '-') && (poke5[i+1] === ' ')) {
			poke5 = poke5.slice(i,poke5.length);
			break;
		}
	}
	
	poke5 = poke5.replace(/- /g, "");
	poke5 = poke5.replace(/[\[\]]/g, "");
	poke5 += '\n'
	poke5move1 = poke5.slice(0, poke5.indexOf('\n'));
	poke5move2 = poke5.slice(poke5move1.length + 1, poke5.indexOf('\n',poke5move1.length + 1));
	poke5move3 = poke5.slice(poke5move1.length + poke5move2.length + 2, poke5.indexOf('\n',poke5move1.length + poke5move2.length + 2));
	poke5move4 = poke5.slice(poke5move1.length + poke5move2.length + poke5move3.length + 3, poke5.indexOf('\n',poke5move1.length + poke5move2.length + poke5move3.length + 3));
	document.getElementById('poke5move1').value = poke5move1;
	document.getElementById('poke5move2').value = poke5move2;
	document.getElementById('poke5move3').value = poke5move3;
	document.getElementById('poke5move4').value = poke5move4;
	
	//Sixth Pokemon's moves
	var poke6move1 = "";
	var poke6move2 = "";
	var poke6move3 = "";
	var poke6move4 = "";
	
	for(i = 0; i < poke6.length; i++) {
		if((poke6[i] === '-') && (poke6[i+1] === ' ')) {
			poke6 = poke6.slice(i,poke6.length);
			break;
		}
	}
	
	poke6 = poke6.replace(/- /g, "");
	poke6 = poke6.replace(/[\[\]]/g, "");
	poke6 += '\n'

	poke6move1 = poke6.slice(0, poke6.indexOf('\n'));
	poke6move2 = poke6.slice(poke6move1.length + 1, poke6.indexOf('\n',poke6move1.length + 1));
	poke6move3 = poke6.slice(poke6move1.length + poke6move2.length + 2, poke6.indexOf('\n',poke6move1.length + poke6move2.length + 2));
	poke6move4 = poke6.slice(poke6move1.length + poke6move2.length + poke6move3.length + 3, poke6.indexOf('\n',poke6move1.length + poke6move2.length + poke6move3.length + 3));
	document.getElementById('poke6move1').value = poke6move1;
	document.getElementById('poke6move2').value = poke6move2;
	document.getElementById('poke6move3').value = poke6move3;
	document.getElementById('poke6move4').value = poke6move4;
	
	
	getAbilities(document.getElementById('poke1choice'));
	getAbilities(document.getElementById('poke2choice'));
	getAbilities(document.getElementById('poke3choice'));
	getAbilities(document.getElementById('poke4choice'));
	getAbilities(document.getElementById('poke5choice'));
	getAbilities(document.getElementById('poke6choice'));
	
	
	getAbilities(document.getElementById('poke1choice'));
	getAbilities(document.getElementById('poke2choice'));
	getAbilities(document.getElementById('poke3choice'));
	getAbilities(document.getElementById('poke4choice'));
	getAbilities(document.getElementById('poke5choice'));
	getAbilities(document.getElementById('poke6choice'));
	
	for(i = 0; i < document.getElementById('poke1ability').length; i++) {
		if(document.getElementById('poke1ability').options[i].value === poke1ability) {
			document.getElementById('poke1ability').selectedIndex=i;
		}
	}
	
	for(i = 0; i < document.getElementById('poke2ability').length; i++) {
		if(document.getElementById('poke2ability').options[i].value === poke2ability) {
			document.getElementById('poke2ability').selectedIndex=i;
		}
	}
	
	for(i = 0; i < document.getElementById('poke3ability').length; i++) {
		if(document.getElementById('poke3ability').options[i].value === poke3ability) {
			document.getElementById('poke3ability').selectedIndex=i;
		}
	}
	
	for(i = 0; i < document.getElementById('poke4ability').length; i++) {
		if(document.getElementById('poke4ability').options[i].value === poke4ability) {
			document.getElementById('poke4ability').selectedIndex=i;
		}
	}
	
	for(i = 0; i < document.getElementById('poke5ability').length; i++) {
		if(document.getElementById('poke5ability').options[i].value === poke5ability) {
			document.getElementById('poke5ability').selectedIndex=i;
		}
	}
	
	for(i = 0; i < document.getElementById('poke6ability').length; i++) {
		if(document.getElementById('poke6ability').options[i].value === poke6ability) {
			document.getElementById('poke6ability').selectedIndex=i;
		}
	}
	
	
	getStrengths();
	getWeaknesses();
	getChecklist();
	hideExportBox();
	if(poke1shiny ===true) {
		makeShiny(document.getElementById('pic1'));
	}
	if(poke2shiny ===true) {
		makeShiny(document.getElementById('pic2'));
	}
	if(poke3shiny ===true) {
		makeShiny(document.getElementById('pic3'));
	}
	if(poke4shiny ===true) {
		makeShiny(document.getElementById('pic4'));
	}
	if(poke5shiny ===true) {
		makeShiny(document.getElementById('pic5'));
	}
	if(poke6shiny ===true) {
		makeShiny(document.getElementById('pic6'));
	}
}

function importFromShowdown() {
	document.getElementById("exportbox").style.visibility = 'visible';
	document.getElementById('exporttext').readOnly = false;
	document.getElementById("exporttextp").style.fontSize = '95%';
	document.getElementById("exporttextp").innerHTML = "Copy from Showdown's Teambuilder Import/Export, then paste below (must contain 6 PokÃ©mon)";
	document.getElementById("exporttext").value="";
	document.getElementById('exportbox').style.display='inline-block';
	document.getElementById('confirmimport').style.display='inline-block';
	document.getElementById('confirmnames').style.display='none';
	
	//Temporarily disable all select boxes
	
	document.getElementById('poke1choice').disabled=true;
	document.getElementById('poke2choice').disabled=true;
	document.getElementById('poke3choice').disabled=true;
	document.getElementById('poke4choice').disabled=true;
	document.getElementById('poke5choice').disabled=true;
	document.getElementById('poke6choice').disabled=true;
	
	document.getElementById('poke1move1').disabled=true;
	document.getElementById('poke2move1').disabled=true;
	document.getElementById('poke3move1').disabled=true;
	document.getElementById('poke4move1').disabled=true;
	document.getElementById('poke5move1').disabled=true;
	document.getElementById('poke6move1').disabled=true;
	
	document.getElementById('poke1move2').disabled=true;
	document.getElementById('poke2move2').disabled=true;
	document.getElementById('poke3move2').disabled=true;
	document.getElementById('poke4move2').disabled=true;
	document.getElementById('poke5move2').disabled=true;
	document.getElementById('poke6move2').disabled=true;
	
	document.getElementById('poke1move3').disabled=true;
	document.getElementById('poke2move3').disabled=true;
	document.getElementById('poke3move3').disabled=true;
	document.getElementById('poke4move3').disabled=true;
	document.getElementById('poke5move3').disabled=true;
	document.getElementById('poke6move3').disabled=true;
	
	document.getElementById('poke1move4').disabled=true;
	document.getElementById('poke2move4').disabled=true;
	document.getElementById('poke3move4').disabled=true;
	document.getElementById('poke4move4').disabled=true;
	document.getElementById('poke5move4').disabled=true;
	document.getElementById('poke6move4').disabled=true;
	
	document.getElementById('poke1item').disabled=true;
	document.getElementById('poke2item').disabled=true;
	document.getElementById('poke3item').disabled=true;
	document.getElementById('poke4item').disabled=true;
	document.getElementById('poke5item').disabled=true;
	document.getElementById('poke6item').disabled=true;
	
	document.getElementById('poke1ability').disabled=true;
	document.getElementById('poke2ability').disabled=true;
	document.getElementById('poke3ability').disabled=true;
	document.getElementById('poke4ability').disabled=true;
	document.getElementById('poke5ability').disabled=true;
	document.getElementById('poke6ability').disabled=true;
	
	document.getElementById('regionChoice').disabled=true;
	document.getElementById('tierChoice').disabled=true;
	document.getElementById('typeChoice').disabled=true;
	document.getElementById('genRand').disabled=true;
	document.getElementById('exportshowdown').disabled=true;
	document.getElementById('importshowdown').disabled=true;
	document.getElementById('presetshowdown').disabled=true;
	document.getElementById('viableChoice').disabled=true;
}

function suggestedEVs(pokechoice) {
	
	var checkMoves=[];
	var checkSpecial = 0;
	var checkPhysical = 0;
	var tempreturn = "EVs: ";
	var checkpoke = document.getElementById((pokechoice + "choice").toString()).value;
	var checkpokeraw = "";
	var checkBoosts = 0;
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === checkpoke) {
			checkpokeraw = elem;
		}
	}
	
	var checkabil = document.getElementById((pokechoice + "ability").toString()).value;
	
	checkMoves.push(document.getElementById((pokechoice + "move1").toString()).value);
	checkMoves.push(document.getElementById((pokechoice + "move2").toString()).value);
	checkMoves.push(document.getElementById((pokechoice + "move3").toString()).value);
	checkMoves.push(document.getElementById((pokechoice + "move4").toString()).value);
	
	for(elem in BattleMovedex) {
		for(i = 0; i < 4; i++) {
			if(BattleMovedex[elem].name === checkMoves[i]) {
				if(BattleMovedex[elem].category === "Special") checkSpecial +=1;
				if(BattleMovedex[elem].category === "Physical") checkPhysical +=1;
				if(BattleMovedex[elem].hasOwnProperty('boosts') || BattleMovedex[elem].hasOwnProperty('weather') || checkMoves[i] === 'Substitute') {
					checkBoosts +=1;
				}
			}
		}
	}
	
	//Exceptions
	if(checkpoke === 'Shedinja' || checkpoke === 'Ninjask') {
		tempreturn += "252 Atk / 252 Spe / 4 SpA";
	}
	else if(checkpoke === 'Eiscue' && contains(checkMoves,'Belly Drum')) {
		tempreturn += "252 Atk / 252 Spe / 4 SpD";
	}
	else if(checkpoke === 'Galvantula' && contains(checkMoves,'Leech Life') && contains(checkMoves,'Thunder')) {
		tempreturn += "252 Atk / 4 SpA / 252 Spe";
	}
	else if(checkpoke === 'Walrein' && contains(checkMoves,'Brine') && contains(checkMoves,'Super Fang')) {
		tempreturn += "172 HP / 200 SpA / 136 Spe";
	}
	else if(checkpoke === 'Smeargle') {
		tempreturn += "252 HP / 4 Def / 252 Spe";
	}
	else if(checkpoke === 'Chansey') {
		tempreturn += "252 HP / 252 Def / 4 SpD";
	}
	else {
		//Bulky Pokes
		if((BattlePokedex[checkpokeraw].baseStats.spe <= 75) && (checkabil !== 'Quick Feet') && (checkabil !== 'Speed Boost') && (document.getElementById((pokechoice + "item").toString()).value !== 'Choice Scarf') && !(contains(checkMoves,'Shell Smash')) && !(contains(checkMoves,'Agility')) && !(contains(checkMoves,'Rock Polish')) && !(contains(checkMoves,'Autotomize')) 
		&& checkabil !== 'Swift Swim' && checkabil !== 'Chlorophyll' && checkabil !== 'Sand Rush' && checkabil !== 'Slush Rush') {
			tempreturn += "252 HP / ";
		}
		//Non bulky pokes
		else {
			if((document.getElementById((pokechoice + "ability").toString()).value === 'Quick Feet') || (document.getElementById((pokechoice + "ability").toString()).value === 'Speed Boost')) {
				tempreturn += "4 HP / ";
			}
			else if((document.getElementById((pokechoice + "ability").toString()).value === 'Chlorophyll') && contains(checkMoves,'Sunny Day')) {
				tempreturn += "4 HP / ";
			}
			else if((document.getElementById((pokechoice + "ability").toString()).value === 'Swift Swim') && contains(checkMoves,'Rain Dance')) {
				tempreturn += "4 HP / ";
			}
			else if((document.getElementById((pokechoice + "ability").toString()).value === 'Sand Rush') && contains(checkMoves,'Sandstorm')) {
				tempreturn += "4 HP / ";
			}
			else if((document.getElementById((pokechoice + "ability").toString()).value === 'Slush Rush') && contains(checkMoves,'Hail')) {
				tempreturn += "4 HP / ";
			}
			else if((checkPhysical + checkSpecial > 2) || BattlePokedex[checkpokeraw].baseStats.spe >= (BattlePokedex[checkpokeraw].baseStats.def + BattlePokedex[checkpokeraw].baseStats.spd)/2) {
				if(checkPhysical + checkSpecial >= 2 || (document.getElementById((pokechoice + "ability").toString()).value === 'Quick Feet') || (document.getElementById((pokechoice + "ability").toString()).value === 'Speed Boost')) tempreturn += "4 HP / ";
				else tempreturn += "252 HP / ";
			}
			else {
				tempreturn += "252 HP / ";
			}
		}
	
		//Mixed attackers
		if(checkSpecial === 2 && checkPhysical === 2) {
			tempreturn += "126 Atk / 126 SpA / ";
		}
		//Physical attackers
		else if(checkPhysical >= 3 || (checkPhysical >= 2 && checkBoosts >= 1) || (checkPhysical >= 2 && BattlePokedex[checkpokeraw].baseStats.atk >= 100)) {
			tempreturn += "252 Atk / ";
		}
		//Special attackers
		else if(checkSpecial >= 3 || (checkSpecial >= 2 && checkBoosts >= 1) || (checkSpecial >= 2 && BattlePokedex[checkpokeraw].baseStats.spa >= 100)) {
			tempreturn += "252 SpA / ";
		}
		else if(BattlePokedex[checkpokeraw].baseStats.def >= BattlePokedex[checkpokeraw].baseStats.spd) {
			tempreturn += "252 Def / ";
		}
		else if(BattlePokedex[checkpokeraw].baseStats.def < BattlePokedex[checkpokeraw].baseStats.spd) {
			tempreturn += "252 SpD / ";
		}
		
		if(startsWith(tempreturn,"EVs: 252 HP / 252 Def / ")) {
			tempreturn += "4 SpD";
		}
		else if(startsWith(tempreturn,"EVs: 252 HP / 252 SpD / ")) {
			tempreturn += "4 Def";
		}
		else if(startsWith(tempreturn,"EVs: 252 HP / ")) {
			if(checkPhysical === 1) {
				tempreturn += "4 Atk";
			}
			else if(checkSpecial === 1) {
				tempreturn += "4 SpA";
			}
			else {
				var rannum = Math.floor(Math.random()*2);
				if(rannum === 0) {
					tempreturn += "4 Def";
				}
				else {
					tempreturn += "4 SpD";
				}
			}
			
		}
		else {
			tempreturn += "252 Spe";
		}
		
		if(tempreturn==="EVs: 4 HP / 252 SpD / 252 Spe" || tempreturn==="EVs: 4 HP / 252 Def / 252 Spe") {
			tempreturn = "EVs: 252 HP / 4 Def / 252 Spe";
		}
		
		if(startsWith(tempreturn,"EVs: 252 HP / 252 SpA")) {
			if(contains(checkMoves,'Rock Polish') || contains(checkMoves,'Quiver Dance') || contains(checkMoves,'Agility') || contains(checkMoves,'Autotomize') || contains(checkMoves,'Shell Smash')) {
				tempreturn = "EVs: 4 HP / 252 SpA / 252 Spe";
			}
		}
		
		if(startsWith(tempreturn,"EVs: 252 HP / 252 Atk")) {
			if(contains(checkMoves,'Rock Polish') || contains(checkMoves,'Dragon Dance')|| contains(checkMoves,'Agility') || contains(checkMoves,'Autotomize') || contains(checkMoves,'Shell Smash')) {
				tempreturn = "EVs: 4 HP / 252 Atk / 252 Spe";
			}
		}
		
		if(tempreturn==="EVs: 252 HP / 252 Def / 4 SpD") {
			if(BattlePokedex[checkpokeraw].baseStats.def <= BattlePokedex[checkpokeraw].baseStats.spe) tempreturn = "EVs: 252 HP / 4 Def / 252 Spe";
		}
		
		if(tempreturn==="EVs: 252 HP / 252 SpD / 4 Def") {
			if(BattlePokedex[checkpokeraw].baseStats.spd <= BattlePokedex[checkpokeraw].baseStats.spe) tempreturn = "EVs: 252 HP / 4 Def / 252 Spe";
		}
		
		//If all else fails
		if (tempreturn==="EVs: ") tempreturn += "EVs: 252 HP / 4 Def / 252 Spe";
	}
	
	tempreturn += "\n" + suggestedNature(tempreturn,checkPhysical,checkSpecial,checkMoves,checkpoke) + " Nature";
	return(tempreturn);
}

function suggestedNature(inputtext,checkPhysical,checkSpecial,checkMoves,checkpoke) {
	var rannum = Math.floor(Math.random()*2);
	//Exceptions (e.g. event PokÃ©mon)
	if(checkpoke==='Entei') {
		if(contains(checkMoves,'Extreme Speed')) return('Adamant');
	}
	if(checkpoke==='Raikou') {
		if(contains(checkMoves,'Aura Sphere')) return('Rash');
	}
	if(startsWith(checkpoke,'Genesect')) {
		if(contains(checkMoves,'Extreme Speed')) return('Hasty');
		if(contains(checkMoves,'Shift Gear')) return('Hasty');
		if(contains(checkMoves,'Blaze Kick')) return('Hasty');
	}
	if(checkpoke==='Galvantula') {
		if(contains(checkMoves,'Leech Life') && contains(checkMoves,'Poison Jab') && contains(checkMoves,'Thunder') && contains(checkMoves,'Sucker Punch')) return('Naive');
	}
	if(checkpoke==='Walrein') {
		if(contains(checkMoves,'Super Fang') && contains(checkMoves,'Brine')) return('Modest');
	}
	//End exceptions
	else if(inputtext === "252 HP / 252 Spe / 4 Def") {
		if(rannum === 0) return('Jolly');
		if(rannum === 1) return('Timid');
	}
	else if(startsWith(inputtext,"EVs: 252 HP / 252 Def / ")) {
		if(checkPhysical >= checkSpecial) {
			if(contains(checkMoves,'Gyro Ball') || contains(checkMoves,'Trick Room')) return('Relaxed');
			else return('Impish');
		}
		else return('Bold');
	}
	else if(startsWith(inputtext,"EVs: 252 HP / 252 SpD / ")) {
		if(checkPhysical >= checkSpecial) {
			if(contains(checkMoves,'Gyro Ball') || contains(checkMoves,'Trick Room')) return('Sassy');
			else return('Careful');
		}
		else {
			if(contains(checkMoves,'Gyro Ball') || contains(checkMoves,'Trick Room')) return('Sassy');
			else return('Calm');
		}
	}
	else if(startsWith(inputtext,"EVs: 252 HP / 252 Atk / ")) {
		if(checkSpecial===0) {
			if(contains(checkMoves,'Gyro Ball') || contains(checkMoves,'Trick Room')) return('Brave');
			else return('Adamant');
		}
		else return('Naughty');
	}
	else if(startsWith(inputtext,"EVs: 252 HP / 252 SpA / ")) {
		if(checkPhysical===0) {
			if(contains(checkMoves,'Trick Room')) return('Quiet');
			else return('Modest');
		}
		else return('Rash');
	}
	else if(inputtext === "EVs: 4 HP / 252 SpA / 252 Spe") {
		return('Timid');
	}
	else if(inputtext === "EVs: 4 HP / 252 Atk / 252 Spe") {
		return('Jolly');
	}
	else if(inputtext=== "EVs: 4 HP / 126 Atk / 126 SpA / 252 Spe") {
		return('Naive');
	}
	else if(startsWith(inputtext,"EVs: 252 HP / 126 Atk / 126 SpA /")) {
		if(rannum === 0) return('Brave');
		else return('Quiet');
	}
	else {
		if(checkPhysical===0) return('Timid');
		else if(checkSpecial===0) return('Jolly');
		else return('Naive');
	}
}

function exportToShowdown() {
	var etext="";
	document.getElementById("exporttextp").style.fontSize = '100%';
	document.getElementById('exporttext').readOnly = true;
	document.getElementById("exporttextp").innerHTML = "Copy to clipboard, then paste into Pokemon Showdown's Teambuilder import/export";
	document.getElementById('exportbox').style.display='inline-block';
	document.getElementById('confirmnames').style.display='inline-block';
	
	var neednames = false;
	if(document.getElementById('confirmnames').innerHTML === 'Remove Names') neednames = true;
	
	if(neednames === false) {
		etext += document.getElementById('poke1choice').value + " @ " + document.getElementById('poke1item').value;
	}
	else { 
		etext += randomName(document.getElementById('poke1choice').value) + " (" + document.getElementById('poke1choice').value + ") @ " + document.getElementById('poke1item').value;
	}
	
	etext += "\nAbility: " + document.getElementById('poke1ability').value;
	if(document.getElementById("pic1").src.includes("shiny/")) {
		etext += "\nShiny: Yes";
	}
	etext += "\n" + suggestedEVs('poke1');
	etext += "\n- " + document.getElementById('poke1move1').value;
	etext += "\n- " + document.getElementById('poke1move2').value;
	etext += "\n- " + document.getElementById('poke1move3').value;
	etext += "\n- " + document.getElementById('poke1move4').value + "\n\n";
	
	if(neednames === false) {
		etext += document.getElementById('poke2choice').value + " @ " + document.getElementById('poke2item').value;
	}
	else { 
		etext += randomName(document.getElementById('poke2choice').value) + " (" + document.getElementById('poke2choice').value + ") @ " + document.getElementById('poke2item').value;
	}
	
	etext += "\nAbility: " + document.getElementById('poke2ability').value;
	if(document.getElementById("pic2").src.includes("shiny/")) {
		etext += "\nShiny: Yes";
	}
	etext += "\n" + suggestedEVs('poke2');
	etext += "\n- " + document.getElementById('poke2move1').value;
	etext += "\n- " + document.getElementById('poke2move2').value;
	etext += "\n- " + document.getElementById('poke2move3').value;
	etext += "\n- " + document.getElementById('poke2move4').value + "\n\n";
	
	if(neednames === false) {
		etext += document.getElementById('poke3choice').value + " @ " + document.getElementById('poke3item').value;
	}
	else { 
		etext += randomName(document.getElementById('poke3choice').value) + " (" + document.getElementById('poke3choice').value + ") @ " + document.getElementById('poke3item').value;
	}
	
	etext += "\nAbility: " + document.getElementById('poke3ability').value;
	if(document.getElementById("pic3").src.includes("shiny/")) {
		etext += "\nShiny: Yes";
	}
	etext += "\n" + suggestedEVs('poke3');
	etext += "\n- " + document.getElementById('poke3move1').value;
	etext += "\n- " + document.getElementById('poke3move2').value;
	etext += "\n- " + document.getElementById('poke3move3').value;
	etext += "\n- " + document.getElementById('poke3move4').value + "\n\n";
	
	if(neednames === false) {
		etext += document.getElementById('poke4choice').value + " @ " + document.getElementById('poke4item').value;
	}
	else { 
		etext += randomName(document.getElementById('poke4choice').value) + " (" + document.getElementById('poke4choice').value + ") @ " + document.getElementById('poke4item').value;
	}
	
	
	etext += "\nAbility: " + document.getElementById('poke4ability').value;
	if(document.getElementById("pic4").src.includes("shiny/")) {
		etext += "\nShiny: Yes";
	}
	etext += "\n" + suggestedEVs('poke4');
	etext += "\n- " + document.getElementById('poke4move1').value;
	etext += "\n- " + document.getElementById('poke4move2').value;
	etext += "\n- " + document.getElementById('poke4move3').value;
	etext += "\n- " + document.getElementById('poke4move4').value + "\n\n";
	
	if(neednames === false) {
		etext += document.getElementById('poke5choice').value + " @ " + document.getElementById('poke5item').value;
	}
	else { 
		etext += randomName(document.getElementById('poke5choice').value) + " (" + document.getElementById('poke5choice').value + ") @ " + document.getElementById('poke5item').value;
	}
	
	etext += "\nAbility: " + document.getElementById('poke5ability').value;
	if(document.getElementById("pic5").src.includes("shiny/")) {
		etext += "\nShiny: Yes";
	}
	etext += "\n" + suggestedEVs('poke5');
	etext += "\n- " + document.getElementById('poke5move1').value;
	etext += "\n- " + document.getElementById('poke5move2').value;
	etext += "\n- " + document.getElementById('poke5move3').value;
	etext += "\n- " + document.getElementById('poke5move4').value + "\n\n";
	
	if(neednames === false) {
		etext += document.getElementById('poke6choice').value + " @ " + document.getElementById('poke6item').value;
	}
	else { 
		etext += randomName(document.getElementById('poke6choice').value) + " (" + document.getElementById('poke6choice').value + ") @ " + document.getElementById('poke6item').value;
	}
	
	etext += "\nAbility: " + document.getElementById('poke6ability').value;
	if(document.getElementById("pic6").src.includes("shiny/")) {
		etext += "\nShiny: Yes";
	}
	etext += "\n" + suggestedEVs('poke6');
	etext += "\n- " + document.getElementById('poke6move1').value;
	etext += "\n- " + document.getElementById('poke6move2').value;
	etext += "\n- " + document.getElementById('poke6move3').value;
	etext += "\n- " + document.getElementById('poke6move4').value;
	
	document.getElementById("exportbox").style.visibility = 'visible';
	document.getElementById("exporttext").value=etext;
	
	//Temporarily disable all select boxes
	
	document.getElementById('poke1choice').disabled=true;
	document.getElementById('poke2choice').disabled=true;
	document.getElementById('poke3choice').disabled=true;
	document.getElementById('poke4choice').disabled=true;
	document.getElementById('poke5choice').disabled=true;
	document.getElementById('poke6choice').disabled=true;
	
	document.getElementById('poke1move1').disabled=true;
	document.getElementById('poke2move1').disabled=true;
	document.getElementById('poke3move1').disabled=true;
	document.getElementById('poke4move1').disabled=true;
	document.getElementById('poke5move1').disabled=true;
	document.getElementById('poke6move1').disabled=true;
	
	document.getElementById('poke1move2').disabled=true;
	document.getElementById('poke2move2').disabled=true;
	document.getElementById('poke3move2').disabled=true;
	document.getElementById('poke4move2').disabled=true;
	document.getElementById('poke5move2').disabled=true;
	document.getElementById('poke6move2').disabled=true;
	
	document.getElementById('poke1move3').disabled=true;
	document.getElementById('poke2move3').disabled=true;
	document.getElementById('poke3move3').disabled=true;
	document.getElementById('poke4move3').disabled=true;
	document.getElementById('poke5move3').disabled=true;
	document.getElementById('poke6move3').disabled=true;
	
	document.getElementById('poke1move4').disabled=true;
	document.getElementById('poke2move4').disabled=true;
	document.getElementById('poke3move4').disabled=true;
	document.getElementById('poke4move4').disabled=true;
	document.getElementById('poke5move4').disabled=true;
	document.getElementById('poke6move4').disabled=true;
	
	document.getElementById('poke1item').disabled=true;
	document.getElementById('poke2item').disabled=true;
	document.getElementById('poke3item').disabled=true;
	document.getElementById('poke4item').disabled=true;
	document.getElementById('poke5item').disabled=true;
	document.getElementById('poke6item').disabled=true;
	
	document.getElementById('poke1ability').disabled=true;
	document.getElementById('poke2ability').disabled=true;
	document.getElementById('poke3ability').disabled=true;
	document.getElementById('poke4ability').disabled=true;
	document.getElementById('poke5ability').disabled=true;
	document.getElementById('poke6ability').disabled=true;
	
	document.getElementById('regionChoice').disabled=true;
	document.getElementById('tierChoice').disabled=true;
	document.getElementById('typeChoice').disabled=true;
	document.getElementById('genRand').disabled=true;
	document.getElementById('exportshowdown').disabled=true;
	document.getElementById('importshowdown').disabled=true;
	document.getElementById('presetshowdown').disabled=true;
	document.getElementById('viableChoice').disabled=true;
	document.getElementById('confirmimport').style.display='none';
}

function hideExportBox() {
	document.getElementById("exportbox").style.visibility = 'hidden';
	document.getElementById("presetbox").style.visibility = 'hidden';
	
	//Re-enable all select boxes
	
	document.getElementById('poke1choice').disabled=false;
	document.getElementById('poke2choice').disabled=false;
	document.getElementById('poke3choice').disabled=false;
	document.getElementById('poke4choice').disabled=false;
	document.getElementById('poke5choice').disabled=false;
	document.getElementById('poke6choice').disabled=false;
	
	document.getElementById('poke1move1').disabled=false;
	document.getElementById('poke2move1').disabled=false;
	document.getElementById('poke3move1').disabled=false;
	document.getElementById('poke4move1').disabled=false;
	document.getElementById('poke5move1').disabled=false;
	document.getElementById('poke6move1').disabled=false;
	
	document.getElementById('poke1move2').disabled=false;
	document.getElementById('poke2move2').disabled=false;
	document.getElementById('poke3move2').disabled=false;
	document.getElementById('poke4move2').disabled=false;
	document.getElementById('poke5move2').disabled=false;
	document.getElementById('poke6move2').disabled=false;
	
	document.getElementById('poke1move3').disabled=false;
	document.getElementById('poke2move3').disabled=false;
	document.getElementById('poke3move3').disabled=false;
	document.getElementById('poke4move3').disabled=false;
	document.getElementById('poke5move3').disabled=false;
	document.getElementById('poke6move3').disabled=false;
	
	document.getElementById('poke1move4').disabled=false;
	document.getElementById('poke2move4').disabled=false;
	document.getElementById('poke3move4').disabled=false;
	document.getElementById('poke4move4').disabled=false;
	document.getElementById('poke5move4').disabled=false;
	document.getElementById('poke6move4').disabled=false;
	
	document.getElementById('poke1item').disabled=false;
	document.getElementById('poke2item').disabled=false;
	document.getElementById('poke3item').disabled=false;
	document.getElementById('poke4item').disabled=false;
	document.getElementById('poke5item').disabled=false;
	document.getElementById('poke6item').disabled=false;
	
	document.getElementById('poke1ability').disabled=false;
	document.getElementById('poke2ability').disabled=false;
	document.getElementById('poke3ability').disabled=false;
	document.getElementById('poke4ability').disabled=false;
	document.getElementById('poke5ability').disabled=false;
	document.getElementById('poke6ability').disabled=false;
	
	document.getElementById('regionChoice').disabled=false;
	document.getElementById('tierChoice').disabled=false;
	document.getElementById('typeChoice').disabled=false;
	document.getElementById('genRand').disabled=false;
	document.getElementById('exportshowdown').disabled=false;
	document.getElementById('importshowdown').disabled=false;
	document.getElementById('presetshowdown').disabled=false;
	document.getElementById('viableChoice').disabled=false;
}

function changeItem(selector) {
	selector.selectedIndex = Math.floor(Math.random()*selector.length);
	if(document.getElementById('viableChoice').value!=='Random') selector.value = 'Leftovers';
	//Set specific items to certain Pokemon (e.g. Megas)
	var selectorpoke = "";
	var hasMega = false;
	var checkPoke = "";
	var checkMoves = [];
	var checkMovesRaw = [];
	var checkAbil = "";
	var checkPhysical = 0;
	var checkSpecial = 0;
	
	switch(selector) {
		case document.getElementById('poke1item'):
			selectorpoke = document.getElementById('poke1choice');
			checkMoves.push(document.getElementById('poke1move1').value);
			checkMoves.push(document.getElementById('poke1move2').value);
			checkMoves.push(document.getElementById('poke1move3').value);
			checkMoves.push(document.getElementById('poke1move4').value);
			checkAbil = document.getElementById('poke1ability').value;
			if (endsWith(selectorpoke.value, 'Mega')) hasMega = true;
			break;
		case document.getElementById('poke2item'):
			selectorpoke = document.getElementById('poke2choice');
			checkMoves.push(document.getElementById('poke2move1').value);
			checkMoves.push(document.getElementById('poke2move2').value);
			checkMoves.push(document.getElementById('poke2move3').value);
			checkMoves.push(document.getElementById('poke2move4').value);
			checkAbil = document.getElementById('poke2ability').value;
			break;
		case document.getElementById('poke3item'):
			selectorpoke = document.getElementById('poke3choice');
			checkMoves.push(document.getElementById('poke3move1').value);
			checkMoves.push(document.getElementById('poke3move2').value);
			checkMoves.push(document.getElementById('poke3move3').value);
			checkMoves.push(document.getElementById('poke3move4').value);
			checkAbil = document.getElementById('poke3ability').value;
			break;
		case document.getElementById('poke4item'):
			selectorpoke = document.getElementById('poke4choice');
			checkMoves.push(document.getElementById('poke4move1').value);
			checkMoves.push(document.getElementById('poke4move2').value);
			checkMoves.push(document.getElementById('poke4move3').value);
			checkMoves.push(document.getElementById('poke4move4').value);
			checkAbil = document.getElementById('poke4ability').value;
			break;
		case document.getElementById('poke5item'):
			selectorpoke = document.getElementById('poke5choice');
			checkMoves.push(document.getElementById('poke5move1').value);
			checkMoves.push(document.getElementById('poke5move2').value);
			checkMoves.push(document.getElementById('poke5move3').value);
			checkMoves.push(document.getElementById('poke5move4').value);
			checkAbil = document.getElementById('poke5ability').value;
			break;
		case document.getElementById('poke6item'):
			selectorpoke = document.getElementById('poke6choice');
			checkMoves.push(document.getElementById('poke6move1').value);
			checkMoves.push(document.getElementById('poke6move2').value);
			checkMoves.push(document.getElementById('poke6move3').value);
			checkMoves.push(document.getElementById('poke6move4').value);
			checkAbil = document.getElementById('poke6ability').value;
			break;
		default:
			break;
	}
	
	for(elem in BattleMovedex) {
		for(i = 0; i < 4; i++) {
			if(BattleMovedex[elem].name === checkMoves[i]) {
				checkMovesRaw.push(elem);
				if(BattleMovedex[elem].category === "Special") checkSpecial +=1;
				if(BattleMovedex[elem].category === "Physical") checkPhysical +=1;
			}
		}
	}
	
	//Get the value of the pokemon and each of their moves
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === selectorpoke.value) {
			checkPoke = elem;
			break;
		}
	}
	
	//Check the weaknesses of the Pokemon
		var tempweakBug = 0;
		var tempweakDark = 0;
		var tempweakDragon = 0;
		var tempweakElectric = 0;
		var tempweakFairy = 0;
		var tempweakFighting = 0;
		var tempweakFire = 0;
		var tempweakFlying = 0;
		var tempweakGhost = 0;
		var tempweakGrass = 0;
		var tempweakGround = 0;
		var tempweakIce = 0;
		var tempweakNormal = 0;
		var tempweakPoison = 0;
		var tempweakPsychic = 0;
		var tempweakRock = 0;
		var tempweakSteel = 0;
		var tempweakWater = 0;
		
		var pokecheck = document.getElementById('poke6choice').value;
		var typecheck = [];
		
	
		typecheck = BattlePokedex[checkPoke].types;
		
		//Now that pokemon types have been found, check weaknesses
		
		if(contains(typecheck,'Bug')) {
			tempweakFire +=1;
			tempweakRock +=1;
			tempweakFlying +=1;
			tempweakFighting -=1;
			tempweakGround -=1;
			tempweakGrass -=1;
		}
		
		if(contains(typecheck,'Electric')) {
			tempweakGround +=1;
			tempweakFlying -=1;
			tempweakSteel -=1;
			tempweakElectric -=1;
		}
		
		if(contains(typecheck,'Dark')) {
			tempweakBug +=1;
			tempweakFighting+=1;
			tempweakFairy +=1;
			tempweakGhost -=1;
			tempweakPsychic -=1;
			tempweakDark -=1;
		}
		
		if(contains(typecheck,'Dragon')) {
			tempweakIce +=1;
			tempweakDragon +=1;
			tempweakFairy +=1;
			tempweakFire -=1;
			tempweakElectric -=1;
			tempweakWater -=1;
			tempweakGrass -=1;
		}
		
		if(contains(typecheck,'Fairy')) {
			tempweakPoison +=1;
			tempweakSteel +=1;
			tempweakFighting -=1;
			tempweakBug -=1;
			tempweakDragon -=1;
			tempweakDark -=1;
		}
		
		if(contains(typecheck,'Fighting')) {
			tempweakFairy +=1;
			tempweakFlying +=1;
			tempweakPsychic +=1;
			tempweakRock -=1;
			tempweakBug -=1;
			tempweakDark -=1;
		}
		
		if(contains(typecheck,'Fire')) {
			tempweakGround +=1;
			tempweakRock +=1;
			tempweakWater +=1;
			tempweakBug -=1;
			tempweakSteel -=1;
			tempweakFire -=1;
			tempweakGrass -=1;
			tempweakIce -=1;
			tempweakFairy -=1;
		}
		
		if(contains(typecheck,'Flying')) {
			tempweakGround -=1;
			tempweakElectric +=1;
			tempweakFighting -=1;
			tempweakRock +=1;
			tempweakBug -=1;
			tempweakGrass -=1;
			tempweakIce +=1;
		}
		
		if(contains(typecheck,'Ghost')) {
			tempweakFighting -=1;
			tempweakPoison -=1;
			tempweakBug -=1;
			tempweakGhost +=1;
			tempweakDark +=1;
		}
		
		if(contains(typecheck,'Grass')) {
			tempweakGround -=1;
			tempweakFlying +=1;
			tempweakElectric -=1;
			tempweakPoison +=1;
			tempweakBug +=1;
			tempweakFire +=1;
			tempweakWater -=1;
			tempweakGrass-=1;
			tempweakIce +=1;
		}
		
		if(contains(typecheck,'Ground')) {
			tempweakWater +=1;
			tempweakGrass +=1;
			tempweakIce +=1;
			tempweakRock -=1;
			tempweakPoison -=1;
			tempweakElectric -=1;
		}
		
		if(contains(typecheck,'Ice')) {
			tempweakFighting +=1;
			tempweakRock +=1;
			tempweakSteel +=1;
			tempweakFire +=1;
			tempweakIce -=1;
		}
		
		if(contains(typecheck,'Normal')) {
			tempweakFighting +=1;
			tempweakGhost -=1;
		}
		
		if(contains(typecheck,'Poison')) {
			tempweakGround +=1;
			tempweakPsychic +=1;
			tempweakFighting -=1;
			tempweakPoison -=1;
			tempweakBug -=1;
			tempweakGrass -=1;
			tempweakFairy -=1;
		}
		
		if(contains(typecheck,'Psychic')) {
			tempweakBug +=1;
			tempweakGhost +=1;
			tempweakDark +=1;
			tempweakFighting -=1;
			tempweakPsychic -=1;
		}
		
		if(contains(typecheck,'Rock')) {
			tempweakGround +=1;
			tempweakFighting +=1;
			tempweakSteel +=1;
			tempweakWater +=1;
			tempweakGrass +=1;
			tempweakFlying -=1;
			tempweakPoison -=1;
			tempweakFire -=1;
		}
		
		if(contains(typecheck,'Steel')) {
			tempweakGround +=1;
			tempweakFighting +=1;
			tempweakFire +=1;
			tempweakFlying -=1;
			tempweakPoison -=1;
			tempweakRock -=1;
			tempweakBug -=1;
			tempweakSteel -=1;
			tempweakGrass -=1;
			tempweakPsychic -=1;
			tempweakIce -=1;
			tempweakDragon -=1;
			tempweakFairy -=1;
		}
		
		if(contains(typecheck,'Water')) {
			tempweakElectric +=1;
			tempweakGrass +=1;
			tempweakSteel -=1;
			tempweakFire -=1;
			tempweakWater -=1;
			tempweakIce -=1;
		}
		
		if(tempweakBug < 0) tempweakBug = 0;
		if(tempweakDark < 0) tempweakDark = 0;
		if(tempweakDragon < 0) tempweakDragon = 0;
		if(tempweakElectric < 0) tempweakElectric = 0;
		if(tempweakFairy < 0) tempweakFairy = 0;
		if(tempweakFighting < 0) tempweakFighting = 0;
		if(tempweakFire < 0) tempweakFire = 0;
		if(tempweakFlying < 0) tempweakFlying = 0;
		if(tempweakGhost < 0) tempweakGhost = 0;
		if(tempweakGrass < 0) tempweakGrass = 0;
		if(tempweakGround < 0) tempweakGround = 0;
		if(tempweakIce < 0) tempweakIce = 0;
		if(tempweakPoison < 0) tempweakPoison = 0;
		if(tempweakPsychic < 0) tempweakPsychic = 0;
		if(tempweakRock < 0) tempweakRock = 0;
		if(tempweakSteel < 0) tempweakSteel = 0;
		if(tempweakWater < 0) tempweakWater = 0;
		
		//Factor in any abilities like Dry Skin
		if(selectorpoke.value==='Levitate') tempweakGround = 0;
		if(selectorpoke.value==='Flash Fire') tempweakFire = 0;
		if(selectorpoke.value==='Lightning Rod') tempweakElectric = 0;
		if(selectorpoke.value==='Motor Drive') tempweakElectric = 0;
		if(selectorpoke.value==='Volt Absorb') tempweakElectric = 0;
		if(selectorpoke.value==='Sap Sipper') tempweakGrass = 0;
		if(selectorpoke.value==='Storm Drain') tempweakWater = 0;
		if(selectorpoke.value==='Water Absorb') tempweakWater = 0;
		if(selectorpoke.value==='Dry Skin') tempweakWater = 0;
		if(selectorpoke.value==='Thick Fat') tempweakIce = 0;
		if(selectorpoke.value==='Thick Fat') tempweakFire = 0;
		if(selectorpoke.value==='Heatproof') tempweakFire = 0;
	//WEAKNESSES CHECKED
	
	
	
	//Change if useless item
	
	if((endsWith(selector.value,'Ball')) && (selector.value !== 'Iron Ball') && (selector.value !== 'Light Ball')) {
		changeItem(selector);
	}
	
	if((endsWith(selector.value,'ite')) || (endsWith(selector.value,'ite X')) || (endsWith(selector.value,'ite Y'))) {
		if(selector.value !== 'Eviolite') changeItem(selector);
	}
	
	if((endsWith(selector.value,'Fossil')) || (endsWith(selector.value,'Amber'))) {
		changeItem(selector);
	}
	
	if((endsWith(selector.value,'Incense')) || (endsWith(selector.value,'Mail'))) {
		changeItem(selector);
	}

	
	if(selector.value==='Macho Brace') {
		changeItem(selector);
	}
	
	if((selector.value==='Belue Berry') || (selector.value==='Bluk Berry') || (selector.value==='Cornn Berry') || (selector.value==='Durin Berry') || (selector.value==='Grepa Berry') || (selector.value==='Hondew Berry')) {
		changeItem(selector);
	}
	
	if((selector.value==='Kelpsy Berry') || (selector.value==='Magost Berry') || (selector.value==='Nanab Berry') || (selector.value==='Nomel Berry') || (selector.value==='Pamtre Berry') || (selector.value==='Pinap Berry')) {
		changeItem(selector);
	}
	
	if((selector.value==='Pomeg Berry') || (selector.value==='Qualot Berry') || (selector.value==='Rabuta Berry') || (selector.value==='Razz Berry') || (selector.value==='Spelon Berry') || (selector.value==='Tamato Berry')) {
		changeItem(selector);
	}
	
	if((selector.value==='Watmel Berry') || (selector.value==='Wepear Berry')) {
		changeItem(selector);
	}
	
	if((selector.value==='Figy Berry') || (selector.value==='Wiki Berry')) {
		changeItem(selector);
	}
	
	if((selector.value==='Mago Berry') || (selector.value==='Aguav Berry')) {
		changeItem(selector);
	}
	
	if(selector.value==='Iapapa Berry') {
		changeItem(selector);
	}
	
	if(selector.value==='Electirizer'){
		changeItem(selector);
	}
	
	if(selector.value==='Oran Berry'){
		selector.value = 'Sitrus Berry';
	}
	
	switch(selectorpoke.value) {
		case 'Venusaur-Mega':
			selector.value='Venusaurite';
			break;
		case 'Charizard-Mega-X':
			selector.value='Charizardite X';
			break;
		case 'Charizard-Mega-Y':
			selector.value='Charizardite Y';
			break;
		case 'Blastoise-Mega':
			selector.value='Blastoisinite';
			break;
		case 'Alakazam-Mega':
			selector.value='Alakazite';
			break;
		case 'Gengar-Mega':
			selector.value='Gengarite';
			break;
		case 'Kangaskhan-Mega':
			selector.value='Kangaskhanite';
			break;
		case 'Pinsir-Mega':
			selector.value='Pinsirite';
			break;
		case 'Gyarados-Mega':
			selector.value='Gyaradosite';
			break;
		case 'Aerodactyl-Mega':
			selector.value='Aerodactylite';
			break;
		case 'Mewtwo-Mega-X':
			selector.value='Mewtwonite X';
			break;
		case 'Mewtwo-Mega-Y':
			selector.value='Mewtwonite Y';
			break;
		case 'Ampharos-Mega':
			selector.value='Ampharosite';
			break;
		case 'Scizor-Mega':
			selector.value='Scizorite';
			break;
		case 'Heracross-Mega':
			selector.value='Heracronite';
			break;
		case 'Houndoom-Mega':
			selector.value='Houndoominite';
			break;
		case 'Tyranitar-Mega':
			selector.value='Tyranitarite';
			break;
		case 'Blaziken-Mega':
			selector.value='Blazikenite';
			break;
		case 'Gardevoir-Mega':
			selector.value='Gardevoirite';
			break;
		case 'Mawile-Mega':
			selector.value='Mawilite';
			break;
		case 'Aggron-Mega':
			selector.value='Aggronite';
			break;
		case 'Medicham-Mega':
			selector.value='Medichamite';
			break;
		case 'Manectric-Mega':
			selector.value='Manectite';
			break;
		case 'Banette-Mega':
			selector.value='Banettite';
			break;
		case 'Absol-Mega':
			selector.value='Absolite';
			break;
		case 'Latios-Mega':
			selector.value='Latiosite';
			break;
		case 'Latias-Mega':
			selector.value='Latiasite';
			break;
		case 'Garchomp-Mega':
			selector.value='Garchompite';
			break;
		case 'Lucario-Mega':
			selector.value='Lucarionite';
			break;
		case 'Abomasnow-Mega':
			selector.value='Abomasite';
			break;
		case 'Beedrill-Mega':
			selector.value='Beedrillite';
			break;
		case 'Pidgeot-Mega':
			selector.value='Pidgeotite';
			break;
		case 'Slowbro-Mega':
			selector.value='Slowbronite';
			break;
		case 'Steelix-Mega':
			selector.value='Steelixite';
			break;
		case 'Sceptile-Mega':
			selector.value='Sceptilite';
			break;
		case 'Swampert-Mega':
			selector.value='Swampertite';
			break;
		case 'Sableye-Mega':
			selector.value='Sablenite';
			break;
		case 'Sharpedo-Mega':
			selector.value='Sharpedonite';
			break;
		case 'Camerupt-Mega':
			selector.value='Cameruptite';
			break;
		case 'Altaria-Mega':
			selector.value='Altarianite';
			break;
		case 'Glalie-Mega':
			selector.value='Glalitite';
			break;
		case 'Salamence-Mega':
			selector.value='Salamencite';
			break;
		case 'Metagross-Mega':
			selector.value='Metagrossite';
			break;
		case 'Lopunny-Mega':
			selector.value='Lopunnite';
			break;
		case 'Gallade-Mega':
			selector.value='Galladite';
			break;
		case 'Audino-Mega':
			selector.value='Audinite';
			break;
		case 'Diancie-Mega':
			selector.value='Diancite';
			break;
		case 'Necrozma-Mega':
			selector.value='ultranecroziumz';
			break;
		case 'Giratina-Origin':
			selector.value='Griseous Orb';
			break;
		case 'Kyogre-Primal':
			selector.value='Blue Orb';
			break;
		case 'Groudon-Primal':
			selector.value='Red Orb';
			break;
		case 'Genesect-Burn':
			selector.value='Burn Drive';
			break;
		case 'Genesect-Douse':
			selector.value='Douse Drive';
			break;
		case 'Genesect-Chill':
			selector.value='Chill Drive';
			break;
		case 'Genesect-Shock':
			selector.value='Shock Drive';
			break;
		case 'Silvally-Dragon':
			selector.value='Dragon Memory';
			break;
		case 'Silvally-Dark':
			selector.value='Dark Memory';
			break;
		case 'Silvally-Ground':
			selector.value='Ground Memory';
			break;
		case 'Silvally-Fighting':
			selector.value='Fighting Memory';
			break;
		case 'Silvally-Fire':
			selector.value='Fire Memory';
			break;
		case 'Silvally-Ice':
			selector.value='Ice Memory';
			break;
		case 'Silvally-Bug':
			selector.value='Bug Memory';
			break;
		case 'Silvally-Steel':
			selector.value='Steel Memory';
			break;
		case 'Silvally-Grass':
			selector.value='Grass Memory';
			break;
		case 'Silvally-Psychic':
			selector.value='Psychic Memory';
			break;
		case 'Silvally-Fairy':
			selector.value='Fairy Memory';
			break;
		case 'Silvally-Flying':
			selector.value='Flying Memory';
			break;
		case 'Silvally-Water':
			selector.value='Water Memory';
			break;
		case 'Silvally-Ghost':
			selector.value='Ghost Memory';
			break;
		case 'Silvally-Rock':
			selector.value='Rock Memory';
			break;
		case 'Silvally-Poison':
			selector.value='Poison Memory';
			break;
		case 'Silvally-Electric':
			selector.value='Electric Memory';
			break;
		case 'Arceus-Dragon':
			selector.value='Draco Plate';
			break;
		case 'Arceus-Dark':
			selector.value='Dread Plate';
			break;
		case 'Arceus-Ground':
			selector.value='Earth Plate';
			break;
		case 'Arceus-Fighting':
			selector.value='Fist Plate';
			break;
		case 'Arceus-Fire':
			selector.value='Flame Plate';
			break;
		case 'Arceus-Ice':
			selector.value='Icicle Plate';
			break;
		case 'Arceus-Bug':
			selector.value='Insect Plate';
			break;
		case 'Arceus-Steel':
			selector.value='Iron Plate';
			break;
		case 'Arceus-Grass':
			selector.value='Meadow Plate';
			break;
		case 'Arceus-Psychic':
			selector.value='Mind Plate';
			break;
		case 'Arceus-Fairy':
			selector.value='Pixie Plate';
			break;
		case 'Arceus-Flying':
			selector.value='Sky Plate';
			break;
		case 'Arceus-Water':
			selector.value='Splash Plate';
			break;
		case 'Arceus-Ghost':
			selector.value='Spooky Plate';
			break;
		case 'Arceus-Rock':
			selector.value='Stone Plate';
			break;
		case 'Arceus-Poison':
			selector.value='Toxic Plate';
			break;
		case 'Arceus-Electric':
			selector.value='Zap Plate';
			break;
		default:
			if(document.getElementById('viableChoice').value!=='Random') {
				switch(selectorpoke.value) {
					case 'Pikachu':
						selector.value='Light Ball';
						break;
                    case "Farfetch’d":
                        selector.value = 'Stick';
                        break;
                    case 'Sirfetch’d':
                        if (Math.floor(Math.random() * 2) === 0) {
                            selector.value = 'Stick';
                        }
                        break;
					case 'Shedinja':
						selector.value='Focus Sash';
						break;
					case 'Dugtrio':
						selector.value='Focus Sash';
						break;
					case 'Cubone':
						selector.value='Thick Club';
						break;
					case 'Marowak':
						selector.value='Thick Club';
						break;
					case 'Marowak-Alola':
						selector.value='Thick Club';
						break;
					case 'Ditto':
						selector.value='Choice Scarf';
						break;
					case 'Unown':
						selector.value='Choice Specs';
						break;
					case 'Dusclops':
						selector.value='Eviolite';
						break;
					case 'Porygon2':
						selector.value='Eviolite';
						break;
					case 'Froslass':
						selector.value='Focus Sash';
						break;
					case 'Clamperl':
						selector.value='DeepSeaTooth';
                        break;
                    case 'Unfezant':
                        if (Math.floor(Math.random() * 2) === 0) {
                            selector.value = 'Razor Claw';
                        }
                        break;
					case 'Dragonite':
						if(checkPhysical >= 4) {
							selector.value = 'Choice Band';
						}
						else {
							selector.value = 'Lum Berry';
						}
						break;
					case 'Sneasel':
						if(Math.floor(Math.random()*2) === 0) {
							selector.value='Life Orb';
						}
						else {
							selector.value='Focus Sash';
						}
						break;
					case 'Dedenne':
						if(checkSpecial >= 2) {
							selector.value = 'Petaya Berry';
						}
						else {
							if(Math.floor(Math.random()*2) === 0) {
								selector.value='Sitrus Berry';
							}
							else {
								selector.value='Starf Berry';
							}
						}
						break;
					case 'Zoroark':
						if(Math.floor(Math.random()*2) === 0) {
							selector.value='Life Orb';
						}
						else {
							selector.value='Focus Sash';
						}
						break;
					case 'Kadabra':
						if(Math.floor(Math.random()*2) === 0) {
							selector.value='Life Orb';
						}
						else {
							selector.value='Focus Sash';
						}
						break;
                    case 'Conkeldurr':
                        if (checkPhysical >= 4) {
                            if (Math.floor(Math.random() * 4) !== 0) {
                                selector.value = 'Assault Vest';
                                break;
                            }
                        }
                        break;
                    case 'Cinderace':
                        if (contains(checkMovesRaw, 'courtchange')) {
                            selector.value = 'Heavy-Duty Boots';
                            break;
                        }
                        break;
					//Deliberate case fall-through
					default:
						if(contains(checkMovesRaw,'trick') || contains(checkMovesRaw,'switcheroo')) {
							if((checkPhysical > 2) && (BattlePokedex[checkPoke].baseStats['spe'] > 95)) {
								selector.value='Choice Band';
							}
							else if((checkSpecial > 2) && (BattlePokedex[checkPoke].baseStats['spe'] > 95)) {
								selector.value='Choice Specs';
							}
							else {
								selector.value='Choice Scarf';
							}
						}
						else if(tempweakRock >= 1 && (contains(checkMovesRaw,'defog') || contains(checkMovesRaw,'rapidspin'))) {
							selector.value = 'Heavy-Duty Boots';
						}
						else if(startsWith(selectorpoke.value,'Pikachu')) {
							selector.value = 'Light Ball';
						}
						else if(contains(checkMovesRaw,'bellydrum')) {
							selector.value = 'Sitrus Berry';
						}
						else if(BattlePokedex[checkPoke].hasOwnProperty('evos') && (BattlePokedex[checkPoke].baseStats['def'] >= 60 || BattlePokedex[checkPoke].baseStats['spd'] >= 60)) {
							selector.value = 'Eviolite';
						}
						else if (contains(checkMovesRaw,'rest') && !contains(checkMovesRaw,'sleeptalk') && checkAbil !== 'Natural Cure' && checkAbil !== 'Shed Skin' && (checkAbil !== 'Hydration' || !contains(checkMovesRaw,'raindance'))) {
							selector.value = 'Chesto Berry';
						}
						else if(checkAbil==='Harvest') {
							selector.value = 'Sitrus Berry';
						}
						else if(contains(checkMovesRaw,'geomancy')) {
							selector.value = 'Power Herb';
						}
						else if(contains(checkMovesRaw,'shellsmash')) {
							selector.value = 'White Herb';
						}
						else if(contains(checkMovesRaw,'stickyweb')) {
							selector.value = 'Focus Sash';
						}
						else if(checkPoke === 'smeargle') {
							selector.value = 'Focus Sash';
						}
						else if(contains(checkMovesRaw,'endure') || (checkAbil==='Sturdy' && (checkPhysical + checkSpecial >= 3))) {
							selector.value = 'Weakness Policy';
						}
						else if(contains(checkMovesRaw,'sunnyday')) {
							selector.value = 'Heat Rock';
						}
						else if(contains(checkMovesRaw,'raindance')) {
							selector.value = 'Damp Rock';
						}
						else if(contains(checkMovesRaw,'sandstorm')) {
							selector.value = 'Smooth Rock';
						}
						else if(contains(checkMovesRaw,'hail')) {
							selector.value = 'Icy Rock';
						}
						else if(contains(checkMovesRaw,'psychoshift') && checkAbil==='Magic Guard') {
							selector.value = 'Flame Orb';
						}
						else if(contains(checkMovesRaw,'fakeout') && checkAbil==='Unburden') {
							selector.value = 'Normal Gem';
						}
						else if(checkAbil==='Sheer Force' || checkAbil==='Magic Guard') {
							selector.value = 'Life Orb';
						}
						else if(contains(checkMovesRaw,'facade') || checkAbil==='Guts' || checkAbil==='Poison Heal' || checkAbil==='Toxic Boost') {
							selector.value = 'Toxic Orb';
							if(checkAbil==='Guts' && contains(checkMovesRaw,'drainpunch')) selector.value='Flame Orb';
							if(checkAbil==='Guts') selector.value='Flame Orb';
							if(checkPoke === 'flareon') selector.value = 'Toxic Orb';
						}
						else if(contains(checkMovesRaw,'reflect') && contains(checkMovesRaw,'lightscreen')) {
							selector.value = 'Light Clay';
						}
						else if(checkPhysical >= 4) {
							if(BattlePokedex[checkPoke].baseStats['spe'] > 95) {
								var ranNum = Math.floor(Math.random()*3);
								if(ranNum === 0) {
									selector.value = 'Expert Belt';
								}
								else {
									if(contains(checkMovesRaw,'suckerpunch') || contains(checkMovesRaw,'fakeout')) {
										selector.value = 'Life Orb';
									}
									else {
										selector.value = 'Choice Band';
									}
								}
							}
							else if(BattlePokedex[checkPoke].baseStats['spd'] >= 70) {
								selector.value = 'Assault Vest';
							}
						}
						else if(checkSpecial >= 4) {
							if(BattlePokedex[checkPoke].baseStats['spe'] > 95) {
								var ranNum = Math.floor(Math.random()*3);
								if(ranNum === 0) {
									selector.value = 'Expert Belt';
								}
								else {
									selector.value = 'Choice Specs';
								}
							}
							else if(BattlePokedex[checkPoke].baseStats['spd'] >= 70) {
								selector.value = 'Assault Vest';
							}
						}
						else if(contains(BattlePokedex[checkPoke].types,'Bug') && contains(BattlePokedex[checkPoke].types,'Flying') && contains(checkMovesRaw,'quiverdance')) {
							selector.value = 'Focus Sash';
						}
						else if(checkAbil==='Iron Barbs' || checkAbil==='Rough Skin') {
							selector.value = 'Rocky Helmet';
						}
						else if(checkAbil === 'Unburden' && contains(checkMovesRaw,'substitute')) {
							selector.value = 'Sitrus Berry';
						}
						else if((checkPhysical + checkSpecial >= 3) && (BattlePokedex[checkPoke].baseStats['spe'] >= 80) && (!contains(checkMovesRaw,'substitute')) && checkAbil!=='Sturdy' && (BattlePokedex[checkPoke].baseStats['atk'] >= 80 || BattlePokedex[checkPoke].baseStats['spa'] >= 80)) {
							selector.value = 'Life Orb';
						}
						/*else if (checkPhysical + checkSpecial >= 4 && BattlePokedex[checkPoke].baseStats['def'] + BattlePokedex[checkPoke].baseStats['spd'] > 179) {
							selector.value = 'Assault Vest';
						}*/
						else if (checkPhysical + checkSpecial >= 4 && BattlePokedex[checkPoke].baseStats['spd'] > 70) {
							selector.value = 'Assault Vest';
						}
						else if(checkPhysical + checkSpecial >= 4) {
							selector.value = 'Expert Belt';
						}
						else if(checkAbil !== 'Sturdy' && (checkPhysical + checkSpecial >= 3) && BattlePokedex[checkPoke].baseStats['def'] + BattlePokedex[checkPoke].baseStats['spd'] + BattlePokedex[checkPoke].baseStats['hp'] < 200) {
							var gotRecoil = false;
							for(i = 0; i < checkMovesRaw.length; i++) {
								if(BattleMovedex[checkMovesRaw[i]].hasOwnProperty('recoil')) gotRecoil = true;
							}
							if(gotRecoil === false) selector.value = 'Focus Sash';
						}
						else if(contains(checkMovesRaw,'outrage')) {
							selector.value = 'Lum Berry';
						}
						else if(checkAbil === 'Unburden') {
							selector.value = 'Sitrus Berry';
						}
						else if(tempweakGround >= 2 && checkAbil!=='Levitate' && !contains(checkMovesRaw,'substitute')) {
							selector.value = 'Air Balloon';
						}
						else if(tempweakGround >= 1 && checkAbil!=='Levitate' && BattlePokedex[checkPoke].baseStats['def']<75 && !contains(checkMovesRaw,'substitute')) {
							selector.value = 'Air Balloon';
						}
						else {
							selector.value = 'Leftovers';
						}
						if(selector.value==='Leftovers' && BattlePokedex[checkPoke].hasOwnProperty('evos')) {
							selector.value = 'Eviolite';
						}
						if(selector.value==='Black Sludge' && BattlePokedex[checkPoke].hasOwnProperty('evos')) {
							selector.value = 'Eviolite';
						}
						if(BattlePokedex[checkPoke].hasOwnProperty('evos') && contains(checkMovesRaw,'substitute')) {
							if(contains(BattlePokedex[checkPoke].types,'Poison')) selector.value = 'Black Sludge';
							else selector.value = 'Leftovers';
						}
						
						if(selector.value==='Leftovers' && contains(BattlePokedex[checkPoke].types,'Poison')) {
							selector.value = 'Black Sludge';
						}
						break;
				}
			}
			break;
		}
	
	
	
}


function filterConflict(filter) {
	if(filter === document.getElementById("typeChoice")) {
		if(document.getElementById("typeChoice") !== '(Any)') document.getElementById("regionChoice").value='(Any)';
	}
	if(filter === document.getElementById("regionChoice")) {
		if(document.getElementById("regionChoice") !== '(Any)') document.getElementById("typeChoice").value='(Any)';
	}
	
	
	
	//Adjust list of pokemon to match filters
	if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) document.getElementById('poke1choice').innerHTML = "";
	if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) document.getElementById('poke2choice').innerHTML = "";
	if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) document.getElementById('poke3choice').innerHTML = "";
	if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) document.getElementById('poke4choice').innerHTML = "";
	if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) document.getElementById('poke5choice').innerHTML = "";
	if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) document.getElementById('poke6choice').innerHTML = "";
	
	var validlist=[];
	var validlist2=[];
	var checktype = document.getElementById("typeChoice").value;
	var checkregion = document.getElementById("regionChoice").value;
	var checktier = document.getElementById("tierChoice").value;
	if(checktier === 'Ubers') {
		checktier = 'Uber';
    }
    if (checktier === "National Dex") {
        checktier = '(Any)';
    }
	if(checktier === 'Hackmons') {
        checktier = '(Any)';
		document.getElementById('viableChoice').value='Random';
	}
	
	
	var temptier = "";
	var badlist=[];
	//Initially, add everything (within tier)
    for (elem in BattlePokedex) {

        if (elem.startsWith('pikachu') && elem !== "pikachu") {
            continue;
        }
        if (elem.startsWith('pichu') && elem !== "pichu") {
            continue;
        }
        if (elem.startsWith('xerneas') && elem !== "xerneas") {
            continue;
        }
        if (elem.startsWith('yveltal') && elem !== "yveltal") {
            continue;
        }

        if (BattlePokedex[elem].num < 1) break;
        try {

            if (BattlePokedex[elem].species.startsWith("Pikachu-") || BattlePokedex[elem].species.startsWith("Pichu-") || BattlePokedex[elem].species.startsWith("Cramorant-")
                || BattlePokedex[elem].species.endsWith("-Totem")
                || BattlePokedex[elem].species.startsWith("Aegislash-")
                || BattlePokedex[elem].species.startsWith("Castform-") || BattlePokedex[elem].species.startsWith("Cherrim-")
                || BattlePokedex[elem].species.endsWith("-Zen") || BattlePokedex[elem].species.endsWith("-Noice") || BattlePokedex[elem].species.endsWith("-Primal")
                || BattlePokedex[elem].species.endsWith("-Busted")
                || BattlePokedex[elem].species.endsWith("-Meteor") || BattlePokedex[elem].species.endsWith("-Hangry") || BattlePokedex[elem].species.startsWith("Vivillon-")
                || BattlePokedex[elem].species.startsWith("Wishiwashi-") || BattlePokedex[elem].species.startsWith("Meloetta-")) {
                continue;
            }

            if ((TiersSWSH[elem].tier === "Unreleased" && document.getElementById("tierChoice").value !== "National Dex") || (TiersSWSH[elem].tier === "Illegal" && document.getElementById("tierChoice").value !== "National Dex") || BattlePokedex[elem].species.endsWith("-Gmax"))
            {
                continue;
            }

            
        }
        catch
        {
        }

        try {
            temptier = TiersSWSH[elem].tier;
        }
        catch (err) {
            if (elem.startsWith('flabebe')) {
                temptier = TiersSWSH['flabebe'].tier;
            }
            else if (elem.startsWith('floette')) {
                temptier = TiersSWSH['floette'].tier;
            }            else if (elem.startsWith('florges')) {

                temptier = TiersSWSH['florges'].tier;
            }
            else if (elem.startsWith('gastrodon')) {
                temptier = TiersSWSH['gastrodon'].tier;
            }
            else if (elem.startsWith('shellos')) {
                temptier = TiersSWSH['shellos'].tier;
            }
            else if (elem.startsWith('minior')) {
                temptier = TiersSWSH['minior'].tier;
            }
            else if (elem.startsWith('vivillon')) {
                temptier = TiersSWSH['vivillon'].tier;
            }
            else {
                temptier = 'OU';
            }
        }
        switch (temptier) {
            case "BL":
            case "UUBL":
                temptier = 'OU';
                break;
            case "BL2":
            case "RUBL":
                temptier = 'UU';
                break;
            case "BL3":
            case "NUBL":
                temptier = 'RU';
                break;
            case "BL4":
            case "PUBL":
                temptier = 'NU';
                break;
            case "(PU)":
            case "ZU":
                temptier = 'ZU';
                break;
            case "LC Uber":
                temptier = 'NFE';
                break;
            default:
                break;
        }

	    /*if(TiersSWSH[elem] == null) {
			temptier = 'OU';
		}*/
        if ((temptier === '')/* || !(TiersSWSH[elem].hasOwnProperty('tier'))*/) {
            if (startsWith(elem, 'arceus')) temptier = 'Uber';
            if ((endsWith(elem, 'mega')) && (elem !== 'yanmega')) {
                temptier = TiersSWSH[(elem.substr(0, elem.length - 4))].tier;
            }

            if ((endsWith(elem, 'megax')) || (endsWith(elem, 'megay'))) {
                temptier = TiersSWSH[(elem.substr(0, elem.length - 5))].tier;
            }

            if (startsWith(elem, 'genesect')) {
                temptier = TiersSWSH['genesect'].tier;
            }

            if (endsWith(elem, 'primal')) {
                temptier = 'Uber';
            }
        }

        if ((temptier === checktier) || (checktier === '(Any)')) {
            validlist.push(BattlePokedex[elem]);
        }


        //if((temptier==='') || !(BattleFormatsData[elem].hasOwnProperty('tier'))) {
        //badlist.push(elem);
        //}
    }

	//alert(badlist);

	
	/*for(elem in BattleFormatsData) {
		validlist.push(BattlePokedex[elem]);
	}*/
	

	//Second filter: types
	if(checktype !== '(Any)') {
		validlisttemp = validlist;
		validlist=[];
		for(i = 0; i < validlisttemp.length; i++) {
			if(contains(validlisttemp[i].types,checktype)) {
				validlist.push(validlisttemp[i]);
			}
		}
	}
	

	//Third filter: region
	
	if(checkregion !== '(Any)') {
		validlisttemp = validlist;
		validlist = [];
		var minnim = 0;
		var maxnum = 0;
		var currnum = 0;
		switch(checkregion) {
			case 'Kanto':
				minnum = 1;
				maxnum = 151;
				break;
			case 'Johto':
				minnum = 152;
				maxnum = 251;
				break;
			case 'Hoenn':
				minnum = 252;
				maxnum = 386;
				break;
			case 'Sinnoh':
				minnum = 387;
				maxnum = 493;
				break;
			case 'Unova':
				minnum = 494;
				maxnum = 649;
				break;
			case 'Kalos':
				minnum = 650;
				maxnum = 721;
				break;
		    case 'Alola':
				minnum = 722;
				maxnum = 809;
                break;
            case 'Galar':
                minnum = 810;
                maxnum = 890;
                break;
		}
		
		
		for(i = 0; i < validlisttemp.length; i++) {
            currnum = validlisttemp[i].num;
            //Consider regional pokes e.g. Alolan Persian
            if (validlisttemp[i].species.endsWith("-Galar")) {
                if (checkregion === "Galar") {
                    validlist.push(validlisttemp[i]);
                }
            }
            if (validlisttemp[i].species.endsWith("-Alola")) {
                if (checkregion === "Alola") {
                    validlist.push(validlisttemp[i]);
                }
            }
			else if((currnum >= minnum) && (currnum <= maxnum)) {
                validlist.push(validlisttemp[i]);
			}
		}
	}
	
	
	


	//Convert validlist to show species names
	for(elem in validlist) {
		try{
			validlist2.push(validlist[elem].species);
		}
		catch(err) {
			
		}
	}
	
	
		
	validlist2.sort();
	
	for(i = 0; i < validlist2.length; i++) {
	
		if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
			var newOption = document.createElement("option");
			newOption.text = validlist2[i];
			document.getElementById('poke1choice').add(newOption);
		}
		if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
			var newOption = document.createElement("option");
			newOption.text = validlist2[i];
			document.getElementById('poke2choice').add(newOption);
		}
		if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
			var newOption = document.createElement("option");
			newOption.text = validlist2[i];
			document.getElementById('poke3choice').add(newOption);
		}
		if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
			var newOption = document.createElement("option");
			newOption.text = validlist2[i];
			document.getElementById('poke4choice').add(newOption);
		}
		if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
			var newOption = document.createElement("option");
			newOption.text = validlist2[i];
			document.getElementById('poke5choice').add(newOption);
		}
		if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
			var newOption = document.createElement("option");
			newOption.text = validlist2[i];
			document.getElementById('poke6choice').add(newOption);
		}
	}
	
}

function getChecklist() {
	var listMoves = [];
	document.getElementById('checkspinner').checked=false;
	document.getElementById('checkcleric').checked=false;
	document.getElementById('checkrecovery').checked=false;
	document.getElementById('checkstatuser').checked=false;
	document.getElementById('checkphaser').checked=false;
	document.getElementById('checkhazards').checked=false;
	document.getElementById('checkpriority').checked=false;
	document.getElementById('checkvoltturn').checked=false;
	document.getElementById('checkboost').checked=false;
	
	
	listMoves.push(document.getElementById('poke1move1').value);
	listMoves.push(document.getElementById('poke1move2').value);
	listMoves.push(document.getElementById('poke1move3').value);
	listMoves.push(document.getElementById('poke1move4').value);
	
	listMoves.push(document.getElementById('poke2move1').value);
	listMoves.push(document.getElementById('poke2move2').value);
	listMoves.push(document.getElementById('poke2move3').value);
	listMoves.push(document.getElementById('poke2move4').value);
	
	listMoves.push(document.getElementById('poke3move1').value);
	listMoves.push(document.getElementById('poke3move2').value);
	listMoves.push(document.getElementById('poke3move3').value);
	listMoves.push(document.getElementById('poke3move4').value);
	
	listMoves.push(document.getElementById('poke4move1').value);
	listMoves.push(document.getElementById('poke4move2').value);
	listMoves.push(document.getElementById('poke4move3').value);
	listMoves.push(document.getElementById('poke4move4').value);
	
	listMoves.push(document.getElementById('poke5move1').value);
	listMoves.push(document.getElementById('poke5move2').value);
	listMoves.push(document.getElementById('poke5move3').value);
	listMoves.push(document.getElementById('poke5move4').value);
	
	listMoves.push(document.getElementById('poke6move1').value);
	listMoves.push(document.getElementById('poke6move2').value);
	listMoves.push(document.getElementById('poke6move3').value);
	listMoves.push(document.getElementById('poke6move4').value);
	
	//Now begin checking list of moves
	
	if((contains(listMoves,"Heal Bell")) || (contains(listMoves,"Aromatherapy")) || (contains(listMoves,"Lunar Dance")) || (contains(listMoves,"Healing Wish"))) {
		document.getElementById('checkcleric').checked=true;
	}
	
	if((contains(listMoves,"Spikes")) || (contains(listMoves,"Toxic Spikes")) || (contains(listMoves,"Stealth Rock")) || (contains(listMoves,"Sticky Web"))) {
		document.getElementById('checkhazards').checked=true;
	}
	
	if((contains(listMoves,"Will-O-Wisp")) || (contains(listMoves,"Glare")) || (contains(listMoves,"Stun Spore")) || (contains(listMoves,"Thunder Wave")) || (contains(listMoves,"Poison Gas")) || (contains(listMoves,"Poison Powder")) || (contains(listMoves,"Toxic")) || (contains(listMoves,"Dark Void")) || (contains(listMoves,"Hypnosis")) || (contains(listMoves,"Sleep Powder")) || (contains(listMoves,"Sing")) || (contains(listMoves,"Grasswhistle")) || (contains(listMoves,"Lovely Kiss")) || (contains(listMoves,"Spore")) || (contains(listMoves,"Yawn"))) {
		document.getElementById('checkstatuser').checked=true;
	}
	
	if((contains(listMoves,"Clear Smog")) || (contains(listMoves,"Haze")) || (contains(listMoves,"Roar")) || (contains(listMoves,"Whirlwind")) || (contains(listMoves,"Dragon Tail")) || (contains(listMoves,"Circle Throw"))) {
		document.getElementById('checkphaser').checked=true;
	}
	
    if ((contains(listMoves, "Rapid Spin")) || (contains(listMoves, "Defog")) || (contains(listMoves, "Court Change"))) {
		document.getElementById('checkspinner').checked=true;
	}
	
	if((contains(listMoves,"Roost")) || (contains(listMoves,"Leech Seed")) || (contains(listMoves,"Lunar Dance")) || (contains(listMoves,"Wish")) || (contains(listMoves,"Healing Wish")) || (contains(listMoves,"Slack Off")) || (contains(listMoves,"Moonlight")) || (contains(listMoves,"Soft-Boiled")) || (contains(listMoves,"Morning Sun")) || (contains(listMoves,"Synthesis")) || (contains(listMoves,"Rest")) || (contains(listMoves,"Milk Drink")) || (contains(listMoves,"Heal Order")) || (contains(listMoves,"Recover"))) {
		document.getElementById('checkrecovery').checked=true;
	}
	
    if ((contains(listMoves, "Volt Switch")) || (contains(listMoves, "U-turn")) || (contains(listMoves, "Parting Shot")) || (contains(listMoves, "Flip Turn"))) {
		document.getElementById('checkvoltturn').checked=true;
	}
	
	//Now check for priority user and stat booster
	
	if(document.getElementById('poke1ability').value === 'Moxie') document.getElementById('checkboost').checked=true;
	if(document.getElementById('poke2ability').value === 'Moxie') document.getElementById('checkboost').checked=true;
	if(document.getElementById('poke3ability').value === 'Moxie') document.getElementById('checkboost').checked=true;
	if(document.getElementById('poke4ability').value === 'Moxie') document.getElementById('checkboost').checked=true;
	if(document.getElementById('poke5ability').value === 'Moxie') document.getElementById('checkboost').checked=true;
	if(document.getElementById('poke6ability').value === 'Moxie') document.getElementById('checkboost').checked=true;
	
	if(contains(listMoves,"Curse")) {
		for(elem in BattlePokedex) {
			
			if(BattlePokedex[elem].species===document.getElementById('poke1choice').value) {
				if(document.getElementById('poke1move1').value === 'Curse' || document.getElementById('poke1move2').value === 'Curse' || document.getElementById('poke1move3').value === 'Curse' || document.getElementById('poke1move4').value === 'Curse') {
					if(contains(BattlePokedex[elem].types,'Ghost')) {
						document.getElementById('checkstatuser').checked=true;
					}
					else {
						document.getElementById('checkboost').checked=true;
					}
				}
			}
			
			if(BattlePokedex[elem].species===document.getElementById('poke2choice').value) {
				if(document.getElementById('poke2move1').value === 'Curse' || document.getElementById('poke2move2').value === 'Curse' || document.getElementById('poke2move3').value === 'Curse' || document.getElementById('poke2move4').value === 'Curse') {
					if(contains(BattlePokedex[elem].types,'Ghost')) {
						document.getElementById('checkstatuser').checked=true;
					}
					else {
						document.getElementById('checkboost').checked=true;
					}
				}
			}
			
			if(BattlePokedex[elem].species===document.getElementById('poke3choice').value) {
				if(document.getElementById('poke3move1').value === 'Curse' || document.getElementById('poke3move2').value === 'Curse' || document.getElementById('poke3move3').value === 'Curse' || document.getElementById('poke3move4').value === 'Curse') {
					if(contains(BattlePokedex[elem].types,'Ghost')) {
						document.getElementById('checkstatuser').checked=true;
					}
					else {
						document.getElementById('checkboost').checked=true;
					}
				}
			}
			
			if(BattlePokedex[elem].species===document.getElementById('poke4choice').value) {
				if(document.getElementById('poke4move1').value === 'Curse' || document.getElementById('poke4move2').value === 'Curse' || document.getElementById('poke4move3').value === 'Curse' || document.getElementById('poke4move4').value === 'Curse') {
					if(contains(BattlePokedex[elem].types,'Ghost')) {
						document.getElementById('checkstatuser').checked=true;
					}
					else {
						document.getElementById('checkboost').checked=true;
					}
				}
			}
			
			if(BattlePokedex[elem].species===document.getElementById('poke5choice').value) {
				if(document.getElementById('poke5move1').value === 'Curse' || document.getElementById('poke5move2').value === 'Curse' || document.getElementById('poke5move3').value === 'Curse' || document.getElementById('poke5move4').value === 'Curse') {
					if(contains(BattlePokedex[elem].types,'Ghost')) {
						document.getElementById('checkstatuser').checked=true;
					}
					else {
						document.getElementById('checkboost').checked=true;
					}
				}
			}
			
			if(BattlePokedex[elem].species===document.getElementById('poke6choice').value) {
				if(document.getElementById('poke6move1').value === 'Curse' || document.getElementById('poke6move2').value === 'Curse' || document.getElementById('poke6move3').value === 'Curse' || document.getElementById('poke6move4').value === 'Curse') {
					if(contains(BattlePokedex[elem].types,'Ghost')) {
						document.getElementById('checkstatuser').checked=true;
					}
					else {
						document.getElementById('checkboost').checked=true;
					}
				}
			}
			
		}
	}
	
	for(elem in BattleMovedex) {
		
		if((BattleMovedex[elem].priority > 0) && (BattleMovedex[elem].basePower > 0)) {
			if(contains(listMoves, BattleMovedex[elem].name)) {
				document.getElementById('checkpriority').checked = true;
			}
		}
		
		if((BattleMovedex[elem].type==='Flying') && (BattleMovedex[elem].basePower > 0)) {
			if(document.getElementById('poke1ability').value === 'Gale Wings') {
				if(document.getElementById('poke1move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke1move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke1move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke1move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke2ability').value === 'Gale Wings') {
				if(document.getElementById('poke2move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke2move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke2move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke2move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke3ability').value === 'Gale Wings') {
				if(document.getElementById('poke3move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke3move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke3move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke3move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke4ability').value === 'Gale Wings') {
				if(document.getElementById('poke4move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke4move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke4move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke4move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke5ability').value === 'Gale Wings') {
				if(document.getElementById('poke5move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke5move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke5move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke5move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke6ability').value === 'Gale Wings') {
				if(document.getElementById('poke6move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke6move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke6move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke6move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
		}
		
		if((BattleMovedex[elem].name==='Draining Kiss')) {
			if(document.getElementById('poke1ability').value === 'Triage') {
				if(document.getElementById('poke1move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke1move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke1move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke1move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke2ability').value === 'Triage') {
				if(document.getElementById('poke2move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke2move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke2move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke2move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke3ability').value === 'Triage') {
				if(document.getElementById('poke3move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke3move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke3move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke3move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke4ability').value === 'Triage') {
				if(document.getElementById('poke4move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke4move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke4move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke4move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke5ability').value === 'Triage') {
				if(document.getElementById('poke5move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke5move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke5move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke5move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
			if(document.getElementById('poke6ability').value === 'Triage') {
				if(document.getElementById('poke6move1').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke6move2').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke6move3').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
				if(document.getElementById('poke6move4').value === BattleMovedex[elem].name) document.getElementById('checkpriority').checked = true;
			}
		}
		
		if(BattleMovedex[elem].hasOwnProperty('boosts') || elem==='bellydrum' || elem==='rapidspin') {
			if(BattleMovedex[elem].target==='self') {
				if(contains(listMoves, BattleMovedex[elem].name)) {
					document.getElementById('checkboost').checked = true;
				}
			}
		}
	}
	
}

function startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
}
 
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function itemChanged(itemchooser) {

	var pokeslot = "";
	switch(itemchooser) {
		case document.getElementById('poke1item'):
			pokeslot = document.getElementById('poke1choice');
			break;
		case document.getElementById('poke2item'):
			pokeslot = document.getElementById('poke2choice');
			break;
		case document.getElementById('poke3item'):
			pokeslot = document.getElementById('poke3choice');
			break;
		case document.getElementById('poke4item'):
			pokeslot = document.getElementById('poke4choice');
			break;
		case document.getElementById('poke5item'):
			pokeslot = document.getElementById('poke5choice');
			break;
		case document.getElementById('poke6item'):
			pokeslot = document.getElementById('poke6choice');
			break;
		default:
			break;
	}
	

	//Since item has just been changed (potentially), check Arceus/Genesect forme
	if(startsWith(pokeslot.value, "Genesect")) {

		switch(itemchooser.value) {
			case 'Burn Drive':
				pokeslot.value = "Genesect-Burn";
				changePic(pokeslot);
				itemchooser.value = 'Burn Drive';
				break;
			case 'Chill Drive':
				pokeslot.value = "Genesect-Chill";
				changePic(pokeslot);
				itemchooser.value = 'Chill Drive';
				break;
			case 'Douse Drive':
				pokeslot.value = "Genesect-Douse";
				changePic(pokeslot);
				itemchooser.value = 'Douse Drive';
				break;
			case 'Shock Drive':
				pokeslot.value = "Genesect-Shock";
				changePic(pokeslot);
				itemchooser.value = 'Shock Drive';
				break;
			default:
				pokeslot.value = "Genesect";
				changePic(pokeslot);
				break;
			
		}
	}
	
	if(startsWith(pokeslot.value, "Arceus")) {

		switch(itemchooser.value) {
			case 'Draco Plate':
				pokeslot.value = "Arceus-Dragon";
				changePic(pokeslot);
				itemchooser.value = 'Draco Plate';
				break;
			case 'Dread Plate':
				pokeslot.value = "Arceus-Dark";
				changePic(pokeslot);
				itemchooser.value = 'Dread Plate';
				break;
			case 'Earth Plate':
				pokeslot.value = "Arceus-Ground";
				changePic(pokeslot);
				itemchooser.value = 'Earth Plate';
				break;
			case 'Fist Plate':
				pokeslot.value = "Arceus-Fighting";
				changePic(pokeslot);
				itemchooser.value = 'Fist Plate';
				break;
			case 'Flame Plate':
				pokeslot.value = "Arceus-Fire";
				changePic(pokeslot);
				itemchooser.value = 'Flame Plate';
				break;
			case 'Icicle Plate':
				pokeslot.value = "Arceus-Ice";
				changePic(pokeslot);
				itemchooser.value = 'Icicle Plate';
				break;
			case 'Insect Plate':
				pokeslot.value = "Arceus-Bug";
				changePic(pokeslot);
				itemchooser.value = 'Insect Plate';
				break;
			case 'Iron Plate':
				pokeslot.value = "Arceus-Steel";
				changePic(pokeslot);
				itemchooser.value = 'Iron Plate';
				break;
			case 'Meadow Plate':
				pokeslot.value = "Arceus-Grass";
				changePic(pokeslot);
				itemchooser.value = 'Meadow Plate';
				break;
			case 'Mind Plate':
				pokeslot.value = "Arceus-Psychic";
				changePic(pokeslot);
				itemchooser.value = 'Mind Plate';
				break;
			case 'Pixie Plate':
				pokeslot.value = "Arceus-Fairy";
				changePic(pokeslot);
				itemchooser.value = 'Pixie Plate';
				break;
			case 'Sky Plate':
				pokeslot.value = "Arceus-Flying";
				changePic(pokeslot);
				itemchooser.value = 'Sky Plate';
				break;
			case 'Splash Plate':
				pokeslot.value = "Arceus-Water";
				changePic(pokeslot);
				itemchooser.value = 'Splash Plate';
				break;
			case 'Spooky Plate':
				pokeslot.value = "Arceus-Ghost";
				changePic(pokeslot);
				itemchooser.value = 'Spooky Plate';
				break;
			case 'Stone Plate':
				pokeslot.value = "Arceus-Rock";
				changePic(pokeslot);
				itemchooser.value = 'Stone Plate';
				break;
			case 'Toxic Plate':
				pokeslot.value = "Arceus-Poison";
				changePic(pokeslot);
				itemchooser.value = 'Toxic Plate';
				break;
			case 'Zap Plate':
				pokeslot.value = "Arceus-Electric";
				changePic(pokeslot);
				itemchooser.value = 'Zap Plate';
				break;
			default:
				pokeslot.value = "Arceus";
				changePic(pokeslot);
				break;
			
		}
	}
	
	//Forme checking done
}


function getStrengths() {



	var strongBug = 0;
	var strongDark = 0;
	var strongDragon = 0;
	var strongElectric = 0;
	var strongFairy = 0;
	var strongFighting = 0;
	var strongFire = 0;
	var strongFlying = 0;
	var strongGhost = 0;
	var strongGrass = 0;
	var strongGround = 0;
	var strongIce = 0;
	var strongNormal = 0;
	var strongPoison = 0;
	var strongPsychic = 0;
	var strongRock = 0;
	var strongSteel = 0;
	var strongWater = 0;
	
	var attacktypes = []
	attacktypes.push(checkType(poke1move1));
	attacktypes.push(checkType(poke1move2));
	attacktypes.push(checkType(poke1move3));
	attacktypes.push(checkType(poke1move4));
	
	attacktypes.push(checkType(poke2move1));
	attacktypes.push(checkType(poke2move2));
	attacktypes.push(checkType(poke2move3));
	attacktypes.push(checkType(poke2move4));
	
	attacktypes.push(checkType(poke3move1));
	attacktypes.push(checkType(poke3move2));
	attacktypes.push(checkType(poke3move3));
	attacktypes.push(checkType(poke3move4));
	
	attacktypes.push(checkType(poke4move1));
	attacktypes.push(checkType(poke4move2));
	attacktypes.push(checkType(poke4move3));
	attacktypes.push(checkType(poke4move4));
	
	attacktypes.push(checkType(poke5move1));
	attacktypes.push(checkType(poke5move2));
	attacktypes.push(checkType(poke5move3));
	attacktypes.push(checkType(poke5move4));
	
	attacktypes.push(checkType(poke6move1));
	attacktypes.push(checkType(poke6move2));
	attacktypes.push(checkType(poke6move3));
	attacktypes.push(checkType(poke6move4));
	
	//Run through array of types and add to strengths accordingly
	for(i = 0; i < (attacktypes.length); i++) {
		switch(attacktypes[i]) {
			case 'Bug':
				strongPsychic+=1;
				strongGrass+=1;
				strongDark+=1;
				break;
			case 'Dark':
				strongPsychic+=1;
				strongGhost+=1;
				break;
			case 'Dragon':
				strongDragon+=1;
				break;
			case 'Electric':
				strongFlying+=1;
				strongWater+=1;
				break;
			case 'Fairy':
				strongFighting+=1;
				strongDragon+=1;
				strongDark+=1;
				break;
			case 'Fighting':
				strongNormal+=1;
				strongIce+=1;
				strongDark+=1;
				strongRock+=1;
				strongSteel+=1;
				break;
			case 'Fire':
				strongIce+=1;
				strongGrass+=1;
				strongBug+=1;
				strongSteel+=1;
				break;
			case 'Flying':
				strongBug+=1;
				strongGrass+=1;
				strongFighting+=1;
				break;
			case 'Ghost':
				strongPsychic+=1;
				strongGhost+=1;
				break;
			case 'Grass':
				strongWater+=1;
				strongGround+=1;
				strongRock+=1;
				break;
			case 'Ground':
				strongRock+=1;
				strongSteel+=1;
				strongElectric+=1;
				strongFire+=1;
				strongPoison+=1;
				break;
			case 'Ice':
				strongGround+=1;
				strongGrass+=1;
				strongDragon+=1;
				strongFlying+=1;
				break;
			case 'Freeze Dry':
				strongGround+=1;
				strongGrass+=1;
				strongDragon+=1;
				strongFlying+=1;
				strongWater+=1;
				break;
			case 'Normal':
				break;
			case 'Poison':
				strongFairy+=1;
				strongGrass+=1;
				break;
			case 'Psychic':
				strongPoison+=1;
				strongFighting+=1;
				break;
			case 'Rock':
				strongBug+=1;
				strongFlying+=1;
				strongFire+=1;
				strongIce+=1;
				break;
			case 'Steel':
				strongFairy+=1;
				strongRock+=1;
				strongIce+=1;
				break;
			case 'Water':
				strongFire+=1;
				strongGround+=1;
				strongRock+=1;
				break;
			default:
				break;
		}
	}

    var whitecol = '#f3dd79';
	
	document.getElementById('strongbug').value = strongBug;
	if(strongBug === 0) {
		document.getElementById('strongbug').style.fontWeight='bold';
		document.getElementById('strongbug').style.color='red';
	}
	else {
		document.getElementById('strongbug').style.fontWeight='normal';
        document.getElementById('strongbug').style.color = whitecol;
	}
	document.getElementById('strongdark').value = strongDark;
	if(strongDark === 0) {
		document.getElementById('strongdark').style.fontWeight='bold';
		document.getElementById('strongdark').style.color='red';
	}
	else {
		document.getElementById('strongdark').style.fontWeight='normal';
        document.getElementById('strongdark').style.color =whitecol;
	}
	document.getElementById('strongdragon').value = strongDragon;
	if(strongDragon === 0) {
		document.getElementById('strongdragon').style.fontWeight='bold';
		document.getElementById('strongdragon').style.color='red';
	}
	else {
		document.getElementById('strongdragon').style.fontWeight='normal';
        document.getElementById('strongdragon').style.color =whitecol;
	}
	document.getElementById('strongelectric').value = strongElectric;
	if(strongElectric === 0) {
		document.getElementById('strongelectric').style.fontWeight='bold';
		document.getElementById('strongelectric').style.color='red';
	}
	else {
		document.getElementById('strongelectric').style.fontWeight='normal';
        document.getElementById('strongelectric').style.color =whitecol;
	}
	document.getElementById('strongfairy').value = strongFairy;
	if(strongFairy === 0) {
		document.getElementById('strongfairy').style.fontWeight='bold';
		document.getElementById('strongfairy').style.color='red';
	}
	else {
		document.getElementById('strongfairy').style.fontWeight='normal';
        document.getElementById('strongfairy').style.color =whitecol;
	}
	document.getElementById('strongfight').value = strongFighting;
	if(strongFighting === 0) {
		document.getElementById('strongfight').style.fontWeight='bold';
		document.getElementById('strongfight').style.color='red';
	}
	else {
		document.getElementById('strongfight').style.fontWeight='normal';
        document.getElementById('strongfight').style.color =whitecol;
	}
	document.getElementById('strongfire').value = strongFire;
	if(strongFire === 0) {
		document.getElementById('strongfire').style.fontWeight='bold';
		document.getElementById('strongfire').style.color='red';
	}
	else {
		document.getElementById('strongfire').style.fontWeight='normal';
        document.getElementById('strongfire').style.color =whitecol;
	}
	document.getElementById('strongflying').value = strongFlying;
	if(strongFlying === 0) {
		document.getElementById('strongflying').style.fontWeight='bold';
		document.getElementById('strongflying').style.color='red';
	}
	else {
		document.getElementById('strongflying').style.fontWeight='normal';
        document.getElementById('strongflying').style.color =whitecol;
	}
	document.getElementById('strongghost').value = strongGhost;
	if(strongGhost === 0) {
		document.getElementById('strongghost').style.fontWeight='bold';
		document.getElementById('strongghost').style.color='red';
	}
	else {
		document.getElementById('strongghost').style.fontWeight='normal';
        document.getElementById('strongghost').style.color =whitecol;
	}
	document.getElementById('stronggrass').value = strongGrass;
	if(strongGrass === 0) {
		document.getElementById('stronggrass').style.fontWeight='bold';
		document.getElementById('stronggrass').style.color='red';
	}
	else {
		document.getElementById('stronggrass').style.fontWeight='normal';
        document.getElementById('stronggrass').style.color =whitecol;
	}
	document.getElementById('strongground').value = strongGround;
	if(strongGround === 0) {
		document.getElementById('strongground').style.fontWeight='bold';
		document.getElementById('strongground').style.color='red';
	}
	else {
		document.getElementById('strongground').style.fontWeight='normal';
        document.getElementById('strongground').style.color =whitecol;
	}
	document.getElementById('strongice').value = strongIce;
	if(strongIce === 0) {
		document.getElementById('strongice').style.fontWeight='bold';
		document.getElementById('strongice').style.color='red';
	}
	else {
		document.getElementById('strongice').style.fontWeight='normal';
        document.getElementById('strongice').style.color =whitecol;
	}
	document.getElementById('strongnormal').value = strongNormal;
	if(strongNormal === 0) {
		document.getElementById('strongnormal').style.fontWeight='bold';
		document.getElementById('strongnormal').style.color='red';
	}
	else {
		document.getElementById('strongnormal').style.fontWeight='normal';
        document.getElementById('strongnormal').style.color =whitecol;
	}
	document.getElementById('strongpoison').value = strongPoison;
	if(strongPoison === 0) {
		document.getElementById('strongpoison').style.fontWeight='bold';
		document.getElementById('strongpoison').style.color='red';
	}
	else {
		document.getElementById('strongpoison').style.fontWeight='normal';
        document.getElementById('strongpoison').style.color =whitecol;
	}
	document.getElementById('strongpsychic').value = strongPsychic;
	if(strongPsychic === 0) {
		document.getElementById('strongpsychic').style.fontWeight='bold';
		document.getElementById('strongpsychic').style.color='red';
	}
	else {
		document.getElementById('strongpsychic').style.fontWeight='normal';
        document.getElementById('strongpsychic').style.color =whitecol;
	}
	document.getElementById('strongrock').value = strongRock;
	if(strongRock === 0) {
		document.getElementById('strongrock').style.fontWeight='bold';
		document.getElementById('strongrock').style.color='red';
	}
	else {
		document.getElementById('strongrock').style.fontWeight='normal';
        document.getElementById('strongrock').style.color =whitecol;
	}
	document.getElementById('strongsteel').value = strongSteel;
	if(strongSteel === 0) {
		document.getElementById('strongsteel').style.fontWeight='bold';
		document.getElementById('strongsteel').style.color='red';
	}
	else {
		document.getElementById('strongsteel').style.fontWeight='normal';
        document.getElementById('strongsteel').style.color =whitecol;
	}
	document.getElementById('strongwater').value = strongWater;
	if(strongWater === 0) {
		document.getElementById('strongwater').style.fontWeight='bold';
		document.getElementById('strongwater').style.color='red';
	}
	else {
		document.getElementById('strongwater').style.fontWeight='normal';
        document.getElementById('strongwater').style.color =whitecol;
	}
	
	//Since this runs whenever a move is changed, adjust checklist
	getChecklist();
	
}

//Check for weaknesses
function getWeaknesses() {

    var whitecol = '#f3dd79';

	var weakBug = 0;
	var weakDark = 0;
	var weakDragon = 0;
	var weakElectric = 0;
	var weakFairy = 0;
	var weakFighting = 0;
	var weakFire = 0;
	var weakFlying = 0;
	var weakGhost = 0;
	var weakGrass = 0;
	var weakGround = 0;
	var weakIce = 0;
	var weakNormal = 0;
	var weakPoison = 0;
	var weakPsychic = 0;
	var weakRock = 0;
	var weakSteel = 0;
	var weakWater = 0;
	
	//**********************Check first Pokemon******************************************************
	
	var tempweakBug = 0;
	var tempweakDark = 0;
	var tempweakDragon = 0;
	var tempweakElectric = 0;
	var tempweakFairy = 0;
	var tempweakFighting = 0;
	var tempweakFire = 0;
	var tempweakFlying = 0;
	var tempweakGhost = 0;
	var tempweakGrass = 0;
	var tempweakGround = 0;
	var tempweakIce = 0;
	var tempweakNormal = 0;
	var tempweakPoison = 0;
	var tempweakPsychic = 0;
	var tempweakRock = 0;
	var tempweakSteel = 0;
	var tempweakWater = 0;
	
	var pokecheck = document.getElementById('poke1choice').value;
	var typecheck = [];
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === pokecheck) {
			typecheck = BattlePokedex[elem].types;
			break;
		}
	}
	//Now that pokemon types have been found, check weaknesses
	
	if(contains(typecheck,'Bug')) {
		tempweakFire +=1;
		tempweakRock +=1;
		tempweakFlying +=1;
		tempweakFighting -=1;
		tempweakGround -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Electric')) {
		tempweakGround +=1;
		tempweakFlying -=1;
		tempweakSteel -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Dark')) {
		tempweakBug +=1;
		tempweakFighting+=1;
		tempweakFairy +=1;
		tempweakGhost -=1;
		tempweakPsychic -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Dragon')) {
		tempweakIce +=1;
		tempweakDragon +=1;
		tempweakFairy +=1;
		tempweakFire -=1;
		tempweakElectric -=1;
		tempweakWater -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Fairy')) {
		tempweakPoison +=1;
		tempweakSteel +=1;
		tempweakFighting -=1;
		tempweakBug -=1;
		tempweakDragon -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fighting')) {
		tempweakFairy +=1;
		tempweakFlying +=1;
		tempweakPsychic +=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fire')) {
		tempweakGround +=1;
		tempweakRock +=1;
		tempweakWater +=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakGrass -=1;
		tempweakIce -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Flying')) {
		tempweakGround -=1;
		tempweakElectric +=1;
		tempweakFighting -=1;
		tempweakRock +=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ghost')) {
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGhost +=1;
		tempweakDark +=1;
	}
	
	if(contains(typecheck,'Grass')) {
		tempweakGround -=1;
		tempweakFlying +=1;
		tempweakElectric -=1;
		tempweakPoison +=1;
		tempweakBug +=1;
		tempweakFire +=1;
		tempweakWater -=1;
		tempweakGrass-=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ground')) {
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakIce +=1;
		tempweakRock -=1;
		tempweakPoison -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Ice')) {
		tempweakFighting +=1;
		tempweakRock +=1;
		tempweakSteel +=1;
		tempweakFire +=1;
		tempweakIce -=1;
	}
	
	if(contains(typecheck,'Normal')) {
		tempweakFighting +=1;
		tempweakGhost -=1;
	}
	
	if(contains(typecheck,'Poison')) {
		tempweakGround +=1;
		tempweakPsychic +=1;
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Psychic')) {
		tempweakBug +=1;
		tempweakGhost +=1;
		tempweakDark +=1;
		tempweakFighting -=1;
		tempweakPsychic -=1;
	}
	
	if(contains(typecheck,'Rock')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakSteel +=1;
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakFire -=1;
	}
	
	if(contains(typecheck,'Steel')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakFire +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakGrass -=1;
		tempweakPsychic -=1;
		tempweakIce -=1;
		tempweakDragon -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Water')) {
		tempweakElectric +=1;
		tempweakGrass +=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakWater -=1;
		tempweakIce -=1;
	}
	
	if(tempweakBug < 0) tempweakBug = 0;
	if(tempweakDark < 0) tempweakDark = 0;
	if(tempweakDragon < 0) tempweakDragon = 0;
	if(tempweakElectric < 0) tempweakElectric = 0;
	if(tempweakFairy < 0) tempweakFairy = 0;
	if(tempweakFighting < 0) tempweakFighting = 0;
	if(tempweakFire < 0) tempweakFire = 0;
	if(tempweakFlying < 0) tempweakFlying = 0;
	if(tempweakGhost < 0) tempweakGhost = 0;
	if(tempweakGrass < 0) tempweakGrass = 0;
	if(tempweakGround < 0) tempweakGround = 0;
	if(tempweakIce < 0) tempweakIce = 0;
	if(tempweakPoison < 0) tempweakPoison = 0;
	if(tempweakPsychic < 0) tempweakPsychic = 0;
	if(tempweakRock < 0) tempweakRock = 0;
	if(tempweakSteel < 0) tempweakSteel = 0;
	if(tempweakWater < 0) tempweakWater = 0;
	
	//Factor in any abilities like Dry Skin
	if(document.getElementById('poke1ability').value==='Levitate') tempweakGround = 0;
	if(document.getElementById('poke1ability').value==='Flash Fire') tempweakFire = 0;
	if(document.getElementById('poke1ability').value==='Lightning Rod') tempweakElectric = 0;
	if(document.getElementById('poke1ability').value==='Motor Drive') tempweakElectric = 0;
	if(document.getElementById('poke1ability').value==='Volt Absorb') tempweakElectric = 0;
	if(document.getElementById('poke1ability').value==='Sap Sipper') tempweakGrass = 0;
	if(document.getElementById('poke1ability').value==='Storm Drain') tempweakWater = 0;
	if(document.getElementById('poke1ability').value==='Water Absorb') tempweakWater = 0;
	if(document.getElementById('poke1ability').value==='Dry Skin') tempweakWater = 0;
	if(document.getElementById('poke1ability').value==='Thick Fat') tempweakIce = 0;
	if(document.getElementById('poke1ability').value==='Thick Fat') tempweakFire = 0;
	if(document.getElementById('poke1ability').value==='Heatproof') tempweakFire = 0;
	
	weakBug += tempweakBug;
	weakDark += tempweakDark;
	weakDragon += tempweakDragon;
	weakElectric += tempweakElectric;
	weakFairy += tempweakFairy;
	weakFighting += tempweakFighting;
	weakFire += tempweakFire;
	weakFlying += tempweakFlying;
	weakGhost += tempweakGhost;
	weakGrass += tempweakGrass;
	weakGround += tempweakGround;
	weakIce += tempweakIce;
	weakPoison += tempweakPoison;
	weakPsychic += tempweakPsychic;
	weakRock += tempweakRock;
	weakSteel += tempweakSteel;
	weakWater += tempweakWater;
	
	//**********************Check second Pokemon******************************************************
	
	var tempweakBug = 0;
	var tempweakDark = 0;
	var tempweakDragon = 0;
	var tempweakElectric = 0;
	var tempweakFairy = 0;
	var tempweakFighting = 0;
	var tempweakFire = 0;
	var tempweakFlying = 0;
	var tempweakGhost = 0;
	var tempweakGrass = 0;
	var tempweakGround = 0;
	var tempweakIce = 0;
	var tempweakNormal = 0;
	var tempweakPoison = 0;
	var tempweakPsychic = 0;
	var tempweakRock = 0;
	var tempweakSteel = 0;
	var tempweakWater = 0;
	
	var pokecheck = document.getElementById('poke2choice').value;
	var typecheck = [];
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === pokecheck) {
			typecheck = BattlePokedex[elem].types;
			break;
		}
	}
	//Now that pokemon types have been found, check weaknesses
	
	if(contains(typecheck,'Bug')) {
		tempweakFire +=1;
		tempweakRock +=1;
		tempweakFlying +=1;
		tempweakFighting -=1;
		tempweakGround -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Electric')) {
		tempweakGround +=1;
		tempweakFlying -=1;
		tempweakSteel -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Dark')) {
		tempweakBug +=1;
		tempweakFighting+=1;
		tempweakFairy +=1;
		tempweakGhost -=1;
		tempweakPsychic -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Dragon')) {
		tempweakIce +=1;
		tempweakDragon +=1;
		tempweakFairy +=1;
		tempweakFire -=1;
		tempweakElectric -=1;
		tempweakWater -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Fairy')) {
		tempweakPoison +=1;
		tempweakSteel +=1;
		tempweakFighting -=1;
		tempweakBug -=1;
		tempweakDragon -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fighting')) {
		tempweakFairy +=1;
		tempweakFlying +=1;
		tempweakPsychic +=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fire')) {
		tempweakGround +=1;
		tempweakRock +=1;
		tempweakWater +=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakGrass -=1;
		tempweakIce -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Flying')) {
		tempweakGround -=1;
		tempweakElectric +=1;
		tempweakFighting -=1;
		tempweakRock +=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ghost')) {
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGhost +=1;
		tempweakDark +=1;
	}
	
	if(contains(typecheck,'Grass')) {
		tempweakGround -=1;
		tempweakFlying +=1;
		tempweakElectric -=1;
		tempweakPoison +=1;
		tempweakBug +=1;
		tempweakFire +=1;
		tempweakWater -=1;
		tempweakGrass-=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ground')) {
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakIce +=1;
		tempweakRock -=1;
		tempweakPoison -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Ice')) {
		tempweakFighting +=1;
		tempweakRock +=1;
		tempweakSteel +=1;
		tempweakFire +=1;
		tempweakIce -=1;
	}
	
	if(contains(typecheck,'Normal')) {
		tempweakFighting +=1;
		tempweakGhost -=1;
	}
	
	if(contains(typecheck,'Poison')) {
		tempweakGround +=1;
		tempweakPsychic +=1;
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Psychic')) {
		tempweakBug +=1;
		tempweakGhost +=1;
		tempweakDark +=1;
		tempweakFighting -=1;
		tempweakPsychic -=1;
	}
	
	if(contains(typecheck,'Rock')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakSteel +=1;
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakFire -=1;
	}
	
	if(contains(typecheck,'Steel')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakFire +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakGrass -=1;
		tempweakPsychic -=1;
		tempweakIce -=1;
		tempweakDragon -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Water')) {
		tempweakElectric +=1;
		tempweakGrass +=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakWater -=1;
		tempweakIce -=1;
	}
	
	if(tempweakBug < 0) tempweakBug = 0;
	if(tempweakDark < 0) tempweakDark = 0;
	if(tempweakDragon < 0) tempweakDragon = 0;
	if(tempweakElectric < 0) tempweakElectric = 0;
	if(tempweakFairy < 0) tempweakFairy = 0;
	if(tempweakFighting < 0) tempweakFighting = 0;
	if(tempweakFire < 0) tempweakFire = 0;
	if(tempweakFlying < 0) tempweakFlying = 0;
	if(tempweakGhost < 0) tempweakGhost = 0;
	if(tempweakGrass < 0) tempweakGrass = 0;
	if(tempweakGround < 0) tempweakGround = 0;
	if(tempweakIce < 0) tempweakIce = 0;
	if(tempweakPoison < 0) tempweakPoison = 0;
	if(tempweakPsychic < 0) tempweakPsychic = 0;
	if(tempweakRock < 0) tempweakRock = 0;
	if(tempweakSteel < 0) tempweakSteel = 0;
	if(tempweakWater < 0) tempweakWater = 0;
	
	//Factor in any abilities like Dry Skin
	if(document.getElementById('poke2ability').value==='Levitate') tempweakGround = 0;
	if(document.getElementById('poke2ability').value==='Flash Fire') tempweakFire = 0;
	if(document.getElementById('poke2ability').value==='Lightning Rod') tempweakElectric = 0;
	if(document.getElementById('poke2ability').value==='Motor Drive') tempweakElectric = 0;
	if(document.getElementById('poke2ability').value==='Volt Absorb') tempweakElectric = 0;
	if(document.getElementById('poke2ability').value==='Sap Sipper') tempweakGrass = 0;
	if(document.getElementById('poke2ability').value==='Storm Drain') tempweakWater = 0;
	if(document.getElementById('poke2ability').value==='Water Absorb') tempweakWater = 0;
	if(document.getElementById('poke2ability').value==='Dry Skin') tempweakWater = 0;
	if(document.getElementById('poke2ability').value==='Thick Fat') tempweakIce = 0;
	if(document.getElementById('poke2ability').value==='Thick Fat') tempweakFire = 0;
	if(document.getElementById('poke2ability').value==='Heatproof') tempweakFire = 0;
	
	weakBug += tempweakBug;
	weakDark += tempweakDark;
	weakDragon += tempweakDragon;
	weakElectric += tempweakElectric;
	weakFairy += tempweakFairy;
	weakFighting += tempweakFighting;
	weakFire += tempweakFire;
	weakFlying += tempweakFlying;
	weakGhost += tempweakGhost;
	weakGrass += tempweakGrass;
	weakGround += tempweakGround;
	weakIce += tempweakIce;
	weakPoison += tempweakPoison;
	weakPsychic += tempweakPsychic;
	weakRock += tempweakRock;
	weakSteel += tempweakSteel;
	weakWater += tempweakWater;
	
	//**********************Check third Pokemon******************************************************
	
	var tempweakBug = 0;
	var tempweakDark = 0;
	var tempweakDragon = 0;
	var tempweakElectric = 0;
	var tempweakFairy = 0;
	var tempweakFighting = 0;
	var tempweakFire = 0;
	var tempweakFlying = 0;
	var tempweakGhost = 0;
	var tempweakGrass = 0;
	var tempweakGround = 0;
	var tempweakIce = 0;
	var tempweakNormal = 0;
	var tempweakPoison = 0;
	var tempweakPsychic = 0;
	var tempweakRock = 0;
	var tempweakSteel = 0;
	var tempweakWater = 0;
	
	var pokecheck = document.getElementById('poke3choice').value;
	var typecheck = [];
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === pokecheck) {
			typecheck = BattlePokedex[elem].types;
			break;
		}
	}
	//Now that pokemon types have been found, check weaknesses
	
	if(contains(typecheck,'Bug')) {
		tempweakFire +=1;
		tempweakRock +=1;
		tempweakFlying +=1;
		tempweakFighting -=1;
		tempweakGround -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Electric')) {
		tempweakGround +=1;
		tempweakFlying -=1;
		tempweakSteel -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Dark')) {
		tempweakBug +=1;
		tempweakFighting+=1;
		tempweakFairy +=1;
		tempweakGhost -=1;
		tempweakPsychic -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Dragon')) {
		tempweakIce +=1;
		tempweakDragon +=1;
		tempweakFairy +=1;
		tempweakFire -=1;
		tempweakElectric -=1;
		tempweakWater -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Fairy')) {
		tempweakPoison +=1;
		tempweakSteel +=1;
		tempweakFighting -=1;
		tempweakBug -=1;
		tempweakDragon -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fighting')) {
		tempweakFairy +=1;
		tempweakFlying +=1;
		tempweakPsychic +=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fire')) {
		tempweakGround +=1;
		tempweakRock +=1;
		tempweakWater +=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakGrass -=1;
		tempweakIce -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Flying')) {
		tempweakGround -=1;
		tempweakElectric +=1;
		tempweakFighting -=1;
		tempweakRock +=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ghost')) {
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGhost +=1;
		tempweakDark +=1;
	}
	
	if(contains(typecheck,'Grass')) {
		tempweakGround -=1;
		tempweakFlying +=1;
		tempweakElectric -=1;
		tempweakPoison +=1;
		tempweakBug +=1;
		tempweakFire +=1;
		tempweakWater -=1;
		tempweakGrass-=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ground')) {
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakIce +=1;
		tempweakRock -=1;
		tempweakPoison -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Ice')) {
		tempweakFighting +=1;
		tempweakRock +=1;
		tempweakSteel +=1;
		tempweakFire +=1;
		tempweakIce -=1;
	}
	
	if(contains(typecheck,'Normal')) {
		tempweakFighting +=1;
		tempweakGhost -=1;
	}
	
	if(contains(typecheck,'Poison')) {
		tempweakGround +=1;
		tempweakPsychic +=1;
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Psychic')) {
		tempweakBug +=1;
		tempweakGhost +=1;
		tempweakDark +=1;
		tempweakFighting -=1;
		tempweakPsychic -=1;
	}
	
	if(contains(typecheck,'Rock')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakSteel +=1;
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakFire -=1;
	}
	
	if(contains(typecheck,'Steel')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakFire +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakGrass -=1;
		tempweakPsychic -=1;
		tempweakIce -=1;
		tempweakDragon -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Water')) {
		tempweakElectric +=1;
		tempweakGrass +=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakWater -=1;
		tempweakIce -=1;
	}
	
	if(tempweakBug < 0) tempweakBug = 0;
	if(tempweakDark < 0) tempweakDark = 0;
	if(tempweakDragon < 0) tempweakDragon = 0;
	if(tempweakElectric < 0) tempweakElectric = 0;
	if(tempweakFairy < 0) tempweakFairy = 0;
	if(tempweakFighting < 0) tempweakFighting = 0;
	if(tempweakFire < 0) tempweakFire = 0;
	if(tempweakFlying < 0) tempweakFlying = 0;
	if(tempweakGhost < 0) tempweakGhost = 0;
	if(tempweakGrass < 0) tempweakGrass = 0;
	if(tempweakGround < 0) tempweakGround = 0;
	if(tempweakIce < 0) tempweakIce = 0;
	if(tempweakPoison < 0) tempweakPoison = 0;
	if(tempweakPsychic < 0) tempweakPsychic = 0;
	if(tempweakRock < 0) tempweakRock = 0;
	if(tempweakSteel < 0) tempweakSteel = 0;
	if(tempweakWater < 0) tempweakWater = 0;
	
	//Factor in any abilities like Dry Skin
	if(document.getElementById('poke3ability').value==='Levitate') tempweakGround = 0;
	if(document.getElementById('poke3ability').value==='Flash Fire') tempweakFire = 0;
	if(document.getElementById('poke3ability').value==='Lightning Rod') tempweakElectric = 0;
	if(document.getElementById('poke3ability').value==='Motor Drive') tempweakElectric = 0;
	if(document.getElementById('poke3ability').value==='Volt Absorb') tempweakElectric = 0;
	if(document.getElementById('poke3ability').value==='Sap Sipper') tempweakGrass = 0;
	if(document.getElementById('poke3ability').value==='Storm Drain') tempweakWater = 0;
	if(document.getElementById('poke3ability').value==='Water Absorb') tempweakWater = 0;
	if(document.getElementById('poke3ability').value==='Dry Skin') tempweakWater = 0;
	if(document.getElementById('poke3ability').value==='Thick Fat') tempweakIce = 0;
	if(document.getElementById('poke3ability').value==='Thick Fat') tempweakFire = 0;
	if(document.getElementById('poke3ability').value==='Heatproof') tempweakFire = 0;
	
	weakBug += tempweakBug;
	weakDark += tempweakDark;
	weakDragon += tempweakDragon;
	weakElectric += tempweakElectric;
	weakFairy += tempweakFairy;
	weakFighting += tempweakFighting;
	weakFire += tempweakFire;
	weakFlying += tempweakFlying;
	weakGhost += tempweakGhost;
	weakGrass += tempweakGrass;
	weakGround += tempweakGround;
	weakIce += tempweakIce;
	weakPoison += tempweakPoison;
	weakPsychic += tempweakPsychic;
	weakRock += tempweakRock;
	weakSteel += tempweakSteel;
	weakWater += tempweakWater;
	
	//**********************Check fourth Pokemon******************************************************
	
	var tempweakBug = 0;
	var tempweakDark = 0;
	var tempweakDragon = 0;
	var tempweakElectric = 0;
	var tempweakFairy = 0;
	var tempweakFighting = 0;
	var tempweakFire = 0;
	var tempweakFlying = 0;
	var tempweakGhost = 0;
	var tempweakGrass = 0;
	var tempweakGround = 0;
	var tempweakIce = 0;
	var tempweakNormal = 0;
	var tempweakPoison = 0;
	var tempweakPsychic = 0;
	var tempweakRock = 0;
	var tempweakSteel = 0;
	var tempweakWater = 0;
	
	var pokecheck = document.getElementById('poke4choice').value;
	var typecheck = [];
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === pokecheck) {
			typecheck = BattlePokedex[elem].types;
			break;
		}
	}
	//Now that pokemon types have been found, check weaknesses
	
	if(contains(typecheck,'Bug')) {
		tempweakFire +=1;
		tempweakRock +=1;
		tempweakFlying +=1;
		tempweakFighting -=1;
		tempweakGround -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Electric')) {
		tempweakGround +=1;
		tempweakFlying -=1;
		tempweakSteel -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Dark')) {
		tempweakBug +=1;
		tempweakFighting+=1;
		tempweakFairy +=1;
		tempweakGhost -=1;
		tempweakPsychic -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Dragon')) {
		tempweakIce +=1;
		tempweakDragon +=1;
		tempweakFairy +=1;
		tempweakFire -=1;
		tempweakElectric -=1;
		tempweakWater -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Fairy')) {
		tempweakPoison +=1;
		tempweakSteel +=1;
		tempweakFighting -=1;
		tempweakBug -=1;
		tempweakDragon -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fighting')) {
		tempweakFairy +=1;
		tempweakFlying +=1;
		tempweakPsychic +=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fire')) {
		tempweakGround +=1;
		tempweakRock +=1;
		tempweakWater +=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakGrass -=1;
		tempweakIce -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Flying')) {
		tempweakGround -=1;
		tempweakElectric +=1;
		tempweakFighting -=1;
		tempweakRock +=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ghost')) {
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGhost +=1;
		tempweakDark +=1;
	}
	
	if(contains(typecheck,'Grass')) {
		tempweakGround -=1;
		tempweakFlying +=1;
		tempweakElectric -=1;
		tempweakPoison +=1;
		tempweakBug +=1;
		tempweakFire +=1;
		tempweakWater -=1;
		tempweakGrass-=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ground')) {
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakIce +=1;
		tempweakRock -=1;
		tempweakPoison -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Ice')) {
		tempweakFighting +=1;
		tempweakRock +=1;
		tempweakSteel +=1;
		tempweakFire +=1;
		tempweakIce -=1;
	}
	
	if(contains(typecheck,'Normal')) {
		tempweakFighting +=1;
		tempweakGhost -=1;
	}
	
	if(contains(typecheck,'Poison')) {
		tempweakGround +=1;
		tempweakPsychic +=1;
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Psychic')) {
		tempweakBug +=1;
		tempweakGhost +=1;
		tempweakDark +=1;
		tempweakFighting -=1;
		tempweakPsychic -=1;
	}
	
	if(contains(typecheck,'Rock')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakSteel +=1;
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakFire -=1;
	}
	
	if(contains(typecheck,'Steel')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakFire +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakGrass -=1;
		tempweakPsychic -=1;
		tempweakIce -=1;
		tempweakDragon -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Water')) {
		tempweakElectric +=1;
		tempweakGrass +=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakWater -=1;
		tempweakIce -=1;
	}
	
	if(tempweakBug < 0) tempweakBug = 0;
	if(tempweakDark < 0) tempweakDark = 0;
	if(tempweakDragon < 0) tempweakDragon = 0;
	if(tempweakElectric < 0) tempweakElectric = 0;
	if(tempweakFairy < 0) tempweakFairy = 0;
	if(tempweakFighting < 0) tempweakFighting = 0;
	if(tempweakFire < 0) tempweakFire = 0;
	if(tempweakFlying < 0) tempweakFlying = 0;
	if(tempweakGhost < 0) tempweakGhost = 0;
	if(tempweakGrass < 0) tempweakGrass = 0;
	if(tempweakGround < 0) tempweakGround = 0;
	if(tempweakIce < 0) tempweakIce = 0;
	if(tempweakPoison < 0) tempweakPoison = 0;
	if(tempweakPsychic < 0) tempweakPsychic = 0;
	if(tempweakRock < 0) tempweakRock = 0;
	if(tempweakSteel < 0) tempweakSteel = 0;
	if(tempweakWater < 0) tempweakWater = 0;
	
	//Factor in any abilities like Dry Skin
	if(document.getElementById('poke4ability').value==='Levitate') tempweakGround = 0;
	if(document.getElementById('poke4ability').value==='Flash Fire') tempweakFire = 0;
	if(document.getElementById('poke4ability').value==='Lightning Rod') tempweakElectric = 0;
	if(document.getElementById('poke4ability').value==='Motor Drive') tempweakElectric = 0;
	if(document.getElementById('poke4ability').value==='Volt Absorb') tempweakElectric = 0;
	if(document.getElementById('poke4ability').value==='Sap Sipper') tempweakGrass = 0;
	if(document.getElementById('poke4ability').value==='Storm Drain') tempweakWater = 0;
	if(document.getElementById('poke4ability').value==='Water Absorb') tempweakWater = 0;
	if(document.getElementById('poke4ability').value==='Dry Skin') tempweakWater = 0;
	if(document.getElementById('poke4ability').value==='Thick Fat') tempweakIce = 0;
	if(document.getElementById('poke4ability').value==='Thick Fat') tempweakFire = 0;
	if(document.getElementById('poke4ability').value==='Heatproof') tempweakFire = 0;
	
	weakBug += tempweakBug;
	weakDark += tempweakDark;
	weakDragon += tempweakDragon;
	weakElectric += tempweakElectric;
	weakFairy += tempweakFairy;
	weakFighting += tempweakFighting;
	weakFire += tempweakFire;
	weakFlying += tempweakFlying;
	weakGhost += tempweakGhost;
	weakGrass += tempweakGrass;
	weakGround += tempweakGround;
	weakIce += tempweakIce;
	weakPoison += tempweakPoison;
	weakPsychic += tempweakPsychic;
	weakRock += tempweakRock;
	weakSteel += tempweakSteel;
	weakWater += tempweakWater;
	
	//**********************Check fifth Pokemon******************************************************
	
	var tempweakBug = 0;
	var tempweakDark = 0;
	var tempweakDragon = 0;
	var tempweakElectric = 0;
	var tempweakFairy = 0;
	var tempweakFighting = 0;
	var tempweakFire = 0;
	var tempweakFlying = 0;
	var tempweakGhost = 0;
	var tempweakGrass = 0;
	var tempweakGround = 0;
	var tempweakIce = 0;
	var tempweakNormal = 0;
	var tempweakPoison = 0;
	var tempweakPsychic = 0;
	var tempweakRock = 0;
	var tempweakSteel = 0;
	var tempweakWater = 0;
	
	var pokecheck = document.getElementById('poke5choice').value;
	var typecheck = [];
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === pokecheck) {
			typecheck = BattlePokedex[elem].types;
			break;
		}
	}
	//Now that pokemon types have been found, check weaknesses
	
	if(contains(typecheck,'Bug')) {
		tempweakFire +=1;
		tempweakRock +=1;
		tempweakFlying +=1;
		tempweakFighting -=1;
		tempweakGround -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Electric')) {
		tempweakGround +=1;
		tempweakFlying -=1;
		tempweakSteel -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Dark')) {
		tempweakBug +=1;
		tempweakFighting+=1;
		tempweakFairy +=1;
		tempweakGhost -=1;
		tempweakPsychic -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Dragon')) {
		tempweakIce +=1;
		tempweakDragon +=1;
		tempweakFairy +=1;
		tempweakFire -=1;
		tempweakElectric -=1;
		tempweakWater -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Fairy')) {
		tempweakPoison +=1;
		tempweakSteel +=1;
		tempweakFighting -=1;
		tempweakBug -=1;
		tempweakDragon -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fighting')) {
		tempweakFairy +=1;
		tempweakFlying +=1;
		tempweakPsychic +=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fire')) {
		tempweakGround +=1;
		tempweakRock +=1;
		tempweakWater +=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakGrass -=1;
		tempweakIce -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Flying')) {
		tempweakGround -=1;
		tempweakElectric +=1;
		tempweakFighting -=1;
		tempweakRock +=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ghost')) {
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGhost +=1;
		tempweakDark +=1;
	}
	
	if(contains(typecheck,'Grass')) {
		tempweakGround -=1;
		tempweakFlying +=1;
		tempweakElectric -=1;
		tempweakPoison +=1;
		tempweakBug +=1;
		tempweakFire +=1;
		tempweakWater -=1;
		tempweakGrass-=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ground')) {
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakIce +=1;
		tempweakRock -=1;
		tempweakPoison -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Ice')) {
		tempweakFighting +=1;
		tempweakRock +=1;
		tempweakSteel +=1;
		tempweakFire +=1;
		tempweakIce -=1;
	}
	
	if(contains(typecheck,'Normal')) {
		tempweakFighting +=1;
		tempweakGhost -=1;
	}
	
	if(contains(typecheck,'Poison')) {
		tempweakGround +=1;
		tempweakPsychic +=1;
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Psychic')) {
		tempweakBug +=1;
		tempweakGhost +=1;
		tempweakDark +=1;
		tempweakFighting -=1;
		tempweakPsychic -=1;
	}
	
	if(contains(typecheck,'Rock')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakSteel +=1;
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakFire -=1;
	}
	
	if(contains(typecheck,'Steel')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakFire +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakGrass -=1;
		tempweakPsychic -=1;
		tempweakIce -=1;
		tempweakDragon -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Water')) {
		tempweakElectric +=1;
		tempweakGrass +=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakWater -=1;
		tempweakIce -=1;
	}
	
	if(tempweakBug < 0) tempweakBug = 0;
	if(tempweakDark < 0) tempweakDark = 0;
	if(tempweakDragon < 0) tempweakDragon = 0;
	if(tempweakElectric < 0) tempweakElectric = 0;
	if(tempweakFairy < 0) tempweakFairy = 0;
	if(tempweakFighting < 0) tempweakFighting = 0;
	if(tempweakFire < 0) tempweakFire = 0;
	if(tempweakFlying < 0) tempweakFlying = 0;
	if(tempweakGhost < 0) tempweakGhost = 0;
	if(tempweakGrass < 0) tempweakGrass = 0;
	if(tempweakGround < 0) tempweakGround = 0;
	if(tempweakIce < 0) tempweakIce = 0;
	if(tempweakPoison < 0) tempweakPoison = 0;
	if(tempweakPsychic < 0) tempweakPsychic = 0;
	if(tempweakRock < 0) tempweakRock = 0;
	if(tempweakSteel < 0) tempweakSteel = 0;
	if(tempweakWater < 0) tempweakWater = 0;
	
	//Factor in any abilities like Dry Skin
	if(document.getElementById('poke5ability').value==='Levitate') tempweakGround = 0;
	if(document.getElementById('poke5ability').value==='Flash Fire') tempweakFire = 0;
	if(document.getElementById('poke5ability').value==='Lightning Rod') tempweakElectric = 0;
	if(document.getElementById('poke5ability').value==='Motor Drive') tempweakElectric = 0;
	if(document.getElementById('poke5ability').value==='Volt Absorb') tempweakElectric = 0;
	if(document.getElementById('poke5ability').value==='Sap Sipper') tempweakGrass = 0;
	if(document.getElementById('poke5ability').value==='Storm Drain') tempweakWater = 0;
	if(document.getElementById('poke5ability').value==='Water Absorb') tempweakWater = 0;
	if(document.getElementById('poke5ability').value==='Dry Skin') tempweakWater = 0;
	if(document.getElementById('poke5ability').value==='Thick Fat') tempweakIce = 0;
	if(document.getElementById('poke5ability').value==='Thick Fat') tempweakFire = 0;
	if(document.getElementById('poke5ability').value==='Heatproof') tempweakFire = 0;
	
	weakBug += tempweakBug;
	weakDark += tempweakDark;
	weakDragon += tempweakDragon;
	weakElectric += tempweakElectric;
	weakFairy += tempweakFairy;
	weakFighting += tempweakFighting;
	weakFire += tempweakFire;
	weakFlying += tempweakFlying;
	weakGhost += tempweakGhost;
	weakGrass += tempweakGrass;
	weakGround += tempweakGround;
	weakIce += tempweakIce;
	weakPoison += tempweakPoison;
	weakPsychic += tempweakPsychic;
	weakRock += tempweakRock;
	weakSteel += tempweakSteel;
	weakWater += tempweakWater;
	
	//**********************Check sixth Pokemon******************************************************
	
	var tempweakBug = 0;
	var tempweakDark = 0;
	var tempweakDragon = 0;
	var tempweakElectric = 0;
	var tempweakFairy = 0;
	var tempweakFighting = 0;
	var tempweakFire = 0;
	var tempweakFlying = 0;
	var tempweakGhost = 0;
	var tempweakGrass = 0;
	var tempweakGround = 0;
	var tempweakIce = 0;
	var tempweakNormal = 0;
	var tempweakPoison = 0;
	var tempweakPsychic = 0;
	var tempweakRock = 0;
	var tempweakSteel = 0;
	var tempweakWater = 0;
	
	var pokecheck = document.getElementById('poke6choice').value;
	var typecheck = [];
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === pokecheck) {
			typecheck = BattlePokedex[elem].types;
			break;
		}
	}
	//Now that pokemon types have been found, check weaknesses
	
	if(contains(typecheck,'Bug')) {
		tempweakFire +=1;
		tempweakRock +=1;
		tempweakFlying +=1;
		tempweakFighting -=1;
		tempweakGround -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Electric')) {
		tempweakGround +=1;
		tempweakFlying -=1;
		tempweakSteel -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Dark')) {
		tempweakBug +=1;
		tempweakFighting+=1;
		tempweakFairy +=1;
		tempweakGhost -=1;
		tempweakPsychic -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Dragon')) {
		tempweakIce +=1;
		tempweakDragon +=1;
		tempweakFairy +=1;
		tempweakFire -=1;
		tempweakElectric -=1;
		tempweakWater -=1;
		tempweakGrass -=1;
	}
	
	if(contains(typecheck,'Fairy')) {
		tempweakPoison +=1;
		tempweakSteel +=1;
		tempweakFighting -=1;
		tempweakBug -=1;
		tempweakDragon -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fighting')) {
		tempweakFairy +=1;
		tempweakFlying +=1;
		tempweakPsychic +=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakDark -=1;
	}
	
	if(contains(typecheck,'Fire')) {
		tempweakGround +=1;
		tempweakRock +=1;
		tempweakWater +=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakGrass -=1;
		tempweakIce -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Flying')) {
		tempweakGround -=1;
		tempweakElectric +=1;
		tempweakFighting -=1;
		tempweakRock +=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ghost')) {
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGhost +=1;
		tempweakDark +=1;
	}
	
	if(contains(typecheck,'Grass')) {
		tempweakGround -=1;
		tempweakFlying +=1;
		tempweakElectric -=1;
		tempweakPoison +=1;
		tempweakBug +=1;
		tempweakFire +=1;
		tempweakWater -=1;
		tempweakGrass-=1;
		tempweakIce +=1;
	}
	
	if(contains(typecheck,'Ground')) {
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakIce +=1;
		tempweakRock -=1;
		tempweakPoison -=1;
		tempweakElectric -=1;
	}
	
	if(contains(typecheck,'Ice')) {
		tempweakFighting +=1;
		tempweakRock +=1;
		tempweakSteel +=1;
		tempweakFire +=1;
		tempweakIce -=1;
	}
	
	if(contains(typecheck,'Normal')) {
		tempweakFighting +=1;
		tempweakGhost -=1;
	}
	
	if(contains(typecheck,'Poison')) {
		tempweakGround +=1;
		tempweakPsychic +=1;
		tempweakFighting -=1;
		tempweakPoison -=1;
		tempweakBug -=1;
		tempweakGrass -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Psychic')) {
		tempweakBug +=1;
		tempweakGhost +=1;
		tempweakDark +=1;
		tempweakFighting -=1;
		tempweakPsychic -=1;
	}
	
	if(contains(typecheck,'Rock')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakSteel +=1;
		tempweakWater +=1;
		tempweakGrass +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakFire -=1;
	}
	
	if(contains(typecheck,'Steel')) {
		tempweakGround +=1;
		tempweakFighting +=1;
		tempweakFire +=1;
		tempweakFlying -=1;
		tempweakPoison -=1;
		tempweakRock -=1;
		tempweakBug -=1;
		tempweakSteel -=1;
		tempweakGrass -=1;
		tempweakPsychic -=1;
		tempweakIce -=1;
		tempweakDragon -=1;
		tempweakFairy -=1;
	}
	
	if(contains(typecheck,'Water')) {
		tempweakElectric +=1;
		tempweakGrass +=1;
		tempweakSteel -=1;
		tempweakFire -=1;
		tempweakWater -=1;
		tempweakIce -=1;
	}
	
	if(tempweakBug < 0) tempweakBug = 0;
	if(tempweakDark < 0) tempweakDark = 0;
	if(tempweakDragon < 0) tempweakDragon = 0;
	if(tempweakElectric < 0) tempweakElectric = 0;
	if(tempweakFairy < 0) tempweakFairy = 0;
	if(tempweakFighting < 0) tempweakFighting = 0;
	if(tempweakFire < 0) tempweakFire = 0;
	if(tempweakFlying < 0) tempweakFlying = 0;
	if(tempweakGhost < 0) tempweakGhost = 0;
	if(tempweakGrass < 0) tempweakGrass = 0;
	if(tempweakGround < 0) tempweakGround = 0;
	if(tempweakIce < 0) tempweakIce = 0;
	if(tempweakPoison < 0) tempweakPoison = 0;
	if(tempweakPsychic < 0) tempweakPsychic = 0;
	if(tempweakRock < 0) tempweakRock = 0;
	if(tempweakSteel < 0) tempweakSteel = 0;
	if(tempweakWater < 0) tempweakWater = 0;
	
	//Factor in any abilities like Dry Skin
	if(document.getElementById('poke6ability').value==='Levitate') tempweakGround = 0;
	if(document.getElementById('poke6ability').value==='Flash Fire') tempweakFire = 0;
	if(document.getElementById('poke6ability').value==='Lightning Rod') tempweakElectric = 0;
	if(document.getElementById('poke6ability').value==='Motor Drive') tempweakElectric = 0;
	if(document.getElementById('poke6ability').value==='Volt Absorb') tempweakElectric = 0;
	if(document.getElementById('poke6ability').value==='Sap Sipper') tempweakGrass = 0;
	if(document.getElementById('poke6ability').value==='Storm Drain') tempweakWater = 0;
	if(document.getElementById('poke6ability').value==='Water Absorb') tempweakWater = 0;
	if(document.getElementById('poke6ability').value==='Dry Skin') tempweakWater = 0;
	if(document.getElementById('poke6ability').value==='Thick Fat') tempweakIce = 0;
	if(document.getElementById('poke6ability').value==='Thick Fat') tempweakFire = 0;
	if(document.getElementById('poke6ability').value==='Heatproof') tempweakFire = 0;
	
	weakBug += tempweakBug;
	weakDark += tempweakDark;
	weakDragon += tempweakDragon;
	weakElectric += tempweakElectric;
	weakFairy += tempweakFairy;
	weakFighting += tempweakFighting;
	weakFire += tempweakFire;
	weakFlying += tempweakFlying;
	weakGhost += tempweakGhost;
	weakGrass += tempweakGrass;
	weakGround += tempweakGround;
	weakIce += tempweakIce;
	weakPoison += tempweakPoison;
	weakPsychic += tempweakPsychic;
	weakRock += tempweakRock;
	weakSteel += tempweakSteel;
	weakWater += tempweakWater;
	
	//***************************Now finally set weakness values*********************************
	
	document.getElementById('weakbug').value = weakBug;
	if(weakBug >= 3) {
		document.getElementById('weakbug').style.fontWeight='bold';
		document.getElementById('weakbug').style.color='red';
	}
	else {
		document.getElementById('weakbug').style.fontWeight='normal';
        document.getElementById('weakbug').style.color =whitecol;
	}
	document.getElementById('weakdark').value = weakDark;
	if(weakDark >= 3) {
		document.getElementById('weakdark').style.fontWeight='bold';
		document.getElementById('weakdark').style.color='red';
	}
	else {
		document.getElementById('weakdark').style.fontWeight='normal';
        document.getElementById('weakdark').style.color =whitecol;
	}
	document.getElementById('weakdragon').value = weakDragon;
	if(weakDragon >= 3) {
		document.getElementById('weakdragon').style.fontWeight='bold';
		document.getElementById('weakdragon').style.color='red';
	}
	else {
		document.getElementById('weakdragon').style.fontWeight='normal';
        document.getElementById('weakdragon').style.color =whitecol;
	}
	document.getElementById('weakelectric').value = weakElectric;
	if(weakElectric >= 3) {
		document.getElementById('weakelectric').style.fontWeight='bold';
		document.getElementById('weakelectric').style.color='red';
	}
	else {
		document.getElementById('weakelectric').style.fontWeight='normal';
        document.getElementById('weakelectric').style.color =whitecol;
	}
	document.getElementById('weakfairy').value = weakFairy;
	if(weakFairy >= 3) {
		document.getElementById('weakfairy').style.fontWeight='bold';
		document.getElementById('weakfairy').style.color='red';
	}
	else {
		document.getElementById('weakfairy').style.fontWeight='normal';
        document.getElementById('weakfairy').style.color =whitecol;
	}
	document.getElementById('weakfight').value = weakFighting;
	if(weakFighting >= 3) {
		document.getElementById('weakfight').style.fontWeight='bold';
		document.getElementById('weakfight').style.color='red';
	}
	else {
		document.getElementById('weakfight').style.fontWeight='normal';
        document.getElementById('weakfight').style.color =whitecol;
	}
	document.getElementById('weakfire').value = weakFire;
	if(weakFire >= 3) {
		document.getElementById('weakfire').style.fontWeight='bold';
		document.getElementById('weakfire').style.color='red';
	}
	else {
		document.getElementById('weakfire').style.fontWeight='normal';
		document.getElementById('weakfire').style.color=whitecol;
	}
	document.getElementById('weakflying').value = weakFlying;
	if(weakFlying >= 3) {
		document.getElementById('weakflying').style.fontWeight='bold';
		document.getElementById('weakflying').style.color='red';
	}
	else {
		document.getElementById('weakflying').style.fontWeight='normal';
        document.getElementById('weakflying').style.color =whitecol;
	}
	document.getElementById('weakghost').value = weakGhost;
	if(weakGhost >= 3) {
		document.getElementById('weakghost').style.fontWeight='bold';
		document.getElementById('weakghost').style.color='red';
	}
	else {
		document.getElementById('weakghost').style.fontWeight='normal';
        document.getElementById('weakghost').style.color =whitecol;
	}
	document.getElementById('weakgrass').value = weakGrass;
	if(weakGrass >= 3) {
		document.getElementById('weakgrass').style.fontWeight='bold';
		document.getElementById('weakgrass').style.color='red';
	}
	else {
		document.getElementById('weakgrass').style.fontWeight='normal';
        document.getElementById('weakgrass').style.color =whitecol;
	}
	document.getElementById('weakground').value = weakGround;
	if(weakGround >= 3) {
		document.getElementById('weakground').style.fontWeight='bold';
		document.getElementById('weakground').style.color='red';
	}
	else {
		document.getElementById('weakground').style.fontWeight='normal';
        document.getElementById('weakground').style.color =whitecol;
	}
	document.getElementById('weakice').value = weakIce;
	if(weakIce >= 3) {
		document.getElementById('weakice').style.fontWeight='bold';
		document.getElementById('weakice').style.color='red';
	}
	else {
		document.getElementById('weakice').style.fontWeight='normal';
        document.getElementById('weakice').style.color =whitecol;
	}
	document.getElementById('weakpoison').value = weakPoison;
	if(weakPoison >= 3) {
		document.getElementById('weakpoison').style.fontWeight='bold';
		document.getElementById('weakpoison').style.color='red';
	}
	else {
		document.getElementById('weakpoison').style.fontWeight='normal';
        document.getElementById('weakpoison').style.color =whitecol;
	}
	document.getElementById('weakpsychic').value = weakPsychic;
	if(weakPsychic >= 3) {
		document.getElementById('weakpsychic').style.fontWeight='bold';
		document.getElementById('weakpsychic').style.color='red';
	}
	else {
		document.getElementById('weakpsychic').style.fontWeight='normal';
        document.getElementById('weakpsychic').style.color =whitecol;
	}
	document.getElementById('weakrock').value = weakRock;
	if(weakRock >= 3) {
		document.getElementById('weakrock').style.fontWeight='bold';
		document.getElementById('weakrock').style.color='red';
	}
	else {
		document.getElementById('weakrock').style.fontWeight='normal';
        document.getElementById('weakrock').style.color =whitecol;
	}
	document.getElementById('weaksteel').value = weakSteel;
	if(weakSteel >= 3) {
		document.getElementById('weaksteel').style.fontWeight='bold';
		document.getElementById('weaksteel').style.color='red';
	}
	else {
		document.getElementById('weaksteel').style.fontWeight='normal';
        document.getElementById('weaksteel').style.color =whitecol;
	}
	document.getElementById('weakwater').value = weakWater;
	if(weakWater >= 3) {
		document.getElementById('weakwater').style.fontWeight='bold';
		document.getElementById('weakwater').style.color='red';
	}
	else {
		document.getElementById('weakwater').style.fontWeight='normal';
        document.getElementById('weakwater').style.color =whitecol;
	}
	getChecklist();
}


function checkType(movechoice) {
	var movename = movechoice.value;
	
	for(elem in BattleMovedex) {
		if(BattleMovedex[elem].name === movename) {

			//Check for '-ate' abilities
			
			var abilslot = "";
			if(startsWith(movechoice.id,"poke1")) abilslot = document.getElementById('poke1ability').value;
			if(startsWith(movechoice.id,"poke2")) abilslot = document.getElementById('poke2ability').value;
			if(startsWith(movechoice.id,"poke3")) abilslot = document.getElementById('poke3ability').value;
			if(startsWith(movechoice.id,"poke4")) abilslot = document.getElementById('poke4ability').value;
			if(startsWith(movechoice.id,"poke5")) abilslot = document.getElementById('poke5ability').value;
			if(startsWith(movechoice.id,"poke6")) abilslot = document.getElementById('poke6ability').value;
			
			if(abilslot === 'Normalize') {
				return('Normal');
				break;
			}
			else if((BattleMovedex[elem].type === 'Normal') && (abilslot === 'Pixilate' || abilslot === 'Galvanize' || abilslot === 'Aerilate' || abilslot === 'Refrigerate' || abilslot === 'Normalize')) {
				
				if((BattleMovedex[elem].basePower > 0) || BattleMovedex[elem].name === 'Nature Power' || BattleMovedex[elem].hasOwnProperty('basePowerCallback')){
					if(abilslot === 'Pixilate') {
						return('Fairy');
						break;
					}
					if(abilslot === 'Aerilate') {
						return('Flying');
						break;
					}
					if(abilslot === 'Refrigerate') {
						return('Ice');
						break;
					}
					if(abilslot === 'Galvanize') {
						return('Electric');
						break;
					}
				}
	
			}
		
			//Judgment & Techno Blast
			else if((movename === 'Judgment') || (movename === 'Revelation Dance') || (movename === 'Techno Blast') || (movename === 'Freeze-Dry') || (movename === 'Multi-Attack')) {
				var itemslot = "";
				if(startsWith(movechoice.id,"poke1")) itemslot = document.getElementById('poke1item');
				if(startsWith(movechoice.id,"poke2")) itemslot = document.getElementById('poke2item');
				if(startsWith(movechoice.id,"poke3")) itemslot = document.getElementById('poke3item');
				if(startsWith(movechoice.id,"poke4")) itemslot = document.getElementById('poke4item');
				if(startsWith(movechoice.id,"poke5")) itemslot = document.getElementById('poke5item');
				if(startsWith(movechoice.id,"poke6")) itemslot = document.getElementById('poke6item');
				
				var pokeslot = "";
				if(startsWith(movechoice.id,"poke1")) pokeslot = document.getElementById('poke1choice');
				if(startsWith(movechoice.id,"poke2")) pokeslot = document.getElementById('poke2choice');
				if(startsWith(movechoice.id,"poke3")) pokeslot = document.getElementById('poke3choice');
				if(startsWith(movechoice.id,"poke4")) pokeslot = document.getElementById('poke4choice');
				if(startsWith(movechoice.id,"poke5")) pokeslot = document.getElementById('poke5choice');
				if(startsWith(movechoice.id,"poke6")) pokeslot = document.getElementById('poke6choice');
				
				if(movename === 'Freeze-Dry') {
					return('Freeze Dry');
				}
				
				if(movename === 'Revelation Dance') {
					switch(pokeslot.value) {
						case 'Oricorio':
							return('Fire');
							break;
						case 'Oricorio-Pom-Pom':
							return('Electric');
							break;
						case "Oricorio-Pa'u":
							return('Psychic');
							break;
						case 'Oricorio-Sensu':
							return('Ghost');
							break;
					}
				}
				
				if(movename === 'Techno Blast') {
					switch(itemslot.value) {
						case 'Burn Drive':
							return('Fire');
							break;
						case 'Chill Drive':
							return('Ice');
							break;
						case 'Douse Drive':
							return('Water');
							break;
						case 'Shock Drive':
							return('Electric');
							break;
						default:
							return('Normal');
							break;
					}
				}
				
				if(movename === 'Judgment') {
					switch(itemslot.value) {
						case 'Draco Plate':
							return('Dragon');
							break;
						case 'Dread Plate':
							return('Dark');
							break;
						case 'Earth Plate':
							return('Ground');
							break;
						case 'Fist Plate':
							return('Fighting');
							break;
						case 'Flame Plate':
							return('Fire');
							break;
						case 'Icicle Plate':
							return('Ice');
							break;
						case 'Insect Plate':
							return('Bug');
							break;
						case 'Iron Plate':
							return('Steel');
							break;
						case 'Meadow Plate':
							return('Grass');
							break;
						case 'Mind Plate':
							return('Psychic');
							break;
						case 'Pixie Plate':
							return('Fairy');
							break;
						case 'Sky Plate':
							return('Flying');
							break;
						case 'Splash Plate':
							return('Water');
							break;
						case 'Spooky Plate':
							return('Ghost');
							break;
						case 'Stone Plate':
							return('Rock');
							break;
						case 'Toxic Plate':
							return('Poison');
							break;
						case 'Zap Plate':
							return('Electric');
							break;
						default:
							return('Normal');
							break;
					}
				}
				if(movename === 'Multi-Attack') {
					switch(itemslot.value) {
						case 'Dragon Memory':
							return('Dragon');
							break;
						case 'Dark Memory':
							return('Dark');
							break;
						case 'Ground Memory':
							return('Ground');
							break;
						case 'Fighting Memory':
							return('Fighting');
							break;
						case 'Fire Memory':
							return('Fire');
							break;
						case 'Ice Memory':
							return('Ice');
							break;
						case 'Bug Memory':
							return('Bug');
							break;
						case 'Steel Memory':
							return('Steel');
							break;
						case 'Grass Memory':
							return('Grass');
							break;
						case 'Psychic':
							return('Psychic');
							break;
						case 'Fairy Memory':
							return('Fairy');
							break;
						case 'Flying Memory':
							return('Flying');
							break;
						case 'Water Memory':
							return('Water');
							break;
						case 'Ghost Memory':
							return('Ghost');
							break;
						case 'Rock Memory':
							return('Rock');
							break;
						case 'Poison Memory':
							return('Poison');
							break;
						case 'Electric Memory':
							return('Electric');
							break;
						default:
							return('Normal');
							break;
					}
				}
				
			}
			
		
			else if((BattleMovedex[elem].basePower > 0) || BattleMovedex[elem].name === 'Nature Power' || BattleMovedex[elem].hasOwnProperty('basePowerCallback')) {
				return(BattleMovedex[elem].type);
			}
			else if(movename === 'Fling') {
				return('Dark');
			}
			
			break;
		}
	}
}

function getMovelist(pokechoice) {


	var currentpoke=document.getElementById(pokechoice).value;
	for(elem in BattlePokedex) {
		if(currentpoke === BattlePokedex[elem].species) {
			currentpoke = elem;
			break;
		}
    }

	
	//If current poke ends with 'mega' and isn't 'yanmega', chop off the 'mega'
	if(endsWith(currentpoke,'mega') && (currentpoke !== 'yanmega')) {
		currentpoke = currentpoke.substring(currentpoke, currentpoke.length - 4);
	}
	
	if(endsWith(currentpoke,'primal')) {
		currentpoke = currentpoke.substring(currentpoke, currentpoke.length - 6);
	}
	
	if(startsWith(currentpoke, 'necrozmaultra')) currentpoke='necrozma';
	
	if(startsWith(currentpoke, 'charizard')) currentpoke='charizard';
	if(startsWith(currentpoke, 'mewtwo')) currentpoke='mewtwo';
	if(startsWith(currentpoke, 'gastrodon')) currentpoke='gastrodon';
	if(startsWith(currentpoke, 'shellos')) currentpoke='shellos';
	if(startsWith(currentpoke, 'florges')) currentpoke='florges';
	if(startsWith(currentpoke, 'flabebe')) currentpoke='flabebe';
	if(startsWith(currentpoke, 'floette')) currentpoke='floette';
	if(startsWith(currentpoke, 'vivillon')) currentpoke='vivillon';
	if(startsWith(currentpoke, 'oricorio')) currentpoke='oricorio';
	if(startsWith(currentpoke, 'minior')) currentpoke='minior';
	
	//If current poke is a different arceus form, set to just 'arceus'
	if(startsWith(currentpoke, 'arceus')) currentpoke='arceus';
	if(startsWith(currentpoke, 'silvally')) currentpoke='silvally';
	if(startsWith(currentpoke, 'greninja')) currentpoke='greninja';
	if(startsWith(currentpoke, 'zygarde')) currentpoke='zygarde';
	
	if(startsWith(currentpoke, 'genesect')) currentpoke='genesect';
	if(startsWith(currentpoke, 'landorus')) currentpoke='landorus';
	if(startsWith(currentpoke, 'tornadus')) currentpoke='tornadus';
	if(startsWith(currentpoke, 'thundurus')) currentpoke='thundurus';
	if(startsWith(currentpoke, 'deoxys')) currentpoke='deoxys';
	if(startsWith(currentpoke, 'basculin')) currentpoke='basculin';
	if(startsWith(currentpoke, 'giratina')) currentpoke='giratina';
	if(startsWith(currentpoke, 'hoopa')) currentpoke='hoopa';
    if (startsWith(currentpoke, 'shaymin')) currentpoke = 'shaymin';
    if (startsWith(currentpoke, 'magearna')) currentpoke = 'magearna';

    if (startsWith(currentpoke, 'sinistea')) currentpoke = 'sinistea';
    if (startsWith(currentpoke, 'polteageist')) currentpoke = 'polteageist';

	//If current poke is a different pumpkaboo/gourgeist form, set to just 'pumpkaboo'/'gourgeist'
	if(startsWith(currentpoke, 'pumpkaboo')) currentpoke='pumpkaboo';
	if(startsWith(currentpoke, 'gourgeist')) currentpoke='gourgeist';
	
	//Generate full moveset of Pokemon
	var validlist = [];
	if(document.getElementById('tierChoice').value === 'Hackmons') {
		for(elem in BattleMovedex) {
			if(!BattleMovedex[elem].hasOwnProperty('isZ') && !BattleMovedex[elem].hasOwnProperty('isNonstandard')) {
				validlist.push(elem);
			}
		}
	}
	else {
		for(elem in BattleLearnsets[currentpoke].learnset)  {
			validlist.push(elem);
		}
	
		if(currentpoke.startsWith('rotom') && currentpoke !== 'rotom') {
				for(elem in BattleLearnsets['rotom'].learnset) {

					if(!contains(validlist,elem)) {
						validlist.push(elem);
					}
				}
        }

        if (currentpoke.startsWith('necrozma') && currentpoke !== 'necrozma') {
            for (elem in BattleLearnsets['necrozma'].learnset) {

                if (!contains(validlist, elem)) {
                    validlist.push(elem);
                }
            }
        }
		
		if (currentpoke.startsWith('zacian') && currentpoke !== 'zacian') {
            for (elem in BattleLearnsets['zacian'].learnset) {

                if (!contains(validlist, elem)) {
                    validlist.push(elem);
                }
            }
        }
		
		if (currentpoke.startsWith('zamazenta') && currentpoke !== 'zamazenta') {
            for (elem in BattleLearnsets['zamazenta'].learnset) {

                if (!contains(validlist, elem)) {
                    validlist.push(elem);
                }
            }
        }
	}
	

	
	var canHP = false;
	//If a pokemon can learn Hidden Power, add each type of Hidden Power
	//for(i=0; i < validlist.length; i++) {
	//	if(validlist[i] === "hiddenpower") {
	//		canHP=true;
	//		validlist.splice(i, 1);
	//	}
	//}
	
	//if(canHP ===true) {
	//	validlist.push("hiddenpowerbug");
	//	validlist.push("hiddenpowerdark");
	//	validlist.push("hiddenpowerdragon");
	//	validlist.push("hiddenpowerelectric");
	//	validlist.push("hiddenpowerfighting");
	//	validlist.push("hiddenpowerfire");
	//	validlist.push("hiddenpowerflying");
	//	validlist.push("hiddenpowerghost");
	//	validlist.push("hiddenpowergrass");
	//	validlist.push("hiddenpowerground");
	//	validlist.push("hiddenpowerice");
	//	validlist.push("hiddenpowerpoison");
	//	validlist.push("hiddenpowerpsychic");
	//	validlist.push("hiddenpowerrock");
	//	validlist.push("hiddenpowersteel");
	//	validlist.push("hiddenpowerwater");
	//}
	
	
	//If Pokemon has a pre-evolution, add all of their moves
	
	if(BattlePokedex[currentpoke].hasOwnProperty('prevo')) {
        var prevoname = BattlePokedex[currentpoke].prevo.toLowerCase();
        prevoname = compress(prevoname);
		
		for(elem in BattleLearnsets[prevoname].learnset) {

			if((!contains(validlist,elem)) && (elem!=='hiddenpower')) {
				validlist.push(elem);
			}
		}
		
		//Now check for 1st stage evolution
		
		if(BattlePokedex[prevoname].hasOwnProperty('prevo')) {
            var firstprevoname = BattlePokedex[prevoname].prevo.toLowerCase();
            firstprevoname = compress(firstprevoname);
			for(elem in BattleLearnsets[firstprevoname].learnset) {

				if(!contains(validlist,elem)) {
					validlist.push(elem);
				}
			}
		}
		
	}
	
	//Shaymin formes get the moves of each other's learnset
	
	

	
	
	
	if(startsWith(currentpoke,'pikachu') && currentpoke !== 'pikachu') {
		if(currentpoke === 'pikachupopstar' && !contains(validlist,'drainingkiss')) validlist.push('drainingkiss');
	}
	
	//End Shaymin checking

	
	if(currentpoke === 'smeargle') {
		for(elem in BattleMovedex) {
			if(BattleMovedex[elem].name!=='Hidden Power') validlist.push(elem);
		}
	}
	
	
	


	var target1Add = "";
	var target2Add = "";
	var target3Add = "";
	var target4Add = "";
	
	switch(pokechoice) {
		case "poke1choice":
			target1Add = document.getElementById('poke1move1');
			target2Add = document.getElementById('poke1move2');
			target3Add = document.getElementById('poke1move3');
			target4Add = document.getElementById('poke1move4');
			document.getElementById('poke1move1').innerHTML = "";
			document.getElementById('poke1move2').innerHTML = "";
			document.getElementById('poke1move3').innerHTML = "";
			document.getElementById('poke1move4').innerHTML = "";
			break;
		case "poke2choice":
			target1Add = document.getElementById('poke2move1');
			target2Add = document.getElementById('poke2move2');
			target3Add = document.getElementById('poke2move3');
			target4Add = document.getElementById('poke2move4');
			document.getElementById('poke2move1').innerHTML = "";
			document.getElementById('poke2move2').innerHTML = "";
			document.getElementById('poke2move3').innerHTML = "";
			document.getElementById('poke2move4').innerHTML = "";
			break;
		case "poke3choice":
			target1Add = document.getElementById('poke3move1');
			target2Add = document.getElementById('poke3move2');
			target3Add = document.getElementById('poke3move3');
			target4Add = document.getElementById('poke3move4');
			document.getElementById('poke3move1').innerHTML = "";
			document.getElementById('poke3move2').innerHTML = "";
			document.getElementById('poke3move3').innerHTML = "";
			document.getElementById('poke3move4').innerHTML = "";
			break;
		case "poke4choice":
			target1Add = document.getElementById('poke4move1');
			target2Add = document.getElementById('poke4move2');
			target3Add = document.getElementById('poke4move3');
			target4Add = document.getElementById('poke4move4');
			document.getElementById('poke4move1').innerHTML = "";
			document.getElementById('poke4move2').innerHTML = "";
			document.getElementById('poke4move3').innerHTML = "";
			document.getElementById('poke4move4').innerHTML = "";
			break;
		case "poke5choice":
			target1Add = document.getElementById('poke5move1');
			target2Add = document.getElementById('poke5move2');
			target3Add = document.getElementById('poke5move3');
			target4Add = document.getElementById('poke5move4');
			document.getElementById('poke5move1').innerHTML = "";
			document.getElementById('poke5move2').innerHTML = "";
			document.getElementById('poke5move3').innerHTML = "";
			document.getElementById('poke5move4').innerHTML = "";
			break;
		case "poke6choice":
			target1Add = document.getElementById('poke6move1');
			target2Add = document.getElementById('poke6move2');
			target3Add = document.getElementById('poke6move3');
			target4Add = document.getElementById('poke6move4');
			document.getElementById('poke6move1').innerHTML = "";
			document.getElementById('poke6move2').innerHTML = "";
			document.getElementById('poke6move3').innerHTML = "";
			document.getElementById('poke6move4').innerHTML = "";
			break;
		default:
			break;
	}
	
	validlist.sort();
	
	for(i =0; i < validlist.length; i++) {
		var newOption = document.createElement("option");
		//newOption.text = BattleMovedex[elem].name;
		newOption.text = BattleMovedex[validlist[i]].name;
		target1Add.add(newOption);
		var newOption = document.createElement("option");
		//newOption.text = BattleMovedex[elem].name;
		newOption.text = BattleMovedex[validlist[i]].name;
		target2Add.add(newOption);
		var newOption = document.createElement("option");
		//newOption.text = BattleMovedex[elem].name;
		newOption.text = BattleMovedex[validlist[i]].name;
		target3Add.add(newOption);
		var newOption = document.createElement("option");
		//newOption.text = BattleMovedex[elem].name;
		newOption.text = BattleMovedex[validlist[i]].name;
		target4Add.add(newOption);
	}
	
}

function AvgStatCalc() {
	
	var avgHP = 0;
	var avgAtt = 0;
	var avgDef = 0;
	var avgSpAtt = 0;
	var avgSpDef = 0;
	var avgSpeed = 0;
	
	//Calculate Average Stats
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === document.getElementById('poke1choice').value) {
			avgHP += BattlePokedex[elem].baseStats.hp;
			avgAtt += BattlePokedex[elem].baseStats.atk;
			avgDef += BattlePokedex[elem].baseStats.def;
			avgSpAtt += BattlePokedex[elem].baseStats.spa;
			avgSpDef += BattlePokedex[elem].baseStats.spd;
			avgSpeed += BattlePokedex[elem].baseStats.spe;
		}
		if(BattlePokedex[elem].species === document.getElementById('poke2choice').value) {
			avgHP += BattlePokedex[elem].baseStats.hp;
			avgAtt += BattlePokedex[elem].baseStats.atk;
			avgDef += BattlePokedex[elem].baseStats.def;
			avgSpAtt += BattlePokedex[elem].baseStats.spa;
			avgSpDef += BattlePokedex[elem].baseStats.spd;
			avgSpeed += BattlePokedex[elem].baseStats.spe;
		}
		if(BattlePokedex[elem].species === document.getElementById('poke3choice').value) {
			avgHP += BattlePokedex[elem].baseStats.hp;
			avgAtt += BattlePokedex[elem].baseStats.atk;
			avgDef += BattlePokedex[elem].baseStats.def;
			avgSpAtt += BattlePokedex[elem].baseStats.spa;
			avgSpDef += BattlePokedex[elem].baseStats.spd;
			avgSpeed += BattlePokedex[elem].baseStats.spe;
		}
		if(BattlePokedex[elem].species === document.getElementById('poke4choice').value) {
			avgHP += BattlePokedex[elem].baseStats.hp;
			avgAtt += BattlePokedex[elem].baseStats.atk;
			avgDef += BattlePokedex[elem].baseStats.def;
			avgSpAtt += BattlePokedex[elem].baseStats.spa;
			avgSpDef += BattlePokedex[elem].baseStats.spd;
			avgSpeed += BattlePokedex[elem].baseStats.spe;
		}
		if(BattlePokedex[elem].species === document.getElementById('poke5choice').value) {
			avgHP += BattlePokedex[elem].baseStats.hp;
			avgAtt += BattlePokedex[elem].baseStats.atk;
			avgDef += BattlePokedex[elem].baseStats.def;
			avgSpAtt += BattlePokedex[elem].baseStats.spa;
			avgSpDef += BattlePokedex[elem].baseStats.spd;
			avgSpeed += BattlePokedex[elem].baseStats.spe;
		}
		if(BattlePokedex[elem].species === document.getElementById('poke6choice').value) {
			avgHP += BattlePokedex[elem].baseStats.hp;
			avgAtt += BattlePokedex[elem].baseStats.atk;
			avgDef += BattlePokedex[elem].baseStats.def;
			avgSpAtt += BattlePokedex[elem].baseStats.spa;
			avgSpDef += BattlePokedex[elem].baseStats.spd;
			avgSpeed += BattlePokedex[elem].baseStats.spe;
		}
	}
	
	var customcolor = "";
	
	avgHP *= (1/6);
	avgHP = avgHP.toFixed(1);
	document.getElementById('hpbar').style.width = (80*avgHP/255) + '%';
	document.getElementById('hpbuffer').style.width = (80-(80*avgHP/255)) + '%';
	customcolor = "rgb(" + Math.floor(255-(255*avgHP/255)) + "," + Math.floor(255*avgHP/255) + "," + "0)";
	document.getElementById('hpbar').style.backgroundColor = customcolor;

	
	avgAtt *= (1/6);
	avgAtt = avgAtt.toFixed(1);
	document.getElementById('atkbar').style.width = (80*avgAtt/190) + '%';
	document.getElementById('atkbuffer').style.width = (80-(80*avgAtt/190)) + '%';
	customcolor = "rgb(" + Math.floor(255-(255*avgAtt/190)) + "," + Math.floor(255*avgAtt/190) + "," + "0)";
	document.getElementById('atkbar').style.backgroundColor = customcolor;
	
	avgDef *= (1/6);
	avgDef = avgDef.toFixed(1);
	document.getElementById('defbar').style.width = (80*avgDef/230) + '%';
	document.getElementById('defbuffer').style.width = (80-(80*avgDef/230)) + '%';
	customcolor = "rgb(" + Math.floor(255-(255*avgDef/230)) + "," + Math.floor(255*avgDef/230) + "," + "0)";
	document.getElementById('defbar').style.backgroundColor = customcolor;
	
	avgSpAtt *= (1/6);
	avgSpAtt = avgSpAtt.toFixed(1);
	document.getElementById('spattbar').style.width = (80*avgSpAtt/194) + '%';
	document.getElementById('spattbuffer').style.width = (80-(80*avgSpAtt/194)) + '%';
	customcolor = "rgb(" + Math.floor(255-(255*avgSpAtt/194)) + "," + Math.floor(255*avgSpAtt/194) + "," + "0)";
	document.getElementById('spattbar').style.backgroundColor = customcolor;
	
	avgSpDef *= (1/6);
	avgSpDef = avgSpDef.toFixed(1);
	document.getElementById('spdefbar').style.width = (80*avgSpDef/230) + '%';
	document.getElementById('spdefbuffer').style.width = (80-(80*avgSpDef/230)) + '%';
	customcolor = "rgb(" + Math.floor(255-(255*avgSpDef/230)) + "," + Math.floor(255*avgSpDef/230) + "," + "0)";
	document.getElementById('spdefbar').style.backgroundColor = customcolor;
	
	avgSpeed *= (1/6);
	avgSpeed = avgSpeed.toFixed(1);
	document.getElementById('speedbar').style.width = (80*avgSpeed/180) + '%';
	document.getElementById('speedbuffer').style.width = (80-(80*avgSpeed/180)) + '%';
	customcolor = "rgb(" + Math.floor(255-(255*avgSpeed/180)) + "," + Math.floor(255*avgSpeed/180) + "," + "0)";
	document.getElementById('speedbar').style.backgroundColor = customcolor;
}

function initList(selectId) {
	var targetAdd = document.getElementById(selectId);
	var pokelist = [];
	
	for(elem in BattlePokedex) {
        if (elem.startsWith('pikachu') && elem !== "pikachu") {
            continue;
        }
        if (elem.startsWith('pichu') && elem !== "pichu") {
            continue;
        }
        if (elem.startsWith('xerneas') && elem !== "xerneas") {
            continue;
        }
        if (elem.startsWith('yveltal') && elem !== "yveltal") {
            continue;
        }

        if (BattlePokedex[elem].num < 1) break;


        try {

            if (BattlePokedex[elem].species.startsWith("Pikachu-") || BattlePokedex[elem].species.startsWith("Pichu-") || BattlePokedex[elem].species.startsWith("Cramorant-")
                || BattlePokedex[elem].species.endsWith("-Totem")
                || BattlePokedex[elem].species.startsWith("Aegislash-")
                || BattlePokedex[elem].species.startsWith("Castform-") || BattlePokedex[elem].species.startsWith("Cherrim-")
                || BattlePokedex[elem].species.endsWith("-Zen") || BattlePokedex[elem].species.endsWith("-Noice") || BattlePokedex[elem].species.endsWith("-Primal")
                || BattlePokedex[elem].species.endsWith("-Busted")
                || BattlePokedex[elem].species.endsWith("-Meteor") || BattlePokedex[elem].species.endsWith("-Hangry") || BattlePokedex[elem].species.startsWith("Vivillon-")
                || BattlePokedex[elem].species.startsWith("Wishiwashi-") || BattlePokedex[elem].species.startsWith("Meloetta-")) {
                continue;
            }

            if ((TiersSWSH[elem].tier === "Unreleased" && document.getElementById("tierChoice").value !== "National Dex") || (TiersSWSH[elem].tier === "Illegal" && document.getElementById("tierChoice").value !== "National Dex") || BattlePokedex[elem].species.endsWith("-Gmax")) {
                continue;
            }


        }
        catch
        {
        }

        pokelist.push(BattlePokedex[elem].species);
        
		
	}
	
	pokelist.sort();
	
	for(i = 0; i < pokelist.length; i++) {
		var newOption = document.createElement("option");
		newOption.text = pokelist[i];
		targetAdd.add(newOption);
	}
	targetAdd.value='Pikachu';
}

function newColour(region) {
	var newred = Math.floor(Math.random() * 255);
	var newgreen = Math.floor(Math.random() * 255);
	var newblue = Math.floor(Math.random() * 255);
	newblue = 255;
	var newcol="rgb(" + newred + ", " + newgreen + ", " + newblue + ")";
	document.getElementById(region).style.backgroundColor=newcol;
}

function changePic(pokeChooser) {
	var chosen = pokeChooser.value;
	
	//Begin generation of text when hovering over a Pokemon
	
	var hovertext = "";
	var dexno = 0;
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === chosen) {
			dexno = BattlePokedex[elem].num;
			
			hovertext = "Name: " + BattlePokedex[elem].species + " (#" + BattlePokedex[elem].num + ")" + "\n";
			hovertext += "Type(s): " + BattlePokedex[elem].types[0];
			if(BattlePokedex[elem].types.length === 2) {
				hovertext += "/" + BattlePokedex[elem].types[1];
			}
			hovertext += "\n";
			hovertext += "Abilities: ";
			var j = 0;
			for(elem1 in BattlePokedex[elem].abilities) {
				if(j > 0) hovertext += "/";
				hovertext += BattlePokedex[elem].abilities[elem1];
				j+=1;
			}
			hovertext += "\n\n";
			hovertext += "HP: " + BattlePokedex[elem].baseStats["hp"];
			hovertext += "\nAttack: " + BattlePokedex[elem].baseStats["atk"];
			hovertext += "\nDefense: " + BattlePokedex[elem].baseStats["def"];
			hovertext += "\nSpecial Attack: " + BattlePokedex[elem].baseStats["spa"];
			hovertext += "\nSpecial Defense: " + BattlePokedex[elem].baseStats["spd"];
			hovertext += "\nSpeed: " + BattlePokedex[elem].baseStats["spe"];
			break;
		}
	}
	
	//End text generation
	
	switch(chosen) {
		case "Basculin-Blue-Striped":
			chosen = "basculin-bluestriped";
			break;
		case "Kommo-o":
			chosen = "kommoo";
			break;
	    case "Jangmo-o":
			chosen = "jangmoo";
			break;
		case "Hakamo-o":
			chosen = "hakamoo";
			break;
		case "Oricorio-Pa'u":
			chosen = "oricorio-pau";
			break;
		case "Oricorio-Pom-Pom":
			chosen = "oricorio-pompom";
			break;
		case "Type: Null":
			chosen = "typenull";
			break;
		case "Wishiwashi":
			chosen = "wishiwashi-school";
			break;
	    case "Zygarde-10%":
			chosen = "zygarde-10";
			break;
		case "Charizard-Mega-X":
			chosen = "charizard-megax";
			break;
		case "Charizard-Mega-Y":
			chosen = "charizard-megay";
			break;
		case "Mewtwo-Mega-X":
			chosen = "mewtwo-megax";
			break;
		case "Mewtwo-Mega-Y":
			chosen = "mewtwo-megay";
			break;
		case "Mr. Mime":
			chosen = "mrmime";
            break;
        case "Mr. Mime-Galar":
            chosen = "mrmime-galar";
            break;
        case "Mr. Rime":
            chosen = "mrrime";
            break;
		case "Floette-Eternal-Flower":
			chosen = "floette-eternalflower";
			break;
		case "Ho-Oh":
			chosen = "hooh";
			break;
		case "Nidoran-M":
			chosen = "nidoranm";
			break;
		case "Nidoran-F":
			chosen = "nidoranf";
			break;
        case "Farfetch’d":
			chosen = "farfetchd";
            break;
        case "Farfetch’d-Galar":
            chosen = "farfetchd-galar";
            break;
        case "Sirfetch’d":
            chosen = "sirfetchd";
            break;
		case "Mime Jr.":
			chosen = "mimejr";
			break;
		case "Hoopa-Unbound":
			chosen = "hoopa-unbound";
			break;
	    case "Tapu Koko":
			chosen = "tapukoko";
			break;
		case "Tapu Fini":
			chosen = "tapufini";
			break;
		case "Tapu Bulu":
			chosen = "tapubulu";
			break;
		case "Necrozma-Dusk-Mane":
			chosen = "necrozma-duskmane";
			break;
		case "Necrozma-Dawn-Wings":
			chosen = "necrozma-dawnwings";
			break;
		case "Tapu Lele":
			chosen = "tapulele";
            break;
        case "Toxtricity-Low-Key":
            chosen = "toxtricity-lowkey";
            break;
		case "Urshifu-Rapid-Strike":
			chosen = "urshifu-rapidstrike";
			break;
		default:
			break;
	}
	

    newLoc = "https://play.pokemonshowdown.com/sprites/ani/" + chosen.toLowerCase() + ".gif";
 
	switch(pokeChooser) {
		case poke1choice:
            document.getElementById('pic1').src = newLoc;
            document.getElementById('pic1').onerror = function () {
                document.getElementById('pic1').src = "https://play.pokemonshowdown.com/sprites/gen5/" + chosen.toLowerCase() + ".png";
            };
			document.getElementById('pic1').title = hovertext;
			getMovelist('poke1choice');
			//alert(chosen);
			randomMove('poke1');
			getAbilities(pokeChooser);
			changeItem(document.getElementById('poke1item'));
			break;
		case poke2choice:
            document.getElementById('pic2').src = newLoc;
            document.getElementById('pic2').onerror = function () {
                document.getElementById('pic2').src = "https://play.pokemonshowdown.com/sprites/gen5/" + chosen.toLowerCase() + ".png";
            };
			document.getElementById('pic2').title = hovertext;
			getMovelist('poke2choice');
			randomMove('poke2');
			getAbilities(pokeChooser);
			changeItem(document.getElementById('poke2item'));
			break;
		case poke3choice:
            document.getElementById('pic3').src = newLoc;
            document.getElementById('pic3').onerror = function () {
                document.getElementById('pic3').src = "https://play.pokemonshowdown.com/sprites/gen5/" + chosen.toLowerCase() + ".png";
            };
			document.getElementById('pic3').title = hovertext;
			getMovelist('poke3choice');
			randomMove('poke3');
			getAbilities(pokeChooser);
			changeItem(document.getElementById('poke3item'));
			break;
		case poke4choice:
            document.getElementById('pic4').src = newLoc;
            document.getElementById('pic4').onerror = function () {
                document.getElementById('pic4').src = "https://play.pokemonshowdown.com/sprites/gen5/" + chosen.toLowerCase() + ".png";
            };
			document.getElementById('pic4').title = hovertext;
			getMovelist('poke4choice');
			randomMove('poke4');
			getAbilities(pokeChooser);
			changeItem(document.getElementById('poke4item'));
			break;
		case poke5choice:
            document.getElementById('pic5').src = newLoc;
            document.getElementById('pic5').onerror = function () {
                document.getElementById('pic5').src = "https://play.pokemonshowdown.com/sprites/gen5/" + chosen.toLowerCase() + ".png";
            };
			document.getElementById('pic5').title = hovertext;
			getMovelist('poke5choice');
			randomMove('poke5');
			getAbilities(pokeChooser);
			changeItem(document.getElementById('poke5item'));
			break;
		case poke6choice:
			document.getElementById('pic6').src = newLoc;
            document.getElementById('pic6').onerror = function () {
                document.getElementById('pic6').src = "https://play.pokemonshowdown.com/sprites/gen5/" + chosen.toLowerCase() + ".png";
            };
            document.getElementById('pic6').title = hovertext;
			getMovelist('poke6choice');
			randomMove('poke6');
			getAbilities(pokeChooser);
			changeItem(document.getElementById('poke6item'));
			break;
		default:
			break;
	}
	
	AvgStatCalc();
	getStrengths();
	getWeaknesses();
}


/*function checkViable(pokechoice,moveslot) {

	if(startsWith(moveslot.value,'Hidden Power')) {
		if(Math.floor(Math.random()*17) !== 0) return false;
	}

	var viableList = [];
	var tempmove = "";
	
	//Check to see if any other moves are Hidden Power
	var canHP = true;
	var otherOne = "";
	var otherTwo = "";
	var otherThree = "";
	
	if(startsWith(moveslot.value,'Hidden Power')) {
		if(endsWith(moveslot.id,'move1')) {
			otherOne = document.getElementById((pokechoice + "move2").toString());
			otherTwo = document.getElementById((pokechoice + "move3").toString());
			otherThree = document.getElementById((pokechoice + "move4").toString());
		}
		if(endsWith(moveslot.id,'move2')) {
			otherOne = document.getElementById((pokechoice + "move1").toString());
			otherTwo = document.getElementById((pokechoice + "move3").toString());
			otherThree = document.getElementById((pokechoice + "move4").toString());
		}
		if(endsWith(moveslot.id,'move3')) {
			otherOne = document.getElementById((pokechoice + "move2").toString());
			otherTwo = document.getElementById((pokechoice + "move1").toString());
			otherThree = document.getElementById((pokechoice + "move4").toString());
		}
		if(endsWith(moveslot.id,'move4')) {
			otherOne = document.getElementById((pokechoice + "move2").toString());
			otherTwo = document.getElementById((pokechoice + "move1").toString());
			otherThree = document.getElementById((pokechoice + "move3").toString());
		}
		
		if((startsWith(otherOne.value,"Hidden Power")) || (startsWith(otherTwo.value,"Hidden Power")) || (startsWith(otherThree.value,"Hidden Power"))) {
			return false;
		}
	}
	
	//HP checking done
	
	
	for(i = 0; i < moveslot.length; i++) {
		tempmove = moveslot[i].value;
		for(elem in BattleMovedex) {
			
			if((tempmove === BattleMovedex[elem].name) && (tempmove!=='Hidden Power')) {
				if((BattleMovedex[elem].hasOwnProperty('isViable') === true) || ((startsWith(tempmove,'Hidden Power')))) {
					viableList.push(BattleMovedex[elem].name);
				}
			}
		}
	}
	if(viableList.length < 4) {
		alert(document.getElementById(pokechoice + 'choice').value);
		return true;
	}
	else {
		if(!contains(viableList,moveslot.value)) {
			//alert(moveslot.value + " is not viable");
			return false;
		}
		if(contains(viableList,moveslot.value)) {
			return true;
		}
	}
}*/

function moveConflict(move1, move2, moveslot, otherOne, otherTwo, otherThree) {
	
	if(startsWith(moveslot,move1)) {
		if((startsWith(otherOne,move2)) || (startsWith(otherTwo,move2)) || (startsWith(otherThree,move2))) {
			return true;
		}
	}
	
	else if(startsWith(moveslot,move2)) {
		if((startsWith(otherOne,move1)) || (startsWith(otherTwo,move1)) || (startsWith(otherThree,move1))) {
			return true;
		}
	}
	else return false;
	
}

function getViableList(pokechoice,moveslot) {
	
	var chosenpoke = document.getElementById(pokechoice + 'choice').value;
	var validList = [];
	var validListNames = [];
	if(startsWith(chosenpoke,'Vivillon')) chosenpoke = 'Vivillon';
	if(startsWith(chosenpoke,'Minior')) chosenpoke = 'Minior';
	if(startsWith(chosenpoke,'Flabebe')) chosenpoke = 'Flabebe';
	if(startsWith(chosenpoke,'Floette')) chosenpoke = 'Floette';
	if(startsWith(chosenpoke,'Florges')) chosenpoke = 'Florges';
	if(startsWith(chosenpoke,'Gastrodon')) chosenpoke = 'Gastrodon';
    if (startsWith(chosenpoke, 'Shellos')) chosenpoke = 'Shellos';
    if (startsWith(chosenpoke, 'Magearna')) chosenpoke = 'Magearna';
	
	for(elem in BattlePokedex) {
		if(BattlePokedex[elem].species === chosenpoke) {
            try {
                validListTemp = TiersSWSH[elem].randomBattleMoves;
                if (typeof (validListTemp) === "undefined") validListTemp = TiersSUMO[elem].randomBattleMoves;
            }
            catch (err) {
                return "";
            }

			if(startsWith(chosenpoke,'Pikachu') && chosenpoke !== 'Pikachu') {
				validList = TiersSWSH['pikachu'].randomBattleMoves;
			}
			if(startsWith(chosenpoke,'Greninja')) {
				validList = TiersSWSH['greninja'].randomBattleMoves;
			}
			if(startsWith(chosenpoke,'Rotom')) {
				validList = TiersSWSH['rotom'].randomBattleMoves;
			}
			
			if(chosenpoke === 'Rotom-Heat' && !contains(validList,'overheat')) validList.push('overheat');
			if(chosenpoke === 'Rotom-Mow' && !contains(validList,'leafstorm')) validList.push('leafstorm');
			if(chosenpoke === 'Rotom-Wash' && !contains(validList,'hydropump')) validList.push('hydropump');
			if(chosenpoke === 'Rotom-Fan' && !contains(validList,'airslash')) validList.push('airslash');
			if(chosenpoke === 'Rotom-Frost' && !contains(validList,'blizzard')) validList.push('blizzard');
			
			if(chosenpoke==='Igglybuff' || chosenpoke==='Jigglypuff' || chosenpoke==='Wigglytuff') {
				if(!contains(validList,'hypervoice')) {
					validList.push('hypervoice');
				}
			}
			if(chosenpoke==='Cyndaquil' || chosenpoke==='Quilava' || chosenpoke==='Typhlosion') {
				if(!contains(validList,'extrasensory')) {
					validList.push('extrasensory');
				}
			}
			if(chosenpoke==='Ponyta' || chosenpoke==='Rapidash') {
				if(!contains(validList,'willowisp')) {
					validList.push('willowisp');
				}
			}
			if(chosenpoke==='Hawlucha') {
				if(!contains(validList,'substitute')) {
					validList.push('substitute');
				}
			}
			if(chosenpoke==='Delphox') {
				if(!contains(validList,'dazzlinggleam')) {
					validList.push('dazzlinggleam');
				}
			}
			if(chosenpoke==='Pyukumuku') {
				if(!contains(validList,'recover')) {
					validList.push('recover');
				}
				if(!contains(validList,'toxic')) {
					validList.push('toxic');
				}
				if(!contains(validList,'soak')) {
					validList.push('soak');
				}
			}
			if(chosenpoke==='Machop' || chosenpoke==='Machoke' || chosenpoke==='Machamp') {
				if(!contains(validList,'closecombat')) {
					validList.push('closecombat');
				}
			}
			
			if(chosenpoke === 'Kingler' && !contains(validList,'rockslide')) {
				validList.push('rockslide');
			}
			if(chosenpoke==='Regieleki') {
				if(!contains(validList,'rapidspin')) {
					validList.push('rapidspin');
				}
				if(!contains(validList,'extremespeed')) {
					validList.push('extremespeed');
				}
				if(!contains(validList,'reflect')) {
					validList.push('reflect');
				}
				if(!contains(validList,'lightscreen')) {
					validList.push('lightscreen');
				}
			}
			
			if(chosenpoke==='Comfey') {
				if(!contains(validList,'synthesis')) {
					validList.push('synthesis');
				}
			}
			if(chosenpoke==='Gallade') {
				if(!contains(validList,'tripleaxel')) {
					validList.push('tripleaxel');
				}
			}
			if(chosenpoke==='Hitmontop') {
				if(!contains(validList,'tripleaxel')) {
					validList.push('tripleaxel');
				}
			}
			
			if(chosenpoke==='Tsareena') {
				if(!contains(validList,'tripleaxel')) {
					validList.push('tripleaxel');
				}
			}
			
			
			chosenpokeraw = elem;
		}
	}
	
	//return true if pokemon has no viable moves list
	if(startsWith(chosenpokeraw,'pikachu') && chosenpokeraw !== 'pikachu') {
		if(chosenpokeraw === 'pikachubelle' && !contains(validList,'iciclecrash')) validList.push('iciclecrash');
		if(chosenpokeraw === 'pikachurockstar' && !contains(validList,'meteormash')) validList.push('meteormash');
	}
	else try {
		if(TiersSWSH[chosenpokeraw].hasOwnProperty('randomBattleMoves') === false) return("");
    }
    catch (err4) {
        try {
            if (TiersSWSH[chosenpokeraw].hasOwnProperty('randomBattleMoves') === false) return ("");
        }
        catch {
            if (BattleFormatsData[chosenpokeraw].hasOwnProperty('randomBattleMoves') === false) return ("");
        }
        
	}
	//
	
	
	
	for(i = 0; i < validList.length; i++) {
		
		
			validListNames.push(BattleMovedex[validList[i]].name);
		
	}
	
	//Return list of viable move names
	return(validListNames);
}


function checkViable(pokechoice,moveslot) {

	
	//Prevent any illegal moves (Smogon rules)
	if((moveslot.value==='Fissure') || (moveslot.value==='Guillotine') || (moveslot.value==='Horn Drill') || (moveslot.value==='Sheer Cold') || (moveslot.value==='Baton Pass')) {
		return false;
	}
	if((moveslot.value==='Double Team') || (moveslot.value==='Minimize')) {
		if(document.getElementById('tierChoice').value !== 'Ubers') {
			return false;
		}
	}
	//
	
	for(elem in BattleMovedex) {
		if((BattleMovedex[elem].Name === moveslot.value) && (!BattleMovedex[elem].hasOwnProperty('isNonStandard'))) {
			return false;
		}
	}
	
	

	var validList = [];
	var validListNames = [];
	var chosenpoke = document.getElementById(pokechoice + 'choice').value;
	var chosenpokeraw = "";
	var hasHP = false;
	var validHPList = [];
	
	var needSTAB = false;
	var validListSTAB = [];
	
	//Check to see if any other moves are Hidden Power
	var otherOne = "";
	var otherTwo = "";
	var otherThree = "";
	
	if(endsWith(moveslot.id,'move1')) {
		otherOne = document.getElementById((pokechoice + "move2").toString());
		otherTwo = document.getElementById((pokechoice + "move3").toString());
		otherThree = document.getElementById((pokechoice + "move4").toString());
	}
	if(endsWith(moveslot.id,'move2')) {
		otherOne = document.getElementById((pokechoice + "move1").toString());
		otherTwo = document.getElementById((pokechoice + "move3").toString());
		otherThree = document.getElementById((pokechoice + "move4").toString());
	}
	if(endsWith(moveslot.id,'move3')) {
		otherOne = document.getElementById((pokechoice + "move2").toString());
		otherTwo = document.getElementById((pokechoice + "move1").toString());
		otherThree = document.getElementById((pokechoice + "move4").toString());
	}
	if(endsWith(moveslot.id,'move4')) {
		otherOne = document.getElementById((pokechoice + "move2").toString());
		otherTwo = document.getElementById((pokechoice + "move1").toString());
		otherThree = document.getElementById((pokechoice + "move3").toString());
	}
	
	if(startsWith(moveslot.value,'Hidden Power')) {
		if((startsWith(otherOne.value,"Hidden Power")) || (startsWith(otherTwo.value,"Hidden Power")) || (startsWith(otherThree.value,"Hidden Power"))) {
			return false;
		}
	}
	
	//HP checking done
	
	//return true if viable movesets option is unchecked
	if(document.getElementById('viableChoice').value==='Random') {
		if(document.getElementById(pokechoice + 'choice').value === 'Rayquaza-Mega') {
			if(((startsWith(moveslot.value,"Dragon Ascent")) || startsWith(otherOne.value,"Dragon Ascent")) || (startsWith(otherTwo.value,"Dragon Ascent")) || (startsWith(otherThree.value,"Dragon Ascent"))) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return true;
		}
    }
	//

    //return true if moveset contains less than 4 moves (from hidden power being removed)
    //If viable movelist is less than 4 (from hidden power being removed), just break to exit function
    var validListTemp = [];


    for (elem in BattlePokedex) {
        if (BattlePokedex[elem].species === chosenpoke) {
            try {
                validListTemp = TiersSWSH[elem].randomBattleMoves;
                if (typeof (validListTemp) === "undefined") {
                    if (startsWith(chosenpoke, 'Pikachu') && chosenpoke !== 'Pikachu') {
                        validListTemp = TiersSWSH['pikachu'].randomBattleMoves;
                    }

                    else if (startsWith(chosenpoke, 'Magearna')) {
                        validListTemp = TiersSWSH['magearna'].randomBattleMoves;
                    }
                    else validListTemp = TiersSUMO[elem].randomBattleMoves;
                }
            }
            catch (err) {
                if (startsWith(chosenpoke, 'Pikachu') && chosenpoke !== 'Pikachu') {
                    validListTemp = TiersSWSH['pikachu'].randomBattleMoves;
                }

                else if (startsWith(chosenpoke, 'Magearna')) {
                    validListTemp = TiersSWSH['magearna'].randomBattleMoves;
                }
                else return true;
            }
            break;
        }
    }

    if (validListTemp === undefined || validListTemp.length === 0) {
        return true;
    }
    for (i = 0; i < validListTemp.length; i++) {
        if (validListTemp[i].startsWith("hiddenpower")) {
            validListTemp.splice(i, 1);
            i--;
        }
    }
	
	if(chosenpoke==='Regieleki') {
				if(!contains(validListTemp,'rapidspin')) {
					validListTemp.push('rapidspin');
				}
				if(!contains(validListTemp,'extremespeed')) {
					validListTemp.push('extremespeed');
				}
				if(!contains(validListTemp,'reflect')) {
					validListTemp.push('reflect');
				}
				if(!contains(validListTemp,'lightscreen')) {
					validListTemp.push('lightscreen');
				}
    }

    if (chosenpoke === 'Comfey') {
        if (!contains(validListTemp, 'synthesis')) {
            validListTemp.push('synthesis');
        }
    }
    if (chosenpoke === 'Gallade') {
        if (!contains(validListTemp, 'tripleaxel')) {
            validListTemp.push('tripleaxel');
        }
    }
    if (chosenpoke === 'Hitmontop') {
        if (!contains(validListTemp, 'tripleaxel')) {
            validListTemp.push('tripleaxel');
        }
    }

    if (chosenpoke === 'Tsareena') {
        if (!contains(validListTemp, 'tripleaxel')) {
            validListTemp.push('tripleaxel');
        }
    }
	
    if (validListTemp.length < 4) return true;
	
	
	/////////Select from actual list of viable moves (reduce load time)

    var randomNum = Math.floor(Math.random() * validListTemp.length);
    moveslot.value = BattleMovedex[validListTemp[randomNum]].name;

	//var validListInitial = getViableList(pokechoice,moveslot);
	//if(validListInitial !== "") {
	//	var randomNum = Math.floor(Math.random() * validListInitial.length);
	//	moveslot.value  = validListInitial[randomNum];
	//}
	
	/////////End selection from actual list of viable moves
	
	
	//Cheat fix for Smeargle getting Spore twice
	
	if(startsWith(moveslot.value,'Spore')) {
		if((startsWith(otherOne.value,"Spore")) || (startsWith(otherTwo.value,"Spore")) || (startsWith(otherThree.value,"Spore"))) {
			return false;
		}
	}
	if(moveslot.value === 'Baton Pass') return false;
	
	
	if(moveConflict('Synthesis', 'Rest', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Tail Slap', 'Return', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Switcheroo', 'Bulk Up', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Trick', 'Bulk Up', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Trick', 'Calm Mind', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Switcheroo', 'Calm Mind', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Dynamic Punch', 'Close Combat', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Bulk Up', 'Dragon Dance', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Curse', 'Swords Dance', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Bonemerang', 'Earthquake', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Dark Pulse', 'Night Daze', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Shell Smash', 'Stealth Rock', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Rock Polish', 'Roar', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Sunny Day', 'Rain Dance', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Sunny Day', 'Hail', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Hail', 'Rain Dance', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Fire Blast', 'Flamethrower', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Fiery Dance', 'Fire Blast', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Fiery Dance', 'Flamethrower', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Fire Blast', 'Fire Punch', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Fire Blast', 'Overheat', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Lava Plume', 'Flamethrower', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Fire Blast', 'Lava Plume', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Stealth Rock', 'Substitute', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Psycho Cut', 'Zen Headbutt', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Scald', 'Waterfall', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Return', 'Body Slam', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Toxic Spikes', 'Shell Smash', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}

    if (moveConflict('Surf', 'Scald', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
        return false;
    }
	
	if(startsWith(moveslot.value,'Stone Edge') || startsWith(moveslot.value,'Rock Blast')) {
		if((startsWith(otherOne.value,"Rock Slide")) || (startsWith(otherTwo.value,"Rock Slide")) || (startsWith(otherThree.value,"Rock Slide"))) {
			return false;
		}
	}
	
	if(startsWith(moveslot.value,'Rock Slide') || startsWith(moveslot.value,'Rock Blast')) {
		if((startsWith(otherOne.value,"Stone Edge")) || (startsWith(otherTwo.value,"Stone Edge")) || (startsWith(otherThree.value,"Stone Edge"))) {
			return false;
		}
	}
	
	if(startsWith(moveslot.value,'Rock Slide') || startsWith(moveslot.value,'Stone Edge')) {
		if((startsWith(otherOne.value,"Rock Blast")) || (startsWith(otherTwo.value,"Rock Blast")) || (startsWith(otherThree.value,"Rock Blast"))) {
			return false;
		}
	}
	
	if(startsWith(moveslot.value,'Psyshock') || startsWith(moveslot.value,'Zen Headbutt')) {
		if((startsWith(otherOne.value,"Psychic")) || (startsWith(otherTwo.value,"Psychic")) || (startsWith(otherThree.value,"Psychic"))) {
			return false;
		}
	}
	
	if(startsWith(moveslot.value,'Psychic') || startsWith(moveslot.value,'Zen Headbutt')) {
		if((startsWith(otherOne.value,"Psyshock")) || (startsWith(otherTwo.value,"Psyshock")) || (startsWith(otherThree.value,"Psyshock"))) {
			return false;
		}
	}
	
	if(startsWith(moveslot.value,'Psychic') || startsWith(moveslot.value,'Psyshock')) {
		if((startsWith(otherOne.value,"Zen Headbutt")) || (startsWith(otherTwo.value,"Zen Headbutt")) || (startsWith(otherThree.value,"Zen Headbutt"))) {
			return false;
		}
	}
	
	if(moveConflict('Substitute', 'Volt Switch', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Nasty Plot', 'Haze', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	if(moveConflict('Agility', 'Volt Switch', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Substitute', 'U-turn', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Shell Smash', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Quiver Dance', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Dragon Dance', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Shift Gear', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Geomancy', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Dragon Dance', 'Dragon Tail', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Thunderbolt', 'Wild Charge', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(moveConflict('Leaf Blade', 'Giga Drain', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
		return false;
	}
	
	if(contains(["Ninjask","Blaziken","Blaziken-Mega","Torchic","Combusken","Venipede","Whirlipede","Scolipede"],document.getElementById(pokechoice + 'choice').value)) {
		
		if(moveConflict('Bulk Up', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
			return false;
		}
		if(moveConflict('Swords Dance', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
			return false;
		}
		if(moveConflict('Iron Defense', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
			return false;
		}
		if(moveConflict('Hone Claws', 'Baton Pass', moveslot.value, otherOne.value, otherTwo.value, otherThree.value) === true) {
			return false;
		}
    }


    var elem = compress(chosenpoke.toLowerCase());

	try {
		validList = TiersSWSH[elem].randomBattleMoves;
	}
    catch (err) {
        if (startsWith(chosenpoke, 'Pikachu') && chosenpoke !== 'Pikachu') {
            validList = TiersSWSH['pikachu'].randomBattleMoves;
        }

        else if (startsWith(chosenpoke, 'Magearna')) {
            validList = TiersSWSH['magearna'].randomBattleMoves;
        }
		else return(true);
	}
			
	

	if(chosenpoke==='Igglybuff' || chosenpoke==='Jigglypuff' || chosenpoke==='Wigglytuff') {
		if(!contains(validList,'hypervoice')) {
			validList.push('hypervoice');
		}
	}
	if(chosenpoke==='Cyndaquil' || chosenpoke==='Quilava' || chosenpoke==='Typhlosion') {
		if(!contains(validList,'extrasensory')) {
			validList.push('extrasensory');
		}
	}
	if(chosenpoke==='Ponyta' || chosenpoke==='Rapidash') {
		if(!contains(validList,'willowisp')) {
			validList.push('willowisp');
		}
	}
	if(chosenpoke==='Hawlucha') {
		if(!contains(validList,'substitute')) {
			validList.push('substitute');
		}
	}
	if(chosenpoke==='Delphox') {
		if(!contains(validList,'dazzlinggleam')) {
			validList.push('dazzlinggleam');
		}
	}
	if(chosenpoke==='Machop' || chosenpoke==='Machoke' || chosenpoke==='Machamp') {
		if(!contains(validList,'closecombat')) {
			validList.push('closecombat');
		}
    }
			
	if(chosenpoke === 'Kingler' && !contains(validList,'rockslide')) {
		validList.push('rockslide');
	}
			
	chosenpokeraw = elem;

	
	//return true if pokemon has no viable moves list
	if(startsWith(chosenpokeraw,'pikachu') && chosenpokeraw !== 'pikachu') {
		if(chosenpokeraw === 'pikachubelle' && !contains(validList,'iciclecrash')) validList.push('iciclecrash');
		if(chosenpokeraw === 'pikachurockstar' && !contains(validList,'meteormash')) validList.push('meteormash');
	}
    else if (TiersSWSH[chosenpokeraw].hasOwnProperty('randomBattleMoves') === false) return true;
	//
	
	
	for(i = 0; i < validList.length; i++) {
		if(contains(BattlePokedex[chosenpokeraw].types, BattleMovedex[validList[i]].type)) {
			if((BattleMovedex[validList[i]].basePower > 0) || BattleMovedex[validList[i]].name === 'Nature Power' || BattleMovedex[validList[i]].hasOwnProperty('basePowerCallback')) {
				needSTAB = true;
				validListSTAB.push(validList[i]);
				//alert("Move is " + validList[i] + " and power is " + BattleMovedex[validList[i]].basePower);
			}
		}
	}
	
	
	for(i = 0; i < validList.length; i++) {
		
		
			validListNames.push(BattleMovedex[validList[i]].name);
		
	}
	
	//Exception for Sylveon (guaranteed Hyper Voice with Pixilate)
	
	
	if(chosenpoke === 'Sylveon') {
		var canAllow = false;
		if(otherOne.value === 'Hyper Voice') canAllow = true;
		if(otherTwo.value === 'Hyper Voice') canAllow = true;
		if(otherThree.value === 'Hyper Voice') canAllow = true;
		if(moveslot.value === 'Hyper Voice') canAllow = true;
		if(canAllow === false) {
			return false;
		}
		else if(document.getElementById('viableChoice').value==='Random') return true;
	}
	
	//End Sylveon cheat
	
	//For Mega-Rayquaza, must have Dragon Ascent
	if(chosenpoke === 'Rayquaza-Mega') {
		var canAllow = false;
		if(otherOne.value === 'Dragon Ascent') canAllow = true;
		if(otherTwo.value === 'Dragon Ascent') canAllow = true;
		if(otherThree.value === 'Dragon Ascent') canAllow = true;
		if(moveslot.value === 'Dragon Ascent') canAllow = true;
		if(canAllow === false) {
			return false;
		}
		else if(document.getElementById('viableChoice').value==='Random') return true;
	}
	
	//Done checking Mega-Rayquaza
	
	//If 4th move slot has just been chosen, check to see if Pokemon has any STAB moves, reroll if false
	if(endsWith(moveslot.id,'move4') && needSTAB === true) {
		var canAllow = false;
		for(i = 0; i < validListSTAB.length; i++) {
			if(otherOne.value === BattleMovedex[validListSTAB[i]].name) canAllow = true;
			if(otherTwo.value === BattleMovedex[validListSTAB[i]].name) canAllow = true;
			if(otherThree.value === BattleMovedex[validListSTAB[i]].name) canAllow = true;
			if(moveslot.value === BattleMovedex[validListSTAB[i]].name) canAllow = true;
		}
		if(canAllow === false) {
			if(validListSTAB.length === 1){
				var randNumFour = Math.floor(Math.random() * 4);
				switch(randNumFour) {
					case 0:
						document.getElementById((pokechoice + "move1").toString()).value = BattleMovedex[validListSTAB[0]].name;
						break;
					case 1:
						document.getElementById((pokechoice + "move2").toString()).value = BattleMovedex[validListSTAB[0]].name;
						break;
					case 2:
						document.getElementById((pokechoice + "move3").toString()).value = BattleMovedex[validListSTAB[0]].name;
						break;
					case 3:
						document.getElementById((pokechoice + "move4").toString()).value = BattleMovedex[validListSTAB[0]].name;
						break;
				}
				
			}
			else {
				randomMove(pokechoice);
				return false;
			}
		}
	}
	/////STAB checking done///////////
	
	//Check for weird physical/special hybrid sets (e.g. Nasty Plot Physical Infernape)
	if(endsWith(moveslot.id,'move4')) {
		var checkMoves = [];
		var checkBoosts = 0;
		var checkPhysical = 0;
		var checkSpecial = 0;
		
		checkMoves.push(document.getElementById((pokechoice + "move1").toString()).value);
		checkMoves.push(document.getElementById((pokechoice + "move2").toString()).value);
		checkMoves.push(document.getElementById((pokechoice + "move3").toString()).value);
		checkMoves.push(document.getElementById((pokechoice + "move4").toString()).value);
		
		for(elem in BattleMovedex) {
			for(i = 0; i < 4; i++) {
				if(BattleMovedex[elem].name === checkMoves[i]) {
					if(BattleMovedex[elem].category === "Special") checkSpecial +=1;
					if(BattleMovedex[elem].category === "Physical") checkPhysical +=1;
					if(BattleMovedex[elem].hasOwnProperty('boosts') || BattleMovedex[elem].hasOwnProperty('weather') || checkMoves[i] === 'Substitute') {
						checkBoosts +=1;
					}
				}
			}
		}
		
		if(checkPhysical > 0 && contains(checkMoves,'Nasty Plot')) {
			randomMove(pokechoice);
			return false;
		}
		if(checkPhysical > 0 && contains(checkMoves,'Calm Mind')) {
			randomMove(pokechoice);
			return false;
		}
		if(checkSpecial > 0 && contains(checkMoves,'Coil')) {
			randomMove(pokechoice);
			return false;
		}
		if(checkSpecial > 0 && contains(checkMoves,'Swords Dance')) {
			randomMove(pokechoice);
			return false;
		}
		if(checkSpecial > 0 && contains(checkMoves,'Dragon Dance')) {
			randomMove(pokechoice);
			return false;
		}
		if(checkSpecial > 0 && contains(checkMoves,'Bulk Up')) {
			randomMove(pokechoice);
			return false;
		}
		if((checkSpecial + checkPhysical < 2) && contains(checkMoves,'Shell Smash')) {
			randomMove(pokechoice);
			return false;
		}
		if(contains(checkMoves,'Sleep Talk') && contains(validListNames,"Sleep Talk") && !contains(checkMoves,'Rest')) {
			randomMove(pokechoice);
			return false;
		}
		if(contains(checkMoves,'Stored Power') && checkBoosts === 0) {
			randomMove(pokechoice);
			return false;
		}
	}
	//End checking for weird physical/special hybrid sets
	
	if(startsWith(moveslot.value,'Hidden Power')) {
		if((startsWith(otherOne.value,"Hidden Power")) || (startsWith(otherTwo.value,"Hidden Power")) || (startsWith(otherThree.value,"Hidden Power"))) {
			return false;
		}
	}
	
	if(contains(validListNames,moveslot.value)) {
		return true;
	}
	return false;
}


//Select a random move based on the viable moveset
function randomMove(pokemon) {

    

    switch (pokemon) {

        

		case 'poke1':
            if ((document.getElementById('poke1move1').length) < 4) break;

			var slot = document.getElementById('poke1move1');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			if(startsWith(slot.value,"Hidden Power")) {
				if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			
			//If Unown is selected, set all moves to same as slot 1 and break switch
			if(document.getElementById('poke1choice').value==='Unown') {
				document.getElementById('poke1move2').value = document.getElementById('poke1move1').value;
				document.getElementById('poke1move3').value = document.getElementById('poke1move1').value;
				document.getElementById('poke1move4').value = document.getElementById('poke1move1').value;
				break;
			}
			
			
			////
			while(checkViable(pokemon,slot) === false) {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			////
			
			slot = document.getElementById('poke1move2');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if(startsWith(document.getElementById('poke1move1').value,"Hidden Power")) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
				
			}
			while(slot.selectedIndex === document.getElementById('poke1move1').selectedIndex);
			
			slot = document.getElementById('poke1move3');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			do {
				
				
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				
				
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke1move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke1move2').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke1move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke1move2').selectedIndex));
			
			slot = document.getElementById('poke1move4');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			do {
				
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke1move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke1move2').value,"Hidden Power")) || (startsWith(document.getElementById('poke1move3').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke1move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke1move2').selectedIndex) || (slot.selectedIndex === document.getElementById('poke1move3').selectedIndex));
			
			break;
		case 'poke2':
			if((document.getElementById('poke2move1').length) < 4) break;
			
			var slot = document.getElementById('poke2move1');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			if(startsWith(slot.value,"Hidden Power")) {
				if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			
			//If Unown is selected, set all moves to same as slot 1 and break switch
			if(document.getElementById('poke2choice').value==='Unown') {
				document.getElementById('poke2move2').value = document.getElementById('poke2move1').value;
				document.getElementById('poke2move3').value = document.getElementById('poke2move1').value;
				document.getElementById('poke2move4').value = document.getElementById('poke2move1').value;
				break;
			}
			
			////
			while(checkViable(pokemon,slot) === false) {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			////
			
			slot = document.getElementById('poke2move2');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if(startsWith(document.getElementById('poke2move1').value,"Hidden Power")) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while(slot.selectedIndex === document.getElementById('poke2move1').selectedIndex);
			
			slot = document.getElementById('poke2move3');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke2move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke2move2').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke2move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke2move2').selectedIndex));
			
			slot = document.getElementById('poke2move4');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke2move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke2move2').value,"Hidden Power")) || (startsWith(document.getElementById('poke2move3').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke2move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke2move2').selectedIndex) || (slot.selectedIndex === document.getElementById('poke2move3').selectedIndex));
			
			break;
		case 'poke3':
			if((document.getElementById('poke3move1').length) < 4) break;
			var slot = document.getElementById('poke3move1');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			if(startsWith(slot.value,"Hidden Power")) {
				if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			
			//If Unown is selected, set all moves to same as slot 1 and break switch
			if(document.getElementById('poke3choice').value==='Unown') {
				document.getElementById('poke3move2').value = document.getElementById('poke3move1').value;
				document.getElementById('poke3move3').value = document.getElementById('poke3move1').value;
				document.getElementById('poke3move4').value = document.getElementById('poke3move1').value;
				break;
			}
			
			////
			while(checkViable(pokemon,slot) === false) {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			////
			
			slot = document.getElementById('poke3move2');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if(startsWith(document.getElementById('poke3move1').value,"Hidden Power")) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while(slot.selectedIndex === document.getElementById('poke3move1').selectedIndex);
			
			slot = document.getElementById('poke3move3');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke3move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke3move2').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke3move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke3move2').selectedIndex));
			
			slot = document.getElementById('poke3move4');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke3move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke3move2').value,"Hidden Power")) || (startsWith(document.getElementById('poke3move3').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke3move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke3move2').selectedIndex) || (slot.selectedIndex === document.getElementById('poke3move3').selectedIndex));
			
			break;
		case 'poke4':
			if((document.getElementById('poke4move1').length) < 4) break;
			var slot = document.getElementById('poke4move1');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			if(startsWith(slot.value,"Hidden Power")) {
				if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			
			//If Unown is selected, set all moves to same as slot 1 and break switch
			if(document.getElementById('poke4choice').value==='Unown') {
				document.getElementById('poke4move2').value = document.getElementById('poke4move1').value;
				document.getElementById('poke4move3').value = document.getElementById('poke4move1').value;
				document.getElementById('poke4move4').value = document.getElementById('poke4move1').value;
				break;
			}
			
			////
			while(checkViable(pokemon,slot) === false) {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			////
			
			slot = document.getElementById('poke4move2');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if(startsWith(document.getElementById('poke4move1').value,"Hidden Power")) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while(slot.selectedIndex === document.getElementById('poke4move1').selectedIndex);
			
			slot = document.getElementById('poke4move3');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke4move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke4move2').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke4move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke4move2').selectedIndex));
			
			slot = document.getElementById('poke4move4');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke4move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke4move2').value,"Hidden Power")) || (startsWith(document.getElementById('poke4move3').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke4move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke4move2').selectedIndex) || (slot.selectedIndex === document.getElementById('poke4move3').selectedIndex));
			
			break;
		case 'poke5':
			if((document.getElementById('poke5move1').length) < 4) break;
			var slot = document.getElementById('poke5move1');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			if(startsWith(slot.value,"Hidden Power")) {
				if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			
			//If Unown is selected, set all moves to same as slot 1 and break switch
			if(document.getElementById('poke5choice').value==='Unown') {
				document.getElementById('poke5move2').value = document.getElementById('poke5move1').value;
				document.getElementById('poke5move3').value = document.getElementById('poke5move1').value;
				document.getElementById('poke5move4').value = document.getElementById('poke5move1').value;
				break;
			}
			
			////
			while(checkViable(pokemon,slot) === false) {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			////
			
			slot = document.getElementById('poke5move2');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if(startsWith(document.getElementById('poke5move1').value,"Hidden Power")) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while(slot.selectedIndex === document.getElementById('poke5move1').selectedIndex);
			
			slot = document.getElementById('poke5move3');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke5move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke5move2').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke5move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke5move2').selectedIndex));
			
			slot = document.getElementById('poke5move4');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke5move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke5move2').value,"Hidden Power")) || (startsWith(document.getElementById('poke5move3').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke5move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke5move2').selectedIndex) || (slot.selectedIndex === document.getElementById('poke5move3').selectedIndex));
			
			break;
		case 'poke6':
			if((document.getElementById('poke6move1').length) < 4) break;
			var slot = document.getElementById('poke6move1');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			if(startsWith(slot.value,"Hidden Power")) {
				if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			
			//If Unown is selected, set all moves to same as slot 1 and break switch
			if(document.getElementById('poke6choice').value==='Unown') {
				document.getElementById('poke6move2').value = document.getElementById('poke6move1').value;
				document.getElementById('poke6move3').value = document.getElementById('poke6move1').value;
				document.getElementById('poke6move4').value = document.getElementById('poke6move1').value;
				break;
			}
			
			////
			while(checkViable(pokemon,slot) === false) {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			}
			////
			
			slot = document.getElementById('poke6move2');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if(startsWith(document.getElementById('poke6move1').value,"Hidden Power")) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while(slot.selectedIndex === document.getElementById('poke6move1').selectedIndex);
			
			slot = document.getElementById('poke6move3');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke6move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke6move2').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke6move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke6move2').selectedIndex));
			
			slot = document.getElementById('poke6move4');
			slot.selectedIndex = Math.floor(Math.random()*(slot.length));
			
			do {
				slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				//Remove duplicate Hidden Powers
				while(startsWith(slot.value,"Hidden Power")) {
					if((startsWith(document.getElementById('poke6move1').value,"Hidden Power")) || (startsWith(document.getElementById('poke6move2').value,"Hidden Power")) || (startsWith(document.getElementById('poke6move3').value,"Hidden Power"))) {
						slot.selectedIndex = Math.floor(Math.random()*(slot.length));
					}
					else break;
				}
				if(startsWith(slot.value,"Hidden Power")) {
					if(Math.floor(Math.random()*17) !== 0) slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				//Duplicate Hidden Powers removed
				
				////
				while(checkViable(pokemon,slot) === false) {
					slot.selectedIndex = Math.floor(Math.random()*(slot.length));
				}
				////
			}
			while((slot.selectedIndex === document.getElementById('poke6move1').selectedIndex) || (slot.selectedIndex === document.getElementById('poke6move2').selectedIndex) || (slot.selectedIndex === document.getElementById('poke6move3').selectedIndex));
			
			break;
	}
}

function randomSearchType() {
	if(document.getElementById('fullSearch').checked === true) {
		doFullSearch(44);
		//44 criteria to meet (weak against, strong against + checklist)
	}
	else {
		randomGenerate();
	}
}

function doFullSearch(n) {

    var i = 0;

	for(i = 0; i<10; i++) {
		randomGenerate();
		var checkCount = 0;
		//Count up how many criteria are met with this random generation
		//Strengths
		if(document.getElementById('strongbug').value !== 0) checkCount += 1;
		if(document.getElementById('strongdark').value !== 0) checkCount += 1;
		if(document.getElementById('strongdragon').value !== 0) checkCount += 1;
		if(document.getElementById('strongelectric').value !== 0) checkCount += 1;
		if(document.getElementById('strongfairy').value !== 0) checkCount += 1;
		if(document.getElementById('strongfight').value !== 0) checkCount += 1;
		if(document.getElementById('strongfire').value !== 0) checkCount += 1;
		if(document.getElementById('strongflying').value !== 0) checkCount += 1;
		if(document.getElementById('strongghost').value !== 0) checkCount += 1;
		if(document.getElementById('stronggrass').value !== 0) checkCount += 1;
		if(document.getElementById('strongground').value !== 0) checkCount += 1;
		if(document.getElementById('strongice').value !== 0) checkCount += 1;
		if(document.getElementById('strongnormal').value !== 0) checkCount += 1;
		if(document.getElementById('strongpoison').value !== 0) checkCount += 1;
		if(document.getElementById('strongpsychic').value !== 0) checkCount += 1;
		if(document.getElementById('strongrock').value !== 0) checkCount += 1;
		if(document.getElementById('strongsteel').value !== 0) checkCount += 1;
		if(document.getElementById('strongwater').value !== 0) checkCount += 1;
		//Weaknesses
		if(document.getElementById('weakbug').value < 3) checkCount += 1;
		if(document.getElementById('weakdark').value < 3) checkCount += 1;
		if(document.getElementById('weakdragon').value < 3) checkCount += 1;
		if(document.getElementById('weakelectric').value < 3) checkCount += 1;
		if(document.getElementById('weakfairy').value < 3) checkCount += 1;
		if(document.getElementById('weakfight').value < 3) checkCount += 1;
		if(document.getElementById('weakfire').value < 3) checkCount += 1;
		if(document.getElementById('weakflying').value < 3) checkCount += 1;
		if(document.getElementById('weakghost').value < 3) checkCount += 1;
		if(document.getElementById('weakgrass').value < 3) checkCount += 1;
		if(document.getElementById('weakground').value < 3) checkCount += 1;
		if(document.getElementById('weakice').value < 3) checkCount += 1;
		if(document.getElementById('weakpoison').value < 3) checkCount += 1;
		if(document.getElementById('weakpsychic').value < 3) checkCount += 1;
		if(document.getElementById('weakrock').value < 3) checkCount += 1;
		if(document.getElementById('weaksteel').value < 3) checkCount += 1;
		if(document.getElementById('weakwater').value < 3) checkCount += 1;
		//Checkboxes
		if(document.getElementById('checkspinner').checked === true) checkCount += 1;
		if(document.getElementById('checkcleric').checked === true) checkCount += 1;
		if(document.getElementById('checkrecovery').checked === true) checkCount += 1;
		if(document.getElementById('checkstatuser').checked === true) checkCount += 1;
		if(document.getElementById('checkphaser').checked === true) checkCount += 1;
		if(document.getElementById('checkhazards').checked === true) checkCount += 1;
		if(document.getElementById('checkpriority').checked === true) checkCount += 1;
		if(document.getElementById('checkboost').checked === true) checkCount += 1;
		if(document.getElementById('checkvoltturn').checked === true) checkCount += 1;
		//alert("checkCount is " + checkCount + " and n is " + n);
		
		if(checkCount >= n) {
			var checkPercent = parseFloat(checkCount * 100/44).toFixed(2);
			alert("Team generated with " + checkPercent + "% criteria met.");
			return;
		}
		else {
            if (i >= 9) {
                doFullSearch(n - 1);
                return;
            }
            
		}
	}
}

function beginRandomGenerate() {
	if(document.getElementById('viableChoice').value === 'Super Viable') {
		doFullSearch(44);
	}
	else {
		randomGenerate();
	}
}

function randomGenerate() {
	
	filterConflict('whatever');
	var filterTier=document.getElementById('tierChoice').value;
	var filterType=document.getElementById('typeChoice').value;
	var filterRegion=document.getElementById('regionChoice').value;
	
	//Generate a list of all valid choices
	var validList = [];
	var formecount = 0;
	var temptier = "";
	
	for(elem in BattlePokedex) {


        if (elem.startsWith('pikachu') && elem !== "pikachu") {
            continue;
        }
        if (elem.startsWith('pichu') && elem !== "pichu") {
            continue;
        }
        if (elem.startsWith('xerneas') && elem !== "xerneas") {
            continue;
        }
        if (elem.startsWith('yveltal') && elem !== "yveltal") {
            continue;
        }

        if (BattlePokedex[elem].num < 1) break;
        try {

            if (BattlePokedex[elem].species.startsWith("Pikachu-") || BattlePokedex[elem].species.startsWith("Pichu-") || BattlePokedex[elem].species.startsWith("Cramorant-")
                || BattlePokedex[elem].species.endsWith("-Totem")
                || BattlePokedex[elem].species.startsWith("Aegislash-")
                || BattlePokedex[elem].species.startsWith("Castform-") || BattlePokedex[elem].species.startsWith("Cherrim-")
                || BattlePokedex[elem].species.endsWith("-Zen") || BattlePokedex[elem].species.endsWith("-Noice") || BattlePokedex[elem].species.endsWith("-Primal")
                || BattlePokedex[elem].species.endsWith("-Busted")
                || BattlePokedex[elem].species.endsWith("-Meteor") || BattlePokedex[elem].species.endsWith("-Hangry") || BattlePokedex[elem].species.startsWith("Vivillon-")
                || BattlePokedex[elem].species.startsWith("Wishiwashi-") || BattlePokedex[elem].species.startsWith("Meloetta-")) {
                continue;
            }

            if ((TiersSWSH[elem].tier === "Unreleased" && document.getElementById("tierChoice").value !== "National Dex") || (TiersSWSH[elem].tier === "Illegal" && document.getElementById("tierChoice").value !== "National Dex") || BattlePokedex[elem].species.endsWith("-Gmax")) {
                continue;
            }


        }
        catch
        {
        }

        try {
			if(elem.startsWith('flabebe')) {
				temptier = TiersSWSH['flabebe'].tier;
			}
			else if(elem.startsWith('floette')) {
				temptier = TiersSWSH['floette'].tier;
			}
			else if(elem.startsWith('florges')) {
				temptier = TiersSWSH['florges'].tier;
			}
			else if(elem.startsWith('gastrodon')) {
				temptier = TiersSWSH['gastrodon'].tier;
			}
			else if(elem.startsWith('shellos')) {
				temptier = TiersSWSH['shellos'].tier;
			}
			else if(elem.startsWith('minior')) {
				temptier = TiersSWSH['minior'].tier;
			}
			else if(elem.startsWith('vivillon')) {
				temptier = TiersSWSH['vivillon'].tier;
			}
			else {
                temptier = TiersSWSH[elem].tier;
			}
		}
		catch(err) {
			temptier = 'OU';
		}
		
		switch(temptier) {
			case "BL":
			case "UUBL":
				temptier='OU';
				break;
			case "BL2":
			case "RUBL":
				temptier='UU';
				break;
			case "BL3":
			case "NUBL":
				temptier='RU';
				break;
			case "BL4":
			case "PUBL":
				temptier='NU';
				break;
			case "(PU)":
			case "ZU":
				temptier='ZU';
				break;
			case "LC Uber":
				temptier='NFE';
				break;
			default:
				break;
		}
		/*if(TiersSWSH[elem] == null) {
			temptier = 'OU';
		}*/
		if((temptier==='')/* || !(TiersSWSH[elem].hasOwnProperty('tier'))*/) {
			if(startsWith(elem,'arceus')) temptier='Uber';
			if((endsWith(elem,'mega')) && (elem !== 'yanmega')) {
				temptier = TiersSWSH[(elem.substr(0, elem.length - 4))].tier;
			}
			
			if((endsWith(elem,'megax')) || (endsWith(elem,'megay'))) {
				temptier = TiersSWSH[(elem.substr(0, elem.length - 5))].tier;
			}
			
			
			if(startsWith(elem,'genesect')) {
				temptier = TiersSWSH['genesect'].tier;
            }

            if (startsWith(elem, 'sinistea')) {
                temptier = TiersSWSH['sinistea'].tier;
            }

            if (startsWith(elem, 'polteageist')) {
                temptier = TiersSWSH['polteageist'].tier;
            }
			
			if(endsWith(elem,'primal')) {
				temptier = TiersSWSH[(elem.substr(0, elem.length - 6))].tier;
			}
			
		}
	
		formecount = 0;
		//Select any pokemon from tier immediately below with 50% chance
		var tierBelow = 'na';
		switch(filterTier) {
			case 'NU':
				tierBelow='PU';
				break;
			case 'PU':
				tierBelow='ZU';
				break;
			case 'ZU':
				tierBelow='NFE';
				break;
			case 'RU':
				tierBelow='NU';
				break;
			case 'UU':
				tierBelow='RU';
				break;
			case 'OU':
				tierBelow='UU';
				break;
			case 'Ubers':
				tierBelow='OU';
				break;
			case 'Uber':
				tierBelow='OU';
				break;
			case 'NFE':
				tierBelow='LC';
				break;
			default:
				tierBelow='derp';
				break;
		}
		
		if(filterTier==='Ubers') filterTier='Uber';
		
		//Check to see if current element has alternate formes/mega
		//var dexno = BattlePokedex[elem].num;
		
		//for(elem1 in BattlePokedex) {
  //          try {
  //              if (TiersSWSH[elem1].tier !== "Unreleased" || filterTier === 'National Dex') {
  //                  var testing123 = BattlePokedex[elem1].num;
  //              }
		//	}
		//	catch(err) {
				
		//	}
		//	if(dexno === testing123) {
		//		formecount+=1;
		//	}
		//}

        var formecount = 1;
		
		//if(formecount !== 1) alert("species is " + BattlePokedex[elem].species + " and " + "formecount is " + formecount);
		
		if((temptier === tierBelow) && tierBelow!=="na") {
			if(Math.floor(Math.random()*4) === 1) {
				if(Math.floor(Math.random()*(formecount-1))===0) validList.push(elem);
			}
		}
	
		//Always select Pokemon in the selected tier
		//Add the Pokedex number of chosen pokes to list
		if((temptier === filterTier) || filterTier==='(Any)' || filterTier==='Hackmons' || filterTier==='National Dex') {
			if(Math.floor(Math.random()*(formecount-1))===0) validList.push(elem);
		}
	}
	

	
	//******************************************************************Check for region filtering
	if(filterRegion !== '(Any)') {
		var validListTemp = validList;
		var validListBackup;
		var minnum = 0;
		var maxnum = 0;
		
		validList = [];
		switch(filterRegion) {
			case 'Kanto':
				minnum = 1;
				maxnum = 151;
				break;
			case 'Johto':
				minnum = 152;
				maxnum = 251;
				break;
			case 'Hoenn':
				minnum = 252;
				maxnum = 386;
				break;
			case 'Sinnoh':
				minnum = 387;
				maxnum = 493;
				break;
			case 'Unova':
				minnum = 494;
				maxnum = 649;
				break;
			case 'Kalos':
				minnum = 650;
				maxnum = 721;
				break;
		    case 'Alola':
				minnum = 722;
				maxnum = 809;
                break;
            case 'Galar':
                minnum = 810;
                maxnum = 890;
                break;
		}
	
		
		for(i = 0; i < (validListTemp.length - 1); i++) {
			
			if((BattlePokedex[validListTemp[i]].num >= minnum) && (BattlePokedex[validListTemp[i]].num <= maxnum)){
				validList.push(validListTemp[i]);
			}
		}
	
	//If list of possible pokes too small, add all viable from tier below
	while(validList.length < 15) {
		if(tierBelow==='derp') break;
        if (filterTier === 'LC') break;



        for (elem in TiersSWSH) {

            if (elem.startsWith('pikachu') && elem !== "pikachu") {
                continue;
            }
            if (elem.startsWith('pichu') && elem !== "pichu") {
                continue;
            }
            if (elem.startsWith('xerneas') && elem !== "xerneas") {
                continue;
            }
            if (elem.startsWith('yveltal') && elem !== "yveltal") {
                continue;
            }

            try {
                if (BattlePokedex[elem].num < 1) break;
            }
            catch {
                //Trap for anything not in BattleDex e.g. rockruffdusk
                continue;
            }
            if (BattlePokedex[elem].species.startsWith("Pikachu-") || BattlePokedex[elem].species.startsWith("Pichu-") || BattlePokedex[elem].species.startsWith("Cramorant-")
                || BattlePokedex[elem].species.endsWith("-Totem")
                || BattlePokedex[elem].species.startsWith("Aegislash-")
                || BattlePokedex[elem].species.startsWith("Castform-") || BattlePokedex[elem].species.startsWith("Cherrim-")
                || BattlePokedex[elem].species.endsWith("-Zen") || BattlePokedex[elem].species.endsWith("-Noice") || BattlePokedex[elem].species.endsWith("-Primal")
                || BattlePokedex[elem].species.endsWith("-Busted")
                || BattlePokedex[elem].species.endsWith("-Meteor") || BattlePokedex[elem].species.endsWith("-Hangry") || BattlePokedex[elem].species.startsWith("Vivillon-")
                || BattlePokedex[elem].species.startsWith("Wishiwashi-") || BattlePokedex[elem].species.startsWith("Meloetta-")) {
                continue;
            }

            if ((TiersSWSH[elem].tier === "Unreleased" && document.getElementById("tierChoice").value !== "National Dex") || (TiersSWSH[elem].tier === "Illegal" && document.getElementById("tierChoice").value !== "National Dex") || BattlePokedex[elem].species.endsWith("-Gmax")) {
                continue;
            }

            if (TiersSWSH[elem].tier === tierBelow) {
                //Need to check for region-specific pokes here!
				if((BattlePokedex[elem].num >= minnum) && (BattlePokedex[elem].num <= maxnum)) {
					//alert(filterType + "pokemon found in " + tierBelow + " tier");
					if(!contains(validList,elem)) {
						validList.push(elem);
					}
				}
			}
		}
		//Move down to next tier
		switch(tierBelow) {
			case 'PU':
				tierBelow='ZU';
                break;
            case 'ZU':
                tierBelow = 'NFE';
                break;
			case 'NU':
				tierBelow='PU';
				break;
			case 'NFE':
				tierBelow='LC';
				break;
			case 'RU':
				tierBelow='NU';
				break;
			case 'UU':
				tierBelow='RU';
				break;
			case 'OU':
				tierBelow='UU';
				break;
			case 'Ubers':
				tierBelow='OU';
				break;
			case 'Uber':
				tierBelow='OU';
				break;
			case 'LC':
				tierBelow='derp';
				break;
			default:
				tierBelow='derp';
				break;
		}
		
	}
		
		
	}
	
	
	//Do not need to apply forme filter again
	//***********************************************Check for monotype filtering*********************
	
	validListTemp = validList;
	
	if(filterType !== '(Any)') {
		
		validList = [];
		
		for(i = 0; i < (validListTemp.length - 1); i++) {
			
			if(contains(BattlePokedex[validListTemp[i]].types, filterType)){
				validList.push(validListTemp[i]);
			}
		}
	}
	
	//If list of possible pokes too small, add all viable from tier below
	while(validList.length < 15) {
		
		if(tierBelow==='derp') break;
		if(filterTier==='LC') break;
        for (elem in TiersSWSH) {

            if (elem.startsWith('pikachu') && elem !== "pikachu") {
                continue;
            }
            if (elem.startsWith('pichu') && elem !== "pichu") {
                continue;
            }
            if (elem.startsWith('xerneas') && elem !== "xerneas") {
                continue;
            }
            if (elem.startsWith('yveltal') && elem !== "yveltal") {
                continue;
            }


            try {
                if (BattlePokedex[elem].num < 1) break;
            }
            catch {
                //Trap for anything not in BattleDex e.g. rockruffdusk
                continue;
            }
            
            if (BattlePokedex[elem].species.startsWith("Pikachu-") || BattlePokedex[elem].species.startsWith("Pichu-") || BattlePokedex[elem].species.startsWith("Cramorant-")
                || BattlePokedex[elem].species.endsWith("-Totem")
                || BattlePokedex[elem].species.startsWith("Aegislash-")
                || BattlePokedex[elem].species.startsWith("Castform-") || BattlePokedex[elem].species.startsWith("Cherrim-")
                || BattlePokedex[elem].species.endsWith("-Zen") || BattlePokedex[elem].species.endsWith("-Noice") || BattlePokedex[elem].species.endsWith("-Primal")
                || BattlePokedex[elem].species.endsWith("-Busted")
                || BattlePokedex[elem].species.endsWith("-Meteor") || BattlePokedex[elem].species.endsWith("-Hangry") || BattlePokedex[elem].species.startsWith("Vivillon-")
                || BattlePokedex[elem].species.startsWith("Wishiwashi-") || BattlePokedex[elem].species.startsWith("Meloetta-")) {
                continue;
            }

            if ((TiersSWSH[elem].tier === "Unreleased" && document.getElementById("tierChoice").value !== "National Dex") || (TiersSWSH[elem].tier === "Illegal" && document.getElementById("tierChoice").value !== "National Dex") || BattlePokedex[elem].species.endsWith("-Gmax")) {
                continue;
            }

			if(TiersSWSH[elem].tier === tierBelow) {
				if(contains(BattlePokedex[elem].types, filterType)) {
					//alert(filterType + "pokemon found in " + tierBelow + " tier");
					if(!contains(validList,elem)) {
						validList.push(elem);
					}
				}
			}
		}
		//Move down to next tier
		switch(tierBelow) {
			case 'NU':
				tierBelow='PU';
				break;
			case 'PU':
				tierBelow='ZU';
                break;
            case 'ZU':
                tierBelow = 'NFE';
                break;
			case 'NFE':
				tierBelow='LC';
				break;
			case 'RU':
				tierBelow='NU';
				break;
			case 'UU':
				tierBelow='RU';
				break;
			case 'OU':
				tierBelow='UU';
				break;
			case 'LC':
				tierBelow='derp';
				break;
			case 'Ubers':
				tierBelow='OU';
				break;
			default:
				tierBelow='LC';
				break;
		}
		
	}
	
	if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) document.getElementById('poke1choice').value="";
	if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) document.getElementById('poke2choice').value="";
	if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) document.getElementById('poke3choice').value="";
	if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) document.getElementById('poke4choice').value="";
	if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) document.getElementById('poke5choice').value="";
	if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) document.getElementById('poke6choice').value="";
	
	if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) changeSelection(poke1choice,validList);
	if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) changeSelection(poke2choice,validList);
	if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) changeSelection(poke3choice,validList);
	if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) changeSelection(poke4choice,validList);
	if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) changeSelection(poke5choice,validList);
	if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) changeSelection(poke6choice,validList);
	
	//REMOVE ALL BLANK PLACEHOLDERS
		var xchoice = document.getElementById('poke1choice');
		for(i = 0; i < xchoice.length; i++) {
			if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
		}
		
		var xchoice = document.getElementById('poke2choice');
		for(i = 0; i < xchoice.length; i++) {
			if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
		}
		
		var xchoice = document.getElementById('poke3choice');
		for(i = 0; i < xchoice.length; i++) {
			if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
		}
		
		var xchoice = document.getElementById('poke4choice');
		for(i = 0; i < xchoice.length; i++) {
			if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
		}
		
		var xchoice = document.getElementById('poke5choice');
		for(i = 0; i < xchoice.length; i++) {
			if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
		}
		
		var xchoice = document.getElementById('poke6choice');
		for(i = 0; i < xchoice.length; i++) {
			if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
		}
	//////////////////////////////////////
	
	
	
	//******************************************//
	//Change if more than 1 Mega is present
	//First Pokemon
	if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
		while((endsWith(document.getElementById('poke1choice').value, "Mega")) || (endsWith(document.getElementById('poke1choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke1choice').value, "Mega-X"))) {
			
			if((endsWith(document.getElementById('poke2choice').value, "Mega")) || (endsWith(document.getElementById('poke2choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke2choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke1choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke3choice').value, "Mega")) || (endsWith(document.getElementById('poke3choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke3choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke1choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke4choice').value, "Mega")) || (endsWith(document.getElementById('poke4choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke4choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke1choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke5choice').value, "Mega")) || (endsWith(document.getElementById('poke5choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke5choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke1choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke6choice').value, "Mega")) || (endsWith(document.getElementById('poke6choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke6choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock1').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke1choice,validList);
				}
			}
			else break;
		}
	}
	//Second Pokemon
	if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
		while((endsWith(document.getElementById('poke2choice').value, "Mega")) || (endsWith(document.getElementById('poke2choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke2choice').value, "Mega-X"))) {
			
			if((endsWith(document.getElementById('poke1choice').value, "Mega")) || (endsWith(document.getElementById('poke1choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke1choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke2choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke3choice').value, "Mega")) || (endsWith(document.getElementById('poke3choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke3choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke2choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke4choice').value, "Mega")) || (endsWith(document.getElementById('poke4choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke4choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke2choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke5choice').value, "Mega")) || (endsWith(document.getElementById('poke5choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke5choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke2choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke6choice').value, "Mega")) || (endsWith(document.getElementById('poke6choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke6choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock2').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke2choice,validList);
				}
			}
			else break;
		}
	}
	//Third Pokemon
	if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
		while((endsWith(document.getElementById('poke3choice').value, "Mega")) || (endsWith(document.getElementById('poke3choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke3choice').value, "Mega-X"))) {
			
			if((endsWith(document.getElementById('poke1choice').value, "Mega")) || (endsWith(document.getElementById('poke1choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke1choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke3choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke2choice').value, "Mega")) || (endsWith(document.getElementById('poke2choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke2choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke3choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke4choice').value, "Mega")) || (endsWith(document.getElementById('poke4choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke4choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke3choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke5choice').value, "Mega")) || (endsWith(document.getElementById('poke5choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke5choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke3choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke6choice').value, "Mega")) || (endsWith(document.getElementById('poke6choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke6choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock3').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke3choice,validList);
				}
			}
			else break;
		}
	}
	//Fourth Pokemon
	if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
		while((endsWith(document.getElementById('poke4choice').value, "Mega")) || (endsWith(document.getElementById('poke4choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke4choice').value, "Mega-X"))) {
			
			if((endsWith(document.getElementById('poke1choice').value, "Mega")) || (endsWith(document.getElementById('poke1choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke1choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke4choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke2choice').value, "Mega")) || (endsWith(document.getElementById('poke2choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke2choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke4choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke3choice').value, "Mega")) || (endsWith(document.getElementById('poke3choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke3choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke4choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke5choice').value, "Mega")) || (endsWith(document.getElementById('poke5choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke5choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke4choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke6choice').value, "Mega")) || (endsWith(document.getElementById('poke6choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke6choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock4').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke4choice,validList);
				}
			}
			else break;
		}
	}
	//Fifth Pokemon
	if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
		while((endsWith(document.getElementById('poke5choice').value, "Mega")) || (endsWith(document.getElementById('poke5choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke5choice').value, "Mega-X"))) {
			
			if((endsWith(document.getElementById('poke1choice').value, "Mega")) || (endsWith(document.getElementById('poke1choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke1choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke5choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke2choice').value, "Mega")) || (endsWith(document.getElementById('poke2choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke2choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke5choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke3choice').value, "Mega")) || (endsWith(document.getElementById('poke3choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke3choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke5choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke4choice').value, "Mega")) || (endsWith(document.getElementById('poke4choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke4choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke5choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke6choice').value, "Mega")) || (endsWith(document.getElementById('poke6choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke6choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock5').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke5choice,validList);
				}
			}
			else break;
		}
	}
	//Sixth Pokemon
	if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
		while((endsWith(document.getElementById('poke6choice').value, "Mega")) || (endsWith(document.getElementById('poke6choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke6choice').value, "Mega-X"))) {
			
			if((endsWith(document.getElementById('poke1choice').value, "Mega")) || (endsWith(document.getElementById('poke1choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke1choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke6choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke2choice').value, "Mega")) || (endsWith(document.getElementById('poke2choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke2choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke6choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke3choice').value, "Mega")) || (endsWith(document.getElementById('poke3choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke3choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke6choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke4choice').value, "Mega")) || (endsWith(document.getElementById('poke4choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke4choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
					confirmed = false;
					
					changeSelection(poke6choice,validList);
				}
			}
			else if((endsWith(document.getElementById('poke5choice').value, "Mega")) || (endsWith(document.getElementById('poke5choice').value, "Mega-Y")) || (endsWith(document.getElementById('poke5choice').value, "Mega-X"))) {
				if(endsWith(document.getElementById('padlock6').src,"padlock-unlocked.png")) {
					confirmed = false;
					changeSelection(poke6choice,validList);
				}
			}
			else break;
		}
	}
	//******************************************//
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


function changeSelection(pokechoice,list) {
//YO CHECK NEXT LINE
			//REMOVE ALL BLANK PLACEHOLDERS
			var xchoice = document.getElementById(pokechoice.id);
			for(i = 0; i < xchoice.length; i++) {
				if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
			}
			//////////////////////////////////////
	
	
	var randomnumber = Math.floor(Math.random()*(list.length));
	var newspecies = (BattlePokedex[list[randomnumber]].species);
	
	////////////////////////////////////////////////////////////////////////////
	//ADD DUMMY VALUE TEMPORARILY AND SET ALL POKEMON TO IT
	
	var newOption = document.createElement("option");
	newOption.text = "";
	document.getElementById(pokechoice.id).add(newOption);
	document.getElementById(pokechoice.id).value="";
	
	////////////////////////////////////////////////////////////////////////////
	
	var newspeciesnum = (BattlePokedex[list[randomnumber]].num);
	var confirmed = true;
	
	
	//1st Pokemon dominates (doesn't change)
	if(pokechoice !== 'poke1choice') {
	
		var choice1num='-1'
		var choice2num='-1'
		var choice3num='-1'
		var choice4num='-1'
		var choice5num='-1'
		var choice6num='-1'
		
		var choice1species=''
		var choice2species=''
		var choice3species=''
		var choice4species=''
		var choice5species=''
		var choice6species=''
		
		for(elem in BattlePokedex) {
			if(BattlePokedex[elem].species === document.getElementById('poke1choice').value) {
				choice1num = BattlePokedex[elem].num;
				choice1species = BattlePokedex[elem].species;
			}
			if(BattlePokedex[elem].species === document.getElementById('poke2choice').value) {
				choice2num = BattlePokedex[elem].num;
				choice2species = BattlePokedex[elem].species;
			}
			if(BattlePokedex[elem].species === document.getElementById('poke3choice').value) {
				choice3num = BattlePokedex[elem].num;
				choice3species = BattlePokedex[elem].species;
			}
			if(BattlePokedex[elem].species === document.getElementById('poke4choice').value) {
				choice4num = BattlePokedex[elem].num;
				choice4species = BattlePokedex[elem].species;
			}
			if(BattlePokedex[elem].species === document.getElementById('poke5choice').value) {
				choice5num = BattlePokedex[elem].num;
				choice5species = BattlePokedex[elem].species;
			}
			if(BattlePokedex[elem].species === document.getElementById('poke6choice').value) {
				choice6num = BattlePokedex[elem].num;
				choice6species = BattlePokedex[elem].species;
			}
		}
		

		
		if(newspeciesnum===choice1num) {
			var confirmed = false;
			changeSelection(pokechoice,list);
		}
		if(newspeciesnum===choice2num) {
			var confirmed = false;
			changeSelection(pokechoice,list);
		}
		if(newspeciesnum===choice3num) {
			var confirmed = false;
			changeSelection(pokechoice,list);
		}
		if(newspeciesnum===choice4num) {
			var confirmed = false;
			changeSelection(pokechoice,list);
		}
		if(newspeciesnum===choice5num) {
			var confirmed = false;
			changeSelection(pokechoice,list);
		}
		if(newspeciesnum===choice6num) {
			var confirmed = false;
			changeSelection(pokechoice,list);
		}
		
		
			
	}
	if(confirmed === true) {
	//*****************************************************************
		var alreadyadded = false;
		for(i = 0; i < document.getElementById(pokechoice.id).length; i++) {
			if(document.getElementById(pokechoice.id).options[i].value === newspecies) {
				alreadyadded = true;
			}
		}
		if(alreadyadded === false) {
			var newOption = document.createElement("option");
			newOption.text = newspecies;
			document.getElementById(pokechoice.id).add(newOption);
		}
	//**************************************************************************
	
	

		
		sortSelect(document.getElementById(pokechoice.id));
		document.getElementById(pokechoice.id).value = newspecies;
			
		changePic(pokechoice);
		//REMOVE ALL BLANK PLACEHOLDERS
			var xchoice = document.getElementById(pokechoice.id);
			for(i = 0; i < xchoice.length; i++) {
				if(xchoice[i].value==="") xchoice.remove(xchoice[i]);
			}
		//////////////////////////////////////
	}
}

function sortSelect(selElem) {
        var tmpAry = new Array();
        for (var i=0;i<selElem.options.length;i++) {
            tmpAry[i] = new Array();
            tmpAry[i][0] = selElem.options[i].text;
            tmpAry[i][1] = selElem.options[i].value;
        }
        tmpAry.sort(function(a, b) {
					  var nameA = a[1].toUpperCase(); // ignore upper and lowercase
					  var nameB = b[1].toUpperCase(); // ignore upper and lowercase
					  nameA = nameA.replace('#','');
					  nameB = nameB.replace('#','');
					  nameA = nameA.replace("'",'');
					  nameB = nameB.replace("'",'');
					  if (nameA < nameB) {
						return -1;
					  }
					  if (nameA > nameB) {
						return 1;
					  }

					  // names must be equal
					  return 0;
					});
        while (selElem.options.length > 0) {
            selElem.options[0] = null;
        }
        for (var i=0;i<tmpAry.length;i++) {
            var op = new Option(tmpAry[i][0], tmpAry[i][1]);
            selElem.options[i] = op;
        }
        return;
}

function isWhiteSpace(char) {
    return " \t\n".includes(char);
}

function isPunct(char) {
    return '!"#$ %&\'’()*+,-./:;<=>?@[\\]^_`{|}~'.includes(char);
}

function compress(string) {
    return string
        .split("")
        .filter(char => !isWhiteSpace(char) && !isPunct(char))
        .join("");
}