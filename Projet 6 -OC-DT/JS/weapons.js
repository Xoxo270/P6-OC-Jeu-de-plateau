class weapons {
  constructor(id = 0) {
    this.id = id;
    this.damage = weapons.armes[id].damage;
    this.name = weapons.armes[id].name;
  };
};
weapons.armes = [ 
{
  damage : 10,
  name : 'sword'
},
{
  damage : 16,
  name : 'axe'
},
{
  damage : 12,
  name : 'dagger'
},
{
  damage : 14,
  name : 'spear'
},
{
  damage : 13,
  name : 'flail'
},
{
  damage : 15,
  name : 'longsword'
},
{
  damage : 17,
  name : 'crystalsword'
}
]

