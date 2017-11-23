package com.lemmanet.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class StartupServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		      throws ServletException, IOException {
		    response.setStatus(204);
		  }
	
	{
		try {
			QuizSocketServer s = new QuizSocketServer( QuizSocketServer.DEFAULT_PORT);
			s.start();
			System.out.println(s.getWebSocketURL());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
