class weapons {
    constructor(id) {
      this.id = id;
      switch (this.id) {
  
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
  
        default:
          this.damage = 10;
          this.name = "sword";
          break;
      };
    };
};