// Cart data
        let cartItems = [
            {
                id: 1,
                name: "Apple iPhone 14 Pro Max 128Gb Deep Purple",
                sku: "#25139526913984",
                price: 2499,
                quantity: 1,
                image: "assets/iphone.png"
            },
            {
                id: 2,
                name: "AirPods Max Silver",
                sku: "#53459358345",
                price: 849,
                quantity: 1,
                image: "assets/product airpods max silver.png"
            },
            {
                id: 3,
                name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
                sku: "#63632324",
                price: 1399,
                quantity: 1,
                image: "assets/AppleWatch.png"
            }
        ];

        const SHIPPING_FEE = 17;

        // Render cart items
        function renderCart() {
            const itemList = document.getElementById('itemList');

            if (cartItems.length === 0) {
                itemList.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <p style="font-size: 18px; margin-bottom: 20px;">Your cart is empty</p>
                        <a href="index.jsp" style="color: var(--primary-dark); text-decoration: underline;">Continue Shopping</a>
                    </div>
                `;
                updateSummary();
                return;
            }

            let html = '';
            cartItems.forEach((item, index) => {
                const itemTotal = (item.price * item.quantity).toFixed(0);
                const disabledAttr = item.quantity <= 1 ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : '';

                html += '<div class="item-row" data-item-id="' + item.id + '">';
                html += '<img src="' + item.image + '" alt="' + item.name + '" class="item-image" onerror="this.src=\'https://placehold.co/90x90/cccccc/666666?text=No+Image\'">';
                html += '<div class="item-content">';
                html += '<div class="item-info">';
                html += '<div class="item-name">' + item.name + '</div>';
                html += '<div class="item-sku">' + item.sku + '</div>';
                html += '</div>';
                html += '<div class="item-actions">';
                html += '<div class="quantity-control">';
                html += '<button class="qty-icon-btn" onclick="decreaseQuantity(' + item.id + ')" ' + disabledAttr + '>';
                html += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">';
                html += '<path d="M16 12L8 12" stroke="#313647" stroke-width="1.2" stroke-linecap="round" />';
                html += '</svg>';
                html += '</button>';
                html += '<div class="qty-box">' + item.quantity + '</div>';
                html += '<button class="qty-icon-btn" onclick="increaseQuantity(' + item.id + ')">';
                html += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">';
                html += '<path d="M12 8L12 16" stroke="#313647" stroke-width="1.2" stroke-linecap="round" />';
                html += '<path d="M16 12L8 12" stroke="#313647" stroke-width="1.2" stroke-linecap="round" />';
                html += '</svg>';
                html += '</button>';
                html += '</div>';
                html += '<div class="item-price">RM ' + itemTotal + '</div>';
                html += '<button class="remove-btn" onclick="removeItem(' + item.id + ')">';
                html += '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">';
                html += '<path d="M0.5 0.5L12.5 12.5" stroke="#313647" stroke-linecap="round" stroke-linejoin="round" />';
                html += '<path d="M12.5 0.5L0.5 12.5" stroke="#313647" stroke-linecap="round" stroke-linejoin="round" />';
                html += '</svg>';
                html += '</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                // Add divider between items (except after last item)
                if (index < cartItems.length - 1) {
                    html += '<div style="height: 1px; background: #EBEBEB; width: 100%;"></div>';
                }
            });

            itemList.innerHTML = html;
            updateSummary();
        }

        // Update summary section
        function updateSummary() {
            const subtotal = cartItems.reduce(function(sum, item) {
                return sum + (item.price * item.quantity);
            }, 0);
            const total = subtotal + (cartItems.length > 0 ? SHIPPING_FEE : 0);

            document.getElementById('subtotalAmount').textContent = 'RM ' + subtotal;
            document.getElementById('shippingAmount').textContent = cartItems.length > 0 ? 'RM ' + SHIPPING_FEE : 'RM 0';
            document.getElementById('totalAmount').textContent = 'RM ' + total;
        }

        // Increase quantity
        function increaseQuantity(itemId) {
            const item = cartItems.find(i => i.id === itemId);
            if (item) {
                item.quantity++;
                animateQuantityChange(itemId);
                renderCart();
            }
        }

        // Decrease quantity
        function decreaseQuantity(itemId) {
            const item = cartItems.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity--;
                animateQuantityChange(itemId);
                renderCart();
            }
        }

        // Remove item
        function removeItem(itemId) {
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                const itemElement = document.querySelector('[data-item-id="' + itemId + '"]');
                if (itemElement) {
                    // Animate removal
                    itemElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    itemElement.style.opacity = '0';
                    itemElement.style.transform = 'translateX(-20px)';

                    setTimeout(function() {
                        cartItems = cartItems.filter(function(i) { return i.id !== itemId; });
                        renderCart();
                    }, 300);
                }
            }
        }

        // Animate quantity change
        function animateQuantityChange(itemId) {
            const itemElement = document.querySelector('[data-item-id="' + itemId + '"]');
            if (itemElement) {
                itemElement.style.transition = 'background-color 0.2s ease';
                itemElement.style.backgroundColor = '#f0f0f0';
                setTimeout(function() {
                    itemElement.style.backgroundColor = 'transparent';
                }, 200);
            }
        }

        // Handle checkout
        function handleCheckout() {
            if (cartItems.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }

            // Store cart data in session storage for checkout process
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
            sessionStorage.setItem('cartSubtotal', document.getElementById('subtotalAmount').textContent);
            sessionStorage.setItem('cartTotal', document.getElementById('totalAmount').textContent);

            // Redirect to checkout
            window.location.href = 'step1.jsp';
        }

        // Initialize cart on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Try to load cart from session storage if available
            const savedCart = sessionStorage.getItem('cartItems');
            if (savedCart) {
                try {
                    cartItems = JSON.parse(savedCart);
                } catch (e) {
                    console.error('Error loading cart from session storage:', e);
                }
            }

            renderCart();
        });

        // Save cart to session storage before leaving page
        window.addEventListener('beforeunload', function() {
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        });