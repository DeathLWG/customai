var me = scope.getMyPlayerNumber();
var team = scope.getMyTeamNumber();
var gold = scope.getGold();
const time = Math.round(scope.getCurrentGameTimeInSec());
const myTeam = scope.getMyTeamNumber();
var eteams = [];
var mteams = [];

var supply = scope.getCurrentSupply();
var maxSupply = scope.getMaxSupply();
var supplyDiff = maxSupply - supply;
var mapw = scope.getMapWidth();
var maph = scope.getMapHeight();
var random = Math.floor(Math.random()*(8 - 1+1)+ 1);
var allPlayers = scope.getArrayOfPlayerNumbers();
var randomb = Math.floor(Math.random()*(4 - 1+1)+ 1);
var randomc = Math.floor(Math.random()*(5 - -6+1)+ -6);
var randomu = Math.floor(Math.random()*(2-1+1) + 1);


for(var k = 0; k < allPlayers.length; ++k){
    if(scope.getTeamNumber(allPlayers[k]) === myTeam){
        mteams.push(allPlayers[k]);
    }else{
        eteams.push(allPlayers[k]);
    }
}

var randomstart = Math.floor(Math.random()*(eteams.length - 0+1)+ 0);

var workers = scope.getUnits({type: "Worker", player: me});
var idleWorkers = scope.getUnits({type: "Worker", player: me, order: "Stop"});
var miningWorkers = scope.getUnits({type: "Worker", player: me, order: "Mine"});
var hminingWorkers = [];
var soldiers = scope.getUnits({type: "Soldier", player: me});
var archers = scope.getUnits({type: "Archer", player: me});
var raiders = scope.getUnits({type: "Raider", player: me});
var iraiders = scope.getUnits({type: "Raider", player: me, order: "Stop"});
var rraiders = []; //Retreating/resting Raiders
var mages = scope.getUnits({type: "Mage", player: me});
var priest = scope.getUnits({type: "Priest", player: me});
var wolves = scope.getUnits({type: "Wolf", player: me});
var snakes = scope.getUnits({type: "Snake", player: me});
var wwolves = scope.getUnits({type: "Werewolf", player: me});
var dragons = scope.getUnits({type: "Dragons", player: me});
var birds = scope.getUnits({type: "Bird", player: me});
var gatlingguns = scope.getUnits({type: "Gatling Gun", player: me});
var catapults = scope.getUnits({type: "Catapult", player: me});
var gyrocrafts = scope.getUnits({type: "Gyrocraft", player: me});
var ballistas = scope.getUnits({type: "Ballista", player: me});
var airships = scope.getUnits({type: "Airship", player: me});
var fightingUnits = scope.getUnits({notOfType: "Worker"});
var ifightingUnits = scope.getUnits({notOfType: "Worker", order: "Stop"});
var eworkers = scope.getUnits({type: "Worker", enemyOf: me});
var esoldiers = scope.getUnits({type: "Soldier", enemyOf: me});
var earchers = scope.getUnits({type: "Archer", enemyOf: me});
var emages = scope.getUnits({type: "Mage", enemyOf: me});
var epriest = scope.getUnits({type: "Priest", enemyOf: me});
var ewolves = scope.getUnits({type: "Wolf", enemyOf: me});
var esnakes = scope.getUnits({type: "Snake", enemyOf: me});
var ewwolves = scope.getUnits({type: "Werewolf", enemyOf: me});
var edragons = scope.getUnits({type: "Dragons", enemyOf: me});
var ebirds = scope.getUnits({type: "Bird", enemyOf: me});
var egatlingguns = scope.getUnits({type: "Gatling Gun", enemyOf: me});
var ecatapults = scope.getUnits({type: "Catapult", enemyOf: me});
var egyrocrafts = scope.getUnits({type: "Gyrocraft", enemyOf: me});
var eballistas = scope.getUnits({type: "Ballista", enemyOf: me});
var eairships = scope.getUnits({type: "Airship", enemyOf: me});
var enemyUnits = scope.getUnits({notOfType: "Worker", enemyOf: me});

var Castles = scope.getBuildings({type: "Castle", player: me});
var Forts = scope.getBuildings({type: "Fortress", player: me});
var Houses = scope.getBuildings({type: "House", player: me});
var uHouses = scope.getBuildings({type: "House", player: me, onlyFinished: false});
var Towers = scope.getBuildings({type: "Watchtower", player: me});
var Rax = scope.getBuildings({type: "Barracks", player: me});
var Dens = scope.getBuildings({type: "Wolves Den", player: me});
var Workshops = scope.getBuildings({type: "Workshop", player: me});
var advWorkshops = scope.getBuildings({type: "Advanced Workshop", player: me});
var Church = scope.getBuildings({type: "Church", player: me});
var Forges = scope.getBuildings({type: "Forge", player: me});
var Labs = scope.getBuildings({type: "Animal Testing Lab", player: me});
var Mines = scope.getBuildings({type: "Goldmine"});
var usingMine = [];
var ProdBuildings = Rax.concat(Workshops.concat(advWorkshops.concat(Church.concat(Dens))));
var Builds = scope.getBuildings({player: me});
var humans = soldiers.concat(archers.concat(priest.concat(raiders.concat(mages))));
var beasts = wolves.concat(snakes.concat(dragons.concat(wwolves)));
var fightingForce = humans.length * 2 + beasts.length * 1;

var nearestMine = null;
var neasrestDist = 99999;
for(var k = 0; k < idleWorkers.length; k++){
    for(var i = 0; i < Mines.length; i++){
        var Mine = Mines[i];
        if(Mine.getValue('gold') > 0){
            var dist = Math.pow(Mine.getX() - idleWorkers[k].getX(), 2) + Math.pow(Mine.getY() - idleWorkers[k].getY(), 2);
            if(dist < neasrestDist){
                nearestMine = Mine;
                usingMine.push(nearestMine);
                neasrestDist = dist;
            }
        }
    }    
}
if(Castles.length > 0){
    scope.order("Mine", idleWorkers, {unit: nearestMine});
    var nearestunMined = null;
    var neasrestunDist = 99999;
    for(var i = 0; i < Mines.length; i++){
    var Mine = Mines[i];
    if(Mine.getValue('gold') > 5980){
            var dist = Math.pow(Mine.getX() - Castles[0].getX(), 2) + Math.pow(Mine.getY() - Castles[0].getY(), 2);
            if(dist < neasrestunDist){
                nearestunMined = Mine;
                neasrestunDist = dist;
            }
        }
    }
}
//4x4


if(time === 1){
    scope.chatMsg("I am Death AI");
    scope.meta = Math.floor(Math.random()*(3 - 1+1) + 1);
}
for(var l = 0; l < Castles.length; l++){
    if(!Castles[l].getUnitTypeNameInProductionQueAt(1)){
        if(workers.length <= 9 * Castles.length){
            scope.order("Train Worker", [Castles[l]]);
        }
    }
    var nearestcMine = null;
    var neasrestDist = 99999;
    for(var i = 0; i < Mines.length; i++){
        var Mine = Mines[i];
        var dist = Math.pow(Mine.getX() - Castles[l].getX(), 2) + Math.pow(Mine.getY() - Castles[l].getY(), 2);
        if(dist < neasrestDist){
            nearestcMine = Mine;
            neasrestDist = dist;
        }    
    }
    scope.order("Moveto", [Castles[l]], {unit:nearestcMine});
    var buildlocation3x3x = Castles[l].getX() - Math.floor(Math.random()*(8 - -8+1)+ -8);
    var buildlocation3x3y = Castles[l].getY() - Math.floor(Math.random()*(8 - -8+1)+ -8);
    var buildlocation3x3xx = Castles[l].getX() - Math.floor(Math.random()*(8 - -8+1)+ -8);
    var buildlocation3x3yy = Castles[l].getY() - Math.floor(Math.random()*(8 - -8+1)+ -8);
    var buildlocation2x2x = Castles[l].getX() - Math.floor(Math.random()*(8 - -8+1)+ -8);
    var buildlocation2x2y = Castles[l].getY() - Math.floor(Math.random()*(8 - -8+1)+ -8);
    var buildlocation4x4x = Castles[l].getX() - Math.floor(Math.random()*(14 - -14+1)+ -14);
    var buildlocation4x4y = Castles[l].getY() - Math.floor(Math.random()*(14 - -14+1)+ -14);
    var spotfound4 = 0;
    var spotfound3 = 0;
    var spotfound33 = 0;
    var spotfound2 = 0;

    if(spotfound4 === 0){
        for(let x=0; x<=4; ++x){
            for(let y=0; y<=4; ++y){
                if(scope.positionIsPathable(buildlocation4x4x + x, buildlocation4x4y + y)){
                    var spotfound4 = 1;
                }
            }
        }
    }
    if(spotfound3 === 0){
        for(let x=0; x<=3; ++x){
            for(let y=0; y<=3; ++y){
                if(scope.positionIsPathable(buildlocation3x3x + x, buildlocation3x3y + y)){
                    var spotfound3 = 1;
                }
            }
        }
    }
    if(spotfound33 === 0){
        for(let x=0; x<=3; ++x){
            for(let y=0; y<=3; ++y){
                if(scope.positionIsPathable(buildlocation3x3xx + x, buildlocation3x3yy + y)){
                    var spotfound33 = 1;
                }
            }
        }
    }
    if(scope.meta === 1){
        if(supplyDiff <= 3){
            if(Houses.length*2 < Castles.length*2 || Castles.length >= 3){
                if(spotfound3 === 1){
                    scope.order("Build House", miningWorkers, {x: buildlocation3x3x, y: buildlocation3x3y});
                }else if(spotfound33 === 1){
                    scope.order("Build House", miningWorkers, {x: buildlocation3x3xx, y: buildlocation3x3yy});
                }
            }
        }
        if(gold > 350){
            if(Castles.length < 3){
                if(randomb === 1){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() - 9 + x, nearestunMined.getY() + randomc + y)){
                                if(scope.positionIsPathable(nearestunMined.getX() - 9 + x, nearestunMined.getY() + randomc + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() - 9, y: nearestunMined.getY() + randomc});
                                }
                            }
                        }
                    }
                }else if(randomb === 2){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + 8+x, nearestunMined.getY() + randomc+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + 8 + x, nearestunMined.getY() + randomc + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + 8, y: nearestunMined.getY() + randomc});
                                }
                            }
                        }
                    }
                }else if(randomb === 3){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + randomc+x, nearestunMined.getY() + 8+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + randomc + x, nearestunMined.getY() + 8 + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + randomc, y: nearestunMined.getY() + 8});
                                }
                            }
                        }
                    }
                }else if(randomb === 4){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + randomc+x, nearestunMined.getY() - 10+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + randomc + x, nearestunMined.getY() - 10 + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + randomc, y: nearestunMined.getY() - 10});
                                }
                            }
                        }
                    }
                }
            }else if(Castles.length > 2){
                if(Forges.length <= 1){
                    if(spotfound4 === 1){
                        scope.order("Build Forge", miningWorkers, {x: buildlocation4x4x, y: buildlocation4x4y});
                    }
                }
            }
        }
        if(Houses.length > 0){
            if(Rax.length < Castles.length*2 && Rax.length < 4){
                if(spotfound3 === 1){
                    scope.order("Build Barracks", miningWorkers, {x: buildlocation3x3x, y: buildlocation3x3y});
                }else if(spotfound33 === 1){
                    scope.order("Build Barracks", miningWorkers, {x: buildlocation3x3xx, y: buildlocation3x3yy});
                } 
            }
        }
        
        for(var r = 0; r < Rax.length; r++){
            if(supplyDiff > 0){
                if(!Rax[r].getUnitTypeNameInProductionQueAt(1)){
                    if(edragons.length + egyrocrafts.length < 1){
                        if(randomu === 1){
                            scope.order("Train Soldier", [Rax[r]]);
                        }else if(randomu === 2){
                            scope.order("Train Archer", [Rax[r]]);
                        }
                    }else if(edragons.length + egyrocrafts.length > 0){
                        scope.order("Train Archer", [Rax[r]]);
                    }
                }
            }else if(supplyDiff === 0){
                scope.order("Cancel", Rax[r]);
            }
        }   
    }else if(scope.meta === 2){
        if(supplyDiff <= 3){
            if(Houses.length*2 < Castles.length*2 || Castles.length >= 3){
                if(spotfound3 === 1){
                    scope.order("Build House", miningWorkers, {x: buildlocation3x3x, y: buildlocation3x3y});
                }else if(spotfound33 === 1){
                    scope.order("Build House", miningWorkers, {x: buildlocation3x3xx, y: buildlocation3x3yy});
                }
            }
        }
        if(gold > 350){
            if(Castles.length < 3){
                if(randomb === 1){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() - 9 + x, nearestunMined.getY() + randomc + y)){
                                if(scope.positionIsPathable(nearestunMined.getX() - 9 + x, nearestunMined.getY() + randomc + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() - 9, y: nearestunMined.getY() + randomc});
                                }
                            }
                        }
                    }
                }else if(randomb === 2){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + 8+x, nearestunMined.getY() + randomc+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + 8 + x, nearestunMined.getY() + randomc + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + 8, y: nearestunMined.getY() + randomc});
                                }
                            }
                        }
                    }
                }else if(randomb === 3){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + randomc+x, nearestunMined.getY() + 8+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + randomc + x, nearestunMined.getY() + 8 + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + randomc, y: nearestunMined.getY() + 8});
                                }
                            }
                        }
                    }
                }else if(randomb === 4){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + randomc+x, nearestunMined.getY() - 10+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + randomc + x, nearestunMined.getY() - 10 + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + randomc, y: nearestunMined.getY() - 10});
                                }
                            }
                        }
                    }
                }
            }else if(Castles.length > 2){
                if(Labs.length <= 1){
                    if(spotfound4 === 1){
                        scope.order("Build Animal Testing Lab", miningWorkers, {x: buildlocation4x4x, y: buildlocation4x4y});
                    }
                }
            }
        }
        if(Houses.length > 0){
            if(Dens.length < Castles.length*2 && Dens.length < 4){
                if(spotfound3 === 1){
                    scope.order("Build Wolves Den", miningWorkers, {x: buildlocation3x3x, y: buildlocation3x3y});
                }else if(spotfound33 === 1){
                    scope.order("Build Wolves Den", miningWorkers, {x: buildlocation3x3xx, y: buildlocation3x3yy});
                } 
            }
        }
        
        for(var r = 0; r < Dens.length; r++){
            if(supplyDiff > 0){
                if(!Dens[r].getUnitTypeNameInProductionQueAt(1)){
                        scope.order("Train Wolf", [Dens[r]]);
                    }
                }else if(supplyDiff === 0){
                scope.order("Cancel", Dens[r]);
            }
        }
    }else if(scope.meta === 3){
        if(supplyDiff <= 3){
            if(Houses.length*2 < Castles.length*2 || Castles.length >= 3){
                if(spotfound3 === 1){
                    scope.order("Build House", miningWorkers, {x: buildlocation3x3x, y: buildlocation3x3y});
                }else if(spotfound33 === 1){
                    scope.order("Build House", miningWorkers, {x: buildlocation3x3xx, y: buildlocation3x3yy});
                }
            }
        }
        if(gold > 350){
            if(Castles.length < 3){
                if(randomb === 1){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() - 9 + x, nearestunMined.getY() + randomc + y)){
                                if(scope.positionIsPathable(nearestunMined.getX() - 9 + x, nearestunMined.getY() + randomc + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() - 9, y: nearestunMined.getY() + randomc});
                                }
                            }
                        }
                    }
                }else if(randomb === 2){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + 8+x, nearestunMined.getY() + randomc+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + 8 + x, nearestunMined.getY() + randomc + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + 8, y: nearestunMined.getY() + randomc});
                                }
                            }
                        }
                    }
                }else if(randomb === 3){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + randomc+x, nearestunMined.getY() + 8+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + randomc + x, nearestunMined.getY() + 8 + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + randomc, y: nearestunMined.getY() + 8});
                                }
                            }
                        }
                    }
                }else if(randomb === 4){
                    for(let x=-4; x<=4; ++x){
                        for(let y=-4; y<=4; ++y){
                            if(scope.getHeightLevel(nearestunMined.getX(), nearestunMined.getY()) === scope.getHeightLevel(nearestunMined.getX() + randomc+x, nearestunMined.getY() - 10+y)){
                                if(scope.positionIsPathable(nearestunMined.getX() + randomc + x, nearestunMined.getY() - 10 + y)){
                                    scope.order("Build Castle", miningWorkers, {x: nearestunMined.getX() + randomc, y: nearestunMined.getY() - 10});
                                }
                            }
                        }
                    }
                }
            }else if(Castles.length > 2){
                if(Forges.length <= 1){
                    if(spotfound4 === 1){
                        scope.order("Build Forge", miningWorkers, {x: buildlocation4x4x, y: buildlocation4x4y});
                    }
                }
            }
        }
        if(Houses.length > 0){
            if(Workshops.length < Castles.length){
                if(spotfound4 === 1){
                    scope.order("Build Workshop", miningWorkers, {x: buildlocation4x4x, y: buildlocation4x4y});
                }
            }else if(Workshops.length >= Castles.length){
                if(Rax.length < Castles.length){
                    if(spotfound3 === 1){
                        scope.order("Build Barracks", miningWorkers, {x: buildlocation3x3x, y: buildlocation3x3y});
                    }else if(spotfound33 === 1){
                        scope.order("Build Barracks", miningWorkers, {x: buildlocation3x3xx, y: buildlocation3x3yy});
                    }
                }
            }
        }
        for(var r = 0; r < Workshops.length; r++){
            if(supplyDiff > 0){
                if(!Workshops[r].getUnitTypeNameInProductionQueAt(1)){
                    if(time <= 240){
                        scope.order("Construct Gatling Gun", [Workshops[r]]);
                    }else if(time > 240){
                        if(gatlingguns.length >= 2){
                            if(!Workshops[r].getUnitTypeNameInProductionQueAt(1)){
                                scope.order("Construct Catapult", [Workshops[r]]);
                            }
                        }else if(gatlingguns.length < 2){
                            scope.order("Construct Gatling Gun", [Workshops[r]]);
                        }
                    }
                }
            }else if(supplyDiff === 0){
                scope.order("Cancel", Workshops[r]);
            }
        }
        for(var r = 0; r < Rax.length; r++){
            if(supplyDiff > 0){
                if(!Rax[r].getUnitTypeNameInProductionQueAt(1)){
                    if(randomu === 1){
                        scope.order("Train Soldier", [Rax[r]]);
                    }else if(randomu === 2){
                        scope.order("Train Archer", [Rax[r]]);
                    }
                }
            }else if(supplyDiff === 0){
                scope.order("Cancel", Rax[r]);
            }
        }
        if(edragons.length+ egyrocrafts.length > 0){
            scope.order("Build Advanced Workshop", miningWorkers, {x: buildlocation4x4x, y: buildlocation4x4y});
        }
        for(var r = 0; r < advWorkshops.length; r++){
            if(supplyDiff > 0){
                if(!advWorkshops[r].getUnitTypeNameInProductionQueAt(1)){
                    scope.order("Constuct Ballista", [advWorkshops[r]]);
                }
            }else if(supplyDiff === 0){
                scope.order("Cancel", advWorkshops[r]);
            }
        }   
    }
    
}
if(enemyUnits.length > 0){
    if(fightingUnits.length > enemyUnits.length){
        scope.order("AMove", ifightingUnits, scope.getCenterOfUnits(enemyUnits));
    }else if(fightingUnits.length <= enemyUnits.length*1.5){
        scope.order("Stop", ifightingUnits);
    }
}else if(enemyUnits.length < 1){
    if(fightingUnits.length > ProdBuildings.length* 3){
        scope.order("AMove", ifightingUnits, scope.getStartLocationForPlayerNumber(randomstart + randomc));
    }
}

for(var r = 0; r < Forges.length; r++){
    if(scope.meta === 1){
        if(supplyDiff > 0){
            if(!Forges[r].getUnitTypeNameInProductionQueAt(1)){
               if(randomu === 1){
                    scope.order("Attack Upgrade", [Forges[r]]);
                }else if(randomu === 2){
                    scope.order("Armor Upgrade", [Forges[r]]);
                } 
            }
        }
    }else if(scope.meta === 3){
        if(supplyDiff > 0){
            if(!Forges[r].getUnitTypeNameInProductionQueAt(1)){
               if(randomu === 1){
                    scope.order("Mech Armor Upgrade", [Forges[r]]);
                }else if(randomu === 2){
                    scope.order("Mech Damage Upgrade", [Forges[r]]);
                } 
            }
        }
    }
}

for(var r = 0; r < Labs.length; r++){
    if(supplyDiff > 0){
        if(!Labs[r].getUnitTypeNameInProductionQueAt(1)){
           if(randomu === 1){
                scope.order("Beast Attack Upgrade", [Labs[r]]);
            }else if(randomu === 2){
                scope.order("Beast Defense Upgrade", [Labs[r]]);
            } 
        }
    }
}
    
    