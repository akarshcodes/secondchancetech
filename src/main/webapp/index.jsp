<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecondChance Tech - Landing Page</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/landing.css">
</head>
<body>
    <section class="landing-banner">
        <!-- Left Content -->
        <div class="landing-content">
            <a href="${pageContext.request.contextPath}/login" class="login-btn-top">Login</a>

            <img src="${pageContext.request.contextPath}/assets/logo landscape.png" alt="Logo" class="landing-logo">

            <p class="landing-description">
                Discover SecondChance Tech, the easy and reliable platform dedicated exclusively to buy quality used electronic devices.
            </p>

            <a href="${pageContext.request.contextPath}/signup" class="btn-get-started">Get Started &rarr;</a>
        </div>

        <!-- Decorative Pills Track -->
        <div class="pill-track">
            <div class="pill pill-green p1"></div>
            <div class="pill pill-yellow p2"></div>
            <div class="pill pill-green p3"></div>
            <div class="pill pill-yellow p4"></div>
            <div class="pill pill-green p5"></div>
        </div>

        <!-- Floating Product Images -->
        <img src="${pageContext.request.contextPath}/assets/landing1.png" class="floating-img img-item1" alt="Product">
        <img src="${pageContext.request.contextPath}/assets/landing2.png" class="floating-img img-item2" alt="Product">
        <img src="${pageContext.request.contextPath}/assets/landing3.png" class="floating-img img-item3" alt="Product">
        <img src="${pageContext.request.contextPath}/assets/landing4.png" class="floating-img img-item4" alt="Product">
        <img src="${pageContext.request.contextPath}/assets/landing5.png" class="floating-img img-item5" alt="Product">

    </section>

</body>
</html>