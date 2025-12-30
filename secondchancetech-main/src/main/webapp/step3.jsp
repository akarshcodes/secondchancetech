<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Step 3</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/variables.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/checkout.css">
    <script src="${pageContext.request.contextPath}/js/step3.js" defer></script>
</head>

<body>

    <jsp:include page="header.jsp" />

    <!-- Progress Steps -->
    <div class="steps-wrapper">
        <div class="step-item inactive">
            <div class="step-icon">
                <img src="${pageContext.request.contextPath}/assets/Location.png" class="step-icon-img" alt="Step 1">
            </div>
            <div class="step-info">
                <span class="step-label">Step 1</span>
                <span class="step-title">Address</span>
            </div>
        </div>

        <div class="step-divider"></div>

        <div class="step-item inactive">
            <div class="step-icon">
                <img src="${pageContext.request.contextPath}/assets/Shipping.png" class="step-icon-img" alt="Step 2">
            </div>
            <div class="step-info">
                <span class="step-label">Step 2</span>
                <span class="step-title">Shipping</span>
            </div>
        </div>

        <div class="step-divider"></div>

        <div class="step-item">
            <div class="step-icon">
                <img src="${pageContext.request.contextPath}/assets/payment.png" class="step-icon-img" alt="Step 3">
            </div>
            <div class="step-info">
                <span class="step-label">Step 3</span>
                <span class="step-title">Payment</span>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <main class="checkout-main">

        <!-- Summary -->
        <aside class="summary-column">
            <h2 class="summary-title">Summary</h2>

            <div class="product-list" id="productList">
                <!-- Products will be rendered here -->
            </div>

            <div class="summary-details-section">
                <div class="detail-group">
                    <span class="detail-label">Address</span>
                    <p class="detail-value" id="summaryAddress">Loading...</p>
                </div>
                <div class="detail-group">
                    <span class="detail-label">Shipment method</span>
                    <p class="detail-value" id="summaryShipment">Loading...</p>
                </div>
            </div>

            <div class="price-breakdown">
                <div class="price-row">
                    <span class="price-row-label">Subtotal</span>
                    <span class="price-row-value" id="summarySubtotal">RM 0</span>
                </div>
                <div class="price-row">
                    <span class="price-row-label" style="color: var(--text-muted)">Shipping Fee</span>
                    <span class="price-row-value" id="summaryShipping">RM 0</span>
                </div>
                <div class="price-row" style="margin-top: 8px;">
                    <span class="price-row-label total-label">Total</span>
                    <span class="price-row-value total-value" id="summaryTotal">RM 0</span>
                </div>
            </div>
        </aside>

        <!-- Payment -->
        <section class="payment-column">
            <div class="payment-header">
                <h2 class="payment-title">Payment</h2>
                <div class="tabs-container">
                    <div class="tab-item">Credit Card</div>
                </div>
            </div>

            <!-- Visual Card Container -->
            <div class="visual-card">
                <div class="card-chip"></div>
                <div class="card-number-row" id="visualCardNumber">
                    <span>••••</span> <span>••••</span> <span>••••</span> <span>••••</span>
                </div>
                <div class="card-footer">
                    <div class="cardholder-label" id="visualCardHolder">Cardholder</div>
                    <div class="card-logos">
                        <div class="logo-circle" style="background: #FF0006; margin-right: -10px;"></div>
                        <div class="logo-circle" style="background: #F9A000;"></div>
                    </div>
                </div>
            </div>

            <form id="paymentForm" onsubmit="processPayment(event)">
                <div class="payment-form">
                    <input type="text" name="cardholderName" id="cardholderName"
                           class="input-field" placeholder="Cardholder Name" required
                           oninput="updateVisualCard()">
                    <input type="text" name="cardNumber" id="cardNumber"
                           class="input-field" placeholder="Card Number" required
                           maxlength="19" pattern="[0-9\s]+"
                           oninput="formatCardNumber(this); updateVisualCard()">
                    <div class="form-row">
                        <input type="text" name="expDate" id="expDate"
                               class="input-field" placeholder="MM/YY" required
                               maxlength="5" pattern="[0-9/]+"
                               oninput="formatExpDate(this)">
                        <input type="text" name="cvv" id="cvv"
                               class="input-field" placeholder="CVV" required
                               maxlength="3" pattern="[0-9]+">
                    </div>
                </div>

                <div class="checkbox-container">
                    <input type="checkbox" id="sameBillingAddress" name="sameBillingAddress" checked>
                    <label for="sameBillingAddress">Same as billing address</label>
                </div>

                <div class="button-footer">
                    <button type="button" class="btn btn-back"
                            onclick="window.location.href='${pageContext.request.contextPath}/step2.jsp'">Back</button>
                    <button type="submit" class="btn btn-pay">Pay</button>
                </div>
            </form>
        </section>

    </main>

    <jsp:include page="footer.jsp" />

</body>
</html>