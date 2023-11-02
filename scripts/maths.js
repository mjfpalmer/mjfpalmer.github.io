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

    // Addition
    // https://www.splashlearn.com/math-vocabulary/addition/addition
    for (let addend1 of new Array(50 + 1).fill(0).map((n, i) => i)) {
      for (let addend2 of new Array(50 + 1).fill(0).map((n, i) => i)) {
        question = new MathsQuestion(
          0,
          maths.AdditionOperation,
          `${addend1} ${maths.AdditionOperation.Symbol} ${addend2} = `,
          addend1 + addend2,
          'number');

        switch (true) {
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
    for (let minuend of new Array(50 + 1).fill(0).map((n, i) => i)) {
      for (let subtrahend of new Array(50 + 1).fill(0).map((n, i) => i)) {
        question = new MathsQuestion(
          0,
          maths.SubtractionOperation,
          `${minuend} ${maths.SubtractionOperation.Symbol} ${subtrahend} = `,
          minuend - subtrahend,
          'number');

        switch (true) {
          case question.Answer <= 0: question.Grade = 5; break;
          case minuend <= 20: question.Grade = 1; break;
          case minuend <= 40: question.Grade = 2; break;
          default: question.Grade = 3; break;
        }

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }

    // Multiplication
    // https://www.splashlearn.com/math-vocabulary/multiplication/multiplication
    for (let multiplicand of new Array(12 + 1).fill(0).map((n, i) => i)) {
      for (let multiplier of new Array(12 + 1).fill(0).map((n, i) => i)) {
        question = new MathsQuestion(
          0,
          maths.MultiplicationOperation,
          `${multiplicand} ${maths.MultiplicationOperation.Symbol} ${multiplier} = `,
          multiplicand * multiplier,
          'number');

        switch (true) {
          case [0, 1, 2, 5, 10].indexOf(multiplicand) > -1 || [0, 1, 2, 5, 10].indexOf(multiplier) > -1: question.Grade = 2; break;
          case [3, 4, 8].indexOf(multiplicand) > -1 && [3, 4, 8].indexOf(multiplier) > -1: question.Grade = 3; break;
          default: question.Grade = 4; break;
        }

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }

    // Division
    // https://www.splashlearn.com/math-vocabulary/division/division
    for (let dividend of new Array(12 + 1).fill(0).map((n, i) => i)) {
      for (let divisor of new Array(12).fill(0).map((n, i) => i + 1)) {
        question = new MathsQuestion(
          0,
          maths.DivisionOperation,
          `${dividend} ${maths.DivisionOperation.Symbol} ${divisor} = `,
          dividend / divisor,
          'number');

        switch (true) {
          case dividend % divisor !== 0: question.Grade = 5; break;
          case [0, 1, 2, 3, 4, 5, 8, 10].indexOf(dividend) > -1 || [1, 2, 3, 4, 5, 8, 10].indexOf(divisor) > -1: question.Grade = 3; break;
          default: question.Grade = 4; break;
        }

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }

    // Factor Of
    for (let denominator of new Array(9).fill(0).map((n, i) => i + 2)) {
      for (let numerator of new Array(denominator).fill(0).map((n, i) => i + 1)) {
        for (let value of new Array(50 + 1).fill(0).map((n, i) => i)) {
          question = new MathsQuestion(
            0,
            maths.FactorOfOperation,
            `${numerator}${maths.FactorOfOperation.Symbol}${denominator} of ${value} = `,
            value / denominator * numerator,
            'number');

          switch (true) {
            case value % denominator !== 0: question.Grade = Number.MAX_SAFE_INTEGER; break;
            case !Number.isInteger(question.Answer): question.Grade = Number.MAX_SAFE_INTEGER; break;
            default: question.Grade = 4; break;
          }

          if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
        }
      }
    }

    console.debug(`Questions: ${maths.Questions.length}`);
  };

  this.Init();
}

function MathsQuestion(grade, mathsOperation, question, answer, answerType) {
  let mathsQuestion = this;

  this.Grade = grade;
  this.MathsOperation = mathsOperation;
  this.Question = question;
  this.Answer = answer;
  this.AnswerType = answerType;

  this.PlayerAnswer = null;

  this.Correct = () => {
    return mathsQuestion.PlayerAnswer === mathsQuestion.Answer;
  };
}

function MathsOperation(grade, symbol) {
  this.Grade = grade;
  this.Symbol = symbol;
}