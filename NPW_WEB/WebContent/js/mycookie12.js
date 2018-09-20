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
	
		var totalCartCountStr = document.getElementById("cartCount").innerHTML;
		var totalCardAmoutStr = document.getElementById("cartPrice").innerHTML;
		totalCardAmoutStr = totalCardAmoutStr.replace("$", "");
		totalCardAmoutStr = totalCardAmoutStr.replace("&nbsp;", "");
		
		var cartItemStr = "";
		
		var totalCardAmout = parseInt(totalCardAmoutStr);
		var totalCartCount = parseInt(totalCartCountStr);
		
		for(i = 0; i < Product1CKArr.length; i++)
		{
			var productDetails = Product1CKArr[i];
			var productDetailsArr = productDetails.split('#');
			var productId = productDetailsArr[0];
			var productName = productDetailsArr[1];
			var productPrice = productDetailsArr[2];
	
			totalCartCount++;
			totalCardAmout = totalCardAmout + parseInt(productPrice);
			
			cartItemStr = 
				"<div class=\"dropdown-product-item\"><span class=\"dropdown-product-remove\"><i class=\"icon-cross\"></i></span><a class=\"dropdown-product-thumb\" " +
				"href=\"shop-single.html?Product_ID=" + productId + "\"><img src=\"img/shop/products/nameplates/" + productId + "_th01.jpg\" alt=\"Product\"></a>"+
			    "<div class=\"dropdown-product-info\"><a class=\"dropdown-product-title\" href=\"shop-single.html?Product_ID=" + productId + "\">" + productName + "</a><span class=\"dropdown-product-details\">1 x $" + productPrice + "</span></div> </div>";	
		}
		
		var cartPriceStr = "<div class=\"toolbar-dropdown-group\"><div class=\"column\"><span class=\"text-lg\">Total:</span></div>"+
		"<div class=\"column text-right\"><span class=\"text-lg text-medium\">$" + totalCardAmout + "&nbsp;</span></div></div><div class=\"toolbar-dropdown-group\">"+
		"<div class=\"column\"><a class=\"btn btn-sm btn-block btn-secondary\" href=\"cart.html\">View Cart</a></div>"+
		"<div class=\"column\"><a class=\"btn btn-sm btn-block btn-success\" href=\"checkout-address.html\">Checkout</a></div></div>";  
			
			
		document.getElementById("cartIndex").innerHTML = document.getElementById("cartIndex").innerHTML + cartItemStr;
		document.getElementById("cartPrice").innerHTML = "$" + totalCardAmout + "&nbsp;";
		document.getElementById("cartPrice1").innerHTML = "$" + totalCardAmout;
		document.getElementById("cartCount").innerHTML = totalCartCount;
	}
}