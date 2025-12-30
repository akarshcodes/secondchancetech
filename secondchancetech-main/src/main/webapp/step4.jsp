<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Success</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/variables.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/checkout.css">
</head>
<body>

    <jsp:include page="header.jsp" />

    <main class="success-wrapper">

        <!-- Success Icon -->
        <div class="icon-container">
            <img src="${pageContext.request.contextPath}/assets/verify.png" class="success-icon-img" alt="Success Icon" onerror="this.src='https://placehold.co/100x100/797979/white?text=✓'">
        </div>

        <!-- Heading -->
        <h1 class="thank-you-title">Thank You For Purchasing</h1>

        <!-- Navigation Button -->
        <a href="home.jsp" class="btn-home">Home</a>

    </main>

    <jsp:include page="footer.jsp" />

</body>
</html>