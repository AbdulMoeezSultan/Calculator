function handleKeyDown(event) {
  if (event.key === "Enter") {
    const inputText = event.target.value;
    const stringWithoutSpaces = inputText.replaceAll(" ", "");
    const result = calculateInput(stringWithoutSpaces.toLowerCase());
    displayResult(result);
  }
}


const functions = ["round(", "ceil(", "floor("];

function calculateInput(input) {
  var BeforeFunction;
  var AfterFunction;
  var i;
  var Answer;
  try {
    if (/[a-z]/.test(input)) {
      for (i = 0; i < input.length; i++) {
        var char = input[i];
        if (/[a-z]/.test(char)) {
          break;
        }
      }
      if (i === 0) {
        AfterFunction = input.substring(i);
        var CheckingFunctions = false;
        var foundWord = null;
        for (var j = 0; j < functions.length; j++) {
          var word = functions[j];
          if (AfterFunction.startsWith(word)) {
            foundWord = word;
            CheckingFunctions = true;
            break;
          }
        }
        if (CheckingFunctions === true) {
          var Thefunction = functions[j];
          var Removefunction = input.substring(Thefunction.length - 1);
          Answer = ApplyFunction(Removefunction, j);
          return Answer;
        }
        else {
          throw new Error("Function not found");

        }
      }
      else {
        BeforeFunction = input.substring(0, i);
        AfterFunction = input.substring(i);
        console.log(BeforeFunction);
        console.log(AfterFunction);
        if (/[a-z]/.test(AfterFunction)) {
          var Lastchar = BeforeFunction.length - 1;
          var SignCheck = BeforeFunction[Lastchar];
          if (SignCheck === "(" || SignCheck === "/" || SignCheck === "*" || SignCheck === "+" || SignCheck === "-") {
            var BC = 0;
            for (var m = 0; m < AfterFunction.length; m++) {
              var char = AfterFunction[m];
              if (char === "(") {
                BC++;
              }
              else if (char === ")") {
                BC--;
              }
              if (BC === -1) {
                break;
              }
            }
            if (BC !== -1) {
              return eval(BeforeFunction + calculateInput(AfterFunction));
            }
            else {
              var AfterBracket = AfterFunction.substring(m);
              AfterFunction = AfterFunction.substring(0, m);
              console.log(BeforeFunction);
              console.log(AfterFunction);
              console.log(999);
              console.log(AfterBracket);
              if (/[a-z]/.test(AfterBracket)) {
                var AfterBracketAndSign;
                var RemaingEquation;
                for (n = 0; n < AfterBracket.length; n++) {
                  var char = AfterBracket[n];
                  if (char === "/" || char === "*" || char === "+" || char === "-") {
                    break;
                  }
                }
                AfterBracketAndSign = AfterBracket.substring(0, (n + 1));
                RemaingEquation = AfterBracket.substring((n + 1));
                console.log(AfterBracketAndSign);
                console.log(RemaingEquation);
                return eval(BeforeFunction + calculateInput(AfterFunction) + AfterBracketAndSign + calculateInput(RemaingEquation));
              }
              else {
                return eval(BeforeFunction + calculateInput(AfterFunction) + AfterBracket);
              }
            }
          }
          else {
            throw new Error("Sign Before a Function is missing");
          }
        }
      }
    }
    else {
      return eval(input);
    }
  } catch (error) {
    return "Invalid input";
  }
}


function ApplyFunction(MyString, Position) {
  var TheAnswer;
  console.log(MyString);
  console.log(Position);
  if (/[a-z]/.test(MyString)) {
    TheAnswer = calculateInput(MyString);
    if (Position === 0) {
      TheAnswer = parseInt(Math.round(TheAnswer));
    }
    else if (Position === 1) {
      TheAnswer = parseInt(Math.ceil(TheAnswer));
    }
    else if (Position === 2) {
      TheAnswer = parseInt(Math.floor(TheAnswer));
    }
    console.log(TheAnswer);
    return Math.round(TheAnswer);
  }
  else {
    var Toint;
    Toint = Number(eval(MyString));
    console.log(Toint);
    if (Position === 0) {
      return Math.round(Toint);
    }
    else if (Position === 1) {
      return Math.ceil(Toint);
    }
    else if (Position === 2) {
      return Math.floor(Toint);
    }
  }
}



function displayResult(result) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Result: " + result;
}