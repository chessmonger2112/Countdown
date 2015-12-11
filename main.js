      var app = {};
      var initTotalSeconds;
      var totalSeconds;
      var initMinute;
      var initSecond;

      var Time = Backbone.Model.extend({
        defaults: {
          minute: 0,
          second: 0
        },
          initialize: function(){
        },
          restart: function(){
            totalSeconds = initTotalSeconds;
            time.set({minute:initMinute,second:initSecond});
            $("#display").text("Minute is " + initMinute + " Second is " + initSecond);
          time.pause();
          },
          pause: function(){
            clearInterval(myInterval);
            $("#start").css("visibility","visible");
            $("#pause").css("visibility","hidden");
          },
          validate1: function(){ //ask Matt what up with validate
            var input = $("#alarm").val();
            var numOfChars = input.length;
            var minute = "";
            var second = "";
            if(numOfChars > 4 || input ==="")
            {
              $("#error").text("Not a valid input. Must be in MM:SS");
            }
            else
            {
              var validNumber = true; //use regex here
              function validateStr()
              {
                for(var i = 0; i < numOfChars; i ++)
                {
                  var currentNum = Number(input[i]);
                  if (currentNum % 1 !==0)
                  {
                    return false;
                  }
                  return true;
                }
              }

              if (validateStr())
              {
                $("#error").text("");
                function reverseStr(string)
                {
                  var array = string.split("");
                  array.reverse();
                  string = array.join("");
                  return string;
                }

                input = reverseStr(input);
                createMinAndSec();
                function createMinAndSec()
                {
                  for(var i = 0; i < numOfChars; i ++)
                  {
                    var currentNum = input[i];
                    if (i <= 1)
                    {
                      second += currentNum;
                    }
                    else
                    {
                      minute += currentNum
                    }
                  }
                }
                minute = reverseStr(minute);
                second = reverseStr(second);
              }
              else
              {
                $("#error").text("Please enter an integer value"); //more descripitive
              }
              minute = Number(minute);
              second = Number(second); //be in the model
              initMinute = minute;
              initSecond = second;
              initTotalSeconds = minute * 60 + second;
              totalSeconds = initTotalSeconds;
              time = new Time({minute:initMinute,second:initSecond});
              $(".appear").show();
              $(".disappear").css("visibility","hidden");
            }
          },
          start: function(){
            myInterval = setInterval(function(){
              if (totalSeconds >= 0)
              {
                var minute = time.get("minute");
                var second = time.get("second");
                $("#display").text("Minute is " + minute + " Second is " + second);
                totalSeconds += -1;
                if (second === 0)
                {
                  minute += -1;
                  second = 60;
                }
                second += -1;
                time.set({minute:minute,second:second});
              }
            },1000);
          }
        });

      var time = new Time;

      app.AppView = Backbone.View.extend({
        el: '#container',
        initialize: function () {
        },
        events: {
          "click #start": "start",
          "click #pause": "pause",
          "click #reset" : "reset",
          "click #enter" :"enter"
        },
        pause:function(){
          time.pause();
        },
        enter:function(){
          time.validate1();
        },
        reset:function(){
          time.restart();
        },
        start:function(){
          $("#start").css("visibility","hidden");
          $("#pause").css("visibility","visible");
          time.start();
        }
      });

      app.appView = new app.AppView();
