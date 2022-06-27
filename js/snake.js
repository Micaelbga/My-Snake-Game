var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var score = document.getElementById("score")

function draw(color,x,y,width,height){
    context.fillStyle = color
    context.fillRect(x,y,width,height)
}

function backGround(){
    draw("black",0,0,canvas.clientWidth,canvas.clientHeight)
}


class Snake{
    constructor(x,y,direction,rotateX,rotateY){
        this.x = x
        this.y = y
        this.box = 5
        this.direction = direction
        this.rotateX = rotateX
        this.rotateY = rotateY
    }
    drawSnake(){
        draw("white",this.x,this.y,this.box,this.box)
    }
    directionSnake(){
        document.addEventListener('keydown',(event)=>{
            if(this.direction != "ArrowDown" && event.key == "ArrowUp"){
                this.rotateX = 0
                this.rotateY = -5
                this.direction = event.key
            }
            if(this.direction != "ArrowUp" && event.key == "ArrowDown"){
                this.rotateX = 0
                this.rotateY = +5
                this.direction = event.key
            }
            if(this.direction != "ArrowRight" && event.key == "ArrowLeft"){
                this.rotateX = -5
                this.rotateY = 0
                this.direction = event.key
            }
            if(this.direction != "ArrowLeft" && event.key == "ArrowRight"){
                this.rotateX = +5
                this.rotateY = 0
                this.direction = event.key
            }
        })
        
    }
    moveSnake(){
        snake.unshift(new Snake(
            snake[0].x + snake[0].rotateX,
            snake[0].y + snake[0].rotateY,
            snake[0].direction,
            snake[0].rotateX,
            snake[0].rotateY
        ))
      
    }
    eatApple(){
        if(this.x == apple.x && this.y == apple.y){
            snake.push(new Snake(
                snake[snake.length -1 ].x - snake[snake.length -1 ].rotateX,
                snake[snake.length -1 ].y - snake[snake.length -1 ].rotateY,
                snake[snake.length -1 ].direction,
                snake[snake.length -1 ].rotateX,
                snake[snake.length -1 ].rotateY
            ))
            return true
        }
        return false
    }
    hitSnake(){
        for(var i = 1;snake.length > i ; i++){
            if(this.x == snake[i].x && this.y == snake[i].y){
                return true
            }
        }
        return false
    }
    outScreen(){
        if(this.x == canvas.clientWidth){
            this.x = 0
        }
        if(this.x < 0){
            this.x = canvas.clientWidth
        }
        if(this.y == canvas.clientHeight){
            this.y = 0
        }
        if(this.y < 0){
            this.y = canvas.clientHeight
        }
    }
}

class Apple{
    constructor(box){
        this.x = Math.floor(Math.random() * (canvas.width/10 - 0))*10
        this.y = Math.floor(Math.random() * (canvas.height/10 - 0))*10
        this.box = box
    }
    drawApple(){
        draw("red",this.x,this.y,this.box,this.box)
    }
}

var snake = []
snake[0] = new Snake(canvas.clientWidth/2, canvas.clientHeight/2,"ArrowRight",5,0)
var apple = new Apple(snake[0].box)

var game = setInterval(()=>{
    backGround()
    apple.drawApple() 
    
    snake[0].outScreen()

    snake.forEach(tail =>{
        tail.drawSnake()
    }) 

    if(snake[0].eatApple() == true){ 
        apple = new Apple(snake[0].box)
    }
    if(snake[0].hitSnake() == true){
        clearInterval(game)
        window.alert("Game Over")
        document.location.reload()
    }

    snake[0].moveSnake()  
    snake[0].directionSnake()
    snake.pop()
    score.innerText = "Score: " + snake.length

},1000/9)
