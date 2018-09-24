$( document ).ready(function() {
	
	var sParam = 'Product_ID';
	
	var sPageURL = window.location.search.substring(1);

    var url = window.location.href;
    
    if(url == '' || url.includes('cart') || url.includes('review'))
	{
		return;
	}
	
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
		if(products5[i].Product_ID == Product_ID)
		{
			//Title
			document.getElementById("productTitle").innerHTML 		= products5[i].Name;

			//images
			document.getElementById("Offer").innerHTML 		= products5[i].Offer;
			
			document.getElementById("gallery-wrapper-img").innerHTML 		= 
				"<div class=\"gallery-item active\"><a href=\"img/shop/products/nameplates/" + Product_ID + "_01.jpg\" data-hash=\"one\" data-size=\"1000x667\"></a></div>" +
				"<div class=\"gallery-item \"><a href=\"img/shop/products/nameplates/" + Product_ID + "_02.jpg\" data-hash=\"two\" data-size=\"1000x667\"></a></div>" +
				"<div class=\"gallery-item \"><a href=\"img/shop/products/nameplates/" + Product_ID + "_03.jpg\" data-hash=\"three\" data-size=\"1000x667\"></a></div>" +
				"<div class=\"gallery-item \"><a href=\"img/shop/products/nameplates/" + Product_ID + "_04.jpg\" data-hash=\"four\" data-size=\"1000x667\"></a></div>" +
				"<div class=\"gallery-item \"><a href=\"img/shop/products/nameplates/" + Product_ID + "_05.jpg\" data-hash=\"five\" data-size=\"1000x667\"></a></div>";
			
			document.getElementById("product-carousel-img").innerHTML 		= 
				"<div data-hash=\"one\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_01.jpg\" alt=\"Product\"></div>" +
				"<div data-hash=\"two\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_02.jpg\" alt=\"Product\"></div>" +
				"<div data-hash=\"three\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_03.jpg\" alt=\"Product\"></div>" +
				"<div data-hash=\"four\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_04.jpg\" alt=\"Product\"></div>" +
				"<div data-hash=\"five\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_05.jpg\" alt=\"Product\"></div>";
            																	
			document.getElementById("product-thumbnails-img").innerHTML 		= 
				"<li class=\"active\"><a href=\"#one\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_th01.jpg\" alt=\"Product\"></a></li>"+
				"<li><a href=\"#two\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_th02.jpg\" alt=\"Product\"></a></li>"+
				"<li><a href=\"#three\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_th03.jpg\" alt=\"Product\"></a></li>"+
				"<li><a href=\"#four\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_th04.jpg\" alt=\"Product\"></a></li>"+
				"<li><a href=\"#five\"><img src=\"img/shop/products/nameplates/" + Product_ID + "_th05.jpg\" alt=\"Product\"></a></li>";				

			//Customer Reviews and ratings
			document.getElementById("Review_Count").innerHTML 		= products5[i].Review_Count;
			
			var ratingNum = parseFloat(products5[i].Review_Rating);

			document.getElementById("Review_Rating").innerHTML 		= ratingNum;			
			
			var starsStr = "";
			
			for(var r = 0; r < ratingNum; r++) 
			{
				starsStr = starsStr + "<i class=\"icon-star filled\"></i>";
			}
			
			for(; r < 5; r++) 
			{
				starsStr = starsStr + "<i class=\"icon-star\"></i>";
			}
			
			document.getElementById("star_ratings").innerHTML = starsStr;

			//Product Details
			document.getElementById("Product_Name").innerHTML 		= products5[i].Name;
			document.getElementById("Product_Price").innerHTML 		= products5[i].Price;
			document.getElementById("Product_Disc").innerHTML 		= products5[i].Disc;
			document.getElementById("Product_Desc").innerHTML 		= products5[i].Desc;
			
			document.getElementById("Product_Type").innerHTML 		= products5[i].Type;
			document.getElementById("Product_Sub_Type").innerHTML 	= products5[i].Sub_Type;
			
			//Customization
			var customiation_2_str = products5[i].Customiation_2;
			var customiation_2_str_Arr = customiation_2_str.split(',');
			
			if(customiation_2_str_Arr[0] == 'No_Of_Lines')
			{
				var noOfLines = parseInt(customiation_2_str_Arr[1]);
				//document.getElementById("Lines").innerHTML 	= "<option>" + noOfLines + "</option>";
				
				var noOfLinesStr = "";
				
				for(l = noOfLines; l > 0 ; l--)
				{
					noOfLinesStr = noOfLinesStr + "<option>" + l + "</option>";
				}
				
				document.getElementById("Lines").innerHTML 	= noOfLinesStr;

			}
			
			var customiation_1_str = products5[i].Customiation_1;
			var customiation_1_str_Arr = customiation_1_str.split(',');
			
			if(customiation_1_str_Arr[0] == 'Idol')
			{
				var idolName = customiation_1_str_Arr[1];
				document.getElementById("idol").innerHTML 	= "<option>" + idolName + "</option>";
			}
			
			var availableCount = parseInt(products5[i].Available_Count);
			var availableCountStr = "";
			
			for(c = 1; c <= availableCount; c++)
			{
				availableCountStr = availableCountStr + "<option>" + c + "</option>";
			}
			
			document.getElementById("quantity").innerHTML 	= availableCountStr;
			
			//Product Description
			document.getElementById("Product_Desc1").innerHTML 		= products5[i].Desc;
			document.getElementById("Product_Desc2").innerHTML 		= products5[i].Desc2;
			document.getElementById("Product_Dimensions").innerHTML = products5[i].Dimensions;
			
			if(products5[i].Customizable == 'Y')
			{
				document.getElementById("Customizable").innerHTML = '';
			}
			else
			{
				document.getElementById("Customizable").innerHTML = 'not';				
			}
			
			document.getElementById("Product_Feature_1").innerHTML 	= products5[i].Feature_1;
			document.getElementById("Product_Feature_2").innerHTML 	= products5[i].Feature_2;
			document.getElementById("Product_Feature_3").innerHTML 	= products5[i].Feature_3;
			document.getElementById("Product_Feature_4").innerHTML 	= products5[i].Feature_4;
			document.getElementById("Product_Feature_5").innerHTML 	= products5[i].Feature_5;
			document.getElementById("Available_Count").innerHTML 	= products5[i].Available_Count;
			document.getElementById("Sold_Count").innerHTML 	= products5[i].Sold_Count;

			
			break;
		}
	}
	
	$("#productsDiv").append("<input type='submit'>");
		
	});

function getProductDetails(Product_ID)
{
	for(var i = 0; i < products5.length; i++) 
	{
		if(products5[i].Product_ID == Product_ID)
		{
			return products5[i];
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
    var Product_Name = GetURLParameter('Product_ID');
    document.getElementById("Product_ID").innerHTML = Product_Name;

    var Product_Name = GetURLParameter('Product_ID2');
    document.getElementById("Product_ID2").innerHTML = Product_Name;
}
