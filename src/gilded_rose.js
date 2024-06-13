function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  let qualityChange = -1
  let sellInChange = -1
  let qualityMax = 50
  let degradationMultiplierAfterExpired = 2

  let agedBrie = {
    name: 'Aged Brie',
    qualityChange: 1
  }
  let sulfuras = {
    name: 'Sulfuras, Hand of Ragnaros',
    qualityChange: 0,
    sellInChange: 0
  }
  let conjured = {
    name: 'Conjured',
    degradationMultiplier: 2
  }
  let backstagePasses = {
      name: 'Backstage passes to a TAFKAL80ETC concert',
      defaultQualityChange: 1,
      sell_in: [5, 10],
      qualityIncrease: [3, 2]
  }
  
  items.forEach(item => {

    switch (true){
      case item.name.startsWith(agedBrie.name):
        qualityChange = agedBrie.qualityChange
        break;
      case item.name.startsWith(backstagePasses.name):
        qualityChange = backstagePasses.defaultQualityChange
        if (item.sell_in <= 1){
          item.quality = 0
          qualityChange = 0
          break
        }
        for (let i = 0; i<backstagePasses.sell_in.length; i++){
          if (item.sell_in <= backstagePasses.sell_in[i]){
            qualityChange = backstagePasses.qualityIncrease[i]
            break
          }
        }
        break;
      case item.name.startsWith(sulfuras.name):
        qualityChange = sulfuras.qualityChange
        sellInChange = sulfuras.sellInChange
        break;
      case item.name.startsWith(conjured.name):
        qualityChange *= conjured.degradationMultiplier
        break
      default:
        if (item.sell_in - sellInChange <= 0){
          qualityChange *= degradationMultiplierAfterExpired
        }
    }

    item.sell_in += sellInChange
    item.quality += qualityChange
    if (item.quality < 0){
      item.quality = 0
    }
    if (item.quality > qualityMax && qualityChange > 0){
      item.quality = qualityMax
    }

  
  })
  
}
