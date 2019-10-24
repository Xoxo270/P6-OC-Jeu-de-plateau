class CreateGame {

  /* Fonction de génération de chiffre aléatoire */
  randomNb(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  /* Génération aléatoire de la carte */
  createMap(x) {
    let content = ""
    for (let rows = 0; rows < x; rows++) {
      content += "<div class='row ligne'>"
      for (let columns = 0; columns < x; columns++) {
        content += "<div class='cases' x='" + rows + "' y='" + columns + "'></div>";
      };
      content += '</div>';
    };
    $('#map').html(content);
  }

  /* Génération aléatoire des murs */
  createWalls() {
      let tableauMurs = []
      while (tableauMurs.length < 10) {
        let alea = {
          x: this.randomNb(10),
          y: this.randomNb(10)
        };
        let isUnique = true;
        for (let index in tableauMurs) {
          if (tableauMurs[index].x === alea.x && tableauMurs[index].y === alea.y) {
            isUnique = false;
          }
        };
        if (isUnique) {
          tableauMurs.push(alea);
        }
      };
      for (let index in tableauMurs) {
        $('.cases[x=' + tableauMurs[index].x + '][y=' + tableauMurs[index].y + ']').addClass('rocks');
      }
      return tableauMurs;
  }

  /* Génération des armes */
  popWeapons(tableauMurs) {
  let tableauArmes = []

  while (tableauArmes.length < 4) {
    let isUnique = true;
    let weapon = new weapons(this.randomNb(6));
    let alea = {
      x: this.randomNb(10),
      y: this.randomNb(10),
      weapon: weapon
    };
    for (let index in tableauArmes) {
      if (tableauArmes[index].x === alea.x && tableauArmes[index].y === alea.y) {
        isUnique = false;
      }
    };
    for (let index in tableauMurs) {
      if (tableauMurs[index].x === alea.x && tableauMurs[index].y === alea.y) {
        isUnique = false;
      }
    }
    if (isUnique) {
      tableauArmes.push(alea);
    }
  }
  for (let index in tableauArmes) {
    $('.cases[x=' + tableauArmes[index].x + '][y=' + tableauArmes[index].y + ']').addClass('' + tableauArmes[index].weapon.name + '');
  }
  return tableauArmes;
  }

  /* Génération Aléatoire du Placement des Joueurs */
  popPlayers(tableauMurs, tableauArmes) {
      let tableauJoueurs = [];
      let id = 1;
  
      while (tableauJoueurs.length < 2) {
      let alea = {
          x: this.randomNb(10),
          y: this.randomNb(10),
          name: (tableauJoueurs.length == 0 ? 'knight' : 'ninja')
      };
      let isUnique = true;
      for (let index in tableauJoueurs) {
          if ((tableauJoueurs[index].x === alea.x && tableauJoueurs[index].y === alea.y) ||
          (tableauJoueurs[index].x + 1 === alea.x) ||
          (tableauJoueurs[index].x - 1 === alea.x) ||
          (tableauJoueurs[index].y + 1 === alea.y) ||
          (tableauJoueurs[index].y - 1 === alea.y)) {
          isUnique = false;
          }
      };
      for (let index in tableauArmes) {
          if (tableauArmes[index].x === alea.x && tableauArmes[index].y === alea.y) {
          isUnique = false;
          }
      };
      for (let index in tableauMurs) {
          if (tableauMurs[index].x === alea.x && tableauMurs[index].y === alea.y) {
          isUnique = false;
          }
      }
      if (isUnique) {
          tableauJoueurs.push(new characters(id, alea.name, 100, new weapons(), alea.x, alea.y));
          id++
      }
      }
      for (let index in tableauJoueurs) {
      if (index == 0) {
          $('.cases[x=' + tableauJoueurs[index].x + '][y=' + tableauJoueurs[index].y + ']').addClass('knight');
      } else {
          $('.cases[x=' + tableauJoueurs[index].x + '][y=' + tableauJoueurs[index].y + ']').addClass('ninja');
      }
      }
      movementFight.updatePlayersStats(tableauJoueurs);
      return tableauJoueurs;
  }

};