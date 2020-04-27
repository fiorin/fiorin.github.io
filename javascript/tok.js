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
        html += '<td class=""><img src="../img/tok/specialty/'+hero[0]+'_sl.bmp"/></td>'
        html += '<td class="herobg text-nowrap">'
        for (index in hero[3]) {
            html += '<img src="../img/tok/secondary/'+hero[3][index][0]+'-'+hero[3][index][1]+'.bmp"/>'
        }
        html += '<td class="herobg"><small>'+hero[4]+'</small></td>'
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
    ["noble firbolg",4,"neutral (rigging)","firbolgup.jpg"],
    ["plague doctor",3,"neutral (rigging)","plague.jpg"],
    ["psycho",3,"neutral (rigging)","psycho.jpg"],
    ["aboriginal",3,"neutral (rigging)","aboriginal.jpg"],
    ["sybil",5,"neutral (reworking)","witch.jpg"],
    ["seer",5,"neutral (reworking)","witchup.jpg"],
    ["bear",2,"neutral (reworking)","bear.jpg"],
    ["dire bear",2,"neutral (reworking)","bearup.jpg"],
    ["gnome",1,"neutral (reworking)","gnome.jpg"],
    ["peryton",3,"neutral (reworking)","peryton.jpg"],
    ["grand peryton",3,"neutral (reworking)","grandperyton.jpg"]
]
var heroes = [
    ["agatha","castle","cleric",[["wisdom","basic"],["firstaid","basic"]],"It was a shock to the noble military family when Agatha decided to give up all their legacy and join the serenity of religion. But the essence of the battle still remains for sure."],
    ["elena","castle","knight",[["leadership","basic"],["pathfinding","basic"]],"Elena was the king's youngest daughter. When he decided to divide the land among future sons-in-law, Elena rebelled and fled. She gathered an army and claimed the land of her kingdom after her father's death."],
    ["martin","castle","knight",[["leadership","basic"],["armorer","basic"]],""],
    ["eordan","dungeon","warlock",[["armorer","basic"],["earthmagic","basic"]],"Although a renowned knight in his youth, Eordan has found in the dark knowledge of the elements the strength he needs in his men."],
    ["hana","conflux","elementalist",[["wisdom","basic"],["watermagic","basic"]],"Born in an abandoned mill on the banks of a stream. Hana shaped her principles based on the purity and flow of the current."],
    ["liana","conflux","planeswalker",[["scouting","basic"],["luck","basic"]],""],
    ["pandora","conflux","planeswalker",[["firemagic","basic"],["firstaid","basic"]],""],
    ["marian","cove","captain",[["navigation","basic"],["diplomacy","basic"]],""],
    ["bart","cove","navigator",[["scholar","basic"],["learning","basic"]],""],
    ["caesar","cove","navigator",[["wisdom","basic"],["scouting","basic"]],""],
    ["yaxi","cove","navigator",[["wisdom","basic"],["offence","basic"]],""],
    ["nodens","ruins","hunter",[["resistance","basic"],["wisdom","basic"]],""],
    ["baltasar","fortress","beastmaster",[["logistics","basic"],["artillery","basic"]],""],
    ["goes","fortress","beastmaster",[["navigation","basic"],["pathfinding","basic"]],""],
    ["lydia","fortress","witch",[["wisdom","basic"],["mysticism","basic"]],""],
    ["lucius","inferno","demoniac",[["leadership","basic"],["logistics","basic"]],"Lucius is third in command of the troops from hell. Very few hold such power, since the longevity of the position is only guaranteed by the cruelty and malice of the occupant."],
    ["etia","inferno","demoniac",[["resistance","basic"],["firemagic","basic"]],""],
    ["lilith","inferno","herectic",[["wisdom","basic"],["firemagic","basic"]],""],
    ["ravi","necropolis","necromancer",[["necromancy","basic"],["scholar","basic"]],""],
    ["hernandez","neutral","bard",[["scholar","basic"],["diplomacy","basic"]],""],
    ["luna","neutral","bard",[["scholar","basic"],["firstaid","basic"]],""],
    ["foglio","neutral","bard",[["luck","expert"]],""],
    ["remer","neutral","bard",[["pathfinding","basic"],["scouting","basic"]],""],
    ["laurens","neutral","merchant",[["logistics","basic"],["states","basic"]],""],
    ["brinn","rampart","druid",[["pathfinding","basic"],["diplomacy","basic"]],""],
    ["krystin","rampart","druid",[["wisdom","basic"],["airmagic","basic"]],""],
    ["suzzane","rampart","druid",[["wisdom","basic"],["pathfinding","basic"]],"Magic is not the most popular subject among centaurs. Even fewer are the young people with aptitude for the thing. Suzzane is a young centaur who frightens many leaders with her tricks and knowledge."],
    ["mogh","ruins","hermit",[["earthmagic","expert"],["intelligence","basic"]],""],
    ["horae","ruins","hermit",[["earthmagic","basic"],["ballistics","basic"]],"Horae is a fanatic druid who does not believe in unnatural buildings. If we come from the land, there is no reason to create barriers between us."],
    ["mabon","ruins","hermit",[["wisdom","basic"],["luck","basic"]],"A gardener proud of his seedlings, the spreading of a decelerated life and peaceful coexistence. Probably influenced by his supernatural luck that guarantees surprises in his days and blossoming of his plants"],
    ["huldra","ruins","hermit",[["mysticism","basic"],["sorcery","basic"]],"A nature spirit of great beauty, who hypnotizes men and seduces them into the depths of the forest."],
    ["balor","ruins","hunter",[["pathfinding","advanced"]],"A giant lumberjack hiding in his cabin at the foot of the great mountain. Balor only watches the travelers, but doesn't want become friendly with anyone."],
    ["tuuk","stronghold","barbarian",[["luck","basic"],["pathfinding","basic"]],""],
    ["bomoh","ruins","hermit",[["wisdom","basic"],["armorer","basic"]],""],
    ["henrik","tower","alchemist",[["ballistics","basic"],["artillery","basic"]],""],
    ["keus","tower","alchemist",[["armorer","expert"]],""],
    ["barkan","neutral","bard",[["wisdom","basic"],["pathfinding","basic"]],""],
    ["rory","neutral","artificer",[["artillery","basic"],["firemagic","basic"]],""],
    ["prospero","conflux","planeswalker",[["resistance","basic"],["airmagic","expert"]],""],
    ["duqk","cove","navigator",[["navigation","basic"],["luck","basic"]],""],
    ["hron","tower","alchemist",[["armorer","basic"],["resistance","basic"]],"Built to be an obedient and unwilling guardian for eternity, it didn't take many generations for Hron to realize that those who swore obedience were no longer around to claim loyalty and so could gather his brothers to build their own destiny."],
    ["kuna","stronghold","barbarian",[["scouting","basic"],["pathfinding","basic"]],"Kuna has never succeeded in his attempts to incorporate into the chaotic army of his tribe, but on the front lines there is no more elusive scout."],
    ["myra","ruins","wizard",[["firstaid","advanced"]],"Myra learned from her mother the efficiency of plants to feed her siblings, heal the wounds and even eliminate those who threaten you. Today, she knows how to do it, and she did it more than once."],
    ["philip","castle","knight",[["leadership","basic"],["navigation","basic"]],"Philip spent many years of his military life preparing for the chance to free the seas of all piracy. That opportunity came in the form of a command position and a crew that shares their will."],
    ["tris","rampart","rangers",[["archery","basic"],["scouting","basic"]],""],
    ["medea","dungeon","warlock",[["wisdom","basic"],["eagleeye","advanced"]],""],
]