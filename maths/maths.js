function Maths(grade) {
  let maths = this;

  this.QuestionsPerOperation = 100;
  this.QuestionsPerOperationPerGrade = 100;

  this.AdditionOperation = new MathsOperation(1, 'Addition', '&plus;');
  this.SubtractionOperation = new MathsOperation(1, 'Subtraction', '&minus;');
  this.MultiplicationOperation = new MathsOperation(2, 'Multiplication', '&times;');
  this.DivisionOperation = new MathsOperation(3, 'Division', '&divide;');
  this.FactorOfOperation = new MathsOperation(4, 'Factors', '&frasl;');
  this.TimeAnalogueOperation = new MathsOperation(4, 'Analogue Time');
  this.TimeDigitalOperation = new MathsOperation(4, 'Digital Time');
  this.LengthConversionOperation = new MathsOperation(4, 'Length Conversion');
  this.LengthAdditionOperation = new MathsOperation(4, 'Length Addition');
  this.AreaUnitsOperation = new MathsOperation(4, 'Unit Area');
  this.Area2DOperation = new MathsOperation(4, '2D Area');
  this.PerimeterUnitsOperation = new MathsOperation(4, 'Unit Perimeter');
  this.Perimeter2DOperation = new MathsOperation(4, '2D Perimeter');
  this.BODMASOperation = new MathsOperation(6, 'BODMAS');
  this.PercentageOperation = new MathsOperation(6, 'Percentages');
  this.FractionOperation = new MathsOperation(6, 'Fractions');
  this.RatioOperation = new MathsOperation(6, 'Ratios');

  this.MathsOperations = [
    maths.AdditionOperation,
    maths.SubtractionOperation,
    maths.MultiplicationOperation,
    maths.DivisionOperation,
    maths.FactorOfOperation,
    maths.TimeAnalogueOperation,
    maths.TimeDigitalOperation,
    maths.LengthConversionOperation,
    maths.LengthAdditionOperation,
    maths.AreaUnitsOperation,
    maths.Area2DOperation,
    maths.PerimeterUnitsOperation,
    maths.Perimeter2DOperation,
    maths.BODMASOperation,
    maths.PercentageOperation,
    maths.FractionOperation,
    maths.RatioOperation,
  ];

  this.Grade = grade;

  this.Questions = [];

  this.FilterOperations = (operations) => {
    maths.MathsOperations = maths.MathsOperations.filter(mo => operations.length === 0 || operations.indexOf(mo.Description) > -1);
  };

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
    maths.InitQuestionsAddition();
    maths.InitQuestionsSubtraction();
    maths.initQuestionsMultiplication();
    maths.InitQuestionsDivision();
    maths.initQuestionsFactorOf();
    maths.initQuestionsTimeAnalogue();
    maths.initQuestionsTimeDigital();
    maths.initQuestionsLengthConversion();
    maths.initQuestionsLengthAddition();
    maths.initQuestionsAreaUnits();
    maths.initQuestionsArea2D();
    maths.initQuestionsPerimeterUnits();
    maths.initQuestionsPerimeter2D();
    maths.initQuestionsBODMAS();
    maths.initQuestionsPercentage();
    maths.initQuestionsFraction();
    maths.initQuestionsRatio();

    console.debug(maths.Questions);
  };

  this.InitQuestionsAddition = () => {
    // https://www.splashlearn.com/math-vocabulary/addition/addition

    let addends = [];
    let maxAnswer = null;

    switch (maths.Grade) {
      case 1: maths.fillArray(addends, 0, 10); maxAnswer = 10; break;
      case 2: maths.fillArray(addends, 0, 20); maxAnswer = 20; break;
      case 3: maths.fillArray(addends, 0, 40); maxAnswer = 40; break;
      case 4: maths.fillArray(addends, 0, 50); maxAnswer = 50; break;
      case 5: maths.fillArray(addends, 0, 1, maths.QuestionsPerOperationPerGrade); break;
      default: maths.fillArray(addends, 10000, 1000000, 1, maths.QuestionsPerOperationPerGrade); break;
    }

    if (addends.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let addend1 = maths.randomElement(addends);
        let addend2 = maths.randomElement(addends);
        let answer = addend1 + addend2;

        let isValid = (maxAnswer === null || answer <= maxAnswer);

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.AdditionOperation,
            `${addend1} ${maths.AdditionOperation.Symbol} ${addend2} = `,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.InitQuestionsSubtraction = () => {
    // https://www.splashlearn.com/math-vocabulary/addition/addition

    let minuends = [], subtrahends = [];
    let minAnswer = null;

    switch (maths.Grade) {
      case 1: maths.fillArray(minuends, 0, 10); maths.fillArray(subtrahends, 0, 10); minAnswer = 0; break;
      case 2: maths.fillArray(minuends, 0, 20); maths.fillArray(subtrahends, 0, 20); minAnswer = 0; break;
      case 3: maths.fillArray(minuends, 0, 40); maths.fillArray(subtrahends, 0, 40); minAnswer = 0; break;
      case 4: maths.fillArray(minuends, 0, 50); maths.fillArray(subtrahends, 0, 50); minAnswer = 0; break;
      case 5: maths.fillArray(minuends, 0, 1, maths.QuestionsPerOperationPerGrade); maths.fillArray(subtrahends, 0, 1, maths.QuestionsPerOperationPerGrade); minAnswer = 0; break;
      default: maths.fillArray(minuends, 10000, 1000000, 1, maths.QuestionsPerOperationPerGrade); maths.fillArray(subtrahends, 10000, 1000000, 1, maths.QuestionsPerOperationPerGrade); minAnswer = 0; break;
    }

    if (minuends.length > 0 && subtrahends.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let minuend = maths.randomElement(minuends);
        let subtrahend = maths.randomElement(subtrahends);
        let answer = minuend - subtrahend;

        let isValid = (minAnswer === null || answer >= minAnswer);

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.SubtractionOperation,
            `${minuend} ${maths.SubtractionOperation.Symbol} ${subtrahend} = `,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsMultiplication = () => {
    // https://www.splashlearn.com/math-vocabulary/multiplication/multiplication

    let multiplicands = [], multipliers = [];

    switch (maths.Grade) {
      case 1: break;
      case 2: multiplicands = [0, 1, 2, 5, 10]; multipliers = [0, 1, 2, 5, 10]; break;
      case 3: maths.fillArray(multiplicands, 0, 12); maths.fillArray(multipliers, 0, 12); break;
      case 4: maths.fillArray(multiplicands, 0, 12); maths.fillArray(multipliers, 0, 12); break;
      case 5: maths.fillArray(multiplicands, -12, 12); maths.fillArray(multipliers, -12, 12); break;
      default: maths.fillArray(multiplicands, -100, 100); maths.fillArray(multipliers, -100, 100); break;
    }

    if (multiplicands.length > 0 && multipliers.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let multiplicand = maths.randomElement(multiplicands);
        let multiplier = maths.randomElement(multipliers);
        let answer = multiplicand * multiplier;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.MultiplicationOperation,
            `${multiplicand} ${maths.MultiplicationOperation.Symbol} ${multiplier} = `,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.InitQuestionsDivision = () => {
    // https://www.splashlearn.com/math-vocabulary/division/division

    let dividends = [], divisors = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: dividends = [0, 1, 2, 3, 4, 5, 8, 10]; divisors = [1, 2, 3, 4, 5, 8, 10]; break;
      case 4: maths.fillArray(dividends, 0, 12); maths.fillArray(divisors, 1, 12); break;
      case 5: maths.fillArray(dividends, -12, 12); maths.fillArray(divisors, -12, 12); break;
      default: maths.fillArray(dividends, -12, 12); maths.fillArray(divisors, -12, 12); break;
    }

    if (dividends.length > 0 && divisors.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let dividend = maths.randomElement(dividends);
        let divisor = maths.randomElement(divisors);
        let answer = dividend / divisor;
        let fraction = answer % 1;

        let isValid = true;

        switch (maths.Grade) {
          case 3: isValid = dividend % divisor === 0; break;
          case 4: isValid = dividend % divisor === 0; break;
          case 5: isValid = dividend % divisor === 0; break;
          default: isValid = [0.25, 0.5].indexOf(fraction) > -1; break;
        }

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.DivisionOperation,
            `${dividend} ${maths.DivisionOperation.Symbol} ${divisor} = `,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsFactorOf = () => {
    // https://www.splashlearn.com/math-vocabulary/division/division

    let numerators = [], denominators = [], values = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(numerators, 1, 12); maths.fillArray(denominators, 2, 12); maths.fillArray(values, 0, 100); break;
      case 5: maths.fillArray(numerators, 1, 12); maths.fillArray(denominators, 2, 12); maths.fillArray(values, -100, 100); break;
      default: maths.fillArray(numerators, 1, 12); maths.fillArray(denominators, 2, 12); maths.fillArray(values, -100, 100); break;
    }

    if (numerators.length > 0 && denominators.length > 0 && values.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let denominator = maths.randomElement(denominators);
        let numerator = maths.randomElement(numerators.filter(n => n < denominator));
        let value = maths.randomElement(values);
        let answer = value / denominator * numerator;

        let isValid = true;

        switch (maths.Grade) {
          case 4: isValid = value % denominator === 0; break;
          case 5: isValid = value % denominator === 0; break;
          default: isValid = value % denominator === 0; break;
        }

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.FactorOfOperation,
            `${numerator}${maths.FactorOfOperation.Symbol}${denominator} of ${value} = `,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeAnalogue = () => {
    maths.initQuestionsTimeAnalogueToDigital();
    maths.initQuestionsTimeAnalogueToDigitalAM();
    maths.initQuestionsTimeAnalogueToDigitalPM();
    maths.initQuestionsTimeAnalogueToDescriptionAM();
    maths.initQuestionsTimeAnalogueToDescriptionPM();
  };

  this.initQuestionsTimeAnalogueToDigital = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);
        let answer = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.FactorOfOperation,
            `Convert <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> to digital. `,
            answer,
            { type: "text" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeAnalogueToDigitalAM = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);
        let answer = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeAnalogueOperation,
            `Convert <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> AM to digital. `,
            answer,
            { type: "text" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeAnalogueToDigitalPM = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);
        let answer = `${(hour + 12).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeAnalogueOperation,
            `Convert <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> PM to digital. `,
            answer,
            { type: "text" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeAnalogueToDescriptionAM = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeAnalogueOperation,
            `Describe <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> AM. `,
            '',
            { type: "text" });

          switch (minute) {
            case 0: question.Answer = maths.hourOn(hour, true); break;
            case 5: case 10: case 20: case 25: question.Answer = `${minute} past ${maths.hourPast(hour)}`; break;
            case 15: question.Answer = `quarter past ${maths.hourPast(hour)}`; break;
            case 30: question.Answer = `half past ${maths.hourPast(hour)}`; break;
            case 35: case 40: case 50: case 55: question.Answer = `${60 - minute} to ${maths.hourTo(hour + 1)}`; break;
            case 45: question.Answer = `quarter to  ${hour + 1 == 12 ? 'midnight' : `${maths.hourTo(hour + 1)}`}`; break;
          }

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeAnalogueToDescriptionPM = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeAnalogueOperation,
            `Describe <img src="/images/clocks/${(hour - 12).toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> PM. `,
            '',
            { type: "text" });

          switch (minute) {
            case 0: question.Answer = maths.hourOn(hour, true); break;
            case 5: case 10: case 20: case 25: question.Answer = `${minute} past ${maths.hourPast(hour)}`; break;
            case 15: question.Answer = `quarter past ${maths.hourPast(hour)}`; break;
            case 30: question.Answer = `half past ${maths.hourPast(hour)}`; break;
            case 35: case 40: case 50: case 55: question.Answer = `${60 - minute} to ${maths.hourTo(hour + 1)}`; break;
            case 45: question.Answer = `quarter to  ${hour + 1 == 12 ? 'midnight' : `${maths.hourTo(hour + 1)}`}`; break;
          }

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeDigital = () => {
    maths.initQuestionsTimeDigitalToAnalogue();
    maths.initQuestionsTimeDigitalToDescription24H();
    maths.initQuestionsTimeDigitalToDescription12HAM();
    maths.initQuestionsTimeDigitalToDescription12HPM();
  };

  this.initQuestionsTimeDigitalToAnalogue = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);

        let isValid = true;

        if (isValid) {
          let optionCorrect = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
          let options = [optionCorrect];
          while (options.length < 4) {
            let changeHour = Math.random() < 0.5;
            let option = `${(changeHour ? Math.floor(Math.random() * 12) : hour).toString().padStart(2, '0')}${(changeHour ? minute : (Math.floor(Math.random() * 12) * 5)).toString().padStart(2, '0')}`;
            if (options.indexOf(options) === -1) { options.push(option); }
          }
          options.sort(() => Math.random() < 0.5 ? -1 : 1);

          let optionsTable = ['<table class="w-100"><thead><tr><td class="text-center">A</td><td style="text-align: center;">B</td><td style="text-align: center;">C</td><td style="text-align: center;">D</td></tr></thead>',
            '<tbody><tr>',
            options.map((option, i) => `<td><img src="/images/clocks/${option}.svg" class="w-100" /></td>`).join(''),
            '</tr></tbody>',
            '</table> '].join("");

          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeDigitalOperation,
            `How do you show ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} on a clock?${optionsTable}`,
            String.fromCharCode(65 + options.indexOf(optionCorrect)),
            { type: "text" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeDigitalToDescription24H = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 23); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 23); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 23); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeDigitalOperation,
            `Describe ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}. `,
            '',
            { type: "text" });

          switch (minute) {
            case 0: question = maths.hourOn(hour, false); break;
            case 5: case 10: case 20: case 25: question.Answer = `${minute} past ${maths.hourPast(hour)}`; break;
            case 15: question.Answer = `quarter past ${maths.hourPast(hour)}`; break;
            case 30: question.Answer = `half past ${maths.hourPast(hour)}`; break;
            case 35: case 40: case 50: case 55: question.Answer = `${60 - minute} to ${maths.hourTo(hour + 1)}`; break;
            case 45: question.Answer = `quarter to ${maths.hourTo(hour + 1)}`; break;
          }

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeDigitalToDescription12HAM = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeDigitalOperation,
            `Describe ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} AM. `,
            '',
            { type: "text" });

          switch (minute) {
            case 0: question.Answer = maths.hourOn(hour, false); break;
            case 5: case 10: case 20: case 25: question.Answer = `${minute} past ${maths.hourPast(hour)}`; break;
            case 15: question.Answer = `quarter past ${maths.hourPast(hour)}`; break;
            case 30: question.Answer = `half past ${maths.hourPast(hour)}`; break;
            case 35: case 40: case 50: case 55: question.Answer = `${60 - minute} to ${maths.hourTo(hour + 1)}`; break;
            case 45: question.Answer = `quarter to ${maths.hourTo(hour + 1)}`; break;
          }

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsTimeDigitalToDescription12HPM = () => {
    let hours = [], minutes = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
      case 5: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
      default: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
    }

    if (hours.length > 0 && minutes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let hour = maths.randomElement(hours);
        let minute = maths.randomElement(minutes);

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.TimeDigitalOperation,
            `Describe ${(hour === 12 ? hour : hour - 12).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} PM. `,
            '',
            { type: "text" });

          switch (minute) {
            case 0: question.Answer = maths.hourOn(hour, false); break;
            case 5: case 10: case 20: case 25: question.Answer = `${minute} past ${maths.hourPast(hour)}`; break;
            case 15: question.Answer = `quarter past ${maths.hourPast(hour)}`; break;
            case 30: question.Answer = `half past ${maths.hourPast(hour)}`; break;
            case 35: case 40: case 50: case 55: question.Answer = `${60 - minute} to ${maths.hourTo(hour + 1)}`; break;
            case 45: question.Answer = `quarter to ${maths.hourTo(hour + 1)}`; break;
          }

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.hourOn = (hour, analogue) => {
    switch (hour) {
      case 0: return 'midnight';
      case 12: return 'midday';
      default: return `${hour % 12} ${(analogue ? "o'clock" : (hour < 12 ? 'am' : 'pm'))}`;
    }
  };

  this.hourPast = (hour) => {
    switch (hour) {
      case 0: return 'midnight';
      case 12: return 'midday';
      default: return `${hour % 12} ${hour < 12 ? 'am' : 'pm'}`;
    }
  };

  this.hourTo = (hour) => {
    switch (hour) {
      case 12: return 'midday';
      case 24: return 'midnight';
      default: return `${hour % 12} ${hour < 12 ? 'am' : 'pm'}`;
    }
  };

  this.initQuestionsLengthConversion = () => {
    let modes = [], mode;
    switch (maths.Grade) {
      case 1:
      case 2:
      case 3:
        break;
      default:
        ["cm to mm", "m to cm", "m to mm", "km to m", "mm to cm", "mm to m", "cm to m", "m to km", "cm, mm to mm"];
        break;
    }

    if (modes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let as = [], bs = [];

        switch (maths.Grade) {
          case 1: break;
          case 2: break;
          case 3: break;
          case 4: mode = maths.randomInteger(0, modes.length - 1); break;
          case 5: mode = maths.randomInteger(0, modes.length - 1); break;
          default: mode = maths.randomInteger(0, modes.length - 1); break;
        }

        switch (maths.Grade) {
          case 1:
          case 2:
          case 3: break;
          case 4:
          case 5:
          default:
            switch (mode) {
              case 0: maths.fillArray(as, 0, 10); break;
              case 1: maths.fillArray(as, 0, 10); break;
              case 2: maths.fillArray(as, 0, 10); break;
              case 3: maths.fillArray(as, 0, 10); break;
              case 4: maths.fillArray(as, 0, 100, 10); break;
              case 5: maths.fillArray(as, 0, 10000, 1000); break;
              case 6: maths.fillArray(as, 0, 1000, 100); break;
              case 7: maths.fillArray(as, 0, 10000); break;
              case 8: maths.fillArray(as, 0, 10); maths.fillArray(bs, 0, 10); break;
            }
            break;
        }

        let a = maths.randomElement(as);
        let b = bs.length + 0 ? maths.randomElement(bs) : null;

        let answer, questionText;
        switch (mode) {
          case 0: answer = a * 10; questionText = `${a}cm = ?mm `; break;
          case 1: answer = a * 100; questionText = `${a}m = ?cm `; break;
          case 2: answer = a * 1000; questionText = `${a}m = ?mm `; break;
          case 3: answer = a * 1000; questionText = `${a}km = ?m `; break;
          case 4: answer = a / 10; questionText = `${a}mm = ?cm `; break;
          case 5: answer = a / 1000; questionText = `${a}mm = ?m `; break;
          case 6: answer = a / 100; questionText = `${a}cm = ?m `; break;
          case 7: answer = a / 1000; questionText = `${a}m = ?km `; break;
          case 8: answer = a * 10 + b; questionText = `${a}cm ${b}mm = ?mm `; break;
        }

        if (as.length) {
          let isValid = true;

          if (isValid) {
            let question = new MathsQuestion(
              maths.Grade,
              maths.LengthConversionOperation,
              questionText,
              answer,
              { type: "number" });

            questions.push(question);
          }
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsLengthAddition = () => {
    let cms = [], mm1s = [], mm2s = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(cms, 0, 10); maths.fillArray(mm1s, 0, 10); maths.fillArray(mm2s, 0, 10); break;
      case 5: maths.fillArray(cms, 0, 10); maths.fillArray(mm1s, 0, 10); maths.fillArray(mm2s, 0, 10); break;
      default: maths.fillArray(cms, 0, 10); maths.fillArray(mm1s, 0, 10); maths.fillArray(mm2s, 0, 10); break;
    }

    if (cms.length > 0 && mm1s.length > 0 && mm2s.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let cm = maths.randomElement(cms);
        let mm1 = maths.randomElement(mm1s);
        let mm2 = maths.randomElement(mm2s);

        let sum = [`${cm}cm`, `${mm1}mm`, `${mm2}mm`];
        sum.sort(() => Math.random() < 0.5 ? -1 : 1);

        let answer = cm * 10 + mm1 + mm2;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.LengthAdditionOperation,
            `${sum.join(' + ')} = ?mm `,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsAreaUnits = () => {
    let heights = [], widths = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      case 5: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      default: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
    }

    if (heights.length > 0 && widths.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let height = maths.randomElement(heights);
        let width = maths.randomElement(widths);

        let answer = height * width;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.AreaUnitsOperation,
            `What is the area of a ${height}cm x ${width}cm block in cm<sup>2</sup>? `,
            answer,
            { type: "number" });

          questions.push(question);

          let block = [
            '<table>',
            '  <tbody>',
            `    <tr><td class="text-center">${width}cm</td></tr>`,
            '    <tr>',
            `      <td class="border" style="height: ${30 * height}px; width: ${30 * width}px"></td>`,
            `      <td class="align-middle">&nbsp;${height}cm</td>`,
            '    </tr>',
            '  </tbody>',
            '</table>'];

          question = new MathsQuestion(
            maths.Grade,
            maths.AreaUnitsOperation,
            `What is the area in cm<sup>2</sup>?${block.join('')}<br/>`,
            answer,
            { type: "number" }
          );

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsArea2D = () => {
    let heights = [], widths = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      case 5: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      default: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
    }

    if (heights.length > 0 && widths.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let height = maths.randomElement(heights);
        let width = maths.randomElement(widths);

        let answer = height * width;

        let isValid = true;

        if (isValid) {
          let block = [];
          block.push('<table>');
          block.push('  <tbody>');
          for (let h = 0; h < height; h++) {
            block.push('    <tr>');
            for (let w = 0; w < width; w++) {
              block.push('    <td class="border" style="height: 30px; width: 30px">');
              block.push('    </td>');
            }
            block.push('    </tr>');
          }
          block.push('  </tbody>');
          block.push('</table>');

          let question = new MathsQuestion(
            maths.Grade,
            maths.Area2DOperation,
            `What is the area in sq<sup>2</sup>?${block.join('')}<br/>`,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsPerimeterUnits = () => {
    let heights = [], widths = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      case 5: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      default: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
    }

    if (heights.length > 0 && widths.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let height = maths.randomElement(heights);
        let width = maths.randomElement(widths);

        let answer = (height + width) * 2;

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.PerimeterUnitsOperation,
            `What is the perimeter of a ${height}cm x ${width}cm block in cm? `,
            answer,
            { type: "number" });

          questions.push(question);

          let block = [
            '<table>',
            '  <tbody>',
            `    <tr><td class="text-center">${width}cm</td></tr>`,
            '    <tr>',
            `      <td class="border" style="height: ${30 * height}px; width: ${30 * width}px"></td>`,
            `      <td class="align-middle">&nbsp;${height}cm</td>`,
            '    </tr>',
            '  </tbody>',
            '</table>'];

          question = new MathsQuestion(
            maths.Grade,
            maths.PerimeterUnitsOperation,
            `What is the perimeter in cm?${block.join('')}<br/>`,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsPerimeter2D = () => {
    let heights = [], widths = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      case 5: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
      default: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
    }

    if (heights.length > 0 && widths.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let height = maths.randomElement(heights);
        let width = maths.randomElement(widths);

        let answer = (height + width) * 2;

        let isValid = true;

        if (isValid) {
          let block = [];
          block.push('<table>');
          block.push('  <tbody>');
          for (let h = 0; h < height; h++) {
            block.push('    <tr>');
            for (let w = 0; w < width; w++) {
              block.push('    <td class="border" style="height: 30px; width: 30px">');
              block.push('    </td>');
            }
            block.push('    </tr>');
          }
          block.push('  </tbody>');
          block.push('</table>');

          let question = new MathsQuestion(
            maths.Grade,
            maths.Perimeter2DOperation,
            `What is the perimeter?${block.join('')}<br/>`,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsBODMAS = () => {
    // https://www.splashlearn.com/math-vocabulary/division/division

    let values = [], forms = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: break;
      case 5: break;
      default: maths.fillArray(values, 0, 12); forms = ['a * b + c * d', 'a * b - c * d', 'a * b + c', 'a * b - c', 'a + b * c', , 'a - b * c']; break;
    }

    if (values.length > 0 && forms.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let a = maths.randomElement(values);
        let b = maths.randomElement(values);
        let c = maths.randomElement(values);
        let d = maths.randomElement(values);
        let form = maths.randomInteger(0, forms.length - 1);

        let answer, questionText;
        switch (form) {
          case 0: answer = a * b + c * d; questionText = `${a} ${maths.MultiplicationOperation.Symbol} ${b} ${maths.AdditionOperation.Symbol} ${c} ${maths.MultiplicationOperation.Symbol} ${d} = `; break;
          case 1: answer = a * b - c * d; questionText = `${a} ${maths.MultiplicationOperation.Symbol} ${b} ${maths.SubtractionOperation.Symbol} ${c} ${maths.MultiplicationOperation.Symbol} ${d} = `; break;
          case 2: answer = a * b + c; questionText = `${a} ${maths.MultiplicationOperation.Symbol} ${b} ${maths.AdditionOperation.Symbol} ${c} = `; break;
          case 3: answer = a * b - c; questionText = `${a} ${maths.MultiplicationOperation.Symbol} ${b} ${maths.SubtractionOperation.Symbol} ${c} = `; break;
          case 4: answer = a + b * c; questionText = `${a} ${maths.AdditionOperation.Symbol} ${b} ${maths.MultiplicationOperation.Symbol} ${c} = `; break;
          case 5: answer = a - b * c; questionText = `${a} ${maths.SubtractionOperation.Symbol} ${b} ${maths.MultiplicationOperation.Symbol} ${c} = `; break;
        }

        let isValid = true;

        if (isValid) {
          let question = new MathsQuestion(
            maths.Grade,
            maths.BODMASOperation,
            questionText,
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsPercentage = () => {
    let numerators = [], denominators = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: break;
      case 5: break;
      default: maths.fillArray(numerators, 0, 50); denominators = [5, 10, 20, 25, 50]; break;
    }

    if (numerators.length > 0 && denominators.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let denominator = maths.randomElement(denominators);
        let numerator = maths.randomElement(numerators.filter(n => n <= denominator));
        let answer = (100 / denominator) * numerator;

        let isValid = true;

        if (isValid) {
          let questionText = [
            `${numerator}&frasl;${denominator} as a % = `,
            `Write ${numerator} out of ${denominator} as a percentage. `,
            `If you scored ${numerator} marks out of a total of ${denominator}, what is your percentage score? `];

          let question = new MathsQuestion(
            maths.Grade,
            maths.PercentageOperation,
            maths.randomElement(questionText),
            answer,
            { type: "number" });

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsFraction = () => {
    let modes = [];

    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: break;
      case 5: break;
      default:
        modes = [
          'Express {percentage}% as a fraction in its simplest form. ',
          'Express {whole} {numerators[0]}&frasl;{denominators[0]} as an improper fraction. ',
          'Find the lowest common denominator for the following addition: {numerators[0]}&frasl;{denominators[0]} + {numerators[1]}&frasl;{denominators[1]}. ',
          'Compare {lhs} <u>&nbsp;&nbsp;</u> {rhs} using <, > or =. ',
          'Express {values[0]} as a fraction of {values[1]}. Simplify your answer. ',
          'If {numerators[0]}&frasl;{denominators[0]} = <sup>x</sup>&frasl;<sub>{denominators[1]}</sub>, what is the value of x? ',
          'If <sup>x</sup>&frasl;<sub>{denominators[0]}</sub> = {numerators[1]}&frasl;{denominators[1]}, what is the value of x? ',
          'Arrange these fractions from smallest to largest: {numerators[0]}&frasl;{denominators[0]}, {numerators[1]}&frasl;{denominators[1]}, {numerators[2]}&frasl;{denominators[2]}, {numerators[3]}&frasl;{denominators[3]}: ',
          '{whole} = <sup>x</sup>&frasl;<sub>{denominators[0]}</sub>. What is the value of x? ',
          'How many {denominators[0]} are there in {whole} whole units? ',
          'Find the missing values in the following set of equivalent fractions: <sup>{numerators[0]}</sup>&frasl;<sub>{denominators[0]}</sub> = <sup>{numerators[1]}</sup>&frasl;<sub>{denominators[1]}</sub> = <sup>{numerators[2]}</sup>&frasl;<sub>{denominators[2]}</sub>. What is the value of {variable}? '
        ];
        break;
    }

    if (modes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let mode = maths.randomElement(modes);
        let denominators = [], numerators = [];
        let percentage, whole, decimal, values = [], lcm;
        let questionText, answer, type, extraInfo = null;

        let isValid = true;

        switch (mode) {
          case 'Express {percentage}% as a fraction in its simplest form. ':
            percentage = maths.randomElement(maths.fillArray([], 5, 100, 5));
            denominators[0] = maths.lowestCommonDenominator(percentage, 100);
            numerators[0] = (percentage / 100) * denominators[0];

            questionText = mode.replace('{percentage}', percentage);
            answer = `${numerators[0]}/${denominators[0]}`;
            type = 'text';
            break;
          case 'Express {whole} {numerators[0]}&frasl;{denominators[0]} as an improper fraction. ':
            whole = maths.randomInteger(1, 5);
            denominators[0] = maths.randomInteger(2, 5);
            numerators[0] = maths.randomInteger(1, denominators[0] - 1);

            questionText = mode
              .replace('{whole}', whole)
              .replace('{numerators[0]}', numerators[0])
              .replace('{denominators[0]}', denominators[0]);

            numerators[1] = (whole * denominators[0]) + numerators[0];
            denominators[1] = maths.lowestCommonDenominator(numerators[1], denominators[0]);

            answer = `${numerators[1]}/${denominators[1]}`;
            type = 'text';
            break;
          case 'Find the lowest common denominator for the following addition: {numerators[0]}&frasl;{denominators[0]} + {numerators[1]}&frasl;{denominators[1]}. ':
            denominators[0] = maths.randomInteger(2, 10);
            numerators[0] = maths.randomInteger(1, denominators[0]);
            denominators[1] = maths.randomInteger(2, 10);
            numerators[1] = maths.randomInteger(1, denominators[1]);

            questionText = mode
              .replace('{numerators[0]}', numerators[0])
              .replace('{denominators[0]}', denominators[0])
              .replace('{numerators[1]}', numerators[1])
              .replace('{denominators[1]}', denominators[1]);

            answer = maths.lowestCommonDenominator((numerators[0] * denominators[1]) + (numerators[1] * denominators[0]), denominators[0] * denominators[1]);
            type = 'number';
            break;
          case 'Compare {lhs} <u>&nbsp;&nbsp;</u> {rhs} using <, > or =. ':
            denominators[0] = maths.randomInteger(2, 10);
            numerators[0] = maths.randomInteger(0, denominators[0] - 1);
            decimal = maths.randomInteger(0, 10) / 10;

            switch (maths.randomInteger(0, 1)) {
              case 0:
                questionText = mode.replace('{lhs}', `${numerators[0]}&frasl;${denominators[0]}`).replace('{rhs}', decimal);
                answer = (numerators[0] / denominators[0]) - decimal;
                break;
              default:
                questionText = mode.replace('{lhs}', decimal).replace('{rhs}', `${numerators[0]}&frasl;${denominators[0]}`);
                answer = decimal - (numerators[0] / denominators[0]);
                break;
            }

            switch (true) {
              case answer < 0: answer = '<'; break;
              case answer > 0: answer = '>'; break;
              default: answer = '='; break;
            }
            type = 'text';
            break;
          case 'Express {values[0]} as a fraction of {values[1]}. Simplify your answer. ':
            values[1] = maths.randomInteger(10, 50) * 10;
            values[0] = maths.randomInteger(1, (values[1] / 10) - 1) * 10;

            questionText = mode.replace('{values[0]}', maths.centsToRands(values[0])).replace('{values[1]}', maths.centsToRands(values[1]));

            denominators[0] = maths.lowestCommonDenominator(values[0], values[1]);
            numerators[0] = values[0] / (values[1] / denominators[0]);

            answer = `${numerators[0]}/${denominators[0]}`;
            type = 'text';
            break;
          case 'If {numerators[0]}&frasl;{denominators[0]} = <sup>x</sup>&frasl;<sub>{denominators[1]}</sub>, what is the value of x? ':
            denominators[0] = maths.randomInteger(2, 10);
            numerators[0] = maths.randomInteger(1, denominators[0]);
            denominators[1] = maths.lowestCommonDenominator(numerators[0], denominators[0]);
            denominators[1] = maths.randomElement(maths.fillArray([], denominators[1], denominators[1] * 10, denominators[1]));

            questionText = mode
              .replace('{numerators[0]}', numerators[0])
              .replace('{denominators[0]}', denominators[0])
              .replace('{denominators[1]}', denominators[1]);

            answer = numerators[0] / (denominators[0] / denominators[1]);
            type = 'number';
            break;
          case 'If <sup>x</sup>&frasl;<sub>{denominators[0]}</sub> = {numerators[1]}&frasl;{denominators[1]}, what is the value of x? ':
            denominators[1] = maths.randomElement(maths.fillArray([], 10, 50).filter(v => v % 2 === 0 || v % 3 === 0 || v % 5 === 0 || v % 7 === 0));
            numerators[1] = maths.randomElement(maths.fillArray([], 2, denominators[1] - 1).filter(v => denominators[1] % v === 0));
            denominators[0] = maths.lowestCommonDenominator(numerators[1], denominators[1]);
            denominators[0] = maths.randomElement(maths.fillArray([], denominators[0], denominators[1] - denominators[0], denominators[0]));

            questionText = mode
              .replace('{denominators[0]}', denominators[0])
              .replace('{numerators[1]}', numerators[1])
              .replace('{denominators[1]}', denominators[1]);

            answer = numerators[1] / (denominators[1] / denominators[0]);
            type = 'number';
            break;
          case 'Arrange these fractions from smallest to largest: {numerators[0]}&frasl;{denominators[0]}, {numerators[1]}&frasl;{denominators[1]}, {numerators[2]}&frasl;{denominators[2]}, {numerators[3]}&frasl;{denominators[3]}: ':
            denominators[0] = maths.randomInteger(2, 10); numerators[0] = maths.randomInteger(0, denominators[0]);
            denominators[1] = maths.randomInteger(2, 10); numerators[1] = maths.randomInteger(0, denominators[1]);
            denominators[2] = maths.randomInteger(2, 10); numerators[2] = maths.randomInteger(0, denominators[2]);
            denominators[3] = maths.randomInteger(2, 10); numerators[3] = maths.randomInteger(0, denominators[3]);

            lcm = maths.lowestCommonMultiple([denominators[0], denominators[1], denominators[2], denominators[3]]);

            isValid = lcm <= 100;

            if (isValid) {
              questionText = mode
                .replace('{numerators[0]}', numerators[0]).replace('{denominators[0]}', denominators[0])
                .replace('{numerators[1]}', numerators[1]).replace('{denominators[1]}', denominators[1])
                .replace('{numerators[2]}', numerators[2]).replace('{denominators[2]}', denominators[2])
                .replace('{numerators[3]}', numerators[3]).replace('{denominators[3]}', denominators[3]);

              extraInfo = `with lowest common multiplier of ${lcm}`;

              answer = [
                [numerators[0], denominators[0]],
                [numerators[1], denominators[1]],
                [numerators[2], denominators[2]],
                [numerators[3], denominators[3]]];

              answer.sort((a, b) => (a[0] / a[1]) - (b[0] / b[1]));
              answer = answer.map(f => `${f[0]}/${f[1]}`).join(', ');
              type = 'text';
            }
            break;
          case '{whole} = <sup>x</sup>&frasl;<sub>{denominators[0]}</sub>. What is the value of x? ':
            whole = maths.randomInteger(1, 10);
            denominators[0] = maths.randomInteger(2, 10);

            questionText = mode
              .replace('{whole}', whole)
              .replace('{denominators[0]}', denominators[0]);

            answer = whole * denominators[0];
            type = 'number';
            break;
          case 'How many {denominators[0]} are there in {whole} whole units? ':
            denominators[0] = maths.randomElement([2, 3, 4, 5, 10]);
            whole = maths.randomElement(maths.fillArray([], 2, 5).filter(v => (v * 10) % denominators[0] === 0));

            questionText = mode.replace('{whole}', whole);
            switch (denominators[0]) {
              case 2: questionText = questionText.replace('{denominators[0]}', 'halves'); break;
              case 3: questionText = questionText.replace('{denominators[0]}', 'thirds'); break;
              case 4: questionText = questionText.replace('{denominators[0]}', 'quarters'); break;
              case 5: questionText = questionText.replace('{denominators[0]}', 'fifths'); break;
              case 10: questionText = questionText.replace('{denominators[0]}', 'tenths'); break;
            }

            answer = whole * denominators[0];
            type = 'number';
            break;
          case 'Find the missing values in the following set of equivalent fractions: <sup>{numerators[0]}</sup>&frasl;<sub>{denominators[0]}</sub> = <sup>{numerators[1]}</sup>&frasl;<sub>{denominators[1]}</sub> = <sup>{numerators[2]}</sup>&frasl;<sub>{denominators[2]}</sub>. What is the value of {variable}? ':
            denominators[0] = maths.randomInteger(2, 20); values[1] = denominators[0];
            numerators[0] = maths.randomInteger(1, denominators[0] - 1); values[0] = numerators[0];
            denominators[1] = denominators[0] * maths.randomInteger(2, 4); values[3] = denominators[1];
            numerators[1] = (denominators[1] / denominators[0]) * numerators[0]; values[2] = numerators[1];
            denominators[2] = denominators[1] * maths.randomInteger(2, 4); values[5] = denominators[2];
            numerators[2] = (denominators[2] / denominators[1]) * numerators[1]; values[4] = numerators[2];

            let a = maths.randomInteger(0, 5), b;
            for (b = maths.randomInteger(0, 5); b === a; b = maths.randomInteger(0, 5)) { }
            let variable = maths.randomInteger(0, 1);

            questionText = mode
              .replace('{numerators[0]}', a === 0 ? 'a' : b === 0 ? 'b' : numerators[0])
              .replace('{denominators[0]}', a === 1 ? 'a' : b === 1 ? 'b' : denominators[0])
              .replace('{numerators[1]}', a === 2 ? 'a' : b === 2 ? 'b' : numerators[1])
              .replace('{denominators[1]}', a === 3 ? 'a' : b === 3 ? 'b' : denominators[1])
              .replace('{numerators[2]}', a === 4 ? 'a' : b === 4 ? 'b' : numerators[2])
              .replace('{denominators[2]}', a === 5 ? 'a' : b === 5 ? 'b' : denominators[2])
              .replace('{variable}', variable === 0 ? 'a' : 'b');

            answer = variable === 0 ? values[a] : values[b];
            type = 'number';
            break;
          default: throw new Error(`Unknown mode: ${mode}`);
        }

        if (isValid) {
          question = new MathsQuestion(
            maths.Grade,
            maths.FractionOperation,
            questionText,
            answer,
            { type: type },
            null,
            extraInfo);

          questions.push(question);
        }
      }

      maths.Questions.push(...questions);
    }
  };

  this.initQuestionsRatio = () => {
    let modes = [];

    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: break;
      case 5: break;
      default:
        modes = [
          'Reduce the ratio {numerator}:{denominator} to its simplest form. '
        ];
        break;
    }

    if (modes.length > 0) {
      let questions = [];
      while (questions.length < maths.QuestionsPerOperation) {
        let mode = maths.randomElement(modes);
        let numerator, denominator;
        let lcd;
        let questionText, answer, type;

        switch (mode) {
          case 'Reduce the ratio {numerator}:{denominator} to its simplest form. ':
            denominator = maths.randomElement(maths.fillArray([], 4, 50).filter(v => v % 2 === 0 || v % 3 === 0 || v % 5 === 0 % v % 7 === 0));
            numerator = maths.randomElement(maths.fillArray([], 2, denominator - 1).filter(v => maths.lowestCommonDenominator(v, denominator) !== denominator));

            questionText = mode
              .replace('{numerator}', numerator)
              .replace('{denominator}', denominator);

            lcd = maths.lowestCommonDenominator(numerator, denominator);
            answer = `${numerator / (denominator / lcd)}/${lcd}`;

            type = 'text';
            break;
          default: throw new Error(`Unknown mode: ${mode}`);
        }

        question = new MathsQuestion(
          maths.Grade,
          maths.RatioOperation,
          questionText,
          answer,
          { type: type });

        questions.push(question);
      }

      maths.Questions.push(...questions);
    }
  };

  this.randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  this.randomElement = (a) => a[maths.randomInteger(0, a.length - 1)];

  this.fillArray = (a, min, max, step, randomCount) => {
    step = step || 1;

    if (randomCount) {
      while (a.length < randomCount) {
        let n = maths.randomInteger(min, max);
        if (a.indexOf(n) === -1) { a.push(n); }
      }
    } else {
      for (let i = min; i <= max; i += step) {
        a.push(i);
      }
    }

    return a;
  };

  this.lowestCommonDenominator = (numerator, denominator) => {
    if (denominator === 0) { return 0; }
    if (numerator === 0) { return 1; }
    let gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    let divisor = gcd(numerator, denominator);
    return denominator / divisor;
  }

  this.lowestCommonMultiple = (numbers) => {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

    return numbers.reduce((lcm, num) => {
      if (num === 0) {
        throw new Error("Cannot calculate LCM for zero.");
      }
      return Math.abs(lcm * num) / gcd(lcm, num);
    });
  };

  this.centsToRands = (cents) => {
    if (cents < 100) {
      return `${cents} cents`;
    } else {
      return `R${Math.floor(cents / 100)}.${(cents % 100).toString().padStart(2, '0')}`;
    }
  };

  this.Init();
}

function MathsQuestion(grade, mathsOperation, question, answer, inputProperties, inputAttributes, extraInfo) {
  let mathsQuestion = this;

  this.Grade = grade;
  this.MathsOperation = mathsOperation;
  this.Question = question;
  this.Answer = answer;
  this.InputProperties = inputProperties;
  this.InputAttributes = inputAttributes;
  this.ExtraInfo = extraInfo;

  this.PlayerAnswer = null;

  this.Correct = () => {
    switch (mathsQuestion.InputProperties.type) {
      case "text": return mathsQuestion.PlayerAnswer.toLowerCase() === mathsQuestion.Answer.toLowerCase();
      default: return mathsQuestion.PlayerAnswer === mathsQuestion.Answer;
    }
  };
}

function MathsOperation(grade, description, symbol) {
  this.Grade = grade;
  this.Description = description;
  this.Symbol = symbol;
}