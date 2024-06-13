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

});
