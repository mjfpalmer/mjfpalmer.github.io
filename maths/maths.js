function Maths(grade) {
  let maths = this;

  this.QuestionsPerOperation = 100;

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
    maths.Perimeter2DOperation
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

    console.debug(maths.Questions);
  };

  this.InitQuestionsAddition = () => {
    // https://www.splashlearn.com/math-vocabulary/addition/addition
    let minAddend, maxAddend, minAnswer, maxAnswer;

    switch (maths.Grade) {
      case 1: minAddend = 0; maxAddend = 10; minAnswer = 0; maxAnswer = 10; break;
      case 2: minAddend = 0; maxAddend = 20; minAnswer = 0; maxAnswer = 20; break;
      case 3: minAddend = 0; maxAddend = 40; minAnswer = 0; maxAnswer = 40; break;
      case 4: minAddend = 0; maxAddend = 50; minAnswer = 0; maxAnswer = 50; break;
      case 5: minAddend = 0; maxAddend = 1000; minAnswer = 0; maxAnswer = 1000; break;
      case 6: minAddend = 10000; maxAddend = 1000000; minAnswer = 0; maxAnswer = 2000000; break;
    }

    let questions = [];
    while (questions.length < maths.QuestionsPerOperation) {
      let addend1 = Math.floor(Math.random() * (maxAddend - minAddend + 1)) + minAddend;
      let addend2 = Math.floor(Math.random() * (maxAddend - minAddend + 1)) + minAddend;
      let answer = addend1 + addend2;

      if (answer >= minAnswer && answer <= maxAnswer) {
        let question = new MathsQuestion(
          maths.Grade,
          maths.AdditionOperation,
          `${addend1} ${maths.AdditionOperation.Symbol} ${addend2} = `,
          answer,
          { type: "number", min: minAnswer * 2, max: maxAnswer * 2, step: 1 });

        questions.push(question);
      }
    }

    maths.Questions.push(...questions);
  };

  this.InitQuestionsSubtraction = () => {
    // https://www.splashlearn.com/math-vocabulary/addition/addition
    let minMinuend, maxMinuend, minSubtrahend, maxSubtrahend, minAnswer, maxAnswer;

    switch (maths.Grade) {
      case 1: minMinuend = 0; maxMinuend = 10; minSubtrahend = 0; maxSubtrahend = 10; minAnswer = 0; maxAnswer = 10; break;
      case 2: minMinuend = 0; maxMinuend = 20; minSubtrahend = 0; maxSubtrahend = 20; minAnswer = 0; maxAnswer = 20; break;
      case 3: minMinuend = 0; maxMinuend = 40; minSubtrahend = 0; maxSubtrahend = 40; minAnswer = 0; maxAnswer = 40; break;
      case 4: minMinuend = 0; maxMinuend = 50; minSubtrahend = 0; maxSubtrahend = 50; minAnswer = 0; maxAnswer = 50; break;
      case 5: minMinuend = 0; maxMinuend = 1000; minSubtrahend = 0; maxSubtrahend = 1000; minAnswer = 0; maxAnswer = 1000; break;
      case 6: minMinuend = 10000; maxMinuend = 1000000; minSubtrahend = 0; maxSubtrahend = 1000000; minAnswer = 0; maxAnswer = 1000000; break;
    }

    let questions = [];
    while (questions.length < maths.QuestionsPerOperation) {
      let minuend = Math.floor(Math.random() * (maxMinuend - minMinuend + 1)) + minMinuend;
      let subtrahend = Math.floor(Math.random() * (maxSubtrahend - minSubtrahend + 1)) + minSubtrahend;
      let answer = minuend - subtrahend;

      if (answer >= minAnswer && answer <= maxAnswer) {
        let question = new MathsQuestion(
          maths.Grade,
          maths.SubtractionOperation,
          `${minuend} ${maths.SubtractionOperation.Symbol} ${subtrahend} = `,
          answer,
          { type: "number", min: minAnswer * 2, max: maxAnswer * 2, step: 1 });

        questions.push(question);
      }
    }

    maths.Questions.push(...questions);
  };

  this.initQuestionsMultiplication = () => {
    let question;
    let min = -12, max = 12;

    // https://www.splashlearn.com/math-vocabulary/multiplication/multiplication
    for (let multiplicand of new Array(Math.abs(min) + max + 1).fill(0).map((n, i) => i + min)) {
      for (let multiplier of new Array(Math.abs(min) + max + 1).fill(0).map((n, i) => i + min)) {
        question = new MathsQuestion(
          0,
          maths.MultiplicationOperation,
          `${multiplicand} ${maths.MultiplicationOperation.Symbol} ${multiplier} = `,
          multiplicand * multiplier,
          { type: "number", min: max * -3, max: max * 3, step: "" });

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
  };

  this.InitQuestionsDivision = () => {
    let question;
    let min = -12, max = 12;

    // https://www.splashlearn.com/math-vocabulary/division/division
    for (let dividend of new Array(Math.abs(min) + max + 1).fill(0).map((n, i) => i + min)) {
      for (let divisor of new Array(Math.abs(min) + max + 1).fill(0).map((n, i) => i + min)) {
        if (divisor !== 0) {
          let answer = dividend / divisor;
          if (!Number.isInteger(answer)) { answer = answer.toFixed(2); }

          question = new MathsQuestion(
            0,
            maths.DivisionOperation,
            `${dividend} ${maths.DivisionOperation.Symbol} ${divisor} = `,
            answer,
            { type: "number", min: max * -3, max: max * 3, step: "" });

          switch (true) {
            case dividend % divisor !== 0 && (dividend < 0 || divisor < 0): question.Grade = 6; break;
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
  };

  this.initQuestionsFactorOf = () => {
    let question;
    let maxDenominator = 12, minValue = -100, maxValue = 100;

    // Factor Of
    for (let denominator of new Array(maxDenominator - 1).fill(0).map((n, i) => i + 2)) {
      for (let numerator of new Array(denominator).fill(0).map((n, i) => i + 1)) {
        for (let value of new Array(Math.abs(-minValue) + maxValue + 1).fill(0).map((n, i) => i + minValue)) {
          question = new MathsQuestion(
            0,
            maths.FactorOfOperation,
            `${numerator}${maths.FactorOfOperation.Symbol}${denominator} of ${value} = `,
            value / denominator * numerator,
            { type: "number", min: maxValue * -3, max: maxValue * 3, step: "" });

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
  };

  this.initQuestionsTimeAnalogue = () => {
    maths.initQuestionsTimeAnalogueToDigital();
    maths.initQuestionsTimeAnalogueToDigitalAM();
    maths.initQuestionsTimeAnalogueToDigitalPM();
    maths.initQuestionsTimeAnalogueToDescriptionAM();
    maths.initQuestionsTimeAnalogueToDescriptionPM();
  };

  this.initQuestionsTimeAnalogueToDigital = () => {
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
          maths.TimeAnalogueOperation,
          `Convert <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> to digital. `,
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          { type: "text" });

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeAnalogueToDigitalAM = () => {
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
          maths.TimeAnalogueOperation,
          `Convert <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> AM to digital. `,
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          { type: "text" });

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeAnalogueToDigitalPM = () => {
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
          maths.TimeAnalogueOperation,
          `Convert <img src="/images/clocks/${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}.svg" class="clock" /> PM to digital. `,
          `${(hour + 12).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          { type: "text" });

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeAnalogueToDescriptionAM = () => {
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
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

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeAnalogueToDescriptionPM = () => {
    for (let hour = 12; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
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

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeDigital = () => {
    maths.initQuestionsTimeDigitalToAnalogue();
    maths.initQuestionsTimeDigitalToDescription24H();
    maths.initQuestionsTimeDigitalToDescription12HAM();
    maths.initQuestionsTimeDigitalToDescription12HPM();
  };

  this.initQuestionsTimeDigitalToAnalogue = () => {
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
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
          4,
          maths.TimeDigitalOperation,
          `How do you show ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} on a clock?${optionsTable}`,
          String.fromCharCode(65 + options.indexOf(optionCorrect)),
          { type: "text" });

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeDigitalToDescription24H = () => {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
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
      }
    }
  };

  this.initQuestionsTimeDigitalToDescription12HAM = () => {
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
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

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsTimeDigitalToDescription12HPM = () => {
    for (let hour = 12; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        let question = new MathsQuestion(
          4,
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

        // TODO: Set grade

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
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
    let question;

    for (let cm = 0; cm <= 10; cm++) {
      // cm to mm
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${cm}cm  =?mm `, cm * 10, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let m = 0; m <= 10; m++) {
      // m to cm
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${m}m = ?cm `, m * 100, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }

      // m to mm
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${m}m = ?mm `, m * 1000, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let km = 0; km <= 10; km++) {
      // km to m
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${km}km = ?m `, km * 1000, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let mm = 0; mm <= 100; mm += 10) {
      // mm to cm
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${mm}mm = ?cm `, mm / 10, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let mm = 0; mm <= 10000; mm += 1000) {
      // mm to m
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${mm}mm = ?m `, mm / 1000, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let cm = 0; cm <= 1000; cm += 100) {
      // cm to m
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${cm}cm = ?m `, cm / 100, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let m = 0; m <= 10000; m += 1000) {
      // m to km
      question = new MathsQuestion(4, maths.LengthConversionOperation, `${m}m = ?km `, m / 1000, { type: "number", min: 0, max: 10000, step: 1 });
      if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
    }

    for (let cm = 0; cm < 10; cm++) {
      for (let mm = 0; mm < 10; mm++) {
        // cm, mm to mm
        question = new MathsQuestion(4, maths.LengthConversionOperation, `${cm}cm ${mm}mm = ?mm `, cm * 10 + mm, { type: "number", min: 0, max: 10000, step: 1 });
        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsLengthAddition = () => {
    let question;

    for (let cm = 0; cm < 10; cm++) {
      for (let mm1 = 0; mm1 < 10; mm1++) {
        for (let mm2 = 0; mm2 < 10; mm2++) {
          // cm + mm + mm to mm
          let sum = [`${cm}cm`, `${mm1}mm`, `${mm2}mm`];
          sum.sort(() => Math.random() < 0.5 ? -1 : 1);

          question = new MathsQuestion(4, maths.LengthAdditionOperation, `${sum.join(' + ')} = ?mm `, cm * 10 + mm1 + mm2, { type: "number", min: 0, max: 10000, step: 1 });
          if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
        }
      }
    }
  };

  this.initQuestionsAreaUnits = () => {
    let question;

    for (let height = 1; height <= 10; height++) {
      for (let width = 1; width <= 10; width++) {
        question = new MathsQuestion(
          4,
          maths.AreaUnitsOperation,
          `What is the area of a ${height}cm x ${width}cm block in cm<sup>2</sup>? `,
          height * width,
          { type: "number", min: 0, max: 1000, step: 1 }
        );

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }

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
          4,
          maths.AreaUnitsOperation,
          `What is the area in cm<sup>2</sup>?${block.join('')}<br/>`,
          height * width,
          { type: "number", min: 0, max: 1000, step: 1 }
        );

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsArea2D = () => {
    let question;

    for (let height = 1; height <= 10; height++) {
      for (let width = 1; width <= 10; width++) {
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

        question = new MathsQuestion(
          4,
          maths.Area2DOperation,
          `What is the area in sq<sup>2</sup>?${block.join('')}<br/>`,
          height * width,
          { type: "number", min: 0, max: 1000, step: 1 }
        );

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsPerimeterUnits = () => {
    let question;

    for (let height = 1; height <= 10; height++) {
      for (let width = 1; width <= 10; width++) {
        question = new MathsQuestion(
          4,
          maths.PerimeterUnitsOperation,
          `What is the perimeter of a ${height}cm x ${width}cm block in cm? `,
          (height + width) * 2,
          { type: "number", min: 0, max: 1000, step: 1 }
        );

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }

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
          4,
          maths.PerimeterUnitsOperation,
          `What is the perimeter in cm?${block.join('')}<br/>`,
          (height + width) * 2,
          { type: "number", min: 0, max: 1000, step: 1 }
        );

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
      }
    }
  };

  this.initQuestionsPerimeter2D = () => {
    let question;

    for (let height = 1; height <= 10; height++) {
      for (let width = 1; width <= 10; width++) {
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

        question = new MathsQuestion(
          4,
          maths.Perimeter2DOperation,
          `What is the perimeter?${block.join('')}<br/>`,
          (height + width) * 2,
          { type: "number", min: 0, max: 1000, step: 1 }
        );

        if (maths.Grade >= question.Grade) { maths.Questions.push(question); }
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