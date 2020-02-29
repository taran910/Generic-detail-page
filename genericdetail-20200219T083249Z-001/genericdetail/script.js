const api_url = "https://private-b02bbd-assignement2.apiary-mock.com/questions";
async function getapi(url){
  const response = await fetch(url);
  var data = await response.json();
  const resp = await fetch(data.config.data_source.api);
  if(resp) {
    hideloader();
  }
  var data2 = await resp.json();
  console.log(data,data2);
  gettitle(data2);
  left_section(data,data2);
  right_section(data,data2);
  bottom_array(data,data2);
}
getapi(api_url);
function gettitle(data){
  document.querySelector('.titl').innerHTML=`${data.response.data.title}`;
}
function left_section(data,data2){
  document.querySelector('.left_title').innerHTML=`${data2.response.data.section_left_title}`
  ab=data2.response.data
  for(let r of data.config.main_section_left.rows){
    if(!responses(r.rhs,ab) || responses(r.rhs,ab)==''){
      

    }
    else{
    let row = document.createElement('div');  
    row.className = 'row';
    row.innerHTML = `<div class="col-sm-6">${r.lhs}</div>
                    <div class="col-sm-6">${responses(r.rhs,ab)}</div>`;
    document.querySelector('.container-left').appendChild(row);
  }}
}
function right_section(data,data2){
  document.querySelector('.right_title').innerHTML=`${data2.response.data.section_right_title}`;
  ab=data2.response.data;
  for(let r of data.config.main_section_right.rows){
    if(!responses(r.rhs,ab) || responses(r.rhs,ab)==''){
      

    }
    else{
    let row = document.createElement('div');
    row.className = 'row';  
    row.innerHTML = `<div class="col-sm-6">${r.lhs}</div>
                    <div class="col-sm-6">${responses(r.rhs,ab)}</div>`;
    document.querySelector('.container-right').appendChild(row);
    }
  }
}
function bottom_array(data,data2){
  for(let r of data.config.array_sections){
    console.log(r);
    let link=document.createElement('li');
    link.className='nav-item';
    link.innerHTML = `<a class="nav-link" id="${r.title}-tab" data-toggle="tab" href="#${r.title}" role="tabpanel" aria-controls="${r.title}" aria-selected="true">${r.title}</a>`;
    document.getElementById('myTab').appendChild(link);
    let arr_body = document.createElement('div');
    arr_body.innerHTML =  `<div class="tab-pane fade in active" id="${r.title}" role="tabpanel" aria-labelledby="${r.title}-tab">
    <div class="container lowerarray0">
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="container ">
          <div class="row">
          ${r.title}
            <div class="col-sm-12">
              <div class="container-0">
                <div class="row">
                  <div class="col-sm-6 barr1" >
                    1. <strong>{key} : </strong>{value}
                  </div>
                  <div class="col-sm-6 barr1" id='t'>
                    <strong>{key} : </strong>{value}
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`;
    document.querySelector('.tab-content').appendChild(arr_body);
  }
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


