const LiquidNitrogenSynthesizer = extendContent(GenericSmelter, "liquid-nitrogen-synthesizer", {
  load() {
    this.super$load();

    this.baseRegion = Core.atlas.find("more-dustry-liquid-nitrogen-synthesizer");
    this.liquidWaterRegion = Core.atlas.find("more-dustry-liquid-nitrogen-synthesizer-liquid-1");
    this.liquidNitrogenRegion = Core.atlas.find("more-dustry-liquid-nitrogen-synthesizer-liquid-2");
    this.topRegion = Core.atlas.find("more-dustry-liquid-nitrogen-synthesizer-top");

    this.lastInputAlpha = 0;
    this.inputLiquidColor = "ffffff";
  },

  generateIcons() {
    return [
      Core.atlas.find(this.name)
    ];
  },

  draw(tile) {
    const entityLiquids = tile.entity.liquids;

    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());

    if (entityLiquids.total() > 0.001) {
      const outputLiquid = this.outputLiquid.liquid,
        outputLiquidAlpha = entityLiquids.get(outputLiquid) / this.liquidCapacity,
        currentLiquid = entityLiquids.current();

      if (currentLiquid !== null && currentLiquid.name === "water") {
        if (this.inputLiquidColor === null) {
          this.inputLiquidColor = currentLiquid.color;
        }

        this.lastInputAlpha = entityLiquids.currentAmount() / this.liquidCapacity;
      }

      if (this.inputLiquidColor !== null && this.lastInputAlpha !== null) {
        Draw.color(this.inputLiquidColor);
        Draw.alpha(this.lastInputAlpha);
        Draw.rect(this.liquidWaterRegion, tile.drawx(), tile.drawy());
      }

      Draw.color(outputLiquid.color);
      Draw.alpha(outputLiquidAlpha);
      Draw.rect(this.liquidNitrogenRegion, tile.drawx(), tile.drawy());

      Draw.color();
    }

    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
  }
});