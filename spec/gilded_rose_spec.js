describe("Gilded Rose", function() {

  it("should expire Item", function() {
    items = [ new Item("normalItem", 0, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
  });

});
