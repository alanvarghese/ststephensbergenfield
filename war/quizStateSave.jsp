<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
String serverState = (String)request.getParameter("QuizAttr");
application.setAttribute("QuizAttr",serverState);
%>
