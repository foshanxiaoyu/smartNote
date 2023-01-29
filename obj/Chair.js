class Chair {
  constructor(
    color,
    seatHeight,
    recliningAngle,
    backSupport,
    headSupport,
    padding,
    armRests,
    seatSize,
    isHeightAdjustable,
    isMovable,
  ) {
    // 如果抽象可以不用default 值
    // Chair class with defaults. Defaults which can be changed by the subclass class.
    (this.color = ""),
      (this.seatHeight = 20),
      (this.recliningAngle = 20),
      (this.backSupport = true),
      (this.headSupport = true),
      (this.padding = true),
      (this.armRests = true),
      (this.seatSize = 20),
      (isHeightAdjustable = false),
      (isMovable = false);
  }
  // method(type){} ;
  adjustSeatHeight(height) {
    return 20;
  }
  adjustAngle(angle) {
    return 20;
  }
  moveChair(x, y) {
    return x, y;
  }
}

// Base Class Chair
// class Chair {
//     constructor(color, seatHeight, recliningAngle, backSupport, headSupport, padding, armRests, seatSize, isHeightAdjustable, isMovable){
//         this.color = color;
//         this.seatHeight = seatHeight;
//         this.recliningAngle = recliningAngle;
//         this.backSupport = backSupport;
//         this.headSupport = headSupport;
//         this.padding = padding;
//         this.armRests = armRests;
//         this.seatSize = seatSize;
//         this.isHeightAdjustable = isHeightAdjustable;
//         this.isMovable = isMovable;
//     }

//     adjustableHeight() {};
//     adjustAngle(){};
//     moveChair(){};
// }

// const newChair = new Chair("Blue","25 inch","20 deg",true,false,"3 inch",true,"16 inch",false,false);

// console.dir("Chair Prototype", Chair);
// console.log("Chair Object", newChair);
