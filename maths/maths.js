function Maths(grade) {
  let maths = this;

  this.QuestionsPerOperation = 100;
  this.QuestionsPerOperationPerGrade = 100;

  this.AdditionOperation = new MathsOperation(1, 'Addition', '&plus;');
  this.SubtractionOperation = new MathsOperation(1, 'Subtraction', '&minus;');
  this.MultiplicationOperation = new MathsOperation(2, 'Multiplication', '&times;');
  this.DivisionOperation = new MathsOperation(3, 'Division', '&divide;');
  this.FactorOfOperation = new MathsOperation(4, 'Fractions', '&frasl;');
  this.TimeAnalogueOperation = new MathsOperation(4, 'Analogue Time');
  this.TimeDigitalOperation = new MathsOperation(4, 'Digital Time');
  this.LengthConversionOperation = new MathsOperation(4, 'Length Conversion');
  this.LengthAdditionOperation = new MathsOperation(4, 'Length Addition');
  this.AreaUnitsOperation = new MathsOperation(4, 'Unit Area');
  this.Area2DOperation = new MathsOperation(4, '2D Area');
  this.PerimeterUnitsOperation = new MathsOperation(4, 'Unit Perimeter');
  this.Perimeter2DOperation = new MathsOperation(4, '2D Perimeter');
  this.BODMASOperation = new MathsOperation(6, 'BODMAS');

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
      case 6: maths.fillArray(addends, 10000, 1000000, 1, maths.QuestionsPerOperationPerGrade); break;
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
      case 6: maths.fillArray(minuends, 10000, 1000000, 1, maths.QuestionsPerOperationPerGrade); maths.fillArray(subtrahends, 10000, 1000000, 1, maths.QuestionsPerOperationPerGrade); minAnswer = 0; break;
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
      case 6: maths.fillArray(multiplicands, -100, 100); maths.fillArray(multipliers, -100, 100); break;
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
      case 6: maths.fillArray(dividends, -12, 12); maths.fillArray(divisors, -12, 12); break;
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
          case 6: isValid = [0.25, 0.5].indexOf(fraction) > -1; break;
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
      case 6: maths.fillArray(numerators, 1, 12); maths.fillArray(denominators, 2, 12); maths.fillArray(values, -100, 100); break;
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
          case 6: isValid = value % denominator === 0; break;
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
      case 6: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 0, 23); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 0, 11); maths.fillArray(minutes, 0, 55, 5); break;
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
      case 6: maths.fillArray(hours, 12, 23); maths.fillArray(minutes, 0, 55, 5); break;
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
    let modes = ["cm to mm", "m to cm", "m to mm", "km to m", "mm to cm", "mm to m", "cm to m", "m to km", "cm, mm to mm"];

    let questions = [];
    while (questions.length < maths.QuestionsPerOperation) {
      let as = [], bs = [];

      switch (maths.Grade) {
        case 1: break;
        case 2: break;
        case 3: break;
        case 4: mode = maths.randomInteger(0, modes.length - 1); break;
        case 5: mode = maths.randomInteger(0, modes.length - 1); break;
        case 6: mode = maths.randomInteger(0, modes.length - 1); break;
      }

      switch (maths.Grade) {
        case 1:
        case 2:
        case 3: break;
        case 4:
        case 5:
        case 6:
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
  };

  this.initQuestionsLengthAddition = () => {
    let cms = [], mm1s = [], mm2s = [];
    switch (maths.Grade) {
      case 1: break;
      case 2: break;
      case 3: break;
      case 4: maths.fillArray(cms, 0, 10); maths.fillArray(mm1s, 0, 10); maths.fillArray(mm2s, 0, 10); break;
      case 5: maths.fillArray(cms, 0, 10); maths.fillArray(mm1s, 0, 10); maths.fillArray(mm2s, 0, 10); break;
      case 6: maths.fillArray(cms, 0, 10); maths.fillArray(mm1s, 0, 10); maths.fillArray(mm2s, 0, 10); break;
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
      case 6: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
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
      case 6: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
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
      case 6: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
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
      case 6: maths.fillArray(heights, 1, 10); maths.fillArray(widths, 1, 10); break;
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
      case 6: maths.fillArray(values, 0, 12); forms = ['a * b + c * d', 'a * b - c * d', 'a * b + c', 'a * b - c', 'a + b * c', , 'a - b * c']; break;
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

  this.randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  this.randomElement = (a) => a[Math.floor(Math.random() * a.length)];

  this.fillArray = (a, min, max, step, randomCount) => {
    if (step === undefined) { step = 1; }

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
  };

  this.Init();
}

function MathsQuestion(grade, mathsOperation, question, answer, inputProperties, inputAttributes) {
  let mathsQuestion = this;

  this.Grade = grade;
  this.MathsOperation = mathsOperation;
  this.Question = question;
  this.Answer = answer;
  this.InputProperties = inputProperties;
  this.InputAttributes = inputAttributes;

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