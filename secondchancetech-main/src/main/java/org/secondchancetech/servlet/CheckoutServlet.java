package org.secondchancetech.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet({
        "/step1",
        "/step2",
        "/step3",
        "/step4"
})
public class CheckoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String path = req.getServletPath();
        String destination = "";

        switch (path) {
            case "/step1":
                destination = "/WEB-INF/views/step1.jsp";
                break;
            case "/step2":
                destination = "/WEB-INF/views/step2.jsp";
                break;
            case "/step3":
                destination = "/WEB-INF/views/step3.jsp";
                break;
            case "/step4":
                destination = "/WEB-INF/views/step4.jsp";
                break;
            default:
                destination = "/WEB-INF/views/step1.jsp";
                break;
        }

        req.getRequestDispatcher(destination).forward(req, resp);
    }
}