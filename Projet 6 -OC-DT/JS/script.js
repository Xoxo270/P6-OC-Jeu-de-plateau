
let tableauJoueurs;
let currentPlayer; 

/* Etape 1 */
    /* Génération aléatoire de la carte */
        function createMap(x) {
            let content = ""
            for(let rows=0; rows<x; rows++) {
                content+= "<div class='row ligne'>"
                for(let columns=0; columns<x; columns++) {
                    content+="<div class='cases' x='" + rows + "' y='" + columns + "'></div>";
                };
                content+='</div>';
            };
            $('#map').html(content);
        };

    /* Fin Génération aléatoire de la carte */

    /* Fonction de génération de chiffre aléatoire */    
        function randomNb(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };

    /* Fin Fonction de génération de chiffre aléatoire */
    
    /* Génération aléatoire des murs */  
        
        function createWalls() {

            let tableauMurs = []

            while(tableauMurs.length<10) {
                let alea = {x:randomNb(10), y:randomNb(10)};
                let isUnique = true;
                for(let index in tableauMurs){
                    if(tableauMurs[index].x === alea.x && tableauMurs[index].y === alea.y){
                        isUnique = false;
                    }
                };
                if(isUnique){
                    tableauMurs.push(alea);
                }
            };
            console.log(tableauMurs);
            for(let index in tableauMurs){
               $('.cases[x=' + tableauMurs[index].x + '][y=' + tableauMurs[index].y + ']').addClass('rocks');
            }
            return tableauMurs;
        }

    /* Génération aléatoire des murs */ 

    /* armes */
    
    class weapons{
        constructor(id) {
            this.id = id;

            switch(this.id){

                case 0:
                    this.damage = 16;
                    this.name = "axe";
                break;

                case 1:
                    this.damage = 12;
                    this.name = "dagger";
                break;
                
                case 2:
                    this.damage = 14;
                    this.name = "spear";
                break;
                
                case 3:
                    this.damage = 13;
                    this.name = "flail";
                break;
                
                case 4:
                    this.damage = 15;
                    this.name = "longsword";
                break;
                
                case 5:
                    this.damage = 17;
                    this.name = "crystalsword";
                break;
                
            };
        };
    }; 
    class characters{
        constructor(id,name,pv,arme){
            this.id = id;
            this.name = name;
            this.pv = pv;
            this.arme = arme;
        }
    }
    
    function popWeapons(tableauMurs){

        let tableauArmes = []

        while(tableauArmes.length<4){
            let isUnique = true;
            let weapon = new weapons(randomNb(6));
            let alea = {x:randomNb(10), y:randomNb(10), weapon:weapon};
            for(let index in tableauArmes){
                if(tableauArmes[index].x === alea.x && tableauArmes[index].y === alea.y){
                    isUnique = false;
                }
            };
            for(let index in tableauMurs){
                if(tableauMurs[index].x === alea.x && tableauMurs[index].y === alea.y){
                    isUnique = false;
                }
            }
            if(isUnique){
                tableauArmes.push(alea);
            }
        }
        for(let index in tableauArmes){
            $('.cases[x=' + tableauArmes[index].x + '][y=' + tableauArmes[index].y + ']').addClass('' + tableauArmes[index].weapon.name + '');
            console.log(tableauArmes[index].weapon.name, tableauArmes[index].x, tableauArmes[index].y)
         }
         return tableauArmes;
        
    };


    /* Fin armes */

    /* Génération Aléatoire du Placement des Joueurs */
    function popPlayers(tableauMurs,tableauArmes){
        let tableauJoueurs = []

        while(tableauJoueurs.length<2){
            let alea = {x:randomNb(10), y:randomNb(10), name:(tableauJoueurs.length == 0 ? 'knight':'ninja')};
            let isUnique = true;
            for(let index in tableauJoueurs){
                if((tableauJoueurs[index].x === alea.x && tableauJoueurs[index].y === alea.y) ||
                (tableauJoueurs[index].x + 1 === alea.x) ||
                (tableauJoueurs[index].x - 1 === alea.x) ||
                (tableauJoueurs[index].y + 1 === alea.y) ||
                (tableauJoueurs[index].y - 1 === alea.y) ){
                    isUnique = false;
                }
            };
            for(let index in tableauArmes){
                if(tableauArmes[index].x === alea.x && tableauArmes[index].y === alea.y){
                    isUnique = false;
                }
            };
            for(let index in tableauMurs){
                if(tableauMurs[index].x === alea.x && tableauMurs[index].y === alea.y){
                    isUnique = false;
                }
            }
            if(isUnique){
                tableauJoueurs.push(alea);
            }
        }
        for(let index in tableauJoueurs){
            if(index == 0){
                $('.cases[x=' + tableauJoueurs[index].x + '][y=' + tableauJoueurs[index].y + ']').addClass('knight');
            }
            else{
                $('.cases[x=' + tableauJoueurs[index].x + '][y=' + tableauJoueurs[index].y + ']').addClass('ninja');
            }
            
         }
         return tableauJoueurs;

    }

    /* Fin Génération Aléatoire du Placement des Joueurs */

/* Fin Etape 1 */

/* Etape 2 */

    /* Mouvements */
function greyscaleAround(player) {
    
    $('.grayscale').off('click');
    $('.grayscale').removeClass('grayscale');

    for(let i = 1; i < 4; i++){ 
        if($('.cases[x=' + (player.x + i)  + '][y=' + (player.y) + ']').hasClass('rocks') || $('.cases[x=' + (player.x + i)  + '][y=' + (player.y) + ']').hasClass('ninja')
        || $('.cases[x=' + (player.x + i)  + '][y=' + (player.y) + ']').hasClass('knight')) break;
        $('.cases[x=' + (player.x + i)  + '][y=' + (player.y) + ']').addClass('grayscale');
    }
    for(let i = 1; i < 4; i++){ 
        if($('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').hasClass('rocks') || $('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').hasClass('ninja')
        || $('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').hasClass('knight')) break;
        $('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').addClass('grayscale');
    }
    for(let i = 1; i < 4; i++){ 
        if($('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').hasClass('rocks') || $('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').hasClass('ninja')
        || $('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').hasClass('knight')) break;
        $('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').addClass('grayscale');
    }
    for(let i = 1; i < 4; i++){ 
        if($('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').hasClass('rocks') || $('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').hasClass('ninja')
        || $('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').hasClass('knight')) break;
        $('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').addClass('grayscale');
    }

    $('.grayscale').on('click',function(){

        if (currentPlayer.name == 'knight') {
            $('.knight').removeClass('knight');
            $(this).addClass('knight');
            tableauJoueurs[0].x = parseInt($(this).attr('x'));
            tableauJoueurs[0].y = parseInt($(this).attr('y'));
            currentPlayer = tableauJoueurs[1];
        }
        else {  
            $('.ninja').removeClass('ninja');
            $(this).addClass('ninja');
            tableauJoueurs[1].x = parseInt($(this).attr('x'));
            tableauJoueurs[1].y = parseInt($(this).attr('y'));
            currentPlayer = tableauJoueurs[0];
        }
        greyscaleAround(currentPlayer);
    });

}

    /* Fin Mouvements */

/* Fin Etape 2 */

/* Etape 3 */

    /* Combat */
    /* Fin Combat */

/* Fin Etape 3 */




/* Appel des fonctions */

$(document).ready(function() {
    createMap(10);
    let tableauMurs = createWalls();
    let tableauArmes = popWeapons(tableauMurs);
    tableauJoueurs = popPlayers(tableauMurs,tableauArmes);
    currentPlayer = tableauJoueurs[0];
    greyscaleAround(currentPlayer);
});

/* Fin Appel des fonctions */








/*  -Faire en sorte que lorsqu'on passe sur une arme on la ramasse et ca met à jour nos dégats.
    -On check toutes les cases sur lesquelles on passe pour voir si il y a une classe d'arme et si oui on l'ajoute .
    -On supprime la classe d'arme de la 'case'.
    
    -Faire une fiche de personnage modifiable.
*/