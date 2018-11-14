var today = new Date();
var expiry = new Date(today.getTime() + 30*24*3600*1000);
var cookieName = "npwcart";
var cookieNameAddress = "npwAddr";
var cookieNameOther = "npwOther";
var cookieNamePP = "npwPP";
var subtotal = 0;

$( document ).ready(function() 
{
	var sPageURL = window.location.search.substring(1);
    var url = window.location.href;

	if(url == '' || url.includes('index') || url.includes('cart')  || url.includes('address') || url.includes('shipping') || url.includes('payment') || url.includes('review') || url.includes('shop-grid-ls'))
	{
		setTimeout(populateCartInHome,3000);
	}
	
	if(url == '' || url.includes('index'))
	{
		return;
	} 
	
	if(url.includes('cart'))
	{
		populateCartInCart();
	}
	else if(url.includes('address'))
	{
		populateAddress();
	}	
	else if(url.includes('review'))
	{
		populateCartInReview();
		populateAddressInReview();
	}	
	
	if(url.includes('address') || url.includes('shipping') || url.includes('payment') || url.includes('review'))
	{
		setTimeout(populateSideBar,3000);
	}	
	
});
		
function storeValues(productId)
{
	setCookie(cookieName, productId, 'N');
		
	populateCartInHome();
	
	return true;
}

function setCookie(name,value,isOverwrite,expiresInDays) 
{
	if(isOverwrite == 'N')
	{
		var Product1CK = getCookie(cookieName);
	
		if(Product1CK == null)
		{
			Product1CK = "";
		}
		
		value = Product1CK + "," + value;
	}
		
	var days = 30;

	if(expiresInDays != null)
	{
		days = expiresInDays;
	}
	
    var expires = "";
    
    if (days) 
    {
        var date = new Date();
        date.setTime(date.getTime() + (days*60*60*1000));
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

function clearCart()
{
	setCookie(cookieName, '', 'Y');

	eraseCookie();
	
	populateCartInCart();
}

function eraseCookie() 
{   
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
	subtotal = totalCartAmout - productPrice;
	
	//delete from cookie
	removeProductFromCookie(name, productId);
}

function removeProductFromCookie(name, productId) 
{   
	var Product1CK = getCookie(cookieName);
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
	
	setCookie(cookieName, productId, 'Y');
}

function populateCartInHome()
{
	var Product1CK = getCookie(cookieName);
	
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
			
			if(productDetails == null || productDetails == '')
			{
				continue;
			}
			
			var productDetailsArr = productDetails.split('#');
			var productId = productDetailsArr[0];

			var productName = "";
			var productPrice = "";
	
			if(productDetailsArr.length > 1)
			{
				productName = productDetailsArr[1];
				productPrice = productDetailsArr[2];
			}
			
			totalCartCount++;
			totalCartAmout = totalCartAmout + parseInt(productPrice);
			
			cartItemStr += 
				"<div class=\"dropdown-product-item\"><a class=\"dropdown-product-thumb\" " +
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

function populateCartInReview()
{
	var Product1CK = getCookie(cookieName);

	var Product1CKArr = Product1CK.split(',');

	var cartItemStr = "";

	var totalCartAmout = 0;

	for(i = 0; i < Product1CKArr.length; i++)
	{
		var productDetails = Product1CKArr[i];

		if(productDetails == null || productDetails == '')
		{
			continue;
		}
		
		var productDetailsArr = productDetails.split('#');
		var productId = productDetailsArr[0];
		
		var productName = "";
		var productPrice = "";

		if(productDetailsArr.length > 1)
		{
			productName = productDetailsArr[1];
			productPrice = productDetailsArr[2];
		}
		
		var productDetails = getProductDetails(productId);
		var disc = productDetails.Disc;
		var subType = productDetails.Sub_Type;
		var cust = productDetails.Customiation_1;
		
		totalCartAmout = totalCartAmout + parseInt(productPrice);

		cartItemStr +="<tr id = \"Review_Cart_Item_" + i + "\"><td>" +
		"<div class=\"product-item\"><a class=\"product-thumb\" href=\"shop-single.html?Product_ID=" + productId + "\"><img src=\"img/shop/products/nameplates/" + productId + "_th01.jpg\" alt=\"Product\"></a>"+
		"<div class=\"product-info\">"+
		"  <h4 class=\"product-title\"><a href=\"shop-single.html?Product_ID=" + productId + "\">" + productName + "</a></h4><span><em>Type:</em> " + subType + "</span><span><em>Features:</em> " + cust + "</span>"+
		"</div></div>"+
		"</td>"+
		"<td class=\"text-center text-lg text-medium\">$" + productPrice + "</td>"+
		"<td class=\"text-center\"><a class=\"btn btn-outline-primary btn-sm\" href=\"cart.html\">Edit</a>" +
		"</td>"+
		"</tr>";
	}

	document.getElementById("Review_Cart_1").innerHTML = cartItemStr;
	document.getElementById("Review_Cart_SubTotal").innerHTML = "$" + totalCartAmout;
	subtotal = totalCartAmout;
	
	var Product1CKOther = getCookie(cookieNameOther);

	var Product1CKOtherArr = Product1CKOther.split(',');
	var finalAmt = 0;
	
	if(Product1CKOtherArr && Product1CKOtherArr != null && Product1CKOtherArr.length > 0)
	{
		var subTotalStr = Product1CKOtherArr[0];
		var shippingChargeStr = Product1CKOtherArr[1];
		
		if(subTotalStr.includes('subTotal'))
		{
			var subTotalVal = parseInt(subTotalStr.split('=')[1]);
			var shippingCharge = parseInt(shippingChargeStr.split('=')[1]);
			finalAmt = (subTotalVal + shippingCharge + subTotalVal*0.1);

		}
	}
	
	const paynowscript = document.querySelector('.eway-paynow-button');
	paynowscript.dataset.amount = (finalAmt * 100);
	paynowscript.dataset.label = 'Pay Now: #amount#';
	//paynowscript.innerText = "Pay Now ($" + finalAmt + ")";
	document.querySelector('.eway-button').firstElementChild.innerText = "Pay Now ($" + finalAmt + ")";
	//document.querySelector('.eway-button').innerText = "Pay Now ($" + finalAmt + ")";

}

function populateCartInCart()
{
	var Product1CK = getCookie(cookieName);

	var Product1CKArr = Product1CK.split(',');

	var cartItemStr = "";

	var totalCartAmout = 0;

	for(i = 0; i < Product1CKArr.length; i++)
	{
		var productDetails = Product1CKArr[i];

		if(productDetails == null || productDetails == '')
		{
			continue;
		}
		
		var productDetailsArr = productDetails.split('#');
		var productId = productDetailsArr[0];
		
		var productName = "";
		var productPrice = "";

		if(productDetailsArr.length > 1)
		{
			productName = productDetailsArr[1];
			productPrice = productDetailsArr[2];
		}
		
		var productDetails = getProductDetails(productId);
		var disc = productDetails.Disc;
		var subType = productDetails.Sub_Type;
		var cust = productDetails.Customiation_1;
		
		totalCartAmout = totalCartAmout + parseInt(productPrice);

		cartItemStr +="<tr id = \"Cart_Item_" + i + "\"><td>" +
		"<div class=\"product-item\"><a class=\"product-thumb\" href=\"shop-single.html?Product_ID=" + productId + "\"><img src=\"img/shop/products/nameplates/" + productId + "_th01.jpg\" alt=\"Product\"></a>"+
		"<div class=\"product-info\">"+
		"  <h4 class=\"product-title\"><a href=\"shop-single.html?Product_ID=" + productId + "\">" + productName + "</a></h4><span><em>Type:</em> " + subType + "</span><span><em>Features:</em> " + cust + "</span>"+
		"</div></div>"+
		"</td>"+
		"<td class=\"text-center\">"+
		"<div class=\"count-input\">"+
		"<select class=\"form-control\"><option>1</option></select>"+
		"</div>"+
		"</td>"+
		"<td class=\"text-center text-lg text-medium\">$" + productPrice + "</td>"+
		"<td class=\"text-center text-lg text-medium\">$" + disc + "</td>"+
		"<td class=\"text-center\"><a class=\"remove-from-cart\" href=\"javascript:removeFromCartInCart('Cart_Item_" + i + "','" + productId + "','" + productPrice + "');\" data-toggle=\"tooltip\" title=\"Remove item\"><i class=\"icon-cross\"></i></a></td>"+
		"</tr>";
	}

	document.getElementById("Cart_1").innerHTML = cartItemStr;
	document.getElementById("Cart_SubTotal").innerHTML = "$" + totalCartAmout;
	subtotal = totalCartAmout;
	
	var value = "subTotal=" + subtotal + "," + "shipping=" + 0;
	setCookie(cookieNameOther, value, 'Y');
}

function populateSideBar()
{
	var Product1CKOther = getCookie(cookieNameOther);

	var Product1CKOtherArr = Product1CKOther.split(',');

	if(Product1CKOtherArr && Product1CKOtherArr != null && Product1CKOtherArr.length > 0)
	{
		var subTotalStr = Product1CKOtherArr[0];
		var shippingChargeStr = Product1CKOtherArr[1];
		
		if(subTotalStr.includes('subTotal'))
		{
			var subTotalVal = parseInt(subTotalStr.split('=')[1]);
			var shippingCharge = parseInt(shippingChargeStr.split('=')[1]);
			subtotal = subTotalVal;
			
			document.getElementById("Addr_SubTotal").innerHTML = "$" + subTotalVal;
			document.getElementById("Addr_Tax").innerHTML = "$" + (subTotalVal*0.1);
			document.getElementById("Addr_Shipping").innerHTML = "$" + shippingCharge;
			document.getElementById("Addr_Total").innerHTML = "$" + (subTotalVal + shippingCharge + subTotalVal*0.1);
		}
	}
}

function populateAddressInReview()
{
	var Product1CK = getCookie(cookieNameAddress);

	if(Product1CK)
	{
		var Product1CKArr = Product1CK.split(',');

		if(Product1CKArr && Product1CKArr != null && Product1CKArr.length > 0)
		{
			var name = Product1CKArr[0] + " " + Product1CKArr[1];
			var phone = Product1CKArr[3];
			var email = Product1CKArr[2];
			var address = Product1CKArr[7] + "," + Product1CKArr[8] + "," + Product1CKArr[5] + Product1CKArr[6];
	
			document.getElementById("Review_Name_id").innerHTML = name;
			document.getElementById("Review_Addr_id").innerHTML = address;
			document.getElementById("Review_Phn_id").innerHTML = phone;
			
			var invoiceTime = new Date().getTime();
			
			const paynowscript = document.querySelector('.eway-paynow-button');
			paynowscript.dataset.phone = phone;
			paynowscript.dataset.email = email;
			paynowscript.dataset.invoiceref="NPW" + invoiceTime;
			paynowscript.dataset.invoicedescription="Nameplateworld Australia";
			paynowscript.dataset.resulturl="http://localhost:8080/NPW_WEB/checkout-complete.html?ref=" + "NPW" + invoiceTime;
			//document.querySelector('.eway-button').innerText = "Pay Now ($45.57)";
			document.querySelector('.eway-button').className = ".eway-button btn btn-primary";

		}
		else
		{
			document.getElementById("Review_Name_id").innerHTML = "";
			document.getElementById("Review_Addr_id").innerHTML = "";
			document.getElementById("Review_Phn_id").innerHTML = "";
		}
	}
}

function populateAddress()
{
	var Product1CK = getCookie(cookieNameAddress);

	if(Product1CK)
	{
		var Product1CKArr = Product1CK.split(',');

		if(Product1CKArr && Product1CKArr != null && Product1CKArr.length > 0)
		{
			var fName = Product1CKArr[0];
			var lName = Product1CKArr[1];
			var email = Product1CKArr[2];
			var phone = Product1CKArr[3];
			var company = Product1CKArr[4];
			var city = Product1CKArr[5];
			var zip = Product1CKArr[6];
			var addr1 = Product1CKArr[7];
			var addr2 = Product1CKArr[8];
	
			document.getElementById("checkout-fn").value = fName;
			document.getElementById("checkout-ln").value = lName;
			document.getElementById("checkout-email").value = email;
			document.getElementById("checkout-phone").value = phone;
			document.getElementById("checkout-company").value = company;
			document.getElementById("checkout-city").value = city;
			document.getElementById("checkout-zip").value = zip;
			document.getElementById("checkout-address1").value = addr1;
			document.getElementById("checkout-address2").value = addr2;
		}
	}
}

function makeePayment()
{
	var Product1CK = getCookie(cookieNamePP);

	if(Product1CK)
	{
		var Product1CKArr = Product1CK.split(',');

		if(Product1CKArr && Product1CKArr != null && Product1CKArr.length > 0)
		{
			var ccnum = Product1CKArr[0];
			var ccname = Product1CKArr[1];
			var ccexp = Product1CKArr[2];
			var ccpin = Product1CKArr[3];
			var pplgn = Product1CKArr[4];
			var pppsw = Product1CKArr[5];
	
		}
	}
}

function saveAddressCookie()
{
	var fName = document.getElementById("checkout-fn").value;
	var lName = document.getElementById("checkout-ln").value;
	var email = document.getElementById("checkout-email").value;
	var phone = document.getElementById("checkout-phone").value;
	var company = document.getElementById("checkout-company").value;
	var city = document.getElementById("checkout-city").value;
	var zip = document.getElementById("checkout-zip").value;
	var addr1 = document.getElementById("checkout-address1").value;
	var addr2 = document.getElementById("checkout-address2").value;

	var Product1CKStr = fName + "," + lName + "," + email + "," + phone + "," + company + "," + city + "," + zip + "," + addr1 + "," + addr2; 

	if(!Product1CKStr.startsWith(",,,"))
	{
		setCookie(cookieNameAddress, Product1CKStr, 'Y');	
	}
}

function savePaymentCookie()
{
	var cardNumber = document.getElementById("card_number").value;
	var cardName = document.getElementById("card_name").value;
	var cardExp = document.getElementById("card_exp").value;
	var cardPin = document.getElementById("card_pin").value;
	var paypalLogin = document.getElementById("paypal_Login").value;
	var paypalPassword = document.getElementById("paypal_Login").value;

	var Product1CKStr = cardNumber + "," + cardName + "," + cardExp + "," + cardPin + "," + paypalLogin + "," + paypalPassword; 

	if(!Product1CKStr.startsWith(",,,,"))
	{
		setCookie(cookieNamePP, Product1CKStr, 'Y');	
	}
}

function changeShippingCharge(currentCharge)
{
	var value = "subTotal=" + subtotal + "," + "shipping=" + currentCharge;
	
	setCookie(cookieNameOther, value, 'Y');

	populateSideBar();
}
