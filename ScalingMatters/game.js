var game = {};
var player = {};
var leveldata = {};

//todo load save on open
game.baseInterval = 1000; //1000 miliseconds between updates initially?
leveldata.buildings = {
    baseCost : [10, 50],
    income : [1, 2]
}

$(document).ready(function(){
    initializePlayer();
    $('#incomeT1').text(leveldata.buildings.income[0]);
    $('#incomeT2').text(leveldata.buildings.income[1]);
    load();
    $('#buyT1').click(function(){
        var cost=leveldata.buildings.baseCost[0]*Math.pow(1.05,player.buildings[0]);
		if(cost<=player.resources.deer){
            //$('#debug').text('Yeah');
            player.buildings[0]++;
            player.resources.deer -= cost;
			player.resources.income += 1;
            updateVisuals(); //Should this call this function or just manually set the 3 deer visuals since we know they are affected?
        }
    })
    $('#buyT2').click(function(){
        var cost=leveldata.buildings.baseCost[1]*Math.pow(1.05,player.buildings[1]);
        if(cost<=player.resources.deer){
            player.buildings[1]++;
            player.resources.deer -= cost;
			player.resources.income += 2;
            updateVisuals(); //Should this call this function or just manually set the 3 deer visuals since we know they are affected?
        }
    })
    $('#save').click(function(){
        save()
        $('#debug').text('Saved');
    })
    $('#load').click(function(){
        load()
        $('#debug').text('Loaded');
    })
    $('#erase').click(function(){
        erase()
        $('#debug').text('Erased');
    })
    $('#prestige').click(function(){
        prestige()
        //$('#debug').text('Prestiged');
    })

    window.setInterval(function(){
        update();
    },game.baseInterval)
})

function update(){
    console.log('update');
	for (i=0; i< leveldata.buildings.income.length; i++) {
		player.resources.deer += player.buildings[i] * leveldata.buildings.income[i] * player.prestigeMultiplier;
	}
    updateVisuals();
}

function updateVisuals(){
    if (player.prestigeMultiplier>1) {
        document.getElementById("prestigeMult").style.display = "inline-block"
    } else {
        document.getElementById("prestigeMult").style.display = "none"
    }
    $('#deer').text(Math.round(player.resources.deer));
    $('#income').text(player.resources.income);
    $('#prestigeMult').text(", Prestige: " + player.prestigeMultiplier);
    $('#t1').text(Math.round(player.buildings[0]));
	$('#t2').text(Math.round(player.buildings[1]));
    $('#priceT1').text(Math.round(leveldata.buildings.baseCost[0]*Math.pow(1.05,player.buildings[0])));
	$('#priceT2').text(Math.round(leveldata.buildings.baseCost[1]*Math.pow(1.05,player.buildings[1])));
}

function save(){
    player.time = Date.now();
    localStorage.setItem('gameSave', JSON.stringify(player));
}

function load(){
    gameSave = JSON.parse(localStorage.getItem('gameSave'));
    if (gameSave !== null) {
        player = gameSave;
    }
    //add fast forward by referencing player.time
    updateVisuals();
}

function erase(){
    initializePlayer();
}

function initializePlayer(){
    player.level = "hamlet"; //Starting at hamlet. This and the following should be generalized using level data
    player.resources = {
        deer : 10,
	    income : 0
    };
    player.buildings = [0, 0];
    player.prestigeMultiplier = 1;
    player.time=Date.now();
}

function prestige(){
    //just to have something for now.
    multiplier = Math.log10(player.resources.deer);
    $('#debug').text("Prestiged for" + multiplier);
    initializePlayer();
    player.prestigeMultiplier = multiplier;
    updateVisuals();
}