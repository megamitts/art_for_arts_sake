function setup() {
  createCanvas(300, 300);
  
  noStroke();
  
}

function draw() {
  let t = millis()/1000;
  background(255);
  fill(0,0,200,25);
  rect(0,0,300,99);
  fill(63, 155, 11, 100);
  rect(0,99,300,201);
  fill(0);
  for(i = 1000; i > 0; i--){
    let m = 20/(99-(t*4+i)%99);
    let n = 20/(99-(t*3+i)%99);
    let d = 99+sin(i*i)*m*99-m*99;
    ellipse(sin(i)*99*m+150,d,m/2,m/2); //alien ship centre
    ellipse(sin(i)*99*m+150,d,m,m/4); // alien ship wings
    rect(0,d,i,0.01); //sky
    rect(0,99+m,i,0.01);// ground
    ellipse(125+sin(t*3)*50,48+cos(t*2)*40,9,4.5) // hero ship top
    ellipse(125+sin(t*3)*50,50+cos(t*2)*40,18,4.5)// hero ship bottom
    rect(sin(i)*99*n+150,100,n,-n/(random(3))); // cityscape
  }
}

/* originally a dweet: https://dwitter.net/d/24245 */
