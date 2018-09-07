$( document ).ready(function() {
	
	var sParam = 'Product_ID';
	
	var sPageURL = window.location.search.substring(1);

    var url = window.location.href;

    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
        	Product_ID = sParameterName[1];
        }
    }
    
	for(var i = 0; i < products.length; i++) 
	{
		if(products[i].productID == Product_ID)
		{
			$("#productsDiv").append(
				"<div class='flex-container'>"
					+"<div>"+ products[i].productID +" - "+ products[i].productName +"</div>"
					+"<div>"+ products[i].productDesc  +"</div>"
					+"<div> Rate: "+ products[i].rate +"</div>"
					+"<div> Quantity: <input type='text' id='"+ products[i].productID +"' name='"+ products[i].productID +"'></div>"
				+"</div>"
			);
		}
	
	}
	
	$("#productsDiv").append("<input type='submit'>");
		
	});


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);

    var url = window.location.href;

    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function setURLParameter() {
    var Product_Name = GetURLParameter('Product_ID');
    document.getElementById("Product_ID").innerHTML = Product_Name;

    var Product_Name = GetURLParameter('Product_ID2');
    document.getElementById("Product_ID2").innerHTML = Product_Name;
}
