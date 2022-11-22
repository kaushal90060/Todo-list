"use script";
// const outputbox =document.querySelector('.outputbox');
//Month array for date comparison
// const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

window.addEventListener('load',() =>{
    showImage();

  const input = document.querySelector('.maininput');
  const output = document.querySelector('.outputbox');
    let modal;
    let backdrop;
    //On clicking submit button appear a new modal window with a form in it
    const submitTask = document.querySelector('#submit-task');
    submitTask.addEventListener('click',(e)=>{ 
        e.preventDefault();
        //Create a line break
        const br = document.createElement('br');

        const taskname = input.value;
        console.log('You clicked add to task button and value of task is: '+taskname);
        //Write code for creating classes for creating a form 
        if(modal) return;

        //Create modal class div
        modal = document.createElement('div');
        modal.classList.add('modal');
       
        const diag = document.createElement('div');
        diag.innerHTML = "Put some details here";
        diag.classList.add('diag');

        modal.appendChild(diag);
       
        //create a form
        const form = document.createElement('form');
        form.classList.add('modalform');
        
        //Take inputs in the form
        //Input for task name
        const name = document.createElement('input');
        name.setAttribute("type","text");
        name.setAttribute("placeholder","Enter your task name");
        name.value = taskname;
        name.classList.add('name');
       
        //creating a label for Expected date
        let timeLabel = document.createElement('Label')
        timeLabel.setAttribute("for","time");
        timeLabel.innerHTML = "Expected Time to complete?";
        
        //Input for date as input
        const timeline = document.createElement('input');
        timeline.setAttribute("type","time");
        timeline.classList.add('timeline');

        //creating a label for Expected date
        let dateLabel = document.createElement('Label')
        dateLabel.setAttribute("for","date");
        dateLabel.innerHTML = "Expected Date to complete?";

        
        //Input for date as input
        const deadline = document.createElement('input');
        deadline.setAttribute("type","date");
        deadline.classList.add('deadline');

        //Input for willing to do something checkbox
        const will = document.createElement('input');
        will.setAttribute("type","checkbox");
        will.setAttribute("value","Willing to complete?");
        will.classList.add('will');

        //Label for willing to do something
        const willLabel = document.createElement('Label');
        willLabel.setAttribute('for','will');
        willLabel.innerHTML = "Willing to complete?";

        //Input for submit button
        const submitbtn = document.createElement('input');
        submitbtn.setAttribute('type','submit');
        submitbtn.setAttribute('value','Submit');
        submitbtn.classList.add('submitbox');

         //Get the values of all input field



        //Append all the inputs to the form
        form.appendChild(name);
         //inserting a line break
        form.appendChild(br.cloneNode());
        form.appendChild(timeLabel);
        form.appendChild(br.cloneNode());
        form.appendChild(timeline);
        form.appendChild(br.cloneNode());
        form.appendChild(dateLabel);
        form.appendChild(br.cloneNode());
        form.appendChild(deadline);
        form.appendChild(br.cloneNode());
        form.appendChild(will);
        form.appendChild(willLabel);
        form.appendChild(br.cloneNode());
        form.appendChild(submitbtn);


        modal.appendChild(form);
       
        document.body.append(modal);

        backdrop = document.createElement('div');
        backdrop.className = 'backdrop';
         backdrop.addEventListener('click',()=>{
            modal.remove();
            modal = null;
        
            backdrop.remove();
            backdrop = null;
         });
        document.body.append(backdrop);
       
        //Submitting the modal window inputs and publishing the cards
        form.addEventListener('submit',(e)=>{
           e.preventDefault();
           console.log("you just clicked on modal window submit button");
           modal.remove();
           modal = null;
       
           backdrop.remove();
           backdrop = null;
           //Get all the values of input fields from the form
          const tName = name.value;
          const tTime = timeline.value;
          const tDate = deadline.value;
          const tWill = will.value;

          console.log(`Name : ${tName} \n Date : ${tTime}\n Will : ${tWill}`);
          
          //Now add card and the contents of the modal window
          const card = document.createElement('div');
          card.classList.add('card');
          
          const h2 = document.createElement('h2');
          h2.classList.add('taskh');
          h2.innerHTML = `Todo : ${tName} ⌚`;
          
           //Add h2 to the card
           card.appendChild(h2);
          //Create details to insert all the details from the modal window form
          const details = document.createElement('div');
          details.classList.add('details');
         
          //Get time from date object
          const date = new Date();
	        const current_time = formatAMPM(new Date());
          const  current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
          
          const p1 = document.createElement('p');
          p1.innerHTML = `Current Time : ${current_time}`;
          p1.classList.add('para','p1');

          const p2 = document.createElement('p');
          p2.innerHTML = `Current Date : ${current_date}`;
          p2.classList.add('para','p2');

          const p3 = document.createElement('p');
          p3.innerHTML = `Expected time to complete : ${tTime}`;
          p3.classList.add('para','p3');
         
          const px = document.createElement('p');
          px.innerHTML = `Expected Date to complete : ${tDate}`;
          px.classList.add('para');
        
          const p4 = document.createElement('p');
          let flag = "";
          if(tTime > current_time && tDate > current_date) flag = "Not able to complete!";
          else flag = "Yet to complete!";
          p4.innerHTML = `Status : ${flag}`;
          p4.classList.add('para','p4');
            
          //Append all the paragraphs into the details divbox
          details.appendChild(p1);
          details.appendChild(p2);
          details.appendChild(p3);
          details.appendChild(px);
          details.appendChild(p4);
  
          //append details to card
          card.appendChild(details);

          //Create action div and add two buttons
          const action = document.createElement('div');
          action.classList.add('action');
          
           //Add two buttons complete and delet
           const complete = document.createElement('button');
           const delet = document.createElement('button');
           complete.classList.add('button','complete');
           delet.classList.add('button','delet');
           complete.innerHTML = "Mark as completed";
           delet.innerHTML = "Delete";

           action.appendChild(complete);
           action.appendChild(delet);
           
           //append action div to card
           card.appendChild(action);

          output.appendChild(card);

          //Handle delete event for the cards
          delet.addEventListener('click',(e)=>{
            e.preventDefault();
            output.removeChild(card);
          });
          complete.addEventListener('click',(e)=>{
            e.preventDefault();
            card.style.backgroundColor = 'grey';
            card.style.opacity = 0.6;
            delet.style.opacity = 9999;

            //After 15 sec card will be deleted
            setTimeout(() => {output.removeChild(card);},10000);
            // card.innerText = `Congratulations you are awosome!`;

          });

        });
   });
});
//Function to get 12 hr time
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const parent = document.querySelector('.box2');
const child = document.querySelector('.loader');
const changeImage = document.querySelector('.refreshImg');
const image = document.querySelector('.img');
const conLost = document.querySelector('.lost');
const imgLost = document.querySelector('.loss');

//Change button image
changeImage.addEventListener('click',showImage);

function getrandromNum(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function showImage(){
    
    const height = getrandromNum(550,600);
    const width = getrandromNum(275,350);
    const url = `https://source.unsplash.com/random/${width}x${height}`;
    // console.log(url.length);
    // console.log(typeof(url));
    
    console.log(`Height : ${height} Width : ${width}`);
    parent.insertBefore(child,image);

    image.src = url;
    if(image.complete && image.naturalHeight !== 0)
    parent.removeChild(child);
   
}
image.addEventListener('load',()=>{
   parent.removeChild(child);
}); 

// if(navigator.onLine){
// showImage();
// // console.log(`You are online`);

// }
// else{
//   // console.log(`You are offline`);
  
//   conLost.style.display = 'block';
//   parent.removeChild(child);
//   parent.removeChild(image);
//   parent.removeChild(changeImage);
//   box2.appendChild(conLost);
// }
// window.addEventListener('offline', (e) => { console.log('offline'); });

// window.addEventListener('online', (e) => { console.log('online'); });

const getError = function(){
  const url = `https://source.unsplash.com/random/500x600`;
  console.log(url.length);
  console.log(typeof(url));
  if(url.length != '42'){
    conLost.style.display = 'block';
  parent.removeChild(child);
  parent.removeChild(image);
  parent.removeChild(changeImage);
  parent.appendChild(conLost);
  }
  else{
    showImage();
  }
};
getError();