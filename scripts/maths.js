function Maths(grade) {
  let maths = this;

  this.AdditionOperation = new MathsOperation(1, '&plus;');
  this.SubtractionOperation = new MathsOperation(1, '&minus;');
  this.MultiplicationOperation = new MathsOperation(2, '&times;');
  this.DivisionOperation = new MathsOperation(3, '&divide;');
  this.FactorOfOperation = new MathsOperation(4, '/');

  this.MathsOperations = [
    maths.AdditionOperation,
    maths.SubtractionOperation,
    maths.MultiplicationOperation,
    maths.DivisionOperation,
    maths.FactorOfOperation,
  ];

  this.Grade = grade;

  this.Questions = [];

  this.GetQuestions = (questionCount) => {
    let questions = [];
    let question;
    let applicableMathsOperations = maths.MathsOperations.filter((mo) => mo.Grade <= maths.Grade);

    while (questions.length < questionCount) {
      let mathsOperation = applicableMathsOperations[Math.floor(Math.random() * applicableMathsOperations.length)];
      let applicableQuestions = maths.Questions.filter((q) => q.MathsOperation === mathsOperation);
      do {
        question = applicableQuestions[Math.floor(Math.random() * applicableQuestions.length)];
      } while (questions.includes(question));
      questions.push(question);
    }
    return questions;
  };

  this.Init = () => {
    this.InitQuestions();
  };

  this.InitQuestions = () => {
    let question = null;

    let minAdd = -50, maxAdd = 50;
    let minSubtract = -50, maxSubtract = 50;
    let minMultiply = -12, maxMultiply = 12;
    let minDivide = -12, maxDivide = 12;
    let maxFactorDenominator = 12, minFactorValue = -100, maxFactorValue = 100;

    // Addition
    // https://www.splashlearn.com/math-vocabulary/addition/addition
    for (let addend1 of new Array(Math.abs(minAdd) + maxAdd + 1).fill(0).map((n, i) => i + minAdd)) {
      for (let addend2 of new Array(Math.abs(minAdd) + maxAdd + 1).fill(0).map((n, i) => i + minAdd)) {
        question = new MathsQuestion(
          0,
          maths.AdditionOperation,
          `${addend1} ${maths.AdditionOperation.Symbol} ${addend2} = `,
          addend1 + addend2,
          { type: "number", min: maxAdd * -3, max: maxAdd * 3, step: "" });

        switch (true) {
          case question.Answer <= 0:
          case addend1 < 0:
          case addend2 < 0:
            question.Grade = 5;
            break;
          case question.Answer <= 20: question.Grade = 1; break;
          case question.Answer <= 40: question.Grade = 2; break;
          case question.Answer <= 60: question.Grade = 3; break;
          default: question.Grade = 4; break;
        }

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }

    // Subtraction
    // https://www.splashlearn.com/math-vocabulary/subtraction/subtract
    for (let minuend of new Array(Math.abs(minSubtract) + maxSubtract + 1).fill(0).map((n, i) => i + minSubtract)) {
      for (let subtrahend of new Array(Math.abs(minSubtract) + minSubtract + 1).fill(0).map((n, i) => i + minSubtract)) {
        question = new MathsQuestion(
          0,
          maths.SubtractionOperation,
          `${minuend} ${maths.SubtractionOperation.Symbol} ${subtrahend} = `,
          minuend - subtrahend,
          { type: "number", min: maxSubtract * -3, max: maxSubtract * 3, step: "" });

        switch (true) {
          case question.Answer <= 0:
          case minuend < 0:
          case subtrahend < 0:
            question.Grade = 5;
            break;
          case minuend <= 20: question.Grade = 1; break;
          case minuend <= 40: question.Grade = 2; break;
          default: question.Grade = 3; break;
        }

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }

    // Multiplication
    // https://www.splashlearn.com/math-vocabulary/multiplication/multiplication
    for (let multiplicand of new Array(Math.abs(minMultiply) + maxMultiply + 1).fill(0).map((n, i) => i + minMultiply)) {
      for (let multiplier of new Array(Math.abs(minMultiply) + maxMultiply + 1).fill(0).map((n, i) => i + minMultiply)) {
        question = new MathsQuestion(
          0,
          maths.MultiplicationOperation,
          `${multiplicand} ${maths.MultiplicationOperation.Symbol} ${multiplier} = `,
          multiplicand * multiplier,
          { type: "number", min: maxMultiply * -3, max: maxMultiply * 3, step: "" });

        switch (true) {
          case multiplicand < 0:
          case multiplier < 0:
            question.Grade = 5;
            break;
          case [0, 1, 2, 5, 10].indexOf(multiplicand) > -1 || [0, 1, 2, 5, 10].indexOf(multiplier) > -1: question.Grade = 2; break;
          case [3, 4, 8].indexOf(multiplicand) > -1 && [3, 4, 8].indexOf(multiplier) > -1: question.Grade = 3; break;
          default: question.Grade = 4; break;
        }

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }

    // Division
    // https://www.splashlearn.com/math-vocabulary/division/division
    for (let dividend of new Array(Math.abs(minDivide) + maxDivide + 1).fill(0).map((n, i) => i + minDivide)) {
      for (let divisor of new Array(Math.abs(minDivide) + maxDivide + 1).fill(0).map((n, i) => i + minDivide)) {
        if (divisor !== 0) {
          question = new MathsQuestion(
            0,
            maths.DivisionOperation,
            `${dividend} ${maths.DivisionOperation.Symbol} ${divisor} = `,
            dividend / divisor,
            { type: "number", min: maxDivide * -3, max: maxDivide * 3, step: "" });

          switch (true) {
            case dividend < 0:
            case divisor < 0:
              question.Grade = 5;
              break;
            case dividend % divisor !== 0: question.Grade = 5; break;
            case [0, 1, 2, 3, 4, 5, 8, 10].indexOf(dividend) > -1 || [1, 2, 3, 4, 5, 8, 10].indexOf(divisor) > -1: question.Grade = 3; break;
            default: question.Grade = 4; break;
          }

          if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
        }
      }
    }

    // Factor Of
    for (let denominator of new Array(maxFactorDenominator - 1).fill(0).map((n, i) => i + 2)) {
      for (let numerator of new Array(denominator).fill(0).map((n, i) => i + 1)) {
        for (let value of new Array(Math.abs(-minFactorValue) + maxFactorValue + 1).fill(0).map((n, i) => i + minFactorValue)) {
          question = new MathsQuestion(
            0,
            maths.FactorOfOperation,
            `${numerator}${maths.FactorOfOperation.Symbol}${denominator} of ${value} = `,
            value / denominator * numerator,
            { type: "number", min: maxFactorValue * -3, max: maxFactorValue * 3, step: "" });

          switch (true) {
            case value % denominator !== 0: question.Grade = Number.MAX_SAFE_INTEGER; break;
            case !Number.isInteger(question.Answer): question.Grade = Number.MAX_SAFE_INTEGER; break;
            case value < 0: question.Grade = 5; break;
            default: question.Grade = 4; break;
          }

          if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
        }
      }
    }

    console.debug(maths.Questions);
  };

  this.Init();
}

function MathsQuestion(grade, mathsOperation, question, answer, inputProperties) {
  let mathsQuestion = this;

  this.Grade = grade;
  this.MathsOperation = mathsOperation;
  this.Question = question.replace(/-/g, '&minus;');
  this.Answer = answer;
  this.InputProperties = inputProperties;

  this.PlayerAnswer = null;

  this.Correct = () => {
    return mathsQuestion.PlayerAnswer === mathsQuestion.Answer;
  };
}

function MathsOperation(grade, symbol) {
  this.Grade = grade;
  this.Symbol = symbol;
}