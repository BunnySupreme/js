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
    let agedBrie = false
    let backstagePasses = false
    let sulfuras = false
    let normalItem = true
    let agedBrieName = 'Aged Brie'
    let backstagePassesName = 'Backstage passes to a TAFKAL80ETC concert'
    let sulfurasName = 'Sulfuras, Hand of Ragnaros'
    let qualityMax = 50
    let backstagePassesCalc = {
      daysLeft: [10, 5],
      qualityIncrease: [2, 3]
    }
  


    switch (item.name){
      case agedBrieName:
        agedBrie = true 
        break;
      case backstagePassesName:
        backstagePasses = true
        break;
      case sulfurasName:
        sulfuras = true
        break;
    }

    if (agedBrie || backstagePasses || sulfuras){
      normalItem = false
    }

    //lower quality
    if (normalItem) {
      if (item.quality > 0) {
        item.quality--
      }
    } 
    
    else {
      if (item.quality < qualityMax) {
        item.quality++
        if (backstagePasses) {
          backstagePassesCalc.daysLeft.forEach(day => {
            if (item.sell_in <= day){
              item.quality++
            }
          })
        }
      }
    }
    if (!sulfuras) {
      item.sell_in--;
    }
    if (item.sell_in < 0 && item.quality > 0) {
      if (normalItem) {
          item.quality--
      } else {
        if (item.quality < qualityMax) {
          item.quality++
        }
      }
    }
  })
}
