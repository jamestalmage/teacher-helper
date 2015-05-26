module.exports = calculatePercentage;

function calculatePercentage(correctAnswers, numberOfQuestions, roundDigits) {
  var result =  ((correctAnswers / numberOfQuestions) * 100);
  if (typeof roundDigits === 'number') {
    result = result.toFixed(roundDigits);
  }
  return result;
}

