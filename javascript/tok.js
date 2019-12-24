document.addEventListener("DOMContentLoaded",function(){
    var html = []
    var hero, secondary;
    var prcHero = [];
    heroes.sort(function(a, b) {
        var c = a[4] == "" ? "z" : "a"; 
        var d = b[4] == "" ? "z" : "a"; 
        console.log(""+c+a[1]+a[2]+a[0] > ""+d+b[1]+b[2]+b[0])
        return ""+c+a[1]+a[2]+a[0] > ""+d+b[1]+b[2]+b[0];
    });
    var count = 0
    for (index in heroes) { 
        hero = heroes[index]
        if (!prcHero[hero[1]]) {
            prcHero[hero[1]] = 1; 
        } else {
            prcHero[hero[1]]++;
        }
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
        html += '<td class="nodisplay-xs"><small>'+hero[4]+'</small></td>'
        html += '</td>'
        html += '</tr>'
    }
    $("#heroes-data").html(html)
    $("#heroesCount").html(count+" ready from "+heroes.length)
    html = ''
    var prc
    for (index in prcHero) {
        prc = prcHero[index] / 15 * 100
        html += '<label class="polllabel">'+index+' ['+prcHero[index]+']</label>',
        html += '<div class="poll">',
        html += '<div class="pollResult" style="width:'+prc+'%"></div> ',
        html += '</div>'
    }
    $("#heroes-poll").html(html)
    var creature;
    html = ''
    for (index in creatures) { 
        creature = creatures[index]
        html += '<div class="creature col-lg-4">'
        html += '<p class="nomargin text-capitalize"><b>'+creature[0]+'</b></p>'
        html += '<p class="text-secondary">lvl '+creature[1]+'</p>'
        html += '<p class="text-dark">'+creature[2]+'</p>'
        html += '<div class="margin-top margin-bottom"><img src="../img/tok/creatures/'+creature[3]+'" alt="'+creature[0]+'" class="display-block"></div>'
        html += '</div>'
    }
    $("#creatures-data").html(html)
    $("#creaturesCount").html("2 working from "+creatures.length)
    $('[data-toggle="tooltip"]').tooltip(); 
})
var creatures = [
    ["wendigo",5,"neutral","wendigo.gif"],
    ["firbolg",4,"neutral","firbolg.gif"],
    ["noble firbolg",4,"neutral","firbolgup.jpg"],
    ["plague doctor",3,"neutral","plague.jpg"],
    ["kobold",1,"neutral","kobold.jpg"],
    ["sybil",5,"neutral","witch.jpg"],
    ["seer",5,"neutral","witchup.jpg"],
    ["bear",2,"neutral","bear.jpg"],
    ["dire bear",2,"neutral","bearup.jpg"],
    ["gnome",1,"neutral","gnome.jpg"],
    ["peryton",3,"neutral","peryton.jpg"],
    ["grand peryton",3,"neutral","grandperyton.jpg"],
    ["executioner",2,"neutral","executioner.jpg"]
]
var heroes = [
    ["agatha","castle","cleric",[["wisdom","basic"],["firstaid","basic"]],"It was a shock to the noble military family when Agatha decided to give up all their legacy and join the serenity of religion. But the essence of the battle still remains for sure."],
    ["richard","castle","knight",[["states","basic"],["luck","basic"]],"The acrobat prince. This is how Richard was known in his youth. Stunts that were nothing more than a mix of arrogance and luck."],
    ["elena","castle","knight",[["leadership","basic"],["pathfinding","basic"]],"Elena was the king's youngest daughter. When he decided to divide the land among future sons-in-law, Elena rebelled and fled. She gathered an army and claimed the land of her kingdom after her father's death."],
    ["moira","castle","cleric",[["scholar","advanced"]],""],
    ["martin","castle","knight",[["leadership","basic"],["armorer","basic"]],""],
    ["brigitte","castle","knight",[["armorer","advanced"]],"Brigitte joined the army command contrary to all expectations. Though initially mocked by her soldiers she was taken seriously when spared the lives of hundreds of men with her firm fist during a siege."],
    ["eordan","dungeon","warlock",[["armorer","basic"],["earthmagic","basic"]],"Although a renowned knight in his youth, Eordan has found in the dark knowledge of the elements the strength he needs in his men."],
    ["hana","conflux","elementalist",[["wisdom","basic"],["watermagic","basic"]],"Born in an abandoned mill on the banks of a stream. Hana shaped her principles based on the purity and flow of the current."],
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
    ["suzzane","rampart","druid",[["wisdom","basic"],["pathfinding","basic"]],"Magic is not the most popular subject among centaurs. Even fewer are the young people with aptitude for the thing. Suzzane is a young centaur who frightens many leaders with her tricks and knowledge."],
    ["damys","rampart","ranger",[["archery","basic"],["tactics","basic"]],""],
    ["elrin","rampart","ranger",[["archery","basic"],["scholar","basic"]],""],
    ["mogh","ruins","hermit",[["earthmagic","expert"],["intelligence","basic"]],""],
    ["horae","ruins","hermit",[["earthmagic","basic"],["ballistics","basic"]],"Horae is a fanatic druid who does not believe in unnatural buildings. If we come from the land, there is no reason to create barriers between us."],
    ["mabon","ruins","hermit",[["wisdom","basic"],["luck","basic"]],"A gardener proud of his seedlings, the spreading of a decelerated life and peaceful coexistence. Probably influenced by his supernatural luck that guarantees surprises in his days and blossoming of his plants"],
    ["huldra","ruins","hermit",[["mysticism","basic"],["sorcery","basic"]],"A nature spirit of great beauty, who hypnotizes men and seduces them into the depths of the forest."],
    ["balor","ruins","warden",[["pathfinding","advanced"]],"A giant lumberjack hiding in his cabin at the foot of the great mountain. Balor only watches the travelers, but doesn't want become friendly with anyone."],
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
    ["hron","tower","alchemist",[["armorer","basic"],["resistance","basic"]],"Built to be an obedient and unwilling guardian for eternity, it didn't take many generations for Hron to realize that those who swore obedience were no longer around to claim loyalty and so could gather his brothers to build their own destiny."],
    ["kuna","stronghold","barbarian",[["scouting","basic"],["pathfinding","basic"]],"Kuna has never succeeded in his attempts to incorporate into the chaotic army of his tribe, but on the front lines there is no more elusive scout."],
    ["lania","inferno","herectic",[["wisdom","basic"],["firstaid","basic"]],""],
    ["myra","ruins","wizard",[["firstaid","advanced"]],"Myra learned from her mother the efficiency of plants to feed her siblings, heal the wounds and even eliminate those who threaten you. Today, she knows how to do it, and she did it more than once."],
    ["philip","castle","knight",[["leadership","basic"],["navigation","basic"]],"Philip spent many years of his military life preparing for the chance to free the seas of all piracy. That opportunity came in the form of a command position and a crew that shares their will."],
    ["tris","rampart","rangers",[["archery","basic"],["scouting","basic"]],""],
    ["zu","inferno","demoniac",[["offence","advanced"]],""],
    ["medea","dungeon","warlock",[["wisdom","basic"],["eagleeye","advanced"]],""],
]