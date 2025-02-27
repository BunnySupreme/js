describe("Gilded Rose", function() {

  it("should expire Item", function() {
    items = [ new Item("normalItem", 0, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
  });

  it("should lower Quality", function() {
    items = [ new Item("normalItem", 0, 1) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("degrade Quality twice as fast, once sell by date has passed", function() {
    items = [ new Item("expiredItem", -1, 4) ];
    update_quality();
    expect(items[0].quality).toEqual(2);
  });

  it("should not lower Quality below 0", function() {
    items = [ new Item("zeroQualityItem", 0, 0) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("should increase Quality of Aged Brie", function() {
    items = [ new Item("Aged Brie", 2, 0) ];
    update_quality();
    expect(items[0].quality).toEqual(1);
  });

  it("should not increase Quality above 50", function() {
    items = [ new Item("Aged Brie", 2, 50) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  it("should not decrease sell by date of Sulfuras", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 1, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
  });

  it("should not decrease quality of Sulfuras", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 1, 80) ];
    update_quality();
    expect(items[0].quality).toEqual(80);
  });

  it("should increase quality of Backstage passes", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 20, 1) ];
    update_quality();
    expect(items[0].quality).toEqual(2);
  });

  it("should increase quality of Backstage passes by 2 if there are 10 days or less left", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1) ];
    update_quality();
    expect(items[0].quality).toEqual(3);
  });

  it("should increase quality of Backstage passes by 3 if there are 5 days or less left", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1) ];
    update_quality();
    expect(items[0].quality).toEqual(4);
  });

  it("should set quality of Backstage passes to 0, if concert over", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("should degrade Conjured items twice as fast", function() {
    items = [ new Item("Conjured Mana Cake", 10, 10) ];
    update_quality();
    expect(items[0].quality).toEqual(8);
  });

  it("should degrade other conjured items as well", function() {
    items = [ new Item("Conjured Mead", 10, 10) ];
    update_quality();
    expect(items[0].quality).toEqual(8);
  });

});
