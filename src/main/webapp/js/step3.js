function loadSummary() {
    // 1. Get the list of products we saved in the cart
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    const productContainer = document.getElementById('productList');

    // Clear the list first
    productContainer.innerHTML = '';

    // Create a variable to count the total price of products
    let productSubtotal = 0;

    // 2. Loop through each item to display it and calculate price
    cartItems.forEach(item => {
        // Calculate total for this specific item (price x quantity)
        let itemTotalPrice = item.price * item.quantity;

        // Add this item's price to our main subtotal
        productSubtotal = productSubtotal + itemTotalPrice;

        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <div class="product-img-box">
                <img src="${item.image}" class="product-img" alt="${item.name}">
            </div>
            <div class="product-info">
                <span class="product-name">${item.name}</span>
                <span class="product-price">RM ${itemTotalPrice}</span>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });

    // 3. Load address info
    const selectedAddress = JSON.parse(sessionStorage.getItem('selectedAddress') || '{}');
    document.getElementById('summaryAddress').textContent =
        selectedAddress.address || 'No address selected';

    // 4. Load shipping method name
    const selectedShipping = JSON.parse(sessionStorage.getItem('selectedShipping') || '{}');
    document.getElementById('summaryShipment').textContent =
        selectedShipping.method || 'No shipping method selected';

    // 5. Get the shipping fee amount (default to 0 if missing)
    let shippingFee = parseFloat(sessionStorage.getItem('shipping'));
    if (isNaN(shippingFee)) {
        shippingFee = 0;
    }

    // 6. Calculate the GRAND TOTAL (Products + Shipping)
    let finalTotal = productSubtotal + shippingFee;

    // 7. Update the text on the screen
    document.getElementById('summarySubtotal').textContent = "RM " + productSubtotal;
    document.getElementById('summaryShipping').textContent = "RM " + shippingFee;
    document.getElementById('summaryTotal').textContent = "RM " + finalTotal;

    // Optional: Save these corrected values back to storage just in case
    sessionStorage.setItem('subtotal', productSubtotal);
    sessionStorage.setItem('total', finalTotal);
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formatted = value.match(/.{1,4}/g);
    input.value = formatted ? formatted.join(' ') : value;
}

function formatExpDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

async function processPayment(event) {
    event.preventDefault();

    // Validate form
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number');
        return;
    }

    const expDate = document.getElementById('expDate').value;
    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
        alert('Please enter expiry date in MM/YY format');
        return;
    }

    const cvv = document.getElementById('cvv').value;
    if (cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
    }

    // Save payment info
    const paymentData = {
        cardholderName: document.getElementById('cardholderName').value,
        cardNumber: '•••• •••• •••• ' + cardNumber.slice(-4),
        expDate: expDate,
        timestamp: new Date().toISOString()
    };

    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));

    // Create order summary
    const orderSummary = {
        orderDate: new Date().toLocaleDateString('en-MY'),
        items: JSON.parse(sessionStorage.getItem('cartItems')),
        address: JSON.parse(sessionStorage.getItem('selectedAddress')),
        shipping: JSON.parse(sessionStorage.getItem('selectedShipping')),
        payment: paymentData,
        subtotal: sessionStorage.getItem('subtotal'),
        shippingFee: sessionStorage.getItem('shipping'),
        total: sessionStorage.getItem('total')
    };

    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));

    // Mark cart as paid in backend
    try {
        const formData = new FormData();
        formData.append('action', 'checkout');

        await fetch('api/cart', {
            method: 'POST',
            body: formData
        });
    } catch (error) {
        console.error('Error completing checkout:', error);
    }

    // Redirect to success page
    window.location.href = 'step4.jsp';
}

// Keep all other existing functions unchanged
function loadSummary() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    const productContainer = document.getElementById('productList');

    productContainer.innerHTML = '';

    let productSubtotal = 0;

    cartItems.forEach(item => {
        let itemTotalPrice = item.price * item.quantity;
        productSubtotal = productSubtotal + itemTotalPrice;

        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <div class="product-img-box">
                <img src="${item.image}" class="product-img" alt="${item.name}">
            </div>
            <div class="product-info">
                <span class="product-name">${item.name}</span>
                <span class="product-price">RM ${itemTotalPrice}</span>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });

    const selectedAddress = JSON.parse(sessionStorage.getItem('selectedAddress') || '{}');
    document.getElementById('summaryAddress').textContent =
        selectedAddress.address || 'No address selected';

    const selectedShipping = JSON.parse(sessionStorage.getItem('selectedShipping') || '{}');
    document.getElementById('summaryShipment').textContent =
        selectedShipping.method || 'No shipping method selected';

    let shippingFee = parseFloat(sessionStorage.getItem('shipping'));
    if (isNaN(shippingFee)) {
        shippingFee = 0;
    }

    let finalTotal = productSubtotal + shippingFee;

    document.getElementById('summarySubtotal').textContent = "RM " + productSubtotal;
    document.getElementById('summaryShipping').textContent = "RM " + shippingFee;
    document.getElementById('summaryTotal').textContent = "RM " + finalTotal;

    sessionStorage.setItem('subtotal', productSubtotal);
    sessionStorage.setItem('total', finalTotal);
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formatted = value.match(/.{1,4}/g);
    input.value = formatted ? formatted.join(' ') : value;
}

function formatExpDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

document.addEventListener('DOMContentLoaded', function() {
    loadSummary();
});