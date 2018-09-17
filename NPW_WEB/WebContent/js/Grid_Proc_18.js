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
    
    products5 = products5.sort(compareFun);
	
    var productStr = "<div class=\"gutter-sizer\"></div><div class=\"grid-sizer\"></div>";
    
	for(var i = 0; i < products5.length; i++) 
	{
		var Product_ID 			= products5[i].Product_ID;
		var Product_Name 		= products5[i].Name;
		var Product_Price 		= products5[i].Price;
		var Offer				= products5[i].Offer;
		var Product_Disc 		= products5[i].Disc;
		var Product_Type 		= products5[i].Type;
		var Product_Sub_Type 	= products5[i].Sub_Type;
		var ratingNum = parseFloat(products5[i].Review_Rating);

			//Product
			productStr += "<div class=\"grid-item\">" +
              "  <div class=\"product-card\">";
			
			if(Offer != "")
			{
				productStr += "    <div class=\"product-badge text-danger\"> " + Offer + "% Off</div>";
			}
			
			if(ratingNum > 0)
			{
				var starsStr = "";
			
				for(var r = 0; r < ratingNum; r++) 
				{
					starsStr = starsStr + "<i class=\"icon-star filled\"></i>";
				}	
			
				for(; r < 5; r++) 
				{
					starsStr = starsStr + "<i class=\"icon-star\"></i>";
				}
			
				productStr += "<div class=\"rating-stars\">" + starsStr + "</div>";
			}
			
			productStr +=
              "		<a class=\"product-thumb\" href=\"shop-single.html?Product_ID=" + Product_ID + "\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_th01.jpg\" alt=\"Product\"></a>" +
              "    <h3 class=\"product-title\"><a href=\"shop-single.html\">" + Product_Name + "</a></h3>" +
              "    <h4 class=\"product-price\">" +
              "      <del>$ " + Product_Disc + "</del>" + Product_Price +
              "    </h4>" +
              "    <div class=\"product-buttons\">" +
              "      <button class=\"btn btn-outline-secondary btn-sm btn-wishlist\" data-toggle=\"tooltip\" title=\"Whishlist\"><i class=\"icon-heart\"></i></button>" +
              "      <button class=\"btn btn-outline-primary btn-sm\" data-toast data-toast-type=\"success\" data-toast-position=\"topRight\" data-toast-icon=\"icon-circle-check\" data-toast-title=\"Product\" data-toast-message=\"successfuly added to cart!\">Add to Cart</button>" +
              "    </div>" +
              "  </div>" +
              "</div>";
	}
	
	document.getElementById("products-grid").innerHTML 		= productStr;
	
	});

function compareFun(a, b){
	
	return parseInt(b.Sold_Count) - parseInt(a.Sold_Count)
}

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
