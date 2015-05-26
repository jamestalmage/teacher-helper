var calculatePercentage = require('../../app/js/percentage/calculate-percentage');

describe('calculate-percentage', function() {

  it('10 out of 20 is 50%', function() {
    expect(calculatePercentage(10, 20)).to.equal(50);
    expect(calculatePercentage(10, 20, 0)).to.equal('50');
  });

  it('15 out of 20 is 75%', function() {
    expect(calculatePercentage(15, 20)).to.equal(75);
    expect(calculatePercentage(15, 20, 0)).to.equal('75');
  });

  it('21 out of 40 is 52.5%', function() {
    expect(calculatePercentage(21, 40)).to.equal(52.5);
    expect(calculatePercentage(21, 40, 1)).to.equal('52.5');
    expect(calculatePercentage(21, 40, 0)).to.equal('53');  //rounding
  });

});