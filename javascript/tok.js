document.addEventListener("DOMContentLoaded",function(){
    var html = []
    var hero, secondary;
    heroes.sort(function(a, b) {
        var c = a[4] == "" ? "z" : "a"; 
        var d = b[4] == "" ? "z" : "a"; 
        console.log(""+c+a[1]+a[2]+a[0] > ""+d+b[1]+b[2]+b[0])
        return ""+c+a[1]+a[2]+a[0] > ""+d+b[1]+b[2]+b[0];
    });
    var count = 0
    for (index in heroes) { 
        hero = heroes[index]
        if (hero[4].length > 0){
            count++;
        } 
        html += '<tr class="hero">'
        html += '<td><div class="heroNameContainer"><p class="heroName nomargin text-capitalize">'+hero[0]+'</p>'
        html += '<p class="heroClass nomargin text-secondary text-capitalize">'+hero[2]+'</p></div>'
        html += '<p class="heroClass nomargin text-dark text-capitalize text-bold">'+hero[1]+'</p></div></td>'
        html += '<td><img src="../img/tok/heroes/'+hero[0]+'_l.bmp"/></td>'
        html += '<td><img src="../img/tok/specialty/'+hero[0]+'_sl.bmp"/></td>'
        html += '<td class="text-nowrap">'
        for (index in hero[3]) {
            html += '<img src="../img/tok/secondary/'+hero[3][index][0]+'-'+hero[3][index][1]+'.bmp"/>'
        }
        html += '<td><small>'+hero[4]+'</small></td>'
        html += '</td>'
        html += '</tr>'
    }
    $("#heroes-data").html(html)
    $("#heroesCount").html(count+" ready from "+heroes.length)
})
var heroes = [
    ["agatha","castle","cleric",[["wisdom","basic"],["firstaid","basic"]],"It was a shock to the noble military family when Agatha decided to give up all their legacy and join the serenity of religion. But the essence of the battle still remains for sure."],
    ["richard","castle","knight",[["states","basic"],["luck","basic"]],"The acrobat prince. This is how Richard was known in his youth. Stunts that were nothing more than a mix of arrogance and luck."],
    ["elena","castle","knight",[["leadership","basic"],["pathfinding","basic"]],"Elena was the king's youngest daughter. When he decided to divide the land among future sons-in-law, Elena rebelled and fled. She gathered an army and claimed the land of her kingdom after her father's death."],
    ["moira","castle","cleric",[["scholar","advanced"]],""],
    ["martin","castle","knight",[["leadership","basic"],["armorer","basic"]],""],
    ["brigitte","castle","knight",[["armorer","advanced"]],"Brigitte joined the army command contrary to all expectations. Though initially mocked by her soldiers she was taken seriously when spared the lives of hundreds of men with her firm fist during a siege."],
    ["eordan","dungeon","warlock",[["armorer","basic"],["earthmagic","basic"]],""],
    ["hana","conflux","elementalist",[["wisdom","basic"],["watermagic","basic"]],""],
    ["ferri","conflux","elementalist",[["wisdom","basic"],["firemagic","basic"]],""],
    ["liana","conflux","planeswalker",[["scouting","basic"],["luck","basic"]],""],
    ["pandora","conflux","planeswalker",[["firemagic","basic"],["firstaid","basic"]],""],
    ["edward","cove","captain",[["navigation","basic"],["tactics","basic"]],""],
    ["marian","cove","captain",[["navigation","basic"],["diplomacy","basic"]],""],
    ["morales","cove","captain",[["navigation","basic"],["artillery","basic"]],""],
    ["roberts","cove","captain",[["navigation","basic"],["ballistics","basic"]],""],
    ["bart","cove","navigator",[["scholar","basic"],["learning","basic"]],""],
    ["caesar","cove","navigator",[["wisdom","basic"],["scouting","basic"]],""],
    ["yaxi","cove","navigator",[["wisdom","basic"],["offence","basic"]],""],
    ["hycis","dungeon","overlord",[["states","basic"],["firemagic","basic"]],""],
    ["nodens","dungeon","warlock",[["wisdom","basic"],["learning","basic"]],""],
    ["marcus","dungeon","warlock",[["wisdom","basic"],["resistance","basic"]],""],
    ["baltasar","fortress","beastmaster",[["logistics","basic"],["artillery","basic"]],""],
    ["goes","fortress","beastmaster",[["navigation","basic"],["pathfinding","basic"]],""],
    ["lydia","fortress","witch",[["wisdom","basic"],["mysticism","basic"]],""],
    ["nova","fortress","witch",[["wisdom","basic"],["watermagic","basic"]],""],
    ["lucius","inferno","demoniac",[["leadership","basic"],["logistics","basic"]],"Lucius is third in command of the troops from hell. Very few hold such power, since the longevity of the position is only guaranteed by the cruelty and malice of the occupant."],
    ["etia","inferno","demoniac",[["resistance","basic"],["firemagic","basic"]],""],
    ["lilith","inferno","herectic",[["wisdom","basic"],["firemagic","basic"]],""],
    ["leon","necropolis","deathknight",[["necromancy","basic"],["armorer","basic"]],""],
    ["stanley","necropolis","deathknight",[["necromancy","basic"],["archery","basic"]],""],
    ["francis","necropolis","deathknight",[["necromancy","basic"],["tactics","basic"]],""],
    ["ravi","necropolis","necromancer",[["necromancy","basic"],["scholar","basic"]],""],
    ["hernandez","neutral","bard",[["scholar","basic"],["diplomacy","basic"]],""],
    ["luna","neutral","bard",[["scholar","basic"],["firstaid","basic"]],""],
    ["foglio","neutral","bard",[["luck","expert"]],""],
    ["remer","neutral","bard",[["pathfinding","basic"],["scouting","basic"]],""],
    ["samuel","neutral","bard",[["learning","basic"],["intelligence","basic"]],""],
    ["joan","neutral","fighter",[["tactics","basic"],["resistance","basic"]],""],
    ["kenshin","neutral","fighter",[["tactics","basic"],["learning","basic"]],""],
    ["laurens","neutral","merchant",[["logistics","basic"],["states","basic"]],""],
    ["renaud","neutral","merchant",[["logistics","basic"],["diplomacy","basic"]],""],
    ["giacomo","neutral","merchant",[["logistics","basic"],["intelligence","basic"]],""],
    ["brinn","rampart","druid",[["pathfinding","basic"],["diplomacy","basic"]],""],
    ["krystin","rampart","druid",[["wisdom","basic"],["airmagic","basic"]],""],
    ["suzzane","rampart","druid",[["wisdom","basic"],["pathfinding","basic"]],""],
    ["damys","rampart","ranger",[["archery","basic"],["tactics","basic"]],""],
    ["elrin","rampart","ranger",[["archery","basic"],["scholar","basic"]],""],
    ["mogh","ruins","hermit",[["earthmagic","expert"],["intelligence","basic"]],""],
    ["horae","ruins","hermit",[["earthmagic","basic"],["ballistics","basic"]],""],
    ["mabon","ruins","hermit",[["wisdom","basic"],["luck","basic"]],""],
    ["huldra","ruins","hermit",[["mysticism","basic"],["sorcery","basic"]],""],
    ["balor","ruins","warden",[["pathfinding","advanced"]],""],
    ["tuuk","stronghold","barbarian",[["luck","basic"],["pathfinding","basic"]],""],
    ["dana","stronghold","barbarian",[["logistics","basic"],["armorer","basic"]],""],
    ["diana","stronghold","barbarian",[["leadership","basic"],["archery","basic"]],""],
    ["bomoh","stronghold","battlemage",[["wisdom","basic"],["armorer","basic"]],""],
    ["rurik","tower","alchemist",[["states","basic"],["armorer","basic"]],""],
    ["viktorya","tower","alchemist",[["offence","basic"],["scouting","basic"]],""],
    ["henrik","tower","alchemist",[["ballistics","basic"],["artillery","basic"]],""],
    ["keus","tower","alchemist",[["armorer","expert"]],""],
    ["melchert","necropolis","necromancer",[["necromancy","basic"],["wisdom","basic"]],""],
    ["barkan","tower","wizard",[["wisdom","basic"],["pathfinding","basic"]],""],
    ["rory","tower","wizard",[["artillery","basic"],["firemagic","basic"]],""],
    ["prospero","conflux","planeswalker",[["resistance","basic"],["airmagic","basic"]],""],
    ["angeli","tower","wizard",[["wisdom","basic"],["airmagic","basic"]],""],
    ["duqk","cove","navigator",[["navigation","basic"],["luck","basic"]],""],
    ["iron","tower","alchemist",[["armorer","basic"],["resistance","basic"]],""],
    ["kuna","stronghold","barbarian",[["scouting","basic"],["pathfinding","basic"]],""],
    ["lania","inferno","herectic",[["wisdom","basic"],["firstaid","basic"]],""],
    ["mira","ruins","wizard",[["firstaid","advanced"]],""],
    ["philip","castle","knight",[["leadership","basic"],["navigation","basic"]],""],
    ["tris","rampart","rangers",[["archery","basic"],["scouting","basic"]],""],
    ["zu","inferno","demoniac",[["offence","advanced"]],""],
    ["medea","dungeon","warlock",[["wisdom","basic"],["eagleeye","advanced"]],""],
]