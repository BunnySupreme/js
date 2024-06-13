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
  items.forEach(item => {

    let agedBrie = 'Aged Brie'
    let backstagePasses = 'Backstage passes to a TAFKAL80ETC concert'
    let sulfuras = 'Sulfuras, Hand of Ragnaros'
    let qualityChange = -1
    let sellInChange = -1
    let qualityMax = 50
    let degradationMultiplierAfterSellBy = 2
    let backstagePassesCalc = {
      sell_in: [5, 10],
      qualityIncrease: [3, 2]
    }

    switch (item.name){
      case agedBrie:
        qualityChange = 1
        break;
      case backstagePasses:
        qualityChange = 1
        if (item.sell_in <= 1){
          item.quality = 0
          qualityChange = 0
          break
        }
        for (let i = 0; i<backstagePassesCalc.sell_in.length; i++){
          if (item.sell_in <= backstagePassesCalc.sell_in[i]){
            qualityChange = backstagePassesCalc.qualityIncrease[i]
            break
          }
        }
        break;
      case sulfuras:
        qualityChange = 0
        sellInChange = 0
        break;
      
      default:
        if (item.sell_in <= 1){
          qualityChange *= degradationMultiplierAfterSellBy
        }
    }
    item.sell_in += sellInChange
    item.quality += qualityChange
    if (item.quality < 0){
      item.quality = 0
    }
    if (item.quality > 50 && qualityChange > 0){
      item.quality = qualityMax
    }

  
  })
  
}
