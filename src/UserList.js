var requestBody = ""; 

var client=new XMLHttpRequest();
client.open("delete","https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/deletar-empresa?id=7ea5059a1b4a61106ba7ca641a4bcb21");

client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');

//Eg. UserName="admin", Password="admin" for this code sample.
//client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'admin'));

client.onreadystatechange = function() { 
	if(this.readyState == this.DONE) {
		document.getElementById("response").innerHTML=this.status + this.response; 
	}
}; 
client.send(requestBody);