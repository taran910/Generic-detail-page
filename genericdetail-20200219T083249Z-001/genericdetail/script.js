var api_url = "https://private-b02bbd-assignement2.apiary-mock.com/questions";
var dataconfigglobal;
async function getapi(url){
  const response = await fetch(url);
  var data = await response.json();
  const resp = await fetch(data.config.data_source.api);
  console.log(data.config.main_section_left.rows[0].edit.data_submit.api)
  dataconfigglobal=data
  if(resp) {
    hideloader();
  }
  var data2 = await resp.json();
  console.log(data);
  gettitle(data2);
  left_section(data,data2);
  right_section(data,data2);
  bottom_array(data.config.array_sections,data2);
}

getapi(api_url);
function gettitle(data){
  document.querySelector('.titl').innerHTML=`${data.response.data.title}`;
}
function left_section(data,data2){
  let i=0;
  document.querySelector('.left_title').innerHTML=`${data2.response.data.section_left_title}`
  ab=data2.response.data;
   
  for(let r of data.config.main_section_left.rows){
    if(!responses(r.rhs,ab) || responses(r.rhs,ab)==''){ 
     
    }
    else{
    if(r.edit){
      console.log("yes")
     i++;
      let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `<div class="col-sm-3">${r.lhs}</div>
                    <!-- <div class="edits${i}" contenteditable= "false" id="edit${i}">${responses(r.rhs,ab)}</div> -->
                    <input class = "edits${i}" disabled = "true" id = "edits${i}" value = "${responses(r.rhs,ab)}" >
                    
                    <input  type= "button" value = "edit" onclick = "editl(${i})">
                    <button id='btn${i}' value='${i}' onclick='show(${i},"${r.lhs}")'>Save</button> 
                    <div><br>
                    <br></div>`;
      document.querySelector('.container-left').appendChild(row);
      document.getElementById(`edits${i}`).setAttribute("type",r.edit.data_type);
    //document.getElementById("btn").addEventListener("onclick", show());
  } 
    else{
    let row = document.createElement('div');  
    row.className = 'row';
    row.innerHTML = `<div class="col-sm-6">${r.lhs}</div>
                    <div class="col-sm-6">${responses(r.rhs,ab)}</div>
                    <div><br>
                    <br></div>`;
    document.querySelector('.container-left').appendChild(row);
  }}}
}
function editl(no){
  document.getElementById(`edits${no}`).disabled = false;
}
function editr(no){
  document.getElementById(`edit${no}`).disabled = false;
}
async function show(b,r){
  console.log(b);
  console.log(dataconfigglobal.config.main_section_left.rows[b].edit.data_submit.api)
  console.log(dataconfigglobal.config.main_section_left.rows[b].edit.data_submit.method)
  // console.log(b);  
  var a=document.querySelector(`.edits${b}`).value;
  console.log(a);
  console.log(r);
  var d=r;
  console.log(d);
  var dt = {[r] : a};
  console.log(dt); 
  const response = await fetch(dataconfigglobal.config.main_section_left.rows[b].edit.data_submit.api,{
  method:dataconfigglobal.config.main_section_left.rows[b].edit.data_submit.method,
  headers:{
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(dt)
   }); 
   console.log(response);
  
  
}
async function sho(b,r){
  console.log(dataconfigglobal.config.main_section_right.rows[b].edit.data_submit.api)
  console.log(dataconfigglobal.config.main_section_right.rows[b].edit.data_submit.method)
  console.log(b);  
  var a=document.querySelector(`.edit${b}`).value;
  console.log(a);
  console.log(r);
  var d=r;
  console.log(d);
  var dt = {[r] : a};
  console.log(dt); 
  const response = await fetch(dataconfigglobal.config.main_section_right.rows[b].edit.data_submit.api,{
  method:dataconfigglobal.config.main_section_right.rows[b].edit.data_submit.method,
  headers:{
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(dt)
   }); 
   console.log(response);
  
  
}
function right_section(data,data2){
  document.querySelector('.right_title').innerHTML=`${data2.response.data.section_right_title}`;
  ab=data2.response.data;
  let i=0;
  for(let r of data.config.main_section_right.rows){
    console.log(r);
    if(!responses(r.rhs,ab) || responses(r.rhs,ab)==''){
    

    }
    else{
      if(r.edit){
        console.log("yes")
        i++;
         let row = document.createElement('div');  
         row.className = 'row';
         row.innerHTML = `<div class="col-sm-3">${r.lhs}</div>
                       <!-- <div class="edit${i}" contenteditable= "true">${responses(r.rhs,ab)}</div>-->
                       <input class = "edit${i}" disabled = "true" id = "edit${i}" value = "${responses(r.rhs,ab)}" >
                       <input  type= "button" value = "edit" onclick = "editr (${i})">
                       <button id='btns${i}' value='${i}' onclick='sho(${i},"${r.lhs}")'>Save</button> 
                       <div><br>
                    <br></div>`;
         document.querySelector('.container-right').appendChild(row);
    }
    else{
      let row = document.createElement('div');
      row.className = 'row';  
      row.innerHTML = `<div class="col-sm-6">${r.lhs}</div>
                      <div class="col-sm-6">${responses(r.rhs,ab)}</div>
                      <div><br>
                    <br></div>`;
      document.querySelector('.container-right').appendChild(row);
    }
  }
  }
}
function bottom_array(data,data2){
  let tabs = document.querySelector('.nav-tabs');
  let tab_content = document.querySelector('.tab-content');
  ab=data2.response.data;

  data.forEach(function(val, index) {
    let tab = document.createElement('li');
    let tab_data = document.createElement('div');
    tab_data.classList.add('tab-pane', 'fade');
    if(index === 0) {
      tab_data.classList.add('show', 'active');
    }
    tab_data.id = `${val.data_array}`;
    tab_data.setAttribute('role', 'tabpanel');
    tab_data.setAttribute('aria-labelledby', `${val.data_array}-tab`);
    let rows = document.createElement('div');
    rows.className = 'rows';
    ab[val.data_array].forEach(x => {
      let row = document.createElement('div');
      row.className = 'flex';
      val.rows.forEach(r => {
      let r1 = document.createElement('div');
      r1.classList.add('col-sm-6', 'barr1');
      r1.innerHTML = `<div>
      <BR>
      <div style='border-style: groove; border-radius: 4px;'>
      <strong>${r.lhs} :</strong>${x[r.rhs]}
      </div>
      </div>`;
      row.appendChild(r1);
      });
      rows.appendChild(row);
    });
    tab_data.appendChild(rows);
    tab_content.appendChild(tab_data);
    tab.className = 'nav-item';
    tab.innerHTML = `<a class="nav-link" id="${val.data_array}-tab" data-toggle="tab" href="#${val.data_array}" role="tab" aria-controls="${val.data_array}" aria-selected="true">${val.title}</a>`;
    tabs.appendChild(tab);
  });

}


function responses(rhs,ab){
  v = ab;
  if(rhs.includes('.')){
    for(let item of rhs.split('.')){
      v = v[item];
    }
  } else{
    v = v[rhs];
  }
  return v;
}


function hideloader(){
  document.getElementById('loading').style.display = 'none';
}

