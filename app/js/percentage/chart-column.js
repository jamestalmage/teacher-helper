module.exports = calculateColumn;

var calculatePercentage = require('./calculate-percentage');

/**
 * Calculates a column of percentage scores.
 * @param totalQuestions total number of questions on the test
 * @param roundDigits how many digits past the decimal point to round the result to. If supplied, result will
 *   be an array of strings instead of an array of numbers.
 * @returns {Array<number|string>} of length totalQuestions + 1, where result[i] contains the percentage score for
 *   for getting `i` questions correct. Will be an array of strings if `roundDigits` is supplied, otherwise an
 *   array of numbers.
 */
function calculateColumn(totalQuestions, roundDigits) {
  var correctAnswers;
  var result = [];

  for (correctAnswers = 0; correctAnswers <= totalQuestions; correctAnswers++) {
    result.push(calculatePercentage(correctAnswers, totalQuestions, roundDigits));
  }

  return result;
}
