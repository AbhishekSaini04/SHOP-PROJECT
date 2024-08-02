document.getElementById("image").onchange=evt=>{
    console.log("event");
    const [file]=image.files;
    console.log(file);
    if(file){changeSrc(file)
    }
  }
   function changeSrc(file){
        document.querySelector("#imagee").src=URL.createObjectURL(file) ;

    }

  
