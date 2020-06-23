var game = {};
var player = {};
var leveldata = {};
//todo + move long static data to separate referenced file
// leveldata = [
//     {
//       name: "hamlet",
//       currency: "deer",
//       research: "venison",
//       buildings: [ 
//         {
//           name: 'Bloodhound',
//           income: 1,
//           cost: 10
//         }, {
//           name: 'Spearman',
//           income: 2,
//           cost: 50
//         }, {
//           name: 'Archer',
//           income: 5,
//           cost: 200
//         }, {
//           name: 'Tracker',
//           income: 10,
//           cost: 1000
//         }, {
//           name: 'Woodsman',
//           income: 20,
//           cost: 10000
//         }, {
//           name: 'Pathfinder',
//           income: 50,
//           cost: 20000
//         }, {
//           name: 'Scout',
//           income: 100,
//           cost: 50000
//         }, {
//           name: 'Trapper',
//           income: 200,
//           cost: 100000
//         }, {
//           name: 'Wellspring',
//           income: 500,
//           cost: 200000
//         }, {
//           name: 'River',
//           income: 1000,
//           cost: 1000000
//         }
//       ]
//     }
// ];

//todo load save on open
game.baseInterval = 1000; //1000 miliseconds between updates initially?

player.level = "hamlet"; //Starting at hamlet. This and the following should be generalized using level data
player.resources = {
    deer : 10,
	income : 0
};
player.buildings = [0, 0];
leveldata.buildings = {
    baseCost : [10, 50],
	income : [1, 2]
}

$(document).ready(function(){
    updateVisuals()
    $('#buyT1').click(function(){
        var cost=leveldata.buildings.baseCost[0]*Math.pow(1.05,player.buildings[0]);
		if(cost<=player.resources.deer){
//			$('#debug').text('Yeah');
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

    window.setInterval(function(){
        update();
    },game.baseInterval)
})

function update(){
    console.log('update');
	for (i=0; i< leveldata.buildings.income.length; i++) {
		player.resources.deer += player.buildings[i] * leveldata.buildings.income[i];
	}
    updateVisuals();
}

function updateVisuals(){
    $('#deer').text(Math.round(player.resources.deer));
	$('#income').text(player.resources.income);
    $('#t1').text(Math.round(player.buildings[0]));
	$('#t2').text(Math.round(player.buildings[1]));
    $('#priceT1').text(Math.round(leveldata.buildings.baseCost[0]*Math.pow(1.05,player.buildings[0])));
	$('#priceT2').text(Math.round(leveldata.buildings.baseCost[1]*Math.pow(1.05,player.buildings[1])));
}