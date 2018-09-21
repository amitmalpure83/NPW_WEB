var today = new Date();
var expiry = new Date(today.getTime() + 30*24*3600*1000);

function storeValues(productId)
{
	setCookie("npwcart", productId, 'N');
		
	populateCartInHome();
	
	return true;
}

function setCookie(name,value,isOverwrite) 
{
	if(isOverwrite == 'N')
	{
		var Product1CK = getCookie('npwcart');
	
		if(Product1CK == null)
		{
			Product1CK = "";
		}
		
		value = Product1CK + "," + value;
	}
		
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

function removeFromCartInHome(productId)
{
	
}

function removeFromCartInCart(CartItemId, productId, productPrice)
{
	//delete element
	var carItem = document.getElementById(CartItemId);
	carItem.parentNode.removeChild(carItem);
	
	//update subtotal
	var totalCartAmoutStr = document.getElementById("Cart_SubTotal").innerHTML;
	totalCartAmoutStr = totalCartAmoutStr.replace("$", "");
	var totalCartAmout = parseInt(totalCartAmoutStr);
	document.getElementById("Cart_SubTotal").innerHTML = "$" + (totalCartAmout - productPrice);

	//delete from cookie
	removeProductFromCookie(name, productId);
}

function removeProductFromCookie(name, productId) 
{   
	var Product1CK = getCookie('npwcart');
	var Product1CKNew = "";
	
	if (Product1CK) 
	{
		var Product1CKArr = Product1CK.split(',');
							
		for(i = 0; i < Product1CKArr.length; i++)
		{
			if(!Product1CKArr[i].includes('productId'))
			{
				Product1CKNew += Product1CKArr[i];
			}
		}
	}
	
	setCookie("npwcart", productId, 'Y');
}

$( document ).ready(function() 
{
	var sPageURL = window.location.search.substring(1);
    var url = window.location.href;

	if(url == '' || url.includes('index'))
	{
		return;
	}
	
	populateCartInCart();
});

function populateCartInHome()
{
	var Product1CK = getCookie('npwcart');
	
	if (Product1CK) 
	{
		var Product1CKArr = Product1CK.split(',');
	
		var totalCartCountStr = document.getElementById("cartCount").innerHTML;
		var totalCartAmoutStr = document.getElementById("cartPrice").innerHTML;
		totalCartAmoutStr = totalCartAmoutStr.replace("$", "");
		totalCartAmoutStr = totalCartAmoutStr.replace("&nbsp;", "");
		
		var cartItemStr = "";
		
		var totalCartAmout = parseInt(totalCartAmoutStr);
		var totalCartCount = parseInt(totalCartCountStr);
		
		for(i = 0; i < Product1CKArr.length; i++)
		{
			var productDetails = Product1CKArr[i];
			var productDetailsArr = productDetails.split('#');
			var productId = productDetailsArr[0];
			var productName = productDetailsArr[1];
			var productPrice = productDetailsArr[2];
	
			totalCartCount++;
			totalCartAmout = totalCartAmout + parseInt(productPrice);
			
			cartItemStr = 
				"<div class=\"dropdown-product-item\"><span class=\"dropdown-product-remove\" href=\"javascript:removeFromCartInHome(" + productId + ");\"><i class=\"icon-cross\"></i></span><a class=\"dropdown-product-thumb\" " +
				"href=\"shop-single.html?Product_ID=" + productId + "\"><img src=\"img/shop/products/nameplates/" + productId + "_th01.jpg\" alt=\"Product\"></a>"+
			    "<div class=\"dropdown-product-info\"><a class=\"dropdown-product-title\" href=\"shop-single.html?Product_ID=" + productId + "\">" + productName + "</a><span class=\"dropdown-product-details\">1 x $" + productPrice + "</span></div> </div>";	
		}
		
		var cartPriceStr = "<div class=\"toolbar-dropdown-group\"><div class=\"column\"><span class=\"text-lg\">Total:</span></div>"+
		"<div class=\"column text-right\"><span class=\"text-lg text-medium\">$" + totalCartAmout + "&nbsp;</span></div></div><div class=\"toolbar-dropdown-group\">"+
		"<div class=\"column\"><a class=\"btn btn-sm btn-block btn-secondary\" href=\"cart.html\">View Cart</a></div>"+
		"<div class=\"column\"><a class=\"btn btn-sm btn-block btn-success\" href=\"checkout-address.html\">Checkout</a></div></div>";  
			
			
		document.getElementById("cartIndex").innerHTML = document.getElementById("cartIndex").innerHTML + cartItemStr;
		document.getElementById("cartPrice").innerHTML = "$" + totalCartAmout + "&nbsp;";
		document.getElementById("cartPrice1").innerHTML = "$" + totalCartAmout;
		document.getElementById("cartCount").innerHTML = totalCartCount;
	}
}

function populateCartInCart()
{
	var Product1CK = getCookie('npwcart');
	
	if (Product1CK) 
	{
		var Product1CKArr = Product1CK.split(',');
			
		var cartItemStr = "";
		
		var totalCartAmout = 0;
		
		for(i = 0; i < Product1CKArr.length; i++)
		{
			var productDetails = Product1CKArr[i];
			var productDetailsArr = productDetails.split('#');
			var productId = productDetailsArr[0];
			var productName = productDetailsArr[1];
			var productPrice = productDetailsArr[2];
	
			totalCartAmout = totalCartAmout + parseInt(productPrice);
			
			cartItemStr +="<tr id = \"Cart_Item_" + i + "\"><td>" +
					"<div class=\"product-item\"><a class=\"product-thumb\" href=\"shop-single.html?Product_ID=" + productId + "\"><img src=\"img/shop/products/nameplates/" + productId + "_th01.jpg\" alt=\"Product\"></a>"+
                    "<div class=\"product-info\">"+
                    "  <h4 class=\"product-title\"><a href=\"shop-single.html?Product_ID=" + productId + "\">" + productName + "</a></h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>"+
                    "</div></div>"+
                    "</td>"+
                    "<td class=\"text-center\">"+
                    "<div class=\"count-input\">"+
                    "<select class=\"form-control\"><option>1</option></select>"+
                    "</div>"+
                    "</td>"+
                    "<td class=\"text-center text-lg text-medium\">$" + productPrice + "</td>"+
                    "<td class=\"text-center text-lg text-medium\">$18.00</td>"+
                	"<td class=\"text-center\"><a class=\"remove-from-cart\" href=\"javascript:removeFromCartInCart('Cart_Item_" + i + "','" + productId + "','" + productPrice + "');\" data-toggle=\"tooltip\" title=\"Remove item\"><i class=\"icon-cross\"></i></a></td>"+
                	"</tr>";
		}

		console.log(cartItemStr);

		document.getElementById("Cart_1").innerHTML = cartItemStr;
		document.getElementById("Cart_SubTotal").innerHTML = "$" + totalCartAmout;
	}
}