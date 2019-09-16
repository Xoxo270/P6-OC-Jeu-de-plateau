
let tableauJoueurs;
let currentPlayer;

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

/* Mise à jour fiche personnages */

    function updatePlayersStats(tableauJoueurs){  
    
        $('#nameJ1,#pvJ1,#armeJ1,#dgtJ1,#nameJ2,#pvJ2,#armeJ2,#dgtJ2').remove();

        $('#char1').append('<p id="nameJ1"> Nom: ' + tableauJoueurs[0].name + '</p>');
        $('#char1').append('<p id="pvJ1"> Pv: ' + tableauJoueurs[0].pv + '</p>');
        $('#char1').append('<p id="armeJ1"> Arme: ' + tableauJoueurs[0].arme.name + '</p>');
        $('#char1').append('<p id="dgtJ1"> Dégats: ' + tableauJoueurs[0].arme.damage + '</p>');
        
        $('#char2').append('<p id="nameJ2"> Nom: ' + tableauJoueurs[1].name + '</p>');
        $('#char2').append('<p id="pvJ2"> Pv: ' + tableauJoueurs[1].pv + '</p>');
        $('#char2').append('<p id="armeJ2"> Arme: ' + tableauJoueurs[1].arme.name + '</p>');
        $('#char2').append('<p id="dgtJ2"> Dégats: ' + tableauJoueurs[1].arme.damage + '</p>');
    };

/* Fin Mise à jour fiche personnages */

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
        for(let index in tableauMurs){
            $('.cases[x=' + tableauMurs[index].x + '][y=' + tableauMurs[index].y + ']').addClass('rocks');
        }
        return tableauMurs;
    }

/* Fin Génération aléatoire des murs */ 

/* Constructeur d'armes avec switch */

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

/*                 case 6:
                    this.damage = 10;
                    this.name = "sword";
                break; */

                default:
                    this.damage = 10;
                    this.name = "sword";
                break;
            };
        };
    }; 

/* Fin Constructeur d'armes avec switch */

/* Génération des armes */  

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
        }
        return tableauArmes;   
    };

/* Fin Génération des armes */  

/* Constructeur de personnage */

    class characters{
        constructor(id,name,pv,arme,x,y){
            this.id = id;
            this.name = name;
            this.pv = pv;
            this.arme = arme;
            this.x = x;
            this.y = y;
        }
    }

/* Fin Constructeur de personnage */

    function popPlayers(tableauMurs,tableauArmes){
        let tableauJoueurs = []
        let id = 1;

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
                tableauJoueurs.push(new characters(id, alea.name,100, new weapons(), alea.x, alea.y));
                id++
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
        updatePlayersStats(tableauJoueurs);           
        return tableauJoueurs;
    }

/* Fin Génération Aléatoire du Placement des Joueurs */

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
                checkOnSwapWeapons(tableauJoueurs[0].x,tableauJoueurs[0].y,parseInt($(this).attr('x')),parseInt($(this).attr('y')));
                tableauJoueurs[0].x = parseInt($(this).attr('x'));
                tableauJoueurs[0].y = parseInt($(this).attr('y'));
                currentPlayer = tableauJoueurs[1];
            }
            else {  
                $('.ninja').removeClass('ninja');
                $(this).addClass('ninja');
                checkOnSwapWeapons(tableauJoueurs[1].x,tableauJoueurs[1].y,parseInt($(this).attr('x')),parseInt($(this).attr('y')));
                tableauJoueurs[1].x = parseInt($(this).attr('x'));
                tableauJoueurs[1].y = parseInt($(this).attr('y'));
                currentPlayer = tableauJoueurs[0];
            }
            greyscaleAround(currentPlayer);
        });

    };

    function checkOnSwapWeapons(initialX,initialY,cibleX,cibleY){ 

        if(initialX != cibleX){
            if(initialX > cibleX){
                let deplacementHaut = (initialX - cibleX);
                
                for(let i = 1; i <= deplacementHaut; i++){ /* On vérifie le +1 +2 +3 */

                    if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('axe')){ 
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('axe');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(0); 
                    }

                    else if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('dagger')){
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('dagger');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme =new weapons(1);
                    }

                    else if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('spear')){
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('spear');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(2);
                    }

                    else if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('flail')){                       
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('flail');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(3);
                    }

                    else if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('longsword')){
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('longsword');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(4);
                    }

                    else if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('crystalsword')){
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('crystalsword');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(5);
                    }

                    else if($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('sword')){
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('sword');
                        $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(6);
                    }
                };
            }
            else{
                let deplacementBas = (cibleX - initialX);

                for(let i = 1; i <= deplacementBas; i++){ /* On vérifie le +1 +2 +3 */

                    if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('axe')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('axe');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(0);
                    }
                    else if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('dagger')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('dagger');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme =new weapons(1);
                    }
                    else if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('spear')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('spear');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(2);
                    }
                    else if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('flail')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('flail');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(3);
                    }
                    else if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('longsword')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('longsword');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(4);
                    }
                    else if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('crystalsword')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('crystalsword');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(5);
                    }
                    else if($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('sword')){
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('sword');
                        $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(6);
                    }
                };
            }
        }
        else{
            if(initialY > cibleY){
                let deplacementGauche = (initialY - cibleY);

                for(let i = 1; i <= deplacementGauche; i++){ /* On vérifie le +1 +2 +3 */

                    if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('axe')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('axe');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(0);
                    }
                    else if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('dagger')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('dagger');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme =new weapons(1);
                    }
                    else if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('spear')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('spear');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(2);
                    }
                    else if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('flail')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('flail');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(3);
                    }
                    else if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('longsword')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('longsword');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(4);
                    }
                    else if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('crystalsword')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('crystalsword');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(5);
                    }
                    else if($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('sword')){
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('sword');
                        $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
                        $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                        currentPlayer.arme = new weapons(6);
                    } 
                };
            }
            else{
                let deplacementDroite = (cibleY - initialY);

                for(let i = 1; i <= deplacementDroite; i++){

                        if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('axe')){
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('axe');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');  
                            currentPlayer.arme = new weapons(0);
                        }else if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('dagger')){

                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('dagger');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                            currentPlayer.arme =new weapons(1);
                        }
                        else if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('spear')){
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('spear');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                            currentPlayer.arme = new weapons(2);                       
                        }
                        else if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('flail')){
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('flail');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                            currentPlayer.arme = new weapons(3);
                        }
                        else if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('longsword')){
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('longsword');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                            currentPlayer.arme = new weapons(4);
                        }
                        else if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('crystalsword')){
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('crystalsword');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                            currentPlayer.arme = new weapons(5);
                        }
                        else if($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('sword')){
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('sword');
                            $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
                            $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
                            currentPlayer.arme = new weapons(6);
                        }
                };
            }
        }
        updatePlayersStats(tableauJoueurs);
    }

/* Fin Mouvements */

/* Combat */
/* Fin Combat */

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
