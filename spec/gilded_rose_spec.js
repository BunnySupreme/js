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

  it("degrade quality twice as fast, once sell by date has passed", function() {
    items = [ new Item("expiredItem", -1, 4) ];
    update_quality();
    expect(items[0].quality).toEqual(2);
  });

});
