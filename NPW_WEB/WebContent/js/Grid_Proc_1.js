$( document ).ready(function() {
	
	var sParam = 'Filter_ID';
	
	var sPageURL = window.location.search.substring(1);

    var url = window.location.href;

    var sURLVariables = sPageURL.split('&');
    
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        
        if (sParameterName[0] == sParam) 
        {
        	Product_ID = sParameterName[1];
        	break;
        }
    }
	
	for(var i = 0; i < products5.length; i++) 
	{
			//Product
			var productStr = "<div class=\"grid-item\">" +
              "  <div class=\"product-card\">" +
              "    <div class=\"product-badge text-danger\">50% Off</div><a class=\"product-thumb\" href=\"shop-single.html\"><img src=\"img/shop/products/01.jpg\" alt=\"Product\"></a>" +
              "    <h3 class=\"product-title\"><a href=\"shop-single.html\">Unionbay Park</a></h3>" +
              "    <h4 class=\"product-price\">" +
              "      <del>$99.99</del>$49.99" +
              "    </h4>" +
              "    <div class=\"product-buttons\">" +
              "      <button class=\"btn btn-outline-secondary btn-sm btn-wishlist\" data-toggle=\"tooltip\" title=\"Whishlist\"><i class=\"icon-heart\"></i></button>" +
              "      <button class=\"btn btn-outline-primary btn-sm\" data-toast data-toast-type=\"success\" data-toast-position=\"topRight\" data-toast-icon=\"icon-circle-check\" data-toast-title=\"Product\" data-toast-message=\"successfuly added to cart!\">Add to Cart</button>" +
              "    </div>" +
              "  </div>" +
              "</div>";
	}
	
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
    var Product_Name = GetURLParameter('Filter_ID');
    document.getElementById("Filter_ID").innerHTML = Product_Name;
}
