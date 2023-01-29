// 它使用 extends 关键字来允许  OfficeChair 类  执行继承  Chair
// 语法：  class ChildClass extends ParentClass{...}
//  静态方法 static 只能通过类本身访问。 类的实例无法访问它 类的实例不存在静态属性 私有成员是类的成员，只能由类本身在内部使用。

class OfficeChair extends Chair {
  constructor(color, isHeightAdjustable, seatHeight, recliningAngle) {
    super();
    this.type = "Office Chair";
    this.color = color;
    this.isHeightAdjustable = isHeightAdjustable;
    this.seatHeight = seatHeight;
    this.recliningAngle = recliningAngle;
    this.isMovable = true;
  }

  adjustableHeight(height) {
    if (height > this.seatHeight) {
      console.log(`Chair height changed to ${height}`);
    } else {
      console.log(
        `Height cannot be decreased more than the seat height ${this.seatHeight}`,
      );
    }
  }

  adjustAngle(angle) {
    if (angle >= this.recliningAngle) {
      console.log(`Chair angle changed to ${angle}`);
    } else {
      console.log(
        `Angle cannot be decreased more than the min reclining angle ${this.recliningAngle}`,
      );
    }
  }

  moveChair(x, y) {
    console.log(`Chair moved to co-ordinates = (${x}, ${y})`);
  }
}

const newOfficeChair = new OfficeChair("Red", true, 30, 30);

console.log(newOfficeChair.adjustableHeight(31));
console.log(newOfficeChair.adjustAngle(40));
console.log(newOfficeChair.moveChair(10, 20));

//  私有成员是类的成员，只能由类本身在内部使用。
class OfficeChairWithPrivate extends Chair {
  //Newly Added Properties
  #basePrice;
  #maxDiscount;
  #sellerAddress;

  constructor(type, color, isHeightAdjustable, seatHeight, recliningAngle) {
    super();
    this.type = type;
    this.color = color;
    this.isHeightAdjustable = isHeightAdjustable;
    this.seatHeight = seatHeight;
    this.recliningAngle = recliningAngle;
    this.isMovable = true;
    this.#basePrice = 1000;
    this.#maxDiscount = 5; //In percentage
    this.#sellerAddress = "XYZ, street";
  }

  adjustableHeight(height) {
    if (height > this.seatHeight) {
      console.log(`Chair height changed to ${height}`);
    } else {
      console.log(
        `Height cannot be decreased more than the seat height ${this.seatHeight}`,
      );
    }
  }

  adjustAngle(angle) {
    if (angle >= this.recliningAngle) {
      console.log(`Chair angle changed to ${angle}`);
    } else {
      console.log(
        `Angle cannot be decreased more than the min reclining angle ${this.recliningAngle}`,
      );
    }
  }

  moveChair(x, y) {
    console.log(`Chair moved to co-ordinates = (${x}, ${y})`);
  }

  //Newly Added function
  #getChairAmount(taxCharge) {
    return (
      this.#basePrice +
      (this.#basePrice - (this.#basePrice * this.#maxDiscount) / 100) +
      taxCharge
    );
  }

  //Newly Added function
  generateBill() {
    console.log("**** BILLING INFORMATION ****");
    console.log(`Chair Price = ${this.#getChairAmount(20)}`);
    console.log(`Seller Address = ${this.#sellerAddress}`);
  }
}
