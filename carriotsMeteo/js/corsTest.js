// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(meth, url) {
  var jsonData = null;
  var xhr = createCORSRequest(meth, url);
  var apikey= 'a3dd2a33c514de9ed0ad1e8e751a82a8c699916858b1ad0a6e2425d71cce48ea';
  var device = 'madrid@carriotsMeteo.carriotsMeteo';

  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  
  xhr.setRequestHeader('Host', 'api.carriots.com');
  xhr.setRequestHeader('carriots.apiKey', apikey);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('User-Agent', 'Carriots-client');
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    decodeJson(text);
	//console.log(text);
  };

  xhr.onerror = function() {
    alert('There was an error making the request.');
  };

  xhr.send(jsonData);
}

// Decode the JSON 
function decodeJson(text){
  obj = JSON.parse(text);
    
  //Actual report
  var now=new Date(obj.result[0].at*1000);
  now=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
  var nowTemp=obj.result[0].data.temp;
  var nowWind=obj.result[0].data.wind_speed;
  var nowHumidity=obj.result[0].data.hum;
  var nowWindDir=obj.result[0].data.wind_dir;
  $( "#last_update" ).html("Last Update: "+now);
  var evoTemp=nowTemp-(obj.result[1].data.temp);
  if(evoTemp<0) { 
  	var textTemp='<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> '+Math.abs(evoTemp)+'</span>';
  } else {
  	var textTemp='<span class="badge badge-green"><i class="fa fa-arrow-up"></i> '+Math.abs(evoTemp)+'</span>';
  }
  var evoWind=nowWind-(obj.result[1].data.wind_speed);
  if(evoWind<0) { 
  	var textWind='<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> '+Math.abs(evoWind)+'</span>';
  } else {
  	var textWind='<span class="badge badge-green"><i class="fa fa-arrow-up"></i> '+Math.abs(evoWind)+'</span>';
  }
  var evoHumidity=nowHumidity-(obj.result[1].data.hum);
  if(evoHumidity<0) { 
  	var textHumidity='<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> '+Math.abs(evoHumidity)+'</span>';
  } else {
  	var textHumidity='<span class="badge badge-green"><i class="fa fa-arrow-up"></i> '+Math.abs(evoHumidity)+'</span>';
  }
  
  $( "#nowTemp" ).html('<strong>'+nowTemp+'</strong> &ordm;C '+textTemp); $( "#nowTemp" ).css("background", "none");
  $( "#nowWind" ).html('<strong>'+nowWind+'</strong> Km/H '+textWind);  $( "#nowWind" ).css("background", "none");
  $( "#nowHumidity" ).html('<strong>'+nowHumidity+'</strong> % '+textHumidity);  $( "#nowHumidity" ).css("background", "none");
  $( '#knob-dyn').val(nowWindDir); $( "#nowWindDir" ).css("background", "none");
  $( '#knob-dyn').knob();
  
  
  //24H Reports
  var at=0;
  var wind=0;
  var temp=0;
  var hum=0;
  var press=0;
  var data=[];
  var data2=[];
  var data3=[];
  var data4=[];
  for(var i=0; i<26; i++){
    at=new Date(obj.result[i].at*1000);
	wind=obj.result[i].data.wind_speed;
	temp=obj.result[i].data.temp;
	//correccion valores negativos
	if(temp<0) temp=Math.abs(temp);
	hum=obj.result[i].data.hum;
	uvrad=obj.result[i].data.uv_rad;
	data.push([at,wind]);
	data2.push([at,temp]);
	data3.push([at,hum]);
	data4.push([at,uvrad]);
  }
  Charts.initOtherCharts("Km/H",1,data);
  Charts.initOtherCharts("&ordm;C",2,data2);
  Charts.initOtherCharts("%",3,data3);
  Charts.initOtherCharts("Nm",4,data4);
}
