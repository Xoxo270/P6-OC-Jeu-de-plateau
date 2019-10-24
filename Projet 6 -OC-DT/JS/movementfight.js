class MovementFight {
  /* Choix mouvements cases grises */
  greyscaleAround(player) {
    
    let self = this;
    $('.grayscale').off('click');
    $('.grayscale').removeClass('grayscale');

    for (let i = 1; i < 4; i++) {
      if ($('.cases[x=' + (player.x + i) + '][y=' + (player.y) + ']').hasClass('rocks') ||
        $('.cases[x=' + (player.x + i) + '][y=' + (player.y) + ']').hasClass('ninja') ||
        $('.cases[x=' + (player.x + i) + '][y=' + (player.y) + ']').hasClass('knight')) {
        break;
      }
      $('.cases[x=' + (player.x + i) + '][y=' + (player.y) + ']').addClass('grayscale');
    }

    for (let i = 1; i < 4; i++) {
      if ($('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').hasClass('rocks') ||
        $('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').hasClass('ninja') ||
        $('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').hasClass('knight')) {
        break;
      }
      $('.cases[x=' + (player.x) + '][y=' + (player.y + i) + ']').addClass('grayscale');
    }

    for (let i = 1; i < 4; i++) {
      if ($('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').hasClass('rocks') ||
        $('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').hasClass('ninja') ||
        $('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').hasClass('knight')) {
        break;
      }
      $('.cases[x=' + (player.x - i) + '][y=' + (player.y) + ']').addClass('grayscale');
    }

    for (let i = 1; i < 4; i++) {
      if ($('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').hasClass('rocks') ||
        $('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').hasClass('ninja') ||
        $('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').hasClass('knight')) {
        break;
      }
      $('.cases[x=' + (player.x) + '][y=' + (player.y - i) + ']').addClass('grayscale');
    }

    $('.grayscale').on('click', function () {
      if (currentPlayer.name == 'knight') {
        $('.knight').removeClass('knight');
        $(this).addClass('knight');
        self.checkOnSwapWeapons(tableauJoueurs[0].x, tableauJoueurs[0].y, parseInt($(this).attr('x')), parseInt($(this).attr('y')));
        tableauJoueurs[0].x = parseInt($(this).attr('x'));
        tableauJoueurs[0].y = parseInt($(this).attr('y'));
        currentPlayer = tableauJoueurs[1];
      } else {
        $('.ninja').removeClass('ninja');
        $(this).addClass('ninja');
        self.checkOnSwapWeapons(tableauJoueurs[1].x, tableauJoueurs[1].y, parseInt($(this).attr('x')), parseInt($(this).attr('y')));
        tableauJoueurs[1].x = parseInt($(this).attr('x'));
        tableauJoueurs[1].y = parseInt($(this).attr('y'));
        currentPlayer = tableauJoueurs[0];
      }
      self.greyscaleAround(currentPlayer);
      self.combatSystem();
    });

  }
  
  /* Vérification et ramassage des armes au sol */
  checkOnSwapWeapons(initialX, initialY, cibleX, cibleY) {

  if (initialX != cibleX) {
    if (initialX > cibleX) {
      let deplacementHaut = (initialX - cibleX);

      for (let i = 1; i <= deplacementHaut; i++) {
        /* On vérifie le +1 +2 +3 */

        if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('axe')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('axe');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(0);
        } else if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('dagger')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('dagger');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(1);
        } else if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('spear')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('spear');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(2);
        } else if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('flail')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('flail');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(3);
        } else if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('longsword')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('longsword');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(4);
        } else if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('crystalsword')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('crystalsword');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(5);
        } else if ($('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').hasClass('sword')) {
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').removeClass('sword');
          $('.cases[x=' + (initialX - i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(6);
        }
      };
    } else {
      let deplacementBas = (cibleX - initialX);

      for (let i = 1; i <= deplacementBas; i++) {
        /* On vérifie le +1 +2 +3 */

        if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('axe')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('axe');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(0);
        } else if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('dagger')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('dagger');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(1);
        } else if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('spear')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('spear');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(2);
        } else if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('flail')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('flail');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(3);
        } else if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('longsword')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('longsword');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(4);
        } else if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('crystalsword')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('crystalsword');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(5);
        } else if ($('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').hasClass('sword')) {
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').removeClass('sword');
          $('.cases[x=' + (initialX + i) + '][y=' + (cibleY) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(6);
        }
      };
    }
  } else {
    if (initialY > cibleY) {
      let deplacementGauche = (initialY - cibleY);

      for (let i = 1; i <= deplacementGauche; i++) {
        /* On vérifie le +1 +2 +3 */

        if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('axe')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('axe');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(0);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('dagger')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('dagger');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(1);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('spear')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('spear');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(2);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('flail')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('flail');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(3);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('longsword')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('longsword');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(4);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('crystalsword')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('crystalsword');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(5);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').hasClass('sword')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').removeClass('sword');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY - i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(6);
        }
      };
    } else {
      let deplacementDroite = (cibleY - initialY);

      for (let i = 1; i <= deplacementDroite; i++) {

        if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('axe')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('axe');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(0);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('dagger')) {

          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('dagger');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(1);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('spear')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('spear');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(2);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('flail')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('flail');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(3);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('longsword')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('longsword');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(4);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('crystalsword')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('crystalsword');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(5);
        } else if ($('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').hasClass('sword')) {
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').removeClass('sword');
          $('.cases[x=' + (cibleX) + '][y=' + (initialY + i) + ']').addClass('' + currentPlayer.arme.name + '');
          $(currentPlayer).removeClass('' + currentPlayer.arme.name + '');
          currentPlayer.arme = new weapons(6);
        }
      };
    }
  }
  this.updatePlayersStats(tableauJoueurs);
  }

  /* Combat */
  combatSystem() {
      if (tableauJoueurs[0].x === tableauJoueurs[1].x && tableauJoueurs[0].y + 1 === tableauJoueurs[1].y ||
      tableauJoueurs[0].x === tableauJoueurs[1].x && tableauJoueurs[0].y - 1 === tableauJoueurs[1].y ||
      tableauJoueurs[0].x + 1 === tableauJoueurs[1].x && tableauJoueurs[0].y === tableauJoueurs[1].y ||
      tableauJoueurs[0].x - 1 === tableauJoueurs[1].x && tableauJoueurs[0].y === tableauJoueurs[1].y) {
      console.log('Le combat commence');
      console.log(tableauJoueurs);
      console.log(currentPlayer);
      if (currentPlayer == tableauJoueurs[0]){
          currentPlayer = tableauJoueurs[1];
      }else{
          currentPlayer = tableauJoueurs[0];
      }
  
      /* Flush la map */
      $('#map').html('<h1>Le Combat à mort commence.</h1>');
      $('#map').append('<h1>Choisissez votre action sous votre personnage : </h1>');
      this.cbtTurns(); 
  }
  }
  
  /* Tours de combat */
  cbtTurns() {

      let self = this;
      if (currentPlayer == tableauJoueurs[0]) {
      tableauJoueurs[0].defense = false;
      $('#boutonsJ1').html('<button id="boutonAtk1" type="button"> Attaquer </button> <button id="boutonDef1" type="button"> Se défendre </button>');
      $('#boutonsJ2').html('');
  
      $('#boutonAtk1').off('click');
      $('#boutonAtk1').on('click', function () {
          if (tableauJoueurs[1].defense){
          tableauJoueurs[1].pv = tableauJoueurs[1].pv - (tableauJoueurs[0].arme.damage / 2);
          }else{
          tableauJoueurs[1].pv = tableauJoueurs[1].pv - tableauJoueurs[0].arme.damage;
          }
          self.updatePlayersStats(tableauJoueurs);
          if (tableauJoueurs[1].pv <= 0) {
          $('#map').html('<h1> Le joueur 1 remporte la partie ! </h1>');
          $('#boutonsJ1').html('');
          } else {
          currentPlayer = tableauJoueurs[1];
          self.cbtTurns();
          }
      });
      $('#boutonDef1').off('click');
      $('#boutonDef1').on('click', function () {
          tableauJoueurs[0].defense = true;
          self.updatePlayersStats(tableauJoueurs);
          if (tableauJoueurs[1].pv <= 0) {
          $('#map').html('<h1> Le joueur 1 remporte la partie ! </h1>');
          $('#boutonsJ1').html('');
          } else {
          currentPlayer = tableauJoueurs[1];
          self.cbtTurns();
          }
      });
      } else {
      tableauJoueurs[1].defense = false;
      $('#boutonsJ2').html('<button id="boutonAtk2" type="button"> Attaquer </button> <button id="boutonDef2" type="button"> Se défendre </button>');
      $('#boutonsJ1').html('');
  
      $('#boutonAtk2').off('click');
      $('#boutonAtk2').on('click', function () {
          if (tableauJoueurs[0].defense){
          tableauJoueurs[0].pv = tableauJoueurs[0].pv - (tableauJoueurs[1].arme.damage / 2);
          }else{
          tableauJoueurs[0].pv = tableauJoueurs[0].pv - tableauJoueurs[1].arme.damage;
          }
          self.updatePlayersStats(tableauJoueurs);
          if (tableauJoueurs[0].pv <= 0) {
          $('#map').html('<h1> Le joueur 2 remporte la partie ! </h1>');
          $('#boutonsJ2').html('');
          } else {
          currentPlayer = tableauJoueurs[0];
          self.cbtTurns();
          }
      });
      $('#boutonDef2').off('click');
      $('#boutonDef2').on('click', function () {
          tableauJoueurs[1].defense = true;
          self.updatePlayersStats(tableauJoueurs);
  
          if (tableauJoueurs[0].pv <= 0) {
          $('#map').html('<h1> Le joueur 2 remporte la partie ! </h1>');
          $('#boutonsJ2').html('');
          } else {
          currentPlayer = tableauJoueurs[0];
          self.cbtTurns();
          }
      });
      }
  }

  /* Mise à jour fiche personnages */
  updatePlayersStats(tableauJoueurs) {
      /* On enlève les anciennes stats des persos */
      $('#statsJ1,#statsJ2').html('');
      /* Append stats char 1 */
      $('#statsJ1').append('<p id="nameJ1"> Nom: ' + tableauJoueurs[0].name + '</p>');
      $('#statsJ1').append('<p id="pvJ1"> Pv: ' + tableauJoueurs[0].pv + '</p>');
      $('#statsJ1').append('<p id="armeJ1"> Arme: ' + tableauJoueurs[0].arme.name + '</p>');
      $('#statsJ1').append('<p id="dgtJ1"> Dégats: ' + tableauJoueurs[0].arme.damage + '</p>');
      /* Append stats Char 2 */
      $('#statsJ2').append('<p id="nameJ2"> Nom: ' + tableauJoueurs[1].name + '</p>');
      $('#statsJ2').append('<p id="pvJ2"> Pv: ' + tableauJoueurs[1].pv + '</p>');
      $('#statsJ2').append('<p id="armeJ2"> Arme: ' + tableauJoueurs[1].arme.name + '</p>');
      $('#statsJ2').append('<p id="dgtJ2"> Dégats: ' + tableauJoueurs[1].arme.damage + '</p>');
  }
};