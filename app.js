var btnShow = document.querySelector("#btn-show");

var birthdayInput = document.querySelector("#birthday");

var output = document.querySelector("#output");

btnShow.addEventListener("click", clickHandler);

function clickHandler() {
  var birthdayDigits = birthdayInput.value;

  if (birthdayDigits !== "") {
    var date = birthdayDigits.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    var dateStr = convertDateToString(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }
    console.log(isPalindrome);
    if (!isPalindrome) {
      console.log("entered");
      const [flag, nextDate] = getNextPalindromeDate(date);
      console.log(flag);

      output.innerText =
        "The nearest palindrome date is " +
        nextDate.day +
        "-" +
        nextDate.month +
        "-" +
        nextDate.year +
        " and you missed by " +
        flag +
        " days.";
    } else {
      output.innerText = "Yes, Your birthday is palindrome!";
    }
  }
}

function reverseString(input) {
  var values = input.split("");

  var reversedValue = values.reverse().join("");
  return reversedValue;
}

function checkPalindrome(input) {
  var reversedValue = reverseString(input);
  return input === reversedValue;
}

function convertDateToString(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day.toString();
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month.toString();
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getDatesInFormat(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getDatesInFormat(date);
  var palindromeList = [];

  for (var i = 0; i < listOfPalindromes.length; i++) {
    var result = checkPalindrome(listOfPalindromes[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function checkLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}
function getNext(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}
function getNextPalindromeDate(date) {
  var nextDate = getNext(date);
  var flag = 0;

  while (1) {
    flag++;
    var dateStr = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [flag, nextDate];
      }
    }
    nextDate = getNext(nextDate);
  }
}