const LiquidNitrogenSynthetizer = extendContent(GenericSmelter, "liquid-nitrogen-synthetizer", {
  load() {
    this.super$load();

    this.baseRegion = Core.atlas.find();
    this.liquidWaterRegion = Core.atlas.find(this.name + "-liquid-1");
    this.liquidNitrogenRegion = Core.atlas.find(this.name + "-liquid-2");
  },

  generateIcons() {
    return [
      Core.atlas.find(this.name)
    ]
  },

  draw(tile) {
    const entityLiquids = tile.entity.liquids;

    Draw.rect(this.region, tile.drawx(), tile.drawy());

    if (entityLiquids.total() > 0.001) {
      const inputLiquid = this.inputLiquid.liquid,
        outputLiquid = this.outputLiquid.liquid,
        inputLiquidAlpha = entityLiquids.get(inputLiquid / this.liquidCapacity),
        outputLiquidAlpha = entityLiquids.get(outputLiquid / this.liquidCapacity);

      Draw.color(inputLiquid.color);
      Draw.alpha(inputLiquidAlpha);
      Draw.rect(this.liquidWaterRegion, tile.drawx(), tile.drawy());
      Draw.color(outputLiquid.color);
      Draw.alpha(outputLiquidAlpha);
      Draw.rect(this.liquidNitrogenRegion, tile.drawx(), tile.drawy());
      Draw.color();
    }
  }
});