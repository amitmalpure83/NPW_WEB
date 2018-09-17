var order = 'desc';
var orderCategory = 'Door%20Nameplates';
var criteria = 'Pop';
var pageNo = '1';
var maxpageNo = '1';

$( document ).ready(function() {
	
	//http://localhost:8080/NPW_WEB/shop-grid-ls.html?Ord=asc&Cri=HLP&Cat=DNP
	
	var criteriaParam = 'Cri';
	var orderParam = 'Ord';
	var orderCategoryParam = 'Cat';
	var pageNoParam = 'PN';
	
	var sPageURL = window.location.search.substring(1);

    var url = window.location.href;

    var sURLVariables = sPageURL.split('&');
    
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        
        if (sParameterName[0] == criteriaParam) 
        {
        	criteria = sParameterName[1];
        }
        else if (sParameterName[0] == orderParam) 
        {
        	order = sParameterName[1];
        }
        else if (sParameterName[0] == orderCategoryParam) 
        {
        	orderCategory = sParameterName[1];
        }
        else if (sParameterName[0] == pageNoParam) 
        {
        	pageNo = sParameterName[1];
        }
    }
    
    products5 = products5.sort(compareFun);
	
    var productStr = "<div class=\"gutter-sizer\"></div><div class=\"grid-sizer\"></div>";
    
	for(var i = ((pageNo -1) * 12); i < products5.length && i < (pageNo * 12); i++) 
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
	document.getElementById("page_numbers").innerHTML 	= ((pageNo -1) * 12 + 1) + " - " + (pageNo * 12) + " items";
	
	var paginationStr = "";
	var pageCnt = 0;
	
	for(var i = 1; i <= products5.length; i+= 12) 
	{
		pageCnt++;
		
		if (pageCnt == pageNo)
		{
			paginationStr += "<li class=\"active\" ><a href=\"javascript:redirecthref(null ,null, null, " + pageCnt + ");\">" + pageCnt + "</a></li>";
		}
		else
		{
			paginationStr += "<li ><a href=\"javascript:redirecthref(null ,null, null, " + pageCnt + ");\">" + pageCnt + "</a></li>";
			maxpageNo = pageCnt;
		}
	}
	
	document.getElementById("pagination").innerHTML 		= paginationStr;

	});

function redirecthref(Ord, Cri, Cat, PN)
{
	if(Ord == null)
	{
		Ord = order;
	}
	if(Cri == null)
	{
		Cri = criteria;
	}
	if(Cat == null)
	{
		Cat = orderCategory;
	}
	if(PN == null)
	{
		PN = pageNo;
	}
	if(PN > maxpageNo)
	{
		PN = maxpageNo;
	}
	
	window.location.href = "http://localhost:8080/NPW_WEB/shop-grid-ls.html?Ord=desc&Cri=RR&Cat=DNP&PN=" + PN;
}

function compareFun(a, b){
	
	if(criteria == 'Pop')
	{
		if(order == 'asc')
		{
			return parseInt(a.Sold_Count) - parseInt(b.Sold_Count)		
		}
		else
		{
			return parseInt(b.Sold_Count) - parseInt(a.Sold_Count)
		}
	}
	else if(criteria == 'LHP')
	{
		var aVal = parseInt(a.Price.replace("$", ""));
		var bVal = parseInt(b.Price.replace("$", ""));
		
		if(order == 'asc')
		{
			return aVal - bVal	
		}
		else
		{
			return bVal - aVal
		}
	}
	else if(criteria == 'HLP')
	{
		var aVal = parseInt(a.Price.replace("$", ""));
		var bVal = parseInt(b.Price.replace("$", ""));
		
		if(order == 'asc')
		{
			return bVal - aVal
		}
		else
		{
			return aVal - bVal	
		}
	}
	else if(criteria == 'RR')
	{
		if(order == 'asc')
		{
			return parseInt(a.Review_Rating) - parseInt(b.Review_Rating)		
		}
		else
		{
			return parseInt(b.Review_Rating) - parseInt(a.Review_Rating)
		}
	}
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
