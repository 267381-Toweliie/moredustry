const ElectrumEnricher = extendContent(GenericSmelter, "electrum-enricher", {
  load() {
    this.super$load();

    this.baseRegion = Core.atlas.find("more-dustry-electrum-enricher");
    this.topRegion = Core.atlas.find("more-dustry-electrum-enricher-top");
    this.workingSpriteRegion = Core.atlas.find(this.name + "-glow");
  },

  generateIcons() {
    return [
      Core.atlas.find("more-dustry-electrum-enricher"),
      Core.atlas.find("more-dustry-electrum-enricher-top")
    ];
  },

  draw(tile) {
    const entityLiquids = tile.entity.liquids,
      entity = tile.ent();
    Draw.color();
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());


    if (entity.warmup > 0 && tile.entity.totalProgress > 0) {
      const alpha = entity.warmup * Mathf.absin(Time.time() / 2, 2, 1) + (entity.warmup * 0.3);


      Draw.alpha(alpha);
      Draw.rect(this.workingSpriteRegion, tile.drawx(), tile.drawy());
      Draw.alpha(1);
      Draw.color();
    }

  }
});
