document.addEventListener('DOMContentLoaded',function(){
    var html = []
    var hero, secondary;
    heroes.sort(function(a, b) {
        return a.faction+a.class > b.faction+b.class;
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
            console.log(secondary)
            html += '<img src="img/secondary/'+secondary.type+'-'+secondary.level+'.bmp" alt="'+secondary.type+'">'
        }
        html += '</td>'
        html += '<td class="text-center text-secondary"><i class="far fa-circle fa-lg"></i><br/><small>not yet</small></td>'
        html += '<td><b><span class="text-secondary">VCMI</span><br/><span class="text-capitalize">'+hero.faction+'</span></b></td></tr>'
    }
    $('#heroes-data').html(html)
})

var heroes = [
    {
        name: 'agatha',
        faction: 'castle',       
        class: 'cleric',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'firstAid',level: 'basic'
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
        class: 'mage',
        secondary: [{
            type: 'wisdom',level: 'basic'},{
            type: 'necromancy',level: 'basic'
        }],
        project: 'VCMI'
    },
    {
        name: 'Balor',
        faction: 'ruins',    
        class: 'hermit',
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
            type: 'fireMagic',level: 'basic'
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
        class: 'captain',
        secondary: [{
            type: 'offence',level: 'basic'},{
            type: 'artillery',level: 'basic'
        }],
        project: 'VCMI'
    },
    {
        name: 'bomoh',
        faction: 'fortress',   
        class: 'beastmaster',
        secondary: [{
            type: 'mysticism',level: 'basic'},{
            type: 'firstaid',level: 'basic'
        }],
        project: 'VCMI'
    },
    {
        name: 'eordan',
        faction: 'conflux',       
        class: 'elementalist',
        secondary: [{
            type: 'armorer',level: 'basic'},{
            type: 'earthMagic',level: 'basic'
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
        name: 'Brinn',
        faction: 'rampart',   
        class: 'druid',
        secondary: [{
            type: 'pathfinding',level: 'basic'},{
            type: 'diplomacy',level: 'basic'
        }],
        project: 'VCMI'
    },
    {
        name: 'Ravi',
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
        name: 'roan',
        faction: 'cove',      
        class: 'overlord',
        secondary: [{
            type: 'resistance',level: 'basic'},{
            type: 'armorer',level: 'basic'
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