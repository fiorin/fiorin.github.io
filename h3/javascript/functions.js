document.addEventListener('DOMContentLoaded',function(){

    $('[data-toggle="tooltip"]').tooltip(); 
})

document.addEventListener('DOMContentLoaded',function(){
    var html = []
    var hero, secondary;
    heroes.sort(function(a, b) {
        a.status = a.status != undefined ? a.status : 5;
        b.status = b.status != undefined ? b.status : 5;
        return ''+a.status+a.faction+a.class > ''+b.status+b.faction+b.class;
    });
    for (index in heroes) {
        hero = heroes[index]
        html += '<tr><td class="text-capitalize">'+hero.name+'<br/><small class="text-secondary text-capitalize">'+hero.class+'</small></td>'
        html += '<td><img src="img/heroes/'+hero.name+'_l.bmp" alt="'+hero.name+'"></td>'
        html += '<td><img src="img/heroes/'+hero.name+'_s.bmp" alt="'+hero.name+'"></td>'
        html += '<td><img src="img/specialty/'+hero.name+'_sl.bmp" alt=""></td>'
        html += '<td>'
        for (indexSecondary in hero.secondary) {
            secondary = hero.secondary[indexSecondary]
            html += '<img src="img/secondary/'+secondary.type+'-'+secondary.level+'.bmp" alt="'+secondary.type+'">'
        }
        html += '</td>'
        if(json.indexOf(hero.name) >= 0)
            html += '<td class="text-center text-light"><i class="fas fa-code fa-lg"></i><br/><small>coding json</small></td>'
        else if(skill.indexOf(hero.name) >= 0)
            html += '<td class="text-center text-info"><i class="fas fa-magic fa-lg"></i><br/><small>coding abilities</small></td>'
        else if(lore.indexOf(hero.name) >= 0)
            html += '<td class="text-center text-warning"><i class="fas fa-book fa-lg"></i><br/><small>need lore</small></td>'
        else if(test.indexOf(hero.name) >= 0)
            html += '<td class="text-center text-danger"><i class="fas fa-check fa-lg"></i><br/><small>ready for test</small></td>'
        else if(ready.indexOf(hero.name) >= 0)
            html += '<td class="text-center text-success"><i class="fas fa-check-double fa-lg"></i><br/><small>finished</small></td>'
        else
            html += '<td class="text-center text-secondary"><i class="far fa-lightbulb fa-lg"></i><br/><small>working idea</small></td>'
        html += '<td><b><span class="text-secondary">VCMI</span><br/><span class="text-capitalize">'+hero.faction+'</span></b></td></tr>'
    }
    $('#heroes-data').html(html)
})
var json = ['eordan','hana']
var skill = []
var lore = []
var test = ['agatha']
var ready = []
var heroes = [
    {
        name: 'agatha',
        faction: 'castle',       
        class: 'cleric',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'firstaid',level: 'basic'
        }],
        project: 'VCMI'
    },
    {
        name: 'elena',
        faction: 'castle',      
        class: 'knight',
        secondary: [{
            type: 'leadership',level: 'basic'},{
            type: 'tactics',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'richard',
        faction: 'castle',     
        class: 'knight',
        secondary: [{
            type: 'states',level: 'basic'},{
            type: 'luck',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'melchert',
        faction: 'tower',    
        class: 'wizard',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'necromancy',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'balor',
        faction: 'ruins',    
        class: 'warden',
        secondary: [{
            type: 'pathfinding',level: 'advanced'
        }],
        project: 'VCMI' 
    },
    {
        name: 'baltasar',
        faction: 'fortress',     
        class: 'beastmaster',
        secondary: [{
            type: 'logistics',level: 'basic'},{
            type: 'artillery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'bart',
        faction: 'cove',       
        class: 'navigator',
        secondary: [{
            type: 'scholar',level: 'basic'},{
            type: 'learning',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'edward',
        faction: 'cove',     
        class: 'captain',
        secondary: [{
            type: 'navigation',level: 'basic'},{
            type: 'tactics',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'marian',
        faction: 'cove',     
        class: 'captain',
        secondary: [{
            type: 'navigation',level: 'basic'},{
            type: 'diplomacy',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'lucius',
        faction: 'inferno',   
        class: 'demoniac',
        secondary: [{
            type: 'leadership',level: 'basic'},{
            type: 'resistance',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'lilith',
        faction: 'inferno',    
        class: 'herectic',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'firemagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'rurik',
        faction: 'tower',       
        class: 'alchemist',
        secondary: [{
            type: 'states',level: 'basic'},{
            type: 'armorer',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'hycis',
        faction: 'dungeon',   
        class: 'overlord',
        secondary: [{
            type: 'states',level: 'basic'},{
            type: 'eagleeye',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'caesar',
        faction: 'cove',      
        class: 'navigator',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'artillery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'bomoh',
        faction: 'stronghold',   
        class: 'battlemage',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'armorer',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'eordan',
        faction: 'conflux',       
        class: 'elementalist',
        secondary: [{
            type: 'armorer',level: 'basic'},{
            type: 'earthmagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'tuuk',
        faction: 'stronghold', 
        class: 'barbarian',
        secondary: [{
            type: 'luck',level: 'basic'},{
            type: 'pathfinding',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'mogh',
        faction: 'ruins',      
        class: 'hermit',
        secondary: [{
            type: 'earthmagic',level: 'expert'},{
            type: 'intelligence',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'horae',
        faction: 'ruins',      
        class: 'hermit',
        secondary: [{
            type: 'earthmagic',level: 'basic'},{
            type: 'ballistics',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'mabon',
        faction: 'ruins',       
        class: 'hermit',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'luck',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'hernandez',
        faction: 'neutral',      
        class: 'bard',
        secondary: [{
            type: 'scholar',level: 'basic'},{
            type: 'diplomacy',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'luna',
        faction: 'neutral',      
        class: 'bard',
        secondary: [{
            type: 'scholar',level: 'basic'},{
            type: 'firstaid',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'damys',
        faction: 'rampart',   
        class: 'ranger',
        secondary: [{
            type: 'archery',level: 'basic'},{
            type: 'tactics',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'laurens',
        faction: 'neutral',  
        class: 'merchant',
        secondary: [{
            type: 'logistics',level: 'expert'},{
            type: 'states',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'foglio',
        faction: 'neutral',       
        class: 'bard',
        secondary: [{
            type: 'luck',level: 'advanced'}
        ],
        project: 'VCMI' 
    },
    {
        name: 'elrin',
        faction: 'rampart',   
        class: 'ranger',
        secondary: [{
            type: 'archery',level: 'basic'},{
            type: 'scholar',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'viktorya',
        faction: 'tower',   
        class: 'alchemist',
        secondary: [{
            type: 'offence',level: 'basic'},{
            type: 'scouting',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'brinn',
        faction: 'rampart',   
        class: 'druid',
        secondary: [{
            type: 'pathfinding',level: 'basic'},{
            type: 'diplomacy',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'ravi',
        faction: 'necropolis',      
        class: 'necromancer',
        secondary: [{
            type: 'necromancy',level: 'basic'},{
            type: 'scholar',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'leon',
        faction: 'necropolis',  
        class: 'death knight',
        secondary: [{
            type: 'necromancy',level: 'basic'},{
            type: 'armorer',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'lydia',
        faction: 'fortress',   
        class: 'witch',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'mysticism',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'goes',
        faction: 'fortress',      
        class: 'beastmaster',
        secondary: [{
            type: 'navigation',level: 'basic'},{
            type: 'pathfinding',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'stanley',
        faction: 'necropolis',      
        class: 'deathknight',
        secondary: [{
            type: 'necromancy',level: 'basic'},{
            type: 'archery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'renaud',
        faction: 'neutral',      
        class: 'merchant',
        secondary: [{
            type: 'logistics',level: 'basic'},{
            type: 'diplomacy',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'giacomo',
        faction: 'neutral',      
        class: 'merchant',
        secondary: [{
            type: 'logistics',level: 'basic'},{
            type: 'intelligence',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'martin',
        faction: 'castle',      
        class: 'knight',
        secondary: [{
            type: 'leadership',level: 'basic'},{
            type: 'armorer',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'francis',
        faction: 'necropolis',      
        class: 'deathknight',
        secondary: [{
            type: 'necromancy',level: 'basic'},{
            type: 'armorer',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'henrik',
        faction: 'tower',      
        class: 'alchemist',
        secondary: [{
            type: 'ballistics',level: 'basic'},{
            type: 'artillery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'barkan',
        faction: 'tower',      
        class: 'wizard',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'pathfinding',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'dana',
        faction: 'stronghold',      
        class: 'barbarian',
        secondary: [{
            type: 'logistics',level: 'basic'},{
            type: 'armorer',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'etia',
        faction: 'inferno',      
        class: 'demoniac',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'firemagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'hana',
        faction: 'conflux',      
        class: 'elementalist',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'watermagic',level: 'expert'
        }],
        project: 'VCMI' 
    },
    {
        name: 'keus',
        faction: 'tower',      
        class: 'alchemist',
        secondary: [{
            type: 'armorer',level: 'expert'
        }],
        project: 'VCMI' 
    },
    {
        name: 'krystin',
        faction: 'rampart',      
        class: 'druid',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'airmagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'liana',
        faction: 'conflux',      
        class: 'planeswalker',
        secondary: [{
            type: 'scouting',level: 'basic'},{
            type: 'luck',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'moira',
        faction: 'castle',      
        class: 'cleric',
        secondary: [{
            type: 'scholar',level: 'advanced'
        }],
        project: 'VCMI' 
    },
    {
        name: 'morales',
        faction: 'cove',      
        class: 'captain',
        secondary: [{
            type: 'navigation',level: 'basic'},{
            type: 'artillery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'nodens',
        faction: 'dungeon',      
        class: 'warlock',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'learning',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'nova',
        faction: 'fortress',      
        class: 'witch',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'watermagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'pandora',
        faction: 'conflux',      
        class: 'planeswalker',
        secondary: [{
            type: 'firemagic',level: 'basic'},{
            type: 'firstaid',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'remer',
        faction: 'neutral',      
        class: 'bard',
        secondary: [{
            type: 'pathfinding',level: 'basic'},{
            type: 'scouting',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'rory',
        faction: 'tower',      
        class: 'wizard',
        secondary: [{
            type: 'artillery',level: 'basic'},{
            type: 'firemagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'anna',
        faction: 'tower',      
        class: 'alchemist',
        secondary: [{
            type: 'states',level: 'basic'},{
            type: 'leadership',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'diana',
        faction: 'stronghold',      
        class: 'barbarian',
        secondary: [{
            type: 'leadership',level: 'basic'},{
            type: 'archery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'marcus',
        faction: 'dungeon',      
        class: 'warlock',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'resistance',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'ferri',
        faction: 'conflux',      
        class: 'elementalist',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'firemagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'joan',
        faction: 'neutral',      
        class: 'fighter',
        secondary: [{
            type: 'tactics',level: 'basic'},{
            type: 'resistance',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'kenshin',
        faction: 'neutral',      
        class: 'fighter',
        secondary: [{
            type: 'tactics',level: 'basic'},{
            type: 'learning',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'prospero',
        faction: 'tower',      
        class: 'wizard',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'airmagic',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'samuel',
        faction: 'neutral',      
        class: 'bard',
        secondary: [{
            type: 'learning',level: 'basic'},{
            type: 'intelligence',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'yaxi',
        faction: 'cove',      
        class: 'navigator',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'offence',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'suzzane',
        faction: 'rampart',      
        class: 'druid',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'pathfinding',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'roberts',
        faction: 'cove',      
        class: 'captain',
        secondary: [{
            type: 'navigation',level: 'basic'},{
            type: 'ballistics',level: 'basic'
        }],
        project: 'VCMI' 
    },
    {
        name: 'brigitte',
        faction: 'castle',      
        class: 'knight',
        secondary: [{
            type: 'armorer',level: 'advanced'
        }],
        project: 'VCMI' 
    },
    {
        name: 'huldra',
        faction: 'ruins',      
        class: 'hermit',
        secondary: [{
            type: 'mysticism',level: 'basic'},{
            type: 'sorcery',level: 'basic'
        }],
        project: 'VCMI' 
    },
    /* {
        name: ,
        faction: ,
        portrait: ,
        miniature: ,
        especiality: ,
        secondary: [
            {
                type: ,
                level: 
            },
            {
                type: ,
                level: 
            }
        ]
    } */
]
