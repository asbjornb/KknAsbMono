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
    deer : 10
};
player.buildings = {
    bloodhound : 0
};
leveldata.buildings = {
    bloodhoundBaseCost : 10
}

$(document).ready(function(){
    $('#buyBloodhound').click(function(){
        var cost=leveldata.buildings.bloodhoundBaseCost*Math.pow(1.05,player.buildings.bloodhound);
        if(cost<=player.resources.deer){
            player.buildings.bloodhound++;
            player.resources.deer -= cost;
        }
    })

    window.setInterval(function(){
        update();
    },game.baseInterval)
})

function update(){
    console.log('update');
    player.resources.deer += player.buildings.bloodhound;
    $('#deer').text(Math.round(player.resources.deer));
}