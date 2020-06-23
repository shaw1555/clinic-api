const util = require("../util/calculateAge");

describe("Age Normal", () => {
  it("should be 3 D", () => {
    const result = util.calculateAgeUnitTest("2020/06/20", "2020/06/23");
    printOutNormal(result);
    expect(result).toContain("3 D");
  });

  it("should be 3 M", () => {
    const result = util.calculateAgeUnitTest("2020/03/23", "2020/06/23");
    printOutNormal(result);
    expect(result).toContain("3 M");
  });

  it("should be 3 Y", () => {
    const result = util.calculateAgeUnitTest("2017/06/23", "2020/06/23");
    printOutNormal(result);
    expect(result).toContain("3 Y");
  });

  it("should be 3 M 3 D", () => {
    const result = util.calculateAgeUnitTest("2020/03/20", "2020/06/23");
    printOutNormal(result);
    expect(result).toContain("3 M 3 D");
  });

  it("should be 3 Y 3 M 3 D", () => {
    const result = util.calculateAgeUnitTest("2017/03/20", "2020/06/23");
    printOutNormal(result);
    expect(result).toContain("3 Y 3 M 3 D");
  });
});

describe("Age Reverse", () => {
  it("should be 3 D", () => {
    const result = util.calculateAgeUnitTest("2020/05/30", "2020/06/02");
    printOutReverse(result);
    expect(result).toContain("3 D");
  });

  it("should be 3 M", () => {
    const result = util.calculateAgeUnitTest("2019/10/30", "2020/01/30");
    printOutReverse(result);
    expect(result).toContain("3 M");
  });

  it("should be 3 M 3 D", () => {
    const result = util.calculateAgeUnitTest("2019/11/30", "2020/03/03");
    printOutReverse(result);
    expect(result).toContain("3 M 3 D");
  });

});


describe("Age Other Possible", () => {    

    it("should be 3 Y 3 M - Normal", () => {
        const result = util.calculateAgeUnitTest("2017/01/30", "2020/04/30");
        printOutOther(result);
        expect(result).toContain("3 Y 3 M");
      });

    it("should be 2 Y 3 M - Reverse", () => {
      const result = util.calculateAgeUnitTest("2017/10/30", "2020/01/30");
      printOutOther(result);
      expect(result).toContain("2 Y 3 M");
    });

    it("should be 3 Y 3 D - Normal", () => {
        const result = util.calculateAgeUnitTest("2017/04/27", "2020/04/30");
        printOutOther(result);
        expect(result).toContain("3 Y 3 D");
      });

    it("should be 2 Y 3 D - Reverse", () => {
      const result = util.calculateAgeUnitTest("2017/12/30", "2020/01/02");
      printOutOther(result);
      expect(result).toContain("2 Y 3 D");
    });
  
  });
  

printOutNormal = (result) => {
  //console.log(result);
};

printOutReverse = (result) => {
  //console.log(result);
};

printOutOther = (result) => {
    console.log(result);
  };
