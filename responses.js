(function(){
  'use strict';
  const LOCAL_KEY='learnmate_feedback_responses_v1';
  const ID_KEY='learnmate_respondent_id_v1';
  function getRespondentId(){let id=localStorage.getItem(ID_KEY);if(!id){id=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():'lm-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);localStorage.setItem(ID_KEY,id);}return id;}
  function getDevice(){const w=window.innerWidth;return w<600?'Cellphone':w<1000?'Tablet':'Laptop/Desktop';}
  function localSave(record){let arr=[];try{arr=JSON.parse(localStorage.getItem(LOCAL_KEY)||'[]');}catch(e){}arr.push(record);localStorage.setItem(LOCAL_KEY,JSON.stringify(arr));}
  async function submit(record){const stamped=Object.assign({submittedAt:new Date().toISOString(),respondentId:getRespondentId(),device:getDevice()},record);localSave(stamped);const endpoint=(window.LEARNMATE_RESPONSE_ENDPOINT||'').trim();if(!endpoint)return {mode:'local'};try{await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(stamped)});return {mode:'online'};}catch(error){return {mode:'local',error:true};}}
  function exportLocal(){let arr=[];try{arr=JSON.parse(localStorage.getItem(LOCAL_KEY)||'[]');}catch(e){}const blob=new Blob([JSON.stringify(arr,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='learnmate-local-responses.json';a.click();URL.revokeObjectURL(url);}
  window.LearnMateResponses={submit,getRespondentId,getDevice,exportLocal,localKey:LOCAL_KEY};
})();
