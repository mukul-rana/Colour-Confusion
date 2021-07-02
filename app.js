const colors = ['red','blue','green','black','yellow','orange','pink','brown','gray']

var randIndex,randI,currentColor,currentTextColor,options,duplicateIndex;
var score;
var currentColor;

var reactionTime, averageReactionTime;
var startTime, endTime;
var count;
var totalTimeTaken;

document.getElementById('start').onclick = function(){
    
    if(document.getElementById('start').innerHTML === 'Start'){
        document.getElementById('start').innerHTML = 'Stop'
        count=20;
        endTime=0;
        document.getElementById('details').innerHTML = `
        <div style='text-align:left;'>
        Last response time : 0 <br>
        Average response time : 0 <br>
        Number of trials left : 20 <br>
        Number of correct responses : 0 <br>
        Number of incorrect responses : 0 <br>
        </div>
        `;
        totalTimeTaken=0;
        game();
        score=0;
    }
    else{
        document.getElementById('start').innerHTML = 'Start'
        document.getElementById('colorDisplay').innerHTML ='Score : ' + score;
        document.getElementById('options').innerHTML = '';
        
    }
}

function game(){
    
    randIndex = Math.floor(Math.random() * colors.length);
     randI = Math.floor(Math.random() * (colors.length-1) ) ;
    currentTextColor = (colors.slice(0,randIndex).concat(colors.slice(randIndex+1))) [randI];

    document.getElementById('colorDisplay').innerHTML = currentTextColor;
    document.getElementById('colorDisplay').style['color'] = colors[randIndex];


    currentColor = colors[randIndex];
    
    
    shuffleArray(colors)
    options = [currentTextColor,currentColor];
    

    for(var i=0;options.length<4 && i<colors.length;i++)
        if( !(colors[i] === currentTextColor || colors[i] === currentColor))
        options.push(colors[i]);

    shuffleArray(options);

    document.getElementById('options').innerHTML = `
    <table>
            <tr><td><button>`+options[0] + `</button></td><td><button>`+options[1] +`</button></td></tr>
            <tr><td><button>`+options[2] +`</button></td><td><button>`+options[3] +`</button></td></tr>
        </table>
    `;

    startTime = new Date().getTime();
    
    $(document).ready(function(){
        $('table button').click(function(){
            if(this.innerHTML === currentColor){
                endTime = new Date().getTime();
                endTime = (endTime-startTime)/1000;
                totalTimeTaken += endTime;
                score++;
            }
            count--;

            document.getElementById('details').innerHTML = `
            <div style='text-align:left;'>
            Last response time : `+endTime + ` <br>
            Average response time : `+ (totalTimeTaken/(20-count)).toFixed(4) +` <br>
            Number of trials left : `+count+` <br>
            Number of correct responses : `+score+` <br>
            Number of incorrect responses : `+ (20-count-score) + ` <br>   
            </div>
            `;
            if(count ==0) {
                
                document.getElementById('start').innerHTML = 'Start'
        document.getElementById('colorDisplay').innerHTML ='Score : ' + score;
        document.getElementById('options').innerHTML = '';
            }
            else
            game();
        });
    });
    
}


//Shuffles the array
function shuffleArray(array) {
    let curId = array.length;
    
    while (0 !== curId) {
      
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }
  