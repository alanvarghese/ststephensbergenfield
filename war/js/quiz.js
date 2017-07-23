var questionAnswers = {
  group1: {
    question1: 'This is question1',
    answer1: 'This is answer 1',
    question2: 'This is question2',
    answer2: 'This is answer 2',
    question3: 'This is question3',
    answer3: 'This is answer 3',
    question4: 'This is question4',
    answer4: 'This is answer 4',
    question5: 'This is question5',
    answer5: 'This is answer 5'
  },
  group2: {
    question1: 'This is question1',
    answer1: 'This is answer 1',
    question2: 'This is question2',
    answer2: 'This is answer 2',
    question3: 'This is question3',
    answer3: 'This is answer 3',
    question4: 'This is question4',
    answer4: 'This is answer 4',
    question5: 'This is question5',
    answer5: 'This is answer 5'
  },
  group3: {
    question1: 'This is question1',
    answer1: 'This is answer 1',
    question2: 'This is question2',
    answer2: 'This is answer 2',
    question3: 'This is question3',
    answer3: 'This is answer 3',
    question4: 'This is question4',
    answer4: 'This is answer 4',
    question5: 'This is question5',
    answer5: 'This is answer 5'
  },
  group4: {
    question1: 'This is question1',
    answer1: 'This is answer 1',
    question2: 'This is question2',
    answer2: 'This is answer 2',
    question3: 'This is question3',
    answer3: 'This is answer 3',
    question4: 'This is question4',
    answer4: 'This is answer 4',
    question5: 'This is question5',
    answer5: 'This is answer 5'
  },
  group5: {
    question1: 'This is question1',
    answer1: 'This is answer 1',
    question2: 'This is question2',
    answer2: 'This is answer 2',
    question3: 'This is question3',
    answer3: 'This is answer 3',
    question4: 'This is question4',
    answer4: 'This is answer 4',
    question5: 'This is question5',
    answer5: 'This is answer 5'
  }

};
var scores = {
  group1: {
    answer1: '500',
    answer2: '400',
    answer3: '300',
    answer4: '200',
    answer5: '100',
  },
  group2: {
    answer1: '500',
    answer2: '400',
    answer3: '300',
    answer4: '200',
    answer5: '100',
  },

  group3: {
    answer1: '500',
    answer2: '400',
    answer3: '300',
    answer4: '200',
    answer5: '100',
  },

  group4: {
    answer1: '500',
    answer2: '400',
    answer3: '300',
    answer4: '200',
    answer5: '100',
  },

  group5: {
    answer1: '500',
    answer2: '400',
    answer3: '300',
    answer4: '200',
    answer5: '100',
  },


};



function question(group, number) {
  var teamName = $('input:radio[name=teamname]:checked').val();
  if ((teamName == 'girls') || (teamName == "boys")) {
    $("#question").html('This is a question ' + questionAnswers[$(this).attr('grp')][$(this).attr('qst')]);
    //
    $("#question").dialog();
    if (teamName == 'girls') {
      $(this).css("background-color", "pink");
      localStorage.setItem($(this).attr('grp') + '_' + $(this).attr('qst'), "pink");

    } else {
      $(this).css("background-color", "lightblue");
      localStorage.setItem($(this).attr('grp') + '_' + $(this).attr('qst'), "lightblue");

    }
  } else {
    alert('Please select Whose turn it is!!');
  }

}

function answer(group, number) {
  $("#question").html('This is an answer ' + questionAnswers[$(this).attr('grp')][$(this).attr('ans')]);
  //
  $("#question").dialog();


  var teamName = $('input:radio[name=scoredteamname]:checked').val();
  var pointsEarned = scores[$(this).attr('grp')][$(this).attr('ans')];
  if (teamName == 'girls') {
    $(this).css("background-color", "pink");
    localStorage.setItem($(this).attr('grp') + '_' + $(this).attr('ans'), "pink");

    $("#girlsscore").val(parseInt($("#girlsscore").val()) + parseInt(pointsEarned));
    localStorage.setItem("girlsscore", $("#girlsscore").val());


  } else if (teamName == 'boys') {
    $(this).css("background-color", "lightblue");
    localStorage.setItem($(this).attr('grp') + '_' + $(this).attr('ans'), "lightblue");

    $("#boysscore").val(parseInt($("#boysscore").val()) + parseInt(pointsEarned));
    localStorage.setItem("boysscore", $("#boysscore").val());
  }

  $('input:radio[name=teamname]').prop('checked', false);
  $('input:radio[name=scoredteamname]').prop('checked', false);

}

var dataSocket = {
  send: function() {},
  fetch: function() {}

};
/*
var dataSocket = {
send : function(data){
  $.get( "quizStateSave.jsp", {"QuizAttr":data});
},
fetch : function () {
  $.get( "quizStateFetch.jsp", function( data ) {
      initializeLocalStorage(data);
      initializeFromLocalStorage();
  });
}
};

*/
/*
var dataSocket = new WebSocket("ws://www.example.com/socketserver");

dataSocket.onopen = function (event) {
  dataSocket.send("{QUIZ1}"); 
};

dataSocket.onmessage = function (event) {
  console.log(event.data);
  initializeLocalStorage(event.data);
  initializeFromLocalStorage();
}

*/


function initializeLocalStorage(data) {
  if (data) {
    var serverState = JSON.parse(data);
    for(key in serverState) {
      localStorage.setItem(key, serverState[key]);
    }

  } else {
    return;
  }


}

function sendLocalStorageToServer() {

  var serverState = {};
  serverState.girlsscore = localStorage.getItem("girlsscore") || 0;
  serverState.boysscore = localStorage.getItem("boysscore") || 0;

  $("#qna td").each(function() {
    if ($(this).attr('ans')) {
      var color = localStorage.getItem($(this).attr('grp') + '_' + $(this).attr('ans'));
      if (color) {
        serverState[$(this).attr('grp') + '_' + $(this).attr('ans')] = color;
      }
    } else if ($(this).attr('qst')) {
      var color = localStorage.getItem($(this).attr('grp') + '_' + $(this).attr('qst'));
      if (color) {

        serverState[$(this).attr('grp') + '_' + $(this).attr('qst')] = color;


      }


    }
  });



  dataSocket.send(JSON.stringify(serverState));

}



function initializeFromLocalStorage() {
  $("#girlsscore").val(localStorage.getItem("girlsscore") || 0);
  $("#boysscore").val(localStorage.getItem("boysscore") || 0);

  $("#qna td").each(function() {
    if ($(this).attr('ans')) {
      var color = localStorage.getItem($(this).attr('grp') + '_' + $(this).attr('ans'));
      if (color) {

        $(this).css("background-color", color);
      }
    } else if ($(this).attr('qst')) {
      var color = localStorage.getItem($(this).attr('grp') + '_' + $(this).attr('qst'));
      if (color) {

        $(this).css("background-color", color);
      }


    }
  });



}

$(function() {


  $('.question').click(question);
  $('.answer').click(answer);

  $("#girlsscore").val(localStorage.getItem("girlsscore") || 0);
  $("#boysscore").val(localStorage.getItem("boysscore") || 0);

  $("#qna td").each(function() {
    if ($(this).attr('ans')) {
      var color = localStorage.getItem($(this).attr('grp') + '_' + $(this).attr('ans'));
      if (color) {

        $(this).css("background-color", color);
      }
    } else if ($(this).attr('qst')) {
      var color = localStorage.getItem($(this).attr('grp') + '_' + $(this).attr('qst'));
      if (color) {

        $(this).css("background-color", color);
      }


    }
  });
  dataSocket.fetch();


})();

