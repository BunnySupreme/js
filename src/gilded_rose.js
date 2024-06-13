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
  let quality_change = -1
  let sell_in_change = -1
  let quality_max = 50
  let degradation_multiplier_after_expired = 2

  let aged_brie = {
    name: 'Aged Brie',
    quality_change: 1
  }
  let sulfuras = {
    name: 'Sulfuras',
    quality_change: 0,
    sell_in_change: 0
  }
  let conjured = {
    name: 'Conjured',
    degradation_multiplier: 2
  }
  let backstage_passes = {
      name: 'Backstage passes',
      default_quality_change: 1,
      sell_in: [5, 10],
      quality_change: [3, 2]
  }
  
  items.forEach(item => {

    switch (true){
      case item.name.startsWith(aged_brie.name):
        quality_change = aged_brie.quality_change
        break;
      case item.name.startsWith(backstage_passes.name):
        quality_change = backstage_passes.default_quality_change
        if (item.sell_in <= 1){
          item.quality = 0
          quality_change = 0
          break
        }
        for (let i = 0; i<backstage_passes.sell_in.length; i++){
          if (item.sell_in <= backstage_passes.sell_in[i]){
            quality_change = backstage_passes.quality_change[i]
            break
          }
        }
        break;
      case item.name.startsWith(sulfuras.name):
        quality_change = sulfuras.quality_change
        sell_in_change = sulfuras.sell_in_change
        break;
      case item.name.startsWith(conjured.name):
        quality_change *= conjured.degradation_multiplier
        break
      default:
        if (item.sell_in - sell_in_change <= 0){
          quality_change *= degradation_multiplier_after_expired
        }
    }

    item.sell_in += sell_in_change
    item.quality += quality_change
    if (item.quality < 0){
      item.quality = 0
    }
    if (item.quality > quality_max && quality_change > 0){
      item.quality = quality_max
    }

  
  })
  
}
