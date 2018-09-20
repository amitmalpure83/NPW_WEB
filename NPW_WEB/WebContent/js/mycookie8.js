var today = new Date();
var expiry = new Date(today.getTime() + 30*24*3600*1000);

function setCookie1(name, value)
{
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function storeValues(productId)
{
	setCookie("npwcart", productId);
		
	populateCartInHome();
	
	return true;
}

function setCookie(name,value) 
{
	var days = 30;
    var expires = "";
    
    if (days) 
    {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) 
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) 
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
    
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    
    return null;
}

function eraseCookie(name) 
{   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function populateCartInHome()
{
	var Product1CK = getCookie('npwcart');
	
	if (Product1CK) 
	{
		var Product1CKArr = Product1CK.split(',');
	
		var cartItemStr = "";
	
		for(i = 0; i < Product1CKArr.length; i++)
		{
			var productDetails = Product1CKArr[i];
			var productDetailsArr = productDetails.split('#');
			var productId = productDetailsArr[0];
			var productName = productDetailsArr[1];
			var productPrice = productDetailsArr[2];
	
			cartItemStr = 
				"<div class=\"dropdown-product-item\"><span class=\"dropdown-product-remove\"><i class=\"icon-cross\"></i></span><a class=\"dropdown-product-thumb\" " +
				"href=\"shop-single.html?Product_ID=" + productId + "\"><img src=\"img/shop/products/nameplates/" + productId + "_th01.jpg\" alt=\"Product\"></a>"+
			    "<div class=\"dropdown-product-info\"><a class=\"dropdown-product-title\" href=\"shop-single.html?Product_ID=" + productId + "\">" + productName + "</a><span class=\"dropdown-product-details\">1 x $" + productPrice + "</span></div> </div>";	
		}
		
		document.getElementById("cartIndex").innerHTML = document.getElementById("cartIndex").innerHTML + cartItemStr;
	}
}