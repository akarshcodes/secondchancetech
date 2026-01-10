package org.secondchancetech.servlet;

import org.secondchancetech.dao.CartDAO;
import org.secondchancetech.dao.ProductDAO;
import org.secondchancetech.model.Cart;
import org.secondchancetech.model.Product;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/api/cart")
public class CartAPIServlet extends HttpServlet {

    private CartDAO cartDAO = new CartDAO();
    private ProductDAO productDAO = new ProductDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        String action = req.getParameter("action");

        try {
            if ("list".equals(action)) {
                // Get cart items for user ID 1 (hardcoded for simplicity)
                List<Cart> carts = cartDAO.getCartsByUser(1);
                StringBuilder json = new StringBuilder("[");

                boolean first = true;
                for (Cart cart : carts) {
                    if ("DRAFT".equals(cart.getStatus())) {
                        Product product = productDAO.getProductById(cart.getProductId());
                        if (product != null) {
                            if (!first) json.append(",");
                            json.append("{")
                                    .append("\"id\":").append(cart.getCartId()).append(",")
                                    .append("\"productId\":").append(product.getProductId()).append(",")
                                    .append("\"name\":\"").append(escapeJson(product.getName())).append("\",")
                                    .append("\"sku\":\"#").append(product.getProductId()).append("\",")
                                    .append("\"price\":").append(product.getPrice()).append(",")
                                    .append("\"quantity\":").append(cart.getQuantity()).append(",")
                                    .append("\"image\":\"").append(escapeJson(product.getImagePath())).append("\"")
                                    .append("}");
                            first = false;
                        }
                    }
                }
                json.append("]");
                out.print(json.toString());
            }
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        String action = req.getParameter("action");

        try {
            if ("add".equals(action)) {
                int productId = Integer.parseInt(req.getParameter("productId"));
                int quantity = Integer.parseInt(req.getParameter("quantity"));

                Cart cart = new Cart();
                cart.setUserId(1); // Hardcoded user
                cart.setProductId(productId);
                cart.setQuantity(quantity);
                cart.setStatus("DRAFT");

                cartDAO.createCart(cart);
                out.print("{\"success\":true}");

            } else if ("update".equals(action)) {
                int cartId = Integer.parseInt(req.getParameter("cartId"));
                int quantity = Integer.parseInt(req.getParameter("quantity"));

                cartDAO.updateQuantity(cartId, quantity);
                out.print("{\"success\":true}");

            } else if ("remove".equals(action)) {
                int cartId = Integer.parseInt(req.getParameter("cartId"));

                cartDAO.deleteCart(cartId);
                out.print("{\"success\":true}");

            } else if ("checkout".equals(action)) {
                // Mark all DRAFT carts as PAID
                List<Cart> carts = cartDAO.getCartsByUser(1);
                for (Cart cart : carts) {
                    if ("DRAFT".equals(cart.getStatus())) {
                        cartDAO.updateStatus(cart.getCartId(), "PAID");
                    }
                }
                out.print("{\"success\":true}");
            }

        } catch (SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    private String escapeJson(String str) {
        if (str == null) return "";
        return str.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}